// Shapes for the content that comes from the Toolkit Booklets: Components 1 and 4 (the first
// booklet) and Components 2 and 3 (the second). Wording is copied from the booklets; see
// CONTEXT.md, section 6.

export type BookletComponent = 'existing-products' | 'visual-culture' | 'language' | 'material-reality';

export interface Word {
  term: string;
  def: string;
}

/** An extra block on a tool's guide: a list, a caution, or a short method note. */
export interface Extra {
  title: string;
  body?: string;
  list?: string[];
  /** Show a list of short words as chips in a row, not as bullets. */
  chips?: boolean;
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
    /** Replaces the default "example and blank share one page" line, e.g. for a read-first sheet. */
    sharedNote?: string;
    /** True for a print-only sheet with no form to fill in (listed under Print, not under Blank template). */
    skip?: boolean;
    /** Title and description of the download, when "blank template" is the wrong name for it. */
    downloadTitle?: string;
    downloadNote?: string;
    note?: string;
  };
  /** The booklet's "How to use it" steps. */
  steps: string[];
  /** Where this part sits in the card kit, e.g. "Board B1". */
  board?: string;
}

/** A pointer to a deeper page that belongs to this tool ("Go deeper"). */
export interface Ref {
  label: string;
  href: string;
  blurb: string;
}

/** An extra tab on a tool page, for content that is more than a paragraph or a list. */
export interface PanelDef {
  id: string;
  label: string;
  icon: string;
  /** "guide": right after the Guide tab. "end": after Blank template. */
  after?: 'guide' | 'end';
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
  /** Who does it, how hard it is, and where: shown when the booklet gives them (Components 2 to 4). */
  group?: string;
  effort?: 1 | 2 | 3;
  mode?: string;
  worksOnItsOwn: boolean;
  shows: string;
  done: string;
  whatIsIt: string[];
  words: Word[];
  extras: Extra[];
  /** After "Illustrative example." on the Example tab. Components 1 and 4 use a default. */
  sampleNote?: string;
  /** Under the Blank template heading. */
  blankNote?: string;
  /** Component 2: which frame of the Figma template does this tool's work (see `figma` in visual-culture.ts). */
  figmaFrame?: string;
  /** Deeper pages that belong to this tool. */
  refs?: Ref[];
  /** Extra tabs (rendered by src/components/panels). */
  panels?: PanelDef[];
  need: string;
  endUp: string;
  /** Booklet page id of the tool's guide page. Component 1 has none: its pages are templates. */
  guidePage?: string;
  parts: Part[];
  cardKit?: ToolCardKit;
  /** Synthesis only: the "Is it working?" page. */
  isItWorking?: { good: string[]; warnings: { sign: string; fix: string }[] };
  /** Synthesis only: the numbered steps, and their heading ("The six steps"). */
  stepsList?: { title: string; body: string }[];
  stepsTitle?: string;
}
