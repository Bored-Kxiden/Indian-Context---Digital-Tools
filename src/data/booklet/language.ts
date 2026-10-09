import type { Tool } from './types';

// Component 3 · Reading Language. Source: the final booklet, pages 3.01–3.24, merged with the
// site's earlier Meaning-to-Interface pages (the Meaning Card, the Physical Field Kit, the Fidelity
// Protocol, the Language Lens Audit, the two libraries and the methodology). One vocabulary now: the
// booklet's Before you start and Tools 1–5 replace the earlier Modules 1–3. Nothing from the earlier
// pages was dropped: each piece now sits under the tool it belongs to (see CONTEXT.md, D26).
// In the final booklet Translate has two parts: Part A, thick translation (3.09 example, 3.10 template)
// and Part B, reverse thick translation (3.11 example, 3.12 survey sheet, 3.13 tally and support check).
// Filled examples are illustrative (the booklet says so).

export const overview = {
  lead: 'Don’t only listen to what was said. Understand what was meant.',
  cover: { literal: '“The one above’s wish”', meant: '“It’s out of my hands now”' },
  builtFor: 'Built for research on first-generation Indian college students. Reusable for any cross-language qualitative research.',
  what: [
    'In India, people rarely mean exactly what the words say. A phrase can carry a different meaning depending on the language, the tone, the region, or a gesture that goes with it. If we only translate word for word, we lose all of that: rapport, tone, code-switching, and the gap between what someone says and what they mean.',
  ],
  thick: {
    title: 'Thick translation, not word-for-word.',
    body: 'Keep the context and the feeling along with the words. Then test the meaning with people, in both directions, before any of it reaches a screen.',
  },
  endProduct:
    'A glossary where every phrase has a literal meaning and an implied one. The difference between them is the useful part.',
  problems: [
    {
      title: 'Every finding looks equally certain',
      body: 'Nothing in a typical research pipeline marks whether a finding is what a person meant or one interpreter’s best guess. It travels with the same authority however many hops of translation or single-source judgment calls produced it.',
    },
    {
      title: 'Generic personas result',
      body: 'By the time a finding reaches a design team, meaning has quietly become approximation, and the interface gets built for an averaged, invented person rather than anyone real.',
    },
  ],
  loops: [
    { where: 'Kahavat Relay', text: 'Runs inside Listen when a meaning is hard to reach.' },
    { where: 'Meaning not yet supported?', text: 'Back to Translate.' },
    { where: 'Doesn’t work for this audience?', text: 'New wording, or new questions for Listen.' },
  ],
  worksWith: {
    title: 'Works with Reading Visual Culture',
    body: 'Words from photo talk-backs come here. Drawings from the Kahavat Relay go there.',
  },
  youNeed: 'Consent to record, a recorder, a local language collaborator, and time to go back to people.',
  shortOnTime: 'Short on time? Go straight to the templates (3.07, 3.10, 3.12–3.13, 3.16, 3.19, 3.22). Each has [bracketed] examples.',
  people: ['A recorder', 'A local language collaborator'],
  applies: [
    'Public-service and civic platforms in any linguistically diverse country',
    'Healthcare intake and patient-facing tools used with immigrant or refugee populations',
    'Financial-inclusion products, banking apps, and lending platforms',
    'E-commerce, delivery, and logistics across dialect-rich regions',
    'Humanitarian and NGO field tools in crisis zones with no shared language',
    'Enterprise software used by distributed teams working in a second or third language',
    'Voice assistants, IVR systems, and chatbots deployed far outside the dialect they were trained on',
  ],
  whereBody: [
    'The condition that makes this component necessary is simple: somewhere between the people building a product and the people using it, there is a language or meaning gap, and someone is bridging it by guesswork rather than a documented method.',
    'The common thread is a research or design team on one side of a language boundary and real users on the other, with no method in place for checking whether meaning crossed.',
  ],
  funnel:
    'Not every Meaning Card travels all the way to a shipped pattern. Many surface something useful without further action, a smaller number justify a design hypothesis, and fewer still become tested, library-worthy patterns. A “not yet” or a “no” at a decision point is the process doing its job.',
};

/** The route: Before you start, then the five tools. `sub` is the booklet's own short label. */
export const route = [
  {
    slug: 'before-you-start',
    label: 'Before you start',
    sub: 'the context',
    blurb: 'Understand the context first. Once per place, before Tool 1. It takes a few days.',
    time: 'A few days',
  },
  { slug: 'listen', label: '1 · Listen', sub: 'the person', blurb: 'What did they say, and what did they mean by it?', time: '60–90 min per person' },
  {
    slug: 'translate',
    label: '2 · Translate',
    sub: 'thick, both ways',
    blurb: 'What does it really mean, and do other people read it the same way? Thick translation, then reverse thick translation.',
    time: 'Part A 1 h · Part B a survey',
  },
  { slug: 'test', label: '3 · Test', sub: 'with the audience', blurb: 'Does our wording work for this audience?', time: '45 min + testing' },
  { slug: 'library', label: '4 · Library', sub: 'keep what works', blurb: 'How do we keep what we learned, so the next team can use it?', time: '20 min per entry' },
  {
    slug: 'kahavat-relay',
    label: '5 · The Kahavat Relay',
    sub: 'runs inside Listen',
    blurb: 'When words won’t reach a meaning, can a drawing?',
    time: '10 min per person',
  },
];

