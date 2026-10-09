// Claim & Reflection: the pages that run through the toolkit. Content is from the reference HTML
// (Claim-and-Reflection); the page codes (R·1A, R·1B, R·E1…) are its own. See CONTEXT.md, D31.
//
// Five steps: 1 Position and 2 Prediction before each component, 3 Claim and 4 Redaction after it,
// and 5 Summarise once at the end (three Look back pages).

import type { RailId } from './rail';

export type ReflectComponent = RailId;

const R = '/components/reflection/';

export const overview = {
  quote: 'I want to know what the process gave me that I did not already have.',
  eyebrow: 'Read before you open any other file · runs through every file',
  what: {
    title: 'What is it & why should I do it?',
    body: [
      'It starts before the work, not after it. You write down where you are positioned, what you expect to find, and what that expectation is built from.',
      'After the component, you make a claim from what the process actually gave you. You test it against your own familiarity, name what is still unknown, and look at what your method may have missed.',
      'The output is not a polished conclusion. It is a traceable account of what changed, what you can support, and what you still cannot.',
    ],
  },
  howTo: {
    title: 'How to use it',
    body: 'Fill a file’s Before page before you open its first tool. Fill its After page as soon as its last page is done. At the end of the toolkit, go back to your predictions with the three Look back pages.',
  },
  onlyOne: 'Only using one file? Do its Before and After pages, then go straight to the three Look back pages. They take about 30 minutes.',
  flow: [
    { n: 1, name: 'Position', ask: 'Where are you speaking from?' },
    { n: 2, name: 'Prediction', ask: 'What do you expect, and why?' },
    { n: 3, name: 'Claim', ask: 'What did the process actually give you?' },
    { n: 4, name: 'Redaction', ask: 'What survives your own bias check?' },
    { n: 5, name: 'Summarise', ask: 'What changed, surprised, or stayed missing?' },
  ],
  /** Downloads that cover the whole component. */
  pdfAll: 'claim-and-reflection.pdf',
};

/** Where each Before and After page sits in a component, and what the prediction is about. */
export interface ReflectStop {
  id: ReflectComponent;
  n: 1 | 2 | 3 | 4;
  /** "Component 1 · Reading Existing Products" */
  label: string;
  short: string;
  href: string;
  before: {
    code: string;
    pdf: string;
    image: string;
    /** The step in the component it follows, and the one it comes before (site names). */
    after: { label: string; href: string };
    before: { label: string; href: string };
    predict: string;
  };
  after: {
    code: string;
    pdf: string;
    image: string;
    after: { label: string; href: string };
    /** What starts next. */
    next: { label: string; href: string };
  };
}

const C1 = '/components/existing-products/';
const C2 = '/components/visual-culture/';
const C3 = '/components/language/';
const C4 = '/components/material-reality/';

