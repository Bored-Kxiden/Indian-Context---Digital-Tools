import { components, type ComponentId } from './components';
import { tools as c1Tools, figmaFile } from './booklet/existing-products';
import { tools as c2Tools, overview as c2, structures, missions, method, howToUse, figjam, make, promptsLine, captureStage, showOutput } from './booklet/visual-culture';
import { tools as c3Tools, reverseThickTranslation as rtt, beforeYouStart as c3Before, overview as c3 } from './booklet/language';
import { tools as c4Tools, overview as c4, participants } from './booklet/material-reality';
import { overview as refl, after as reflAfter, summarise, wheel, consequences, lookBack } from './reflection';
import { sheets, boards, cardKitIntro, principle as cardPrinciple } from './card-kit';
import { referencePages, referenceHref } from './tools';
import { guideline, meera, howToRead, afterTheToolkit } from './booklet/shared';
import { intro } from './site';
import { INTERPRETERS, RENDERINGS } from '../utils/fidelity';
import type { Tool } from './booklet/types';
import kit from '../../templates/kit-cards.json';

// The glossary: every term the toolkit uses, down to the words on each tool's Guide.
//
// Three kinds of entry, and the page and the "Ask the toolkit" answers always say which is which:
//   1. Derived: read straight from the data the pages are built from (each tool's "words", the
//      components, tools, card sheets and boards, evidence tags, structures, layers, fidelity
//      tags…), so the glossary cannot drift from the pages.
//   2. The toolkit's own concepts that have no "words" entry, written from the toolkit's text.
//   3. General terms the toolkit uses but does not define (OTP, code-switching, CSC…), marked
//      "General term", with a short plain definition and an open reference to read more. They are
//      not research data.
//
// Nothing here is generated at run time. To add a term, add it below; the glossary page, the
// search and "Ask the toolkit" all pick it up on the next build.

export type TermKind = 'Component' | 'Tool' | 'Method' | 'Term' | 'Tag' | 'Card' | 'Role' | 'Step' | 'General';
export type TermScope = 'toolkit' | 'c1' | 'c2' | 'c3' | 'c4' | 'ink' | 'general';

export interface Term {
  /** Anchor on /glossary/. */
  id: string;
  term: string;
  /** Other names, abbreviations and spellings people might search for. */
  aka?: string[];
  kind: TermKind;
  scope: TermScope;
  /** Where it belongs, e.g. "Component 3 · Tool 2 · Translate". */
  context?: string;
  def: string;
  /** Short facts shown under the definition, e.g. the question a tool asks. */
  facts?: { k: string; v: string }[];
  list?: string[];
  /** Where the toolkit uses or explains it (site path, without the base path). */
  href?: string;
  /** Related term ids. */
  see?: string[];
  /** General terms only: where to read more. */
  source?: { label: string; href?: string };
}

const SCOPE: Record<ComponentId, { scope: TermScope; n: number | null; name: string; base: string }> = Object.fromEntries(
  components.map((c) => [c.id, { scope: c.c as TermScope, n: c.number, name: c.name, base: c.href }]),
) as never;

const compLabel = (id: ComponentId) => {
  const c = SCOPE[id];
  return c.n ? `Component ${c.n} · ${c.name}` : c.name;
};