/**
 * Reverse thick translation: the check that closes the loop on a translation. It is the centre of
 * Tool 2. The three directions and their prompts are from the booklet's Translate pages; the
 * reasons each one is asked, the small signals and the glossary are from the earlier methodology
 * page.
 */
export const reverseThickTranslation = {
  title: 'Reverse thick translation',
  line: 'Translate thickly. Then check it the other way, with the people the words came from.',
  why: [
    'Thick translation records what you think the words mean: the literal meaning, the context, and the alternatives, reviewed by a local language collaborator. Reverse thick translation tests that reading with the audience. It looks for the gap between what the words literally say and what people actually understand.',
    'A translation only counts once it has been checked in both directions. Until then it is one reader’s best reading, however fluent that reader is.',
  ],
  loop: [
    { step: 'Thick translation', note: 'Part A: literal, in context, alternatives, implied, reviewed by a collaborator.' },
    { step: 'Collaborator review', note: 'A local language collaborator reads it.' },
    { step: 'Reverse thick translation', note: 'Part B: a survey in three directions, with 6–8 people from the same audience.', hot: true },
    { step: 'Support check', note: 'Four parts, all needed.' },
  ],
  survey: [
    'Pick 6–8 people from the same audience, not the original speaker.',
    'Run directions 1 and 2 with everyone, and 3 with the regional speakers.',
    'Record exactly what they say, plus tone and small signals. One survey sheet each, read aloud when needed.',
    'Tally: implied, literal only, or something else.',
    'Run the support check. Store it, or go back to Part A.',
  ],
  directions: [
    {
      n: 1,
      title: 'Their language → meaning',
      script: 'Show the phrase in their language. Ask: “What does it literally say? What would someone mean by it? How would they sound?”',
      shows: 'Whether people read the implied meaning you wrote, or only the literal one, and in what tone.',
      example: '“It’s out of my hands now” (5) · “The officials will decide” (2) · only the literal, “God’s wish” (1)',
    },
    {
      n: 2,
      title: 'English → their language',
      script: 'Show the English text, such as a phrase from the product: “Your application is under review.” Ask: “What does this mean to you? Say it the way you’d say it to a friend.”',
      shows: 'How English-based design actually lands on the people using it.',
      example: '“Abhi check ho raha hai” · “Pending mein hai” · “Upar gaya hai” (it’s gone up): the same unseen authority again',
    },
    {
      n: 3,
      title: 'Standard → regional',
      script: 'Only if relevant. Show the regional version from your collaborator. Ask: “Does this mean the same to you? Does it sound the same?”',
      shows: 'The same word can mean something different, or sound different, from one place to the next, even within one language.',
      example: '[Same meaning: n] · [Different meaning or tone: n] · [what changed in the region: a word, the tone, the respect level]',
    },
  ],
  record:
    'Note what people said and how many of how many said it, and what shifts from one direction to the next. Where the three directions agree, the reading holds. Where they don’t, the difference is the finding.',
  signals: {
    title: 'Small signals count',
    body: 'The survey also captures the small signals that ordinary surveys ignore but that carry real meaning: exclamations such as “arre” (अरे) or “haye”, the tone someone uses, and gestures. Write them next to the exact words, not in a footnote.',
  },
  reading: [
    {
      title: 'Supported',
      body: 'The directions agree and all four support-check parts are recorded. Store it: the de-identified pattern goes in the Expression Library (Tool 4), and the wording goes on to Test.',
    },
    {
      title: 'Split',
      body: 'People read it different ways. Store it with the alternatives.',
    },
    {
      title: 'Not yet',
      body: 'Note what shifted, and go back to Part A for another look. Meaning not yet supported? Back to Translate.',
    },
  ],
  glossary: {
    title: 'What comes out: a glossary entry',
    body: 'For each phrase, two things are recorded: the literal meaning (the plain translation of what was said) and the implied meaning (the equivalent that captures what the person really meant, including tone and feeling). The gap between the two is the useful part. It shows designers exactly where something can look clear on screen but mean something else to the person reading it.',
    caption: 'Illustrative glossary entries (examples, not real participant data)',
    rows: [
      {
        phrase: 'Arre, fees maangenge kya?',
        literal: 'Oh, will they ask for fees?',
        implied: 'Alarm. Money requested inside an official flow reads as a possible scam.',
      },
      {
        phrase: 'Haye, ab phir se sab documents?',
        literal: 'Oh no, all the documents again?',
        implied: 'Fatigue and exasperation at repeated requests. Burden, not confusion.',
      },
    ],
  },
};

