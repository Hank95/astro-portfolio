# Portfolio Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild henrypendleton.com from a React 18 SPA to a static Astro site with Tailwind v4, markdown blog, View Transitions, and zero JS by default.

**Architecture:** Astro v5 static site generator with Content Collections for blog posts, Tailwind CSS v4 for styling, vanilla JS for theme toggle. All project/resume data stays as TypeScript. Deploys to Netlify as static HTML.

**Tech Stack:** Astro v5, Tailwind CSS v4, TypeScript, Markdown, Netlify

**Spec:** `docs/superpowers/specs/2026-04-07-portfolio-revamp-design.md`

---

## File Structure

```
portfolio/                        (project root — new Astro project lives here, NOT inside portfolio-react/)
├── astro.config.mjs              # Astro config: sitemap, tailwind, view transitions
├── tailwind.config.mjs           # Design tokens, custom colors, typography plugin
├── tsconfig.json                 # Astro TypeScript config
├── package.json                  # Dependencies
├── netlify.toml                  # Build + cache headers (no SPA redirect)
├── public/
│   ├── fonts/                    # Inter Variable, JetBrains Mono (self-hosted)
│   ├── projects/
│   │   └── strava-local/         # Project images (copied from portfolio-react/public/)
│   ├── hp_logo2_white.svg        # Favicon
│   └── site.webmanifest
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # HTML shell, <head>, theme script, GA4, View Transitions
│   ├── components/
│   │   ├── Header.astro          # Sticky header with nav + theme toggle
│   │   ├── Footer.astro          # Minimal footer
│   │   ├── ThemeToggle.astro     # Dark/light/system toggle (inline JS)
│   │   ├── ProjectCard.astro     # Featured project card
│   │   ├── ProjectRow.astro      # Non-featured project list item
│   │   ├── StatusBadge.astro     # Live/Building/Professional badge
│   │   ├── TechTag.astro         # Tech stack tag pill
│   │   ├── BlogPostCard.astro    # Blog post preview card
│   │   ├── SocialLinks.astro     # GitHub/LinkedIn/Email icon links
│   │   ├── SEO.astro             # Reusable OG/meta/structured data
│   │   └── home/
│   │       ├── Intro.astro       # Hero section
│   │       ├── SelectedWork.astro
│   │       ├── MoreProjects.astro
│   │       ├── About.astro
│   │       ├── Now.astro
│   │       └── Contact.astro
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── resume.astro          # Resume page
│   │   ├── 404.astro             # Not found
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog listing
│   │   │   └── [...slug].astro   # Blog post (dynamic from Content Collections)
│   │   └── projects/
│   │       └── [slug].astro      # Project detail (dynamic from data)
│   ├── content/
│   │   └── blog/
│   │       ├── what-ultramarathons-taught-me-about-software.md
│   │       ├── cribscore-1-2-release.md
│   │       ├── raspberry-pi-eink-dashboard.md
│   │       └── hello-world.md
│   ├── content.config.ts         # Content collection schema
│   ├── data/
│   │   ├── projects.ts           # Project data (ported from React)
│   │   ├── resume.ts             # Resume data (ported, Maymont fixed)
│   │   └── content.ts            # Site config, nav, intro, about, now, contact
│   └── styles/
│       └── global.css            # Tailwind directives, CSS custom properties, prose overrides
```

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`
- Create: `netlify.toml`

- [ ] **Step 1: Initialize Astro project**

Run from the project root (`/Users/henrypendleton/Dev/portfolio/`):

```bash
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

If prompted about existing files, choose to continue — we only have the `docs/` directory and `portfolio-react/`.

- [ ] **Step 2: Install dependencies**

```bash
npm install @astrojs/tailwind @astrojs/sitemap @tailwindcss/typography tailwindcss
npm install -D @astrojs/check typescript
```

- [ ] **Step 3: Configure Astro**

Replace `astro.config.mjs` with:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://henrypendleton.com',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  output: 'static',
});
```

- [ ] **Step 4: Configure TypeScript**

Replace `tsconfig.json` with:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 5: Create Tailwind config**

Create `tailwind.config.mjs`:

```javascript
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)',
          subtle: 'rgb(var(--color-bg-subtle) / <alpha-value>)',
          muted: 'rgb(var(--color-bg-muted) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          subtle: 'rgb(var(--color-text-subtle) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          muted: 'rgb(var(--color-accent-muted) / <alpha-value>)',
        },
        status: {
          live: 'rgb(var(--color-status-live) / <alpha-value>)',
          building: 'rgb(var(--color-status-building) / <alpha-value>)',
          professional: 'rgb(var(--color-status-professional) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        display: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        title: ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        subtitle: ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        xs: ['0.75rem', { lineHeight: '1.4' }],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
  plugins: [typography],
};
```

- [ ] **Step 6: Create Netlify config**

Create `netlify.toml`:

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
```

- [ ] **Step 7: Verify the scaffold builds**

```bash
npm run build
```

Expected: Build succeeds with a minimal page in `dist/`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json tailwind.config.mjs netlify.toml src/
git commit -m "Scaffold Astro project with Tailwind and sitemap"
```

---

### Task 2: Global Styles + Theme System

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global CSS**

Create `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Light mode (default) */
  :root {
    --header-height: 4rem;

    --color-bg: 250 250 250;
    --color-bg-subtle: 244 244 245;
    --color-bg-muted: 228 228 231;

    --color-text: 24 24 27;
    --color-text-muted: 113 113 122;
    --color-text-subtle: 161 161 170;

    --color-accent: 59 130 246;
    --color-accent-muted: 29 78 216;

    --color-status-live: 34 197 94;
    --color-status-building: 245 158 11;
    --color-status-professional: 59 130 246;

    --color-border: 228 228 231;
    --color-border-hover: 212 212 216;

    --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08);
    --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  /* Dark mode */
  .dark {
    --color-bg: 10 10 11;
    --color-bg-subtle: 20 20 21;
    --color-bg-muted: 28 28 30;

    --color-text: 250 250 250;
    --color-text-muted: 161 161 170;
    --color-text-subtle: 113 113 122;

    --color-accent: 96 165 250;
    --color-accent-muted: 59 130 246;

    --color-status-live: 34 197 94;
    --color-status-building: 245 158 11;
    --color-status-professional: 96 165 250;

    --color-border: 39 39 42;
    --color-border-hover: 63 63 70;

    --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  html {
    @apply bg-bg text-text antialiased;
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-height);
  }

  body {
    @apply bg-bg text-text font-sans;
    font-feature-settings: "rlig" 1, "calt" 1;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  :focus-visible {
    @apply outline-none ring-2 ring-accent ring-offset-2 ring-offset-bg;
  }

  ::selection {
    @apply bg-accent/30 text-text;
  }
}

