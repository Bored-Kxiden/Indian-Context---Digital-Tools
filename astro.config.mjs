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

const prefix = base.replace(/\/+$/, '');
const languageTools = [
  'meaning-card',
  'physical-field-kit',
  'fidelity-protocol',
  'language-lens-audit',
  'expression-library',
  'design-language-library',
];

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // The six Meaning-to-Interface tools used to live under /tools/. They are now
  // Component 3 · Reading Language. Keep old links working.
  // (Astro does not add the base path to a redirect's destination, so it is added here.)
  redirects: {
    '/tools': `${prefix}/components/language/`,
    ...Object.fromEntries(languageTools.map((slug) => [`/tools/${slug}`, `${prefix}/components/language/${slug}/`])),
  },
});
