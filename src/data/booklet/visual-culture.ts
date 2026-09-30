import type { Tool } from './types';

// Component 2 · Reading Visual Culture. Source: the Components 2 and 3 booklet, pages 2.01–2.15.
//
// The earlier six-page "Component 02" draft repeats most of this booklet. Where the two agree,
// the booklet's wording is used once. Where the draft has something the booklet does not (the
// rule about not photographing "Indian culture", the lists of actions and enablers for the
// passes, the fuller prompt under each of the nine scenario boxes, the wording of the
// edge-case check, and the question each hand-off asks in general), it is folded in below.
// Filled examples are illustrative (the booklet says so).

export const overview = {
  lead: 'What have people learned to notice, trust and act on, before they ever read your product?',
  descriptor:
    'A participant-led visual research tool for uncovering the visual and informational conditions through which a particular interaction becomes legible.',
  builtFor:
    'Built for first-generation college students from Tier 2 and 3 towns. Reusable without assuming that one Indian experience is universal.',
  idea: [
    'Designers usually start with an imagined user and read everything through them. This component flips the order. The participant shows what the situation actually looks like, in their own world, before the designer explains it.',
  ],
  principle: {
    lead: 'The participant decides what matters in the picture.',
    body: 'The designer does not photograph “Indian culture” and interpret it from the outside.',
  },
  definition: 'Visual culture is not how things look. It’s what people have learned to recognise, trust, ignore and act on.',
  images:
    'The images are not answers. They are evidence of situations in which information is noticed, trusted, ignored, translated, checked, copied, transformed or made actionable.',
  persona: {
    not: 'Not a persona…',
    persona: 'A persona asks who.',
    scenario: 'A Context Scenario',
    scenarioBody: 'Asks who, where, when, under what conditions, with what information and whose help.',
    note: 'The same student may navigate the same product differently when the conditions around them change.',
  },
  evidence: {
    title: 'Every claim carries an evidence status',
    statuses: [
      { name: 'Observed', def: 'Visible in the image or the moment.' },
      { name: 'Reported', def: 'The participant said it.' },
      { name: 'Inferred', def: 'Our reading of the evidence.' },
      { name: 'Hypothesised', def: 'A possibility we still need to check.' },
    ],
    rule: 'One photo is a situation. Repeated photos are a pattern. A pattern the participants also describe is a stronger claim.',
    stop: 'Never make a cultural claim from a single image. The toolkit is here to surface situations, not to declare what “Indian users” are like. If a pattern is not supported, record it as a question.',
  },
  meta: { tools: 4, time: 'About a week, 3 sessions', mode: 'Participant-led · image-first' },
  youNeed: [
    '3–6 participants with camera phones',
    'Consent to use their photos',
    'A printer',
    'A big table or wall',
  ],
  /** Where the reading goes next. The questions are the general form of the ones in Meera's example. */
  handOffs: [
    {
      to: '1 · Existing Products',
      href: '/components/existing-products/',
      ask: 'Can the product actually work under this condition?',
    },
    {
      to: '3 · Reading Language',
      href: '/components/language/',
      ask: 'What does a word from the talk-backs, like “setting”, really mean here?',
    },
    {
      to: '4 · Material Reality',
      href: '/components/material-reality/',
      ask: 'What physical, infrastructural or resource conditions make this possible?',
    },
  ],
};

/** The component's "I want to…" line and the four tools' lines. The first is the component's own; the rest are ours. */
export const iWantTo = [
  {
    phrase: '…understand what people have learned to notice, trust and act upon, before I decide how they should read my product',
    tool: '',
    tag: 'Component 2',
    anchor: '#route',
  },
  { phrase: '…see what the moment actually looks like in their world', tool: 'show', tag: '1 · Show', anchor: '' },
  { phrase: '…find what keeps happening, and what makes it possible', tool: 'read', tag: '2 · Read', anchor: '' },
  { phrase: '…turn photos into one situation I can design for', tool: 'build', tag: '3 · Build', anchor: '' },
  { phrase: '…turn what I saw into a question about the system, not the person', tool: 'hand-off', tag: '4 · Hand off', anchor: '' },
];

