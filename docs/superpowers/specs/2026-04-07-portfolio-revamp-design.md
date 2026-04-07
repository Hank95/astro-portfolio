# Portfolio Revamp — Design Spec

## Overview

Full rebuild of henrypendleton.com from a React 18 SPA to an Astro static site. The goal is a portfolio that demonstrates front-end craft through typography, spacing, transitions, and smart architecture — not through framework complexity. Every page ships as static HTML. JavaScript is used sparingly and intentionally.

## Architecture

### Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Astro v5 | Static-first, zero JS by default, islands for opt-in interactivity |
| Styling | Tailwind CSS v4 | Utility-first, design token system, prose plugin for blog |
| Blog | Astro Content Collections | Type-safe markdown with frontmatter schemas |
| Interactivity | Vanilla JS + Astro islands (Preact) if needed | Theme toggle, scroll animations, View Transitions |
| Deployment | Netlify | Static build, free tier, existing setup |
| Analytics | Google Analytics (GA4) | Existing `G-MV1MBK53X6` property |

### No Backend

- No Supabase dependency
- No contact form — email + LinkedIn links only
- No server runtime — pure static output

### Build Output

Astro builds to `/dist` as static HTML/CSS/JS files. Netlify serves them directly. The SPA redirect rule (`/* → /index.html`) is no longer needed — each page is a real HTML file.

## Pages & Routing

| Route | Source | Description |
|-------|--------|-------------|
| `/` | `src/pages/index.astro` | Homepage |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | Project detail (generated from data) |
| `/blog` | `src/pages/blog/index.astro` | Blog listing |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Blog post (generated from markdown) |
| `/resume` | `src/pages/resume.astro` | Resume page |
| `/404` | `src/pages/404.astro` | Custom not found |

## Content Architecture

### Projects

Projects remain as structured data in a TypeScript file (`src/data/projects.ts`). Each project has:

```typescript
interface Project {
  slug: string;
  title: string;
  subtitle: string;
  status: "live" | "building" | "professional";
  techStack: string[];
  featured: boolean;
  images?: { src: string; alt: string; caption?: string }[];
  links: {
    live?: string;
    github?: string;
    appStore?: string;
    website?: string;
  };
  caseStudy?: {
    overview: string;
    problem?: string;
    whatIBuilt: string[];
    keyDecisions?: string;
    results?: string;
  };
}
```

Port existing project data as-is. No schema changes needed.

### Blog

Convert from HTML strings in TypeScript to markdown files using Astro Content Collections:

```
src/content/blog/
├── what-ultramarathons-taught-me-about-software.md
├── cribscore-1-2-release.md
├── raspberry-pi-eink-dashboard.md
└── hello-world.md
```

Each file has typed frontmatter:

```yaml
---
title: "What Ultramarathons Taught Me About Building Software"
description: "Running 62 miles through the desert teaches you things..."
publishedAt: 2026-01-31
author: "Henry Pendleton"
tags: ["ultrarunning", "software-engineering", "career"]
featured: true
---
```

Content Collection schema enforced in `src/content.config.ts`. Astro validates frontmatter at build time.

### Resume

Structured data in `src/data/resume.ts`. Port existing data with these updates:
- Fix company name: "Maymont Homes" (not "Maymoth")

### Site Content

Static content in `src/data/content.ts`. Updates:
- Fix "Maymont Homes" spelling everywhere
- Remove all Black Canyon 100k references
- Update training: "2026 Kiawah Marathon" (December 2026)
- Keep intro/about tone but refresh for current role

## Visual Design

### Design Principles

1. **Typography-driven** — Let type hierarchy, weight, and spacing create visual interest
2. **Whitespace is a feature** — Generous margins and padding
3. **Subtle craft** — Polish shows in transitions, hover states, and micro-interactions
4. **No gimmicks** — No parallax, particles, 3D, scroll-jacking, or loading spinners

### Typography

- **Body:** Inter Variable — clean, professional, excellent readability
- **Mono accent:** JetBrains Mono — for labels, tags, code blocks, small metadata
- **Scale:** Use a consistent type scale (e.g., `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-4xl`, `text-5xl`)

### Color System

Dark mode default, light mode via toggle.

```
Dark mode:
- Background: near-black (e.g., #0a0a0b or zinc-950)
- Text primary: off-white (e.g., #fafafa or zinc-50)
- Text muted: gray (e.g., zinc-400)
- Text subtle: darker gray (e.g., zinc-500/600)
- Accent: muted blue or teal (e.g., sky-400 or teal-400)
- Border: zinc-800
- Surface/card: zinc-900

Light mode:
- Background: white or near-white
- Text primary: zinc-900
- Text muted: zinc-600
- Accent: sky-600 or teal-600
- Border: zinc-200
- Surface/card: zinc-50
```

Design tokens defined via Tailwind theme configuration for consistency.

### Layout

