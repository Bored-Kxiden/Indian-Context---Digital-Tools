import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import manifest from './pdf-manifest.json';
import { tools as c1Tools } from './booklet/existing-products';
import { tools as c2Tools } from './booklet/visual-culture';
import { tools as c3Tools, beforeYouStart as c3BeforeYouStart } from './booklet/language';
import { tools as c4Tools, beforeYouStart, participants } from './booklet/material-reality';
import { boards, sheets } from './card-kit';
import { lookBack, overview as reflectionOverview, stops as reflectStops } from './reflection';

// Every downloadable file on the site is listed here (or derived here from the content
// data). Sizes are measured from disk at build time; a missing file fails the build.
// To add a file: drop it in /public/downloads and add an entry.

export type DownloadFormat = 'PDF' | 'CSV' | 'JSON' | 'FIG' | 'JAM';
export type DownloadGroup = 'booklet' | 'card-kit' | 'templates' | 'language' | 'reflection';

export interface DownloadEntry {
  id: string;
  title: string;
  description: string;
  /** Path inside /public/downloads. */
  file: string;
  format: DownloadFormat;
  group: DownloadGroup;
  /** Which component it belongs to, for colour: c1 to c4, ink for Reflection, or none. */
  component?: 'c1' | 'c2' | 'c3' | 'c4' | 'ink';
  note?: string;
  status?: 'Draft' | 'Final';
  pages?: number;
  /** Slug path of the page it belongs to, e.g. "/components/language/meaning-card/". */
  page?: string;
}

const C1 = '/components/existing-products/';
const C2 = '/components/visual-culture/';
const C3 = '/components/language/';
const C4 = '/components/material-reality/';

// ---- Booklet and card kit
const booklet: DownloadEntry[] = [
  {
    id: 'booklet',
    title: 'The booklet · the whole toolkit (A4)',
    description:
      'The final booklet: the guideline, Meera, Reflection, the four reading files with every tool, worked example and template, and the Reading Existing Products card kit.',
    file: 'designing-for-the-indian-context-booklet.pdf',
    format: 'PDF',
    group: 'booklet',
    pages: 107,
    note: 'Sheets and boards are A4 and A3 pages here; print them at A2 and on card (see the card kit).',
  },
  {
    id: 'card-kit-full',
    title: 'Reading Existing Products card kit (all)',
    description: 'The card-kit page, sheets S1–S8 and boards B1–B7 as one file, exactly as laid out in the booklet (p.1.12–1.27).',
    file: 'component-1-card-kit.pdf',
    format: 'PDF',
    group: 'card-kit',
    component: 'c1',
    pages: 16,
  },
  {
    id: 'card-sheets',
    title: 'Card sheets S1–S8 (A4)',
    description: 'Print on A4 card, 250–300 gsm, and cut along the dashed lines. Print S1 five times and S4 twice.',
    file: 'card-kit/card-sheets-s1-s8.pdf',
    format: 'PDF',
    group: 'card-kit',
    component: 'c1',
    pages: 8,
    page: '/card-kit/',
  },
  {
    id: 'boards',
    title: 'Boards B1–B7 (A2)',
    description: 'Print at A2, landscape. A3 works for pairs. No big printer? Copy the board onto chart paper.',
    file: 'card-kit/boards-b1-b7.pdf',
    format: 'PDF',
    group: 'card-kit',
    component: 'c1',
    pages: 7,
    page: '/card-kit/',
  },
];

// ---- Card kit, one sheet or board at a time
const sheetEntries: DownloadEntry[] = sheets.map((s) => ({
  id: `sheet-${s.id.toLowerCase()}`,
  title: `Sheet ${s.id} · ${s.name}`,
  description: s.tools,
  file: `card-kit/sheet-${s.id.toLowerCase()}.pdf`,
  format: 'PDF',
  group: 'card-kit',
  component: 'c1',
  pages: 1,
  note: `A4${s.copies > 1 ? ` · print ×${s.copies}` : ''}`,
  page: '/card-kit/',
}));
const boardEntries: DownloadEntry[] = boards.map((b) => ({
  id: `board-${b.id.toLowerCase()}`,
  title: `Board ${b.id} · ${b.name}`,
  description: b.tool,
  file: `card-kit/board-${b.id.toLowerCase()}.pdf`,
  format: 'PDF',
  group: 'card-kit',
  component: 'c1',
  pages: 1,
  note: 'A2 landscape · A3 for pairs',
  page: '/card-kit/',
}));

