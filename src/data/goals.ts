import type { ComponentColour } from './components';
import { iWantTo as c4Goals } from './booklet/material-reality';
import { iWantTo as c2Goals } from './booklet/visual-culture';

// The "I want to…" index: the site's main way in (CONTEXT.md, D6). Goals are grouped by
// component; each item is a phrase that finishes "I want to…", plus the tool it opens.
//
//  - Component 4 items are the booklet's own list (page 4.03), verbatim.
//  - Every chip takes its own component's colour (D19): a tool never borrows another component's colour.
//  - Component 2 items: the first line is the booklet's own (page 2.02); the four tool lines are ours.
//  - Component 1 items are written by us, from each tool's subtitle (not in the booklet).
//  - Component 3 (Language) lists its five broad themes only, each opening the tool that does it. The steps under each
//    theme (the earlier Meaning-to-Interface phrases, re-pointed at the booklet's tools) are in `languageSteps` below,
//    for search, and sit on the theme's own page.
//
// To add an item, add it to a group below. `href` is a site path, optionally with an anchor.

export type Tone = 'c1' | 'c2' | 'c3' | 'c4' | 'ink';

export interface GoalItem {
  /** Finishes "I want to…", e.g. "…see who people depend on to get it done". */
  phrase: string;
  /** Short tag shown as a chip: the tool this opens. */
  tag: string;
  /** Chip colour. */
  tone: Tone;
  href: string;
}

export interface Goal {
  id: string;
  component: ComponentColour;
  /** Shown as a mono label, e.g. "Component 1 · Existing products". */
  componentLabel: string;
  title: string;
  items: GoalItem[];
}

const C1 = '/components/existing-products/';
const C2 = '/components/visual-culture/';
const C3 = '/components/language/';
const C4 = '/components/material-reality/';


export const goals: Goal[] = [
  {
    id: 'existing-products',
    component: 'c1',
    componentLabel: 'Component 1 · Existing products',
    title: 'Read an existing product',
    items: [
      { phrase: '…pick the one product to read', tag: 'Pick a product', tone: 'c1', href: `${C1}pick-a-product/` },
      { phrase: '…see what a product promises, and what people actually say', tag: '1 · Media & Gossip', tone: 'c1', href: `${C1}media-gossip/` },
      { phrase: '…find out what the product replaced, and who lost a role', tag: '2 · History', tone: 'c1', href: `${C1}history/` },
      { phrase: '…see where the ideal story breaks, and who gets blamed', tag: '3 · The Break', tone: 'c1', href: `${C1}the-break/` },
      { phrase: '…see what the product does to power, and whose unpaid work keeps it running', tag: '4 · Power', tone: 'c1', href: `${C1}power/` },
      { phrase: '…turn what I found into a design claim', tag: 'Synthesis', tone: 'c1', href: `${C1}synthesis/` },
    ],
  },
  {
    id: 'visual-culture',
    component: 'c2',
    componentLabel: 'Component 2 · Visual culture',
    title: 'Read visual culture',
    items: c2Goals.map((g) => ({
      phrase: g.phrase,
      tag: g.tag,
      tone: 'c2' as Tone,
      href: g.tool ? `${C2}${g.tool}/${g.anchor}` : `${C2}${g.anchor}`,
    })),
  },
  {
    id: 'language',
    component: 'c3',
    componentLabel: 'Component 3 · Language',
    title: 'Read language',
    items: [
      { phrase: '…understand the setting', tag: 'Before you start', tone: 'c3', href: `${C3}before-you-start/` },
      { phrase: '…capture what people mean', tag: '1 · Listen', tone: 'c3', href: `${C3}listen/` },
      { phrase: '…translate without losing meaning', tag: '2 · Translate', tone: 'c3', href: `${C3}translate/` },
      { phrase: '…test interface wording', tag: '3 · Test', tone: 'c3', href: `${C3}test/` },
      { phrase: '…build on what we already know', tag: '4 · Library', tone: 'c3', href: `${C3}library/` },
    ],
  },
  {
    id: 'material-reality',
    component: 'c4',
    componentLabel: 'Component 4 · Material reality',
    title: 'Read material reality',
    items: c4Goals.map((g) => ({
      phrase: g.phrase,
      tag: g.tag,
      tone: 'c4' as Tone,
      href: `${C4}${g.tool}/${g.anchor}`,
    })),
  },
];

