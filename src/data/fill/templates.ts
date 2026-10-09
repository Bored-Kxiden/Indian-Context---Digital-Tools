import type { Field, FillSection, FillTemplate } from './types';
import type { Tool } from '../booklet/types';
import { tools as c1Tools } from '../booklet/existing-products';
import { tools as c2Tools } from '../booklet/visual-culture';
import { tools as c3Tools } from '../booklet/language';
import { tools as c4Tools } from '../booklet/material-reality';
import { stops, before, after, lookBack, summarise, wheel, consequences } from '../reflection';
import cardFields from '../../../templates/meaning-card-fields.json';

// Every "Fill on screen" form. Fields, labels and [bracketed] examples are copied from the final booklet's template
// pages (or, for Reflection and the Meaning Card, from the same data the printed sheets are built from). A booklet
// tool without a full form yet gets its steps as a checklist and a notes field (complete: false).

const C1 = '/components/existing-products/';
const C3 = '/components/language/';
const C4 = '/components/material-reality/';
const R = '/components/reflection/';

const t = (id: string, label: string, example?: string, rows = 1, hint?: string): Field => ({ kind: 'text', id, label, example, rows, hint });

// ---- Component 1 · Synthesis (booklet p.1.09): "Make the stories compete"

const synthesis: FillSection[] = [
  {
    id: 'lines',
    title: '1 · Your carried lines',
    lead: 'Copy, don’t reread.',
    fields: [
      t('media', 'Media', 'promises “one place, seamless”'),
      t('gossip', 'Gossip', 'nobody can tell you where your application is'),
      t('history', 'History', 'you can no longer plead your case to a person'),
      t('break', 'The Break', 'no way to make a PDF on a phone (8/10)'),
      t('power', 'Power', 'it only works because of unpaid helpers'),
    ],
  },
  {
    id: 'contradiction',
    title: '2 · The sharpest contradiction',
    fields: [
      {
        kind: 'sentence',
        id: 's',
        parts: [
          'The product claims ',
          { id: 'claims', example: 'to be one seamless place', size: 'l' },
          ', but ',
          { id: 'source', example: 'the Villain Story', size: 'm' },
          ' revealed ',
          { id: 'revealed', example: 'it needs a scanner, a café and a father’s phone', size: 'l' },
          '.',
        ],
      },
    ],
  },
  {
    id: 'redesigns',
    title: '3 · Three possible redesigns',
    lead: 'Specific screens or steps.',
    fields: [
      t('a', 'A', 'photo-to-PDF inside the upload step'),
      t('b', 'B', 'an error that says how to fix it'),
      t('c', 'C', 'OTP to a number she chooses'),
      {
        kind: 'sentence',
        id: 'pick',
        parts: [
          'The one that takes the most blame off the user is ',
          { id: 'which', example: 'A', size: 's' },
          ', because ',
          { id: 'why', example: 'she no longer needs a scanner or a café', size: 'l' },
          '.',
        ],
      },
    ],
  },
  {
    id: 'power',
    title: '4 · The power test',
    fields: [
      {
        kind: 'sentence',
        id: 's',
        parts: [
          'If this were built, ',
          { id: 'who', example: 'students without scanners', size: 'm' },
          ' would gain ',
          { id: 'gain', example: 'a free way to submit', size: 'm' },
          '. ',
          { id: 'resist', example: 'Cafés and agents', size: 'm' },
          ' would resist it, because ',
          { id: 'because', example: 'they’d lose paid work', size: 'l' },
          '.',
        ],
      },
    ],
  },
  {
    id: 'finding',
    title: '5 · The finding',
    fields: [
      {
        kind: 'sentence',
        id: 's',
        parts: [
          'This product assumes ',
          { id: 'assumes', example: 'a scanner and a PDF', size: 'm' },
          ', but the user actually has ',
          { id: 'has', example: 'a phone camera', size: 'm' },
          ', which causes ',
          { id: 'causes', example: 'a paid trip, a lost day and self-blame', size: 'l' },
          '.',
        ],
      },
    ],
  },
  {
    id: 'claim',
    title: '6 · The design claim',
    lead: 'Fill it last. Every blank should point to something you already wrote.',
    fields: [
      {
        kind: 'sentence',
        id: 's',
        parts: [
          'We should redesign ',
          { id: 'what', example: 'the upload step', size: 'm' },
          ', because it would shift blame from ',
          { id: 'from', example: 'the student', size: 'm' },
          ' to ',
          { id: 'to', example: 'the portal’s missing PDF path', size: 'l' },
          ', and would specifically help ',
          { id: 'help', example: 'students who only have a phone', size: 'l' },
          '.',
        ],
      },
    ],
  },
];

