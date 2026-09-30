import expressionData from './expressions.json';
import patternData from './patterns.json';
import { assessFidelity, type FidelityAssessment, type FidelityTags } from '../utils/fidelity';

// Typed views over the two library data files. To add an entry, edit
// expressions.json or patterns.json (see the README). Entries flagged
// "sample": true are illustrative, not real participant data.

export type LensCode = 'N' | 'P' | 'T';
export type LensResult = 'pass' | 'fail' | 'untested';
export type TestedStatus = 'Confirmed' | 'Partially confirmed' | 'Not yet tested';

export const lensNames: Record<LensCode, string> = {
  N: 'New',
  P: 'Proxy',
  T: 'Trust',
};

export interface ExpressionEntry {
  id: string;
  sample?: boolean;
  title: string;
  originalText: string;
  language: string;
  literal: string;
  implied: string;
  setting: string;
  /** Lenses this moment is most relevant to when auditing interface copy. */
  lenses: LensCode[];
  fidelity: FidelityTags;
  sensitive: boolean;
}

export interface PatternEntry {
  id: string;
  sample?: boolean;
  title: string;
  type: 'Wording' | 'Interaction';
  context: string;
  pattern: string;
  /** A named segment (for example "India 2"), never a generic user. */
  audience: string;
  /** IDs of the Expression Library entries that justify this pattern. */
  cites: string[];
  status: TestedStatus;
  lenses: Record<LensCode, { result: LensResult; note?: string }>;
}

// The JSON is validated below (and by the build) rather than by TypeScript, since
// JSON imports widen string literals such as "verbatim" to plain strings.
export const expressions = expressionData as unknown as ExpressionEntry[];
export const patterns = patternData as unknown as PatternEntry[];

export const expressionById = new Map(expressions.map((e) => [e.id, e]));

export interface ExpressionView extends ExpressionEntry {
  assessment: FidelityAssessment;
  citedBy: string[];
}

export function getExpressions(): ExpressionView[] {
  return expressions.map((e) => ({
    ...e,
    assessment: assessFidelity(e.fidelity),
    citedBy: patterns.filter((p) => p.cites.includes(e.id)).map((p) => p.id),
  }));
}

export interface PatternView extends PatternEntry {
  /** Cited entries that cannot yet carry full confidence. */
  weakEvidence: string[];
  missingCitations: string[];
}

export function getPatterns(): PatternView[] {
  return patterns.map((p) => {
    const weakEvidence = p.cites.filter((id) => {
      const e = expressionById.get(id);
      return e && !assessFidelity(e.fidelity).full;
    });
    const missingCitations = p.cites.filter((id) => !expressionById.has(id));
    return { ...p, weakEvidence, missingCitations };
  });
}

// Fail the build if the data breaks the library's own rules: every pattern must
// cite at least one entry, and every citation must point at a real entry.
for (const p of patterns) {
  if (p.cites.length === 0) {
    throw new Error(`Design Language Library entry ${p.id} cites no Expression Library entry.`);
  }
  for (const id of p.cites) {
    if (!expressionById.has(id)) {
      throw new Error(`Design Language Library entry ${p.id} cites ${id}, which is not in the Expression Library.`);
    }
  }
}
