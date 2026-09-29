// Generates the downloadable templates in /public/downloads from the definitions
// in /templates:
//
//   meaning-card-template.pdf     front + back of one Meaning Card
//   physical-field-kit.pdf        every card in the Physical Field Kit
//   meaning-cards-template.csv    one column per Meaning Card field + Fidelity tags
//
// Usage:  npm run build:templates
//
// PDFs are rendered by headless Chromium (via playwright-core, a dev dependency
// that does not download a browser). Point CHROMIUM_PATH at a Chrome/Chromium
// binary if it is not found automatically. The generated files are committed, so
// the site build (and CI) never needs a browser.

import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/downloads');
const manifestPath = resolve(root, 'src/data/pdf-manifest.json');
const readJson = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));

const fields = readJson('templates/meaning-card-fields.json');
const kit = readJson('templates/kit-cards.json');

// Card size: 6 × 4 in landscape, a standard index-card and photo-print size.
const W_MM = 152.4;
const H_MM = 101.6;
const VERSION = 'Draft v0.1';

const MODULE_COLOR = { context: '#a24a06', person: '#0b6b73', interpret: '#4338ca' };

const LINES = '<i></i>'.repeat(16);

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- CSS shared by every card ----------
const css = `
@page { size: ${W_MM}mm ${H_MM}mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: 'Liberation Sans', Arial, Helvetica, sans-serif;
  color: #1d2230;
  font-size: 8.5pt;
  line-height: 1.3;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.card {
  position: relative;
  width: ${W_MM}mm;
  height: ${H_MM}mm;
  padding: 5.5mm 7mm 8mm;
  overflow: hidden;
  break-after: page;
  page-break-after: always;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.card:last-child { break-after: auto; page-break-after: auto; }
.card::before {
  content: '';
  position: absolute;
  inset: 2.2mm;
  border: 0.3mm solid #b9b3a5;
  border-radius: 2.5mm;
  pointer-events: none;
}
.hd {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 1.2mm;
  margin-bottom: 2mm;
  border-bottom: 0.35mm solid var(--c);
  font-size: 6.2pt;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #5a5f6d;
}
.hd b { color: var(--c); }
.ft {
  position: absolute;
  left: 0; right: 0; bottom: 3.9mm;
  text-align: center;
  font-size: 5.4pt;
  letter-spacing: 0.04em;
  color: #8a8f9c;
}
.stack { flex: 1; display: flex; flex-direction: column; gap: 1.5mm; min-height: 0; }
.row { display: flex; gap: 1.5mm; }
.row > * { flex: 1 1 0; min-width: 0; }
.row > .box.fixed { flex: 1 1 0; }
.box {
  border: 0.25mm solid #8f897b;
  border-radius: 1.2mm;
  padding: 0.8mm 1.6mm 1mm;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.box.grow { flex: 1; }
.box.fixed { flex: none; }
.lb {
  font-size: 5.6pt;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #4d5262;
  white-space: nowrap;
}
.lb em { font-weight: 400; font-style: italic; text-transform: none; letter-spacing: 0; }
.wr {
  flex: 1;
  min-height: 4mm;
  overflow: hidden;
}
/* Only complete rows are drawn; a partial last row shows no rule. */
.wr i { display: block; height: 5.5mm; border-bottom: 0.25mm solid #b7b2a4; }
.sq {
  display: inline-block;
  width: 3mm; height: 3mm;
  border: 0.3mm solid #3d4252;
  border-radius: 0.5mm;
  margin-right: 1.2mm;
  vertical-align: -0.7mm;
  flex: none;
}
.opts { display: flex; flex-wrap: wrap; gap: 1mm 4mm; font-size: 7.6pt; margin-top: 1mm; align-items: center; }
.flagline { display: flex; align-items: flex-start; font-size: 6.6pt; line-height: 1.25; margin-top: 0.8mm; }
.flagline .sq { margin-top: 0.2mm; }

/* prompt cards */
.title { font-family: 'Liberation Serif', Georgia, serif; font-size: 18pt; font-weight: 700; line-height: 1.15; margin: 0 0 0.8mm; }
.kicker { font-size: 8.4pt; font-style: italic; color: #5a5f6d; margin: 0 0 4mm; }
.prompts { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3.6mm; }
.prompts li { position: relative; padding-left: 5mm; font-size: 11pt; line-height: 1.32; }
.prompts li::before {
  content: ''; position: absolute; left: 0.3mm; top: 1.6mm;
  width: 2mm; height: 2mm; border-radius: 50%; background: var(--c);
}
.foot { margin-top: auto; font-size: 8pt; font-style: italic; color: #5a5f6d; padding-top: 1.5mm; }
.blank { border-bottom: 0.3mm solid #8f897b; flex: 1; height: 4.4mm; }
.fieldrow { display: flex; gap: 4mm; font-size: 7.2pt; margin-bottom: 2mm; align-items: flex-end; }
.fieldrow span { display: flex; align-items: flex-end; gap: 1.2mm; flex: 1; }
.fieldrow b { font-size: 5.8pt; letter-spacing: 0.05em; text-transform: uppercase; color: #4d5262; white-space: nowrap; }
.pq { font-size: 8.3pt; line-height: 1.28; }
.pq + .pq { margin-top: 0.4mm; }
.pl { height: 5.4mm; border-bottom: 0.25mm solid #cfcabd; margin-bottom: 1.4mm; }
.guide-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 2.6mm; font-size: 10pt; }
.guide-list li { display: flex; justify-content: space-between; gap: 3mm; border-bottom: 0.25mm dotted #b9b3a5; padding-bottom: 1mm; }
.guide-list b { font-weight: 700; }
.guide-list span { color: #5a5f6d; text-align: right; }
`;

