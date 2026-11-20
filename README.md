# henrypendleton.com

Personal portfolio and blog built with [Astro](https://astro.build), Tailwind CSS, and TypeScript. Deployed on Vercel.

## Tech Stack

- **Framework:** Astro 7 (static site generation)
- **Styling:** Tailwind CSS 4 + Typography plugin
- **Language:** TypeScript
- **Deployment:** Vercel
- **Analytics:** Google Analytics 4

## Local Development

Requires Node 22.23.4 or newer (`.nvmrc` pins the version used in CI).

```bash
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Type-check, build to dist/, sync the CSP in vercel.json
npm run preview    # Preview the production build locally
```

## Project Structure

```
src/
  components/    # Reusable Astro components
  content/blog/  # Markdown blog posts
  data/          # Site content, projects, resume data
  layouts/       # Page layouts
  pages/         # File-based routing
  styles/        # Global CSS and theme variables
public/          # Static assets (images, favicon, fonts)
```

## Deployment

Pushes to `main` deploy to production on Vercel; every other branch gets a preview URL.

Security and cache headers live in `vercel.json`. The Content-Security-Policy lists a hash for each inline script, so `npm run build` rewrites it when one changes. Commit that change: CI and Vercel builds fail if the committed policy does not match the build.