export const slug = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’'“”"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** "The Media Story" and "media story" are the same term. */
export const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’'“”"?·.,:]/g, '')
    .replace(/^the\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();

const out: Term[] = [];
const ids = new Set<string>();

function add(t: Omit<Term, 'id'> & { id?: string }): Term {
  let id = t.id ?? slug(t.term);
  if (ids.has(id)) id = `${id}-${t.scope}`;
  let n = 2;
  while (ids.has(id)) id = `${slug(t.term)}-${t.scope}-${n++}`;
  ids.add(id);
  const term = { ...t, id } as Term;
  out.push(term);
  return term;
}

/** Add details to an entry already added (by id). */
function extend(id: string, more: Partial<Term>) {
  const t = out.find((x) => x.id === id);
  if (!t) throw new Error(`glossary: no term "${id}" to extend`);
  if (more.aka) t.aka = [...(t.aka ?? []), ...more.aka];
  if (more.see) t.see = [...(t.see ?? []), ...more.see];
  if (more.facts) t.facts = [...(t.facts ?? []), ...more.facts];
  for (const k of ['def', 'href', 'list', 'context', 'source'] as const) if (more[k] !== undefined) (t as unknown as Record<string, unknown>)[k] = more[k];
}

// ---------------------------------------------------------------------------------------------
// The toolkit as a whole

add({
  id: 'edge-case',
  term: 'Edge case',
  aka: ['edge cases', 'exception', 'exceptions', 'corner case'],
  kind: 'Term',
  scope: 'toolkit',
  context: 'The toolkit’s central idea',
  def: `${intro.central} ${intro.turn}`,
  facts: [
    { k: 'The shift', v: `From ${intro.shift.from} to ${intro.shift.to}` },
    { k: 'In general use', v: 'In engineering, an edge case is a problem that only happens at an extreme of the expected conditions.' },
  ],
  href: '/about/#central',
  see: ['baseline', 'edge-case-check', 'pluriverse'],
  source: { label: 'Wikipedia: Edge case', href: 'https://en.wikipedia.org/wiki/Edge_case' },
});
add({
  id: 'baseline',
  term: 'Baseline',
  aka: ['default user', 'universal user', 'assumed baseline'],
  kind: 'Term',
  scope: 'toolkit',
  context: 'The toolkit’s central idea',
  def: `${intro.opening[0]} ${intro.central}`,
  list: intro.idea,
  href: '/about/#central',
  see: ['edge-case', 'one-real-thing'],
});
add({
  id: 'one-real-thing',
  term: 'One real thing',
  aka: ['the guideline', 'be specific', 'one real person', 'the one guideline'],
  kind: 'Term',
  scope: 'toolkit',
  context: 'The one guideline',
  def: `${guideline.title} ${guideline.body}`,
  facts: [
    { k: 'What counts', v: guideline.whatCounts.body },
    { k: 'Good', v: guideline.good.join(' · ') },
    { k: 'Too broad', v: guideline.tooBroad.join(' · ') },
  ],
  href: '/guideline/',
  see: ['meera', 'pick-a-product'],
});
add({
  id: 'meera',
  term: 'Meera',
  aka: ['meera 19', 'the running example', 'example persona'],
  kind: 'Role',
  scope: 'toolkit',
  context: 'The running example (illustrative)',
  def: `${meera.lead} ${meera.facts.map((f) => `${f.k}: ${f.v}.`).join(' ')} ${meera.outcome}`,
  facts: [{ k: 'Note', v: `${meera.note} She is illustrative, not a real participant.` }],
  href: '/guideline/#meera',
  see: ['persona', 'one-real-thing'],
});
add({
  id: 'guide-example-template',
  term: 'Guide, Example, Template',
  aka: ['guide', 'example', 'template', 'blank template', 'tabs', 'how every tool works', 'filled example'],
  kind: 'Term',
  scope: 'toolkit',
  context: howToRead.everyTool.title,
  def: `${howToRead.everyTool.lead} ${howToRead.everyTool.parts.map((p) => `${p.title}: ${p.body}`).join(' ')}`,
  href: '/guideline/#how-to-read',
  see: ['brackets', 'card-kit'],
});
add({
  id: 'brackets',
  term: '[Brackets]',
  aka: ['brackets', 'bracketed examples', 'square brackets'],
  kind: 'Term',
  scope: 'toolkit',
  context: 'On every template',
  def: 'Anything in [brackets] on a template is an example, from Meera’s scholarship portal. Write over it with your own.',
  href: '/components/existing-products/',
  see: ['guide-example-template', 'meera'],
});
add({
  id: 'card-kit',
  term: 'Card kit',
  aka: ['cards', 'boards', 'the card way', 'component 1 card kit'],
  kind: 'Card',
  scope: 'c1',
  context: 'Component 1 · Reading Existing Products',
  def: `${cardKitIntro} ${cardPrinciple}`,
  href: '/card-kit/',
  see: ['two-ways-to-work'],
});
add({
  id: 'form-principle',
  term: 'Form principle',
  kind: 'Term',
  scope: 'toolkit',
  context: afterTheToolkit.formPrinciple.label,
  def: afterTheToolkit.formPrinciple.text,
  href: '/about/#after',
});

// ---------------------------------------------------------------------------------------------
// Components, tools, and the words on every tool's Guide (derived)

for (const c of components) {
  add({
    id: `component-${c.id}`,
    term: c.name,
    aka: [c.short, ...(c.number ? [`Component ${c.number}`, `C${c.number}`] : ['reflection'])],
    kind: 'Component',
    scope: c.c as TermScope,
    context: c.number ? `Component ${c.number}` : 'Runs through every component',
    def: c.blurb,
    facts: [
      ...(c.hours ? [{ k: 'Time', v: c.hours }] : []),
      { k: c.id === 'reflection' ? 'Steps' : 'Tools', v: c.tags.join(' · ') },
    ],
    href: c.href,
  });
}

function toolEntries(list: Tool[]) {
  for (const t of list) {
    const c = SCOPE[t.component];
    const label = t.number ? `Tool ${t.number} · ${t.name}` : t.name;
    const base = `${c.base}${t.slug}/`;
    const tool = add({
      id: `${t.component}-${t.slug}`,
      term: t.name,
      aka: [t.short, label, `${c.name.replace(/^Reading /, '')} ${t.name}`, ...(t.kind ? [t.kind] : [])].filter((a) => a !== t.name),
      kind: 'Tool',
      scope: c.scope,
      context: compLabel(t.component),
      def: t.whatIsIt.join(' '),
      facts: [
        { k: 'Asks', v: t.question },
        { k: 'Shows you', v: t.shows },
        { k: 'Time', v: t.time },
        ...(t.group ? [{ k: 'Who', v: t.group }] : []),
        { k: 'You need', v: t.need },
        { k: 'You end up with', v: t.endUp },
        { k: 'Done when', v: t.done },
      ],
      href: base,
      see: [],
    });
    for (const w of t.words) {
      if (norm(w.term) === norm(t.name)) continue;
      const word = add({
        term: w.term,
        kind: 'Term',
        scope: c.scope,
        context: `${c.n ? `Component ${c.n} · ` : ''}${label}`,
        def: w.def,
        href: base,
        see: [tool.id],
      });
      tool.see!.push(word.id);
    }
  }
}
toolEntries(c1Tools);
toolEntries(c2Tools);
toolEntries(c3Tools);
toolEntries(c4Tools);

// The deeper Language pages. Where a tool's words already name one, the entry gains the page.
for (const p of referencePages) {
  const existing = out.find((x) => x.scope === 'c3' && x.kind === 'Term' && norm(x.term) === norm(p.name));
  if (existing) {
    extend(existing.id, { href: referenceHref(p.slug), facts: [{ k: 'Go deeper', v: p.blurb }] });
  } else {
    add({
      id: p.slug,
      term: p.name.replace(/^The /, ''),
      aka: [p.name],
      kind: 'Method',
      scope: 'c3',
      context: `Component 3 · ${p.kind}`,
      def: p.blurb,
      href: referenceHref(p.slug),
    });
  }
}

// ---------------------------------------------------------------------------------------------
// Component 1 · Reading Existing Products

const C1 = '/components/existing-products/';
add({
  id: 'pick-a-product',
  term: 'Pick a product',
  aka: ['step 0', 'pick one product'],
  kind: 'Step',
  scope: 'c1',
  context: 'Component 1 · Step 0',
  def: 'One product you can open right now. Not a category: “Google Maps”, not “navigation apps”.',
  facts: [
    { k: 'Good', v: 'National Scholarship Portal · DigiLocker · Google Maps' },
    { k: 'Too broad', v: 'Government scholarship portals · Document apps · Navigation apps' },
  ],
  href: `${C1}pick-a-product/`,
  see: ['one-real-thing'],
});
add({
  id: 'media-story',
  term: 'The Media Story',
  aka: ['media story', 'board b1'],
  kind: 'Method',
  scope: 'c1',
  context: 'Component 1 · Tool 1 · Media & Gossip · Part A',
  def: 'What the product promises, and who it imagines, compared with your real user. Spend 15 minutes with real ads, the app store page or official notices first.',
  href: `${C1}media-gossip/`,
  see: ['the-mismatch', 'existing-products-media-gossip'],
});
add({
  id: 'gossip-venn',
  term: 'The Gossip Venn',
  aka: ['gossip venn', 'venn', 'board b2'],
  kind: 'Method',
  scope: 'c1',
  context: 'Component 1 · Tool 1 · Media & Gossip · Part B',
  def: 'The three circles are three sources of information about the product. Collect real quotes from each, then look at where they agree and where they clash.',
  facts: [{ k: 'Rule', v: 'Never invent a quote. Write each quote on a yellow note, with where you found it.' }],
  href: `${C1}media-gossip/`,
  see: ['the-three-circles', 'the-hardest-contradiction'],
});
add({
  id: 'the-timeline',
  term: 'The timeline',
  aka: ['timeline', 'history timeline', 'board b3'],
  kind: 'Method',
  scope: 'c1',
  context: 'Component 1 · Tool 2 · History',
  def: 'What the product replaced, who lost or gained a role, and which way influence flows. Best done by talking to someone who did it before it went digital.',
  href: `${C1}history/`,
  see: ['then-recently-now', 'people-product', 'product-people'],
});
add({
  id: 'villain-story',
  term: 'The Villain Story',
  aka: ['villain story', 'villain walk', 'board b5'],
  kind: 'Method',
  scope: 'c1',
  context: 'Component 1 · Tool 3 · The Break · Part B',
  def: 'Imagine everything going wrong. Walk someone very unlike the ideal user through your ideal flow, one step at a time. At each step, pick the failure card most likely to happen to them, and write what broke, what they did instead, how likely it is out of 10, and who pays.',
  href: `${C1}the-break/`,
  see: ['villain-persona', 'failure-cards', 'blame-scale'],
});
add({
  id: 'sticky-note-colours',
  term: 'Sticky note colours',
  aka: ['orange notes', 'orange', 'yellow', 'teal', 'three colours', 'sticky notes'],
  kind: 'Term',
  scope: 'c1',
  context: 'Component 1 · every tool',
  def: 'Orange: the story you’re reading. Yellow: what you found. Teal: what you think.',
  href: C1,
  see: ['yellow-notes', 'teal-notes'],
});
add({
  id: 'carried-line',
  term: 'Carried line',
  aka: ['line to carry forward', 'one line to carry to synthesis', 'carried lines', 'carry forward'],
  kind: 'Term',
  scope: 'c1',
  context: 'Component 1 · end of each tool',
  def: 'At the bottom of each tool, write one line to carry forward. Synthesis uses those lines, so you never have to reread.',
  href: C1,
  see: ['existing-products-synthesis', 'design-claim'],
});
add({
  id: 'design-claim',
  term: 'Design claim',
  aka: ['the claim sentence', 'we should redesign'],
  kind: 'Term',
  scope: 'c1',
  context: 'Component 1 · Synthesis',
  def: `“${'We should redesign ___, because it would shift blame from ___ to ___, and would specifically help ___.'}” Every blank should point to something you already wrote.`,
  href: `${C1}#claim`,
  see: ['existing-products-synthesis', 'carried-line'],
});
add({
  id: 'blame-scale',
  term: 'Blame Scale',
  aka: ['blame tokens', 'blame strip'],
  kind: 'Card',
  scope: 'c1',
  context: 'Component 1 · card kit, boards B5 and B7',
  def: 'A strip on the card-kit boards for where the blame lands. In The Break, star the likeliest break and place blame tokens 1, 2 and ★ on it. In Synthesis, place redesign cards A, B and C on it: which one moves the blame furthest toward the system?',
  href: '/card-kit/#b5',
  see: ['villain-story', 'existing-products-synthesis'],
});
add({
  id: 'failure-cards',
  term: 'Failure cards',
  aka: ['failure card', 'the five failure cards'],
  kind: 'Card',
  scope: 'c1',
  context: 'Component 1 · Tool 3 · The Break',
  def: 'What goes wrong at a step of the Villain Story. At each step, pick the failure card most likely to happen to your villain persona.',
  list: ['System failure', 'Person unavailable', 'Object missing', 'Information gap', 'No time', 'Another failure'],
  href: `${C1}the-break/`,
  see: ['villain-story', 'system-failure', 'person-unavailable', 'object-missing', 'information-gap', 'no-time'],
});
add({
  id: 'need-dots',
  term: 'Dots on the ideal flow',
  aka: ['dot', 'dots', 'count the dots'],
  kind: 'Term',
  scope: 'c1',
  context: 'Component 1 · Tool 3 · The Break · Part A',
  def: 'Put a dot on every need the product leaves the user to sort out alone. Count them, out of the total.',
  href: `${C1}the-break/`,
  see: ['ideal-flow', 'four-needs'],
});
add({
  id: 'power-lenses',
  term: 'Power lenses',
  aka: ['creator lens', 'authority lens', 'political lens', 'lens cards', 'three lenses power'],
  kind: 'Card',
  scope: 'c1',
  context: 'Component 1 · Tool 4 · Power (card kit, sheet S7)',
  def: 'Three ways to read power in the card kit: the creator, authority and political lenses. Read the product through each lens card and answer on teal notes.',
  href: '/card-kit/#s7',
  see: ['existing-products-power', 'finding-ratings'],
});
add({
  id: 'finding-ratings',
  term: 'Minor, major, critical',
  aka: ['rating', 'rate findings', 'finding rating', 'severity'],
  kind: 'Term',
  scope: 'c1',
  context: 'Component 1 · Tool 4 · Power',
  def: 'How each finding is rated in Power: write each one, then rate it minor, major or critical. With the card kit, place each finding card under one of the three.',
  href: `${C1}power/`,
  see: ['findings'],
});
for (const s of [
  { term: 'The sharpest contradiction', def: '“The product claims ___, but ___ revealed ___.”' },
  { term: 'Three possible redesigns', def: 'Specific screens or steps. “The one that takes the most blame off the user is ___, because ___.”' },
  { term: 'The power test', def: '“If this were built, ___ would gain ___. ___ would resist it, because ___.”' },
  { term: 'The finding', def: '“This product assumes ___, but the user actually has ___, which causes ___.”' },
]) {
  add({ term: s.term, kind: 'Step', scope: 'c1', context: 'Component 1 · Synthesis', def: s.def, href: `${C1}synthesis/`, see: ['existing-products-synthesis'] });
}
add({
  id: 'two-ways-to-work',
  term: 'The paper way and the card way',
  aka: ['paper way', 'card way', 'two ways to work'],
  kind: 'Term',
  scope: 'c1',
  context: 'Component 1',
  def: 'The paper way: print the blank template for each tool, or copy it onto a big sheet, and write everything on sticky notes. Best for working alone or in pairs, a first try, little time. The card way: lay a big board on the table; printed cards hold the categories and questions. Best for teams of 3–5, workshops and sessions with participants. The questions are the same either way, and so is what you end up with.',
  href: `${C1}#ways`,
  see: ['card-kit'],
});
add({
  id: 'figma-file',
  term: 'The Figma file (Component 1)',
  aka: ['figma', '.fig', 'fig file', 'figma file', 'final designs'],
  kind: 'Card',
  scope: 'c1',
  context: 'Component 1 · Reading Existing Products',
  def: `${figmaFile.lead} ${figmaFile.howTo.slice(0, 2).join(' ')}`,
  list: figmaFile.pages.map((p) => p.name),
  href: `${C1}#figma`,
  see: ['card-kit', 'two-ways-to-work'],
});
add({
  id: 'not-a-usability-audit',
  term: 'Not a usability audit',
  aka: ['usability audit'],
  kind: 'Term',
  scope: 'c1',
  context: 'Component 1 · Reading Existing Products',
  def: 'Reading Existing Products is not a usability audit. It’s a reading of whose assumptions are built into a product, and who pays when they’re wrong.',
  href: C1,
});

// Card sheets and boards (derived)
for (const s of sheets) {
  add({
    id: s.id.toLowerCase(),
    term: `${s.id} · ${s.name}`,
    aka: [s.id, s.name, `sheet ${s.id}`],
    kind: 'Card',
    scope: 'c1',
    context: `Card kit · ${s.tools} · ${s.page}`,
    def: s.blurb,
    facts: [{ k: 'Print', v: `A4 card${s.copies > 1 ? `, ${s.copies} copies` : ''}` }],
    href: `/card-kit/#${s.id.toLowerCase()}`,
    see: ['card-kit'],
  });
}
for (const b of boards) {
  add({
    id: b.id.toLowerCase(),
    term: `${b.id} · ${b.name}`,
    aka: [b.id, `board ${b.id}`],
    kind: 'Card',
    scope: 'c1',
    context: `Card kit · ${b.tool} · ${b.page}`,
    def: `The board for ${b.tool}. Cards used on it: ${b.cards.join(', ')}.`,
    facts: [{ k: 'Print', v: 'A2, landscape. A3 works for pairs.' }],
    href: `/card-kit/#${b.id.toLowerCase()}`,
    see: ['card-kit'],
  });
}

// ---------------------------------------------------------------------------------------------
// Component 2 · Reading Visual Culture

const C2 = '/components/visual-culture/';
add({
  id: 'visual-culture',
  term: 'Visual culture',
  aka: ['what is visual culture'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Reading Visual Culture',
  def: c2.definition,
  facts: [
    { k: 'Not', v: 'Aesthetics, graphic design, colours, symbols or what looks “Indian”.' },
    { k: 'But', v: 'The ways people learn to read the world around them.' },
    { k: 'The images', v: c2.images },
  ],
  href: `${C2}#meaning`,
  see: ['component-visual-culture', 'context-scenario'],
});
extend('context-scenario', {
  def: `${make.is} ${make.not}`,
  facts: [
    { k: 'In short', v: 'A situation, not a persona. Who, where, when, what conditions.' },
    { k: 'Persona vs scenario', v: `${c2.persona.persona} A Context Scenario ${c2.persona.scenarioBody.replace(/^Asks/, 'asks')}` },
    { k: 'Example', v: make.example },
  ],
  list: make.asks,
  href: `${C2}#scenario`,
  see: ['nine-boxes', 'persona'],
});
add({
  id: 'evidence-status',
  term: 'Evidence status',
  aka: ['evidence tags', 'evidence tag', 'every claim carries an evidence status'],
  kind: 'Tag',
  scope: 'c2',
  context: 'Component 2 · every claim',
  def: `${c2.evidence.title}: Observed, Reported, Inferred or Hypothesised. ${c2.evidence.rule}`,
  facts: [{ k: 'Stop', v: c2.evidence.stop }],
  href: `${C2}#evidence`,
  see: ['observed', 'reported', 'inferred', 'hypothesised', 'stop-rule'],
});
for (const s of c2.evidence.statuses) {
  add({
    id: slug(s.name),
    term: s.name,
    kind: 'Tag',
    scope: 'c2',
    context: 'Component 2 · evidence status',
    def: s.def,
    href: `${C2}#evidence`,
    see: ['evidence-status'],
  });
}
add({
  id: 'evidence-not-explanation',
  term: 'Start with evidence, not explanation',
  aka: ['evidence not explanation', 'evidence vs interpretation'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · the rule that matters most',
  def: 'The easiest mistake in contextual research is to see something and immediately explain it. “The student asks their senior” is evidence. “The student asks their senior because first-generation students depend on informal networks” is an interpretation. The toolkit keeps them apart.',
  facts: [{ k: 'Next question', v: 'What would I need to see or hear before I could make a stronger claim?' }],
  href: `${C2}#evidence`,
  see: ['evidence-status'],
});
add({
  id: 'method-flow',
  term: 'The method flow',
  aka: ['capture affinity build verify scenario', 'five steps', 'method', 'affinity', 'capture', 'verify'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · the FigJam template',
  def: 'Five steps: Capture, Affinity, Build, Verify, Scenario. On this site they happen in the four tools.',
  list: method.map((m) => `${m.n} · ${m.name}: ${m.body} (${m.where})`),
  facts: [
    { k: 'Students', v: howToUse.student },
    { k: 'The designer', v: howToUse.designer },
  ],
  href: `${C2}#route`,
  see: ['the-six-missions', 'edge-case-check', 'context-scenario'],
});
add({
  id: 'the-six-missions',
  term: 'The six missions',
  aka: ['photo missions', 'missions', 'mission cards', 'capture cards'],
  kind: 'Method',
  scope: 'c2',
  context: 'Component 2 · Tool 1 · Show',
  def: 'Six photo briefs for participants to photograph their own world for a week: never the task itself, but what surrounds it. They are suggestions, not requirements. If you want the photographs to emerge with as little direction as possible, do not use them. Never show example photos first.',
  list: missions.map((m) => `${m.n} · ${m.title}. ${m.body} Ask: ${m.ask}`),
  facts: [{ k: 'Every photo', v: promptsLine }],
  href: `${C2}show/#missions`,
  see: ['mission', 'three-questions', 'capture-rule'],
});
add({
  id: 'capture-stage',
  term: 'The capture stage',
  aka: ['capture stage', 'photo slip', 'the image'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Tool 1 · Show',
  def: `${captureStage.lead}: ${captureStage.items.join(', ')} ${captureStage.note}`,
  facts: [{ k: showOutput.title, v: `${showOutput.body} ${showOutput.ready}` }],
  href: `${C2}show/`,
  see: ['three-questions', 'the-six-missions'],
});
add({
  id: 'talk-back',
  term: 'Talk-back',
  aka: ['talkback', 'photo talk-back', 'talk back'],
  kind: 'Step',
  scope: 'c2',
  context: 'Component 2 · Tool 1 · Show',
  def: 'After the week of photos, sit with each participant and ask the three questions about every photo, so you never have to guess what an image means. Write their answers in their words, any language, and tag each Observed or Reported.',
  facts: [{ k: 'Time', v: '45 min' }],
  href: `${C2}show/`,
  see: ['three-questions', 'capture-stage', 'own-words'],
});
add({
  id: 'cluster',
  term: 'Cluster',
  aka: ['clusters', 'clustering'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Tool 2 · Read',
  def: 'A group of photos that show the same action or moment. Group first, name second, and name it by what people are doing: “Seniors” is not a cluster; “asking before submitting” is.',
  list: ['Asking', 'Checking', 'Waiting', 'Converting', 'Forwarding', 'Translating', 'Cross-checking', 'Getting help', 'Working around'],
  href: `${C2}read/`,
  see: ['pass-1', 'nine-structures'],
});
add({
  id: 'nine-structures',
  term: 'The nine structures',
  aka: ['structures', 'nine questions'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Tool 2 · Read',
  def: 'Nine questions to test a cluster against. Test for them; never assume them. Use them as questions against a cluster, not as categories to sort images into.',
  list: structures.map((s) => `${s.name}: ${s.ask}`),
  href: `${C2}read/`,
  see: ['structure', 'cluster'],
});
for (const s of structures) {
  add({
    id: `structure-${slug(s.name)}`,
    term: `${s.name} (structure)`,
    aka: [`${s.name} structure`],
    kind: 'Term',
    scope: 'c2',
    context: 'Component 2 · Tool 2 · Read · one of the nine structures',
    def: `Ask of a cluster: ${s.ask}`,
    href: `${C2}read/`,
    see: ['nine-structures'],
  });
}
add({
  id: 'nine-boxes',
  term: 'The nine boxes',
  aka: ['scenario boxes', 'context scenario boxes'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Tool 3 · Build',
  def: 'The nine boxes of a Context Scenario, each answered only from the photos, the talk-backs and repeated patterns. Leave unknowns as “unknown”.',
  list: [
    'The moment',
    'The world around them',
    'The information journey',
    'The visual cue',
    'The people around them',
    'What they already know',
    'The hidden work',
    'The condition',
    'The consequence',
  ],
  href: `${C2}build/`,
  see: ['context-scenario'],
});
for (const b of [
  { term: 'The information journey', def: 'Where does information come from, and where does it go next? Draw source → source → person → action.', aka: ['information journey'] },
  { term: 'The visual cue', def: 'What tells the person what to notice, trust, ignore or act on? What looks official, familiar, urgent or important?', aka: ['visual cue', 'visual cues'] },
  { term: 'The consequence', def: 'What breaks if one condition goes? Remove one condition. What breaks, changes or has to be repaired? Record only what the evidence supports.', aka: ['consequence'] },
  { term: 'The visual reading', def: 'What has this person learned to notice, trust, ignore, interpret or act upon, and under what conditions?', aka: ['visual reading'] },
]) {
  add({ term: b.term, aka: b.aka, kind: 'Term', scope: 'c2', context: 'Component 2 · Tool 3 · Build', def: b.def, href: `${C2}build/`, see: ['nine-boxes'] });
}
add({
  id: 'twelve-lines',
  term: 'The twelve lines of a Context Profile',
  aka: ['twelve lines', 'profile lines'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Tool 4 · Hand off',
  def: 'Start with “When this person is in this situation…” and fill each line from evidence only.',
  list: ['Trying to', 'Depends on', 'Already knows', 'Doesn’t know yet', 'Asks', 'Converts', 'Checks', 'Works around', 'Risks', 'Does instead', 'Has access to', 'Almost called “extra”'],
  href: `${C2}hand-off/`,
  see: ['context-profile'],
});
add({
  id: 'traceable-statement',
  term: 'Traceable statement',
  aka: ['the reading in one sentence', 'the reading', 'one traceable sentence'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Tool 4 · Hand off',
  def: 'We observed ___ in ___ conditions. This matters because ___. The existing product currently ___. This makes us investigate ___. Every blank points to a photo or a quote.',
  href: `${C2}hand-off/`,
  see: ['context-profile', 'hand-offs'],
});
add({
  id: 'hand-offs',
  term: 'The five hand-offs',
  aka: ['hand-offs', 'handoffs', 'where it goes next'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Tool 4 · Hand off',
  def: 'Where a Context Scenario goes next, each with the question it asks.',
  list: c2.handOffs.map((h) => `${h.to}: ${h.ask}`),
  href: `${C2}#next`,
  see: ['visual-culture-hand-off'],
});
add({
  id: 'participant-autonomy',
  term: 'More open or more directed prompts',
  aka: ['participant autonomy', 'open capture', 'directed capture', 'prompts as research instruments'],
  kind: 'Term',
  scope: 'c2',
  context: 'Component 2 · Before you start',
  def: 'You can give participants suggested things to photograph, or leave the task deliberately open. More open: “Show us things around you that are important to how you complete this task.” More directed: “Show us where you go when you don’t know what to do.” Neither is automatically better; the toolkit treats prompts as research instruments, not instructions.',
  href: `${C2}before-you-start/`,
  see: ['the-six-missions'],
});
add({
  id: 'figjam-template',
  term: 'The FigJam template',
  aka: ['figjam', '.jam', 'jam file', 'visual toolkit board', 'figjam board', 'capture cards'],
  kind: 'Card',
  scope: 'c2',
  context: 'Component 2 · the main file',
  def: `${figjam.lead} ${figjam.howTo[0]}`,
  list: figjam.sections.map((f) => `${f.name}: ${f.what}`),
  facts: [{ k: 'Differs from the booklet', v: figjam.differs.join(' ') }],
  href: `${C2}#template`,
  see: ['the-six-missions', 'method-flow', 'context-profile', 'cluster'],
});

// ---------------------------------------------------------------------------------------------
// Component 3 · Reading Language

const C3 = '/components/language/';
add({
  id: 'thick-translation',
  term: 'Thick translation',
  aka: ['thick translate', 'part a translate'],
  kind: 'Method',
  scope: 'c3',
  context: 'Component 3 · Tool 2 · Translate · Part A',
  def: `${c3.thick.title} ${c3.thick.body} Write the phrase as it was said, then its literal meaning, its meaning in context, alternatives and what it implies. A local collaborator reviews it.`,
  facts: [
    {
      k: 'Where the term comes from',
      v: 'The philosopher Kwame Anthony Appiah’s essay “Thick Translation” (1993): translation that uses notes and glosses to place words in their cultural and linguistic context. It echoes Clifford Geertz’s “thick description”.',
    },
  ],
  href: `${C3}translate/`,
  see: ['reverse-thick-translation', 'literal-meaning', 'implied-meaning', 'thick-description'],
  source: { label: 'Wikipedia: Kwame Anthony Appiah', href: 'https://en.wikipedia.org/wiki/Kwame_Anthony_Appiah' },
});
extend('reverse-thick-translation', {
  aka: ['rtt', 'reverse translation', 'back translation', 'part b translate', 'check both ways'],
  def: `${rtt.line} ${rtt.why.join(' ')}`,
  list: rtt.survey,
  href: `${C3}translate/#reverse`,
  see: ['thick-translation', 'three-directions', 'support-check', 'small-signals', 'rtt-outcomes', 'survey-sheet'],
});
for (const d of rtt.directions) {
  add({
    id: `direction-${d.n}`,
    term: `Direction ${d.n} · ${d.title}`,
    aka: [`direction ${d.n}`],
    kind: 'Step',
    scope: 'c3',
    context: 'Component 3 · Reverse thick translation',
    def: d.script,
    facts: [{ k: 'Shows', v: d.shows }],
    href: `${C3}translate/#reverse`,
    see: ['three-directions', 'reverse-thick-translation'],
  });
}
add({
  id: 'rtt-outcomes',
  term: 'Supported, Split, Not yet',
  aka: ['supported', 'split', 'not yet', 'three outcomes', 'outcome'],
  kind: 'Tag',
  scope: 'c3',
  context: 'Component 3 · Reverse thick translation · reading the tally',
  def: 'The three outcomes after the survey and the support check.',
  list: rtt.reading.map((r) => `${r.title}: ${r.body}`),
  href: `${C3}translate/#reverse`,
  see: ['support-check', 'expression-library'],
});
extend('support-check', {
  def: 'Four things that must be true before you store a meaning: source language, who interpreted, rendering, and more than one source. All four are needed; otherwise loop back to Part A.',
  see: ['fidelity-protocol', 'source-language', 'who-interpreted', 'rendering-type', 'single-source-flag'],
});
add({
  id: 'survey-sheet',
  term: 'Survey sheet',
  aka: ['survey', 'the survey', 'one sheet per person'],
  kind: 'Card',
  scope: 'c3',
  context: 'Component 3 · Tool 2 · Translate · Part B (p.3.12)',
  def: 'One sheet per person in the reverse thick translation survey, read aloud when needed: languages spoken at home, district or region, a code (no names), age band and consent; then the three directions, how they would sound, small signals, and a researcher note on who else was present.',
  href: `${C3}translate/#part-survey`,
  see: ['reverse-thick-translation', 'tally'],
});
add({
  id: 'tally',
  term: 'Tally',
  aka: ['tally sheet', 'rtt tally', 'reverse thick translation tally'],
  kind: 'Card',
  scope: 'c3',
  context: 'Component 3 · Tool 2 · Translate · Part B (p.3.13)',
  def: 'Count, for each direction, how many people read the implied meaning, only the literal meaning, or something else; note what shifted and the small signals across all sheets; then run the support check.',
  href: `${C3}translate/#reverse`,
  see: ['survey-sheet', 'rtt-outcomes'],
});
add({
  id: 'glossary-entry',
  term: 'Glossary entry',
  aka: ['glossary', 'provisional glossary', 'literal and implied'],
  kind: 'Term',
  scope: 'c3',
  context: 'Component 3 · what comes out of Translate',
  def: rtt.glossary.body,
  facts: [
    { k: 'End product', v: c3.endProduct },
    { k: 'Provisional glossary', v: 'Started in Before you start with three columns: word or phrase as heard, might mean, can’t know yet. It changes after Tool 2.' },
  ],
  href: `${C3}translate/#reverse`,
  see: ['literal-meaning', 'implied-meaning'],
});
add({
  id: 'language-before-you-start',
  term: 'Before you start (Language)',
  aka: ['understand the context first', 'once per place'],
  kind: 'Step',
  scope: 'c3',
  context: 'Component 3 · before Tool 1',
  def: c3Before.intro,
  list: c3Before.steps.map((s) => `${s.title}. ${s.body}`),
  facts: [{ k: c3Before.gate.title, v: c3Before.gate.body }],
  href: `${C3}before-you-start/`,
  see: ['positionality-note', 'provisional-codebook'],
});
add({
  id: 'positionality-note',
  term: 'Positionality note',
  aka: ['positionality card', 'researcher positionality card', 'positionality statement'],
  kind: 'Card',
  scope: 'c3',
  context: 'Component 3 · Before you start · Step 5',
  def: 'Your language, your background, what you might mishear. Written before fieldwork and revisited at the end.',
  list: kit.positionality.prompts,
  facts: [{ k: 'At the end of fieldwork', v: kit.positionality.backPrompt }],
  href: `${C3}before-you-start/#positionality`,
  see: ['positionality', 'position'],
});
add({
  id: 'provisional-codebook',
  term: 'Provisional codebook, glossary and interview guide',
  aka: ['codebook', 'interview guide', 'provisional'],
  kind: 'Term',
  scope: 'c3',
  context: 'Component 3 · Before you start · Step 6',
  def: 'Built before the interviews from what you noticed while spending time in the place. Provisional means it will change after Tool 2.',
  href: `${C3}before-you-start/#glossary`,
  see: ['glossary-entry'],
});
for (const p of c3Before.team.people) {
  add({
    term: p.name.replace(/^A /, '').replace(/^./, (x) => x.toUpperCase()),
    aka: [p.name, ...(p.name.includes('collaborator') ? ['collaborator', 'language collaborator', 'interpreter'] : [])],
    kind: 'Role',
    scope: 'c3',
    context: 'Component 3 · who you need',
    def: p.body,
    href: `${C3}before-you-start/`,
  });
}
for (const d of kit.decks) {
  add({
    term: d.name,
    aka: [d.name.replace(/s$/, '')],
    kind: 'Card',
    scope: 'c3',
    context: 'Component 3 · the Physical Field Kit',
    def: d.purpose ?? '',
    list: d.cards.map((c: { title: string }) => c.title),
    href: `${C3}physical-field-kit/#${d.id}-cards`,
    see: ['physical-field-kit'],
  });
}
add({
  id: 'cue-cards',
  term: 'The six cue cards',
  aka: ['cue cards', 'prime', 'six cue cards'],
  kind: 'Card',
  scope: 'c3',
  context: 'Component 3 · Tool 1 · Listen · Part A (p.3.05)',
  def: 'Read once before the session and keep beside you. Each has what to notice and a question to ask yourself. During the session, don’t interpret: mark what you notice with a symbol from the log.',
  list: ['Body and posture', 'Pause and silence', 'Language switching', 'Social dynamics', 'Voice and tone', 'Objects and environment'],
  href: `${C3}listen/`,
  see: ['cue', 'log', 'log-symbols'],
});
add({
  id: 'log-symbols',
  term: 'Log symbols',
  aka: ['symbols', 'quick log'],
  kind: 'Term',
  scope: 'c3',
  context: 'Component 3 · Tool 1 · Listen',
  def: 'The symbols used to mark cues during an interview, with three words and what triggered it. No meaning during the interview.',
  list: ['Body', 'Pause', 'Switch', 'Gaze', 'Object', 'Voice', 'Deflect', 'Avoided'],
  href: `${C3}listen/`,
  see: ['log', 'cue-cards'],
});
extend('meaning-card', {
  aka: ['meaning cards', 'said observed inferred'],
  facts: [{ k: 'One per moment', v: 'Said (in their language), observed, inferred, what did that moment mean to you, and their correction or disagreement.' }],
});
add({
  id: 'relay-sheet',
  term: 'Relay sheet',
  aka: ['relay', 'survived shifted added'],
  kind: 'Card',
  scope: 'c3',
  context: 'Component 3 · Tool 5 · The Kahavat Relay (p.3.22)',
  def: 'An idiom card and topic, three rounds each with a code, what that person sees, a space to draw and one line in their own language, then survived, shifted, added, and a design question. Fold the sheet so the next person sees only the last drawing.',
  href: `${C3}kahavat-relay/`,
  see: ['kahavat', 'idiom-cards', 'chain'],
});
add({
  id: 'idiom-cards',
  term: 'Idiom cards',
  aka: ['idiom card'],
  kind: 'Card',
  scope: 'c3',
  context: 'Component 3 · Tool 5 · The Kahavat Relay (p.3.23)',
  def: 'Six Hindi idioms, each in Devanagari and Latin script, with what it literally says, what it usually means and “When has this happened to you?”, plus three blanks for idioms from your participants’ own language. Check each meaning with your language collaborator.',
  href: `${C3}kahavat-relay/`,
  see: ['kahavat', 'relay-sheet'],
});
extend('kahavat', { aka: ['कहावत', 'kahavaten', 'idiom', 'proverb', 'spoken idiom'], see: ['idiom'] });
add({
  id: 'language-system',
  term: 'Language system',
  aka: ['design system for words'],
  kind: 'Term',
  scope: 'c3',
  context: 'Component 3 · Tool 4 · Library',
  def: 'Together the Expression Library and the Design Language Library are the start of a language system: like a design system, but for words. Group tested entries by moment (errors, waiting, success) and by voice (how formal, how warm), like components in a design system.',
  href: `${C3}library/`,
  see: ['expression-library', 'design-language-library'],
});
add({
  id: 'library-flags',
  term: 'Sample and sensitive (library flags)',
  aka: ['sample', 'sample entry', 'sensitive', 'sensitive entry', 'illustrative'],
  kind: 'Tag',
  scope: 'c3',
  context: 'Component 3 · the two libraries',
  def: 'Library entries marked sample are illustrative, not real participant data. Entries marked sensitive touch on personal circumstances and are not shown publicly.',
  href: `${C3}expression-library/`,
  see: ['expression-library', 'de-identified'],
});
add({
  id: 'library-ids',
  term: 'EX- and DL- numbers',
  aka: ['ex-', 'dl-', 'entry id', 'ex number', 'dl number', 'citation', 'cites'],
  kind: 'Term',
  scope: 'c3',
  context: 'Component 3 · the two libraries',
  def: 'Expression Library entries are numbered EX-…, Design Language Library entries DL-…. Every Design Language entry cites at least one Expression entry that justifies it.',
  href: `${C3}design-language-library/`,
  see: ['expression-library', 'design-language-library'],
});
add({
  id: 'meaning-funnel',
  term: 'The funnel',
  aka: ['decision point', 'not every meaning card'],
  kind: 'Term',
  scope: 'c3',
  context: 'Component 3 · Reading Language',
  def: c3.funnel,
  href: C3,
});

// Fidelity Protocol tags (derived from the checker's own values)
const FP = `${C3}fidelity-protocol/`;
add({
  id: 'fidelity-tags',
  term: 'Fidelity tags',
  aka: ['four tags', 'fidelity', 'full confidence', 'the rule'],
  kind: 'Tag',
  scope: 'c3',
  context: 'Component 3 · the Fidelity Protocol',
  def: 'Four tags on every finding: source language, who interpreted, rendering type, and the single-source flag. A finding missing any of the four tags cannot carry full confidence until it is re-checked.',
  href: FP,
  see: ['fidelity-protocol', 'support-check'],
});
add({
  id: 'source-language',
  term: 'Source language',
  aka: ['source language tag'],
  kind: 'Tag',
  scope: 'c3',
  context: 'Component 3 · Fidelity tag 1',
  def: 'What language was actually spoken? Record the actual language, and any code-switching, rather than collapsing it to “English”.',
  facts: [{ k: 'Example', v: 'Hindi–English (code-switched)' }],
  href: FP,
  see: ['fidelity-tags', 'code-switching'],
});
add({
  id: 'who-interpreted',
  term: 'Who interpreted',
  aka: ['interpreter', 'interpreter tag'],
  kind: 'Tag',
  scope: 'c3',
  context: 'Component 3 · Fidelity tag 2',
  def: 'Whose reading is this? Name who rendered the moment into the working language. Different interpreters shape meaning differently.',
  list: Object.values(INTERPRETERS),
  href: FP,
  see: ['fidelity-tags'],
});
add({
  id: 'rendering-type',
  term: 'Rendering type',
  aka: ['rendering', 'verbatim', 'gloss', 'conceptual gloss', 'paraphrase'],
  kind: 'Tag',
  scope: 'c3',
  context: 'Component 3 · Fidelity tag 3',
  def: 'How closely does the written version follow the spoken one? A paraphrase should never be quoted as if it were what the person said.',
  list: Object.values(RENDERINGS),
  href: FP,
  see: ['fidelity-tags'],
});
add({
  id: 'single-source-flag',
  term: 'Single-source flag',
  aka: ['single source', 'second reader', 'more than one source', 'single-source'],
  kind: 'Tag',
  scope: 'c3',
  context: 'Component 3 · Fidelity tag 4',
  def: 'Has a second interpreter read the moment the same way, or does it rest on one person alone? One person’s read, however fluent, is still one person’s read.',
  href: FP,
  see: ['fidelity-tags', 'second-independent-reader'],
});
extend('lens-n-new', {
  aka: ['lens n', 'new', 'n lens', 'nomenclature', 'new lens'],
  facts: [{ k: 'Asks', v: 'Would someone who has never filled in this exact form before understand the wording without asking anyone?' }],
  href: `${C3}language-lens-audit/#lens-n`,
  see: ['language-lens-audit'],
});
extend('lens-p-proxy', {
  aka: ['lens p', 'proxy', 'p lens', 'proxy lens', 'read aloud'],
  facts: [{ k: 'Asks', v: 'Does the wording still work when it is read aloud and operated by a CSC operator or a family member, not only by the named applicant?' }],
  href: `${C3}language-lens-audit/#lens-p`,
  see: ['language-lens-audit', 'common-service-centre'],
});
extend('lens-t-trust', {
  aka: ['lens t', 'trust', 't lens', 'trust lens', 'scam'],
  facts: [{ k: 'Asks', v: 'Does the wording read as legitimately official to someone primed to be suspicious, or does it pattern-match a scam?' }],
  href: `${C3}language-lens-audit/#lens-t`,
  see: ['language-lens-audit'],
});
extend('this-audience', { aka: ['named segment', 'audience', 'segment'], see: ['india-1-2-3'] });

// ---------------------------------------------------------------------------------------------
// Component 4 · Reading Material Reality

const C4 = '/components/material-reality/';
add({
  id: 'material-reality',
  term: 'Material reality',
  aka: ['material conditions'],
  kind: 'Term',
  scope: 'c4',
  context: 'Component 4 · Reading Material Reality',
  def: c4.ideaLead,
  facts: [
    { k: 'A “simple” upload actually needed', v: c4.simpleUpload.items.join(', ') },
    { k: 'Look past', v: `“${c4.lookPast.from}” to “${c4.lookPast.to}”` },
  ],
  href: `${C4}#idea`,
  see: ['nine-layers'],
});
add({
  id: 'nine-layers',
  term: 'The nine layers',
  aka: ['layers', 'nine layers around the screen'],
  kind: 'Term',
  scope: 'c4',
  context: 'Component 4 · what to look for',
  def: 'Nine layers around the screen that a task quietly depends on.',
  list: c4.layers.map((l) => `${l.name}: ${l.blurb}`),
  href: `${C4}#layers`,
});
for (const l of c4.layers) {
  add({
    id: `layer-${slug(l.name)}`,
    term: `${l.name} (layer)`,
    aka: [`${l.name} layer`],
    kind: 'Term',
    scope: 'c4',
    context: 'Component 4 · one of the nine layers',
    def: l.blurb,
    href: `${C4}#layers`,
    see: ['nine-layers'],
  });
}
add({
  id: 'quick-and-deep',
  term: 'Quick and deep routes',
  aka: ['quick route', 'deep route', 'three-line brief'],
  kind: 'Term',
  scope: 'c4',
  context: 'Component 4 · the route',
  def: `${c4.routes.quick.title}: ${c4.routes.quick.body}. ${c4.routes.deep.title}: ${c4.routes.deep.body}.`,
  href: `${C4}#route`,
});
add({
  id: 'journey-strip',
  term: 'Journey Strip',
  aka: ['journey', 'map the journey'],
  kind: 'Card',
  scope: 'c4',
  context: 'Component 4 · Before you start (p.4.04)',
  def: 'For each step of the task, write where they are and what or who they use. Nothing else. Every item in the bottom row becomes something you place on the Loop in Tool 1. Already have a journey map or service blueprint? Use it.',
  href: `${C4}before-you-start/`,
  see: ['journey-map', 'service-blueprint', 'loop'],
});
add({
  id: 'visual-toolkit',
  term: 'Visual Toolkit',
  aka: ['visual toolkit photos', 'lens tags'],
  kind: 'Term',
  scope: 'c4',
  context: 'Component 4 · Before you start (p.4.05)',
  def: 'Component 2 · Reading Visual Culture: its FigJam board is called “Visual Toolkit”. Component 4 builds on what it produces: the participants’ photos with their own accounts, each tagged Observed or Reported, and the clusters from Read. Sort each photo as person ●, thing ■ or place ▲, note how easy it is to reach, print them small and bring them to the Loop. No photos yet? Ask the person to walk you through the task and sketch what they point to.',
  href: `${C4}before-you-start/`,
  see: ['component-visual-culture', 'figjam-template', 'loop'],
});
add({
  id: 'rings',
  term: 'Rings of the Loop',
  aka: ['rings', 'in hand', 'where they live', 'a trip away', 'through someone'],
  kind: 'Term',
  scope: 'c4',
  context: 'Component 4 · Tool 1 · Build · Part A',
  def: 'How easy something is to reach, from the centre out: in hand, where they live, a trip away, through someone. The easier it is to get to, the closer it sits.',
  href: `${C4}build/`,
  see: ['loop', 'token'],
});
add({
  id: 'access-ladder',
  term: 'The Access Ladder',
  aka: ['access ladder', 'seven questions', 'exists reachable affordable sustainable theirs usable permitted'],
  kind: 'Method',
  scope: 'c4',
  context: 'Component 4 · Tool 1 · Build · Part B',
  def: 'Take the most important items from the Loop and ask seven yes/no questions about each, to find where it fails. Go down each column and mark ✕ at the first “no”. Every ✕ can be taken into Tool 2 · Break.',
  list: ['Exists', 'Reachable', 'Affordable', 'Sustainable', 'Theirs', 'Usable', 'Permitted'],
  facts: [{ k: 'Four priority corners', v: 'Focus first, push for change, design for next, keep an eye on. Start with one shaded corner.' }],
  href: `${C4}build/#part-b`,
  see: ['ladder', 'loop'],
});
add({
  id: 'play-it-live',
  term: 'Play it live',
  aka: ['chinese whispers game'],
  kind: 'Method',
  scope: 'c4',
  context: 'Component 4 · Tool 2 · Break',
  def: 'Line up 4–6 people, one per role. The first reads the notice aloud and whispers it on. Compare the last line with the first, then ask one player to step out.',
  href: `${C4}break/`,
  see: ['whisper', 'chinese-whispers'],
});
add({
  id: 'kinds-of-problem',
  term: 'Oversight, offload or constraint',
  aka: ['kind of problem', 'what kind of problem'],
  kind: 'Term',
  scope: 'c4',
  context: 'Component 4 · Tool 4 · Say',
  def: 'Decide what kind of problem your biggest break is. Oversight: nobody thought of it. Offload: someone chose to pass the cost on to the person (then answer the three ↳ questions). Constraint: the system doesn’t allow otherwise, yet.',
  href: `${C4}say/`,
  see: ['oversight', 'offload', 'constraint', 'brief-pad'],
});
add({
  id: 'brief-pad',
  term: 'The brief pad',
  aka: ['brief', 'one-page brief'],
  kind: 'Method',
  scope: 'c4',
  context: 'Component 4 · Tool 4 · Say',
  def: 'A fill-in-the-blanks brief: the product assumed, what existed was, so they, it cost them, this is (oversight, offload or constraint), the number it is true for, what to prototype next, and a one-line summary.',
  href: `${C4}say/`,
  see: ['kinds-of-problem', 'count-card'],
});
add({
  id: 'protected-last',
  term: 'Protected last',
  kind: 'Term',
  scope: 'c4',
  context: 'Component 4 · Tool 3 · Weigh',
  def: 'The other end of the card sort from “compromised first”: the needs the person would give up last.',
  href: `${C4}weigh/`,
  see: ['compromised-first', 'need-cards'],
});
add({
  id: 'ask-your-participants',
  term: 'Ask your participants',
  aka: ['field cards', 'consent statement', 'care rules'],
  kind: 'Card',
  scope: 'c4',
  context: 'Component 4 · field cards (p.4.22)',
  def: `${participants.lead} ${participants.consent.title}: ${participants.consent.text}`,
  list: participants.care,
  href: `${C4}ask-your-participants/`,
});

// ---------------------------------------------------------------------------------------------
// Claim & Reflection

const R = '/components/reflection/';
for (const f of refl.flow) {
  if (f.name === 'Summarise') continue;
  add({
    id: slug(f.name),
    term: f.name,
    kind: 'Step',
    scope: 'ink',
    context: `Claim & Reflection · Step ${f.n}`,
    def: f.ask,
    href: `${R}#flow`,
    see: ['component-reflection'],
  });
}
extend('position', { def: 'Where are you speaking from? Before each component: your device, your language at home, your city, and whether you have used this product, avoided it, or never needed it.', see: ['positionality-note'] });
extend('prediction', { def: 'What do you expect, and why? Before each component, predict what you expect to find, why, and what it could mean. Do not change the prediction until the component is complete.' });
extend('claim', { def: `What did the process actually give you? After each component, write one paragraph (the stanza), not a list: ${reflAfter.stanza.body}` });
extend('redaction', { def: `What survives your own bias check? ${reflAfter.redaction.body}` });
add({
  id: 'still-unknown',
  term: 'Still unknown',
  kind: 'Step',
  scope: 'ink',
  context: 'Claim & Reflection · After each component',
  def: reflAfter.unknown.body,
  href: `${R}#flow`,
});
add({
  id: 'before-after-pages',
  term: 'Before and After pages',
  aka: ['before page', 'after page', 'r1a', 'r1b', 'r·1a', 'reflect before', 'reflect after', 'page codes'],
  kind: 'Card',
  scope: 'ink',
  context: 'Claim & Reflection · in every component',
  def: `${refl.howTo.body} ${refl.onlyOne}`,
  facts: [{ k: 'Page codes', v: 'R·1A and R·1B for Component 1, up to R·4A and R·4B for Component 4; R·E1–E3 for the three Look back pages.' }],
  href: `${R}#where`,
});
for (const p of lookBack) {
  add({
    id: `look-back-${p.slug}`,
    term: p.title,
    aka: [p.short, p.code],
    kind: 'Step',
    scope: 'ink',
    context: `Claim & Reflection · ${p.sub}`,
    def:
      p.slug === 'summarise'
        ? `${p.opening.join(' ')} ${summarise.note.lead} ${summarise.note.body}`
        : p.slug === 'wheel'
          ? `${p.opening.join(' ')} ${wheel.how}`
          : `${p.opening.join(' ')} If you had skipped this whole process, what would you likely have missed? Name one way your approach could still land badly on someone. Then the pluriverse question.`,
    list:
      p.slug === 'summarise'
        ? [`${summarise.surprise.name}: ${summarise.surprise.ask}`, `${summarise.mundane.name}: ${summarise.mundane.ask}`, `${summarise.compass.name}: ${summarise.compass.lines.join(' / ')}`]
        : p.slug === 'wheel'
          ? wheel.rings.map((r) => `${r.name}: ${r.means}`)
          : [consequences.skipped.ask, consequences.again.ask, consequences.pluriverse.lead],
    href: `${R}${p.slug}/`,
  });
}
add({
  id: 'compass',
  term: 'Compass',
  kind: 'Step',
  scope: 'ink',
  context: 'Claim & Reflection · Look back: Summarise',
  def: summarise.compass.intro,
  list: summarise.compass.lines,
  href: `${R}summarise/`,
});
add({
  id: 'wheel-dimensions',
  term: 'Wheel dimensions',
  aka: ['dimensions', 'wedges'],
  kind: 'Term',
  scope: 'ink',
  context: 'Claim & Reflection · Look back: Wheel',
  def: `${wheel.how} ${wheel.question.ask} ${wheel.question.then}`,
  list: wheel.suggested,
  href: `${R}wheel/`,
});
add({
  id: 'pluriverse-question',
  term: 'Pluriverse (Look back)',
  aka: ['what disappears when there is only one world'],
  kind: 'Step',
  scope: 'ink',
  context: 'Claim & Reflection · Look back: Consequences',
  def: consequences.pluriverse.lead,
  list: consequences.pluriverse.asks,
  href: `${R}consequences/`,
  see: ['pluriverse'],
});

// ---------------------------------------------------------------------------------------------
// General terms: used by the toolkit, defined elsewhere. Plain definitions, and where to read more.

const G = (t: Omit<Term, 'kind' | 'scope' | 'context'> & { context?: string }) =>
  add({ ...t, kind: 'General', scope: 'general', context: t.context ?? 'General term' });

G({
  id: 'code-switching',
  term: 'Code-switching',
  aka: ['code switching', 'code-switched', 'language switching', 'switch'],
  def: 'Moving between two or more languages, or varieties of a language, within one conversation or even one sentence, as in Hindi–English speech.',
  href: `${C3}fidelity-protocol/`,
  see: ['source-language', 'hinglish'],
  source: { label: 'Wikipedia: Code-switching', href: 'https://en.wikipedia.org/wiki/Code-switching' },
});
G({
  id: 'hinglish',
  term: 'Hinglish',
  def: 'A mix of Hindi and English in speech or writing, often typed in Latin script.',
  see: ['code-switching'],
  source: { label: 'Wikipedia: Hinglish', href: 'https://en.wikipedia.org/wiki/Hinglish' },
});
G({
  id: 'devanagari',
  term: 'Devanagari',
  aka: ['देवनागरी', 'script'],
  def: 'The script used to write Hindi, Marathi, Nepali, Sanskrit and several other languages. The toolkit asks you to keep the original language and script.',
  source: { label: 'Wikipedia: Devanagari', href: 'https://en.wikipedia.org/wiki/Devanagari' },
});
G({
  id: 'common-service-centre',
  term: 'Common Service Centre (CSC)',
  aka: ['csc', 'csc operator', 'common service centres', 'e-seva'],
  def: 'Access points for government and other online services in India, many in villages and small towns, run by local operators. People without their own device or know-how often apply through a CSC operator, which is why Lens P asks whether wording still works when read aloud by one.',
  see: ['lens-p-proxy'],
  source: { label: 'Wikipedia: Common Service Centres', href: 'https://en.wikipedia.org/wiki/Common_Service_Centres' },
});
G({
  id: 'otp',
  term: 'OTP (one-time password)',
  aka: ['otp', 'one time password', 'one-time password'],
  def: 'A code that works for a single login or transaction, usually sent by SMS to a registered phone number. In the toolkit’s illustrative example, the OTP goes to Meera’s father’s phone.',
  see: ['meera'],
  source: { label: 'Wikipedia: One-time password', href: 'https://en.wikipedia.org/wiki/One-time_password' },
});
G({
  id: 'upi',
  term: 'UPI',
  aka: ['unified payments interface'],
  def: 'Unified Payments Interface: India’s system for instant bank-to-bank payments from a phone. The Language Lens Audit notes that being comfortable with WhatsApp or UPI is not the same as knowing a form’s own terms.',
  see: ['lens-n-new'],
  source: { label: 'Wikipedia: Unified Payments Interface', href: 'https://en.wikipedia.org/wiki/Unified_Payments_Interface' },
});
G({
  id: 'digilocker',
  term: 'DigiLocker',
  def: 'A Government of India app and website for keeping official documents, such as mark sheets and certificates, in digital form and sharing them with institutions. Named in the toolkit as an example of one real product to read.',
  see: ['pick-a-product'],
  source: { label: 'Wikipedia: DigiLocker', href: 'https://en.wikipedia.org/wiki/DigiLocker' },
});
G({
  id: 'national-scholarship-portal',
  term: 'National Scholarship Portal',
  aka: ['nsp', 'scholarship portal'],
  def: 'The Government of India’s website for applying to central and many state scholarship schemes. It is the toolkit’s running example; the filled examples about it are illustrative.',
  see: ['meera', 'pick-a-product'],
  source: { label: 'Wikipedia: National Scholarship Portal', href: 'https://en.wikipedia.org/wiki/National_Scholarship_Portal' },
});
G({
  id: 'cybercafe',
  term: 'Cybercafé',
  aka: ['cyber cafe', 'cybercafe', 'internet cafe', 'café'],
  def: 'A shop that offers computers, internet access and often printing, scanning and help with online forms, for a fee. In the toolkit’s illustrative example, the café owner converts Meera’s certificate into a PDF.',
  see: ['meera'],
  source: { label: 'Wikipedia: Internet café', href: 'https://en.wikipedia.org/wiki/Internet_caf%C3%A9' },
});
G({
  id: 'tier-2-3-towns',
  term: 'Tier-2 and Tier-3 towns',
  aka: ['tier 2', 'tier 3', 'tier-2', 'tier-3', 'tier two'],
  def: 'An informal way of ranking Indian cities by size and economic weight: tier 1 are the largest metros, tier 2 and tier 3 are smaller cities and towns. Component 2 was built for first-generation college students from Tier 2 and 3 towns.',
  see: ['first-generation'],
  source: { label: 'Wikipedia: Classification of Indian cities', href: 'https://en.wikipedia.org/wiki/Classification_of_Indian_cities' },
});
G({
  id: 'first-generation',
  term: 'First-generation college student',
  aka: ['first-gen', 'first generation', 'first in her family'],
  def: 'A student whose parents did not go to college: the first in their family to do so. The toolkit’s research, and Meera, are about first-generation students.',
  see: ['meera'],
});
G({
  id: 'india-1-2-3',
  term: 'India 1, India 2, India 3',
  aka: ['india 1', 'india 2', 'india 3'],
  def: 'A way of segmenting Indian consumers by income and spending, popularised by Blume Ventures’ Indus Valley reports: a small affluent India 1, a larger aspiring India 2, and the majority, India 3. The toolkit uses names like these only to make “this audience” a named segment, never a generic user.',
  see: ['this-audience'],
  source: { label: 'Blume Ventures, Indus Valley Report' },
});
G({
  id: 'persona',
  term: 'Persona',
  aka: ['user persona', 'personas'],
  def: 'A fictional but research-based description of a type of user, used to keep a design team focused on real needs. The toolkit uses one (Meera) for its examples, but warns against making a persona from a few photographs: Component 2 ends in a Context Scenario instead.',
  see: ['meera', 'context-scenario'],
  source: { label: 'Wikipedia: Persona (user experience)', href: 'https://en.wikipedia.org/wiki/Persona_(user_experience)' },
});
G({
  id: 'thick-description',
  term: 'Thick description',
  def: 'The anthropologist Clifford Geertz’s term (1973), borrowed from the philosopher Gilbert Ryle: describing a behaviour together with the context that gives it meaning, not only the behaviour itself.',
  see: ['thick-translation'],
  source: { label: 'Wikipedia: Thick description', href: 'https://en.wikipedia.org/wiki/Thick_description' },
});
G({
  id: 'journey-map',
  term: 'Journey map',
  aka: ['journey mapping', 'user journey', 'customer journey'],
  def: 'A picture of the steps a person goes through to reach a goal, often with what they do, think and feel at each step. Component 4 starts from one, or from the simpler Journey Strip.',
  see: ['journey-strip'],
  source: { label: 'NN/g: Journey mapping 101', href: 'https://www.nngroup.com/articles/journey-mapping-101/' },
});
G({
  id: 'service-blueprint',
  term: 'Service blueprint',
  def: 'A diagram of a service that shows what the person does alongside the front-stage and back-stage actions, people and systems that support each step.',
  see: ['journey-strip'],
  source: { label: 'NN/g: Service blueprints', href: 'https://www.nngroup.com/articles/service-blueprints-definition/' },
});
G({
  id: 'informed-consent',
  term: 'Informed consent',
  aka: ['consent'],
  def: 'Agreement to take part in research, given freely by someone who understands what will happen, what will be recorded, how it will be used, and that they can stop at any time. Every component asks for consent first.',
  see: ['ask-your-participants', 'language-before-you-start'],
  source: { label: 'Wikipedia: Informed consent', href: 'https://en.wikipedia.org/wiki/Informed_consent' },
});
G({
  id: 'de-identification',
  term: 'De-identification',
  aka: ['anonymise', 'anonymize', 'anonymisation'],
  def: 'Removing or changing anything that could identify a person, such as names, numbers or distinctive details, so a record cannot readily be linked back to them.',
  see: ['de-identified'],
  source: { label: 'Wikipedia: De-identification', href: 'https://en.wikipedia.org/wiki/De-identification' },
});
G({
  id: 'positionality',
  term: 'Positionality',
  def: 'How a researcher’s own identity and background, such as language, class, caste, gender and where they grew up, shape what they notice and how they interpret it. A positionality statement makes it visible.',
  see: ['positionality-note', 'position'],
  source: { label: 'Wikipedia: Positionality statement', href: 'https://en.wikipedia.org/wiki/Positionality_statement' },
});
G({
  id: 'chinese-whispers',
  term: 'Chinese whispers',
  aka: ['telephone game', 'whispers'],
  def: 'A game in which a message is whispered along a line of people, and the last version is compared with the first. Tool 2 · Break in Component 4 works like it.',
  see: ['whisper', 'play-it-live'],
  source: { label: 'Wikipedia: Chinese whispers', href: 'https://en.wikipedia.org/wiki/Chinese_whispers' },
});
G({
  id: 'card-sorting',
  term: 'Card sorting',
  aka: ['card sort'],
  def: 'A research method in which people arrange cards into groups, or into an order, that makes sense to them. Tool 3 · Weigh in Component 4 is a card sort.',
  see: ['material-reality-weigh', 'need-cards'],
  source: { label: 'Wikipedia: Card sorting', href: 'https://en.wikipedia.org/wiki/Card_sorting' },
});
G({
  id: 'idiom',
  term: 'Idiom',
  aka: ['idioms', 'saying', 'proverb'],
  def: 'A fixed expression whose meaning is not the literal meaning of its words. A kahavat is a spoken idiom or saying.',
  see: ['kahavat'],
  source: { label: 'Wikipedia: Idiom', href: 'https://en.wikipedia.org/wiki/Idiom' },
});
G({
  id: 'pluriverse',
  term: 'Pluriverse',
  aka: ['designs for the pluriverse', 'escobar', 'a world where many worlds fit'],
  context: 'Further reading',
  def: '“A world where many worlds fit.” Arturo Escobar’s Designs for the Pluriverse (2018) argues that design should support many ways of being and knowing, not one universal modern world.',
  see: ['pluriverse-question', 'baseline'],
  source: { label: 'Wikipedia: Arturo Escobar', href: 'https://en.wikipedia.org/wiki/Arturo_Escobar_(anthropologist)' },
});
G({
  id: 'capability-approach',
  term: 'Capability approach',
  aka: ['amartya sen', 'sen', 'capabilities'],
  context: 'Further reading',
  def: 'Amartya Sen’s approach to well-being and development: judge a person’s situation by their capabilities, the real freedoms to be and do what they have reason to value, not only by what they own.',
  see: ['material-reality'],
  source: { label: 'Wikipedia: Capability approach', href: 'https://en.wikipedia.org/wiki/Capability_approach' },
});
G({
  id: 'human-scale-development',
  term: 'Human Scale Development',
  aka: ['max-neef', 'fundamental human needs'],
  context: 'Further reading',
  def: 'Manfred Max-Neef’s framework: fundamental human needs are few and the same across cultures (subsistence, protection, affection, understanding, participation, leisure, creation, identity and freedom); what differs is how they are satisfied.',
  see: ['need-cards'],
  source: { label: 'Wikipedia: Fundamental human needs', href: 'https://en.wikipedia.org/wiki/Fundamental_human_needs' },
});
G({
  id: 'domestication',
  term: 'Domestication of ICTs',
  aka: ['domestication theory', 'silverstone', 'haddon'],
  context: 'Further reading',
  def: 'Roger Silverstone and Leslie Haddon’s account (1996) of how new technologies are “tamed” into everyday household life: acquired, given a place, fitted into routines, and shown to others.',
  source: { label: 'Wikipedia: Domestication theory', href: 'https://en.wikipedia.org/wiki/Domestication_theory' },
});
G({
  id: 'culturability',
  term: 'Culturability',
  aka: ['barber and badre', 'cultural markers'],
  context: 'Further reading',
  def: 'Wendy Barber and Albert Badre’s term (1998) for the merging of culture and usability: cultural markers in an interface, such as colour, layout and symbols, affect how usable it is for people from a given culture.',
  source: { label: 'Barber, W. and Badre, A. (1998), Culturability: the merging of culture and usability' },
});
G({
  id: 'nesta-diy-toolkit',
  term: 'Nesta DIY Toolkit',
  aka: ['diy toolkit', 'development impact and you', 'nesta'],
  context: 'Further reading',
  def: 'Development Impact & You: a free set of practical tools for social innovation, published by Nesta. Its Experience Map and Blueprint are pointed to from Component 4’s Before you start.',
  see: ['journey-strip'],
  source: { label: 'Nesta, DIY Toolkit (2014)' },
});

// ---------------------------------------------------------------------------------------------
// Checks, then the sorted list

for (const t of out) {
  for (const s of t.see ?? []) {
    if (!ids.has(s)) throw new Error(`glossary: "${t.id}" points to unknown term "${s}"`);
  }
  if (!t.def.trim()) throw new Error(`glossary: "${t.id}" has no definition`);
}

const sortKey = (t: Term) => norm(t.term.replace(/^\[|\]$/g, ''));
export const glossary: Term[] = [...out].sort((a, b) => sortKey(a).localeCompare(sortKey(b), 'en'));
export const termById = Object.fromEntries(glossary.map((t) => [t.id, t])) as Record<string, Term>;

/** The first letter a term is filed under (A–Z, or # for anything else). */
export const letterOf = (t: Term) => {
  const c = sortKey(t).charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : '#';
};

export const scopeLabel: Record<TermScope, string> = {
  toolkit: 'Toolkit',
  c1: 'Existing products',
  c2: 'Visual culture',
  c3: 'Language',
  c4: 'Material reality',
  ink: 'Reflection',
  general: 'General term',
};