// ---- Component 3 · Translate, Part A (booklet p.3.10): thick translation

const thickTranslation: FillSection[] = [
  {
    id: 'from',
    title: 'Where it comes from',
    fields: [t('card', 'From Meaning Card no.', 'P07-M03'), t('languages', 'Language(s) spoken'), t('region', 'Region')],
  },
  {
    id: 'translation',
    title: 'The translation',
    fields: [
      t('said', 'As said', 'in their language and script, exactly as said', 2),
      t('literal', 'Literal', 'word for word', 2),
      t('context', 'In context', 'what was happening when it was said', 2),
      t('alternatives', 'Alternatives', 'other ways it could be read', 2),
      t('implied', 'Implied', 'what they really meant, with tone and feeling', 2),
      t('signals', 'Signals', 'arre, haaye, a laugh, a tone'),
      t('reviewed', 'Reviewed by', 'who checked it'),
    ],
  },
  {
    id: 'gap',
    title: 'Literal vs implied',
    fields: [
      {
        kind: 'sentence',
        id: 's',
        parts: ['Literally it means ', { id: 'literally', example: 'God’s wish', size: 'm' }, ', but they meant ', { id: 'meant', example: 'an unknown official decides', size: 'l' }, '.'],
      },
      t('question', 'Question to test in Part B: do other people hear the same thing?', undefined, 2),
    ],
  },
];

// ---- Component 4 · Say (booklet p.4.21): the brief pad

const briefPad: FillSection[] = [
  {
    id: 'brief',
    title: 'The brief',
    fields: [
      t('break', 'Break', undefined),
      t('person', 'Person', undefined),
      t('assumed', 'The product assumed…', 'a scanner and a PDF'),
      t('existed', 'What existed was…', 'a phone camera and a café'),
      t('so', 'So they…', 'paid ₹50 and lost a day'),
      t('cost', 'It cost them…', 'money, a day, and her father’s time'),
      { kind: 'choice', id: 'kind', label: 'This is…', options: ['Oversight', 'Offload', 'Constraint'] },
    ],
  },
  {
    id: 'offload',
    title: 'If you picked Offload',
    lead: 'Answer the three ↳ questions only if you picked Offload.',
    fields: [
      t('whose', '↳ Whose decision was it?'),
      t('benefits', '↳ Who benefits · who pays?'),
      { kind: 'choice', id: 'intentional', label: '↳ Was it intentional?', options: ['Yes', 'No', 'Not sure'] },
    ],
  },
  {
    id: 'next',
    title: 'Then',
    fields: [
      t('true', 'It is true for…', '[n] students in the survey · source', 1, 'A real number with its source, from your Count cards. Never estimate.'),
      t('prototype', 'Prototype next…', 'photo-to-PDF inside the upload step'),
      t('line', 'In one line', undefined, 2),
    ],
  },
];

const full: Record<string, FillSection[]> = {
  'existing-products/synthesis/synthesis': synthesis,
  'language/translate/thick': thickTranslation,
  'material-reality/say/brief': briefPad,
};

const colour = { 'existing-products': 'c1', 'visual-culture': 'c2', language: 'c3', 'material-reality': 'c4' } as const;
const label = { 'existing-products': 'Component 1', 'visual-culture': 'Component 2', language: 'Component 3', 'material-reality': 'Component 4' } as const;

const notes: FillSection[] = [
  {
    id: 'notes',
    title: 'Your notes',
    lead: 'This template’s own fields are not on screen yet. Print it, or keep your notes for it here.',
    fields: [t('notes', 'Notes for this part', undefined, 8)],
  },
];