/** Before you start (page 3.03), with the team from the earlier methodology page. */
export const beforeYouStart = {
  lead: 'Understand the context first.',
  intro:
    'Do this once per place, before Tool 1. It takes a few days. Skipping it is how researchers end up translating their own assumptions.',
  steps: [
    {
      title: 'Set the research question, consent and deletion rules',
      body: 'What you will record, who can hear it, and when it gets deleted.',
    },
    {
      title: 'Spend time with a local guide and varied local people',
      body: 'Before any interview. Listen to how people talk to each other.',
    },
    {
      title: 'Notice routines, relationships, language, communication',
      body: 'Who speaks first? Which language is used for what?',
    },
    {
      title: 'Record possible meanings and their limits',
      body: 'Write down what a phrase might mean, and what you can’t know yet.',
    },
    {
      title: 'Write your positionality note',
      body: 'Below. Your language, your background, what you might mishear.',
    },
    {
      title: 'Build a provisional codebook, glossary and interview guide',
      body: 'Provisional means it will change after Tool 2.',
    },
  ],
  gate: {
    title: 'The first step is not optional',
    body: 'Before any fieldwork, name what you are trying to learn, secure informed consent, and agree how and when data will be deleted. Skipping it does not save time. It moves the cost downstream, usually into a re-check that could have been avoided.',
  },
  team: {
    title: 'Who you need',
    lead: 'Using this component starts with team composition, not process.',
    people: [
      { name: 'A lead researcher', body: 'Owns the research question and the process, and runs the primary interviews.' },
      { name: 'A local language collaborator', body: 'An interpreter who is not the same person doing the primary interviewing.' },
      {
        name: 'A second independent reader',
        body: 'Wherever possible, someone who can confirm or contest a translation before it is trusted. One person’s read, however fluent, is still one person’s read.',
      },
    ],
    budget:
      'Budget for at least one full loop before expecting stable, library-ready patterns, and treat both libraries as living references that keep growing for as long as the product keeps shipping to real people.',
  },
  glossaryColumns: ['Word or phrase, as heard', 'Might mean', 'Can’t know yet'],
  image: '3.03',
  alt: 'The Before you start page: six things to do once per place before Tool 1 (set the research question, consent and deletion rules; spend time with a local guide; notice routines, relationships, language and communication; record possible meanings and their limits; write your positionality note; build a provisional codebook, glossary and interview guide), a positionality note with five prompts, and a provisional glossary with three columns.',
  pdf: 'c3-before-you-start.pdf',
  printed: 'p.3.03',
};

