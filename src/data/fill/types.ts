// "Fill on screen": a template, card or worksheet described as fields, so the site can show it as a form
// (src/components/fill/FillForm.astro) that saves on the reader's device (src/scripts/fill/store.ts).
// Labels and [bracketed] examples are the booklet's own; an example shows as the empty field's placeholder,
// exactly as the printed page shows it in brackets.

export type Blank = { id: string; example?: string; size?: 's' | 'm' | 'l' };

export type Field =
  /** One line of text, or several when `rows` is more than 1. */
  | { kind: 'text'; id: string; label: string; example?: string; hint?: string; rows?: number }
  /** A sentence with blanks, e.g. "The product claims ___, but ___ revealed ___." */
  | { kind: 'sentence'; id: string; label?: string; parts: (string | Blank)[] }
  /** Pick one (or several) of a few options. */
  | { kind: 'choice'; id: string; label: string; options: string[]; multiple?: boolean; hint?: string }
  /** A tick box. */
  | { kind: 'flag'; id: string; label: string; text: string; hint?: string }
  /** A group of fields the reader can add again and again (cards, quotes, rows). */
  | { kind: 'repeat'; id: string; label: string; itemLabel: string; fields: Field[]; start?: number; csv?: boolean }
  /** Guidance shown between fields. */
  | { kind: 'note'; text: string };

export interface FillSection {
  id: string;
  title: string;
  lead?: string;
  fields: Field[];
}

export interface FillTemplate {
  /** Stable id: the key the answers are saved under. Never change one that has shipped. */
  id: string;
  title: string;
  /** "Component 1 · Synthesis" */
  context: string;
  c: 'c1' | 'c2' | 'c3' | 'c4' | 'ink';
  /** Where it comes from, e.g. "Booklet p.1.09". */
  source: string;
  /** Site path of the page it belongs to. */
  page: string;
  /** The part's "How to use it" steps, shown as a checklist. */
  steps?: string[];
  sections: FillSection[];
  /** true when the booklet's fields are all here; false for "steps and notes" only. */
  complete: boolean;
}
