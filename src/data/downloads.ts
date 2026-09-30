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

export type DownloadFormat = 'PDF' | 'CSV' | 'JSON' | 'FIG';
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
    title: 'Booklet · guideline, Components 1 and 4 (A4)',
    description: 'The guideline, Meera, Component 1 and Component 4, with every example and blank template.',
    file: 'designing-for-the-indian-context-booklet.pdf',
    format: 'PDF',
    group: 'booklet',
    pages: 53,
  },
  {
    id: 'booklet-2-3',
    title: 'Booklet · Components 2 and 3 (A4)',
    description: 'Reading Visual Culture and Reading Language: every tool, filled example and blank template.',
    file: 'components-2-3-booklet.pdf',
    format: 'PDF',
    group: 'booklet',
    pages: 36,
  },
  {
    id: 'card-kit-full',
    title: 'Component 1 card kit (all)',
    description: 'Card sheets S1–S8 and boards B1–B7 as one file, exactly as laid out in the booklet.',
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

// ---- Blank templates, derived from the tool data so they cannot drift
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
        title: p.blank.downloadTitle ?? `${t.short}${t.parts.length > 1 ? ` · ${p.title}` : ''}: blank template`,
        description:
          p.blank.downloadNote ?? (p.blank.shared ? 'Example above, blank below.' : 'Print it and fill it in for your person.'),
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
// Component 2's main file: the Figma template (a .fig, opened in Figma)
templateEntries.unshift({
  id: 'visual-culture-figma',
  title: 'Reading Visual Culture: the Figma template',
  description:
    'The template to follow, as a Figma file: the capture cards and photo slip, the Context scenario builder, the Context profile and the hand-off cards.',
  file: 'visual-culture-framework.fig',
  format: 'FIG',
  group: 'templates',
  component: 'c2',
  note: 'Open it in Figma: drag the file into Drafts or a team project, or use Import. It is a working file: it also holds Component 1 layouts and reference material, and you only need the Component 2 frames.',
  page: C2,
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
      title: `${k === 'before' ? 'Before' : 'After'} Component ${s.n} · ${p.code}: blank page`,
      description:
        k === 'before'
          ? `Position and prediction, to fill before Component ${s.n}’s first tool. Keep it in view; don’t edit the prediction.`
          : `Claim and redaction, to fill right after Component ${s.n}’s last page, while it is fresh.`,
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

export const downloadEntries: DownloadEntry[] = [...booklet, ...templateEntries, ...reflectionPages, ...reflectionEntries, ...sheetEntries, ...boardEntries, ...language];

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
