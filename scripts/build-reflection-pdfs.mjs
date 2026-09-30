// Builds the printable Claim & Reflection pages from templates/reflection/claim-and-reflection.html
// (the reference layout: twelve A4 pages, `#p0` … `#p11`):
//
//   public/downloads/templates/reflection-<code>.pdf   one A4 page each (R·1A → reflection-r1a.pdf)
//   public/downloads/claim-and-reflection.pdf          all twelve pages, in order
//   public/reflection/<code>.webp                      a preview image of each page, for the site
//
// Usage:  npm run build:reflection
//
// Rendered by headless Chromium through playwright-core (a dev dependency that does not download a browser;
// point CHROMIUM_PATH at a Chrome or Chromium binary if it is not found). The previews use sharp, which
// Astro already installs. The generated files are committed, so the site build never needs a browser.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tpl = resolve(root, 'templates/reflection/claim-and-reflection.html');
const pdfDir = resolve(root, 'public/downloads/templates');
const previewDir = resolve(root, 'public/reflection');
mkdirSync(pdfDir, { recursive: true });
mkdirSync(previewDir, { recursive: true });

// Page order in the template.
const CODES = ['shared', 'r1a', 'r1b', 'r2a', 'r2b', 'r3a', 'r3b', 'r4a', 'r4b', 're1', 're2', 're3'];

const font = (f) => pathToFileURL(resolve(root, 'public/fonts', f)).href;
const html = readFileSync(tpl, 'utf8')
  .replace('{{FONT_BRICOLAGE}}', font('BricolageGrotesque-Variable.woff2'))
  .replace('{{FONT_PLEX_400}}', font('IBMPlexMono-Regular.woff2'))
  .replace('{{FONT_PLEX_600}}', font('IBMPlexMono-SemiBold.woff2'));

const candidates = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome'].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 2 });
// Fonts are read from disk, so the page has to be a file, not an in-memory string.
const tmp = resolve(root, 'templates/reflection/.render.html');
writeFileSync(tmp, html);
await page.goto(pathToFileURL(tmp).href);
await page.evaluate(() => document.fonts.ready);

const pdfOpts = { format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true };

// One page at a time: hide the others, print, show them again.
const only = (idx) =>
  page.evaluate((n) => {
    document.querySelectorAll('section.pg').forEach((s, i) => (s.style.display = i === n ? '' : 'none'));
  }, idx);

for (let i = 0; i < CODES.length; i++) {
  await only(i);
  const code = CODES[i];
  await page.pdf({ ...pdfOpts, path: resolve(pdfDir, `reflection-${code}.pdf`) });
  // A preview of the printed page: the frame only, without the "where it goes" strip.
  const frame = page.locator('section.pg:not([style*="none"]) .fr');
  const png = await frame.screenshot({ type: 'png' });
  await sharp(png).resize({ width: 1240 }).webp({ quality: 82 }).toFile(resolve(previewDir, `${code}.webp`));
}

// All twelve, in order.
await page.evaluate(() => document.querySelectorAll('section.pg').forEach((s) => (s.style.display = '')));
await page.pdf({ ...pdfOpts, path: resolve(root, 'public/downloads/claim-and-reflection.pdf') });

await browser.close();
import('node:fs').then(({ rmSync }) => rmSync(tmp, { force: true }));
console.log(`Built ${CODES.length} reflection pages and previews.`);
