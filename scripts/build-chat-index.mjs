// Builds the chatbot's search index from the built site, after `astro build`:
//
//   dist/chat-index.json   every page's main content, split at its headings into short passages,
//                          each with the address of the section it came from.
//
// The same file feeds both halves of "Ask the toolkit":
//   - the `index-sync` Edge Function copies it into Supabase (public.doc_chunks) and embeds it,
//   - the /ask/ page searches it in the browser when Supabase cannot be reached.
//
// It reads only what the site already publishes, so nothing private can end up in the index.
// Run by `npm run build`; it needs no network.

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');

const MAX = 1100; // longest passage, in characters
const MIN = 160; // passages shorter than this are merged into the next one under the same heading

const COMPONENTS = {
  'existing-products': 'Component 1 · Reading Existing Products',
  'visual-culture': 'Component 2 · Reading Visual Culture',
  language: 'Component 3 · Reading Language',
  'material-reality': 'Component 4 · Reading Material Reality',
  reflection: 'Claim & Reflection',
};

// Pages that are not content: redirect stubs, the 404 page, and this page's own UI.
const SKIP = [/^tools\//, /^404/, /^ask\//, /^library\/(contribute|review)\//];

const sha = (s) => createHash('sha1').update(s).digest('hex');
const clean = (s) =>
  s
    .replace(/ /g, ' ')
    .replace(/\s*\((opens|open) (full size )?in a new tab\)/gi, '')
    .replace(/[ \t]+/g, ' ')
    .trim();

function pages(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (['_astro', 'booklet', 'card-kit', 'downloads', 'fonts', 'reflection'].includes(name) && dir === dist) continue;
      out.push(...pages(p));
    } else if (name === 'index.html') out.push(p);
  }
  return out;
}

function anchorFor(el) {
  for (let n = el; n && n.tagName; n = n.parentNode) {
    const id = n.getAttribute?.('id');
    if (id && id !== 'main') return id;
  }
  return '';
}

function chunkPage(file) {
  const rel = relative(dist, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  if (SKIP.some((r) => r.test(rel))) return [];
  const html = readFileSync(file, 'utf8');
  if (html.includes('http-equiv="refresh"')) return [];
  // A space between adjacent tags, so inline labels do not run together ("Before" + "Listen").
  // …and after an inline label that runs straight into the next words ("For example" + "First-generation").
  const doc = parse(html.replace(/>(?=<)/g, '> ').replace(/(<\/(?:span|b|strong|small|dt|dd|label|em)>)(?=[A-Z0-9“"])/g, '$1 '));
  const main = doc.querySelector('main');
  if (!main) return [];

  const title = clean(doc.querySelector('title')?.text ?? '').replace(/\s·\sBeyond the Edge Case$/, '').replace(/^Beyond the Edge Case: .*$/, 'Home');
  const path = '/' + rel;
  const compKey = rel.split('/')[1];
  const component = rel.startsWith('components/') && COMPONENTS[compKey] ? COMPONENTS[compKey] : '';

  // Drop what is navigation, controls or decoration, not content.
  for (const sel of ['nav', 'script', 'style', 'svg', 'form', 'button', 'select', 'input', 'textarea', '[aria-hidden="true"]', '.tabbar', '.skip-link', '[data-no-index]', 'a.btn[download]']) {
    for (const el of main.querySelectorAll(sel)) el.remove();
  }
  // Keep the descriptions of the booklet pages and worked examples: they are the example.
  for (const img of main.querySelectorAll('img')) {
    const alt = clean(img.getAttribute('alt') ?? '');
    img.replaceWith(alt.length > 40 ? parse(`<p>${alt.replace(/</g, '&lt;')}</p>`) : parse(''));
  }
  // Mark each heading so the flattened text can be split at it, keeping where it points.
  for (const h of main.querySelectorAll('h1, h2, h3, h4')) {
    const level = Number(h.tagName[1]);
    const text = clean(h.text);
    const anchor = h.getAttribute('id') || anchorFor(h.parentNode);
    h.set_content(`\n⟦H${level}|${anchor}|${text.replace(/[|⟧]/g, ' ')}⟧\n`);
  }

  const lines = main.structuredText.split('\n').map(clean).filter(Boolean);
  const sections = [];
  const trail = [];
  let cur = { anchor: '', heading: title, lines: [] };
  for (const line of lines) {
    const m = line.match(/^⟦H(\d)\|([^|]*)\|(.*)⟧$/);
    if (m) {
      if (cur.lines.length) sections.push(cur);
      const level = Number(m[1]);
      trail.length = Math.max(0, level - 1);
      trail[level - 1] = m[3];
      const heading = trail.filter(Boolean).slice(1).join(' › ') || m[3];
      cur = { anchor: m[2], heading, lines: [] };
    } else {
      cur.lines.push(line);
    }
  }
  if (cur.lines.length) sections.push(cur);

  // Merge short sections forward, then split long ones at line boundaries.
  const merged = [];
  for (const s of sections) {
    const prev = merged[merged.length - 1];
    const len = s.lines.join(' ').length;
    if (prev && prev.lines.join(' ').length < MIN && prev.anchor === s.anchor) {
      prev.lines.push(...s.lines);
    } else if (len < 40 && prev) {
      prev.lines.push(...s.lines);
    } else merged.push({ ...s, lines: [...s.lines] });
  }

  const chunks = [];
  for (const s of merged) {
    let buf = [];
    const flush = () => {
      const content = buf.join('\n').trim();
      if (content.length >= 40) {
        const url = path + (s.anchor ? `#${s.anchor}` : '');
        const n = chunks.filter((c) => c.url === url).length;
        chunks.push({
          id: sha(`${url}|${s.heading}|${n}`).slice(0, 20),
          url,
          title,
          section: s.heading === title ? '' : s.heading,
          component,
          content,
          hash: sha(`${title}|${s.heading}|${content}`).slice(0, 20),
        });
      }
      buf = [];
    };
    for (const line of s.lines) {
      if (buf.join('\n').length + line.length > MAX && buf.length) flush();
      if (line.length > MAX) {
        // A very long single line (a long alt text): cut at sentence ends.
        for (const part of line.match(new RegExp(`.{1,${MAX}}(?:[.;:!?](?=\\s)|$)`, 'gs')) ?? [line]) {
          buf.push(part.trim());
          flush();
        }
        continue;
      }
      buf.push(line);
    }
    flush();
  }
  return chunks;
}

if (!existsSync(dist)) {
  console.error('dist/ not found: run astro build first.');
  process.exit(1);
}

const all = pages(dist).sort().flatMap(chunkPage);
const seen = new Set();
const chunks = all.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
const index = {
  version: 1,
  // Paths are without the site's base path; add it when linking.
  base,
  generated: new Date().toISOString().slice(0, 10),
  chunks,
};
writeFileSync(resolve(dist, 'chat-index.json'), JSON.stringify(index));
const kb = Math.round(Buffer.byteLength(JSON.stringify(index)) / 1024);
console.log(`chat index: ${chunks.length} passages from ${new Set(chunks.map((c) => c.url.split('#')[0])).size} pages, ${kb} KB`);
