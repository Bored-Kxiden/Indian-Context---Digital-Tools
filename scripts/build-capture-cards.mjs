// Generates Component 2's printable capture cards from the FigJam template's wording:
//
//   public/downloads/templates/c2-capture-cards.pdf   A4 landscape, 2 pages:
//     1. the six capture cards (one mission per card, with the card's own question), to cut out
//     2. four photo slips: the image, the three prompts, the card's question, and the evidence tag
//
// Source: templates/visual-culture/capture-cards.json (the same file the site reads, D37).
// Usage:  npm run build:capture-cards   (needs Chromium, like build:templates; the PDF is committed)

import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(resolve(root, 'templates/visual-culture/capture-cards.json'), 'utf8'));
const out = resolve(root, 'public/downloads/templates/c2-capture-cards.pdf');
const manifestPath = resolve(root, 'src/data/pdf-manifest.json');
const font = readFileSync(resolve(root, 'public/fonts/BricolageGrotesque-Variable.woff2')).toString('base64');
const mono = existsSync(resolve(root, 'public/fonts/IBMPlexMono-Regular.woff2'))
  ? readFileSync(resolve(root, 'public/fonts/IBMPlexMono-Regular.woff2')).toString('base64')
  : null;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lines = (n) => '<i></i>'.repeat(n);

// Component 2's colour: turmeric, always with ink text (as on the site).
const css = `
@font-face { font-family: 'Bricolage'; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 200 800; }
${mono ? `@font-face { font-family: 'Plex Mono'; src: url(data:font/woff2;base64,${mono}) format('woff2'); }` : ''}
@page { size: 297mm 210mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { font-family: 'Bricolage', Arial, sans-serif; color: #16140f; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.sheet { width: 297mm; height: 210mm; padding: 10mm 12mm 9mm; display: flex; flex-direction: column; gap: 4mm; break-after: page; position: relative; overflow: hidden; }
.sheet:last-child { break-after: auto; }
.top { display: flex; justify-content: space-between; align-items: flex-end; border-top: 1.4mm solid #16140f; padding-top: 3mm; }
.eb { font-family: 'Plex Mono', monospace; font-size: 7.5pt; letter-spacing: .12em; text-transform: uppercase; color: #5e584e; margin: 0; }
h1 { font-size: 20pt; margin: 1mm 0 0; letter-spacing: -.01em; }
.chip { display: inline-block; background: #e8a92a; color: #16140f; border-radius: 99px; padding: 1mm 3mm; font-family: 'Plex Mono', monospace; font-size: 7pt; letter-spacing: .08em; text-transform: uppercase; font-weight: 700; }
.lead { font-size: 9.5pt; margin: 0; color: #3a362f; max-width: 250mm; }
.grid { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 0; border: .3mm dashed #8b8374; min-height: 0; }
.card { border: .3mm dashed #8b8374; padding: 5mm 6mm; display: flex; flex-direction: column; gap: 2mm; min-height: 0; }
.card .n { font-family: 'Plex Mono', monospace; font-size: 7pt; letter-spacing: .12em; color: #7a4e00; font-weight: 700; }
.card h2 { font-size: 13pt; line-height: 1.15; margin: 0; }
.card p { font-size: 9pt; line-height: 1.35; margin: 0; color: #3a362f; }
.card .ask { margin-top: auto; background: #fbf0d4; border-left: 1.2mm solid #e8a92a; padding: 2mm 3mm; font-weight: 700; color: #16140f; font-size: 9.5pt; }
.foot { display: flex; justify-content: space-between; font-family: 'Plex Mono', monospace; font-size: 6.5pt; letter-spacing: .08em; text-transform: uppercase; color: #8b8374; }
.slips { flex: 1; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; border: .3mm dashed #8b8374; min-height: 0; }
.slip { border: .3mm dashed #8b8374; padding: 4mm 5mm; display: grid; grid-template-columns: 34mm 1fr; gap: 2mm 4mm; min-height: 0; }
.photo { grid-row: span 5; min-height: 0; border: .35mm solid #b9b3a5; border-radius: 1.5mm; display: flex; align-items: center; justify-content: center; font-family: 'Plex Mono', monospace; font-size: 6.5pt; color: #8b8374; text-align: center; padding: 2mm; }
.slip .meta { display: flex; gap: 4mm; font-family: 'Plex Mono', monospace; font-size: 6.5pt; letter-spacing: .08em; text-transform: uppercase; color: #5e584e; }
.q { font-size: 8.5pt; font-weight: 700; }
.q span { display: block; }
.q i, .l i { display: block; border-bottom: .25mm solid #cfc6b4; height: 4.2mm; }
.tags { grid-column: 1 / -1; display: flex; gap: 5mm; font-size: 8pt; align-items: center; }
.box { display: inline-block; width: 3mm; height: 3mm; border: .3mm solid #16140f; margin-right: 1mm; vertical-align: -.4mm; }
`;

