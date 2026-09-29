import type { Tool } from './types';

// Component 4 · Reading Material Reality. Source: Toolkit Booklet, pages 4.01–4.22.
// Filled examples are illustrative (the booklet says so).

export const overview = {
  ideaLead: 'Everything around a screen that a person needs to get something done. The phone, the data, the papers, the places, the people who help. Products quietly assume all of it is there.',
  simpleUpload: {
    title: 'A “simple” upload actually needed',
    items: ['a charged phone', 'steady Wi-Fi', 'a scanner', 'knowing what a PDF is', 'the income certificate', '₹50', 'her father’s phone'],
  },
  layers: [
    { name: 'Devices', blurb: 'Whose phone, how old, how much space', icon: 'device' },
    { name: 'Connection', blurb: 'Data, Wi-Fi, signal, recharges', icon: 'wifi' },
    { name: 'Power', blurb: 'Battery, charging, power cuts', icon: 'battery' },
    { name: 'Places', blurb: 'Cybercafé, office, bank, home', icon: 'home' },
    { name: 'Papers', blurb: 'Certificates, IDs, printouts', icon: 'file' },
    { name: 'Money', blurb: 'What each step costs, and what it pushes aside', icon: 'rupee' },
    { name: 'People', blurb: 'Who helps, who holds the phone, who knows how', icon: 'people' },
    { name: 'Know-how', blurb: 'Knowing what an OTP or PDF is, in which language', icon: 'bulb' },
    { name: 'Time & privacy', blurb: 'A quiet hour, a private corner', icon: 'lock' },
  ] as const,
  lookPast: { from: 'Do they have it?', to: 'Can they really use it? And who and what do they lean on?' },
  routes: {
    quick: { title: 'Quick · about an hour', body: 'Tool 1 → Tool 2 → a three-line brief' },
    deep: { title: 'Deep · a field visit', body: 'All four, with participants' },
    all: 'Visual Toolkit photos + lenses → 1 Build → 2 Break → 3 Weigh → 4 Say',
  },
};

/** The booklet's "I want to…" list (page 4.03), verbatim, with the tool each item opens. */
export const iWantTo = [
  { phrase: '…see what my user’s world actually holds', tool: 'build', tag: '1 · Build', page: 'p.4.06', anchor: '' },
  { phrase: '…find where access breaks', tool: 'build', tag: '1 · Build', page: 'p.4.09', anchor: '#part-b' },
  { phrase: '…see who people depend on to get it done', tool: 'break', tag: '2 · Break', page: 'p.4.11', anchor: '' },
  { phrase: '…understand why people drop off', tool: 'break', tag: '2 · Break', page: 'p.4.14', anchor: '#part-b' },
  { phrase: '…know what gets compromised in their lives', tool: 'weigh', tag: '3 · Weigh', page: 'p.4.16', anchor: '' },
  { phrase: '…turn findings into a clear problem', tool: 'say', tag: '4 · Say', page: 'p.4.19', anchor: '' },
];

export const beforeYouStart = {
  step1: {
    title: 'First, map the journey.',
    lead: 'Tool 1 asks what a person uses at each step. You can only answer that once you know the steps. So write them down first.',
    alreadyHave: {
      title: 'Already have one?',
      body: 'Use your journey map or service blueprint. Need a refresher?',
      links: [
        { label: 'Journey mapping 101 · NN/g', href: 'https://www.nngroup.com/articles/journey-mapping-101/' },
        { label: 'Service blueprints · NN/g', href: 'https://www.nngroup.com/articles/service-blueprints-definition/' },
        { label: 'Experience Map & Blueprint · Nesta DIY Toolkit', href: '' },
      ],
    },
    newToThis: {
      title: 'New to this?',
      body: 'Use the Journey Strip. For each step, write where they are and what or who they use. Nothing else.',
      note: 'Every item in the bottom row becomes something you place on the Loop in Tool 1.',
    },
    image: '4.04',
    alt: 'The Journey Strip: an example for Meera (six steps from seeing the notice to uploading, with where she is and what or who she uses at each step), and a blank strip below to fill in for your own person.',
    pdf: 'c4-journey-strip.pdf',
    printed: 'p.4.04',
  },
  step2: {
    title: 'From the Visual Toolkit, bring these.',
    lead: 'In the Visual Toolkit, participants photograph and film their surroundings and tag each picture with a lens. Those tagged pictures, and the inferences you drew from them, are what Tool 1 builds on.',
    steps: [
      'Collect the photos, videos and lens tags.',
      'Sort each one: person ●, thing ■ or place ▲.',
      'Note how easy it is to reach: in hand, where they live, a trip away, or through someone.',
      'Print them small. Bring them to the Loop with your Journey Strip.',
    ],
    alsoBring: {
      title: 'Also bring your inferences',
      body: 'Turn each one into a question for the Ladder. “The router is shared by 40 rooms” becomes: does Wi-Fi keep working when she needs it?',
    },
    noVisualToolkit: {
      title: 'No Visual Toolkit?',
      body: 'Tool 1 still works. Ask the person to walk you through the task and sketch what they point to.',
    },
    image: '4.05',
    alt: 'Meera’s photos, sorted: six pictures each tagged with a placeholder lens, marked as person, thing or place, and by how easy each is to reach. Examples include the hostel Wi-Fi router, a cybercafé signboard, her father’s phone at home, and her phone at 12% battery.',
    note: 'Lens names in the example are placeholders. Use the lenses from your Visual Toolkit.',
  },
};