Max content width: `max-w-3xl` (prose-friendly). Full-bleed sections can break out to `max-w-5xl` or `max-w-6xl` for project grids.

### Homepage Sections (top to bottom)

#### 1. Header (sticky)
- Left: Name ("Henry Pendleton") — links to `/`
- Right: Nav links (Work, Blog, Resume) + theme toggle icon
- Backdrop blur on scroll
- Simple, no mega-menu, no hamburger on mobile (stack links vertically or use minimal icon menu)

#### 2. Intro / Hero
- Name displayed large (`text-5xl` / `text-6xl`)
- Subtitle: "MarTech Software Engineer at Maymont Homes"
- One sentence: "I build web and marketing technology solutions that drive digital performance."
- Location: "Based in Charleston, SC"
- Icon links to GitHub, LinkedIn, Email
- No hero image, no illustration — confident typography
- Subtle entrance animation (CSS only — fade up on load)

#### 3. Selected Work
- Section heading: "Work" or "Selected Work"
- 3-4 featured project cards in a grid (2 columns on desktop, 1 on mobile)
- Each card: title, subtitle, tech stack tags, status badge
- Hover: subtle lift (`translate-y`, shadow shift) or border accent glow
- Click navigates to project detail page
- Below the grid: "More Projects" with remaining projects as a simpler list (title + subtitle + link)
- View Transitions: project card title gets `transition:name` matching the detail page title for a morph effect

#### 4. About
- 2-3 paragraphs about background and current work
- Running mentioned naturally: "Outside of work, I'm training for the Kiawah Marathon this December."
- No photo required (optional — add later if desired)

#### 5. Now
- Small, understated block
- Two items: what you're building (role at Maymont Homes) and what you're training for (Kiawah Marathon, Dec 2026)
- Styled as a subtle aside — bordered box or card with muted colors

#### 6. Contact
- "Get in Touch" heading
- One line: "Always interested in connecting — reach out about MarTech, web development, or side projects."
- Email link, LinkedIn link, GitHub link as icon buttons
- No form

#### 7. Footer
- Minimal: name, current year, "Built with Astro"
- Maybe repeat social links

### Project Detail Pages

- Back link at top ("← Back to work")
- Project title (large) with `transition:name` matching homepage card
- Subtitle, tech stack tags, status badge
- Links: Live site, GitHub, App Store, Website (as applicable)
- Case study sections with clear headings:
  - Overview
  - Problem (if applicable)
  - What I Built (bulleted list)
  - Key Decisions
  - Results (if applicable)
- Images displayed with captions (if available)
- Clean reading layout (`max-w-3xl`, generous line height)

### Blog List Page

- Page title: "Blog" or "Writing"
- Posts sorted by date (newest first)
- Each post: title (linked), date, description, tags, estimated reading time
- Featured posts could get a subtle visual distinction (optional)

### Blog Post Page

- Article title (large)
- Meta line: date, reading time, tags
- Article body styled with `@tailwindcss/typography` prose classes
- Back link to blog list
- Clean, readable layout (`max-w-3xl`)

### Resume Page

- Structured layout matching current data
- Name, location, contact info at top
- Sections: Summary, Technical Skills, Professional Experience, Technical Projects, Prior Experience, Education
- PDF download link/button at top
- Print-friendly styles (CSS `@media print`)

## Interactions & Micro-details

### Theme Toggle
- Vanilla JS inline script in `<head>` (prevents flash of wrong theme)
- Reads from `localStorage`, falls back to system preference
- Toggles `.dark` class on `<html>`
- Smooth transition: `transition: background-color 200ms, color 200ms` on body
- Icon: sun/moon swap

### View Transitions
- Astro's built-in `<ViewTransitions />` in the base layout
- Page navigations get a smooth cross-fade (built-in default)
- Project card titles morph into project page titles via `transition:name`
- Blog post titles can do the same from list to detail

### Scroll Animations
- Sections fade in on scroll using CSS `animation-timeline: view()` (modern CSS scroll-driven animations) with Intersection Observer fallback
- Subtle — opacity 0 → 1 with slight translateY. No bounce, no overshoot.
- Respects `prefers-reduced-motion`

### Hover States
- Project cards: slight translateY lift + shadow deepening + border color shift to accent
- Links: color transition to accent
- Nav items: subtle underline or color shift
- All transitions: 150-200ms ease

### Focus States
- Visible focus rings for keyboard navigation (accessibility)
- `:focus-visible` for outline — no outline on mouse click

## SEO

### Per-page Meta
Every page gets:
- Unique `<title>` and `<meta name="description">`
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter card tags
- Canonical URL

### Blog SEO
- Each post gets its own meta tags derived from frontmatter
- Article structured data (`@type: BlogPosting`)
- Proper heading hierarchy (h1 = title, h2+ in content)

### Sitemap
- Astro's `@astrojs/sitemap` integration — auto-generates `sitemap.xml`

