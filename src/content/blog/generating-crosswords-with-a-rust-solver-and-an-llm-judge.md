---
title: "Generating Crosswords with a Rust Solver and an LLM Judge"
description: "Building Klew meant generating a good crossword every single day. I wrote a constraint solver in Rust to fill the grids, then handed the output to Claude to tell me which ones were any good. Here's how both halves work."
publishedAt: "2026-06-03"
author: "Henry Pendleton"
tags: ["rust", "crosswords", "wasm", "claude"]
featured: true
---

[Klew](https://klew.app) is a crossword platform. People solve a fresh puzzle every day, and constructors publish their own. The "fresh puzzle every day" part is the one that quietly turns into an engineering problem: someone, or something, has to produce a clean, solvable, non-boring crossword on a schedule, forever.

Hand-building grids does not scale to "forever." So I built a tool that does it for me. It's a Rust CLI called `klew-gen`, and it has two jobs that turned out to need very different kinds of code: *fill the grid*, which is a constraint-satisfaction problem, and *judge whether the fill is any good*, which is a taste problem. The first half is deterministic Rust. The second half is Claude. This post is about how they fit together.

## Why Rust, and why a CLI

The same solver runs in two places. In the browser, it's compiled to WebAssembly and powers the autofill button in the grid editor, so a constructor can fill a partial grid in real time. Offline, it's a native binary that batch-generates daily puzzles. One crate, two targets. Writing it in Rust meant I didn't have to choose between "fast in the browser" and "fast on my machine" — `wasm-pack` for one, `cargo build --release` for the other.

The CLI exists because generation is not interactive. I want to kick off "make me 20 candidate 11×11 grids, grade them, keep the good ones" and walk away. That's a script, not a button.

## The grid filler is a backtracking CSP

Filling a crossword is a textbook constraint-satisfaction problem, and it's worth seeing why. Each **slot** (an across or down answer) is a variable. Its domain is every dictionary word of the right length. The constraints are the crossings: where two slots intersect, they must agree on a letter. Fill every slot from the dictionary such that all crossings agree and no word repeats, and you've solved it.

The naive approach — try words, recurse, backtrack on failure — works but is hopelessly slow on a dense grid. The whole game is in *which slot you fill next* and *how fast you notice a dead end*.

For slot selection I use the classic **minimum-remaining-values** heuristic with a degree tiebreak: always fill the most constrained slot first. If a slot has only three candidate words left, commit to it before one with three thousand, because it's where you're most likely to fail — and failing early means backtracking cheaply instead of unwinding a deep, mostly-correct grid.

```rust
let count = count_filtered(db, entry.length, &entry.pattern, min_score);
if count == 0 { return SelectResult::DeadEnd; }

// Tiebreak: among equally-constrained slots, prefer the one
// that crosses the most still-empty slots.
let degree = entry.crossings.iter()
    .filter(|c| !is_filled(&entries[c.crossing_entry_index]))
    .count();

if count < best_count || (count == best_count && degree > best_degree) {
    best_count = count;
    best_degree = degree;
    best_idx = Some(i);
}
```

The degree tiebreak picks the slot that touches the most unfilled neighbors, so each placement propagates as much constraint as possible.

That candidate count gets queried *constantly* — every slot, every step — so the dictionary has to answer "how many length-7 words match `_R_S__C`?" almost for free. The trick is a bitset index. The dictionary (about **540,000 words**, bucketed by length) precomputes, for every (letter, position) pair, a bitset of which words have that letter there. To match a pattern, you AND together one bitset per fixed letter:

```rust
pub fn get_matching_bitmap(&self, length: usize, pattern: &[u8]) -> Option<BitSet> {
    let mut result = BitSet::new_full(bucket.count);
    for (pos, &letter) in pattern.iter().enumerate() {
        if letter == 255 { continue; } // 255 = blank
        result.and_inplace(bucket.get_bitmap(letter, pos)?);
    }
    Some(result)
}
```

Matching is now a handful of word-parallel AND operations instead of a scan over half a million strings. The bitset is `u64`-backed on purpose: `u64::count_ones()` compiles to a single WASM `i64.popcnt` instruction, and clearing the lowest set bit during iteration is just `bits & (bits - 1)`. Little things, but they're in the hottest loop in the program.

The other big win is **arc consistency**. After placing a word, instead of just checking that each crossing slot still has *some* option (forward checking), the solver propagates forced letters to a fixpoint: if a cell can only be one letter given both slots that pass through it, fill it in, then re-check that cell's neighbors. On a dense interlocked grid this catches a doomed branch many moves before you'd otherwise discover it. The whole thing runs under a node budget — a cap on placements per attempt — and restarts with a bit of randomization if it blows through it.

## It worked. The puzzles were boring.

Here's the thing nobody tells you: a *correct* fill and a *good* fill are different problems, and the solver only knows about the first one.

Each word in the dictionary has a quality score, and I rank candidates by it, so the solver naturally prefers "better" words. But "better" by raw frequency means the grid fills up with crosswordese — OREO, ALOE, ESS, ERN, the little three- and four-letter glue words that appear constantly precisely because they're easy to cross. They're high-frequency, so they scored high, so the solver loved them. Technically excellent. Genuinely tedious.

My first lever was cost tuning. I bucket words into tiers and the solver minimizes total fill cost, so I flattened the cost curve between the top two tiers:

```rust
// Original costs were 1 / 10 / 100 / 1000. The 10x gap between
// "Excellent" and "Good" forced crosswordese into every grid.
match self {
    Tier::Avoid     => 100,
    Tier::Mediocre  => 10,
    Tier::Good      => 2,
    Tier::Excellent => 1,
}
```

Closing that gap let fresher mid-tier words win on tiebreaks instead of losing automatically to a crusty 90th-percentile word. It helped. It did not solve the actual problem, which is that "is this a fun crossword" is a judgment call no scoring table fully captures.

## Adding an LLM judge

So I gave that judgment call to something that can actually make it. `klew-gen` has a pluggable "advisor" interface — hooks the solver can call at specific moments — and two of the advisors are Claude.

**Judge** runs after a grid is filled. It gets the full word list and grades it on a rubric: obscurity, freshness, cleanliness, how cluable the entries are, and how much crosswordese snuck in. It returns a 0–100 score plus per-word flags. A grid that the solver was perfectly happy with can come back with "this is fine but ABEND, ESNE, and OXE are rough" — and now I have a signal the solver could never produce, because it requires knowing what a human solver would groan at.

**Scout** runs *before* solving. It looks at the empty grid template and the day's theme, then suggests a few anchor words to seed and flags whether the layout is even feasible. Seeding good thematic entries first gives the backtracker a strong, intentional skeleton to build around instead of discovering the theme by accident (it won't).

The loop ends up being: Scout seeds → solver fills under its budget → Judge grades → if the score is too low or a word got flagged, exclude the offenders and re-solve. The deterministic part explores the enormous combinatorial space fast; the LLM applies taste to the handful of finished candidates. Each does the thing it's actually good at.

## What I'd tell myself starting over

A few things I learned the hard way:

- **The hard part wasn't the solver, it was defining "good."** I spent days on backtracking performance and then realized a fast solver that produces boring puzzles is a fast way to produce boring puzzles. The quality signal was the real work.
- **Mixing a deterministic engine with a non-deterministic judge is great, but you have to design for the seam.** The solver is reproducible given a seed; Claude is not. I keep them cleanly separated — solve, then grade — rather than letting the LLM steer mid-search, so I can always reason about what the solver did on its own.
- **Validate the output even when the algorithm is "correct."** Arc-consistency propagation can force two slots to the same word without the duplicate check ever firing, so a "successful" solve was occasionally a grid with a repeated entry. I now revalidate every finished fill and treat a duplicate as a failed attempt. The solver was right by its own rules; its rules had a gap.

The result is a pipeline that produces a clean, graded crossword every day without me touching it — and when I do open it up, it's usually to argue with the Judge about whether ETUI is really that bad. (It is.)