// ---- Templates, derived from the tool data so they cannot drift. In the final booklet a template can carry
// [bracketed] examples, so they are called templates, not blanks.
const templateEntries: DownloadEntry[] = [];
const seen = new Set<string>();
const templateSources = [
  { tools: c1Tools, c: 'c1' as const, base: C1 },
  { tools: c2Tools, c: 'c2' as const, base: C2 },
  { tools: c3Tools, c: 'c3' as const, base: C3 },
  { tools: c4Tools, c: 'c4' as const, base: C4 },
];
for (const { tools, c, base } of templateSources) {
  for (const t of tools) {
    for (const p of t.parts) {
      if (seen.has(p.blank.pdf)) continue;
      seen.add(p.blank.pdf);
      templateEntries.push({
        id: `tpl-${p.blank.pdf.replace(/\.pdf$/, '')}`,
        title: p.blank.downloadTitle ?? `${t.short}${t.parts.length > 1 ? ` · ${p.title}` : ''}: template`,
        description:
          p.blank.downloadNote ??
          (p.blank.shared
            ? 'Example above, blank below.'
            : 'Print it and fill it in for your person. Anything in [brackets] is an example: write over it.'),
        file: `templates/${p.blank.pdf}`,
        format: 'PDF',
        group: 'templates',
        component: c,
        pages: 1,
        note: `A4 · ${p.blank.printed}`,
        page: `${base}${t.slug}/`,
      });
    }
  }
}
// Component 2's main file: the FigJam template (a .jam, opened in FigJam), first among its templates.
templateEntries.splice(
  templateEntries.findIndex((e) => e.component === 'c2'),
  0,
  {
    id: 'visual-culture-figjam',
    title: 'Reading Visual Culture: the FigJam template',
    description:
      'The board to work on, in FigJam: how to use it, the six capture cards and the capture stage, a clusters board to group photos, and the Context Profile canvas.',
    file: 'reading-visual-culture.jam',
    format: 'JAM',
    group: 'templates',
    component: 'c2',
    note: 'Open it in FigJam: drag the file into Drafts or a team project, or use Import.',
    page: C2,
  },
);
// Component 2's capture cards, printed from the FigJam template's wording (npm run build:capture-cards), right after the board.
templateEntries.splice(
  templateEntries.findIndex((e) => e.id === 'visual-culture-figjam') + 1,
  0,
  {
    id: 'c2-capture-cards',
    title: 'Show · Capture cards and photo slips',
    description:
      'The six missions as the FigJam template words them, one per card with its own question, to cut out; and photo slips with the three prompts, the card’s question and the evidence tag.',
    file: 'templates/c2-capture-cards.pdf',
    format: 'PDF',
    group: 'templates',
    component: 'c2',
    note: 'A4 landscape · 2 pages · one set per participant',
    page: `${C2}show/`,
  },
);
// Component 1's Figma file (a .fig): every page of the component, first among its templates.
templateEntries.unshift({
  id: 'existing-products-figma',
  title: 'Reading Existing Products: the Figma file',
  description:
    'Reading Existing Products in Figma, to adapt or print: the cover, what and how, Tools 1–4 with their blank templates, Synthesis, and Is it working? (the “final designs” page).',
  file: 'reading-existing-products.fig',
  format: 'FIG',
  group: 'templates',
  component: 'c1',
  note: 'Open it in Figma: drag the file into Drafts or a team project, or use Import. Use the “final designs” page; the first page holds the layouts it was drawn from and reference material.',
  page: C1,
});
templateEntries.push(
  {
    id: 'tpl-before-you-start-c3',
    title: 'Before you start: context, positionality, glossary',
    description: 'Six things to do once per place before Tool 1, a positionality note, and a provisional glossary. Print it and keep it with your fieldwork.',
    file: `templates/${c3BeforeYouStart.pdf}`,
    format: 'PDF',
    group: 'templates',
    component: 'c3',
    pages: 1,
    note: `A4 · ${c3BeforeYouStart.printed}`,
    page: `${C3}before-you-start/`,
  },
  {
    id: 'tpl-journey-strip',
    title: 'Before you start: Journey Strip',
    description: 'Example for Meera, and a blank strip for your own person. Do this before Tool 1 · Build.',
    file: `templates/${beforeYouStart.step1.pdf}`,
    format: 'PDF',
    group: 'templates',
    component: 'c4',
    pages: 1,
    note: `A4 · ${beforeYouStart.step1.printed}`,
    page: `${C4}before-you-start/`,
  },
  {
    id: 'tpl-participants',
    title: 'Ask your participants: field cards',
    description: 'Questions to ask, the consent line to read aloud, and how to take care.',
    file: `templates/${participants.pdf}`,
    format: 'PDF',
    group: 'templates',
    component: 'c4',
    pages: 1,
    note: `A4 · ${participants.printed}`,
    page: `${C4}ask-your-participants/`,
  },
);