// ---------- Card builders ----------
const footer = (text) => `<div class="ft">Meaning-to-Interface Toolkit · ${esc(VERSION)} · ${esc(text)}</div>`;

function header(deck, side, color) {
  return `<div class="hd" style="--c:${color}"><span>${esc(deck)}</span><b>${esc(side)}</b></div>`;
}

function fieldBox(f, kind) {
  const hint = f.printHint ? ` <em>(${esc(f.printHint)})</em>` : '';
  return `<div class="box ${kind}"><span class="lb">${esc(f.label)}${hint}</span><div class="wr">${LINES}</div></div>`;
}

function meaningFront(footText) {
  const color = MODULE_COLOR.person;
  const thirds = fields.front.filter((f) => f.layout === 'third');
  const fulls = fields.front.filter((f) => f.layout === 'full');
  return `<section class="card" style="--c:${color}">
    ${header('Meaning Card', 'Front · the moment', color)}
    <div class="stack">
      <div class="row">${thirds
        .map((f) => `<div class="box fixed"><span class="lb">${esc(f.label)}</span><div style="height:6.4mm"></div></div>`)
        .join('')}</div>
      ${fulls.map((f) => fieldBox(f, 'grow')).join('')}
    </div>
    ${footer(footText)}
  </section>`;
}

function meaningBack(footText) {
  const color = MODULE_COLOR.person;
  const byId = Object.fromEntries(fields.back.map((f) => [f.id, f]));
  const status = byId.status;
  const flags = fields.back.filter((f) => f.layout === 'flag');
  return `<section class="card" style="--c:${color}">
    ${header('Meaning Card', 'Back · check it with the participant', color)}
    <div class="stack">
      ${fieldBox(byId.asked, 'grow')}
      ${fieldBox(byId.explanation, 'grow')}
      <div class="box fixed"><span class="lb">${esc(status.label)}</span>
        <div class="opts">${status.options.map((o) => `<span><i class="sq"></i>${esc(o)}</span>`).join('')}</div>
      </div>
      ${fieldBox(byId.otherMeaning, 'grow')}
      <div class="row">${flags
        .map(
          (f) => `<div class="box fixed"><span class="lb">${esc(f.label)}</span>
            <div class="flagline"><i class="sq"></i><span>${esc(f.flagText)}</span></div></div>`,
        )
        .join('')}</div>
    </div>
    ${footer(footText)}
  </section>`;
}