@layer components {
  .skip-link {
    @apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
           focus:z-50 focus:px-4 focus:py-2 focus:bg-bg-subtle focus:text-text
           focus:rounded-md focus:ring-2 focus:ring-accent;
  }

  .content-container {
    @apply max-w-3xl mx-auto px-6;
  }

  .wide-container {
    @apply max-w-5xl mx-auto px-6;
  }
}

@layer utilities {
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "Add global styles with light/dark theme tokens"
```

---

### Task 3: Base Layout + Theme Toggle

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/components/SEO.astro`

- [ ] **Step 1: Create SEO component**

Create `src/components/SEO.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const {
  title,
  description,
  canonicalUrl = Astro.url.href,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  article,
} = Astro.props;

const siteName = 'Henry Pendleton';
const siteUrl = 'https://henrypendleton.com';
const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
---

<!-- Primary Meta -->
<meta name="description" content={description} />
<meta name="author" content="Henry Pendleton" />
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph -->
<meta property="og:type" content={ogType} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={fullOgImage} />
<meta property="og:site_name" content={siteName} />
<meta property="og:locale" content="en_US" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={fullOgImage} />

<!-- Article-specific -->
{article?.publishedTime && (
  <meta property="article:published_time" content={article.publishedTime} />
)}
{article?.author && (
  <meta property="article:author" content={article.author} />
)}
{article?.tags?.map((tag) => (
  <meta property="article:tag" content={tag} />
))}
```

- [ ] **Step 2: Create ThemeToggle component**

Create `src/components/ThemeToggle.astro`:

```astro
---
// No server-side logic needed — all behavior is client-side JS
---

<button
  id="theme-toggle"
  class="p-2 rounded-md text-text-muted hover:text-text hover:bg-bg-muted transition-colors"
  aria-label="Toggle theme"
  title="Toggle theme"
>
  <!-- Sun icon (shown in dark mode) -->
  <svg class="theme-icon-sun w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
  <!-- Moon icon (shown in light mode) -->
  <svg class="theme-icon-moon w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
  <!-- Monitor icon (shown in system mode) -->
  <svg class="theme-icon-system w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
</button>

<script>
  function setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const sunIcon = btn.querySelector('.theme-icon-sun') as HTMLElement;
    const moonIcon = btn.querySelector('.theme-icon-moon') as HTMLElement;
    const systemIcon = btn.querySelector('.theme-icon-system') as HTMLElement;

    function getTheme(): string {
      return localStorage.getItem('theme') || 'system';
    }

    function updateIcons(theme: string) {
      sunIcon.classList.toggle('hidden', theme !== 'dark');
      moonIcon.classList.toggle('hidden', theme !== 'light');
      systemIcon.classList.toggle('hidden', theme !== 'system');

      const labels: Record<string, string> = {
        light: 'Light mode (click for dark)',
        dark: 'Dark mode (click for system)',
        system: 'System theme (click for light)',
      };
      btn!.setAttribute('aria-label', labels[theme] || 'Toggle theme');
      btn!.setAttribute('title', labels[theme] || 'Toggle theme');
    }

    function applyTheme(theme: string) {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
    }

    btn.addEventListener('click', () => {
      const current = getTheme();
      const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
      updateIcons(next);
    });

    // Initialize
    const theme = getTheme();
    updateIcons(theme);
  }

  // Run on initial load
  setupThemeToggle();

  // Re-run after View Transitions navigation
  document.addEventListener('astro:after-swap', setupThemeToggle);
</script>
```

- [ ] **Step 3: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import { ViewTransitions } from 'astro:transitions';
import SEO from '@/components/SEO.astro';
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';
import '@/styles/global.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
  structuredData?: object | object[];
}

const { title, description, ogImage, ogType, article, structuredData } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Prevent flash of wrong theme -->
    <script is:inline>
      (function() {
        const theme = localStorage.getItem('theme') || 'system';
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) document.documentElement.classList.add('dark');
      })();
    </script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/hp_logo2_white.svg" />
    <link rel="apple-touch-icon" href="/hp_logo2_white.svg" />

    <title>{title}</title>
    <SEO
      title={title}
      description={description}
      ogImage={ogImage}
      ogType={ogType}
      article={article}
    />

    {structuredData && (
      <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
    )}

    <!-- Google Analytics GA4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MV1MBK53X6" is:inline></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MV1MBK53X6');
    </script>

    <ViewTransitions />
  </head>
  <body class="min-h-screen flex flex-col bg-bg text-text">
    <a href="#main" class="skip-link">Skip to content</a>
    <Header />
    <slot />
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Create placeholder Header**

Create `src/components/Header.astro` (placeholder — full implementation in Task 5):

```astro
---
import ThemeToggle from './ThemeToggle.astro';
---

<header class="fixed top-0 left-0 right-0 z-40 bg-transparent">
  <nav class="content-container flex items-center justify-between h-16">
    <a href="/" class="text-text font-medium hover:text-text-muted transition-colors">
      Henry Pendleton
    </a>
    <div class="flex items-center gap-6">
      <ThemeToggle />
    </div>
  </nav>
</header>
```

- [ ] **Step 5: Create placeholder Footer**

Create `src/components/Footer.astro`:

```astro
<footer class="py-12 border-t border-border">
  <div class="content-container">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-small text-text-subtle">
        &copy; {new Date().getFullYear()} Henry Pendleton
      </p>
      <p class="text-xs text-text-subtle">
        Built with Astro
      </p>
    </div>
  </div>
</footer>
```