// ---- Claim & Reflection (generated by scripts/build-reflection-pdfs.mjs from templates/reflection/)
// The eight Before and After pages sit with their component's blank templates; the intro page, the three
// Look back pages and the whole set are under Claim & Reflection.
const R = '/components/reflection/';
const reflectionComponentColour = { 'existing-products': 'c1', 'visual-culture': 'c2', language: 'c3', 'material-reality': 'c4' } as const;
const reflectionPages: DownloadEntry[] = reflectStops.flatMap((s) =>
  (['before', 'after'] as const).map((k): DownloadEntry => {
    const p = s[k];
    return {
      id: `reflection-${p.image}`,
      title: `${k === 'before' ? 'Before' : 'After'} ${s.label} · ${p.code}: blank page`,
      description:
        k === 'before'
          ? `Position and prediction, to fill before the file’s first tool. Keep it in view; don’t edit the prediction.`
          : `Claim and redaction, to fill right after the file’s last page, while it is fresh.`,
      file: `templates/${p.pdf}`,
      format: 'PDF',
      group: 'templates',
      component: reflectionComponentColour[s.id],
      pages: 1,
      note: `A4 · Claim & Reflection ${p.code}`,
      page: `${s.href}reflect-${k}/`,
    };
  }),
);
const reflectionEntries: DownloadEntry[] = [
  {
    id: 'reflection-all',
    title: 'Claim & Reflection: all twelve pages (A4)',
    description: 'The intro page, the Before and After pages for each component, and the three Look back pages, in order.',
    file: reflectionOverview.pdfAll,
    format: 'PDF',
    group: 'reflection',
    component: 'ink',
    pages: 12,
    page: R,
  },
  {
    id: 'reflection-shared',
    title: 'Claim & Reflection: the intro page',
    description: 'What it is and why to do it, the five steps, and where each page goes. Read once, before you start any component.',
    file: 'templates/reflection-shared.pdf',
    format: 'PDF',
    group: 'reflection',
    component: 'ink',
    pages: 1,
    note: 'A4',
    page: R,
  },
  ...lookBack.map((p): DownloadEntry => ({
    id: `reflection-${p.image}`,
    title: `${p.title} · ${p.code}: blank page`,
    description: p.sub.replace(/^Step 5 · /, ''),
    file: `templates/${p.pdf}`,
    format: 'PDF',
    group: 'reflection',
    component: 'ink',
    pages: 1,
    note: `A4 · Claim & Reflection ${p.code}`,
    page: `${R}${p.slug}/`,
  })),
];

