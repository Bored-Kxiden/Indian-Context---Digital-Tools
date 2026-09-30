import type { Tool } from './types';

// Component 2 · Reading Visual Culture. Source: the Components 2 and 3 booklet, pages 2.01–2.15.
//
// The earlier six-page "Component 02" draft repeats most of this booklet. Where the two agree,
// the booklet's wording is used once. Where the draft has something the booklet does not (the
// rule about not photographing "Indian culture", the lists of actions and enablers for the
// passes, the fuller prompt under each of the nine scenario boxes, the wording of the
// edge-case check, and the question each hand-off asks in general), it is folded in below.
// Filled examples are illustrative (the booklet says so).
//
// The write-up "Reading Visual Culture" (Website Writeup) is the updated content for the component. It
// repeats much of the above, so its wording is used once where they agree; what only it has is below:
// `why`, `readTheWorld`, `movements`, `make`, `beforeYouStart`, `role`, `whenToUse`, `evidenceMore`,
// `handOffs` (now five, with a reason each) and `core`. Its names for other components ("Reading
// Material Conditions", "Reading Language Conditions", "Reading Yourself") are the site's own names here:
// Material Reality, Language, Reflection.

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
  /** Where the reading goes next. The questions and lines are the write-up's. */
  handOffs: [
    {
      to: '1 · Existing Products',
      href: '/components/existing-products/',
      ask: 'What does the existing product assume about this situation?',
      body: 'Use the scenario to stress the product, remove one of its dependencies, trace what happens outside the interface, or investigate the informal work surrounding it.',
    },
    {
      to: '4 · Material Reality',
      href: '/components/material-reality/',
      ask: 'What physical, infrastructural or economic conditions make this situation possible?',
      body: 'Look at devices, documents, spaces, connectivity, money, time, transport, physical labour and other resources.',
    },
    {
      to: '3 · Reading Language',
      href: '/components/language/',
      ask: 'What happens to meaning as information moves between people, languages and systems?',
      body: 'Carry forward the original message, explanation, translation and participant interpretation rather than collapsing them into one final version.',
    },
    {
      to: 'Reflection',
      href: '/components/reflection/',
      ask: 'What did I assume when I first saw this situation?',
      body: 'A scenario can become evidence of your own design assumptions as much as evidence about the participant.',
    },
    {
      to: 'More research',
      href: '',
      ask: 'We don’t know yet.',
      body: 'That is also a valid output. A good scenario should make the next research question clearer.',
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
  { phrase: '…check I have what I need before I start', tool: 'before-you-start', tag: 'Before you start', anchor: '' },
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
/** The write-up records a fourth line: an open invitation, not a fourth question to probe. */
export const openInvitation = 'What else should we know?';

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

/** Why the component exists (write-up). The paired quotes are the write-up's own: the same student, described two ways. */
export const why = {
  title: 'Digital products are never used in isolation.',
  intro: [
    'A scholarship portal may look like a website, but the person using it may also be dealing with a family member, a senior, a college office, a document on someone else’s phone, a deadline, a language barrier, unreliable connectivity, or a piece of information they learned somewhere else.',
    'These things rarely appear on the screen. Yet they can determine whether the product works.',
  ],
  start: 'Reading Visual Culture starts with those situations. Instead of asking the designer to imagine what a user’s life looks like, it asks people to show you.',
  pair: {
    interface: { label: 'The interface', quote: 'The student uses the portal on their phone.' },
    situation: {
      label: 'The situation',
      quote:
        'The student receives a message from a senior, checks a document on someone else’s phone, asks someone whether the information is correct, opens the portal on a slow connection, and then returns to the message to understand what the portal is asking for.',
    },
  },
  edge: [
    'When we only study the interface, the surrounding conditions can disappear. They can later be described as unusual behaviour, a workaround, an exception, or an “edge case”.',
    'But whether something is an edge case depends partly on the baseline we designed from.',
  ],
  question: 'What situations are people actually navigating, before we decide what is normal?',
  caution:
    'It does not assume that every unusual-looking situation represents a broader cultural pattern. Instead, it gives the designer a way to investigate those situations without explaining them too quickly.',
  aim: 'The aim is not to produce a “user persona” or a collection of photographs about a particular culture. The aim is to understand what people have learned to notice, recognise, trust, ignore and act upon in the situations where a product is actually used.',
};

/** What "visual culture" means here (write-up). */
export const readTheWorld = {
  not: 'Here, visual culture is not simply about aesthetics, graphic design, colours, symbols or what looks “Indian”.',
  is: 'It is about the ways people learn to read the world around them.',
  learn: [
    'People learn that certain things deserve attention.',
    'They learn what looks trustworthy.',
    'They learn what can be ignored.',
    'They learn which signs mean “act now”, which documents matter, who to ask, what information needs to be cross-checked, and what can be taken at face value.',
  ],
  outside:
    'Much of this learning happens outside formal interfaces. A noticeboard, a WhatsApp message, a familiar logo, a handwritten instruction, a document format or even the physical location of information can become meaningful because someone has learned how to read it.',
  ask: 'What has this person learned to notice, and where did they learn to read it that way?',
  better: 'That question is more useful than simply asking whether an interface is visually clear.',
};

/**
 * The write-up's six movements. `where` says where each sits in the four tools: that mapping is ours,
 * not the write-up's (see CONTEXT.md, D32).
 */
export const movements = [
  { name: 'Show', body: 'Let participants show you their reality.', where: 'Tool 1 · Show', tool: 'show' },
  { name: 'Find', body: 'Look for situations and relationships that repeat.', where: 'Tool 2 · Read, Pass 1', tool: 'read' },
  {
    name: 'Read',
    body: 'Investigate what people notice, recognise, trust, ignore or need explained.',
    where: 'Tool 2 · Read, Passes 2 and 3 and the nine questions',
    tool: 'read',
  },
  { name: 'Build', body: 'Turn the evidence into a Context Scenario.', where: 'Tool 3 · Build', tool: 'build' },
  {
    name: 'Challenge',
    body: 'Test whether your interpretation is actually supported by evidence.',
    where: 'The evidence tags and stop rule (Tools 2 and 3), the edge-case check, and Is it working?',
    tool: 'build',
  },
  { name: 'Hand off', body: 'Carry the scenario into another part of the research process.', where: 'Tool 4 · Hand off', tool: 'hand-off' },
];
export const movementsNote =
  'The sequence is a guide, not a rigid research law. You may move backwards when you discover that you do not have enough evidence. You may return to participants. You may decide that a scenario needs material, language or product-level investigation before you can make sense of it.';

/** What you end up with (write-up). The nine questions are the ones the nine boxes answer. */
export const make = {
  not: 'The final output is not a persona. It is a Context Scenario.',
  is: 'A Context Scenario describes a real situation in which a person is trying to do something under particular conditions.',
  example:
    'A student is trying to submit a scholarship application close to a deadline. The information needed to complete the submission is distributed across a portal, a message from another student and a physical document. The student checks the information with another person before submitting.',
  starting: 'That is only a starting point. The toolkit then asks:',
  asks: [
    'What exactly is happening?',
    'What conditions make it possible?',
    'What information is moving between people and places?',
    'What does the student know already?',
    'What did they have to learn?',
    'Who or what else is involved?',
    'What work happens outside the visible product?',
    'What happens when one of those conditions disappears?',
    'Which parts have actually been observed, and which are our interpretation?',
  ],
  after: 'The scenario therefore becomes something another designer can investigate, rather than a conclusion they are expected to accept.',
};

/** The "Before you start" page (write-up). */
export const beforeYouStart = {
  lead: 'This toolkit works best when you have access to real participants and real situations.',
  note: 'You do not need a large research sample to begin, but you should have enough evidence to distinguish an individual situation from a recurring pattern.',
  needs: [
    {
      n: '01',
      title: 'A specific context',
      body: ['Know who you are investigating and what situation you are interested in.'],
      example: 'First-generation college students from Tier 2 / Tier 3 towns navigating higher-education systems.',
      avoid: '“Indian students.”',
      foot: 'The more specific the context, the more useful your scenarios become.',
    },
    {
      n: '02',
      title: 'Participants who can show you their reality',
      body: [
        'The participant is not there to perform your research hypothesis. They decide what is worth showing.',
        'You can give them prompts if useful, but the prompts are optional. If you want participants to have maximum autonomy over what becomes visible, simply give them the task and allow them to decide what matters. If you need more direction, the toolkit provides suggested prompts.',
      ],
      warn: 'Do not treat the suggested prompts as a checklist that every participant must complete. They are there to open possibilities, not to predetermine the evidence.',
    },
    {
      n: '03',
      title: 'A real activity or situation',
      body: ['The toolkit becomes more useful when connected to something people are actually trying to do.'],
      list: [
        'applying for a scholarship',
        'finding information',
        'submitting a document',
        'making a payment',
        'accessing a service',
        'travelling somewhere',
        'communicating with an institution',
        'completing a form',
      ],
      foot: 'You are trying to understand the situation around an activity, not collect photographs of a person’s life in general.',
    },
    {
      n: '04',
      title: 'A way to preserve the participant’s explanation',
      body: [
        'An image without context can be very easy to misinterpret. A photograph of someone talking to another person does not tell you why they were talking.',
        'So every image should, where possible, remain connected to the participant’s explanation. Record:',
      ],
      record: ['What is this?', 'Why did you show us this?', 'What were you doing?', 'What else should we know?'],
      foot: 'The participant’s account is part of the evidence.',
    },
  ],
  autonomy: {
    title: 'A note on participant autonomy',
    intro: 'You can either give participants suggested things to photograph, or you can leave the task deliberately open.',
    open: {
      label: 'More open',
      quote: 'Show us things around you that are important to how you complete this task.',
      body: 'This gives participants more control over what becomes visible.',
    },
    directed: {
      label: 'More directed',
      quote: 'Show us where you go when you don’t know what to do.',
      body: 'This can help investigate a particular research question.',
    },
    choice: 'Neither is automatically better. The choice depends on what you are trying to learn.',
    reasons: [
      'If you already have a strong hypothesis, a more open capture can prevent the research from simply confirming what you expected to find.',
      'If you are exploring a specific question, a prompt can help participants notice something they might otherwise overlook.',
    ],
    instrument: 'The toolkit therefore treats prompts as research instruments, not instructions that must always be followed.',
  },
  notToDo: {
    title: 'What not to do',
    lead: 'This toolkit is not asking you to:',
    list: [
      'photograph “Indian culture”',
      'find stereotypically Indian behaviours',
      'turn every repeated behaviour into a cultural trait',
      'create a persona from a few photographs',
      'decide what a participant “really means”',
      'assume that an unusual situation is an edge case',
      'treat one participant’s behaviour as representative',
      'force every observation into predefined categories',
      'design a solution immediately',
    ],
    instead: 'Instead, keep asking:',
    asks: ['What do I actually know?', 'What am I currently assuming?'],
  },
  checklist: {
    title: 'Check that you have',
    items: [
      'A clearly defined context',
      'A real activity or situation to investigate',
      'Access to participants',
      'A way to collect photographs / visual evidence',
      'A way to retain participant explanations',
      'Consent for collecting and using the material',
      'A place to keep evidence separate from interpretation',
    ],
  },
  remember: [
    'You are not collecting “representative images”.',
    'You are collecting situations worth understanding.',
    'You are not looking for a cultural answer.',
    'You are looking for a better question.',
  ],
};

/** The designer's role (write-up). */
export const role = {
  title: 'The designer’s role',
  intro: 'The participant generates the starting evidence. The designer’s job is to investigate it. That means resisting two opposite behaviours.',
  two: [
    {
      title: 'Do not disappear from the research.',
      body: 'You are not simply collecting photographs and letting them “speak for themselves”. You need to ask questions, connect evidence, identify gaps and test interpretations.',
    },
    {
      title: 'But do not take over the research either.',
      body: 'You should not decide beforehand what every photograph means. Your interpretation should remain traceable to the evidence.',
    },
  ],
  lead: 'The designer moves between:',
  chain: ['What did they show me?', 'What keeps happening?', 'What might this mean?', 'What evidence supports that?', 'What do I still need to investigate?'],
};

/** When to reach for it (write-up). */
export const whenToUse = {
  title: 'Use it when you catch yourself saying…',
  signals: [
    '“Users probably…”',
    '“They obviously…”',
    '“People in this context usually…”',
    '“This is just a workaround…”',
    '“That’s an edge case.”',
    '“They don’t understand the interface.”',
    '“They prefer…”',
    '“The problem is…”',
  ],
  body: 'These statements are not necessarily wrong. They are signals to investigate further. The toolkit gives you a way to move from an assumption about the situation towards evidence about the situation.',
};

/** The rule that matters most, with the write-up's example (it extends `overview.evidence`). */
export const evidenceMore = {
  rule: 'Start with evidence. Not explanation.',
  body: 'The easiest mistake in contextual research is to see something and immediately explain it.',
  inferred: '“The student asks their senior because first-generation students depend on informal networks.”',
  observed: '“The student asks their senior.”',
  inferredLabel: 'An interpretation',
  observedLabel: 'Evidence',
  note: 'The first may eventually become a useful finding. For now, you have only observed the second. This toolkit deliberately keeps them apart. It is not bureaucratic: it protects the research from becoming a collection of convincing-sounding assumptions.',
  single:
    'This does not mean that a single situation is unimportant. A single situation can reveal something worth investigating. It simply means that you should not silently turn one person’s experience into a statement about an entire population.',
  next: 'When something appears important, the next question is:',
  nextAsk: 'What would I need to see or hear before I could make a stronger claim?',
};

/**
 * The FigJam template (VISUAL TOOLKIT.jam), the component's main file. Section names and texts are read from the
 * board itself (see CONTEXT.md, D35). It replaces a .fig that was attached here by mistake: that file is Component 1's.
 * `cards` are the board's six capture cards, word for word; three are worded differently from the booklet's missions.
 */
export const figjam = {
  id: 'visual-culture-figjam',
  title: 'The FigJam template',
  lead: 'The board to work on. Open it in FigJam, share it with your team, and fill it step by step: Show, Group, Build, Scenario.',
  sections: [
    {
      name: 'Introduction · How to use it',
      tool: '',
      what: 'What the component is and why to do it, and how to use it. Students photograph six missions; the designer runs three affinity passes across the images and builds the scenario from the recurring pattern, not the first interesting photo. Five steps: Capture, Affinity, Build, Verify, Scenario.',
    },
    {
      name: '1 · Show: what do I ask the student to capture?',
      tool: 'show',
      what: 'You can give the student prompts to guide what they photograph. These are suggestions, not requirements. If you want the photographs to emerge with as little direction as possible, do not use them.',
    },
    {
      name: 'Capture cards',
      tool: 'show',
      what: 'Six suggested prompt cards, one mission per card. Every photo gets three prompts, and only three: What is this? Why did you show us this? What were you doing? Plus the card’s own question.',
    },
    {
      name: 'The capture stage',
      tool: 'show',
      what: 'The kinds of data you need the student to capture: the image, then what is this, why did you show us that, and what were you doing. Each picture should have a context from their end.',
    },
    {
      name: 'Output of Show',
      tool: 'show',
      what: 'A set of participant-generated images and participant accounts. You are ready to move on when you have enough images to begin seeing relationships or repetitions, not when you have “covered the whole environment”.',
    },
    {
      name: '2 · Group: clusters',
      tool: 'read',
      what: 'A section for each cluster (Cluster 01, and on). Keep putting your images in.',
    },
    {
      name: '3 · Build: the Context Profile',
      tool: 'hand-off',
      what: 'Canvas 2 of 2 · the person, in the situation. “When this person is in this situation…” and its twelve lines, then “What does this tell us about the system, and not about the person?”: a worked example (person, don’t conclude, ask instead) and your scenario.',
    },
    {
      name: 'Scenario',
      tool: 'hand-off',
      what: 'An open space, with stickies, for the scenario you hand off.',
    },
  ],
  cards: [
    {
      n: '01',
      title: 'Show me where you learn',
      body: 'Show me something that helps you know what to do. A message, a notice, a person, a document, a screenshot, a handwritten note, anything.',
      ask: 'What did this help you understand?',
    },
    {
      n: '02',
      title: 'Show me what you keep beside you',
      body: 'Don’t photograph the task. Photograph what’s around it: a certificate, another phone, a notebook, Aadhaar, a printout, another person.',
      ask: 'Why do you need this?',
    },
    {
      n: '03',
      title: 'Show me who helps',
      body: 'Photograph the person, message, screen, note or place that helped you: whatever helped, when something or someone helped.',
      ask: 'What did they help you do? Could you have done it alone?',
    },
    {
      n: '04',
      title: 'Show me when information changes',
      body: 'Paper → photo. Photo → PDF. English → explanation. Notice → WhatsApp. Show something you had to change before you could use it.',
      ask: 'What did you have to do to make it usable?',
    },
    {
      n: '05',
      title: 'Show me when the normal way doesn’t work',
      body: 'Not “what problems did you face”: show us the workaround. Asking someone, another device, a cyber café, a screenshot, a call, a repeat.',
      ask: 'What made you do this instead?',
    },
    {
      n: '06',
      title: 'Show me what you check again',
      body: 'Show something you check more than once: before you trust it, before you act on it, before you submit it.',
      ask: 'What are you checking for? What makes you feel sure?',
    },
  ],
  howTo: [
    'Open FigJam (figma.com), then drag the .jam file into Drafts or a team project, or use Import. You get your own editable board.',
    'Share the board with your team. Give participants the capture cards, paste their photos into the clusters, and fill the Context Profile from them.',
    'Keep each participant’s answers next to their photo, in their own words.',
  ],
  alsoHolds: 'The board also keeps FigJam’s own quick tips (toolbar, move and zoom, sharing, stickies, rectangles, stamps). You can delete them.',
  differs: [
    'The capture cards word three missions differently from the booklet (p.2.05): 03 “Show me who helps”, 05 “Show me when the normal way doesn’t work” and 06 “Show me what you check again”, and five of the follow-up questions differ. The tool pages keep the booklet’s wording, because the booklet’s filled example (p.2.04) is built on it.',
    'The board has no Context Scenario canvas (the nine boxes). For Tool 3 · Build, use the booklet’s sheet (p.2.11). The board’s Build step holds the Context Profile, which this site places in Tool 4 · Hand off.',
  ],
};

/** The component's core principle (write-up's close). */
export const core = {
  lead: 'The purpose of this toolkit is not to teach you what to see. It is to help you notice when your first reading of a situation is incomplete.',
  line: 'Don’t explain the person too quickly. Question the system around the situation.',
  result: 'The result is not a definitive description of a culture. It is a set of evidence-backed situations that give the designer somewhere more precise to look next.',
};

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
      {
        term: 'Three questions',
        def: 'What is this? Why did you show us this? What were you doing? Ask only these, then leave room: “What else should we know?”',
      },
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
      {
        title: 'The missions are optional',
        body: 'They are suggestions, not a checklist every participant must complete. For as little direction as possible, give only the task and let the participant decide what matters. Choose the level of direction that suits what you are trying to learn (see Before you start).',
      },
      {
        title: 'When to move on',
        body: 'You are ready to move on when you have enough images to begin seeing relationships or repetitions, not when you have “covered the whole environment”. (From the FigJam template’s “Output of Show”.)',
      },
      {
        title: 'Keep the participant’s explanation with every photo',
        body: 'An image without its explanation is easy to misread. Write the three answers beside the photo in the participant’s words, then ask “What else should we know?” The participant’s account is part of the evidence.',
      },
    ],
    panels: [{ id: 'missions', label: 'The six missions', icon: 'cards', after: 'guide' }],
    need: 'Participants with camera phones, the mission cards (p.2.05), consent for their photos',
    endUp: 'A wall of captioned photos, each tagged Observed or Reported, for Tool 2',
    figjamSection: 'the capture cards (its own wording of the six missions) and the capture stage, under 1 · Show',
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
    figjamSection: 'a clusters section to group the photos in, under 2 · Group',
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
    figjamSection: 'the Context Profile canvas (Canvas 2 of 2 · the person, in the situation), under 3 · Build, and an open space for your scenario',
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