### Structured Data
- Person schema on homepage
- WebSite schema
- BlogPosting schema on blog posts

### Performance as SEO
- Static HTML = fast TTFB
- No JS bundle blocking render
- Inline critical CSS (Astro handles this)
- Target: 100/100 Lighthouse on all pages

## What We're Dropping

| Item | Reason |
|------|--------|
| React, ReactDOM, react-router | Replaced by Astro's static rendering |
| react-helmet-async | Astro has native `<head>` management |
| Supabase client + contact form | Contact is email/LinkedIn links only |
| Globe easter egg | Not porting — was already hidden |
| BC100K elevation JourneyBar | Running theme removed from site structure |
| BC100K ElevationProfile | Same |
| bc100k-course.ts data file | Same |
| WelcomeModal | Not needed |
| LoadingSpinner / PageLoader | Static pages don't need loading states |
| react-icons, lucide-react | Use inline SVGs or astro-icon |
| class-variance-authority, tailwind-merge, clsx | Evaluate if still needed — may simplify to just `clsx` or Astro's `class:list` |
| shadcn/ui components | Building our own minimal components |

## What We're Porting

| Item | From | To |
|------|------|----|
| Project data + case studies | `src/data/projects.ts` | Same structure, new file |
| Blog posts (4) | HTML in `src/data/blog.ts` | Markdown files in `src/content/blog/` |
| Resume data | `src/data/resume.ts` | Same structure, new file |
| Site content | `src/data/content.ts` | Same structure, updated copy |
| Tailwind design tokens | `tailwind.config.js` | `tailwind.config.mjs` (refreshed) |
| SEO meta tags | react-helmet | Astro `<head>` |
| Structured data | JSON-LD in pages | Same, in Astro `<head>` |
| GA4 tracking | Script in index.html | Script in base layout |
| Netlify config | `netlify.toml` | Updated `netlify.toml` (remove SPA redirect) |
| Favicon/icons | Public directory | Same |

## Content Updates

1. Fix "Maymoth" → "Maymont" everywhere
2. Remove all Black Canyon 100k references
3. Update Now section: training for 2026 Kiawah Marathon (December 2026)
4. Refresh intro/about copy for current role at Maymont Homes
5. Keep all 4 blog posts, convert to markdown
6. Keep all 7 projects and their case studies as-is (no content changes)

## File Structure

```
portfolio/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── netlify.toml
├── public/
│   ├── fonts/
│   ├── images/
│   │   └── projects/
│   │       └── strava-local/
│   ├── hp_logo2_white.svg
│   ├── favicon.svg
│   └── resume.pdf
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro          # HTML shell, head, meta, analytics, theme script
│   │   ├── BlogPostLayout.astro      # Extends Base, adds article styling
│   │   └── ProjectLayout.astro       # Extends Base, adds project header
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro         # Inline JS island
│   │   ├── ProjectCard.astro
│   │   ├── ProjectRow.astro          # Simpler list item for "more projects"
│   │   ├── StatusBadge.astro
│   │   ├── TechTag.astro
│   │   ├── BlogPostCard.astro
│   │   ├── SocialLinks.astro
│   │   ├── SEO.astro                 # Reusable meta/OG/structured data
│   │   └── home/
│   │       ├── Intro.astro
│   │       ├── SelectedWork.astro
│   │       ├── MoreProjects.astro
│   │       ├── About.astro
│   │       ├── Now.astro
│   │       └── Contact.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── resume.astro
│   │   ├── 404.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── projects/
│   │       └── [slug].astro
│   ├── content/
│   │   └── blog/
│   │       ├── what-ultramarathons-taught-me-about-software.md
│   │       ├── cribscore-1-2-release.md
│   │       ├── raspberry-pi-eink-dashboard.md
│   │       └── hello-world.md
│   ├── content.config.ts             # Content collection schemas
│   ├── data/
│   │   ├── projects.ts
│   │   ├── resume.ts
│   │   └── content.ts
│   └── styles/
│       └── global.css                # Tailwind directives, base styles, custom properties
```

## Netlify Configuration

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

# Cache hashed assets for 1 year
[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# HTML pages — short cache, always revalidate
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

# No SPA redirect needed — Astro generates real HTML files
```

## Success Criteria

1. **Lighthouse 95+ on all four categories** across all pages
2. **Zero JS shipped** on pages that don't need it (homepage, resume, blog posts should be JS-free except theme toggle)
3. **< 50KB total page weight** (HTML + CSS) for the homepage
4. **Blog posts render from markdown** with proper SEO meta
5. **View Transitions work** — smooth, native-feeling page navigation
6. **All content is accurate** — Maymont Homes, Kiawah Marathon, correct dates
7. **Mobile-first responsive** — looks excellent on phone, tablet, and desktop
8. **Accessible** — semantic HTML, focus states, reduced motion support, proper heading hierarchy
