// Toolkit-wide content from the booklet's front and back matter (pages 02–06 and the closing page).

export const whyThisExists = {
  title: 'Every product assumes a world.',
  body: 'A personal phone. Steady data. A scanner nearby. In India that world isn’t the same for everyone. When it doesn’t match, people build their own way around, or give up. This toolkit helps you see that gap before you design.',
  madeFor: ['Design students', 'Product teams', 'NGO & public-service teams', 'Field researchers'],
  without: '“Improve the upload experience.”',
  with: '“The upload assumes a scanner that isn’t there. It costs her a cybercafé trip and a relay through her father. It’s not an interface problem.”',
};

export const guideline = {
  eyebrow: 'The one guideline',
  title: 'Be specific. One real person, one real thing.',
  body: 'One real product, or one action someone had to do. Follow it from start to end, the way it actually happened. Every component in this book works on something you can point to.',
  whatCounts: {
    title: 'What counts as “one real thing”',
    body: 'A named product you can open, or an action with a clear start and end. It can happen on a phone, on paper, or in person.',
  },
  good: ['Meera uploading her documents for a scholarship', 'A shopkeeper paying the electricity bill', 'The National Scholarship Portal'],
  tooBroad: ['Students using government portals', 'How rural users pay bills', 'Government portals'],
  adapt: 'Everything else is yours to adapt: which components and tools you use, their order, the labels, the language.',
};

export const howToRead = {
  title: 'How to read this toolkit',
  steps: [
    { title: 'Pick a component.', body: 'Each one works on its own. Read its opening pages first.' },
    { title: 'Pick a tool.', body: 'Read its page: what it shows you, and when you’re done.' },
    { title: 'Follow the example.', body: 'Follow the steps on the filled example.' },
    { title: 'Fill the template.', body: 'Print the blank template and fill it for your person.' },
    { title: 'Move on, or stop.', body: 'Take what you made to the next tool, or stop there.' },
  ],
  everyTool: {
    title: 'How every tool works',
    lead: 'Three parts, always in this order. On this site they are tabs.',
    parts: [
      { title: '1 · Read the Guide', body: 'What the tool shows you, when you’re done, and the words you’ll see.', icon: 'info' },
      { title: '2 · Follow the Example', body: 'A filled example with Meera. Steps sit beside it. Green tags show where each card goes.', icon: 'bulb' },
      { title: '3 · Fill the template', body: 'Print the blank, or lay out the board and cards with your team.', icon: 'file' },
    ],
  },
};

export const meera = {
  name: 'Meera, 19',
  eyebrow: 'A persona example',
  title: 'Meet Meera.',
  lead: 'Our example persona. She appears in every component.',
  facts: [
    { k: 'Who', v: 'First in her family at college' },
    { k: 'Where', v: 'Hostel in a Tier-2 town; family in a village' },
    { k: 'Device', v: 'Her own Android phone, prepaid data' },
    { k: 'Task', v: 'Upload documents to a national scholarship portal' },
  ],
  screen: {
    label: 'The screen',
    quote: '“PDF only, max 200KB.”',
    body: 'Plus an OTP to the registered number. If it fails: an error, with no hint how to fix it.',
  },
  outcome: 'It takes her three days, a cybercafé, her father’s phone and a family trip home. One attempt is lost when her data runs out.',
  useYourOwn: {
    title: 'Now use your own persona.',
    body: 'Take the persona from your project. No persona yet? Make one before you start: who they are, where they live, what phone they use, and the one thing they had to do.',
  },
  note: 'Meera appears in every example. Your person should replace her.',
};

export const afterTheToolkit = {
  eyebrow: 'After the toolkit',
  title: 'It doesn’t end here.',
  steps: [
    'Test your idea: run it back through the Villain Story (Component 1, Tool 3) or the Cut (Component 4, Tool 2).',
    'Carry the brief into the next component.',
    'Re-map the same person in six months.',
    'Write your own tool card, and share it back.',
  ],
  furtherReading: [
    'Escobar, Designs for the Pluriverse',
    'Sen, the capability approach',
    'Max-Neef, Human Scale Development',
    'Silverstone & Haddon, domestication of ICTs',
    'Barber & Badre, culturability',
    'Nesta, DIY Toolkit',
  ],
  formPrinciple: {
    label: 'Our form principle',
    text: 'Make the complexity visible without making the interaction complex.',
  },
};