export const stops: ReflectStop[] = [
  {
    id: 'existing-products',
    n: 1,
    label: 'Reading Existing Products',
    short: 'Existing products',
    href: C1,
    before: {
      code: 'R·1A',
      pdf: 'reflection-r1a.pdf',
      image: 'r1a',
      after: { label: 'Pick a product', href: `${C1}pick-a-product/` },
      before: { label: '1 · Media & Gossip', href: `${C1}media-gossip/` },
      predict: 'whose user this product was built for, and where it lets your person down.',
    },
    after: {
      code: 'R·1B',
      pdf: 'reflection-r1b.pdf',
      image: 'r1b',
      after: { label: 'Synthesis', href: `${C1}synthesis/` },
      next: { label: 'Reading Visual Culture', href: C2 },
    },
  },
  {
    id: 'visual-culture',
    n: 2,
    label: 'Reading Visual Culture',
    short: 'Visual culture',
    href: C2,
    before: {
      code: 'R·2A',
      pdf: 'reflection-r2a.pdf',
      image: 'r2a',
      after: { label: 'Before you start', href: `${C2}before-you-start/` },
      before: { label: '1 · Show', href: `${C2}show/` },
      predict: 'which images people will trust, which they will ignore, and why.',
    },
    after: {
      code: 'R·2B',
      pdf: 'reflection-r2b.pdf',
      image: 'r2b',
      after: { label: 'Is it working?', href: `${C2}is-it-working/` },
      next: { label: 'Reading Language Conditions', href: C3 },
    },
  },
  {
    id: 'language',
    n: 3,
    label: 'Reading Language Conditions',
    short: 'Language',
    href: C3,
    before: {
      code: 'R·3A',
      pdf: 'reflection-r3a.pdf',
      image: 'r3a',
      after: { label: 'Before you start', href: `${C3}before-you-start/` },
      before: { label: '1 · Listen', href: `${C3}listen/` },
      predict: 'which words will mean something different from what they say.',
    },
    after: {
      code: 'R·3B',
      pdf: 'reflection-r3b.pdf',
      image: 'r3b',
      after: { label: 'Is it working?', href: `${C3}is-it-working/` },
      next: { label: 'Reading Material Conditions', href: C4 },
    },
  },
  {
    id: 'material-reality',
    n: 4,
    label: 'Reading Material Conditions',
    short: 'Material conditions',
    href: C4,
    before: {
      code: 'R·4A',
      pdf: 'reflection-r4a.pdf',
      image: 'r4a',
      after: { label: 'Overview', href: C4 },
      before: { label: 'Before you start', href: `${C4}before-you-start/` },
      predict: 'what your person will be missing, and what they use instead.',
    },
    after: {
      code: 'R·4B',
      pdf: 'reflection-r4b.pdf',
      image: 'r4b',
      after: { label: 'Ask your participants', href: `${C4}ask-your-participants/` },
      next: { label: 'Look back: Summarise', href: `${R}summarise/` },
    },
  },
];

export const stopById = Object.fromEntries(stops.map((s) => [s.id, s])) as Record<ReflectComponent, ReflectStop>;

/** The Before worksheet: steps 1 and 2. Same questions in every component. */
export const before = {
  sub: 'Steps 1–2 · Position + prediction',
  when: 'Fill it before you open the file’s first tool. Keep it visible; don’t edit the prediction.',
  opening: ['Before I begin,', 'I want to make my starting position visible.'],
  position: {
    n: 1,
    name: 'Position',
    intro: 'Your device. Your language at home. Your city.',
    fields: ['Device', 'Language at home', 'City'],
    usedAsk: 'Have you used this product, avoided it, or never needed it?',
    used: ['Used it', 'Avoided it', 'Never needed it'],
    because: 'Because',
    also: 'What else might shape how you see this person or product?',
  },
  prediction: {
    n: 2,
    name: 'Prediction',
    lead: 'For this component, predict',
    asks: [
      'What do you expect to find?',
      'Why do you expect to find that?',
      'What do you think it could mean? What do you already know about this context that is making you predict this?',
    ],
  },
  keep: {
    lead: 'Keep this page visible while you work.',
    body: 'Do not change the prediction until the file is complete.',
  },
};

/** The After worksheet: steps 3 and 4, plus the gap you could not close. Same in every component. */
export const after = {
  sub: 'Steps 3–4 · Claim + redaction',
  when: 'Fill it as soon as the file’s last page is done, while it is fresh.',
  opening: ['What did the process actually give me?', 'Not what I set out to find.'],
  stanza: {
    n: 1,
    name: 'The stanza',
    lead: 'Write one paragraph, not a list, about what you actually learned.',
    body: 'Not what you set out to find. What the process gave you that you did not already have when you started.',
  },
  redaction: {
    n: 2,
    name: 'Redaction',
    body: 'Read your stanza back slowly. Underline anything that might come from your own familiarity, frustration or background rather than the evidence. What is left un-underlined is the part you can stand behind.',
    write: 'What’s left that I can stand behind:',
  },
  unknown: {
    n: 3,
    name: 'Still unknown',
    body: 'Name one specific thing you went looking for and couldn’t confirm. Not “there’s a lot more to understand”. The actual gap you hit.',
    write: ['I went looking for', 'and couldn’t confirm it because'],
  },
  onlyOne: 'Only using this file? Go to the Look back pages now.',
  /** The reference's page codes for the three Look back pages. */
  lookBackCodes: 'R·E1–E3',
};