- [ ] **Step 6: Create minimal index page to test layout**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout
  title="Henry Pendleton - MarTech Software Engineer"
  description="MarTech Software Engineer building web and marketing technology solutions."
>
  <main id="main" class="flex-1 pt-32">
    <div class="content-container">
      <h1 class="text-display text-text">Henry Pendleton</h1>
      <p class="mt-4 text-body text-text-muted">Site under construction.</p>
    </div>
  </main>
</BaseLayout>
```

- [ ] **Step 7: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Check `dist/index.html` contains the theme script in `<head>`, the GA4 script, ViewTransitions meta, and the layout structure.

- [ ] **Step 8: Commit**

```bash
git add src/layouts/ src/components/SEO.astro src/components/ThemeToggle.astro src/components/Header.astro src/components/Footer.astro src/pages/index.astro
git commit -m "Add base layout with theme toggle, SEO, GA4, and View Transitions"
```

---

### Task 4: Port Data Files

**Files:**
- Create: `src/data/content.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/resume.ts`

- [ ] **Step 1: Create site content data**

Create `src/data/content.ts`:

```typescript
export const siteConfig = {
  name: "Henry Pendleton",
  title: "MarTech Software Engineer",
  email: "hhpendleton@gmail.com",
  location: "Charleston, SC",
  github: "https://github.com/Hank95",
  linkedin: "https://linkedin.com/in/henrypendleton",
};

export const intro = {
  headline: "Henry Pendleton",
  subtitle: "MarTech Software Engineer",
  description:
    "I build web and marketing technology solutions that drive digital performance. Currently at Maymont Homes, working at the intersection of engineering and marketing.",
  location: "Based in Charleston, SC.",
};

export const now = {
  training: {
    race: "Kiawah Marathon",
    date: "December 2026",
    link: "https://kiawahresortmarathon.com/",
  },
  building: [
    "MarTech Software Engineer at Maymont Homes",
    "Building marketing automation and web technology solutions",
  ],
};

export const about = {
  paragraphs: [
    "MarTech Software Engineer at Maymont Homes in Charleston, SC. I design and develop web and marketing technology solutions that enhance digital performance, enable automation, and strengthen customer engagement.",
    "Before this role, I built React dashboards, native iOS apps, and Python-based analytics tools. Earlier still, I worked in yacht sales and studied economics\u2014different work, but the same skills: understanding real needs, communicating clearly, and solving problems systematically.",
    "Outside of work, I\u2019m training for the Kiawah Marathon this December.",
  ],
};

export const contact = {
  email: "hhpendleton@gmail.com",
  availability:
    "Always interested in connecting and discussing MarTech, web development, or side projects.",
  locationNote: "Based in Charleston, SC.",
};

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
];
```

- [ ] **Step 2: Create project data**

Create `src/data/projects.ts` — copy the entire file from `portfolio-react/src/data/projects.ts` verbatim (the interface, all project entries, and helper functions). No content changes needed.

- [ ] **Step 3: Create resume data**

Create `src/data/resume.ts` — copy from `portfolio-react/src/data/resume.ts` with these fixes:
- Change `"Maymoth Homes"` to `"Maymont Homes"` (appears in company name on line 31)
- All other content remains identical

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "Port data files with content updates (Maymont Homes, Kiawah Marathon)"
```

---

### Task 5: Header + Footer Components

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Create: `src/components/SocialLinks.astro`

- [ ] **Step 1: Create SocialLinks component**

Create `src/components/SocialLinks.astro`:

```astro
---
import { siteConfig } from '@/data/content';

interface Props {
  class?: string;
  iconSize?: string;
}

const { class: className = '', iconSize = 'w-5 h-5' } = Astro.props;
---

<div class:list={['flex items-center gap-4', className]}>
  <a
    href={siteConfig.github}
    target="_blank"
    rel="noopener noreferrer"
    class="text-text-muted hover:text-text transition-colors"
    aria-label="GitHub"
  >
    <svg class={iconSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  </a>
  <a
    href={siteConfig.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    class="text-text-muted hover:text-text transition-colors"
    aria-label="LinkedIn"
  >
    <svg class={iconSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  </a>
  <a
    href={`mailto:${siteConfig.email}`}
    class="text-text-muted hover:text-text transition-colors"
    aria-label="Email"
  >
    <svg class={iconSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  </a>
</div>
```

- [ ] **Step 2: Update Header with full navigation**

Replace `src/components/Header.astro`:

```astro
---
import { navLinks, siteConfig } from '@/data/content';
import ThemeToggle from './ThemeToggle.astro';
---

<a href="#main" class="skip-link">Skip to content</a>

<header id="site-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
  <nav class="content-container flex items-center justify-between h-16">
    <a
      href="/"
      class="text-text font-medium hover:text-text-muted transition-colors"
    >
      {siteConfig.name}
    </a>

    <div class="flex items-center gap-6">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class="text-small text-text-muted hover:text-text transition-colors"
        >
          {link.label}
        </a>
      ))}
      <ThemeToggle />
    </div>
  </nav>
</header>

<script>
  function setupHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('bg-bg/80', 'backdrop-blur-md', 'border-b', 'border-border');
      } else {
        header.classList.remove('bg-bg/80', 'backdrop-blur-md', 'border-b', 'border-border');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  setupHeader();
  document.addEventListener('astro:after-swap', setupHeader);
</script>
```

- [ ] **Step 3: Update Footer with social links**

Replace `src/components/Footer.astro`:

```astro
---
import SocialLinks from './SocialLinks.astro';
---

<footer class="py-12 border-t border-border">
  <div class="content-container">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-small text-text-subtle">
        &copy; {new Date().getFullYear()} Henry Pendleton
      </p>
      <SocialLinks />
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Nav links render. Footer shows social icons.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro src/components/SocialLinks.astro
git commit -m "Add full header with scroll blur, footer with social links"
```

---

### Task 6: Homepage Sections

**Files:**
- Create: `src/components/home/Intro.astro`
- Create: `src/components/home/SelectedWork.astro`
- Create: `src/components/home/MoreProjects.astro`
- Create: `src/components/home/About.astro`
- Create: `src/components/home/Now.astro`
- Create: `src/components/home/Contact.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ProjectRow.astro`
- Create: `src/components/StatusBadge.astro`
- Create: `src/components/TechTag.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create StatusBadge component**

Create `src/components/StatusBadge.astro`:

```astro
---
type Status = 'live' | 'building' | 'professional';

