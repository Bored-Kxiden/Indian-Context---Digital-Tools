// Keyword tips (D43): the kit's jargon, explained in one plain sentence when a reader points at it, focuses it
// or taps it. After the build, scripts/mark-terms.mjs finds the first use of each term in a page's text and
// marks it; the sentence and a link to the glossary entry appear in a small pop-up.
//
// Write tips for someone new to design research: short, everyday words, no other jargon. `match` lists the
// spellings to look for (case does not matter; whole words only). `glossary` is the entry the tip links to.
// A term is marked once per page, and only in running text (not in headings, links, buttons, forms or the
// booklet's rebuilt pages).

export interface Tip {
  match: string[];
  tip: string;
  glossary?: string;
}

export const tips: Tip[] = [
  // The idea
  { match: ['edge case', 'edge cases'], tip: 'Someone a product treats as an exception: a person its designers didn’t plan for.', glossary: 'edge-case' },
  { match: ['persona', 'personas'], tip: 'An invented “typical user”. This kit swaps it for real people in real situations.', glossary: 'persona' },
  { match: ['positionality', 'positionality note'], tip: 'Who you are and where you stand, and how that shapes what you notice and miss.', glossary: 'positionality' },
  { match: ['Meera'], tip: 'The kit’s running example: a made-up student applying for a scholarship. Her pages are illustrative.', glossary: 'meera' },
  { match: ['carried line', 'carried lines', 'line to carry', 'one line to carry'], tip: 'The one-line finding you write at the end of a tool, to use later without rereading.', glossary: 'carried-line' },
  { match: ['design claim'], tip: 'One sentence saying what to redesign, who it would help, and who it stops blaming.', glossary: 'design-claim' },
  { match: ['card kit'], tip: 'Printed boards and cards for running the tools around a table with a group.', glossary: 'card-kit' },

  // Reading Existing Products
  { match: ['Media Story'], tip: 'What the product’s ads and official pages promise, and who they picture as the user.', glossary: 'media-story' },
  { match: ['Gossip Venn'], tip: 'Three circles of what people say about the product, compared for where they agree and clash.', glossary: 'gossip-venn' },
  { match: ['ideal flow'], tip: 'The steps of a feature as its designers imagined them, when everything works.', glossary: 'ideal-flow' },
  { match: ['Villain Story', 'villain persona'], tip: 'Walking someone very unlike the ideal user through the product, step by step, to see where it breaks.', glossary: 'villain-story' },

  // Reading Visual Culture
  { match: ['visual culture'], tip: 'What people have learned to notice, trust, ignore and act on, not how things look.', glossary: 'component-visual-culture' },
  { match: ['photo missions', 'missions'], tip: 'Short prompts telling participants what to photograph in their own world.', glossary: 'mission' },
  { match: ['talk-back', 'talk-backs'], tip: 'Sitting with a participant to hear, in their own words, what each photo shows.', glossary: 'talk-back' },
  { match: ['affinity passes', 'affinity'], tip: 'Sorting photos or notes into groups by what they have in common.' },
  { match: ['nine structures'], tip: 'Nine kinds of question to test each group of photos against, such as who helps or what changes form.', glossary: 'nine-structures' },
  { match: ['Context Scenario'], tip: 'One real situation, backed by photos and quotes: who, where, when, under what conditions and with whose help.', glossary: 'context-scenario' },
  { match: ['Context Profile'], tip: 'What a person does in one situation, turned into questions about the system around them.', glossary: 'context-profile' },
  { match: ['evidence status'], tip: 'A label for how you know something: you saw it, they said it, it’s your reading, or it’s a guess to check.', glossary: 'evidence-status' },
  { match: ['Visual Toolkit'], tip: 'The photos made in Reading Visual Culture, reused here.', glossary: 'visual-toolkit' },

  // Reading Material Conditions
  { match: ['Journey Strip'], tip: 'A simple strip of the steps a person goes through to get something done.', glossary: 'journey-strip' },
  { match: ['the Loop'], tip: 'A map of everything a task needs, placed closer to the person the easier it is to get.', glossary: 'loop' },
  { match: ['the Ladder', 'Access Ladder'], tip: 'Seven simple questions about each key item, to find where it stops working.', glossary: 'ladder' },
  { match: ['Chinese whispers'], tip: 'A chain of people passing a message on, where it changes a little at each step.', glossary: 'chinese-whispers' },
  { match: ['offload'], tip: 'When a product passes a cost or a task on to the person, or to the people who help them.', glossary: 'offload' },
  { match: ['oversight'], tip: 'Something the designers simply didn’t think of.', glossary: 'oversight' },

  // Reading Language Conditions
  { match: ['thick translation'], tip: 'Translating with the context, tone and implied meaning kept in, not word for word.', glossary: 'thick-translation' },
  { match: ['reverse thick translation'], tip: 'Checking a translation the other way: asking other people from the same group what the phrase means to them.', glossary: 'reverse-thick-translation' },
  { match: ['Meaning Card', 'Meaning Cards'], tip: 'A card for one moment: the exact words, what you saw, your guess at the meaning, and the person’s own explanation.', glossary: 'meaning-card' },
  { match: ['cue cards'], tip: 'Six cards to read before an interview, reminding you what to watch for.', glossary: 'cue-cards' },
  { match: ['code-switching'], tip: 'Moving between languages in one conversation, like Hindi and English in the same sentence.', glossary: 'code-switching' },
  { match: ['kahavat'], tip: 'A spoken saying or idiom.', glossary: 'kahavat' },
  { match: ['Kahavat Relay'], tip: 'A drawing game: a saying is drawn, guessed and redrawn from person to person, to see how meaning shifts.', glossary: 'language-kahavat-relay' },
  { match: ['local language collaborator', 'language collaborator'], tip: 'A local speaker who checks your translations and readings.', glossary: 'local-language-collaborator' },
  { match: ['support check'], tip: 'Four tests a meaning has to pass before you rely on it.', glossary: 'support-check' },
  { match: ['design hypothesis'], tip: 'A guess about what wording or design will work, written so that it can be tested.' },
  { match: ['Expression Library'], tip: 'A shared record of real phrases and what people meant by them.', glossary: 'expression-library' },
  { match: ['Design Language Library'], tip: 'A shared record of interface wording that passed testing, and with whom.', glossary: 'design-language-library' },
  { match: ['fidelity tags', 'Fidelity Protocol'], tip: 'Labels for how sure you are that a translation keeps what was meant.', glossary: 'fidelity-tags' },
  { match: ['de-identified', 'de-identification'], tip: 'With names and other identifying details removed.', glossary: 'de-identified' },

  // Reflection
  { match: ['redaction'], tip: 'Crossing out what you would have said anyway, so only what the work taught you is left.', glossary: 'redaction' },

  // Borrowed terms
  { match: ['OTP', 'OTPs'], tip: 'One-time password: a code sent by SMS to check it’s you.', glossary: 'otp' },
  { match: ['CSC', 'Common Service Centre'], tip: 'A government-backed shop where people get help with online services, for a fee.', glossary: 'common-service-centre' },
];
