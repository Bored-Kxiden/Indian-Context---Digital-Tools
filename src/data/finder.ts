import { goals } from './goals';
import { components } from './components';
import { tools as c1Tools } from './booklet/existing-products';
import { tools as c4Tools } from './booklet/material-reality';
import { tools as languageTools, toolHref } from './tools';

// Everything the "Find a tool" search can open, built from the same data as the pages.
// Order = order of the result groups.

export type FinderColour = 'c1' | 'c2' | 'c3' | 'c4' | 'ink';

export interface FinderItem {
  title: string;
  hint: string;
  href: string;
  c: FinderColour;
}
export interface FinderGroup {
  id: string;
  title: string;
  items: FinderItem[];
}

const C1 = '/components/existing-products/';
const C4 = '/components/material-reality/';

const iWantTo: FinderItem[] = goals.flatMap((g) =>
  g.items.map((i) => ({ title: i.phrase, hint: `${g.componentLabel} · ${i.tag}`, href: i.href, c: g.component })),
);

const tools: FinderItem[] = [
  ...c1Tools.map((t) => ({
    title: t.number ? `${t.number} · ${t.name}` : t.name,
    hint: t.question,
    href: `${C1}${t.slug}/`,
    c: 'c1' as const,
  })),
  ...languageTools.map((t) => ({ title: t.name, hint: t.blurb, href: toolHref(t.slug), c: 'c3' as const })),
  ...c4Tools.map((t) => ({
    title: t.number ? `${t.number} · ${t.name}` : t.name,
    hint: t.question,
    href: `${C4}${t.slug}/`,
    c: 'c4' as const,
  })),
];

const pages: FinderItem[] = [
  ...components.map((c) => ({
    title: c.number ? `${c.number} · ${c.name}` : c.name,
    hint: c.status === 'soon' ? 'Coming next' : c.blurb,
    href: c.href,
    c: c.c,
  })),
  { title: 'Card kit', hint: 'Boards B1 to B7 and card sheets S1 to S8', href: '/card-kit/', c: 'c1' },
  { title: 'The guideline', hint: 'Be specific: one real person, one real thing', href: '/guideline/', c: 'ink' },
  { title: 'How to read a tool', hint: 'Guide, Example, Blank template, Card kit', href: '/guideline/#how-to-read', c: 'ink' },
  { title: 'Meet Meera', hint: 'The running example', href: '/guideline/#meera', c: 'ink' },
  { title: 'Downloads', hint: 'Booklet, card kit, blank templates', href: '/downloads/', c: 'ink' },
  { title: 'About', hint: 'Who it is for, and what comes after', href: '/about/', c: 'ink' },
];

export const finderGroups: FinderGroup[] = [
  { id: 'want', title: 'I want to…', items: iWantTo },
  { id: 'tools', title: 'Tools', items: tools },
  { id: 'pages', title: 'Pages', items: pages },
];