/** The forms for one booklet tool: one per part that has a template. */
export function fillForTool(tool: Tool): FillTemplate[] {
  const base = `/components/${tool.component}/${tool.slug}/`;
  return tool.parts
    .filter((p) => !p.blank.skip)
    .map((p) => {
      const id = `${tool.component}/${tool.slug}/${p.id}`;
      const sections = full[id];
      return {
        id,
        title: tool.parts.length > 1 ? `${p.label} · ${p.title}` : p.title,
        context: `${label[tool.component]} · ${tool.number ? `Tool ${tool.number} · ` : ''}${tool.name}`,
        c: colour[tool.component],
        source: `Booklet ${p.blank.printed}`,
        page: base,
        steps: tool.stepsList ? tool.stepsList.map((s) => `${s.title}: ${s.body}`) : p.steps,
        sections: sections ?? notes,
        complete: !!sections,
      };
    });
}

export const toolFills: FillTemplate[] = [...c1Tools, ...c2Tools, ...c3Tools, ...c4Tools].flatMap(fillForTool);

// ---- Claim & Reflection: the Before and After pages and the three Look back pages (from src/data/reflection.ts)

export const reflectionFills: FillTemplate[] = [
  ...stops.flatMap((s) => [
    {
      id: `reflection/before/${s.id}`,
      title: `Before Component ${s.n} · ${s.before.code}`,
      context: `Claim & Reflection · ${s.label}`,
      c: 'ink' as const,
      source: s.before.code,
      page: `${s.href}reflect-before/`,
      sections: [
        {
          id: 'position',
          title: `${before.position.n} · ${before.position.name}`,
          lead: before.position.intro,
          fields: [
            ...before.position.fields.map((f) => t(f.toLowerCase().replace(/\s+/g, '-'), f)),
            { kind: 'choice' as const, id: 'used', label: before.position.usedAsk, options: before.position.used },
            t('because', before.position.because, undefined, 2),
            t('also', before.position.also, undefined, 3),
          ],
        },
        {
          id: 'prediction',
          title: `${before.prediction.n} · ${before.prediction.name}`,
          lead: `${before.prediction.lead} ${s.before.predict}`,
          fields: before.prediction.asks.map((q, i) => t(`q${i + 1}`, q, undefined, 3)),
        },
      ],
      complete: true,
    },
    {
      id: `reflection/after/${s.id}`,
      title: `After Component ${s.n} · ${s.after.code}`,
      context: `Claim & Reflection · ${s.label}`,
      c: 'ink' as const,
      source: s.after.code,
      page: `${s.href}reflect-after/`,
      sections: [
        { id: 'stanza', title: `${after.stanza.n} · ${after.stanza.name}`, lead: `${after.stanza.lead} ${after.stanza.body}`, fields: [t('text', 'Your stanza', undefined, 6)] },
        { id: 'redaction', title: `${after.redaction.n} · ${after.redaction.name}`, lead: after.redaction.body, fields: [t('left', after.redaction.write, undefined, 4)] },
        {
          id: 'unknown',
          title: `${after.unknown.n} · ${after.unknown.name}`,
          lead: after.unknown.body,
          fields: [t('looked', after.unknown.write[0], undefined, 2), t('because', after.unknown.write[1], undefined, 2)],
        },
      ],
      complete: true,
    },
  ]),
  ...lookBack.map((p): FillTemplate => {
    const base = { id: `reflection/look-back/${p.slug}`, title: `${p.title} · ${p.code}`, context: 'Claim & Reflection · Look back', c: 'ink' as const, source: p.code, page: `${R}${p.slug}/`, complete: true };
    if (p.slug === 'summarise')
      return {
        ...base,
        sections: [
          { id: 'surprise', title: `${summarise.surprise.n} · ${summarise.surprise.name}`, lead: summarise.surprise.ask, fields: [t('text', 'What surprised you', undefined, 4)] },
          { id: 'mundane', title: `${summarise.mundane.n} · ${summarise.mundane.name}`, lead: summarise.mundane.ask, fields: [t('text', 'What moved things', undefined, 4)] },
          { id: 'compass', title: `${summarise.compass.n} · ${summarise.compass.name}`, lead: summarise.compass.intro, fields: summarise.compass.lines.map((l, i) => t(`l${i + 1}`, l, undefined, 2)) },
        ],
      };
    if (p.slug === 'wheel')
      return {
        ...base,
        sections: [
          {
            id: 'wedges',
            title: 'The wheel',
            lead: `${wheel.how} Suggested dimensions: ${wheel.suggested.join(', ')}.`,
            fields: [
              {
                kind: 'repeat',
                id: 'd',
                label: 'Dimensions',
                itemLabel: 'Dimension',
                start: 6,
                fields: [
                  t('name', 'Dimension', 'Language'),
                  { kind: 'choice', id: 'depth', label: 'How far in did you go?', options: ['Not reached', ...wheel.rings.map((r) => `${r.name}: ${r.means}`)] },
                ],
              },
            ],
          },
          {
            id: 'question',
            title: `${wheel.question.n} · ${wheel.question.name}`,
            fields: [t('missing', wheel.question.ask, undefined, 3), t('why', wheel.question.then, undefined, 3)],
          },
        ],
      };
    return {
      ...base,
      sections: [
        { id: 'skipped', title: `${consequences.skipped.n} · ${consequences.skipped.name}`, lead: consequences.skipped.ask, fields: [t('text', 'What you would have missed, and what it would have cost', undefined, 4)] },
        { id: 'again', title: `${consequences.again.n} · ${consequences.again.name}`, lead: consequences.again.ask, fields: [t('who', consequences.again.write[0]), t('how', consequences.again.write[1], undefined, 3)] },
        {
          id: 'pluriverse',
          title: `${consequences.pluriverse.n} · ${consequences.pluriverse.name}`,
          lead: consequences.pluriverse.lead,
          fields: consequences.pluriverse.asks.map((q, i) => t(`q${i + 1}`, q, undefined, 3)),
        },
        { id: 'final', title: consequences.finalCheck.lead, fields: [{ kind: 'flag', id: 'ok', label: consequences.finalCheck.lead, text: consequences.finalCheck.ask }] },
      ],
    };
  }),
];

