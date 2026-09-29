import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import manifest from './pdf-manifest.json';

// Every downloadable asset on the site is listed here. The Downloads page and
// each tool page read this list, and file sizes are measured from disk at build
// time. To add a template: drop the file in /public/downloads and add an entry.

export type DownloadFormat = 'PDF' | 'CSV' | 'JSON';

export interface DownloadEntry {
  id: string;
  title: string;
  description: string;
  /** Filename inside /public/downloads. */
  file: string;
  format: DownloadFormat;
  group: 'print' | 'digital';
  /** Slug of the tool this asset belongs to. */
  tool: string;
  /** Short usage note shown under the description. */
  note?: string;
  status: 'Draft' | 'Final';
}

export const downloadEntries: DownloadEntry[] = [
  {
    id: 'meaning-card-template',
    title: 'Meaning Card: print-ready template',
    description: 'Front and back of one Meaning Card on a 6 × 4 in index card. Print double-sided and make as many copies as you need.',
    file: 'meaning-card-template.pdf',
    format: 'PDF',
    group: 'print',
    tool: 'meaning-card',
    note: 'Print at actual size (100%), double-sided.',
    status: 'Draft',
  },
  {
    id: 'physical-field-kit',
    title: 'Physical Field Kit: print-ready card set',
    description:
      'Context Cards, Interview Cards, Reflection Cards, a Researcher Positionality Card, and blank Meaning Cards, plus a one-card guide to the kit. Every card is 6 × 4 in, front and back.',
    file: 'physical-field-kit.pdf',
    format: 'PDF',
    group: 'print',
    tool: 'physical-field-kit',
    note: 'Print at actual size (100%), double-sided. Try one card first to check front/back alignment.',
    status: 'Draft',
  },
  {
    id: 'meaning-cards-csv',
    title: 'Meaning Cards: CSV template',
    description: 'One row per Meaning Card, with a column for every field on the card and the four Fidelity Protocol tags. Use it to digitize cards.',
    file: 'meaning-cards-template.csv',
    format: 'CSV',
    group: 'digital',
    tool: 'meaning-card',
    note: 'Opens in Excel, Google Sheets, or any spreadsheet app. Save as UTF-8 to keep scripts such as Devanagari intact.',
    status: 'Draft',
  },
  {
    id: 'expression-library-json',
    title: 'Expression Library: JSON entry template',
    description: 'A blank entry in the exact shape the Expression Library uses, so a validated meaning moment can be added to the site’s library.',
    file: 'expression-library-template.json',
    format: 'JSON',
    group: 'digital',
    tool: 'expression-library',
    note: 'See the README for how to add an entry to the site.',
    status: 'Draft',
  },
];

export interface Download extends DownloadEntry {
  bytes: number;
  size: string;
  pages?: number;
  href: string;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getDownloads(): Download[] {
  return downloadEntries.map((entry) => {
    const path = resolve(process.cwd(), 'public', 'downloads', entry.file);
    if (!existsSync(path)) {
      throw new Error(
        `Download "${entry.id}" points to public/downloads/${entry.file}, which does not exist. ` +
          'Add the file or remove the entry from src/data/downloads.ts.',
      );
    }
    const bytes = statSync(path).size;
    const pages = (manifest as Record<string, { pages: number }>)[entry.file]?.pages;
    return { ...entry, bytes, size: formatBytes(bytes), pages, href: `/downloads/${entry.file}` };
  });
}

export function getDownloadsForTool(slug: string): Download[] {
  return getDownloads().filter((d) => d.tool === slug);
}
