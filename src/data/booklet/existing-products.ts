import type { Tool } from './types';

// Component 1 · Reading Existing Products. Source: the final booklet, pages 1.01–1.27 (Toolkit
// "Designing for the Indian Context"). The final booklet redesigned this component: every page after
// "Start here" is one template with Meera's example written into the fields in [brackets], so there are
// no separate guide, example and blank pages any more, and the card kit (boards B1–B7, sheets S1–S8)
// now sits inside the booklet (1.11–1.27). Wording is copied from those pages. The example is
// illustrative (the booklet says so).

export const overview = {
  lead: 'Every product was designed for someone. Find out who, and who pays when it isn’t them.',
  intro: [
    'Then find out who pays when the product is wrong about them.',
  ],
  notAnAudit: {
    title: 'This is not a usability audit.',
    body: 'It’s a reading of whose assumptions are built into a product, and who pays when they’re wrong.',
  },
  meta: { tools: '4 tools + Synthesis', time: '3–4 hours', notes: 'Sticky notes, 3 colours', kit: 'Optional card kit' },
  /** "You need", from the Start here page. */
  youNeed: [
    'The product open on a phone or laptop. Pens.',
    'Sticky notes, if you like. The colours are explained on the page where you first use them.',
  ],
  team: 'Working as a team? There’s a card kit with big boards and printed cards. The green tags on templates (S1, S2 CHANNEL…) show which card goes where.',
  notes: [
    { colour: 'orange' as const, label: 'Orange', use: 'the story you’re reading' },
    { colour: 'yellow' as const, label: 'Yellow', use: 'what you found' },
    { colour: 'teal' as const, label: 'Teal', use: 'what you think' },
  ],
  howEveryPageWorks: {
    title: 'How every page works',
    body: [
      'Every page after this one is a template. Fill it straight away. Anything in [brackets] is an example, from Meera’s scholarship portal. Write over it with your own.',
      'At the bottom of each tool, write one line to carry forward. Synthesis uses those lines, so you never have to reread.',
    ],
  },
  claim: 'We should redesign ______, because it would shift blame from ______ to ______, and would specifically help ______.',
  claimNote: 'Every blank should point to something you already wrote.',
  twoWays: {
    paper: {
      title: 'The paper way',
      body: 'Print the blank template for each tool, or copy it onto a big sheet. Write everything on sticky notes.',
      bestFor: 'Working alone or in pairs. A first try. Little time.',
      youNeed: 'This booklet, a printer, sticky notes in three colours.',
    },
    cards: {
      title: 'The card way',
      body: 'Lay a big board on the table. Printed cards hold the categories and questions. What you find goes on yellow evidence cards or sticky notes.',
      bestFor: 'Teams of 3–5, workshops, and sessions with participants. Cards get moved, argued over, reshuffled.',
      youNeed: 'The card kit: boards printed large, card sheets printed and cut.',
    },
    note: 'The questions are the same either way, and so is what you end up with. Pick what suits your group, or mix the two. Using the kit? On every template, a green tag like S2 CHANNEL shows which card goes where, and CARD KIT Board B1 tells you which board to lay out.',
  },
  pickAProduct: {
    step: 'Step 0 · Pick one product',
    sentence: 'The product we’re reading is [National Scholarship Portal · or Google Maps, DigiLocker…]',
    lead: 'One product you can open right now. Not a category: “Google Maps”, not “navigation apps”.',
    good: ['National Scholarship Portal', 'DigiLocker', 'Google Maps'],
    tooBroad: ['Government scholarship portals', 'Document apps', 'Navigation apps'],
    note: 'Our running example uses the National Scholarship Portal and Meera. The filled examples are illustrative. Your own tables must use real ads, real reviews and real quotes.',
  },
};

/**
 * Component 1's Figma file (reading-existing-products.fig). It was first attached, and published, as Component 2's
 * template by mistake (the owner shared it as "Visual_Culture_framework.fig"); it is Component 1's. Page and frame
 * names are read from the file (see CONTEXT.md, D35).
 */
