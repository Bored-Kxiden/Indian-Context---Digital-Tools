// The Fidelity Protocol rule, in one place so the site and the interactive
// checker cannot drift apart:
//
//   A finding missing any of the four tags cannot carry full confidence
//   until it has been re-checked.

export const INTERPRETERS = {
  'none-needed': 'None needed (researcher and participant share the language)',
  'research-coordinator': 'A known research coordinator',
  'independent-interpreter': 'An independent interpreter',
  'professional-translator': 'A professional translator, after the fact',
} as const;

export const RENDERINGS = {
  verbatim: 'Verbatim quote',
  gloss: 'Conceptual gloss (same meaning, different words)',
  paraphrase: 'Paraphrase (gist only)',
} as const;

export type Interpreter = keyof typeof INTERPRETERS;
export type Rendering = keyof typeof RENDERINGS;

export interface FidelityTags {
  /** The actual language(s) spoken, including code-switches. Never just "English". */
  sourceLanguage?: string;
  interpreter?: Interpreter;
  rendering?: Rendering;
  /**
   * true  = rests on one person's reading alone
   * false = a second interpreter read it the same way
   * undefined or null = not yet recorded
   */
  singleSource?: boolean | null;
}

export interface FidelityAssessment {
  full: boolean;
  /** Plain-language reasons the finding cannot yet carry full confidence. */
  gaps: string[];
}

export function assessFidelity(tags: FidelityTags): FidelityAssessment {
  const gaps: string[] = [];
  if (!tags.sourceLanguage?.trim()) {
    gaps.push('Source language is not recorded (name the actual language and any code-switching).');
  }
  if (!tags.interpreter) {
    gaps.push('Who interpreted is not recorded.');
  }
  if (!tags.rendering) {
    gaps.push('Rendering type is not recorded (verbatim, gloss, or paraphrase).');
  }
  if (tags.singleSource == null) {
    gaps.push('Single-source check has not been done (has a second interpreter read it?).');
  } else if (tags.singleSource) {
    gaps.push('Rests on one person alone. A second interpreter needs to read it before it is trusted.');
  }
  return { full: gaps.length === 0, gaps };
}
