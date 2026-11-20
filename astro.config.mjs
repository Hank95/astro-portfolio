// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://henrypendleton.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Emit every script and font as a file instead of inlining small ones, so the
      // Content-Security-Policy needs no data: sources and fewer inline-script hashes.
      assetsInlineLimit: 0,
    },
  },
});
