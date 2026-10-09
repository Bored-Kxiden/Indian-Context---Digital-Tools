// Marks the kit's jargon in the built pages, after `astro build` and the chat index (D43).
//
// For each page in dist/, the first use of each term in src/data/tips.ts (read from dist/tips.json) becomes a
// highlighted word. Pointing at it, focusing it or tapping it opens a small pop-up with one plain sentence and a
// link to the glossary. The pop-up is CSS (hover and focus work without JavaScript); src/scripts/tips.ts adds tap
// to open, Escape to close, and keeps it on screen.
//
// Only running text is marked: never headings, links, buttons, form fields, labels, code, the booklet's rebuilt
// pages (.ex), the "fill on screen" forms, chat answers, or anything inside [data-no-tip]. The glossary and Ask
// pages are left alone. A page gets at most MAX marks.
//
// Run by `npm run build`. Needs no network.

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const MAX = 18;

const SKIP_PAGES = [/^glossary\//, /^ask\//, /^tools\//, /^404/];
const SKIP_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'button', 'label', 'summary', 'input', 'textarea', 'select', 'option', 'code', 'kbd', 'pre', 'script', 'style', 'svg', 'noscript', 'template', 'dt', 'figcaption', 'nav', 'title', 'legend']);
const SKIP_CLASSES = ['ex', 'fill', 'askui', 'kw', 'subs', 'tabbar', 'stamp', 'visually-hidden', 'chip', 'btn', 'crumbs-f', 'dln', 'tools', 'fold', 'rail', 'tg', 'kp', 'lbl', 'eb', 'facts', 'stabs'];

const { tips } = JSON.parse(readFileSync(join(dist, 'tips.json'), 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+').replace(/-/g, '[-‑–]');

// One pattern for every spelling, longest first, so "reverse thick translation" wins over "thick translation".
const spellings = tips.flatMap((t, i) => t.match.map((m) => ({ i, m }))).sort((a, b) => b.m.length - a.m.length);
const pattern = new RegExp(`(?<![\\w-])(${spellings.map((s) => rx(s.m)).join('|')})(?![\\w-])`, 'gi');
const tipFor = (text) => {
  const t = text.replace(/\s+/g, ' ').replace(/[‑–]/g, '-').toLowerCase();
  return spellings.find((s) => s.m.toLowerCase() === t)?.i;
};

function skipEl(el) {
  const tag = el.rawTagName?.toLowerCase();
  if (!tag) return false;
  if (SKIP_TAGS.has(tag)) return true;
  if (el.getAttribute('data-no-tip') !== undefined || el.getAttribute('aria-hidden') === 'true' || el.getAttribute('hidden') !== undefined) return true;
  const cls = (el.getAttribute('class') ?? '').split(/\s+/);
  return cls.some((c) => SKIP_CLASSES.includes(c));
}

function files(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (dir === dist && ['_astro', 'booklet', 'card-kit', 'downloads', 'fonts', 'reflection'].includes(name)) continue;
      out.push(...files(p));
    } else if (name === 'index.html') out.push(p);
  }
  return out;
}

let pagesMarked = 0;
let total = 0;
for (const file of files(dist)) {
  const rel = relative(dist, file).replace(/\\/g, '/');
  if (SKIP_PAGES.some((r) => r.test(rel))) continue;
  const html = readFileSync(file, 'utf8');
  if (html.includes('http-equiv="refresh"') || html.includes('class="kw"')) continue; // a redirect, or already marked
  const doc = parse(html, { comment: true, blockTextElements: { script: true, style: true, pre: true, noscript: true } });
  const main = doc.querySelector('main');
  if (!main) continue;

  const used = new Set();
  let n = 0;
  const walk = (node) => {
    for (const child of [...node.childNodes]) {
      if (n >= MAX) return;
      if (child.nodeType === 1) {
        if (!skipEl(child)) walk(child);
      } else if (child.nodeType === 3) {
        const raw = child.rawText;
        if (!raw.trim()) continue;
        let out = '';
        let last = 0;
        let changed = false;
        for (const m of raw.matchAll(pattern)) {
          const i = tipFor(m[0]);
          if (i === undefined || used.has(i) || n >= MAX) continue;
          used.add(i);
          n++;
          const id = `kw-${n}`;
          const t = tips[i];
          const more = t.glossary ? ` <a href="${base}glossary/#${t.glossary}">More in the glossary</a>` : '';
          out +=
            raw.slice(last, m.index) +
            `<span class="kw"><button type="button" class="kw-b" aria-expanded="false" aria-controls="${id}" aria-describedby="${id}-d">${m[0]}</button>` +
            `<span class="kw-p" id="${id}"><span class="kw-d" id="${id}-d">${esc(t.tip)}</span>${more}</span></span>`;
          last = m.index + m[0].length;
          changed = true;
        }
        if (changed) {
          const fresh = parse(out + raw.slice(last)).childNodes;
          const at = node.childNodes.indexOf(child);
          fresh.forEach((f) => (f.parentNode = node));
          node.childNodes.splice(at, 1, ...fresh);
        }
      }
    }
  };
  walk(main);
  if (n) {
    writeFileSync(file, doc.toString());
    pagesMarked++;
    total += n;
  }
}
console.log(`keyword tips: ${total} marks on ${pagesMarked} pages`);