interface Props {
  status: Status;
  class?: string;
}

const { status, class: className = '' } = Astro.props;

const config: Record<Status, { label: string; classes: string }> = {
  live: {
    label: 'Live',
    classes: 'text-status-live bg-status-live/10',
  },
  building: {
    label: 'Building',
    classes: 'text-status-building bg-status-building/10',
  },
  professional: {
    label: 'Professional',
    classes: 'text-status-professional bg-status-professional/10',
  },
};

const { label, classes } = config[status];
---

<span class:list={['inline-flex items-center px-2 py-0.5 text-xs font-mono rounded', classes, className]}>
  {label}
</span>
```

- [ ] **Step 2: Create TechTag component**

Create `src/components/TechTag.astro`:

```astro
---
interface Props {
  label: string;
}

const { label } = Astro.props;
---

<span class="text-xs font-mono text-text-subtle">
  {label}
</span>
```

- [ ] **Step 3: Create ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
import StatusBadge from './StatusBadge.astro';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
---

<a
  href={`/projects/${project.slug}`}
  class="group block p-6 rounded-lg border border-border bg-bg-subtle hover:bg-bg-muted hover:border-border-hover transition-all duration-150 hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
>
  <article class="flex flex-col h-full">
    <h3
      class="text-subtitle text-text group-hover:text-accent transition-colors"
      transition:name={`project-title-${project.slug}`}
    >
      {project.title}
    </h3>

    <p class="mt-2 text-small text-text-muted flex-1">
      {project.subtitle}
    </p>

    <div class="mt-4 flex items-center justify-between gap-4">
      <span class="text-xs font-mono text-text-subtle truncate">
        {project.techStack.join(' \u00B7 ')}
      </span>

      <div class="flex items-center gap-3 shrink-0">
        {(project.links.live || project.links.github || project.links.appStore) && (
          <div class="flex items-center gap-2">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onclick="event.stopPropagation()"
                class="text-text-subtle hover:text-accent transition-colors"
                aria-label="View live site"
              >
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onclick="event.stopPropagation()"
                class="text-text-subtle hover:text-text transition-colors"
                aria-label="View source on GitHub"
              >
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            )}
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                onclick="event.stopPropagation()"
                class="text-text-subtle hover:text-text transition-colors"
                aria-label="View on App Store"
              >
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
              </a>
            )}
          </div>
        )}
        <StatusBadge status={project.status} />
      </div>
    </div>
  </article>
</a>
```

- [ ] **Step 4: Create ProjectRow component**

Create `src/components/ProjectRow.astro`:

```astro
---
import StatusBadge from './StatusBadge.astro';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
---

<a
  href={`/projects/${project.slug}`}
  class="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-4 px-4 -mx-4 rounded-lg hover:bg-bg-subtle transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
>
  <div class="flex-1 min-w-0">
    <h3 class="text-body font-medium text-text group-hover:text-accent transition-colors truncate">
      {project.title}
    </h3>
    <p class="text-small text-text-subtle truncate">
      {project.subtitle}
    </p>
  </div>

  <div class="flex items-center gap-4 sm:flex-shrink-0">
    <span class="text-xs font-mono text-text-subtle hidden md:block">
      {project.techStack.slice(0, 3).join(' \u00B7 ')}
    </span>
    <StatusBadge status={project.status} />
  </div>
</a>
```

- [ ] **Step 5: Create Intro section**

Create `src/components/home/Intro.astro`:

```astro
---
import { intro, siteConfig } from '@/data/content';
---

<section id="intro" class="content-container pt-32 md:pt-40 pb-16 min-h-[80vh] flex items-center">
  <div class="max-w-2xl">
    <h1 class="text-display text-text text-balance">
      {intro.headline}
    </h1>

    <p class="mt-3 text-subtitle text-text-muted">{intro.subtitle}</p>

    <p class="mt-8 text-body text-text-muted leading-relaxed">
      {intro.description}
    </p>

    <p class="mt-4 text-small text-text-subtle">{intro.location}</p>

    <!-- CTAs -->
    <div class="mt-10 flex flex-wrap gap-4">
      <a
        href="#work"
        class="inline-flex items-center gap-2 px-6 py-3 text-small font-medium text-bg bg-text rounded-lg hover:bg-text-muted transition-all duration-200 shadow-lg shadow-black/5 dark:shadow-white/5"
      >
        View Work
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
      </a>
      <a
        href="#contact"
        class="inline-flex items-center gap-2 px-6 py-3 text-small font-medium text-text border border-border rounded-lg hover:bg-bg-subtle hover:border-border-hover transition-all duration-200"
      >
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
        Get in Touch
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Create SelectedWork section**

Create `src/components/home/SelectedWork.astro`:

```astro
---
import ProjectCard from '@/components/ProjectCard.astro';
import { selectedProjects } from '@/data/projects';
---

<section id="work" class="content-container py-16">
  <h2 class="text-title text-text">Selected Work</h2>
  <p class="mt-2 text-body text-text-muted">
    Projects I've led or built from scratch.
  </p>

  <div class="mt-8 grid gap-4 sm:grid-cols-2">
    {selectedProjects.map((project) => (
      <ProjectCard project={project} />
    ))}
  </div>
</section>
```

- [ ] **Step 7: Create MoreProjects section**

Create `src/components/home/MoreProjects.astro`:

```astro
---
import ProjectRow from '@/components/ProjectRow.astro';
import { moreProjects } from '@/data/projects';
---

