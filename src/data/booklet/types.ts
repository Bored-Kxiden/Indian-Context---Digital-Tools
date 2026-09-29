// Shapes for the content that comes from the Toolkit Booklet (Components 1 and 4).
// Wording is copied from the booklet; see CONTEXT.md, section 6.

export type BookletComponent = 'existing-products' | 'material-reality';

export interface Word {
  term: string;
  def: string;
}

/** An extra block on a tool's guide: a list, a caution, or a short method note. */
export interface Extra {
  title: string;
  body?: string;
  list?: string[];
  tone?: 'plain' | 'care' | 'remember';
}

export interface Part {
  id: string;
  /** "Part A" */
  label: string;
  title: string;
  example: {
    /** Booklet page id, e.g. "1.06" (image in /public/booklet). */
    page: string;
    alt: string;
    note: string;
  };
  blank: {
    page: string;
    alt: string;
    /** Filename in /public/downloads/templates. */
    pdf: string;
    /** Printed page label shown next to the download, e.g. "p.1.07". */
    printed: string;
    /** True when the example and the blank share one booklet page. */
    shared?: boolean;
    note?: string;
  };
  /** The booklet's "How to use it" steps. */
  steps: string[];
  /** Where this part sits in the card kit, e.g. "Board B1". */
  board?: string;
}

export interface ToolCardKit {
  boards: string[];
  sheets: string[];
  /** Printed page label in the booklet, e.g. "p.1.34". */
  page: string;
  /** "Play it on the table" intro. */
  intro: string;
  /** "At the table" steps, from the boards. */
  steps: string[];
}

export interface Tool {
  component: BookletComponent;
  slug: string;
  /** Rail and breadcrumb label. */
  short: string;
  number?: number;
  of?: number;
  name: string;
  /** e.g. "Co-creation" */
  kind?: string;
  question: string;
  time: string;
  group: string;
  effort: 1 | 2 | 3;
  mode: string;
  worksOnItsOwn: boolean;
  shows: string;
  done: string;
  whatIsIt: string[];
  words: Word[];
  extras: Extra[];
  need: string;
  endUp: string;
  /** Booklet page id of the tool's guide page. */
  guidePage: string;
  parts: Part[];
  cardKit?: ToolCardKit;
  /** Synthesis only: the "Is it working?" page. */
  isItWorking?: { good: string[]; warnings: { sign: string; fix: string }[] };
  /** Synthesis only: the seven steps. */
  sevenSteps?: { title: string; body: string }[];
}