// ---- Component 3 · Language (generated by scripts/build-templates.mjs, plus a JSON template)
const L = '/components/language/';
const language: DownloadEntry[] = [
  {
    id: 'meaning-card-template',
    title: 'Meaning Card: print-ready template',
    description: 'Front and back of one Meaning Card on a 6 × 4 in index card. Print double-sided and make as many copies as you need.',
    file: 'meaning-card-template.pdf',
    format: 'PDF',
    group: 'language',
    component: 'c3',
    note: 'Print at actual size (100%), double-sided.',
    status: 'Draft',
    page: `${L}meaning-card/`,
  },
  {
    id: 'physical-field-kit',
    title: 'Physical Field Kit: print-ready card set',
    description:
      'Context Cards, Interview Cards, Reflection Cards, a Researcher Positionality Card, and blank Meaning Cards, plus a one-card guide. Every card is 6 × 4 in, front and back.',
    file: 'physical-field-kit.pdf',
    format: 'PDF',
    group: 'language',
    component: 'c3',
    note: 'Print at actual size (100%), double-sided. Try one card first to check front/back alignment.',
    status: 'Draft',
    page: `${L}physical-field-kit/`,
  },
  {
    id: 'meaning-cards-csv',
    title: 'Meaning Cards: CSV template',
    description: 'One row per Meaning Card, with a column for every field on the card and the four Fidelity Protocol tags. Use it to digitize cards.',
    file: 'meaning-cards-template.csv',
    format: 'CSV',
    group: 'language',
    component: 'c3',
    note: 'Opens in Excel, Google Sheets, or any spreadsheet app. Save as UTF-8 to keep scripts such as Devanagari intact.',
    status: 'Draft',
    page: `${L}meaning-card/`,
  },
  {
    id: 'expression-library-json',
    title: 'Expression Library: JSON entry template',
    description: 'A blank entry in the exact shape the Expression Library uses, so a validated meaning moment can be added to the site’s library.',
    file: 'expression-library-template.json',
    format: 'JSON',
    group: 'language',
    component: 'c3',
    note: 'See the README for how to add an entry to the site.',
    status: 'Draft',
    page: `${L}expression-library/`,
  },
];

// ---- One pack per file: every worksheet of the file in one PDF (scripts/build-file-packs.py, D41)
const packs: DownloadEntry[] = (
  [
    ['existing-products', 'c1', 'Reading Existing Products', 7],
    ['visual-culture', 'c2', 'Reading Visual Culture', 6],
    ['material-reality', 'c4', 'Reading Material Conditions', 8],
    ['language', 'c3', 'Reading Language Conditions', 10],
  ] as const
).map(([id, c, name, pages]) => ({
  id: `pack-${id}`,
  title: `${name}: all worksheets (A4)`,
  description: 'Every worksheet of this file in one PDF, in the order you use them.',
  file: `worksheets-${id}.pdf`,
  format: 'PDF' as const,
  group: 'templates' as const,
  component: c,
  pages,
  note: 'A4',
}));

export const downloadEntries: DownloadEntry[] = [...booklet, ...packs, ...templateEntries, ...reflectionPages, ...reflectionEntries, ...sheetEntries, ...boardEntries, ...language];

export interface Download extends DownloadEntry {
  bytes: number;
  size: string;
  href: string;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

let cache: Download[] | undefined;

export function getDownloads(): Download[] {
  if (cache) return cache;
  cache = downloadEntries.map((entry) => {
    const path = resolve(process.cwd(), 'public', 'downloads', entry.file);
    if (!existsSync(path)) {
      throw new Error(
        `Download "${entry.id}" points to public/downloads/${entry.file}, which does not exist. ` +
          'Add the file or remove the entry from src/data/downloads.ts.',
      );
    }
    const bytes = statSync(path).size;
    const pages = entry.pages ?? (manifest as Record<string, { pages: number }>)[entry.file]?.pages;
    return { ...entry, pages, bytes, size: formatBytes(bytes), href: `/downloads/${entry.file}` };
  });
  return cache;
}

export const getDownloadById = (id: string) => getDownloads().find((d) => d.id === id);
export const getDownloadsByGroup = (g: DownloadGroup) => getDownloads().filter((d) => d.group === g);
/** Downloads whose page is `pagePath` (for the "Download" block on a tool page). */
export const getDownloadsForPage = (pagePath: string) => getDownloads().filter((d) => d.page === pagePath);
