// The toolkit's components. Colour = where you are (see CONTEXT.md, D5).
// Add a component here and it appears on the home page, the Components page,
// the header/footer lists, and the "I want to…" index (if it has goals).

export type ComponentId = 'existing-products' | 'visual-culture' | 'language' | 'material-reality' | 'reflection';
export type ComponentColour = 'c1' | 'c2' | 'c3' | 'c4' | 'ink';

export interface ToolkitComponent {
  id: ComponentId;
  /** Booklet numbering. Reflection has none. */
  number: number | null;
  c: ComponentColour;
  name: string;
  /** Short form for lists and breadcrumbs. */
  short: string;
  blurb: string;
  hours?: string;
  status: 'live' | 'soon';
  /** Site path, with trailing slash. */
  href: string;
  /** Tool names shown as chips on the component card. */
  tags: string[];
}

export const components: ToolkitComponent[] = [
  {
    id: 'existing-products',
    number: 1,
    c: 'c1',
    name: 'Reading Existing Products',
    short: 'Existing products',
    blurb: 'Whose user is built into a product, and who pays when the product is wrong about them.',
    hours: '3–4 hours',
    status: 'live',
    href: '/components/existing-products/',
    tags: ['Media & Gossip', 'History', 'The Break', 'Power', '+ card kit'],
  },
  {
    id: 'visual-culture',
    number: 2,
    c: 'c2',
    name: 'Reading Visual Culture',
    short: 'Visual culture',
    blurb: 'How pictures, symbols and colour carry meaning in the places you design for.',
    status: 'soon',
    href: '/components/visual-culture/',
    tags: [],
  },
  {
    id: 'language',
    number: 3,
    c: 'c3',
    name: 'Reading Language',
    short: 'Language',
    blurb: 'How meaning gets lost between languages, and how to keep it. The Meaning-to-Interface Toolkit.',
    status: 'live',
    href: '/components/language/',
    tags: ['Meaning Card', 'Field Kit', 'Fidelity Protocol', 'Language Lens', 'Libraries'],
  },
  {
    id: 'material-reality',
    number: 4,
    c: 'c4',
    name: 'Reading Material Reality',
    short: 'Material reality',
    blurb: 'What people actually have around them, what it costs them, and who they lean on to get things done.',
    hours: '2–4 hours',
    status: 'live',
    href: '/components/material-reality/',
    tags: ['Build', 'Break', 'Weigh', 'Say'],
  },
  {
    id: 'reflection',
    number: null,
    c: 'ink',
    name: 'Reflection',
    short: 'Reflection',
    blurb: 'Looking back at what you made and what it changed.',
    status: 'soon',
    href: '/components/reflection/',
    tags: [],
  },
];

export const componentById = Object.fromEntries(components.map((c) => [c.id, c])) as Record<ComponentId, ToolkitComponent>;
export const liveComponents = components.filter((c) => c.status === 'live');
export const soonComponents = components.filter((c) => c.status === 'soon');
