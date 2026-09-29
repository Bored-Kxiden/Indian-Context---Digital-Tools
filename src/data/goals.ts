import type { ComponentColour } from './components';
import { iWantTo as c4Goals } from './booklet/material-reality';

// The "I want to…" index: the site's main way in (CONTEXT.md, D6). Goals are grouped by
// component; each item is a phrase that finishes "I want to…", plus the tool it opens.
//
//  - Component 4 items are the booklet's own list (page 4.03), verbatim.
//  - Every chip takes its own component's colour (D19): a tool never borrows another component's colour.
//  - Component 1 items are written by us, from each tool's subtitle (not in the booklet).
//  - Component 3 (Language) items are ours, from the Meaning-to-Interface work.
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
    id: 'language-setting',
    component: 'c3',
    componentLabel: 'Component 3 · Language',
    title: 'Understand the setting',
    items: [
      { phrase: '…by noticing routines, relationships, language, and how people communicate', tag: 'Context Cards', tone: 'c3', href: `${C3}physical-field-kit/#context-cards` },
      { phrase: '…by writing down where I am coming from, before I begin', tag: 'Positionality Card', tone: 'c3', href: `${C3}physical-field-kit/#positionality-card` },
    ],
  },
  {
    id: 'language-capture',
    component: 'c3',
    componentLabel: 'Component 3 · Language',
    title: 'Capture what people mean',
    items: [
      { phrase: '…by running the conversation step by step, from consent to correction', tag: 'Interview Cards', tone: 'c3', href: `${C3}physical-field-kit/#interview-cards` },
      { phrase: '…by recording a phrase, gesture, or pause worth a second look', tag: 'Meaning Card', tone: 'c3', href: `${C3}meaning-card/` },
      { phrase: '…by carrying blank cards into the field', tag: 'Blank Meaning Cards', tone: 'c3', href: `${C3}physical-field-kit/#blank-meaning-cards` },
      { phrase: '…by reflecting on what surprised me, straight after a session', tag: 'Reflection Cards', tone: 'c3', href: `${C3}physical-field-kit/#reflection-cards` },
    ],
  },
  {
    id: 'language-translate',
    component: 'c3',
    componentLabel: 'Component 3 · Language',
    title: 'Translate without losing meaning',
    items: [
      { phrase: '…by translating what was said literally, in context, and with alternatives', tag: 'Thick translation', tone: 'c3', href: `${C3}methodology/#thick` },
      { phrase: '…by checking my translation with the people it came from, in both directions', tag: 'Bidirectional validation', tone: 'c3', href: `${C3}methodology/#bidi` },
      { phrase: '…by recording who interpreted, how, and whether a second reader agrees', tag: 'Fidelity Protocol', tone: 'c3', href: `${C3}fidelity-protocol/` },
    ],
  },
  {
    id: 'language-wording',
    component: 'c3',
    componentLabel: 'Component 3 · Language',
    title: 'Test interface wording',
    items: [
      { phrase: '…by checking that someone new to the form understands the words', tag: 'Lens N · Nomenclature', tone: 'c3', href: `${C3}language-lens-audit/#lens-n` },
      { phrase: '…by checking it works read aloud and operated by someone else', tag: 'Lens P · Proxy', tone: 'c3', href: `${C3}language-lens-audit/#lens-p` },
      { phrase: '…by checking it reads as official, not as a scam', tag: 'Lens T · Trust', tone: 'c3', href: `${C3}language-lens-audit/#lens-t` },
      { phrase: '…by auditing portal or interface copy against all three lenses', tag: 'Language Lens Audit', tone: 'c3', href: `${C3}language-lens-audit/` },
    ],
  },
  {
    id: 'language-build-on',
    component: 'c3',
    componentLabel: 'Component 3 · Language',
    title: 'Build on what we already know',
    items: [
      { phrase: '…by searching meanings that have already been validated', tag: 'Expression Library', tone: 'c3', href: `${C3}expression-library/` },
      { phrase: '…by reusing wording that has already been tested, with its evidence', tag: 'Design Language Library', tone: 'c3', href: `${C3}design-language-library/` },
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

export const goalsByComponent = (c: ComponentColour) => goals.filter((g) => g.component === c);