{moreProjects.length > 0 && (
  <section class="content-container pb-16">
    <h2 class="text-title text-text">More Projects</h2>

    <div class="mt-6 divide-y divide-border">
      {moreProjects.map((project) => (
        <ProjectRow project={project} />
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 8: Create About section**

Create `src/components/home/About.astro`:

```astro
---
import { about } from '@/data/content';
---

<section id="about" class="content-container py-16">
  <h2 class="text-title text-text">About</h2>

  <div class="mt-6 space-y-4 max-w-2xl">
    {about.paragraphs.map((paragraph) => (
      <p class="text-body text-text-muted leading-relaxed">
        {paragraph}
      </p>
    ))}
  </div>
</section>
```

- [ ] **Step 9: Create Now section**

Create `src/components/home/Now.astro`:

```astro
---
import { now } from '@/data/content';
---

<aside class="content-container py-6">
  <div class="flex flex-col sm:flex-row gap-4">
    {now.training && (
      <a
        href={now.training.link}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-start gap-3 p-4 rounded-lg bg-bg-subtle border border-border hover:border-border-hover hover:bg-bg-muted transition-colors group flex-1"
      >
        <svg class="w-4 h-4 text-accent mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg>
        <div>
          <span class="text-xs font-mono text-text-subtle uppercase tracking-wider block mb-1">
            Training for
          </span>
          <span class="text-small text-text group-hover:text-accent transition-colors">
            {now.training.race}
          </span>
          <span class="text-xs text-text-subtle block mt-0.5">
            {now.training.date}
          </span>
        </div>
      </a>
    )}

    {now.building && now.building.length > 0 && (
      <div class="flex items-start gap-3 p-4 rounded-lg bg-bg-subtle border border-border flex-1">
        <svg class="w-4 h-4 text-text-subtle mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        <div>
          <span class="text-xs font-mono text-text-subtle uppercase tracking-wider block mb-1">
            Currently
          </span>
          <div class="text-small text-text-muted">
            {now.building.map((item, index) => (
              <p class:list={[index > 0 && 'mt-1']}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
</aside>
```

- [ ] **Step 10: Create Contact section**

Create `src/components/home/Contact.astro`:

```astro
---
import { contact } from '@/data/content';
import SocialLinks from '@/components/SocialLinks.astro';
---

<section id="contact" class="content-container py-16 pb-32">
  <h2 class="text-title text-text">Contact</h2>

  <div class="mt-6 max-w-xl">
    <a
      href={`mailto:${contact.email}`}
      class="text-subtitle text-accent hover:text-accent-muted transition-colors"
    >
      {contact.email}
    </a>

    <p class="mt-4 text-body text-text-muted">
      {contact.availability}
    </p>
    <p class="mt-1 text-small text-text-subtle">
      {contact.locationNote}
    </p>

    <SocialLinks class="mt-6" />
  </div>
</section>
```

- [ ] **Step 11: Assemble homepage**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Intro from '@/components/home/Intro.astro';
import SelectedWork from '@/components/home/SelectedWork.astro';
import MoreProjects from '@/components/home/MoreProjects.astro';
import About from '@/components/home/About.astro';
import Now from '@/components/home/Now.astro';
import Contact from '@/components/home/Contact.astro';
import { siteConfig } from '@/data/content';

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} - Portfolio`,
    url: "https://henrypendleton.com",
    description: "Personal portfolio and professional website",
    author: { "@type": "Person", name: siteConfig.name },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://henrypendleton.com/#person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: "https://henrypendleton.com",
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charleston",
      addressRegion: "SC",
      addressCountry: "US",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
  },
];
---

<BaseLayout
  title="Henry Pendleton - MarTech Software Engineer"
  description="MarTech Software Engineer building web and marketing technology solutions. React, TypeScript, Python, SwiftUI."
  structuredData={structuredData}
>
  <main id="main" class="flex-1">
    <Intro />
    <SelectedWork />
    <MoreProjects />
    <About />
    <Now />
    <Contact />
  </main>
</BaseLayout>
```

- [ ] **Step 12: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Homepage renders all sections with correct content.

- [ ] **Step 13: Commit**

```bash
git add src/components/home/ src/components/ProjectCard.astro src/components/ProjectRow.astro src/components/StatusBadge.astro src/components/TechTag.astro src/pages/index.astro
git commit -m "Add homepage with all sections, project cards, and layout"
```

---

### Task 7: Project Detail Pages

**Files:**
- Create: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Create project detail page**

Create `src/pages/projects/[slug].astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import StatusBadge from '@/components/StatusBadge.astro';
import { projects, getProject } from '@/data/projects';

export function getStaticPaths() {
  return projects.map((project) => ({
    params: { slug: project.slug },
  }));
}

const { slug } = Astro.params;
const project = getProject(slug);

if (!project) {
  return Astro.redirect('/404');
}

const { caseStudy, links } = project;
---

<BaseLayout
  title={`${project.title} - Henry Pendleton`}
  description={project.subtitle}
>
  <main id="main" class="flex-1 pt-24">
    <!-- Back link -->
    <div class="content-container">
      <a
        href="/#work"
        class="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
      >
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Work
      </a>
    </div>

    <!-- Header -->
    <section class="content-container pt-8 pb-8">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1
            class="text-display text-text"
            transition:name={`project-title-${project.slug}`}
          >
            {project.title}
          </h1>
          <p class="mt-2 text-subtitle text-text-muted">{project.subtitle}</p>
        </div>
        <StatusBadge status={project.status} class="mt-2" />
      </div>

      <div class="mt-6">
        <span class="text-small font-mono text-text-subtle">
          {project.techStack.join(' \u00B7 ')}
        </span>
      </div>

      {(links.live || links.github || links.appStore || links.website) && (
        <div class="mt-6 flex flex-wrap gap-3">
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 text-small font-medium text-bg bg-text rounded-md hover:bg-text-muted transition-colors"
            >
              View Live
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          )}
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 text-small font-medium text-text border border-border rounded-md hover:bg-bg-subtle hover:border-border-hover transition-colors"
            >
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              View Source
            </a>
          )}
          {links.appStore && (
            <a
              href={links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 text-small font-medium text-text border border-border rounded-md hover:bg-bg-subtle hover:border-border-hover transition-colors"
            >
              App Store
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          )}
          {links.website && (
            <a
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 text-small font-medium text-text border border-border rounded-md hover:bg-bg-subtle hover:border-border-hover transition-colors"
            >
              Website
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          )}
        </div>
      )}
    </section>

    <!-- Project images -->
    {project.images && project.images.length > 0 && (
      <section class="wide-container pb-12">
        <figure>
          <div class="overflow-hidden rounded-xl border border-border bg-bg-subtle shadow-2xl shadow-black/20 aspect-video">
            <img
              src={project.images[0].src}
              alt={project.images[0].alt}
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {project.images[0].caption && (
            <figcaption class="mt-3 text-sm text-text-muted text-center">
              {project.images[0].caption}
            </figcaption>
          )}
        </figure>

        {project.images.length > 1 && (
          <div class="mt-8 grid gap-6 md:grid-cols-2">
            {project.images.slice(1).map((image) => (
              <figure>
                <div class="overflow-hidden rounded-lg border border-border bg-bg-subtle shadow-lg shadow-black/10 aspect-video">
                  <img
                    src={image.src}
                    alt={image.alt}
                    class="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                {image.caption && (
                  <figcaption class="mt-2 text-xs text-text-subtle">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>
    )}

    <!-- Case study content -->
    {caseStudy && (
      <section class="content-container pb-16">
        <div class="max-w-2xl space-y-12">
          {caseStudy.overview && (
            <div>
              <h2 class="text-title text-text">Overview</h2>
              <p class="mt-4 text-body text-text-muted leading-relaxed">{caseStudy.overview}</p>
            </div>
          )}

          {caseStudy.problem && (
            <div>
              <h2 class="text-title text-text">The Problem</h2>
              <p class="mt-4 text-body text-text-muted leading-relaxed">{caseStudy.problem}</p>
            </div>
          )}

          {caseStudy.whatIBuilt && caseStudy.whatIBuilt.length > 0 && (
            <div>
              <h2 class="text-title text-text">What I Built</h2>
              <ul class="mt-4 space-y-3">
                {caseStudy.whatIBuilt.map((item) => (
                  <li class="flex gap-3 text-body text-text-muted">
                    <span class="text-text-subtle shrink-0">&mdash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {caseStudy.keyDecisions && (
            <div>
              <h2 class="text-title text-text">Key Decisions</h2>
              <p class="mt-4 text-body text-text-muted leading-relaxed">{caseStudy.keyDecisions}</p>
            </div>
          )}

          {caseStudy.results && (
            <div>
              <h2 class="text-title text-text">Results</h2>
              <p class="mt-4 text-body text-text-muted leading-relaxed">{caseStudy.results}</p>
            </div>
          )}
        </div>
      </section>
    )}

    <!-- Bottom navigation -->
    <section class="content-container pt-8 pb-16">
      <a
        href="/#work"
        class="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
      >
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to all projects
      </a>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Copy project images to public directory**

```bash
cp -r portfolio-react/public/strava-local public/projects/strava-local
```

Also copy any other assets from `portfolio-react/public/` that are referenced (favicon, etc.):

```bash
cp portfolio-react/public/hp_logo2_white.svg public/
cp portfolio-react/public/site.webmanifest public/ 2>/dev/null || true
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Check `dist/projects/` directory contains an HTML file for each project slug.

- [ ] **Step 4: Commit**

```bash
git add src/pages/projects/ public/
git commit -m "Add project detail pages with case studies and View Transitions"
```

---

### Task 8: Blog — Content Collections + Pages

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/what-ultramarathons-taught-me-about-software.md`
- Create: `src/content/blog/cribscore-1-2-release.md`
- Create: `src/content/blog/raspberry-pi-eink-dashboard.md`
- Create: `src/content/blog/hello-world.md`
- Create: `src/components/BlogPostCard.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Create content collection config**

Create `src/content.config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string().default('Henry Pendleton'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Convert blog posts to markdown**

Convert each of the 4 blog posts from `portfolio-react/src/data/blog.ts` to markdown files in `src/content/blog/`. Each file gets frontmatter extracted from the TypeScript object, and the HTML content converted to markdown.

Create `src/content/blog/what-ultramarathons-taught-me-about-software.md`:

```markdown
---
title: "What Ultramarathons Taught Me About Building Software"
description: "Running 62 miles through the desert teaches you things about pacing and ignoring small problems. Turns out those lessons apply to code too."
publishedAt: 2026-01-31
author: "Henry Pendleton"
tags: ["ultrarunning", "software-engineering", "career"]
featured: true
---

I didn't start running ultras to become a better engineer. I started because I like being outside and I'm stubborn in a way that responds well to training plans.

But somewhere around hour six of my first 100K, shuffling through the Arizona desert at 2am, I realized that the way these races punish bad decisions feels a lot like the way long software projects do. You make a choice early on, think you got away with it, and then it catches up to you at mile 45.

## Going Out Too Fast

Every new ultrarunner learns this the hard way. You feel great at mile 10, so you run faster than your plan says. You're borrowing energy you don't have yet, and the interest rate is brutal.

I've done the same thing on software projects. Built abstractions before there were users. Solved problems that didn't exist yet. Over-engineered things because I was "thinking ahead." It feels responsible in the moment. But you're just running too hard at mile three, and you pay for it later when the real work shows up.

Now I try to ship something small first. Learn from it. Resist the urge to sprint just because I can.

## Small Problems That Become Big Problems

Most ultras don't end with someone collapsing at the finish. They end quietly. A blister that got ignored. A tight achilles that turned into real pain. Something small that was easy to dismiss until it wasn't.

Software fails the same way. A confusing interaction that nobody fixes. Tech debt that's "not urgent." A missing test that seems harmless. These things compound. By the time they demand attention, they're expensive.

I've gotten better at noticing small signals early. In my legs and in a codebase. Fixing problems when they're minor is almost always cheaper than waiting.

## Systems Over Motivation

Nobody finishes an ultra on motivation alone. That fades somewhere around mile 40. What gets you through is boring stuff: a fueling plan, salt tablets every hour, drinking before you're thirsty. You don't negotiate with the plan mid-race. You just follow it.

I think about tests, code reviews, and CI pipelines the same way now. They're not exciting. They're the equivalent of eating a gel when you don't feel like it. But they keep the system functioning when things get hard. Discipline beats inspiration every time.

## Feeling Bad Doesn't Mean Failing

One of the hardest things to learn in ultrarunning is that feeling terrible doesn't mean you're doing something wrong. Some of the most productive miles feel awful. You're tired and uncomfortable but still moving forward.

The messy middle of a software project feels the same way. Refactors feel like regressions. Platform work feels invisible. Long migrations make it seem like nothing is shipping. Early in my career I took that discomfort as a sign something was broken. Now I just recognize it as part of the work.

## Knowing When to Stop

There's a version of endurance culture that glorifies never quitting. Push through everything. Finish at all costs.

That mindset breaks people.

Experience teaches you that stopping is sometimes the right call. Long-term health matters more than one finish line. The same is true with software. Killing a project, pausing a launch, or saying no to a feature can be the responsible choice. I used to think toughness meant never backing down. Now I think the real skill is judgment.

## The Long Game

Running ultras didn't make me a better engineer overnight. But it trained the same muscles: patience, restraint, respect for long timelines. I don't sprint through projects anymore. I pace them. I pay attention to small problems. I build boring systems that keep working when things get uncomfortable.

Finishing strong matters more than starting fast. That's true whether you're 50 miles into a race or six months into a codebase.
```

Repeat for the other 3 posts — same process: extract frontmatter from the TypeScript object, convert HTML tags to markdown syntax. The content is already in the existing data file; just convert `<h2>` to `##`, `<p>` to paragraphs, `<ul><li>` to `- `, `<strong>` to `**`, `<em>` to `*`, `<code>` to backticks, `<pre><code>` to fenced code blocks, `<a href="...">text</a>` to `[text](...)`, and `<hr>` to `---`.

- [ ] **Step 3: Create BlogPostCard component**

Create `src/components/BlogPostCard.astro`:

```astro
---
interface Props {
  slug: string;
  title: string;
  description: string;
  publishedAt: Date;
  tags?: string[];
  readingTime?: number;
}

const { slug, title, description, publishedAt, tags = [], readingTime } = Astro.props;

const formattedDate = publishedAt.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<a
  href={`/blog/${slug}`}
  class="group block p-6 rounded-lg border border-border bg-bg-subtle hover:bg-bg-muted hover:border-border-hover transition-all duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
>
  <article>
    <time datetime={publishedAt.toISOString()} class="text-xs font-mono text-text-subtle">
      {formattedDate}
    </time>

    <h3
      class="mt-2 text-subtitle text-text group-hover:text-accent transition-colors"
      transition:name={`blog-title-${slug}`}
    >
      {title}
    </h3>

    <p class="mt-2 text-small text-text-muted">
      {description}
    </p>

    <div class="mt-4 flex items-center gap-3">
      {tags.length > 0 && (
        <div class="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span class="text-xs font-mono text-text-subtle bg-bg-muted px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      {readingTime && (
        <span class="text-xs text-text-subtle">
          {readingTime} min read
        </span>
      )}
    </div>
  </article>
</a>
```

- [ ] **Step 4: Create blog listing page**

Create `src/pages/blog/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import BlogPostCard from '@/components/BlogPostCard.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}
---

<BaseLayout
  title="Blog - Henry Pendleton"
  description="Thoughts on software engineering, MarTech, and the occasional side project."
>
  <main id="main" class="flex-1 pt-24">
    <section class="content-container py-16">
      <h1 class="text-display text-text">Blog</h1>
      <p class="mt-4 text-body text-text-muted max-w-xl">
        Thoughts on software engineering, MarTech, and the occasional side project.
      </p>
    </section>

    <section class="content-container pb-16">
      {posts.length === 0 && (
        <p class="text-text-muted py-12 text-center">No posts yet. Check back soon.</p>
      )}

      {posts.length > 0 && (
        <div class="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogPostCard
              slug={post.id}
              title={post.data.title}
              description={post.data.description}
              publishedAt={post.data.publishedAt}
              tags={post.data.tags}
              readingTime={estimateReadingTime(post.body || '')}
            />
          ))}
        </div>
      )}
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 5: Create blog post page**

Create `src/pages/blog/[...slug].astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);

const formattedDate = post.data.publishedAt.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const words = (post.body || '').split(/\s+/).length;
const readingTime = Math.max(1, Math.ceil(words / 250));
---

<BaseLayout
  title={`${post.data.title} - Henry Pendleton`}
  description={post.data.description}
  ogType="article"
  article={{
    publishedTime: post.data.publishedAt.toISOString(),
    author: post.data.author,
    tags: post.data.tags,
  }}
  structuredData={{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.publishedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.data.author,
      url: "https://henrypendleton.com",
    },
  }}
>
  <main id="main" class="flex-1 pt-24">
    <!-- Back link -->
    <div class="content-container">
      <a
        href="/blog"
        class="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
      >
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Blog
      </a>
    </div>

    <!-- Header -->
    <section class="content-container pt-8 pb-8">
      <div class="max-w-2xl">
        <time datetime={post.data.publishedAt.toISOString()} class="text-small text-text-subtle">
          {formattedDate}
        </time>

        <h1
          class="mt-2 text-display text-text"
          transition:name={`blog-title-${post.id}`}
        >
          {post.data.title}
        </h1>

        <p class="mt-4 text-subtitle text-text-muted">
          {post.data.description}
        </p>

        <div class="mt-6 flex items-center gap-4">
          {post.data.tags && post.data.tags.length > 0 && (
            <div class="flex flex-wrap gap-2">
              {post.data.tags.map((tag) => (
                <span class="text-xs font-mono text-text-subtle bg-bg-muted px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span class="text-xs text-text-subtle">{readingTime} min read</span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="content-container pb-16">
      <article class="prose prose-neutral dark:prose-invert max-w-2xl">
        <Content />
      </article>
    </section>

    <!-- Bottom navigation -->
    <section class="content-container pt-8 pb-16">
      <a
        href="/blog"
        class="inline-flex items-center gap-2 text-small text-text-muted hover:text-text transition-colors"
      >
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to all posts
      </a>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 6: Add prose styles to global CSS**

Append to `src/styles/global.css` inside the `@layer components` block:

```css
  /* Blog prose styling */
  .prose {
    --tw-prose-body: rgb(var(--color-text-muted));
    --tw-prose-headings: rgb(var(--color-text));
    --tw-prose-lead: rgb(var(--color-text-muted));
    --tw-prose-links: rgb(var(--color-accent));
    --tw-prose-bold: rgb(var(--color-text));
    --tw-prose-counters: rgb(var(--color-text-subtle));
    --tw-prose-bullets: rgb(var(--color-text-subtle));
    --tw-prose-hr: rgb(var(--color-border));
    --tw-prose-quotes: rgb(var(--color-text));
    --tw-prose-quote-borders: rgb(var(--color-border));
    --tw-prose-captions: rgb(var(--color-text-subtle));
    --tw-prose-code: rgb(var(--color-text));
    --tw-prose-pre-code: rgb(var(--color-text));
    --tw-prose-pre-bg: rgb(var(--color-bg-subtle));
    --tw-prose-th-borders: rgb(var(--color-border));
    --tw-prose-td-borders: rgb(var(--color-border));
  }

  .prose a {
    @apply underline underline-offset-2 hover:text-accent-muted transition-colors;
  }

  .prose code {
    @apply font-mono text-small bg-bg-muted px-1.5 py-0.5 rounded;
  }

  .prose pre {
    @apply bg-bg-subtle border border-border rounded-lg p-4 overflow-x-auto;
  }

  .prose pre code {
    @apply bg-transparent p-0;
  }

  .prose blockquote {
    @apply border-l-2 border-accent pl-4 italic;
  }
```

- [ ] **Step 7: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Check `dist/blog/` directory contains `index.html` and a folder for each blog post slug.

- [ ] **Step 8: Commit**

```bash
git add src/content/ src/content.config.ts src/components/BlogPostCard.astro src/pages/blog/ src/styles/global.css
git commit -m "Add blog with Content Collections, markdown posts, and prose styling"
```

---

### Task 9: Resume Page

**Files:**
- Create: `src/pages/resume.astro`

- [ ] **Step 1: Create resume page**

Create `src/pages/resume.astro` — port the layout from `portfolio-react/src/components/Resume.tsx` converting JSX to Astro template syntax. Import from `@/data/resume`. Include:

- Full resume layout with all sections (Technical Skills, Professional Experience, Technical Projects, Prior Experience, Education)
- Print styles (`@media print`) embedded in a `<style>` tag
- Download/Print button that calls `window.print()`
- Person structured data (port from `portfolio-react/src/pages/ResumePage.tsx`)
- SEO meta tags

The layout and Tailwind classes are nearly identical — the main change is converting React's `className` to `class`, `.map()` to Astro's `{items.map()}`, and removing all React imports.

Include a small inline `<script>` for the print button click handler.

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. `dist/resume/index.html` exists with full resume content.

- [ ] **Step 3: Commit**

```bash
git add src/pages/resume.astro
git commit -m "Add resume page with print styles and structured data"
```

---

### Task 10: 404 Page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create 404 page**

Create `src/pages/404.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Not Found - Henry Pendleton"
  description="The page you're looking for doesn't exist."
>
  <main id="main" class="flex-1 pt-32 pb-16">
    <div class="content-container text-center">
      <p class="text-6xl font-mono text-text-subtle">404</p>
      <h1 class="mt-4 text-title text-text">Page not found</h1>
      <p class="mt-4 text-body text-text-muted">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        class="mt-8 inline-flex items-center gap-2 px-6 py-3 text-small font-medium text-bg bg-text rounded-lg hover:bg-text-muted transition-colors"
      >
        Go home
      </a>
    </div>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/404.astro
git commit -m "Add 404 page"
```

---

### Task 11: Scroll Animations

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add scroll animation CSS**

Add to `src/styles/global.css` in the `@layer utilities` block:

```css
  /* Scroll-triggered fade-in */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(1rem);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-on-scroll {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
```

- [ ] **Step 2: Add Intersection Observer script to BaseLayout**

Add this script block before the closing `</body>` tag in `src/layouts/BaseLayout.astro`:

```html
<script>
  function setupScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  setupScrollAnimations();
  document.addEventListener('astro:after-swap', setupScrollAnimations);
</script>
```

- [ ] **Step 3: Add `animate-on-scroll` class to homepage sections**

Add `class="animate-on-scroll"` to the outer wrapper of the SelectedWork, MoreProjects, About, Now, and Contact sections. For example, in `SelectedWork.astro`, wrap the section:

```astro
<section id="work" class="content-container py-16 animate-on-scroll">
```

Do the same for the other homepage section components.

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Sections have the `animate-on-scroll` class in the HTML output.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro src/components/home/
git commit -m "Add scroll-triggered fade-in animations with reduced motion support"
```

---

### Task 12: Final Build + Cleanup

**Files:**
- Modify: `package.json` (verify scripts)

- [ ] **Step 1: Verify all scripts work**

```bash
npm run build
```

Expected: Clean build with no errors. Check `dist/` directory contains:
- `index.html`
- `resume/index.html`
- `404.html`
- `blog/index.html`
- `blog/<slug>/index.html` for each post
- `projects/<slug>/index.html` for each project
- `sitemap-index.xml` and `sitemap-0.xml`
- `_astro/` directory with hashed CSS

- [ ] **Step 2: Test dev server**

```bash
npm run dev
```

Manually verify:
- Homepage loads with all sections
- Theme toggle works (cycles light → dark → system)
- Theme persists across page navigation (View Transitions)
- Clicking a project card navigates to detail page with smooth transition
- Blog listing shows all posts
- Blog post renders markdown content with prose styling
- Resume page renders with all sections
- 404 page shows for non-existent routes
- Nav links work correctly
- Social links open in new tabs
- Mobile responsive (resize browser)

- [ ] **Step 3: Commit final state**

```bash
git add -A
git commit -m "Complete Astro portfolio rebuild — ready for deployment"
```

---

### Task 13: Deploy to Netlify

- [ ] **Step 1: Update Netlify build settings if needed**

The `netlify.toml` is already configured. If deploying from a new repo or branch, update the Netlify site settings to point to the new build command (`npm run build`) and publish directory (`dist`).

- [ ] **Step 2: Push and verify deployment**

Push to the branch Netlify is watching. Verify the deployed site at henrypendleton.com.

- [ ] **Step 3: Run Lighthouse audit**

Target scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Fix any issues found.