// ---- Component 3 · The Meaning Card (templates/meaning-card-fields.json), one card per moment

type CardField = { id: string; label: string; layout: string; hint?: string; options?: string[]; flagText?: string };
const cardField = (f: CardField): Field =>
  f.layout === 'choice'
    ? { kind: 'choice', id: f.id, label: f.label, options: f.options ?? [], hint: f.hint }
    : f.layout === 'flag'
      ? { kind: 'flag', id: f.id, label: f.label, text: f.flagText ?? f.label, hint: f.hint }
      : { kind: 'text', id: f.id, label: f.label, hint: f.hint, rows: f.layout === 'full' ? 2 : 1 };

export const meaningCardFill: FillTemplate = {
  id: 'language/meaning-card/cards',
  title: 'Meaning Cards',
  context: 'Component 3 · Tool 1 · Listen',
  c: 'c3',
  source: 'The Meaning Card',
  page: `${C3}meaning-card/`,
  complete: true,
  sections: [
    {
      id: 'cards',
      title: 'Your cards',
      lead: 'One card per moment. Write the exact words in the language they were said in. Use a code, never a name.',
      fields: [
        {
          kind: 'repeat',
          id: 'card',
          label: 'Meaning Cards',
          itemLabel: 'Meaning Card',
          start: 1,
          csv: true,
          fields: [
            { kind: 'note', text: 'Front · capture the moment' },
            ...(cardFields.front as CardField[]).map(cardField),
            { kind: 'note', text: 'Back · check it with the participant' },
            ...(cardFields.back as CardField[]).map(cardField),
          ],
        },
      ],
    },
  ],
};

export const allFills: FillTemplate[] = [...toolFills, ...reflectionFills, meaningCardFill];
export const fillById = Object.fromEntries(allFills.map((f) => [f.id, f])) as Record<string, FillTemplate>;

// Keep ids unique: they are the keys answers are saved under.
if (new Set(allFills.map((f) => f.id)).size !== allFills.length) throw new Error('fill: duplicate template id');
