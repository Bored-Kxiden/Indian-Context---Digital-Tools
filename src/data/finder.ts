import { goals, languageSteps } from './goals';
import { components } from './components';
import { tools as c1Tools } from './booklet/existing-products';
import { tools as c2Tools } from './booklet/visual-culture';
import { tools as c3Tools } from './booklet/language';
import { tools as c4Tools } from './booklet/material-reality';
import { referencePages, referenceHref, parentLabel } from './tools';
import { lookBack, stops as reflectStops } from './reflection';

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
const C2 = '/components/visual-culture/';
const C3 = '/components/language/';
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
  ...c2Tools.map((t) => ({
    title: t.number ? `${t.number} · ${t.name}` : t.name,
    hint: t.question,
    href: `${C2}${t.slug}/`,
    c: 'c2' as const,
  })),
  { title: 'The six photo missions', hint: 'Show · what to ask participants to photograph', href: `${C2}show/#missions`, c: 'c2' as const },
  { title: 'Before you start', hint: 'Language · understand the context first', href: `${C3}before-you-start/`, c: 'c3' as const },
  ...c3Tools.map((t) => ({
    title: t.number ? `${t.number} · ${t.name}` : t.name,
    hint: t.question,
    href: `${C3}${t.slug}/`,
    c: 'c3' as const,
  })),
  {
    title: 'Reverse thick translation',
    hint: 'Translate · test a translation back with the audience, in three directions',
    href: `${C3}translate/#reverse`,
    c: 'c3' as const,
  },
  ...referencePages.map((p) => ({ title: p.name, hint: `${parentLabel(p.parent)} · go deeper`, href: referenceHref(p.slug), c: 'c3' as const })),
  // The steps under each Language theme. They are not in the "I want to…" index; search still finds them.
  // (The deeper pages are already listed above, so they are skipped here.)
  ...languageSteps.flatMap((g) =>
    g.items
      .filter(
        (i) =>
          i.tag !== 'Reverse thick translation' &&
          !referencePages.some((p) => referenceHref(p.slug) === i.href) &&
          !c3Tools.some((t) => `${C3}${t.slug}/` === i.href),
      )
      .map((i) => ({ title: i.tag, hint: `Language · ${g.theme} · ${i.phrase.replace(/^…/, '')}`, href: i.href, c: 'c3' as const })),
  ),
  ...c4Tools.map((t) => ({
    title: t.number ? `${t.number} · ${t.name}` : t.name,
    hint: t.question,
    href: `${C4}${t.slug}/`,
    c: 'c4' as const,
  })),
];

// Reflection: the Before and After page in every component, and the three Look back pages.
const reflect: FinderItem[] = [
  ...reflectStops.flatMap((s) => [
    { title: `Before Component ${s.n} · ${s.before.code}`, hint: `Reflection · position and prediction, before ${s.short}`, href: `${s.href}reflect-before/`, c: 'ink' as const },
    { title: `After Component ${s.n} · ${s.after.code}`, hint: `Reflection · claim and redaction, after ${s.short}`, href: `${s.href}reflect-after/`, c: 'ink' as const },
  ]),
  ...lookBack.map((p) => ({ title: `${p.title} · ${p.code}`, hint: `Reflection · ${p.sub.replace(/^Step 5 · /, '')}`, href: `/components/reflection/${p.slug}/`, c: 'ink' as const })),
];

const pages: FinderItem[] = [
  ...components.map((c) => ({
    title: c.number ? `${c.number} · ${c.name}` : c.name,
    hint: c.blurb,
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
  { id: 'tools', title: 'Tools', items: [...tools, ...reflect] },
  { id: 'pages', title: 'Pages', items: pages },
];
