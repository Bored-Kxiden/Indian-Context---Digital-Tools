import { componentById, type ComponentColour } from './components';
import { tools as c1Tools } from './booklet/existing-products';
import { tools as c4Tools } from './booklet/material-reality';
import { tools as languageTools, toolHref } from './tools';
import type { Tool } from './booklet/types';

// The step-by-step bar on component pages: the tools of one component, in order.

export interface RailItem {
  slug: string;
  label: string;
  href: string;
  /** Tool number in the booklet, when it has one. */
  n?: number;
  meta?: string;
  /** Sub-parts, for deep links. */
  parts?: { label: string; hash: string }[];
}

export interface Rail {
  c: ComponentColour;
  number: number | null;
  name: string;
  short: string;
  overviewHref: string;
  items: RailItem[];
  /** True when the component has a card kit (shows the Paper | Cards switch). */
  hasCardKit: boolean;
}

function toolItem(base: string, t: Tool): RailItem {
  return {
    slug: t.slug,
    label: t.short,
    href: `${base}${t.slug}/`,
    n: t.number,
    meta: t.time,
    parts: t.parts.length > 1 ? t.parts.map((p) => ({ label: `${p.label} · ${p.title}`, hash: `#part-${p.id}` })) : undefined,
  };
}

export function railFor(id: 'existing-products' | 'material-reality' | 'language'): Rail {
  const c = componentById[id];
  const head = { c: c.c, number: c.number, name: c.name, short: c.short, overviewHref: c.href };
  if (id === 'existing-products') {
    return {
      ...head,
      hasCardKit: true,
      items: [
        { slug: 'pick-a-product', label: 'Pick a product', href: `${c.href}pick-a-product/`, meta: '5 min' },
        ...c1Tools.map((t) => toolItem(c.href, t)),
      ],
    };
  }
  if (id === 'language') {
    return {
      ...head,
      hasCardKit: false,
      items: [
        { slug: 'methodology', label: 'Methodology', href: `${c.href}methodology/` },
        ...languageTools.map((t, i) => ({
          slug: t.slug,
          label: t.name.replace(/^The /, ''),
          href: toolHref(t.slug),
          n: i + 1,
        })),
      ],
    };
  }
  return {
    ...head,
    hasCardKit: false,
    items: [
      { slug: 'before-you-start', label: 'Before you start', href: `${c.href}before-you-start/` },
      ...c4Tools.map((t) => toolItem(c.href, t)),
      { slug: 'ask-your-participants', label: 'Ask your participants', href: `${c.href}ask-your-participants/` },
    ],
  };
}