function promptFront(deck, card, n, total, color) {
  return `<section class="card" style="--c:${color}">
    ${header(`${deck.name} · ${deck.moduleLabel}`, `${n} / ${total}`, color)}
    <h2 class="title">${esc(card.title)}</h2>
    ${card.kicker ? `<p class="kicker">${esc(card.kicker)}</p>` : '<div style="height:2.5mm"></div>'}
    <ul class="prompts">${card.prompts.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
    ${
      card.ticks
        ? `<div class="opts" style="margin-top:3.2mm">${card.ticks.map((t) => `<span><i class="sq"></i>${esc(t)}</span>`).join('')}<span style="color:#5a5f6d">Date: ______________</span></div>`
        : ''
    }
    ${card.footnote ? `<p class="foot">${esc(card.footnote)}</p>` : ''}
    ${footer(`${deck.name} ${n}/${total}`)}
  </section>`;
}

function promptBack(deck, card, n, total, color) {
  return `<section class="card" style="--c:${color}">
    ${header(`${deck.name} · ${deck.moduleLabel}`, 'Back', color)}
    <div class="fieldrow">${deck.backFields.map((f) => `<span><b>${esc(f)}</b><i class="blank"></i></span>`).join('')}</div>
    <div class="box grow" style="flex:1"><span class="lb">${esc(deck.backHeading)} <em>(${esc(card.title)})</em></span><div class="wr">${LINES}</div></div>
    ${footer(`${deck.name} ${n}/${total}`)}
  </section>`;
}

function positionality() {
  const p = kit.positionality;
  const color = MODULE_COLOR.context;
  const front = `<section class="card" style="--c:${color}">
    ${header(`${p.name} · ${p.moduleLabel}`, 'Front', color)}
    <div class="fieldrow">${p.fields.map((f) => `<span><b>${esc(f)}</b><i class="blank"></i></span>`).join('')}</div>
    ${p.prompts.map((q) => `<div class="pq">${esc(q)}</div><div class="pl"></div>`).join('')}
    ${footer(p.name)}
  </section>`;
  const back = `<section class="card" style="--c:${color}">
    ${header(`${p.name} · ${p.moduleLabel}`, 'Back', color)}
    <h2 class="title" style="font-size:13pt">${esc(p.backHeading)}</h2>
    <p class="kicker">${esc(p.backPrompt)}</p>
    <div class="fieldrow"><span><b>Date revisited</b><i class="blank"></i></span></div>
    <div class="box grow" style="flex:1"><div class="wr">${LINES}</div></div>
    ${footer(p.name)}
  </section>`;
  return [front, back];
}

function guide() {
  const g = kit.guide;
  const color = '#1d2230';
  const rows = [
    ['Context Cards', `${kit.decks[0].cards.length} cards · Module 1`],
    ['Interview Cards', `${kit.decks[1].cards.length} cards · Module 2`],
    ['Reflection Cards', `${kit.decks[2].cards.length} cards · after each session`],
    ['Researcher Positionality Card', '1 card · Module 1'],
    ['Blank Meaning Cards', `${kit.blankMeaningCardCopies} cards · Module 2`],
  ];
  return [
    `<section class="card" style="--c:${color}">
      ${header('Meaning-to-Interface Toolkit', 'Kit guide', color)}
      <h2 class="title" style="font-size:17pt">${esc(g.frontTitle)}</h2>
      <p class="kicker">${esc(g.frontIntro)}</p>
      <ul class="guide-list">${rows.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('')}</ul>
      ${footer('Kit guide')}
    </section>`,
    `<section class="card" style="--c:${color}">
      ${header('Meaning-to-Interface Toolkit', 'Kit guide · back', color)}
      <h2 class="title" style="font-size:13pt">${esc(g.backTitle)}</h2>
      <ul class="prompts" style="margin-top:2.5mm">${g.backPoints.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      ${footer('Kit guide')}
    </section>`,
  ];
}