/** The six photo missions (page 2.05). The short follow-up is the question to ask about that photo. */
export const missions = [
  {
    n: '01',
    title: 'Show me where you learn',
    body: 'Something that helps you know what to do: a message, notice, document, person, screenshot, note, or something else.',
    ask: 'What did this help you understand?',
  },
  {
    n: '02',
    title: 'Show me what you keep beside you',
    body: 'Not the task. What is around it: anything you keep close to complete, understand or check it.',
    ask: 'Why do you need this?',
  },
  {
    n: '03',
    title: 'Show me who or what helps',
    body: 'Whatever helps when something becomes unclear or difficult: a person, message, screen, object, place or route.',
    ask: 'What would you have done without it?',
  },
  {
    n: '04',
    title: 'Show me when information changes',
    body: 'Follow information as it changes form: one format, language, screen or document becoming another.',
    ask: 'What changed before you could use it?',
  },
  {
    n: '05',
    title: 'Show me when the expected way doesn’t work',
    body: 'Don’t just show the problem. Show what you did instead: another person, device, place or attempt.',
    ask: 'What made you do this instead?',
  },
  {
    n: '06',
    title: 'Show me what you know to look at',
    body: 'Something you look for before deciding what to do, what to trust or what to ignore.',
    ask: 'How did you learn that this mattered?',
  },
];

export const threeQuestions = ['What is this?', 'Why did you show us this?', 'What were you doing?'];

/** The nine structures the passes test for (page 2.08). They are questions, never boxes to sort into. */
export const structures = [
  { name: 'Social', ask: 'Who else must be involved?' },
  { name: 'Institutional', ask: 'Who has permission to resolve this?' },
  { name: 'Knowledge', ask: 'What had to be known already?' },
  { name: 'Material', ask: 'What physical thing had to exist?' },
  { name: 'Economic', ask: 'Did making this work cost anything?' },
  { name: 'Linguistic', ask: 'Did meaning change as information moved?' },
  { name: 'Authority', ask: 'What makes one version trustworthy?' },
  { name: 'Risk', ask: 'What happens if they get it wrong?' },
  { name: 'Adaptation', ask: 'What did they change to make it work?' },
];

