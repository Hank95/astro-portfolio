# henrypendleton.com

Personal portfolio and blog built with [Astro](https://astro.build), Tailwind CSS, and TypeScript. Deployed on Cloudflare Pages.

## Tech Stack

- **Framework:** Astro 4 (static site generation)
- **Styling:** Tailwind CSS 3 + Typography plugin
- **Language:** TypeScript
- **Deployment:** Cloudflare Pages
- **Analytics:** Google Analytics 4

## Local Development

Requires Node 20+.

```bash
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Type-check + build to dist/
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

Pushes to `main` trigger a build on Cloudflare Pages. Cache headers are configured in `public/_headers`.