const doc = (title, cards) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${css}</style></head><body>${cards.join('\n')}</body></html>`;

// ---------- Assemble documents ----------
const meaningCardDoc = doc('Meaning Card: print-ready template', [
  meaningFront('Meaning Card'),
  meaningBack('Meaning Card'),
]);

const kitCards = [...guide()];
for (const deck of kit.decks) {
  const color = MODULE_COLOR[deck.module];
  deck.cards.forEach((card, i) => {
    kitCards.push(promptFront(deck, card, i + 1, deck.cards.length, color));
    kitCards.push(promptBack(deck, card, i + 1, deck.cards.length, color));
  });
}
kitCards.push(...positionality());
for (let i = 1; i <= kit.blankMeaningCardCopies; i += 1) {
  kitCards.push(meaningFront(`Blank Meaning Card ${i}/${kit.blankMeaningCardCopies}`));
  kitCards.push(meaningBack(`Blank Meaning Card ${i}/${kit.blankMeaningCardCopies}`));
}
const kitDoc = doc('Physical Field Kit: print-ready card set', kitCards);

// ---------- CSV ----------
function csvCell(v) {
  return `"${String(v).replace(/"/g, '""')}"`;
}
const csvColumns = [...fields.front, ...fields.back].map((f) => f.label).concat(fields.fidelityColumns.map((c) => c.label));
// A UTF-8 byte-order mark makes Excel read Devanagari and other scripts correctly.
const csv = `﻿${csvColumns.map(csvCell).join(',')}\r\n`;

// ---------- Render ----------
mkdirSync(outDir, { recursive: true });

const executablePath = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium', '/usr/bin/chromium', '/usr/bin/google-chrome']
  .filter(Boolean)
  .find((p) => existsSync(p));

const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] }).catch((err) => {
  console.error(
    'Could not start Chromium. Set CHROMIUM_PATH to a Chrome/Chromium binary, or run `npx playwright-core install chromium`.\n',
    err.message,
  );
  process.exit(1);
});

const manifest = {};
let overflowed = false;

async function render(file, html) {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });

  // Fail loudly if any card's content is taller than the card.
  const overflows = await page.evaluate(() =>
    [...document.querySelectorAll('.card')].flatMap((el, i) => {
      const bad = [];
      if (el.scrollHeight > el.clientHeight + 1) bad.push(`page ${i + 1}: card content is ${el.scrollHeight - el.clientHeight}px too tall`);
      for (const child of el.querySelectorAll('.stack > *, .prompts, .prompts li')) {
        const r = child.getBoundingClientRect();
        const c = el.getBoundingClientRect();
        if (r.bottom > c.bottom - 8) bad.push(`page ${i + 1}: an element runs into the card edge`);
      }
      return bad;
    }),
  );
  if (overflows.length) {
    overflowed = true;
    console.error(`✗ ${file}\n  ${[...new Set(overflows)].join('\n  ')}`);
  }

  const pages = await page.locator('.card').count();
  await page.pdf({
    path: resolve(outDir, file),
    width: `${W_MM}mm`,
    height: `${H_MM}mm`,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await page.close();
  manifest[file] = { pages };
  const kb = (statSync(resolve(outDir, file)).size / 1024).toFixed(0);
  console.log(`✓ ${file}: ${pages} pages, ${kb} KB`);
}

await render('meaning-card-template.pdf', meaningCardDoc);
await render('physical-field-kit.pdf', kitDoc);
await browser.close();

writeFileSync(resolve(outDir, 'meaning-cards-template.csv'), csv);
console.log(`✓ meaning-cards-template.csv: ${csvColumns.length} columns`);

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log('✓ src/data/pdf-manifest.json updated');

if (overflowed) {
  console.error('\nSome cards overflow. Shorten the text in templates/*.json and re-run.');
  process.exit(1);
}
