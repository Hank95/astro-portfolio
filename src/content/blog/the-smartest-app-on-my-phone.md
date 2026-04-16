---
title: "The Smartest App on My Phone"
description: "Down Dog generates a unique yoga class every time from just 18 hours of recorded content. Here's the engineering that makes it feel like magic."
publishedAt: "2026-04-16"
author: "Henry Pendleton"
tags: ["product-engineering", "architecture", "mobile", "kotlin"]
featured: true
---

I've been using [Down Dog](https://www.downdogapp.com/) multiple times a week for years. It's a yoga app, and on the surface it looks simple: pick your duration, style, and focus area, hit start, and a class plays. A voice guides you through poses. Music plays in the background. It feels like a normal yoga video.

But it's not a video. It's something much more interesting.

Every class Down Dog gives you is unique. Not "shuffled from a library of 200 pre-recorded sessions" unique. Actually unique. Assembled on the fly from a set of building blocks, sequenced by an algorithm, and stitched together so seamlessly that you'd never know it wasn't recorded as a single take.

Once I realized what was happening under the hood, I couldn't stop thinking about the architecture.

## The Origin Story

Down Dog was founded in 2015 by Ben Simon and Carlos Ormachea. Simon had spent three years at Google and had recently finished a yoga teacher training program. The key insight came from the training itself: the logic instructors use to sequence a yoga class (which poses flow into which, how to build intensity, when to cool down) is systematic enough to be encoded in software.

That was the seed. Put the sequencing logic into code. Record the individual pieces. Let the algorithm be the instructor.

## 18 Hours of Content, Infinite Classes

Here's the number that blew my mind: all of Down Dog is powered by roughly 18 hours of recorded content. From that finite library, the app generates over 60,000 unique configurations.

Think about that ratio. A single pre-recorded yoga class on YouTube is 30-60 minutes of content that produces exactly one experience. Down Dog's 18 hours produce a functionally infinite number of experiences.

The trick is modularity. Rather than recording complete classes, they recorded the building blocks:

- **Individual pose segments**: video and audio for each pose, likely at multiple difficulty levels
- **Transition cues**: so the cuts between poses feel smooth and natural
- **Instruction audio**: alignment cues, breath prompts, modifications
- **Music tracks**: separated from the instruction audio so they can be mixed independently

Each class you take is essentially a playlist, assembled at runtime from these components based on your selections.

## The Sequencing Engine

The real intelligence isn't in the content. It's in the assembly logic. The app has a rules-based sequencing system that understands yoga:

- **Anatomical flow**: which poses logically and safely follow each other (you don't jump from a deep backbend into a forward fold)
- **Session arc**: how to build and release intensity over the duration of a class (warm-up, peak work, cool-down)
- **Focus targeting**: if you select "lower back," certain pose categories get weighted higher
- **Difficulty scaling**: swapping in harder or easier variations of the same pose based on your level setting
- **Duration fitting**: adjusting the number and length of holds to hit your chosen class time

This is what makes the output feel like a coherent, well-paced class rather than a random pile of poses. The algorithm encodes the same decision-making process that a human instructor uses. It just does it programmatically.

## The Tech Stack

Thanks to a [JetBrains case study](https://blog.jetbrains.com/kotlin/2021/02/down-dog-case-study-building-500k-subscribers-app-with-kmm/) published in 2021, we actually know a fair amount about what's under the hood:

- **Kotlin Multiplatform** across iOS, Android, and web. They switched from Swift in early 2020 and now share code across all three clients. The entire iOS project is Kotlin with the exception of about 5 Swift files.
- **Tomcat backend on AWS** with a **PostgreSQL** database.
- The original prototype was a **TypeScript web app** that got thrown out when they committed to building a native iOS app (launched August 2015).

The Kotlin Multiplatform choice is interesting on its own. This was a relatively early and ambitious adoption of KMM for a consumer app with 500K+ subscribers. Sharing everything but layout code across three platforms with a small team is a significant engineering leverage play.

## Where Does the Content Live?

One open question: how much lives on-device vs. streamed? 18 hours of video would be massive to download upfront, so the app likely streams or fetches segments on demand and caches what you've used recently. The sequencing logic itself almost certainly runs locally (choosing which poses to assemble doesn't require a server), but the media delivery is probably smarter than a full upfront download. This is one of those details I'd love to know more about.

## Why It's Hard to Copy

The moat here isn't the algorithm. Any decent engineer could build a rules-based sequencing system. The moat is the content production pipeline:

- Recording hundreds of individual pose clips from multiple angles
- At multiple difficulty levels
- With multiple instructors and voices
- With enough transition material that the cuts feel natural
- And then building and tuning the sequencing logic until the output feels like a real class

That last part is the hardest. The difference between "technically correct sequence of yoga poses" and "this feels like a great class" is enormous, and it requires deep domain expertise in yoga instruction. That's exactly what Simon brought from his teacher training.

## The Pattern

Down Dog is the best example I've seen of a broader architectural pattern: **finite content library + smart assembly logic = perceived infinite variety**.

You see it in other places once you start looking:

- **Waking Up** (meditation app): modular guided meditation segments assembled into sessions
- **Adaptive workout apps**: exercise libraries with programmatic progression
- **Procedural game content**: the same principle that drives roguelikes and procedural level generation

The user experiences something that feels personal and fresh every time. Under the hood, it's a carefully designed library of components and a set of rules for combining them.

As an engineer, that's the part I find most elegant. It's not brute force (record thousands of classes). It's not pure AI (generate everything from scratch). It's a thoughtful middle ground: human-created content, algorithmically assembled. The humans ensure quality. The algorithm ensures variety.

## A Small Caveat

I should note: I have no affiliation with Down Dog. The architecture I've described is based on publicly available information: the JetBrains case study, [interviews with the founders](https://seattleyoganews.com/down-dog-app-yoga/), and my own observations as a long-time user. Some of the specifics about how content segments are stored and assembled are my best inference, not confirmed implementation details.

If anyone on the Down Dog team ever reads this and wants to correct or expand on anything, I'd genuinely love to hear from you. [Reach out anytime](mailto:hhpendleton@gmail.com).

---

*Down Dog is available on [iOS](https://apps.apple.com/us/app/yoga-down-dog/id983693694), [Android](https://play.google.com/store/apps/details?id=com.downdogapp), and the [web](https://www.downdogapp.com/). If you do yoga at home, it's worth trying.*