export interface LookBack {
  slug: string;
  code: string;
  pdf: string;
  image: string;
  /** "Look back: Summarise" */
  title: string;
  short: string;
  sub: string;
  opening: string[];
}

export const lookBack: LookBack[] = [
  {
    slug: 'summarise',
    code: 'R·E1',
    pdf: 'reflection-re1.pdf',
    image: 're1',
    title: 'Look back: Summarise',
    short: 'Summarise',
    sub: 'Step 5 · Look back 1 of 3 · return to your predictions',
    opening: ['Open your predictions.'],
  },
  {
    slug: 'wheel',
    code: 'R·E2',
    pdf: 'reflection-re2.pdf',
    image: 're2',
    title: 'Look back: Wheel',
    short: 'Wheel',
    sub: 'Look back 2 of 3 · map what you could actually reach',
    opening: ['A dimension you didn’t explore', 'is still part of the situation.'],
  },
  {
    slug: 'consequences',
    code: 'R·E3',
    pdf: 'reflection-re3.pdf',
    image: 're3',
    title: 'Look back: Consequences',
    short: 'Consequences',
    sub: 'Look back 3 of 3 · unintended consequences · push the method further',
    opening: ['What did this process prevent?', 'And what could it still produce?'],
  },
];

export const lookBackWhen = 'Do these once, at the very end, with all your Before and After pages in front of you.';

export const summarise = {
  keep: 'Keep them in front of you.',
  surprise: {
    n: 1,
    name: 'Surprise',
    ask: 'What surprised you? What did you almost scroll past or skip over that turned out to matter?',
  },
  mundane: {
    n: 2,
    name: 'The mundane that moved things',
    ask: 'What seemed irrelevant or too obvious to note, but changed something when you looked closer?',
  },
  compass: {
    n: 3,
    name: 'Compass',
    intro: 'Three lines. Finish each one.',
    lines: [
      'Something I will always refuse to do in this kind of work:',
      'Something I will always make sure I do:',
      'Something I will go much deeper into next time:',
    ],
  },
  note: { lead: 'Compare, don’t rewrite.', body: 'Leave your predictions as they were. The gap between them and this page is the finding.' },
};

export const wheel = {
  how: 'Write one dimension on each wedge. Shade each wedge as far in as you actually went. Leave blank, or mark with ✕, the ones you couldn’t reach.',
  rings: [
    { name: 'Outer ring', means: 'touched it' },
    { name: 'Middle', means: 'looked into it' },
    { name: 'Centre', means: 'in depth' },
  ],
  question: { n: 1, name: 'The question', ask: 'What’s notably missing from your wheel?', then: 'Why do you think it stayed out of reach?' },
  suggested: ['Legal', 'Political', 'Economic', 'Ecological', 'Cultural', 'Caste & Class', 'Gender', 'Language', 'Labour', 'Infrastructure', 'Trust', 'Time'],
};

export const consequences = {
  skipped: {
    n: 1,
    name: 'If you had skipped it',
    ask: 'If you had skipped this whole process and gone straight to building, what would you likely have missed, assumed, or got wrong? What would that have cost someone?',
  },
  again: {
    n: 2,
    name: 'Look again',
    ask: 'Now look at the decisions and the process you did follow. Name one way your approach, your choices or your framing could still land badly on someone you haven’t accounted for.',
    write: ['Who', 'How it could land'],
  },
  pluriverse: {
    n: 3,
    name: 'Pluriverse',
    lead: 'What disappears when there is only one world?',
    asks: [
      'If this product had to be built for one single, standard, universal user, what would your team have had to pretend didn’t exist?',
      'And if you were building for a completely different kind of world, what would you no longer have had to consider at all?',
    ],
  },
  finalCheck: { lead: 'Final check', ask: 'Can someone else read this and tell what you learned, what you could evidence, and what you still don’t know?' },
};