export const figmaFile = {
  id: 'existing-products-figma',
  title: 'The Figma file',
  lead: 'Every page of this component as a Figma file, to adapt to your project, translate, or print.',
  pages: [
    { name: 'D1 · Cover', tool: '' },
    { name: 'D2 · What & How', tool: '' },
    { name: 'D3 · Tool 1 · Media & Gossip', tool: 'media-gossip' },
    { name: 'D4 · Media Story (blank)', tool: 'media-gossip' },
    { name: 'D5 · Gossip Venn (blank)', tool: 'media-gossip' },
    { name: 'D6 · Tool 2 · History', tool: 'history' },
    { name: 'D7 · Timeline (blank)', tool: 'history' },
    { name: 'D8 · Tool 3 · The Break', tool: 'the-break' },
    { name: 'D9 · Ideal Flow + Needs (blank)', tool: 'the-break' },
    { name: 'D10 · Villain Walk + Blame Scale (blank)', tool: 'the-break' },
    { name: 'D11 · Tool 4 · Power', tool: 'power' },
    { name: 'D12 · Three Lenses + Findings (blank)', tool: 'power' },
    { name: 'D13 · Synthesis (blank)', tool: 'synthesis' },
    { name: 'D14 · Is It Working?', tool: 'synthesis' },
  ],
  howTo: [
    'Open Figma and drag the .fig file into Drafts or a team project (or use Import file). You get your own editable copy.',
    'Go to the page called “final designs”. Its fourteen frames, D1 to D14, are the component’s pages.',
    'Copy a frame for each product or team, and work on the copy.',
  ],
  alsoHolds:
    'The file’s first page holds the booklet page layouts the final designs were drawn from, and reference material. You only need the final designs page.',
};

/** The route on the Start here page (1.02). The times are the booklet's own. */
export const route = [
  { label: 'Pick a product', time: '', href: 'pick-a-product', blurb: 'Step 0: one product you can open right now.', page: 'p.1.02' },
  { label: '1 · Media & Gossip', time: '45 min', href: 'media-gossip', blurb: 'What does it promise, and what do people actually say?', page: 'p.1.03' },
  { label: '2 · History', time: '20 min', href: 'history', blurb: 'What was here before, and what got lost?', page: 'p.1.05' },
  { label: '3 · The Break', time: '45 min', href: 'the-break', blurb: 'Where does the ideal story break, and who gets blamed?', page: 'p.1.06' },
  { label: '4 · Power', time: '30 min', href: 'power', blurb: 'What does this product do to power?', page: 'p.1.08' },
  { label: 'Synthesis', time: '20 min', href: 'synthesis', blurb: 'Make the stories compete. Write the design claim.', page: 'p.1.09' },
];

const EXAMPLE_NOTE = 'Anything in [brackets] is an example, from Meera’s scholarship portal. Write over it with your own. On your table, use real ads, real quotes and real words.';
const TEMPLATE_DL = 'Fill it straight away. Anything in [brackets] is Meera’s example: write over it with your own.';