/**
 * The steps and ways of doing each Language theme. They are not in the "I want to…" index (that lists
 * the five broad themes only); each sits on its theme's page, and they stay findable through the
 * "Find a tool" search.
 */
export const languageSteps: { theme: string; items: GoalItem[] }[] = [
  {
    theme: 'Understand the setting',
    items: [
      { phrase: '…by noticing routines, relationships, language, and how people communicate', tag: 'Context Cards', tone: 'c3', href: `${C3}physical-field-kit/#context-cards` },
      { phrase: '…by writing down where I am coming from, before I begin', tag: 'Positionality note', tone: 'c3', href: `${C3}before-you-start/#positionality` },
      { phrase: '…by starting a provisional glossary, to correct after the interviews', tag: 'Provisional glossary', tone: 'c3', href: `${C3}before-you-start/#glossary` },
    ],
  },
  {
    theme: 'Capture what people mean',
    items: [
      { phrase: '…by reading the cues beyond words before I go in', tag: 'Cue cards', tone: 'c3', href: `${C3}listen/#part-prime` },
      { phrase: '…by running the conversation step by step, from consent to correction', tag: 'Interview Cards', tone: 'c3', href: `${C3}physical-field-kit/#interview-cards` },
      { phrase: '…by recording a phrase, gesture, or pause worth a second look', tag: 'Meaning Card', tone: 'c3', href: `${C3}meaning-card/` },
      { phrase: '…by carrying blank cards into the field', tag: 'Blank Meaning Cards', tone: 'c3', href: `${C3}physical-field-kit/#blank-meaning-cards` },
      { phrase: '…by reflecting on what surprised me, straight after a session', tag: 'Reflection Cards', tone: 'c3', href: `${C3}physical-field-kit/#reflection-cards` },
      { phrase: '…by reaching a meaning through a drawing when words won’t', tag: '5 · Kahavat Relay', tone: 'c3', href: `${C3}kahavat-relay/` },
    ],
  },
  {
    theme: 'Translate without losing meaning',
    items: [
      { phrase: '…by translating what was said literally, in context, and with alternatives', tag: 'Thick translation', tone: 'c3', href: `${C3}translate/#part-thick` },
      { phrase: '…by checking my translation with the people it came from, in both directions', tag: 'Reverse thick translation', tone: 'c3', href: `${C3}translate/#reverse` },
      { phrase: '…by recording who interpreted, how, and whether a second reader agrees', tag: 'Fidelity Protocol', tone: 'c3', href: `${C3}fidelity-protocol/` },
    ],
  },
  {
    theme: 'Test interface wording',
    items: [
      { phrase: '…by checking that someone new to the form understands the words', tag: 'Lens N · New', tone: 'c3', href: `${C3}language-lens-audit/#lens-n` },
      { phrase: '…by checking it works read aloud and operated by someone else', tag: 'Lens P · Proxy', tone: 'c3', href: `${C3}language-lens-audit/#lens-p` },
      { phrase: '…by checking it reads as official, not as a scam', tag: 'Lens T · Trust', tone: 'c3', href: `${C3}language-lens-audit/#lens-t` },
      { phrase: '…by auditing portal or interface copy against all three lenses', tag: 'Language Lens Audit', tone: 'c3', href: `${C3}language-lens-audit/` },
    ],
  },
  {
    theme: 'Build on what we already know',
    items: [
      { phrase: '…by searching meanings that have already been validated', tag: 'Expression Library', tone: 'c3', href: `${C3}expression-library/` },
      { phrase: '…by reusing wording that has already been tested, with its evidence', tag: 'Design Language Library', tone: 'c3', href: `${C3}design-language-library/` },
    ],
  },
];

export const goalsByComponent = (c: ComponentColour) => goals.filter((g) => g.component === c);