export const tools: Tool[] = [
  {
    component: 'visual-culture',
    slug: 'show',
    short: 'Show',
    number: 1,
    of: 4,
    name: 'Show',
    question: 'What does the moment actually look like, in their world?',
    time: 'A week to capture',
    group: '30 min brief · 45 min talk-back',
    effort: 2,
    mode: 'Participants’ phones',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real photos, in their own words, with consent.',
    shows: 'Where people really learn, check, convert and get help, seen through their own camera.',
    done: 'Every photo has the three answers written beside it, in the participant’s own words.',
    whatIsIt: [
      'Give participants six photo missions. They photograph their own world for a week. Then you sit with them and ask the same three questions about every photo, so you never have to guess what an image means.',
    ],
    words: [
      { term: 'Mission', def: 'One photo brief, like “Show me what you keep beside you.”' },
      { term: 'Three questions', def: 'What is this? Why did you show us this? What were you doing? Ask only these.' },
      {
        term: 'Capture rule',
        def: 'Never show example photos first. Examples are for your understanding, not for steering what people shoot.',
      },
      { term: 'Own words', def: 'Answers can be written in any language or script.' },
    ],
    extras: [
      {
        title: 'Give the six missions as they are',
        body: 'Don’t explain what a “good” photo should look like. The missions, with the question that goes with each, are under “The six missions”.',
      },
    ],
    panels: [{ id: 'missions', label: 'The six missions', icon: 'cards', after: 'guide' }],
    need: 'Participants with camera phones, the mission cards (p.2.05), consent for their photos',
    endUp: 'A wall of captioned photos, each tagged Observed or Reported, for Tool 2',
    guidePage: '2.03',
    parts: [
      {
        id: 'photos',
        label: 'Part A',
        title: 'Meera’s photos, one per mission',
        example: {
          page: '2.04',
          alt: 'Filled example: Meera’s six photos, one per mission. A class WhatsApp forward with the last date circled; a notebook page of user ID, password and application number beside her phone; the cybercafé counter with the owner’s hand on the mouse and her certificate on the scanner; her certificate becoming a phone photo and then a PDF; her father’s phone on a shelf with a paper slip that says OTP; and the portal’s red “Pending” beside the government emblem. Each has the three answers in her words and an Observed or Reported tag. A note says “Setting” came up in her own words and goes to Component 3 for thick translation.',
          note: 'Illustrative example. Photos are described, not shown. Use your participants’ real photos, with consent.',
        },
        blank: {
          page: '2.05',
          alt: 'Blank mission cards and photo slips: six mission cards to cut out, each with its follow-up question, and two photo slips with the three questions, an answer-in-any-language line and an Observed or Reported tag.',
          pdf: 'c2-show-missions-blank.pdf',
          printed: 'p.2.05',
          note: 'Print on card. Cut out. Give one set to each participant. Print a photo slip for every photo at the talk-back.',
        },
        steps: [
          'Hand out the six missions. Show no example photos.',
          'Give them a week. Any number of photos per mission.',
          'Talk-back: ask the three questions about every photo.',
          'Write their answers in their words, any language.',
          'Tag each answer Observed or Reported. Print photos small.',
        ],
      },
    ],
  },
  {
    component: 'visual-culture',
    slug: 'read',
    short: 'Read',
    number: 2,
    of: 4,
    name: 'Read',
    question: 'What keeps happening, and what makes it possible?',
    time: '60–90 min',
    group: 'Team of 2–4',
    effort: 3,
    mode: 'A big table or wall',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real photos, in their own words, with consent.',
    shows: 'Patterns across everyone’s photos, what each pattern depends on, and where the product shows it differently.',
    done: 'Every cluster has been through all three passes, and every claim has an evidence status.',
    whatIsIt: [
      'Lay every photo on the table. Sort them three times, each time asking a different question. Group first, name second. Then test each cluster against nine structures, as questions, never as boxes to sort into.',
    ],
    words: [
      { term: 'Pass 1', def: 'What is happening? Same action or moment. Ignore who is in the photo and what they look like.' },
      { term: 'Pass 2', def: 'What is making it possible? Ignore the action.' },
      { term: 'Pass 3', def: 'What does the product show differently?' },
      { term: 'Structure', def: 'A question to test a cluster: social, material, linguistic…' },
      {
        term: 'Stop rule',
        def: 'A question that only gives an assumption is marked Hypothesised. It stays out of the scenario until participant evidence supports it.',
      },
    ],
    extras: [
      {
        title: 'Pass 1 · name a cluster by what people are doing',
        body: 'Actions to look for:',
        chips: true,
        list: ['Asking', 'Checking', 'Waiting', 'Converting', 'Forwarding', 'Translating', 'Cross-checking', 'Getting help', 'Working around'],
      },
      {
        title: 'Pass 2 · what could be making it possible',
        body: 'Look for:',
        chips: true,
        list: ['A person', 'A document', 'A device', 'A place', 'Knowledge', 'A connection', 'Money', 'Time', 'Authority', 'A workaround', 'A routine'],
      },
      {
        title: 'The nine structures, as questions',
        body: 'Test for them. Never assume them. Use them as questions against a cluster, not as categories to sort images into.',
        list: structures.map((s) => `${s.name}: ${s.ask}`),
      },
    ],
    need: 'All the captioned photos from Tool 1, sticky notes in three colours, the product open',
    endUp: 'Named clusters, what enables them, and the gaps, for Tool 3',
    guidePage: '2.06',
    parts: [
      {
        id: 'passes',
        label: 'Part A',
        title: 'Three passes over the photos',
        example: {
          page: '2.07',
          alt: 'Filled example: three passes over Meera’s photos. Pass 1 groups them by action (checking, converting, waiting, keeping records) with each cluster’s photo numbers. Pass 2 names what makes each possible, tagged Observed or Reported (a class WhatsApp group, a senior and the emblem; a cybercafé, ₹30–50 and the owner’s know-how; Father’s phone and free time; a paper notebook and a pen). Pass 3 sets what the product shows (“Upload your documents (PDF, max 200KB)”) against what the photos show (a paper certificate photographed, carried to a café and converted by someone else): format, place and person changed, three steps the product calls one. The nine structures follow, with the ones that held up shaded.',
          note: 'Illustrative example. P2–P4 are other participants.',
        },
        blank: {
          page: '2.08',
          alt: 'Blank three-passes sheet: Pass 1 (what is happening), Pass 2 (what makes it possible), Pass 3 (product shows, photos show), the nine structures as questions, and a stop rule for anything that only produces an assumption.',
          pdf: 'c2-read-passes-blank.pdf',
          printed: 'p.2.08',
        },
        steps: [
          'Lay every photo out. Group by action only.',
          'Regroup: what is present that makes it possible?',
          'Put the product’s version next to each cluster.',
          'Ask the nine structures as questions.',
          'Tag every claim. Unsupported ones become Hypothesised.',
        ],
      },
    ],
  },
  {
    component: 'visual-culture',
    slug: 'build',
    short: 'Build',
    number: 3,
    of: 4,
    name: 'Build',
    question: 'What situation are we actually designing for?',
    time: '45 min',
    group: 'Pair or team',
    effort: 2,
    mode: 'Desk',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real photos, in their own words, with consent.',
    shows: 'One real situation: the moment, what the person sees, where information comes from, who helps, and what breaks.',
    done: 'All nine boxes are filled from evidence, or honestly left as “unknown”.',
    whatIsIt: [
      'Turn the clusters into a Context Scenario. Nine boxes, each answered only from the photos, the talk-backs and repeated patterns. Paste photos straight onto the sheet.',
    ],
    words: [
      { term: 'Context Scenario', def: 'A situation, not a persona. Who, where, when, what conditions.' },
      { term: 'Condition', def: 'The combination that keeps appearing: timing + a person + a thing.' },
      { term: 'Hidden work', def: 'What happens outside the product that nobody designed.' },
      { term: 'Edge-case check', def: '“This was treated as ___, but the evidence shows ___.”' },
    ],
    extras: [
      {
        title: 'The nine boxes, and what each one asks',
        list: [
          '01 · The moment. What is actually happening? Be specific about the task, timing, pressure and setting.',
          '02 · The world around them. What do they see? Paste 3–5 images. What competes for attention? What is close? What is visible before the product?',
          '03 · The information journey. Where does it come from, and where does it go next? Draw source → source → person → action.',
          '04 · The visual cue. What tells the person what to notice, trust, ignore or act on? What looks official, familiar, urgent or important?',
          '05 · The people around them. Who else is involved? What does each person actually do? Don’t assume the capability belongs to the “user” alone.',
          '06 · What they already know. What does this situation assume? What did they need to know before starting? Where did they learn it?',
          '07 · The hidden work. What happens off-screen, outside the visible product? Start from the images and name the work yourself.',
          '08 · The condition. What combination keeps appearing? For example: timing + information + another person + a physical resource.',
          '09 · The consequence. What breaks if one condition goes? Remove one condition. What breaks, changes or has to be repaired? Record only what the evidence supports.',
        ],
      },
      {
        title: 'The edge-case check',
        body: 'Don’t write “this is not an edge case”. Write: “This was treated as ___, but the evidence shows ___.” If you only have one image, call it a situation, not a pattern.',
      },
      {
        title: 'The visual reading',
        body: 'What has this person learned to notice, trust, ignore, interpret or act upon, and under what conditions?',
      },
    ],
    need: 'Your clusters from Tool 2, 3–5 printed photos, glue',
    endUp: 'One Context Scenario to design against, for Tool 4',
    guidePage: '2.09',
    parts: [
      {
        id: 'scenario',
        label: 'Part A',
        title: 'A Context Scenario',
        example: {
          page: '2.10',
          alt: 'Filled example: Meera’s Context Scenario, nine boxes, each tagged Reported, Observed or Inferred. The moment is exam week, 9 pm, uploading her income certificate two days before the deadline. She sees a class WhatsApp thread, a notebook of IDs and a phone at 12%, and the portal comes last. Information travels notice, class group, senior, Meera, café owner, portal. The government emblem and red text tell her what to trust. A senior explains, the café owner converts and her father holds the OTP. It assumes she knows what a PDF is and which number is registered. Hidden work is photographing, travelling, paying ₹30–50 and waiting for a call back. The condition is deadline pressure, a paper document, a helper with a device and someone else’s phone. With no café open at night there is no PDF and she misses the deadline (2 of 4 participants). The edge-case check and the visual reading follow.',
          note: 'Illustrative example.',
        },
        blank: {
          page: '2.11',
          alt: 'Blank Context Scenario sheet: nine boxes (the moment, the world around them, information journey, the visual cue, people around them, what they already know, the hidden work, the condition, the consequence), an edge-case check with two blanks, and a line for the visual reading.',
          pdf: 'c2-build-scenario-blank.pdf',
          printed: 'p.2.11',
        },
        steps: [
          'Answer box 01 first. Be specific about time and pressure.',
          'Paste 3–5 photos into box 02.',
          'Draw the information journey as arrows.',
          'Tag every box. Leave unknowns as “unknown”.',
          'Write the edge-case check and the visual reading.',
        ],
      },
    ],
  },
  {
    component: 'visual-culture',
    slug: 'hand-off',
    short: 'Hand off',
    number: 4,
    of: 4,
    name: 'Hand off',
    question: 'What does this tell us about the system, not the person?',
    time: '30 min',
    group: 'Pair or team',
    effort: 2,
    mode: 'Desk',
    worksOnItsOwn: true,
    sampleNote: 'Follow the steps with your own participants. Use their real photos, in their own words, with consent.',
    shows: 'What the person does in this situation, what the system has failed to make visible, and which component to take it to next.',
    done: 'You have one traceable sentence where every blank points to a photo or a quote.',
    whatIsIt: [
      'Fill a Context Profile: short verbs for what the person does in this situation. Then turn each observation about the person into a question about the system. Finish with one traceable statement and hand it off.',
    ],
    words: [
      { term: 'Context Profile', def: 'Trying to, depends on, checks, converts, works around…' },
      { term: 'Don’t conclude', def: 'A claim about the person: “students depend on seniors.”' },
      { term: 'Ask instead', def: 'A question about the system: “what does the senior know that the system hides?”' },
      { term: 'Hand off', def: 'Where the reading goes next.' },
    ],
    extras: [
      {
        title: 'The twelve lines of a Context Profile',
        body: 'Start with “When this person is in this situation…” and fill each line from evidence only.',
        chips: true,
        list: [
          'Trying to',
          'Depends on',
          'Already knows',
          'Doesn’t know yet',
          'Asks',
          'Converts',
          'Checks',
          'Works around',
          'Risks',
          'Does instead',
          'Has access to',
          'Almost called “extra”',
        ],
      },
      {
        title: 'The reading, in one sentence',
        body: 'We observed ___ in ___ conditions. This matters because ___. The existing product currently ___. This makes us investigate ___.',
      },
      {
        title: 'What looks like an edge case',
        body: 'What looks like an edge case from the interface may be an ordinary situation from the user’s side.',
        tone: 'remember',
      },
    ],
    need: 'Your Context Scenario from Tool 3',
    endUp: 'One traceable statement, handed to Component 1, 3 or 4',
    guidePage: '2.12',
    parts: [
      {
        id: 'profile',
        label: 'Part A',
        title: 'Context Profile + the reading',
        example: {
          page: '2.13',
          alt: 'Filled example: Meera’s Context Profile for uploading documents at night before a deadline. She is trying to submit before the deadline, depends on a café, a senior and Papa’s phone, already knows the emblem means official, doesn’t know yet how to make a PDF, asks her senior before submitting, converts paper to photo to PDF, checks the class group for dates, works around the OTP by calling home, risks her data with a stranger, does a trip to the café instead, has a phone but not a scanner, and almost called “extra” the notebook of IDs. Then a person-claim (“I ask my senior before submitting”), what not to conclude (students depend on seniors) and what to ask instead (what does the senior know that the system hasn’t made visible), one traceable statement, and three hand-offs: to Existing Products, Reading Language and Material Reality.',
          note: 'Illustrative example.',
        },
        blank: {
          page: '2.14',
          alt: 'Blank Context Profile and reading: the twelve profile lines, a person/situation with don’t-conclude and ask-instead lines, the reading sentence with four blanks, and three hand-offs (Existing Products, Language, Material Reality).',
          pdf: 'c2-handoff-profile-blank.pdf',
          printed: 'p.2.14',
        },
        steps: [
          'Write the situation on top: “When ___ is ___…”',
          'Fill each verb from evidence only.',
          'Rewrite every person-claim as a system question.',
          'Write the reading. Cite a photo or quote per blank.',
          'Pick the component it goes to next.',
        ],
      },
    ],
  },
];

/** Page 2.15, the closing "Is it working?" for the whole component. */
export const closing = {
  good: [
    'A photo surprised you: it showed a step the product doesn’t know exists.',
    'Participants named things you would never have photographed.',
    'Your clusters are actions, not kinds of people.',
    'Every box in the scenario has a tag, and some say “unknown”.',
  ],
  warnings: [
    {
      sign: 'Every photo looks like your own guesses.',
      fix: 'You showed examples first, or explained what a “good” photo is. Run the missions again, cold.',
    },
    {
      sign: 'A cluster is named after a group of people.',
      fix: 'Regroup by action. “Seniors” is not a cluster; “asking before submitting” is.',
    },
    {
      sign: 'A scenario box has no photo or quote behind it.',
      fix: 'Mark it Hypothesised, or take it back to a participant.',
    },
    {
      sign: 'Your reading describes the person, not the system.',
      fix: 'Rewrite it as “the system hasn’t made ___ visible”.',
    },
  ],
  line: 'What looks like an edge case from the interface may be an ordinary situation from the user’s side.',
};