export const tools: Tool[] = [
  {
    component: 'existing-products',
    slug: 'media-gossip',
    short: 'Media & Gossip',
    number: 1,
    of: 4,
    name: 'Media & Gossip',
    question: 'What does it promise, and what do people actually say?',
    time: '45 min',
    worksOnItsOwn: true,
    shows: 'Who the product thinks it is for, the story it sells, and where what people tell each other contradicts it.',
    done: 'Both people are described, every quote is in its circle with where you found it, and you have written one line to carry to Synthesis.',
    whatIsIt: [
      'Part A · The Media Story. What the product promises, and who it imagines, compared with your real user. Spend 15 minutes with real ads, the app store page or official notices first.',
      'Part B · The Gossip Venn. The three circles are three sources of information about the product. Collect real quotes from each, then look at where they agree and where they clash.',
    ],
    words: [
      { term: 'The mismatch', def: '“The ads assume ___, but my user has ___.” The gap between the person in the ads and your real user is what this tool is looking for.' },
      { term: 'Yellow notes', def: 'What you found.' },
      { term: 'Teal notes', def: 'What you think.' },
      { term: 'The three circles', def: 'What the company says, what the company replies, and what users tell each other.' },
      { term: 'The hardest contradiction', def: 'Where two circles say opposite things. Ask why it hasn’t been fixed, and who gains from it staying that way.' },
    ],
    extras: [
      {
        title: 'Where to find ③ (what users tell each other)',
        chips: true,
        list: ['Reddit', 'Quora', 'YouTube comments', 'WhatsApp forwards', 'Facebook groups', 'Your interviews'],
      },
      {
        title: 'Never invent a quote',
        body: 'Write each quote on a yellow note, with where you found it.',
        tone: 'care',
      },
    ],
    sampleNote: EXAMPLE_NOTE,
    need: 'Real ads, the app store page or official notices (15 minutes first), and real research for the Venn.',
    endUp: 'One line to carry to Synthesis from each part',
    parts: [
      {
        id: 'a',
        label: 'Part A',
        title: 'The Media Story',
        example: {
          page: '1.03',
          alt: 'Page 1.03, the Media Story, filled with Meera’s example from the National Scholarship Portal. Step 1: who does the product think it’s for? The person in the ads (a smiling student, own laptop and bright desk, relaxed, in one sitting) beside the real user (Meera, 19, first-gen; a phone at 12% and hostel Wi-Fi; over three days, worried). The mismatch sentence: the ads assume a laptop, a scanner and an hour, but my user has a phone, a café and three days. Four groups: A what it claims, B the story it sells, C what the designers set out to do, D how users experience it (A and B on yellow notes, C and D on teal). A line at the bottom to carry to Synthesis.',
          note: 'Illustrative example, in [brackets]. On your table, copy real ads and real words.',
        },
        blank: {
          page: '1.03',
          alt: 'The same page, to fill in.',
          pdf: 'c1-media-story-template.pdf',
          printed: 'p.1.03',
          shared: true,
          downloadNote: TEMPLATE_DL,
        },
        steps: [
          'Spend 15 minutes with real ads, the app store page or official notices.',
          'Step 1: describe the person the ads show, then the person who really uses it. Write the mismatch.',
          'Fill A and B on yellow notes: what it claims, and the story it sells.',
          'Fill C and D on teal notes: what the designers set out to do, and how users experience it.',
          'Write one line to carry to Synthesis.',
        ],
        board: 'B1',
      },
      {
        id: 'b',
        label: 'Part B',
        title: 'The Gossip Venn',
        example: {
          page: '1.04',
          alt: 'Page 1.04, the Gossip Venn, filled with Meera’s example. Three overlapping circles: 1 what the company says (ads, app store page, notices), 2 what the company replies (FAQs, support, replies to reviews) and 3 what users tell each other (Reddit, YouTube, WhatsApp), each with a short quote and its source, and “status stuck on pending” where they meet. Below, the hardest contradiction: circle 1 says “track your status anytime”, but circle 3 says nobody can tell you where your application is. Why hasn’t it been fixed? The helpdesk only answers FAQs; agents earn from the confusion. A row of places to find circle 3, and a line to carry to Synthesis.',
          note: 'Illustrative example, in [brackets]. Use only real quotes you find, and write where you found each.',
        },
        blank: {
          page: '1.04',
          alt: 'The same page, to fill in.',
          pdf: 'c1-gossip-venn-template.pdf',
          printed: 'p.1.04',
          shared: true,
          downloadNote: TEMPLATE_DL,
        },
        steps: [
          'Write each quote on a yellow note, with where you found it.',
          'Stick it in the circle it came from. If two sources say the same thing, put it in the overlap.',
          'Never invent a quote.',
          'Name the hardest contradiction on teal notes. Ask why it hasn’t been fixed, and who gains from it staying this way.',
          'Write one line to carry to Synthesis.',
        ],
        board: 'B2',
      },
    ],
    cardKit: {
      boards: ['B1', 'B2'],
      sheets: ['S1', 'S2'],
      page: 'p.1.21–1.22',
      intro: 'Two boards, in order. Board B1 holds the Media Story; B2 is the Gossip Venn, where channel cards go in their circles and quotes go next to them.',
      steps: [
        'Spend 15 minutes with real ads and notices.',
        'Fill both people on B1. Then A–D on yellow cards, numbered by prompt.',
        'On B2, put the channel cards (S2) in their circles.',
        'Put quotes on yellow cards next to their channel. Overlaps matter most; move cards as you argue.',
        'Answer the question cards on teal notes. Ask of each zone: centre, tone, folk fixes.',
        'Star the hardest contradiction and keep it for Synthesis.',
      ],
    },
  },
  {
    component: 'existing-products',
    slug: 'history',
    short: 'History',
    number: 2,
    of: 4,
    name: 'History',
    question: 'What was here before, and what got lost?',
    time: '20 min',
    worksOnItsOwn: true,
    shows: 'What the product replaced, who lost or gained a role, and which way influence flows.',
    done: 'Then, Recently and Now are filled, both arrows have a note, and you have written one line to carry to Synthesis.',
    whatIsIt: [
      'The timeline. What the product replaced, who lost or gained a role, and which way influence flows. Best done by talking to someone who did it before it went digital.',
    ],
    words: [
      { term: 'Then · Recently · Now', def: 'Three points on a timeline of how this was done.' },
      { term: 'People → product', def: 'A workaround users invented that the product now depends on.' },
      { term: 'Product → people', def: 'A habit or skill the product forced on everyone.' },
    ],
    extras: [
      {
        title: 'The questions on the page',
        list: [
          'Who lost a role? Who gained one?',
          'What did the product remove that people used to be able to do?',
          'Which power stayed the same, in a new form?',
          'Which direction of influence do you see more evidence for: people shaping the product, or the product shaping people?',
        ],
      },
    ],
    sampleNote: EXAMPLE_NOTE,
    need: 'Someone who did it the old way, if you can: a parent, a teacher, a clerk.',
    endUp: 'One line to carry to Synthesis',
    parts: [
      {
        id: 'timeline',
        label: 'Timeline',
        title: 'The timeline',
        example: {
          page: '1.05',
          alt: 'Page 1.05, the timeline, filled with Meera’s example. Then: paper form, principal signs, father takes it to the district office, a clerk checks it. Recently: apply online, then hand a printout to the college. Now: fully online, OTP to a registered phone, college verifies. Two arrows: people to product (a workaround users invented that the product now depends on: the café “setting” for 200KB PDFs) and product to people (a habit the product forced on everyone: owning a PDF, an OTP number and an email). Who lost a role (the clerk who could explain and make exceptions) and who gained one (cybercafé owners, form-filling agents). Teal questions: what did the product remove, which power stayed the same, which direction of influence, and a line to carry to Synthesis.',
          note: 'Illustrative example, in [brackets]. Build yours from a real conversation or real archives.',
        },
        blank: {
          page: '1.05',
          alt: 'The same page, to fill in.',
          pdf: 'c1-history-timeline-template.pdf',
          printed: 'p.1.05',
          shared: true,
          downloadNote: TEMPLATE_DL,
        },
        steps: [
          'Talk to someone who did it before it went digital.',
          'Write Then, Recently and Now on the timeline.',
          'Put each change on its arrow: what users bent, and what the product forced.',
          'Note who lost a role and who gained one.',
          'Answer the teal questions. Write one line to carry to Synthesis.',
        ],
        board: 'B3',
      },
    ],
    cardKit: {
      boards: ['B3'],
      sheets: ['S1', 'S3'],
      page: 'p.1.23',
      intro: 'One board. Notes go on the timeline; People cards move to “lost a role” or “gained a role”.',
      steps: [
        'Talk to someone who did it before it went digital.',
        'Put notes on the timeline. Move People cards (S3) to lost or gained.',
        'Put each change on its arrow. Answer the question cards.',
        'Circle the arrow you see more evidence for: people → product, or product → people.',
      ],
    },
  },
  {
    component: 'existing-products',
    slug: 'the-break',
    short: 'The Break',
    number: 3,
    of: 4,
    name: 'The Break',
    question: 'Where does the ideal story break, and who gets blamed?',
    time: '45 min',
    worksOnItsOwn: true,
    shows: 'What each step quietly needs from the user, where it breaks for a real person, and who the error blames.',
    done: 'Every step has its four needs, your villain persona has walked the flow, and the likeliest break is starred.',
    whatIsIt: [
      'Part A · Ideal flow + what each step needs. Map the product’s main feature the way the designers imagined it: everything works. Then write what each step quietly needs from the user.',
      'Part B · The Villain Story. Now imagine everything going wrong. Walk someone very unlike the ideal user through your ideal flow, one step at a time.',
    ],
    words: [
      { term: 'Ideal flow', def: 'The steps as the designers imagined them: everything works.' },
      { term: 'Four needs', def: 'People (who must help?), objects (what must they own?), systems (what else must work?), information (what must they know?).' },
      { term: 'Villain persona', def: 'Someone very unlike the ideal user, with one hard constraint.' },
      { term: 'System failure', def: 'Something in your Systems row doesn’t work.' },
      { term: 'Person unavailable', def: 'Someone from your People row isn’t there.' },
      { term: 'Object missing', def: 'Something from your Objects row isn’t at hand.' },
      { term: 'Information gap', def: 'They don’t know it, and the product doesn’t say.' },
      { term: 'No time', def: 'Everything is there, except the time it needs.' },
    ],
    extras: [
      {
        title: 'Orange, yellow, teal',
        body: 'Write each step as a short verb on an orange note (the story). Teal notes are what you think.',
      },
    ],
    sampleNote: EXAMPLE_NOTE,
    need: 'The product open, and your field notes on real failures',
    endUp: 'The step most likely to break, and the likeliest break, for Synthesis',
    parts: [
      {
        id: 'a',
        label: 'Part A',
        title: 'Ideal flow + what each step needs',
        example: {
          page: '1.06',
          alt: 'Page 1.06, ideal flow and what each step needs, filled with Meera’s example. The feature: upload documents and submit, with its goal (application submitted, confirmation received). Six steps as short verbs on orange notes (logs in with mobile, fills in details, uploads marksheet PDF, enters OTP, submits, gets confirmation) and four rows under them: people who must help, objects they must own, systems that must work, and information they must know. A dot goes on every need the product leaves the user to sort out alone, counted out of the total. Teal note: who was this designed for (someone with their own laptop, a scanner, broadband and an uninterrupted hour). A line to carry forward: the step most likely to break.',
          note: 'Illustrative example, in [brackets].',
        },
        blank: {
          page: '1.06',
          alt: 'The same page, to fill in.',
          pdf: 'c1-break-flow-needs-template.pdf',
          printed: 'p.1.06',
          shared: true,
          downloadNote: TEMPLATE_DL,
        },
        steps: [
          'Pick the core feature. Write its goal.',
          'Write each step as a short verb on an orange note, the way it’s meant to go.',
          'Fill the four rows: people, objects, systems, information.',
          'Put a dot on every need the product leaves the user to sort out alone. Count them.',
          'Say who it was designed for (teal). Write the step most likely to break.',
        ],
        board: 'B4',
      },
      {
        id: 'b',
        label: 'Part B',
        title: 'The Villain Story',
        example: {
          page: '1.07',
          alt: 'Page 1.07, the Villain Story, filled with Meera’s example. 1 Your villain persona: Meera, 19, applying on her phone, with one hard constraint: the registered phone is her father’s. 2 Walk the flow: for each step from page 1.06, pick the failure card most likely to happen to this persona, and write what broke, what they did instead, how likely it is out of 10, and who pays and what (step 3, object missing, no scanner and no PDF, she pays a café, 8/10; step 4, person unavailable, her father is in the field and the OTP expires, 7/10). The five failure cards are printed below to cut out. 3 Quick check: who gets blamed? When step 3 fails, the error makes it sound like the fault of the user or the product; it should say “Photos work too. We’ll make the PDF for you.” A line to carry forward: the likeliest break.',
          note: 'Illustrative example, in [brackets].',
        },
        blank: {
          page: '1.07',
          alt: 'The same page, to fill in.',
          pdf: 'c1-break-villain-story-template.pdf',
          printed: 'p.1.07',
          shared: true,
          downloadNote: TEMPLATE_DL,
        },
        steps: [
          'Make a villain persona unlike the ideal user, with one hard constraint.',
          'Walk your ideal flow (p.1.06) one step at a time. At each step, pick the failure card most likely to happen to this persona.',
          'Write what broke, what they did instead, how likely it is out of 10, and who pays.',
          'Star ★ the likeliest break.',
          'Quick check: when that step fails, does the error blame the user or the product? Write what it should say. Then write the likeliest break to carry forward.',
        ],
        board: 'B5',
      },
    ],
    cardKit: {
      boards: ['B4', 'B5'],
      sheets: ['S1', 'S4', 'S5', 'S6'],
      page: 'p.1.24–1.25',
      intro: 'Two boards, in order. Need cards go under each step on B4; then your villain persona walks the flow on B5 and draws a failure card at each step.',
      steps: [
        'Put the steps on orange notes along the top of B4. Need cards (S4) go under each step.',
        'Fill the dot on every need left for the user to solve. Count them.',
        'Deal one constraint card (S6) to your villain persona on B5.',
        'Walk each step. Draw the likeliest failure card (S5). Write who pays.',
        'Star the likeliest break. Take it to the Blame Scale strip and place tokens 1, 2 and ★.',
      ],
    },
  },
  {
    component: 'existing-products',
    slug: 'power',
    short: 'Power',
    number: 4,
    of: 4,
    name: 'Power',
    question: 'What does this product do to power?',
    time: '30 min',
    worksOnItsOwn: true,
    shows: 'Who built it, what it protects, what it does to people, and whose unpaid work keeps it running.',
    done: 'All five parts are filled from things you looked up, every finding is rated, and you have written one line to carry to Synthesis.',
    whatIsIt: [
      'Zoom out from one user to everyone around the product: who built it, what it protects, and whose work keeps it running. Look things up rather than guessing.',
    ],
    words: [
      { term: 'Who built it?', def: 'Yellow notes: what you found. Were they rushing, saving money or ticking boxes?' },
      { term: 'What does it protect?', def: 'Teal notes: what you think. Where the most effort is demanded, and what that protects.' },
      { term: 'What does it do to people?', def: 'Teal notes. After using it, are people more independent or more dependent? What do they hand over?' },
      { term: 'Unpaid helpers', def: 'Who does work to make this product function, without being paid or credited by the product? Would it still work without them?' },
      { term: 'Findings', def: 'Write each one, then rate it: minor, major or critical.' },
    ],
    extras: [],
    sampleNote: EXAMPLE_NOTE,
    need: 'Tender documents or press about who built it, the grievance page, and your notes from Tools 1–3. Look things up rather than guessing.',
    endUp: 'Rated findings, and one line to carry to Synthesis',
    parts: [
      {
        id: 'power',
        label: 'Power',
        title: 'What does it do to power?',
        example: {
          page: '1.08',
          alt: 'Page 1.08, what does it do to power, filled with Meera’s example. 1 Who built it: a government IT agency, through a vendor; they seem to have been rushing, saving money or ticking boxes, because errors read “file size exceeds limit”. 2 What does it protect: the most effort is demanded at document checks, which protects the scheme from fraud, not students from failing; reaching a real person takes 4+ steps. 3 What does it do to people: more dependent, because they need a café and a father’s phone; it asks them to hand over income, bank and ID details. 4 Unpaid helpers: the café owner (paid by the student), her father who receives the OTP, college staff now doing tech support; would the product still work without them? 5 Findings, each rated minor, major or critical (the OTP goes to someone else’s phone; errors are written for engineers). A line to carry to Synthesis.',
          note: 'Illustrative example, in [brackets]. Check who built your product and how its grievance path works before writing.',
        },
        blank: {
          page: '1.08',
          alt: 'The same page, to fill in.',
          pdf: 'c1-power-template.pdf',
          printed: 'p.1.08',
          shared: true,
          downloadNote: TEMPLATE_DL,
        },
        steps: [
          'Who built it? Look up the agency and the vendor. Were they rushing, saving money or ticking boxes?',
          'What does it protect? Find where the most effort is demanded, and how many steps it takes to reach a person.',
          'What does it do to people: more independent, or more dependent? What do they hand over?',
          'List the unpaid helpers. Would the product still work without them?',
          'Write each finding and rate it. Write one line to carry to Synthesis.',
        ],
        board: 'B6',
      },
    ],
    cardKit: {
      boards: ['B6'],
      sheets: ['S1', 'S3', 'S7'],
      page: 'p.1.26',
      intro: 'One board. Read the product through each lens card, put the people who keep it running under Unpaid helpers, and rate every finding by where you place it.',
      steps: [
        'Choose: this product live, or 2–3 similar ones.',
        'Read it through each lens card (S7). Answer on teal notes.',
        'Put People cards (S3) under Unpaid helpers. Tick Paid by it, Credited and Needed on each.',
        'Place each finding card (S7) under minor, major or critical.',
      ],
    },
  },
  {
    component: 'existing-products',
    slug: 'synthesis',
    short: 'Synthesis',
    name: 'Synthesis',
    kind: 'Closing',
    question: 'Make the stories compete until one direction survives.',
    time: '20 min',
    worksOnItsOwn: false,
    shows: 'The one direction that survives when your carried lines compete, written as a design claim.',
    done: 'Every blank in the design claim points to something you already wrote.',
    whatIsIt: [
      'Make the stories compete. Copy your five carried lines. Then fill the sentences in order. Every blank should point to something you already wrote.',
    ],
    words: [],
    extras: [],
    sampleNote: EXAMPLE_NOTE,
    need: 'Everything from Tools 1–4: the one line you carried from each',
    endUp: 'A design claim: “We should redesign ___, because it would shift blame from ___ to ___, and would specifically help ___.”',
    stepsTitle: 'The six steps',
    stepsList: [
      { title: 'Your carried lines', body: 'Copy, don’t reread: Media, Gossip, History, The Break and Power.' },
      { title: 'The sharpest contradiction', body: '“The product claims ___, but ___ revealed ___.”' },
      { title: 'Three possible redesigns', body: 'Specific screens or steps. “The one that takes the most blame off the user is ___, because ___.”' },
      { title: 'The power test', body: '“If this were built, ___ would gain ___. ___ would resist it, because ___.”' },
      { title: 'The finding', body: '“This product assumes ___, but the user actually has ___, which causes ___.”' },
      { title: 'The design claim', body: '“We should redesign ___, because it would shift blame from ___ to ___, and would specifically help ___.”' },
    ],
    parts: [
      {
        id: 'synthesis',
        label: 'Closing',
        title: 'Make the stories compete',
        example: {
          page: '1.09',
          alt: 'Page 1.09, make the stories compete, filled with Meera’s example. 1 Your carried lines: Media (promises “one place, seamless”), Gossip (nobody can tell you where your application is), History (you can no longer plead your case to a person), The Break (no way to make a PDF on a phone, 8/10), Power (it only works because of unpaid helpers). 2 The sharpest contradiction: the product claims to be one seamless place, but the Villain Story revealed it needs a scanner, a café and a father’s phone. 3 Three possible redesigns (photo-to-PDF inside the upload step; an error that says how to fix it; OTP to a number she chooses); the one that takes the most blame off the user is the first. 4 The power test. 5 The finding. 6 The design claim: redesign the upload step, because it would shift blame from the student to the portal’s missing PDF path, and would specifically help students who only have a phone.',
          note: 'Illustrative example, in [brackets].',
        },
        blank: {
          page: '1.09',
          alt: 'The same page, to fill in.',
          pdf: 'c1-synthesis-template.pdf',
          printed: 'p.1.09',
          shared: true,
          downloadNote: TEMPLATE_DL,
        },
        steps: [
          'Copy your five carried lines. Don’t reread.',
          'Write the sharpest contradiction.',
          'Name three possible redesigns. Pick the one that takes the most blame off the user.',
          'Run the power test, then write the finding.',
          'Fill the design claim last. Every blank should point to something you already wrote.',
        ],
        board: 'B7',
      },
    ],
    isItWorking: {
      good: [
        'The hardest contradiction in the Venn surprises you.',
        'The dots on your ideal flow make you uneasy about assumptions you’d have made yourself.',
        'Your villain persona turns out to be common, not rare.',
        'Your five carried lines point at the same problem from different sides.',
        'You name people the product has never named.',
      ],
      warnings: [
        { sign: 'All three Venn circles say the same thing.', fix: 'Research deeper, or pick a product people actually talk about.' },
        { sign: 'Your villain is just the ideal user with one inconvenience.', fix: 'Pick a harder constraint: a shared phone, a missing document, a passed deadline.' },
        { sign: '“Specifically help ___” names a category, not a person.', fix: 'Go back to Unpaid helpers (p.1.08) and name one person.' },
        { sign: 'You can fill the design claim without looking at your carried lines.', fix: 'It’s coming from your head, not the evidence. Go back to the table.' },
      ],
    },
    cardKit: {
      boards: ['B7'],
      sheets: ['S8'],
      page: 'p.1.27',
      intro: 'One board, and all your cards from Tools 1–4. Synthesis cards (S8) hold one line from each tool, three redesigns, and the claim.',
      steps: [
        'Put one line from each tool on the board. Each must point to a card.',
        'Write the sharpest contradiction.',
        'Place redesign cards A, B and C on the Blame Scale. Which one moves the blame furthest toward the system?',
        'Run the Power test, then write the finding.',
        'Fill the claim card last. Every blank must point to a card already on the board.',
      ],
    },
  },
];
