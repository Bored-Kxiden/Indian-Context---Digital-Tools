import { components, componentById, type ComponentColour } from './components';
import { tools as c1Tools } from './booklet/existing-products';
import { tools as c4Tools } from './booklet/material-reality';
import type { Tool } from './booklet/types';

// The left-hand rail on component pages: the tools of one component, in order.

export interface RailItem {
  slug: string;
  label: string;
  href: string;
  meta?: string;
  /** Sub-parts, shown under the current tool. */
  parts?: { label: string; hash: string }[];
}

export interface Rail {
  c: ComponentColour;
  number: number | null;
  name: string;
  overviewHref: string;
  items: RailItem[];
  /** True when the component has a card kit (shows the Paper | Cards switch). */
  hasCardKit: boolean;
}

function toolItem(base: string, t: Tool): RailItem {
  return {
    slug: t.slug,
    label: t.number ? `${t.number} · ${t.short}` : t.short,
    href: `${base}${t.slug}/`,
    meta: t.time,
    parts: t.parts.length > 1 ? t.parts.map((p) => ({ label: `${p.label} · ${p.title}`, hash: `#part-${p.id}` })) : undefined,
  };
}

export function railFor(id: 'existing-products' | 'material-reality'): Rail {
  const c = componentById[id];
  if (id === 'existing-products') {
    return {
      c: c.c,
      number: c.number,
      name: c.name,
      overviewHref: c.href,
      hasCardKit: true,
      items: [
        { slug: 'pick-a-product', label: 'Pick a product', href: `${c.href}pick-a-product/`, meta: '5 min' },
        ...c1Tools.map((t) => toolItem(c.href, t)),
      ],
    };
  }
  return {
    c: c.c,
    number: c.number,
    name: c.name,
    overviewHref: c.href,
    hasCardKit: false,
    items: [
      { slug: 'before-you-start', label: 'Before you start', href: `${c.href}before-you-start/` },
      ...c4Tools.map((t) => toolItem(c.href, t)),
      { slug: 'ask-your-participants', label: 'Ask your participants', href: `${c.href}ask-your-participants/` },
    ],
  };
}

export { components };