const cards = data.missions
  .map(
    (m) => `<div class="card">
  <span class="n">Card ${esc(m.n)}</span>
  <h2>${esc(m.title)}</h2>
  <p>${esc(m.body)}</p>
  <p class="ask">→ ${esc(m.ask)}</p>
</div>`,
  )
  .join('');

const slip = `<div class="slip">
  <div class="photo">${esc(data.captureStage.items[0])}<br>stick or note it here</div>
  <div class="meta"><span>Mission no. ____</span><span>Photo no. ____</span><span>Code ______</span></div>
  ${data.captureStage.items
    .slice(1)
    .map((q) => `<div class="q"><span>${esc(q)}</span>${lines(2)}</div>`)
    .join('')}
  <div class="q"><span>The card’s own question</span>${lines(2)}</div>
  <div class="tags"><span class="eb">In their words, any language</span><span><i class="box"></i>Observed</span><span><i class="box"></i>Reported</span></div>
</div>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>${css}</style></head><body>
<section class="sheet">
  <div class="top">
    <div><p class="eb">Component 2 · Reading Visual Culture · Tool 1 · Show</p><h1>Capture cards</h1></div>
    <span class="chip">${esc(data.heading)} · ${esc(data.subheading)}</span>
  </div>
  <p class="lead">${esc(data.promptsLine)} ${esc(data.optional[1])} ${esc(data.optional[2])}</p>
  <div class="grid">${cards}</div>
  <div class="foot"><span>Beyond the Edge Case · cut along the dashed lines · one set per participant</span><span>Wording: the FigJam template</span></div>
</section>
<section class="sheet">
  <div class="top">
    <div><p class="eb">${esc(data.captureStage.lead)}</p><h1>Photo slips</h1></div>
    <span class="chip">One slip per photo, at the talk-back</span>
  </div>
  <p class="lead">${esc(data.captureStage.note)} ${esc(data.output.ready)}</p>
  <div class="slips">${slip.repeat(4)}</div>
  <div class="foot"><span>Beyond the Edge Case · Component 2 · Reading Visual Culture</span><span>Tag each answer: Observed (visible in the photo) or Reported (they said it)</span></div>
</section>
</body></html>`;

const executablePath = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium', '/usr/bin/chromium', '/usr/bin/google-chrome']
  .filter(Boolean)
  .find((p) => existsSync(p));
const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
const overflow = await page.evaluate(() =>
  [...document.querySelectorAll('.card, .slip')].filter((el) => el.scrollHeight > el.clientHeight + 1).length,
);
if (overflow) {
  console.error(`✗ ${overflow} card(s) or slip(s) overflow; shorten the text or the lines.`);
  process.exit(1);
}
await page.pdf({ path: out, width: '297mm', height: '210mm', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest['templates/c2-capture-cards.pdf'] = { pages: 2 };
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`✓ templates/c2-capture-cards.pdf: 2 pages, ${(statSync(out).size / 1024).toFixed(0)} KB`);
