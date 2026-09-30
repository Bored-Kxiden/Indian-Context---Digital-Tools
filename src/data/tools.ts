import { tools as booklet } from './booklet/language';

// The deeper pages of Component 3 · Reading Language. Each one sits under the booklet tool it
// belongs to (its "Go deeper" links, see `refs` in booklet/language.ts), so the component has one
// route (Before you start + Tools 1 to 5) and these pages hang off it. The addresses did not
// change, so old links still work.

export type ReferenceKind = 'Field tool' | 'Protocol' | 'Audit' | 'Library';
export type ParentSlug = 'before-you-start' | 'listen' | 'translate' | 'test' | 'library' | 'kahavat-relay';

export interface ReferencePage {
  slug: string;
  name: string;
  kind: ReferenceKind;
  /** One line, used as the page intro and in search. */
  blurb: string;
  /** The booklet tool this page belongs to. It is highlighted in the step bar. */
  parent: ParentSlug;
  /** Other tools that also use it. */
  also?: ParentSlug[];
}

// Order here is the order of the search results and the "Go deeper" lists.
export const referencePages: ReferencePage[] = [
  {
    slug: 'meaning-card',
    name: 'The Meaning Card',
    kind: 'Field tool',
    blurb: 'One card per meaning moment: what was said, what was observed, what the researcher infers, and what the participant said when asked.',
    parent: 'listen',
  },
  {
    slug: 'physical-field-kit',
    name: 'The Physical Field Kit',
    kind: 'Field tool',
    blurb: 'Printable Context, Interview, and Reflection Cards, a Researcher Positionality Card, and blank Meaning Cards.',
    parent: 'listen',
    also: ['before-you-start'],
  },
  {
    slug: 'fidelity-protocol',
    name: 'The Fidelity Protocol',
    kind: 'Protocol',
    blurb: 'Four tags that show how much a finding was translated, by whom, and whether a second reader confirmed it.',
    parent: 'translate',
  },
  {
    slug: 'language-lens-audit',
    name: 'The Language Lens Audit',
    kind: 'Audit',
    blurb: 'Three lenses (New, Proxy, Trust) for auditing portal or interface copy before it ships.',
    parent: 'test',
  },
  {
    slug: 'expression-library',
    name: 'The Expression Library',
    kind: 'Library',
    blurb: 'The searchable home for validated, de-identified meaning moments once they are digitized from Meaning Cards.',
    parent: 'library',
  },
  {
    slug: 'design-language-library',
    name: 'The Design Language Library',
    kind: 'Library',
    blurb: 'Validated wording and interaction patterns, each citing the Expression Library entries that justify it.',
    parent: 'library',
  },
];

export const referenceBySlug = Object.fromEntries(referencePages.map((p) => [p.slug, p])) as Record<string, ReferencePage>;
export const referenceHref = (slug: string) => `/components/language/${slug}/`;

/** "Tool 2 · Translate" for a parent slug. */
export function parentLabel(slug: ParentSlug): string {
  if (slug === 'before-you-start') return 'Before you start';
  const t = booklet.find((b) => b.slug === slug);
  return t ? `Tool ${t.number} · ${t.short}` : slug;
}
