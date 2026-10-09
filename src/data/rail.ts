import { componentById, type ComponentColour } from './components';
import { tools as c1Tools } from './booklet/existing-products';
import { tools as c2Tools } from './booklet/visual-culture';
import { tools as c3Tools, route as c3Route } from './booklet/language';
import { tools as c4Tools } from './booklet/material-reality';
import type { Tool } from './booklet/types';
import { lookBack } from './reflection';
import { participants, beforeYouStart as c4Before } from './booklet/material-reality';
import { beforeYouStart as c3Before } from './booklet/language';

// The step-by-step bar on component pages: the tools of one component, in order.

export interface RailItem {
  slug: string;
  label: string;
  href: string;
  /** Tool number in the booklet, when it has one. */
  n?: number;
  /** A short mark for the step circle when the step has no number (Reflection's "R"). */
  glyph?: string;
  meta?: string;
  /** Sub-parts, for deep links. */
  parts?: { label: string; hash: string }[];
  /** A small picture of the step's worksheet or board for its card (public/thumbs/, `npm run build:thumbs`). */
  thumb?: string;
  /** How demanding the step is, when the booklet says: 1 light · 2 moderate · 3 complex. */
  level?: 1 | 2 | 3;
}

export interface Rail {
  c: ComponentColour;
  number: number | null;
  name: string;
  short: string;
  overviewHref: string;
  /** The overview's card picture. */
  overviewThumb?: string;
  items: RailItem[];
  /** True when the component has a card kit (shows the Paper | Cards switch). */
  hasCardKit: boolean;
}

/** Thumbnail paths (made by scripts/build-thumbs.py). */
export const pageThumb = (id: string) => `/thumbs/booklet/${id}.webp`;
export const reflectionThumb = (id: string) => `/thumbs/reflection/${id}.webp`;
export const boardThumb = (id: string) => `/thumbs/boards/${id}.webp`;

/** Reading Existing Products is worked on seven boards (the owner's v3 template, D47); each tool has its own. */
export const c1Boards: { id: string; title: string }[] = [
  { id: 'B1', title: 'The Media Story' },
  { id: 'B2', title: 'The Gossip Venn' },
  { id: 'B3', title: 'The Timeline' },
  { id: 'B4', title: 'Ideal flow + needs' },
  { id: 'B5', title: 'Villain walk + Blame Scale' },
  { id: 'B6', title: 'Three lenses + findings' },
  { id: 'B7', title: 'Synthesis' },
];
export const c1BoardsFor: Record<string, string[]> = {
  'media-gossip': ['B1', 'B2'],
  history: ['B3'],
  'the-break': ['B4', 'B5'],
  power: ['B6'],
  synthesis: ['B7'],
};

function toolItem(base: string, t: Tool): RailItem {
  const board = t.component === 'existing-products' ? c1BoardsFor[t.slug]?.[0] : undefined;
  return {
    slug: t.slug,
    label: t.short,
    href: `${base}${t.slug}/`,
    n: t.number,
    meta: t.time,
    thumb: board ? boardThumb(board) : pageThumb(t.guidePage ?? t.parts[0].example.page),
    level: t.effort,
    parts: t.parts.length > 1 ? t.parts.map((p) => ({ label: `${p.label} · ${p.title}`, hash: `#part-${p.id}` })) : undefined,
  };
}

export type RailId = 'existing-products' | 'visual-culture' | 'language' | 'material-reality';
export type RailComponentId = RailId | 'reflection';

/** The two Reflection pages in a component: Before its first tool, After its last page. */
const reflectBefore = (base: string, n: number): RailItem => ({ slug: 'reflect-before', label: 'Reflect: before', href: `${base}reflect-before/`, glyph: 'R', thumb: reflectionThumb(`r${n}a`), level: 1 });
const reflectAfter = (base: string, n: number): RailItem => ({ slug: 'reflect-after', label: 'Reflect: after', href: `${base}reflect-after/`, glyph: 'R', thumb: reflectionThumb(`r${n}b`), level: 1 });
const overviewThumbs: Record<RailComponentId, string> = {
  reflection: reflectionThumb('r1a'),
  'existing-products': pageThumb('1.09'),
  'visual-culture': pageThumb('2.04'),
  language: pageThumb('3.10'),
  'material-reality': pageThumb('4.07'),
};

export function railFor(id: RailComponentId): Rail {
  const c = componentById[id];
  const head = { c: c.c, number: c.number, name: c.name, short: c.short, overviewHref: c.href, overviewThumb: overviewThumbs[id] };
  const n = c.number ?? 0;
  if (id === 'reflection') {
    return {
      ...head,
      hasCardKit: false,
      items: lookBack.map((p) => ({ slug: p.slug, label: p.title.replace('Look back: ', 'Look back · '), href: `${c.href}${p.slug}/`, glyph: p.code.replace('R·', ''), thumb: reflectionThumb(p.image), level: 1 as const })),
    };
  }
  if (id === 'existing-products') {
    return {
      ...head,
      hasCardKit: true,
      items: [
        { slug: 'pick-a-product', label: 'Pick a product', href: `${c.href}pick-a-product/` },
        reflectBefore(c.href, n),
        ...c1Tools.map((t) => toolItem(c.href, t)),
        reflectAfter(c.href, n),
      ],
    };
  }
  if (id === 'visual-culture') {
    return {
      ...head,
      hasCardKit: false,
      items: [
        { slug: 'before-you-start', label: 'Before you start', href: `${c.href}before-you-start/` },
        reflectBefore(c.href, n),
        ...c2Tools.map((t) => toolItem(c.href, t)),
        { slug: 'is-it-working', label: 'Is it working?', href: `${c.href}is-it-working/` },
        reflectAfter(c.href, n),
      ],
    };
  }
  if (id === 'language') {
    return {
      ...head,
      hasCardKit: false,
      items: [
        { slug: 'before-you-start', label: 'Before you start', href: `${c.href}before-you-start/`, meta: c3Route[0].time, thumb: pageThumb(c3Before.image) },
        reflectBefore(c.href, n),
        ...c3Tools.map((t) => toolItem(c.href, t)),
        { slug: 'is-it-working', label: 'Is it working?', href: `${c.href}is-it-working/` },
        reflectAfter(c.href, n),
      ],
    };
  }
  return {
    ...head,
    hasCardKit: false,
    items: [
      reflectBefore(c.href, n),
      { slug: 'before-you-start', label: 'Before you start', href: `${c.href}before-you-start/`, thumb: pageThumb(c4Before.step1.image) },
      ...c4Tools.map((t) => toolItem(c.href, t)),
      { slug: 'ask-your-participants', label: 'Ask your participants', href: `${c.href}ask-your-participants/`, thumb: pageThumb(participants.image) },
      reflectAfter(c.href, n),
    ],
  };
}