/** The booklet's "I want to…" style lines are ours for Component 3 (the booklet has none). */
export const tools: Tool[] = [
  {
    component: 'language',
    slug: 'listen',
    short: 'Listen',
    number: 1,
    of: 5,
    name: 'Listen',
    question: 'What did they say, and what did they mean by it?',
    time: '60–90 min per person',
    group: 'Researcher + note-taker',
    effort: 3,
    mode: 'Field',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real words, written in the language they were said in, with consent.',
    shows: 'The moments where words, voice and body don’t match, and what the person says those moments meant.',
    done: 'Every marked moment has a Meaning Card, and the person has corrected or confirmed it.',
    whatIsIt: [
      'Read six cue cards before the interview. During it, mark only symbols and three words. Start with daily life, not the task. When something significant happens, make a Meaning Card: what was said, what you saw, what you think. Then ask them what it meant, and write down their correction.',
    ],
    words: [
      { term: 'Cue', def: 'A signal beyond words: a pause, a switch of language, a glance.' },
      { term: 'Log', def: 'Symbols and three words only. No meaning during the interview.' },
      { term: 'Meaning Card', def: 'Said · Observed · Inferred, plus their own correction.' },
      { term: 'Probe', def: 'Hard to explain? Try a drawing or an idiom (Tool 5).' },
    ],
    extras: [
      {
        title: 'Optional: watch a task afterwards',
        body: 'If you need to, observe a task or service experience afterwards, in the same way: log the cues, make a Meaning Card for each moment, and ask what it meant.',
      },
    ],
    refs: [
      {
        label: 'The Meaning Card, field by field',
        href: '/components/language/meaning-card/',
        blurb: 'Every field on the front and back, including the flags for a translation review and for anything sensitive to reuse.',
      },
      {
        label: 'The Physical Field Kit',
        href: '/components/language/physical-field-kit/',
        blurb: 'Printable Context, Interview and Reflection cards, the positionality card, and blank Meaning Cards.',
      },
    ],
    need: 'Consent to record, the cue cards (p.3.05), a printed log, your provisional glossary',
    endUp: 'Meaning Cards and key moments to transcribe, for Tool 2',
    guidePage: '3.04',
    parts: [
      {
        id: 'prime',
        label: 'Part A',
        title: 'Prime: six cue cards',
        example: {
          page: '3.05',
          alt: 'Prime: six cue cards, to read once before the session. Body and posture; pause and silence; language switching; social dynamics; voice and tone; objects and environment. Each has what to notice and a question to ask yourself. Below them, the log symbols: body, pause, switch, gaze, object, voice, deflect and avoided.',
          note: 'A print sheet, not a filled example. Read it once before the session and keep it beside you.',
        },
        blank: {
          page: '3.05',
          alt: 'The cue-card page, to print and keep beside you.',
          pdf: 'c3-listen-cue-cards.pdf',
          printed: 'p.3.05',
          skip: true,
          downloadTitle: 'Listen · Prime: six cue cards (print sheet)',
          downloadNote: 'Read once before the session and keep beside you. Not a form to fill in.',
        },
        steps: [
          'Read the six cards once before the session.',
          'During the session, don’t interpret.',
          'Mark what you notice with a symbol from the log.',
        ],
      },
      {
        id: 'log',
        label: 'Part B',
        title: 'Log + Meaning Card',
        example: {
          page: '3.06',
          alt: 'Filled example: a log excerpt and a Meaning Card from Meera’s interview. The log has four rows, each a symbol, three words and what triggered it: a switch from Hindi to English (“pending”, “status”) when asked about the result; a 6-second pause before “Papa ka phone” when asked who gets the OTP; a voice that drops on “upar wale ki marzi” when asked what happens next; and a look at her roommate before answering about the café. The Meaning Card for the voice drop has Said (“Form toh bhar diya, ab upar wale ki marzi.”), Observed (voice drops, looks at the floor, laughs once), Inferred (she feels she has no control over the result; maybe also: officials, not God), what the moment meant to her (“Not God exactly. Whoever checks it. I don’t know who that is.”) and her correction: “upar wale” here means an unknown official, not God. Send to Tool 2.',
          note: 'Illustrative example. Always record the phrase in the language it was said in.',
        },
        blank: {
          page: '3.07',
          alt: 'Blank log and Meaning Card: fields for participant code, date and place, languages in use and who else is present; a log table with symbol, cue, three-word quick log and what triggered it; and a Meaning Card to cut out, one per moment, with said (in their language), observed, inferred, what did that moment mean to you, and their correction or disagreement.',
          pdf: 'c3-listen-log-meaning-card-blank.pdf',
          printed: 'p.3.07',
        },
        steps: [
          'Start with daily life. Let them get comfortable.',
          'Mark cues with a symbol and three words.',
          'Pick the strongest moments. Make a Meaning Card.',
          'Ask what the moment meant to them.',
          'Write their correction, even if it disagrees with you.',
        ],
      },
    ],
  },
  {
    component: 'language',
    slug: 'translate',
    short: 'Translate',
    number: 2,
    of: 5,
    name: 'Translate',
    kind: 'Thick, both ways',
    question: 'What does it really mean, and do other people read it the same way?',
    time: 'Part A 1 h · Part B a survey',
    group: 'With a language collaborator',
    effort: 3,
    mode: 'Desk, then field',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real words, written in the language they were said in, with consent.',
    shows: 'The literal meaning, the implied meaning, and whether people from the same audience read it the same way.',
    done: 'The phrase has been read back by other people, and it passes all four support checks, or it goes round again.',
    whatIsIt: [
      'Part A · Thick translation: write the phrase as it was said, then its literal meaning, its meaning in context, alternatives and what it implies. A local collaborator reviews it.',
      'Part B · Reverse thick translation: take it back to other people from the same audience in a short survey, in three directions, and see if they read the meaning you wrote. Only then run the support check. This is the centre of the tool, and it has its own tab: “Reverse thick translation”.',
    ],
    words: [
      { term: 'Literal meaning', def: 'A plain English translation of the words.' },
      { term: 'Implied meaning', def: 'What the person really meant, including tone and feeling. The gap between the two is the useful part.' },
      { term: 'Reverse thick translation', def: 'Checking your reading with new people, not the person who said it.' },
      { term: 'Three directions', def: 'Their language → meaning · English → their language · standard → regional.' },
      { term: 'Small signals', def: '“Arre”, “haaye”, a laugh, a tone. Normal surveys drop these; record them.' },
      { term: 'Support check', def: 'Four things that must be true before you store a meaning.' },
    ],
    extras: [],
    panels: [{ id: 'reverse', label: 'Reverse thick translation', icon: 'translate', after: 'guide' }],
    refs: [
      {
        label: 'The Fidelity Protocol',
        href: '/components/language/fidelity-protocol/',
        blurb: 'The four support-check tags in full, the rule behind them, and a checker you can try in your browser.',
      },
    ],
    need: 'Recordings and Meaning Cards from Tool 1, a collaborator, 6–8 people from the same audience for the survey',
    endUp: 'Glossary entries with literal and implied meanings, checked by other people, for Tool 3',
    guidePage: '3.08',
    parts: [
      {
        id: 'thick',
        label: 'Part A',
        title: 'Thick translation',
        example: {
          page: '3.09',
          alt: 'Worked example of thick translation: “Form toh bhar diya, ab upar wale ki marzi” (फ़ॉर्म तो भर दिया, अब ऊपर वाले की मर्ज़ी), as said. Literal: “I’ve filled the form, now it’s the wish of the one above.” In context: she has done her part; the outcome is decided somewhere she can’t see or reach. Alternatives: “It’s in God’s hands”, “It’s up to the officials now”, “Nothing more I can do”. Implied: loss of control, and not knowing who decides; resigned, with a little humour. Signals: a short laugh before “marzi”; her voice drops. Reviewed by a local language collaborator (Hindi, Bhojpuri), who added the “officials” reading. Literal versus implied, the useful part: literally it’s about God; what she meant is an unknown official deciding her fate. Take to Part B: is “out of my hands, and I don’t know who decides” what other students hear too?',
          note: 'Illustrative example.',
        },
        blank: {
          page: '3.10',
          alt: 'Thick-translation template with examples in [brackets]: from Meaning Card no., languages spoken and region; as said (in their language and script, exactly as said), literal (word for word), in context, alternatives, implied (what they really meant, with tone and feeling), signals (arre, haaye, a laugh, a tone), reviewed by, and the sentence “Literally it means [God’s wish], but they meant [an unknown official decides]”, then the question to test in Part B: do other people hear the same thing?',
          pdf: 'c3-translate-blank.pdf',
          printed: 'p.3.10',
        },
        steps: [
          'Transcribe the moment in the original language and script.',
          'Write the literal meaning, word for word.',
          'Add context, alternatives, and the implied meaning.',
          'Note small signals: exclamations, laughs, tone.',
          'A local collaborator reviews it. Then go to Part B.',
        ],
      },
      {
        id: 'reverse',
        label: 'Part B',
        title: 'Reverse thick translation',
        example: {
          page: '3.11',
          alt: 'Worked example of reverse thick translation: 8 first-generation students from the same colleges, not Meera. One survey sheet each (p.3.12), read aloud when needed. Directions 1 and 2 with everyone; direction 3 with the regional speakers. Direction 1, their language to meaning: shown “ऊपर वाले की मर्ज़ी”; most hear the implied meaning (“It’s out of my hands now”, 5; “The officials will decide”, 2; only the literal “God’s wish”, 1) and two point at officials, not God. Direction 2, English to their language: shown “Your application is under review.”; answers are “Abhi check ho raha hai”, “Pending mein hai” (3) and “Upar gaya hai” (it’s gone up) (1), so “under review” becomes “gone up”: the same unseen authority again. Direction 3, standard to regional: [same meaning: n], [different meaning or tone: n], [what changed in the region]. Small signals across all surveys: “arre” × 3 (frustration), “haaye” × 1 (resignation), laughed × 2 before the phrase, tone mostly resigned, 2 joking. Support check, all four needed, ticked: source language (Hindi–English mix, recorded as said), who interpreted (local collaborator), rendering (conceptual gloss), more than one source (yes, 8 people read it back). Supported: store it, and add “officials” as an alternative. The glossary entry for the Expression Library: ऊपर वाले की मर्ज़ी; literal, the wish of the one above; implied, it’s out of my hands and I don’t know who decides; signals, resigned, a short laugh; read back by 8 people, 7 agree.',
          note: 'Illustrative example. Counts are invented to show the method; [brackets] are for your own data.',
        },
        blank: {
          page: '3.13',
          alt: 'Tally and support-check template with examples in [brackets]: for each of the three directions, tick boxes for read the implied meaning, only the literal meaning, and something else (write it), and what shifted; small signals across all sheets (“arre” × 3, frustration; laughed × 2); the support check, tick all four or loop back (source language, who interpreted, rendering, more than one source?), with three outcomes: supported, store it; split, store with alternatives; not yet, back to Part A; and a glossary entry for the Expression Library (phrase, literal, implied, the difference, signals, read back by).',
          pdf: 'c3-translate-tally-blank.pdf',
          printed: 'p.3.13',
        },
        steps: [
          'Pick 6–8 people from the same audience, not the original speaker.',
          'Run directions 1 and 2 with everyone, and 3 with the regional speakers.',
          'Record exactly what they say, plus tone and small signals.',
          'Tally: implied, literal only, or something else.',
          'Run the support check. Store it, or go back to Part A.',
        ],
      },
      {
        id: 'survey',
        label: 'Part B · sheet',
        title: 'Survey sheet · one per person',
        example: {
          page: '3.12',
          alt: 'The survey sheet, one per person, to print and read aloud when needed. Languages spoken at home, district or region, code (no names), age band and consent to take part and be recorded. Direction 1, their language to meaning: show the phrase in their language; what does it say, word for word; if someone said this to you, what would they mean; how would they sound (calm, worried, joking, resigned, annoyed, respectful, other). Direction 2, English to their language: show the English text; what does this mean to you, say it the way you’d say it to a friend; how would they sound. Direction 3, standard to regional, only if relevant: show the regional version from your language collaborator; does it mean the same here, does it sound the same, what changes; how would they sound. Then small signals, written exactly, and a researcher note on who else was present.',
          note: 'A print sheet, not a filled example. Print one per person and read it aloud when needed.',
        },
        blank: {
          page: '3.12',
          alt: 'The survey sheet, to print.',
          pdf: 'c3-translate-survey-sheet.pdf',
          printed: 'p.3.12',
          shared: true,
          downloadTitle: 'Translate · Part B · Survey sheet (print + read aloud)',
          downloadNote: 'One per person. Show the phrase, read the questions aloud when needed, and write what they say exactly.',
          sharedNote: 'On p.3.12 of the booklet, the survey sheet is printed once per person and read aloud when needed. The download is that page.',
        },
        steps: [
          'Print one sheet for each person you survey.',
          'Show the phrase in each direction, and read the questions aloud when needed.',
          'Write what they say exactly, in the language they say it in.',
          'Note how they sound, and any small signals.',
        ],
      },
    ],
  },
  {
    component: 'language',
    slug: 'test',
    short: 'Test',
    number: 3,
    of: 5,
    name: 'Test',
    question: 'Does our wording work for this audience?',
    time: '45 min + testing',
    group: 'Team, then with people',
    effort: 3,
    mode: 'Desk, then field',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real words, written in the language they were said in, with consent.',
    shows: 'Whether new wording is understood, can be used through a helper, and reads as trustworthy.',
    done: 'The wording passed all three lenses with the named audience, or went back for a rewrite.',
    whatIsIt: [
      'Turn a supported meaning into a design hypothesis and a candidate wording. Check it against three lenses. Then test it with real people, in a different context from where you heard it. If it fails, rewrite, or take new questions back to Tool 1.',
    ],
    words: [
      { term: 'Hypothesis', def: '“If we say ___, then ___ will happen.”' },
      { term: 'Lens N · New', def: 'Works for someone who has never filled this exact form? (The form’s own words: nomenclature.)' },
      { term: 'Lens P · Proxy', def: 'Still works read aloud by a CSC operator or a family member?' },
      { term: 'Lens T · Trust', def: 'Reads as official to someone primed to suspect a scam?' },
      { term: 'This audience', def: 'A named segment, never a generic user.' },
    ],
    extras: [],
    refs: [
      {
        label: 'The Language Lens Audit',
        href: '/components/language/language-lens-audit/',
        blurb: 'Each lens in depth: what to look for, when it fails, and how to run an audit on portal or interface copy.',
      },
    ],
    need: 'A supported glossary entry from Tool 2, the screen you want to change',
    endUp: 'Tested wording, ready for the Design Language Library',
    guidePage: '3.14',
    parts: [
      {
        id: 'lenses',
        label: 'Part A',
        title: 'Candidate wording + three lenses',
        example: {
          page: '3.15',
          alt: 'Filled example: rewriting “Status: Pending”. The hypothesis is that if the status names who is holding the application and for how long, students will stop reading “pending” as fate. The candidate is “Your college is checking your documents · day 3 of 15”, with the Hindi beside it (आपका कॉलेज आपके दस्तावेज़ जाँच रहा है · दिन 3 / 15). Three lenses for first-generation students applying on a phone: N, new (understood “college is checking”), P, proxy (her father repeated it correctly over the phone) and T, trust (the “Call your college” link looked like a scam, so it was removed). Tested in a hostel common room with 6 students and 2 fathers by phone. Result: round 2 passed all three lenses; store in the Design Language Library.',
          note: 'Illustrative example. Check any translated UI copy with a native speaker before testing.',
        },
        blank: {
          page: '3.16',
          alt: 'Test template, with examples in [brackets]: a hypothesis (“If we say ___, then ___ will happen”), the wording now and the candidate in every language, this audience, the three lenses N, P and T with what each asks, where and with whom it was tested, and the result: store, rewrite, or new questions.',
          pdf: 'c3-test-blank.pdf',
          printed: 'p.3.16',
        },
        steps: [
          'Write the hypothesis in one sentence.',
          'Write candidate wording, in each language.',
          'Check it against lenses N, P and T.',
          'Test with the named audience, somewhere new.',
          'Fails? Rewrite. New questions? Back to Tool 1.',
        ],
      },
    ],
  },
  {
    component: 'language',
    slug: 'library',
    short: 'Library',
    number: 4,
    of: 5,
    name: 'Library',
    question: 'How do we keep what we learned, so the next team can use it?',
    time: '20 min per entry',
    group: 'Whole team',
    effort: 1,
    mode: 'Desk',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real words, written in the language they were said in, with consent.',
    shows: 'A growing record of how people really speak, and which interface words have been tested with whom.',
    done: 'Every supported phrase and every tested wording has an entry, with its evidence and its limits.',
    whatIsIt: [
      'Two libraries. The Expression Library keeps supported meanings, de-identified. The Design Language Library keeps interface wording that passed testing. Together they are the start of a language system: like a design system, but for words.',
    ],
    words: [
      { term: 'Expression Library', def: 'How people say things, with literal and implied meanings.' },
      { term: 'Design Language Library', def: 'Tested interface wording, per language and audience.' },
      { term: 'De-identified', def: 'No names, no details that point to one person.' },
      { term: 'Don’t use for', def: 'Where this wording or reading does not hold.' },
    ],
    extras: [],
    refs: [
      {
        label: 'The Expression Library',
        href: '/components/language/expression-library/',
        blurb: 'Browse and filter supported meanings, with the four fidelity tags on each entry, and how to add one.',
      },
      {
        label: 'The Design Language Library',
        href: '/components/language/design-language-library/',
        blurb: 'Tested wording and interaction patterns, each citing the Expression Library entries that justify it.',
      },
    ],
    need: 'Supported entries from Tool 2 and tested wording from Tool 3',
    endUp: 'Library entries your whole team, and the next project, can reuse',
    guidePage: '3.17',
    parts: [
      {
        id: 'entries',
        label: 'Part A',
        title: 'Two linked entries',
        example: {
          page: '3.18',
          alt: 'Filled example: two linked entries. Expression Library EX-014: “upar wale ki marzi” (ऊपर वाले की मर्ज़ी), Hindi used inside Hinglish speech; literally, the wish of the one above; implied, out of my hands and I don’t know who decides; heard when waiting on an institution after submitting; evidence: 3 participants, collaborator and second reader, supported; don’t use for religious meaning in every context, ask first. Design Language Library DL-031: the moment is application status after submitting; it replaces “Status: Pending”; English “Your college is checking your documents · day 3 of 15” and its Hindi; tested with first-generation students on phones and fathers by phone; lenses N, P and T all passed in round 2; linked to EX-014, tone: calm, specific, no urgency. A note says it grows into a language system: group tested entries by moment (errors, waiting, success) and by voice (how formal, how warm), like components in a design system.',
          note: 'Illustrative example.',
        },
        blank: {
          page: '3.19',
          alt: 'Blank library entries to print, cut out and file, two of each: an Expression Library entry (expression, language, literal, implied, heard when, evidence, don’t use for) and a Design Language entry (moment, replaces, English, language 2, tested with, lenses N P T, linked to).',
          pdf: 'c3-library-entries-blank.pdf',
          printed: 'p.3.19',
          note: 'Print, cut out and file. Or copy the fields into a shared spreadsheet.',
        },
        steps: [
          'Supported meaning? Write an Expression entry.',
          'Remove names and identifying details.',
          'Tested wording? Write a Design Language entry.',
          'Link the two entries.',
          'Say where each one does not hold.',
        ],
      },
    ],
  },
  {
    component: 'language',
    slug: 'kahavat-relay',
    short: 'Kahavat Relay',
    number: 5,
    of: 5,
    name: 'The Kahavat Relay',
    kind: 'Uses Components 2 + 3',
    question: 'When words won’t reach a meaning, can a drawing?',
    time: '10 min per person',
    group: '3–5 people, one after another',
    effort: 1,
    mode: 'Field or workshop',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real words, written in the language they were said in, with consent.',
    shows: 'How a meaning travels from person to person: what survives, what shifts, and what gets added.',
    done: 'The chain has at least three rounds, and you have compared the first line with the last.',
    whatIsIt: [
      'Give the first person a kahavat (a spoken idiom). They draw what it means to them, as a moment from their own life, and write one line in their own language. The next person sees only the drawing. They say what is happening, write their own line, and draw their version. Keep passing it on.',
      'It runs inside Listen when a meaning is hard to reach: when a heavy or hard-to-understand emotion, expression or gesture comes up, probe it with a drawing or a spoken idiom, then carry on.',
    ],
    words: [
      { term: 'Kahavat', def: 'A spoken idiom, like “ek anaar, sau beemar”.' },
      { term: 'Drawn metaphor', def: 'Their picture of the idiom, as a moment from their life.' },
      { term: 'Own-language line', def: 'One sentence, in any language or script they choose.' },
      { term: 'Chain', def: 'Each drawing becomes the prompt for the next person.' },
    ],
    extras: [
      {
        title: 'Feeds Reading Visual Culture',
        body: 'Each drawing is a participant-made image. Read it in Visual culture · Read, tagged Reported.',
      },
      {
        title: 'Feeds Tool 2 · Translate',
        body: 'Each own-language line gets a thick translation.',
      },
    ],
    need: 'Idiom cards (p.3.23), relay sheets (p.3.22), pens, consent to share drawings',
    endUp: 'Drawings for Reading Visual Culture, own-language lines for Tool 2, and new questions for Tool 1',
    guidePage: '3.20',
    parts: [
      {
        id: 'relay',
        label: 'Part A',
        title: 'One anaar, three people',
        example: {
          page: '3.21',
          alt: 'Filled example: the idiom card “Ek anaar, sau beemar” (एक अनार, सौ बीमार): one pomegranate, a hundred sick. Round 1, Meera, sees the idiom card and draws a phone marked OTP with lines to many people, and writes “Ek hi phone hai ghar mein, sabka OTP usi par aata hai” (एक ही फ़ोन है घर में, सबका OTP उसी पर आता है): there’s only one phone at home, everyone’s OTP comes to it. Round 2, who sees only drawing 1, draws one thing with many people after it and writes “Sab ek hi cheez ke peechhe lage hain” (सब एक ही चीज़ के पीछे लगे हैं): everyone is after the same one thing. Round 3, who sees only drawing 2, draws people standing in a numbered line and writes “Line mein lago, baari aayegi tab” (लाइन में लगो, बारी आएगी तब): stand in line, your turn will come. Survived: one resource, too many people. Shifted: from who owns the phone to who waits for it. Added: turn-taking and time. Design question: does the product assume one person, one phone, and what happens to OTP timing when it is shared?',
          note: 'Illustrative example. Lines are shown in Hindi; participants write in whatever language and script they choose.',
        },
        blank: {
          page: '3.22',
          alt: 'Relay sheet, with examples in [brackets]: an idiom card and topic, three rounds each with a code, what that person sees, a space to draw and one line in their own language, then survived, shifted, added, and a design question. Fold the sheet so the next person sees only the last drawing.',
          pdf: 'c3-relay-sheet-blank.pdf',
          printed: 'p.3.22',
          note: 'Fold the sheet so the next person sees only the last drawing. Never show them the idiom or the earlier lines.',
        },
        steps: [
          'First person gets an idiom card. Ask: when has this happened to you?',
          'They draw it as their own moment, and write one line.',
          'Next person sees only the drawing. What is happening?',
          'They write a line and draw their own version. Repeat.',
          'Compare first and last: survived, shifted, added.',
        ],
      },
      {
        id: 'cards',
        label: 'Part B',
        title: 'Idiom cards',
        example: {
          page: '3.23',
          alt: 'Idiom cards to print and cut: six Hindi examples, each with the idiom in Devanagari and in Latin script, what it literally says, what it usually means and the question “When has this happened to you?”. Ek anaar, sau beemar (one pomegranate, a hundred sick); Oont ke munh mein jeera (a cumin seed in a camel’s mouth); Naach na jaane, aangan tedha (can’t dance, blames the crooked courtyard); Door ke dhol suhaavne (distant drums sound sweet); Aasmaan se gira, khajoor mein atka (fell from the sky, stuck in a date palm); Jitni chaadar, utne pair pasaaro (stretch your legs only as far as the sheet). Below them, three blank cards for idioms from the participants’ own language.',
          note: 'A print sheet, not a filled example. Print it and cut along the dashed lines.',
        },
        blank: {
          page: '3.23',
          alt: 'Three blank idiom cards for a kahavat from the participants’ own language, what it usually means, and the question “When has this happened to you?”.',
          pdf: 'c3-relay-idiom-cards.pdf',
          printed: 'p.3.23',
          shared: true,
          downloadTitle: 'Kahavat Relay · Idiom cards (print sheet)',
          downloadNote: 'Six filled Hindi idiom cards and three blanks for idioms from your participants’ own language. Print and cut along the dashed lines.',
          sharedNote:
            'On p.3.23 of the booklet, the six filled idiom cards sit above three blanks for idioms from your participants’ own language. Print the page and cut along the dashed lines. The download is that page.',
        },
        steps: [
          'Print the page and cut along the dashed lines.',
          'Use the six Hindi examples, or better, idioms from your participants’ own language.',
          'Check each meaning with your language collaborator.',
          'Don’t explain the meaning to the first person unless they ask.',
        ],
      },
    ],
  },
];

