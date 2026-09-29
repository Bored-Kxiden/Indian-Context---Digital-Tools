// Component 1 · Card Kit. Source: the Component 1 Card Kit PDF (sheets S1–S8, boards B1–B7).

export interface Sheet {
  id: string;
  name: string;
  /** Which tool(s) it belongs to. */
  tools: string;
  /** How many times to print it. */
  copies: number;
  /** Printed page label in the booklet. */
  page: string;
  blurb: string;
}

export interface Board {
  id: string;
  name: string;
  tool: string;
  toolSlug: string;
  page: string;
  cards: string[];
}

export const cardKitIntro =
  'The same tools, laid out on a table. Printed cards hold the categories and the questions. What you find goes on yellow evidence cards or sticky notes.';

export const inside = [
  { name: 'Evidence', use: 'anything you saw, heard or found. Every tool.', sheet: 'S1' },
  { name: 'Channel', use: 'where a quote came from. Tool 1.', sheet: 'S2' },
  { name: 'Question', use: 'answer it on a teal note. Several tools.', sheet: 'S2 S3 S5' },
  { name: 'People', use: 'roles around the product. Tools 2 and 4.', sheet: 'S3' },
  { name: 'Need, four suits', use: 'people, objects, systems, information. Tool 3.', sheet: 'S4' },
  { name: 'Failure + blame tokens', use: 'what goes wrong at a step, and where the blame lands. Tool 3.', sheet: 'S5' },
  { name: 'Constraint', use: 'the one hard limit you give your persona. Tool 3.', sheet: 'S6' },
  { name: 'Lens + Finding', use: 'three ways to read power, and findings to rate. Tool 4.', sheet: 'S7' },
  { name: 'Synthesis', use: 'one line per tool, three redesigns, the claim.', sheet: 'S8' },
];

export const printCards = 'Sheets S1–S8 (p.1.26–1.33) on A4 card, 250–300 gsm. Cut along the dashed lines. Print S1 five times and S4 twice. The rest once.';
export const printBoards = 'Boards B1–B7 (p.1.34–1.40) at A2, landscape. A3 works for pairs. No big printer? Copy the board onto chart paper.';
export const setUpTable = [
  'Put one board in the middle. Only the one for the tool you’re doing.',
  'Sort the cards face up by colour, along the edge of the table.',
  'Keep sticky notes and pens out. You still write on notes.',
  'Photograph the board before you clear it. The photo is your record.',
];
export const principle = 'A card is a prompt, not evidence. Everything you put on a board has to come from something real you saw, heard or found.';

export const sheets: Sheet[] = [
  { id: 'S1', name: 'Evidence cards', tools: 'Every tool', copies: 5, page: 'p.1.26', blurb: 'What I saw or heard: where or which channel, who, date, tool, and whether it was seen, heard or found online.' },
  { id: 'S2', name: 'Channel + question cards', tools: 'Tool 1 · Media & Gossip', copies: 1, page: 'p.1.27', blurb: 'Six channels (ad or poster, official page, FAQ or support reply, public review, forum or comments, chat or word of mouth) and three questions to answer on teal notes.' },
  { id: 'S3', name: 'People + question cards', tools: 'Tools 2 + 4 · History, Power', copies: 1, page: 'p.1.28', blurb: 'Roles around the product: an official or clerk, a teacher or principal, a family member, a local shop, an agent or middleman, a friend or senior, someone else. Plus two History questions.' },
  { id: 'S4', name: 'Need cards · four suits', tools: 'Tool 3 · The Break', copies: 2, page: 'p.1.29', blurb: 'People (who must help?), objects (what must they own?), systems (what else must work?) and information (what must they know?). One card per need, under each step.' },
  { id: 'S5', name: 'Failure cards, blame tokens, questions', tools: 'Tool 3 · The Break', copies: 1, page: 'p.1.30', blurb: 'Failure cards (system failure, person unavailable, object missing, information gap, no time, another failure), three round blame tokens (1, 2, ★), and two Villain Story questions.' },
  { id: 'S6', name: 'Constraint cards', tools: 'Tool 3 · The Break', copies: 1, page: 'p.1.31', blurb: 'One hard limit for your villain persona, and only one: shared phone, only a phone camera, patchy network, a different language, no free time, a missing document, needs permission, the deadline is close, or your own.' },
  { id: 'S7', name: 'Lens + finding cards', tools: 'Tool 4 · Power', copies: 1, page: 'p.1.32', blurb: 'Creator, authority and political lenses, and findings to place under minor, major or critical.' },
  { id: 'S8', name: 'Synthesis cards', tools: 'Synthesis', copies: 1, page: 'p.1.33', blurb: 'One line from each tool, three redesigns to place on the Blame Scale, and the design claim.' },
];

export const boards: Board[] = [
  { id: 'B1', name: 'The Media Story', tool: 'Tool 1 · Media & Gossip · Part A', toolSlug: 'media-gossip', page: 'p.1.34', cards: ['S1'] },
  { id: 'B2', name: 'The Gossip Venn', tool: 'Tool 1 · Media & Gossip · Part B', toolSlug: 'media-gossip', page: 'p.1.35', cards: ['S1', 'S2'] },
  { id: 'B3', name: 'The timeline', tool: 'Tool 2 · History', toolSlug: 'history', page: 'p.1.36', cards: ['S1', 'S3'] },
  { id: 'B4', name: 'Ideal flow + needs', tool: 'Tool 3 · The Break · Part A', toolSlug: 'the-break', page: 'p.1.37', cards: ['S4'] },
  { id: 'B5', name: 'Villain walk + Blame Scale', tool: 'Tool 3 · The Break · Parts B + C', toolSlug: 'the-break', page: 'p.1.38', cards: ['S5', 'S6'] },
  { id: 'B6', name: 'Three lenses + findings', tool: 'Tool 4 · Power', toolSlug: 'power', page: 'p.1.39', cards: ['S3', 'S7'] },
  { id: 'B7', name: 'Synthesis', tool: 'Synthesis', toolSlug: 'synthesis', page: 'p.1.40', cards: ['S8', 'all cards from Tools 1–4'] },
];

export const sheetById = Object.fromEntries(sheets.map((s) => [s.id, s]));
export const boardById = Object.fromEntries(boards.map((b) => [b.id, b]));

/** Size and copies label shown next to a sheet download. */
export const sheetMeta = (s: Sheet) => `A4${s.copies > 1 ? ` ×${s.copies}` : ''}`;
