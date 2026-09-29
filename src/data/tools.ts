import type { ModuleId } from './modules';

export type ToolKind = 'Field tool' | 'Protocol' | 'Audit' | 'Library';

export interface Tool {
  slug: string;
  name: string;
  kind: ToolKind;
  /** One line, used on cards. */
  blurb: string;
  /** Which process modules this tool is used in. */
  modules: ModuleId[];
}

// Order here is the order shown in navigation, cards, and prev/next links.
export const tools: Tool[] = [
  {
    slug: 'meaning-card',
    name: 'The Meaning Card',
    kind: 'Field tool',
    blurb: 'One card per meaning moment: what was said, what was observed, what the researcher infers, and what the participant said when asked.',
    modules: ['person'],
  },
  {
    slug: 'physical-field-kit',
    name: 'The Physical Field Kit',
    kind: 'Field tool',
    blurb: 'Printable Context, Interview, and Reflection Cards, a Researcher Positionality Card, and blank Meaning Cards.',
    modules: ['context', 'person'],
  },
  {
    slug: 'fidelity-protocol',
    name: 'The Fidelity Protocol',
    kind: 'Protocol',
    blurb: 'Four tags that show how much a finding was translated, by whom, and whether a second reader confirmed it.',
    modules: ['interpret'],
  },
  {
    slug: 'language-lens-audit',
    name: 'The Language Lens Audit',
    kind: 'Audit',
    blurb: 'Three lenses (Nomenclature, Proxy/Audience, Trust) for auditing portal or interface copy before it ships.',
    modules: ['interpret'],
  },
  {
    slug: 'expression-library',
    name: 'The Expression Library',
    kind: 'Library',
    blurb: 'The searchable home for validated, de-identified meaning moments once they are digitized from Meaning Cards.',
    modules: ['interpret'],
  },
  {
    slug: 'design-language-library',
    name: 'The Design Language Library',
    kind: 'Library',
    blurb: 'Validated wording and interaction patterns, each citing the Expression Library entries that justify it.',
    modules: ['interpret'],
  },
];

export const toolBySlug = Object.fromEntries(tools.map((t) => [t.slug, t])) as Record<string, Tool>;

export const toolHref = (slug: string) => `/tools/${slug}/`;

export const toolGroups: { title: string; note: string; slugs: string[] }[] = [
  {
    title: 'In the field',
    note: 'Capture meaning as it happens, on paper, in the language it was spoken.',
    slugs: ['meaning-card', 'physical-field-kit'],
  },
  {
    title: 'Before you trust a finding',
    note: 'Decide whether a meaning is well supported or still a single interpreter’s guess.',
    slugs: ['fidelity-protocol'],
  },
  {
    title: 'Before wording ships',
    note: 'Check candidate interface copy against the people who will actually meet it.',
    slugs: ['language-lens-audit'],
  },
  {
    title: 'What builds up over time',
    note: 'Two living libraries, so the next project does not start from zero.',
    slugs: ['expression-library', 'design-language-library'],
  },
];
