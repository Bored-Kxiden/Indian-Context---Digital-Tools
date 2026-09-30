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
    blurb: 'What have people learned to notice, trust and act on, before they ever read your product?',
    hours: 'About a week, 3 sessions',
    status: 'live',
    href: '/components/visual-culture/',
    tags: ['Show', 'Read', 'Build', 'Hand off'],
  },
  {
    id: 'language',
    number: 3,
    c: 'c3',
    name: 'Reading Language',
    short: 'Language',
    blurb: 'Understand what was meant, not only what was said: thick translation, checked back both ways with the people the words came from.',
    status: 'live',
    href: '/components/language/',
    tags: ['Listen', 'Translate', 'Reverse thick translation', 'Test', 'Library', 'Kahavat Relay'],
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
    name: 'Claim & Reflection',
    short: 'Reflection',
    blurb: 'What did the process give you that you did not already have? Write down where you stand before each component, and check your claim against your own bias after it.',
    status: 'live',
    href: '/components/reflection/',
    tags: ['Position', 'Prediction', 'Claim', 'Redaction', 'Summarise'],
  },
];

export const componentById = Object.fromEntries(components.map((c) => [c.id, c])) as Record<ComponentId, ToolkitComponent>;
/** The four reading components. Reflection runs through them, so it is shown apart. */
export const liveComponents = components.filter((c) => c.status === 'live' && c.id !== 'reflection');
export const soonComponents = components.filter((c) => c.status === 'soon');
