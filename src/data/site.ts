export const site = {
  name: 'Beyond the Edge Case',
  shortName: 'Beyond the Edge Case',
  eyebrow: 'Toolkit · BITSDES 2024–28',
  tagline: 'A toolkit for designing in Indian contexts by questioning the universal assumptions behind what gets treated as an exception.',
  description:
    'A toolkit for designing in Indian contexts by questioning the universal assumptions behind what gets treated as an exception.',
  repoUrl: 'https://github.com/Bored-Kxiden/Indian-Context---Digital-Tools',
  licenseName: 'MIT',
  bookletPdf: '/downloads/designing-for-the-indian-context-booklet.pdf',
};

export const nav = [
  { href: '/components/', label: 'Components' },
  { href: '/card-kit/', label: 'Card kit' },
  { href: '/guideline/', label: 'The guideline' },
  { href: '/about/', label: 'About' },
];

/**
 * The toolkit's introductory statement, in the owner's words. The home page and the About page
 * both read it from here.
 */
export const intro = {
  opening: [
    'Design often begins with a default user, a default environment and a default way of doing things.',
    'But India rarely offers a single set of conditions from which that default can be safely assumed.',
    'A person may navigate the same product through different languages, infrastructures, social networks, levels of institutional knowledge, material resources and forms of support.',
    'Some of these conditions may appear unusual when measured against a universalised model of use.',
  ],
  turn: 'But unusual to the system does not necessarily mean unusual to the person.',
  purpose: 'is a toolkit for finding and investigating these situations before they are reduced to exceptions.',
  shift: {
    lead: 'It helps designers move from:',
    from: '“How do I accommodate this edge case?”',
    to: '“What made this an edge case in the first place?”',
    joiner: 'to:',
  },
  central: 'What gets classified as an edge case depends on the baseline we design from.',
  idea: [
    'The goal is not to replace one universal with another.',
    'It is to design with the possibility that there are multiple legitimate ways of navigating the same world, and that some of them become invisible when design begins from a single assumed baseline.',
  ],
};