/** Page 3.24, the closing "Is it working?" for the whole component. */
export const closing = {
  good: [
    'A participant corrected your Meaning Card, and the correction changed your reading.',
    'The literal and implied meanings in your glossary are clearly different.',
    'A relay chain drifted, and the drift told you something the first person never said.',
    'Your tested wording failed a lens at least once before it passed.',
  ],
  warnings: [
    {
      sign: 'Every phrase is written only in English.',
      fix: 'Go back to the recording. Keep the original language and script.',
    },
    {
      sign: 'Nobody but you interpreted anything.',
      fix: 'It is single-source. Find a language collaborator before you store it.',
    },
    {
      sign: '“This audience” means “users”.',
      fix: 'Name the segment: who, what device, who reads it to them.',
    },
    {
      sign: 'The relay’s next person knew the idiom.',
      fix: 'The chain is broken. Fold the sheet; show only the last drawing.',
    },
  ],
  handOffs: [
    { to: '1 · Existing Products', href: '/components/existing-products/', ask: 'Which screens use words people read differently?' },
    { to: '2 · Visual Culture', href: '/components/visual-culture/', ask: 'Relay drawings as participant-made images.' },
    { to: '4 · Material Reality', href: '/components/material-reality/', ask: 'Who reads the screen aloud, and on whose phone?' },
  ],
};