export const tools: Tool[] = [
  {
    component: 'material-reality',
    slug: 'build',
    short: 'Build',
    number: 1,
    of: 4,
    name: 'Build',
    question: 'What does the task need, and where does it stop working?',
    time: '45 min',
    group: 'Solo or with participant',
    effort: 2,
    mode: 'Desk or field',
    worksOnItsOwn: true,
    shows: 'Everything the task depends on, how easy each thing is to reach, and where each one stops working.',
    done: 'Every step of the journey has something on the map, and every key item is checked on the ladder.',
    whatIsIt: [
      'Two sheets. On the Loop, you place everything the task needs around the person. The easier something is to get to, the closer it sits. On the Ladder, you take the most important items and ask seven simple questions about each, to find where it fails.',
    ],
    words: [
      { term: 'Loop', def: 'A map of rings around the person. Inner rings are easier to reach.' },
      { term: 'Token', def: 'A sticker for a person ●, a thing ■ or a place ▲.' },
      { term: 'Line', def: 'One small action, like “borrows” or “pays for”.' },
      { term: 'Ladder', def: 'Seven yes/no questions, from “Does it exist?” to “Are they allowed to use it?”' },
    ],
    extras: [],
    need: 'Your Journey Strip (p.4.04) and Visual Toolkit photos (p.4.05)',
    endUp: 'A map of what the task needs, and where it breaks. Take the breaks to Tool 2.',
    guidePage: '4.06',
    parts: [
      {
        id: 'a',
        label: 'Part A',
        title: 'The Loop',
        example: {
          page: '4.07',
          alt: 'Filled example Loop: Meera and her upload task at the centre, with tokens for people, things and places on four rings from “in hand” to “through someone”. Lines carry verbs such as uploads on, pays to make PDF, asks for OTP, borrows and travels; photos sit beside their tokens.',
          note: 'Illustrative example.',
        },
        blank: {
          page: '4.08',
          alt: 'Blank Loop template: a person and task in the centre and four rings, from in hand to through someone, with a key for person, thing and place tokens, photos, and line types.',
          pdf: 'c4-build-loop-blank.pdf',
          printed: 'p.4.08',
        },
        steps: [
          'Write the person and the task in the centre.',
          'Add a token for each thing they used.',
          'Put it on the ring for how easy it is to reach.',
          'Draw a line for each action. Write the verb on it.',
          'Stick the photos next to their tokens.',
        ],
      },
      {
        id: 'b',
        label: 'Part B',
        title: 'The Access Ladder',
        example: {
          page: '4.09',
          alt: 'Filled example Access Ladder: six key things across the top (PDF know-how, father’s phone for the OTP, hostel Wi-Fi, data pack, income certificate, own phone) each checked down seven questions from “exists” to “permitted”, with a cross at the first “no”. Corners of the grid are labelled focus first, push for change, design for next, and keep an eye on.',
          note: 'Illustrative example.',
        },
        blank: {
          page: '4.10',
          alt: 'Blank Access Ladder template: space to write the key things across the top, seven questions down the side (exists, reachable, affordable, sustainable, theirs, usable, permitted), and the four priority corners.',
          pdf: 'c4-build-ladder-blank.pdf',
          printed: 'p.4.10',
          note: 'Every ✕ you marked can be taken into Tool 2 · Break.',
        },
        steps: [
          'Write the key things across the top.',
          'Order them by your priority.',
          'Go down each column. ✕ at the first “no”.',
          'Start with one shaded corner.',
        ],
      },
    ],
  },
  {
    component: 'material-reality',
    slug: 'break',
    short: 'Break',
    number: 2,
    of: 4,
    name: 'Break',
    question: 'Who fills each gap, and what happens when they can’t?',
    time: '45–60 min',
    group: 'With the person, or a group',
    effort: 2,
    mode: 'Field or desk',
    worksOnItsOwn: true,
    shows: 'Who the person turns to when something breaks, what gets lost on the way, and the few people everything depends on.',
    done: 'Every break has someone who solved it (or ✕), and each of them has been taken out once.',
    whatIsIt: [
      'It works like Chinese whispers. Take one thing that broke on the Ladder. Ask the person who they turned to, and who that person turned to. Write down what each one told them. Then imagine the most important helper isn’t there one day, and see what happens.',
    ],
    words: [
      { term: 'Whisper', def: 'The chain of people the person asked, in order.' },
      { term: 'Facts', def: 'The few key pieces of information in the original notice or form, like “PDF only”.' },
      { term: 'Big player', def: 'Whoever finally solved the problem.' },
      { term: 'Cut', def: 'Imagining that the big player isn’t available.' },
    ],
    extras: [
      {
        title: 'Play it live',
        body: 'Line up 4–6 people, one per role. The first reads the notice aloud and whispers it on. Compare the last line with the first, then ask one player to step out.',
      },
    ],
    need: 'The ✕s from your Ladder (p.4.09), and the person, or their chats and screenshots',
    endUp: 'Your big players, and what fails without them',
    guidePage: '4.11',
    parts: [
      {
        id: 'a',
        label: 'Part A',
        title: 'The Whisper',
        example: {
          page: '4.12',
          alt: 'Filled example Whisper for the break “PDF know-how”: four facts from the portal’s notice, then the chain of people Meera asked (roommate, class WhatsApp, a senior, the cybercafé owner), what each told her, what each added, and which facts survived. The cybercafé owner is the big player.',
          note: 'Illustrative example.',
        },
        blank: {
          page: '4.13',
          alt: 'Blank Whisper template: the facts copied from the original notice, then rows for who they asked, what they were told, and what it adds (told, shown, seen), ending with the big player. Repeat for every ✕.',
          pdf: 'c4-break-whisper-blank.pdf',
          printed: 'p.4.13',
        },
        steps: [
          'Pick one ✕ from your Ladder.',
          'Copy the facts from the original notice.',
          'Ask who they asked. Write what each one said.',
          'Dot if a fact survived, cross if it was lost.',
          'Whoever solved it is the big player.',
        ],
      },
      {
        id: 'b',
        label: 'Part B',
        title: 'Big players & the Cut',
        example: {
          page: '4.14',
          alt: 'Filled example Big players and the Cut: Meera with her father (two breaks), the cybercafé owner (one) and her own data pack (one) around her, plus a break nobody solves. Cutting her father shows what depends on him, the fallback, and whether it works. It ends with how the product could share his load.',
          note: 'Illustrative example.',
        },
        blank: {
          page: '4.15',
          alt: 'Blank Big players and the Cut template: circles for each big player around the person, with one line per break they solve, then a cut table with what depends on them, the fallback, and a ✓ or ✕ outcome, and a question on how the product could support them.',
          pdf: 'c4-break-big-players-blank.pdf',
          printed: 'p.4.15',
        },
        steps: [
          'Put every big player around the person.',
          'Draw one line per break they solve.',
          'Imagine the busiest one isn’t there.',
          'Write the fallback, then ✓ or ✕.',
          'Ask how the product could help them.',
        ],
      },
    ],
  },
  {
    component: 'material-reality',
    slug: 'weigh',
    short: 'Weigh',
    number: 3,
    of: 4,
    name: 'Weigh',
    kind: 'Co-creation',
    question: 'What gets compromised first, and how many people live like this?',
    time: '30 min + desk time',
    group: 'Done with the person',
    effort: 3,
    mode: 'Field',
    worksOnItsOwn: true,
    shows: 'What each cost from Tool 2 pushes aside in the person’s life, and how common their situation is.',
    done: 'The cards are sorted, the costs are placed, and each finding has a number with a source.',
    whatIsIt: [
      'A card-sorting game you play with the person. They lay out everyday needs in the order they’d give them up when money or time is short. You place the costs you found on those cards. Later, at your desk, you back each finding with a statistic.',
    ],
    words: [
      { term: 'Need cards', def: 'Everyday needs: food, rent, bills, health, education, phone and data, travel…' },
      { term: 'Compromised first', def: 'What they would cut or delay first.' },
      { term: 'Count card', def: 'One finding. The story on the front, a number and its source on the back.' },
    ],
    extras: [
      {
        title: 'Take care',
        body: 'Never ask about income. If family members disagree about the order, offer to sort in private.',
        tone: 'care',
      },
    ],
    need: 'The need cards (p.4.18) and the costs you found in Tool 2',
    endUp: 'What each cost pushes aside, and Count cards for Tool 4',
    guidePage: '4.16',
    parts: [
      {
        id: 'sort',
        label: 'Card sort',
        title: 'What gets compromised first?',
        example: {
          page: '4.17',
          alt: 'Filled example: Meera’s family sort nine need cards (savings, education, phone and data, travel, family and festivals, bills, rent and home, health, food) from “compromised first” to “protected last”. Her costs land on education, phone and data, and travel. A Count card shows the story on the front and a number with a source on the back.',
          note: 'Illustrative example. Fill [brackets] with the real figure and its source. Never estimate.',
        },
        blank: {
          page: '4.18',
          alt: 'Blank card-sort template: a sorting strip from compromised first to protected last, boxes for where the costs land and what moves the order, need cards to cut out (food, rent and home, bills, health, education, phone and data, travel, family and festivals, savings, and one to add), and a blank Count card.',
          pdf: 'c4-weigh-blank.pdf',
          printed: 'p.4.18',
          note: 'Translate the cards into the local language, and add a picture to each for people who don’t read.',
        },
        steps: [
          'Hand over the need cards. They sort.',
          'Ask what gets compromised first.',
          'Place the costs on the cards.',
          'Ask what changes the order.',
          'Later, write a Count card.',
        ],
      },
    ],
  },
  {
    component: 'material-reality',
    slug: 'say',
    short: 'Say',
    number: 4,
    of: 4,
    name: 'Say',
    question: 'What kind of problem is this, really?',
    time: '30 min',
    group: 'Solo or team',
    effort: 2,
    mode: 'Desk',
    worksOnItsOwn: true,
    shows: 'One clear statement of the problem, including who decided it and who pays for it.',
    done: 'A teammate who wasn’t there can say what kind of problem it is, without seeing your maps.',
    whatIsIt: [
      'A fill-in-the-blanks brief. You finish a few sentences about your biggest break, decide what kind of problem it is, and, if someone passed the cost on, say whose decision that was.',
    ],
    words: [
      { term: 'Oversight', def: 'Nobody thought of it.' },
      { term: 'Offload', def: 'Someone chose to pass the cost on to the person.' },
      { term: 'Constraint', def: 'The system doesn’t allow otherwise, yet.' },
    ],
    extras: [],
    need: 'What you found in Tools 1–3, and your Count cards',
    endUp: 'A one-page brief to design from',
    guidePage: '4.19',
    parts: [
      {
        id: 'brief',
        label: 'Brief',
        title: 'The brief pad',
        example: {
          page: '4.20',
          alt: 'Filled example brief pad: what the product assumed, what existed, what Meera did, what it cost her (three days, ₹30–50 plus data, a family trip), whether the problem is oversight, offload or constraint, three follow-up questions if it is an offload, the number it is true for, what to prototype next, and a one-line summary.',
          note: 'Illustrative example.',
        },
        blank: {
          page: '4.21',
          alt: 'Blank brief pad: sentence starters (the product assumed, what existed was, so they, it cost them, this is), a choice of oversight, offload or constraint, three follow-up questions for offloads, the number it is true for, what to prototype next, and a one-line summary.',
          pdf: 'c4-say-brief-blank.pdf',
          printed: 'p.4.21',
          note: 'Answer the three ↳ questions only if you picked Offload.',
        },
        steps: [
          'Finish each sentence for your biggest break.',
          'Pick the kind of problem.',
          'If it’s an offload, answer the ↳ questions.',
          'Add the number. Write it in one line.',
          'Test your idea back in Tool 2.',
        ],
      },
    ],
  },
];

export const participants = {
  title: 'Ask your participants',
  lead: 'Ask about the task, never about what someone lacks.',
  cards: [
    { tool: 'Tool 1 · Build', text: '“Show me the last time you did this — from the very start.”' },
    { tool: 'Tool 2 · Break', text: '“Who did you ask? And who did they ask?”' },
    { tool: 'Tool 2 · Break', text: '“Do you know anyone who tried and gave up?”' },
    { tool: 'Tool 3 · Weigh', text: '“When money is short, what gets compromised first?”' },
  ],
  consent: {
    title: 'Consent · read aloud',
    text: '“There are no right answers. Skip anything, stop any time. We won’t use your name, or anyone’s who helped you.”',
  },
  care: ['Never ask income', 'Helpers by role, not name', 'Sensitive questions in private', 'Let them hold the cards', 'Go back and share what you found'],
  image: '4.22',
  alt: 'Field cards, “Ask your participants”: four questions to ask (one for Build, two for Break, one for Weigh), a consent statement to read aloud, and five care reminders.',
  pdf: 'c4-ask-your-participants.pdf',
  printed: 'p.4.22',
};
