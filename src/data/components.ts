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
  /** Its number among the five files of the kit, in the template's order (D41): 1 Reflection … 5 Language. */
  file: number;
  /** "I want to …", in the reader's voice (the template's line over each title). */
  verb: string;
  /** The short name on the folder's label in the v3 template: "Tool 02 — Existing products". */
  tag: string;
  /** A two-line plain-language description: what you do and what you get. */
  plain: string;
  /** Level of involvement, 1 light · 2 moderate · 3 complex, and what it asks of you (the owner's template; v3 wording, D47). */
  level: 1 | 2 | 3;
  involve: string;
}

export const components: ToolkitComponent[] = [
  {
    id: 'existing-products',
    number: 1,
    c: 'c1',
    name: 'Reading Existing Products',
    short: 'Existing products',
    blurb: 'Whose user is built into a product, and who pays when it’s wrong about them.',
    hours: '3–4 hours',
    status: 'live',
    href: '/components/existing-products/',
    tags: ['Media & Gossip', 'History', 'The Break', 'Power', '+ card kit'],
    file: 2,
    verb: "I want to read existing products",
    tag: 'Existing products',
    level: 2,
    involve: "About 3 hours for the full route, with a product open on a phone or laptop, pens and sticky notes in three colours. Each tool also works on its own. Every page is a template with Meera’s scholarship-portal example in [brackets]. Working as a team, the optional card kit puts the same tools on big boards.",
    plain: "Pick one real product people use. Read what is said about it, what it replaced and who holds power around it, to find out who it was built for and who pays when it gets them wrong.",
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
    file: 3,
    verb: "I want to read visual culture",
    tag: 'Visual culture',
    level: 2,
    involve: "Moderate tool that takes a few sessions. Needs participants who can photograph their own world, and a peer to read the images with you.",
    plain: "People photograph the signs, screens and objects they trust and act on every day, then explain them to you. You learn what your design has to look like to be noticed and trusted.",
  },
  {
    id: 'language',
    number: 3,
    c: 'c3',
    name: 'Reading Language Conditions',
    short: 'Language conditions',
    blurb: 'Understand what was meant, not only what was said: thick translation, checked back both ways with the people the words came from.',
    status: 'live',
    href: '/components/language/',
    tags: ['Listen', 'Translate', 'Reverse thick translation', 'Test', 'Library', 'Kahavat Relay'],
    file: 5,
    verb: "I want to read language conditions",
    tag: 'Language',
    level: 3,
    involve: "More complex tool that should ideally be done over a few days. It needs a local language collaborator and a second independent reader, and should be revised after a first pass.",
    plain: "Find out what people mean, not only what they say. Translate with the meaning kept in, then check it back with the people the words came from.",
  },
  {
    id: 'material-reality',
    number: 4,
    c: 'c4',
    name: 'Reading Material Conditions',
    short: 'Material conditions',
    blurb: 'What people actually have around them, what it costs them, and who they lean on to get things done.',
    hours: '2–4 hours',
    status: 'live',
    href: '/components/material-reality/',
    tags: ['Build', 'Break', 'Weigh', 'Say'],
    file: 4,
    verb: "I want to read material conditions",
    tag: 'Material reality',
    level: 3,
    involve: "More complex tool that should ideally be done over a few days. Given the strategic nature of the inputs/outputs, this needs consultations with seniors, peers and ideally needs to be revised after a first pass.",
    plain: "Map what people actually have: phones, data, money, time and the people they lean on. Find where your product breaks for them, and what that costs them.",
  },
  {
    id: 'reflection',
    number: null,
    c: 'ink',
    name: 'Reflection',
    short: 'Reflection',
    blurb: 'What did the process give you that you did not already have? Write down where you stand before each component, and check your claim against your own bias after it.',
    status: 'live',
    href: '/components/reflection/',
    tags: ['Position', 'Prediction', 'Claim', 'Redaction', 'Summarise'],
    file: 1,
    verb: "I want to reflect before I start",
    tag: 'Claim & reflection',
    level: 1,
    involve: "Light tool done alone, before and after each component. Write where you stand and what you predict, then check your claim against your own bias.",
    plain: "Before you start, write down what you already believe and what you expect to find. At the end, check what you found against it, so your own assumptions don’t pass as findings.",
  },
];

/** The five files in the template's order: Reflection first, then the four readings. */
export const files = [...components].sort((a, b) => a.file - b.file);
export const fileNo = (c: { file: number }) => String(c.file).padStart(2, '0');

export const componentById = Object.fromEntries(components.map((c) => [c.id, c])) as Record<ComponentId, ToolkitComponent>;
/** The four reading components. Reflection runs through them, so it is shown apart. */
export const liveComponents = components.filter((c) => c.status === 'live' && c.id !== 'reflection');
export const soonComponents = components.filter((c) => c.status === 'soon');
