// The Meaning-to-Interface process flow: entry step, three modules, and the loop.
// Source: the "Meaning-to-Interface Process Flow" FigJam board and the Language
// component write-up. Edit here and the home page updates.

export type ModuleId = 'context' | 'person' | 'interpret';

export type ProcessItem =
  | { kind: 'step'; text: string }
  | { kind: 'note'; label: 'Branch' | 'Optional'; text: string }
  | { kind: 'gate'; question: string; no: string; yes: string; tool: string };

export interface ProcessModule {
  id: ModuleId;
  number: 1 | 2 | 3;
  title: string;
  purpose: string;
  cadence: string;
  items: ProcessItem[];
}

export const entryStep = {
  title: 'Entry point',
  text: 'Set the research question, consent, and deletion rules.',
  detail:
    'Before any fieldwork, the team names what it is trying to learn, secures informed consent, and agrees how and when data will be deleted. This gates everything that follows.',
};

export const loopText = {
  label: 'New questions',
  text: 'Whatever a tested response raises is folded back into Module 1, so the process compounds across research cycles instead of resetting.',
};

export const modules: ProcessModule[] = [
  {
    id: 'context',
    number: 1,
    title: 'Understand the Context',
    purpose: 'Before talking to anyone one-on-one, build a picture of the setting itself.',
    cadence: 'Runs once per context or setting',
    items: [
      { kind: 'step', text: 'Spend time with a local guide and varied local people' },
      { kind: 'step', text: 'Notice routines, relationships, language, and communication' },
      { kind: 'step', text: 'Record possible meanings and their limits' },
      { kind: 'step', text: 'Write a researcher positionality note' },
      { kind: 'step', text: 'Build a provisional codebook, glossary, and interview guide' },
    ],
  },
  {
    id: 'person',
    number: 2,
    title: 'Understand the Person',
    purpose: 'One-on-one fieldwork, where individual meaning moments are captured as they happen.',
    cadence: 'Runs once per person or session',
    items: [
      { kind: 'step', text: 'Ask for consent to record audio and video' },
      { kind: 'step', text: 'Begin with daily life and recent stories, to put them at ease' },
      { kind: 'step', text: 'Notice a significant phrase, action (expression or gesture), or pause, and note it down' },
      {
        kind: 'note',
        label: 'Branch',
        text: 'If a heavy or hard-to-understand emotion, expression, or gesture comes up, probe it with visual metaphors or spoken idioms, then continue.',
      },
      { kind: 'step', text: 'Create a Meaning Card: what was said, what was observed, what is inferred' },
      { kind: 'step', text: 'Ask what the moment meant to them' },
      { kind: 'step', text: 'Record any correction, disagreement, or reaction' },
      {
        kind: 'note',
        label: 'Optional',
        text: 'Observe a task or service experience afterward, in the same manner, if needed.',
      },
    ],
  },
  {
    id: 'interpret',
    number: 3,
    title: 'Interpret and Apply',
    purpose: 'Raw field moments become validated meaning, then a tested design response.',
    cadence: 'Runs once per finding',
    items: [
      { kind: 'step', text: 'Transcribe key moments in the original language' },
      { kind: 'step', text: 'Thick translation: literal, context, alternatives' },
      { kind: 'step', text: 'Review with a local language collaborator' },
      { kind: 'step', text: 'Reverse thick translation: test with the audience' },
      {
        kind: 'gate',
        question: 'Is the meaning well supported?',
        no: 'Not yet: loop back to thick translation and re-check.',
        yes: 'Yes: store the de-identified pattern in the Expression Library.',
        tool: 'fidelity-protocol',
      },
      { kind: 'step', text: 'Turn the validated insight into a design hypothesis' },
      { kind: 'step', text: 'Create candidate wording or interaction' },
      { kind: 'step', text: 'Test in a different context: comprehension and use' },
      {
        kind: 'gate',
        question: 'Does it work for this audience?',
        no: 'No: revise the candidate wording or interaction and test again.',
        yes: 'Yes: store the tested response in the Design Language Library.',
        tool: 'language-lens-audit',
      },
    ],
  },
];

export const moduleById = Object.fromEntries(modules.map((m) => [m.id, m])) as Record<ModuleId, ProcessModule>;
