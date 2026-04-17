---
title: "Rebuilding My Portfolio in Astro"
description: "I swapped out Create React App for Astro. Not because anything was broken, but because I wanted to try something new. Here's what I found."
publishedAt: "2026-04-17"
author: "Henry Pendleton"
tags: ["astro", "web-development", "portfolio"]
featured: false
---

My old portfolio was a Create React App. It worked fine. It loaded, it looked decent, it showed my projects. I barely touched it.

That was kind of the problem. Not that CRA was bad, but that I had no reason to open the project. Updating content meant editing JSX components. Adding a blog post meant wiring up new routes. It all felt heavier than it needed to be for what is, at the end of the day, a mostly static website.

I'd been hearing good things about Astro for a while. Static-first, ships zero JavaScript by default, Markdown for content, and a component model that felt familiar coming from React. I didn't have a list of requirements or a migration plan. I just wanted to try something new.

## What Astro Actually Is

For anyone unfamiliar: Astro is a web framework built for content-driven websites. It generates static HTML at build time. You write components in `.astro` files (which feel like a mix of HTML and JSX), and you can use React, Vue, Svelte, or nothing at all alongside them.

The key idea is that pages ship as plain HTML with no client-side JavaScript unless you explicitly opt in. For a portfolio site, that's exactly what you want. There's no state to manage. There's no interactivity that needs a framework. It's just pages.

## What Changed

The old site was a single-page React app. Everything loaded at once, client-side routing handled navigation, and the content lived scattered across components.

The new site is a multi-page static site. Each page is its own HTML file. Blog posts are Markdown files in a `content/` directory. Project data lives in a TypeScript file that gets rendered at build time. The output is a `dist/` folder full of plain HTML, CSS, and a tiny bit of JavaScript for things like the theme toggle.

The build output went from a JavaScript-heavy React bundle to static HTML that loads instantly. Lighthouse scores are basically perfect out of the box because there's so little for the browser to do.

## What I Liked

**Markdown content is great.** Writing a blog post means creating a `.md` file with some frontmatter and just writing. No component wiring, no route registration. Astro's content collections handle the rest.

**The component model is familiar.** `.astro` files have a frontmatter script section at the top and HTML below. If you've written React, you'll feel at home in about 10 minutes. The difference is that it all runs at build time, not in the browser.

**Tailwind just works.** `@astrojs/tailwind` is a first-party integration. Install it, and you're done. No config fiddling.

**Static output is simple.** The site deploys to Cloudflare Pages. Push to main, it builds, it's live. No server, no edge functions, no runtime to think about. The `dist/` folder is the entire site.

**View transitions are built in.** Astro has a `<ViewTransitions />` component that adds smooth page transitions with almost no effort. It makes a static multi-page site feel like an SPA without actually being one.

## What Took Getting Used To

**No client-side state.** Coming from React, my first instinct was to reach for `useState` and `useEffect`. In Astro, most of that goes away because the page is already rendered. The dark mode toggle is one of the few places I needed client-side JavaScript, and it's a small inline script.

**Islands architecture.** If you do need interactivity, Astro uses "islands": you mark a component with a `client:` directive and it hydrates on the client. It's a smart model, but it takes a shift in thinking. For this site I barely needed it.

**Content collections have opinions.** Astro's content layer is powerful but has its own way of doing things. Defining schemas, querying collections, rendering entries. It's not hard, but it's a new API to learn.

## The Numbers

I didn't do a formal benchmark, but the vibes are:

- **Build time:** about 1-2 seconds for 18 pages
- **Page weight:** most pages are under 50KB total
- **Lighthouse:** 95+ across the board without trying
- **Time to first byte:** near instant on Cloudflare

For a portfolio site, those numbers are probably overkill. But it's nice knowing the foundation is solid without having to optimize anything.

## Would I Use It Again?

Yes. For content-driven sites, blogs, portfolios, documentation, marketing pages, Astro is the best tool I've used. It gets out of the way and lets you focus on the content.

For something with heavy interactivity (a dashboard, a web app), I'd still reach for React or Next.js. Astro isn't trying to replace those. It's specifically good at the thing it's designed for: shipping fast, static, content-rich websites.

If you've got a portfolio sitting in Create React App or Next.js and you're not using any of the framework features, give Astro a look. You might not have a dramatic migration story either. Sometimes you just try something new and it turns out to be better for the job.
