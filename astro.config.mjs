import { defineConfig } from 'astro/config';

// Where the site is served from is decided by environment variables, so the
// same code builds for local dev, GitHub Pages, Vercel, or a custom domain.
//
//   SITE_URL   Public origin, e.g. https://bored-kxiden.github.io
//   BASE_PATH  Sub-path the site lives under, e.g. /Indian-Context---Digital-Tools
//              Leave unset (or "/") when serving from a domain root.
//
// The GitHub Pages workflow (.github/workflows/deploy.yml) sets both.
const site = process.env.SITE_URL || undefined;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
