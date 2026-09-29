import type { ModuleId } from './modules';

// The "I want to…" index: the site's main way in. Each group is something a
// researcher wants to get done, in the order the process happens; each item is a
// plain-language phrase that finishes the sentence, followed by the tool that
// does it. The home page, the Tools page, and the footer index all read this.
//
// To add an item: add it to a group below. `href` is a site path, optionally with
// an anchor (see the ids on the tool pages). Set `index: false` to keep an item
// out of the footer's A–Z list (used for links that are not tools).

export type GoalIcon = 'compass' | 'listen' | 'translate' | 'lens' | 'library' | 'print';

export interface GoalItem {
  /** Finishes "I want to…", e.g. "…by noticing routines and relationships". */
  phrase: string;
  /** The tool or step this leads to. Shown in capitals. */
  label: string;
  href: string;
  index?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  icon: GoalIcon;
  module?: ModuleId;
  items: GoalItem[];
}

export const goals: Goal[] = [
  {
    id: 'setting',
    title: 'Understand the setting',
    icon: 'compass',
    module: 'context',
    items: [
      {
        phrase: '…by noticing routines, relationships, language, and how people communicate.',
        label: 'Context Cards',
        href: '/tools/physical-field-kit/#context-cards',
      },
      {
        phrase: '…by writing down where I am coming from, before I begin.',
        label: 'Researcher Positionality Card',
        href: '/tools/physical-field-kit/#positionality-card',
      },
    ],
  },
  {
    id: 'capture',
    title: 'Capture what people mean',
    icon: 'listen',
    module: 'person',
    items: [
      {
        phrase: '…by running the conversation step by step, from consent to correction.',
        label: 'Interview Cards',
        href: '/tools/physical-field-kit/#interview-cards',
      },
      {
        phrase: '…by recording a phrase, gesture, or pause worth a second look.',
        label: 'Meaning Card',
        href: '/tools/meaning-card/',
      },
      {
        phrase: '…by carrying blank cards into the field.',
        label: 'Blank Meaning Cards',
        href: '/tools/physical-field-kit/#blank-meaning-cards',
      },
      {
        phrase: '…by reflecting on what surprised me, straight after a session.',
        label: 'Reflection Cards',
        href: '/tools/physical-field-kit/#reflection-cards',
      },
    ],
  },
  {
    id: 'translate',
    title: 'Translate without losing meaning',
    icon: 'translate',
    module: 'interpret',
    items: [
      {
        phrase: '…by translating what was said literally, in context, and with alternatives.',
        label: 'Thick translation',
        href: '/about/#thick',
      },
      {
        phrase: '…by checking my translation with the people it came from, in both directions.',
        label: 'Bidirectional validation',
        href: '/about/#bidi',
      },
      {
        phrase: '…by recording who interpreted, how, and whether a second reader agrees.',
        label: 'Fidelity Protocol',
        href: '/tools/fidelity-protocol/',
      },
    ],
  },
  {
    id: 'wording',
    title: 'Test interface wording',
    icon: 'lens',
    module: 'interpret',
    items: [
      {
        phrase: '…by checking that someone new to the form understands the words.',
        label: 'Lens N: Nomenclature',
        href: '/tools/language-lens-audit/#lens-n',
      },
      {
        phrase: '…by checking it works read aloud and operated by someone else.',
        label: 'Lens P: Proxy / Audience',
        href: '/tools/language-lens-audit/#lens-p',
      },
      {
        phrase: '…by checking it reads as official, not as a scam.',
        label: 'Lens T: Trust',
        href: '/tools/language-lens-audit/#lens-t',
      },
      {
        phrase: '…by auditing portal or interface copy against all three lenses.',
        label: 'Language Lens Audit',
        href: '/tools/language-lens-audit/',
      },
    ],
  },
  {
    id: 'build-on',
    title: 'Build on what we already know',
    icon: 'library',
    module: 'interpret',
    items: [
      {
        phrase: '…by searching meanings that have already been validated.',
        label: 'Expression Library',
        href: '/tools/expression-library/',
      },
      {
        phrase: '…by reusing wording that has already been tested, with its evidence.',
        label: 'Design Language Library',
        href: '/tools/design-language-library/',
      },
      {
        phrase: '…by folding new questions back into the next round of research.',
        label: 'The process loop',
        href: '/#process',
        index: false,
      },
    ],
  },
  {
    id: 'files',
    title: 'Print, fill in, and digitize',
    icon: 'print',
    items: [
      {
        phrase: '…by printing cards to take into the field.',
        label: 'Print-ready cards',
        href: '/downloads/#print',
        index: false,
      },
      {
        phrase: '…by moving completed cards into a spreadsheet or the library.',
        label: 'Digital templates',
        href: '/downloads/#digital',
        index: false,
      },
    ],
  },
];

/** Every tool and step, once, A–Z. Used by the footer index. */
export function toolIndex(): { label: string; href: string }[] {
  const seen = new Map<string, string>();
  for (const g of goals) {
    for (const item of g.items) {
      if (item.index !== false && !seen.has(item.label)) seen.set(item.label, item.href);
    }
  }
  return [...seen].map(([label, href]) => ({ label, href })).sort((a, b) => a.label.localeCompare(b.label));
}
