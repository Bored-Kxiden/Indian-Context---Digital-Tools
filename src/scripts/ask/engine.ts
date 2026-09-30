// "Ask the toolkit": the answer engine. There is no language model anywhere in it.
//
// It reads a question, works out what kind of question it is (what is…, how do I…, where is the
// template…, which tool…), finds the toolkit's own terms, tools and "I want to…" lines that it
// names, and arranges them into an answer. Page passages come from the Supabase `ask` function
// (meaning and keyword search) or, when that cannot be reached, from a keyword search in the
// browser over /chat-index.json. Every sentence an answer shows is the toolkit's own text, with a
// link to where it came from, so an answer can be incomplete but never made up.
//
// Framework-free, so it runs in the browser and in tests.

export type Scope = 'toolkit' | 'c1' | 'c2' | 'c3' | 'c4' | 'ink' | 'general';

export interface TermLite {
  id: string;
  term: string;
  aka: string[];
  kind: string;
  scope: Scope;
  context: string | null;
  def: string;
  facts: { k: string; v: string }[];
  list: string[];
  href: string | null;
  see: string[];
  source: { label: string; href?: string } | null;
}

export interface ToolLite {
  id: string;
  name: string;
  short: string;
  number: number | null;
  kind: string | null;
  component: string;
  scope: Scope;
  href: string;
  question: string;
  what: string[];
  shows: string;
  time: string;
  group: string | null;
  mode: string | null;
  need: string;
  endUp: string;
  done: string;
  stepsTitle: string | null;
  stepsList: { title: string; body: string }[] | null;
  parts: {
    label: string;
    title: string;
    steps: string[];
    template: { title: string; href: string; format: string; size: string; printed: string } | null;
  }[];
}

export interface GoalLite {
  phrase: string;
  tag: string;
  href: string;
  scope: Scope;
  component: string;
}

export interface AskData {
  version: number;
  terms: TermLite[];
  tools: ToolLite[];
  goals: GoalLite[];
}

export interface Passage {
  id: string;
  url: string;
  title: string;
  section?: string | null;
  component?: string | null;
  content: string;
  /** From the Supabase search: cosine similarity (0–1) and keyword rank. */
  similarity?: number;
  keyword?: number;
}

export type Intent = 'define' | 'how' | 'template' | 'time' | 'need' | 'output' | 'which' | 'why' | 'compare' | 'general';

export interface Excerpt {
  url: string;
  title: string;
  section: string | null;
  component: string | null;
  parts: { text: string; mark: boolean }[];
}

export type Block =
  | { type: 'term'; term: TermLite; also: TermLite[] }
  | { type: 'tool'; tool: ToolLite; focus: Intent; part: number | null }
  | { type: 'compare'; terms: TermLite[] }
  | { type: 'goals'; goals: GoalLite[] }
  | { type: 'passages'; passages: Excerpt[] }
  | { type: 'none'; suggestions: TermLite[] };

export interface Answer {
  question: string;
  intent: Intent;
  blocks: Block[];
  followUps: string[];
}

export interface Analysis {
  question: string;
  intent: Intent;
  /** Stems of the question's content words (no stop words), for search and highlighting. */
  stems: string[];
  /** Matched terms, one group per matched span, most specific first. Each group lists every sense. */
  spans: TermLite[][];
  tool: ToolLite | null;
  part: number | null;
  scopeHint: Scope | null;
}

// ------------------------------------------------------------------------------------------------
// Text

export const fold = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’‘`´]/g, "'");

const WORD = /[\p{L}\p{M}\p{N}]+/gu;

/** Lower-cased words, in order. Keeps Devanagari vowel signs with their letters. */
export const words = (s: string): string[] => fold(s).replace(/'s\b/g, '').replace(/'/g, '').match(WORD) ?? [];

/** A light English stemmer: enough for "cards"/"card", "translating"/"translate". Other scripts pass through. */
export function stem(w: string): string {
  if (!/^[a-z]+$/.test(w) || w.length <= 3) return w;
  let s = w;
  if (s.endsWith('ies') && s.length > 4) s = `${s.slice(0, -3)}y`;
  else if (/(sses|shes|ches|xes|zes)$/.test(s)) s = s.slice(0, -2);
  else if (s.endsWith('s') && !/(ss|us|is)$/.test(s)) s = s.slice(0, -1);
  if (s.endsWith('ing') && s.length > 5) s = s.slice(0, -3);
  else if (s.endsWith('ed') && s.length > 4) s = s.slice(0, -2);
  if (/([b-df-hj-np-tv-z])\1$/.test(s) && !/(ll|ss|zz)$/.test(s)) s = s.slice(0, -1);
  if (s.endsWith('e') && s.length > 4) s = s.slice(0, -1);
  return s;
}

const STOP = new Set(
  (
    // English
    'a an the of to in on for and or is are was were be been being do does did done doing how what whats why when where which who whom whose ' +
    'can could should would will shall may might must i me my mine we us our you your yours it its this that these those with by from as at ' +
    'about into than then so if not no yes there here any some tell explain please mean means meant meaning define definition describe ' +
    'give show me get have has had just also really very more most much many one ones thing things kind sort way ways like about ' +
    'toolkit tool tools use used using work works step steps run running start page pages ' +
    // Hindi and Hinglish, as people type them
    'kya hai hain ka ki ke ko se me mein main aur bhi toh to ye yeh woh wo ek kaise kaisa kaisi kyu kyun kyon kab kaun kahan kitna kitne ' +
    'hota hoti hote karna karte karein kare karo matlab samjhao samjhaiye batao bataiye mujhe hum humein aap apne liye lie par pe mera meri mere tera teri ' +
    'क्या है हैं का की के को से में और भी तो यह वह एक कैसे क्यों कब कौन कहाँ कितना मतलब'
  ).split(/\s+/),
);

export const contentStems = (s: string) => [...new Set(words(s).filter((w) => !STOP.has(w) && !STOP.has(stem(w))).map(stem))];

/** Words that say what kind of question it is, not what it is about. */
const ASKING = new Set(
  'difference differences between differ vs versus compare compared comparison template templates download print printable pdf sheet worksheet long take takes need needs bring material materials prepare contain contains which want'
    .split(' ')
    .map(stem),
);

// ------------------------------------------------------------------------------------------------
// Intent

const RX: [Intent, RegExp][] = [
  ['compare', /\b(difference|differences|differ|different from|vs|versus|compare|compared|comparison)\b|\bfarak\b|\bantar\b|अंतर|फ़र्क|फर्क/],
  ['template', /\b(template|templates|download|downloads|print|printable|pdf|worksheet|blank|figma|fig file|file|sheet)\b/],
  ['time', /\b(how long|how much time|time does|time it takes|takes long|duration|minutes|hours|kitna (time|samay)|kitni der)\b/],
  ['need', /\b(what do i need|what does it need|what you need|materials|what to bring|prepare|preparation|requirements?|prerequisites?|you need)\b/],
  ['output', /\b(end up with|output|outputs|what comes out|result of|deliverable|produce|produces)\b/],
  ['which', /\b(which (tool|component|method|one)|what (tool|component|method) (should|do|can)|where (do|should) i (start|begin)|i want to|want to|help me|should i use|recommend|best (tool|way)|kaun ?sa|konsa)\b/],
  ['how', /\b(how (do|to|can|should|would|does|is) |how\b.*\b(work|run|use|do|fill|make)|steps|step by step|walk me through|procedure|process for|conduct|kaise|kese)\b|कैसे/],
  ['define', /\b(what is|what's|whats|what are|what does .+ mean|meaning of|define|definition of|explain|who is|who are|what do you mean by|kya (hai|hota|hoti|hote|h)\b|matlab)\b|क्या है|मतलब/],
  ['why', /\b(why|purpose of|point of|kyun|kyon|kyu)\b|क्यों/],
];

export function intentOf(q: string): Intent {
  const f = ` ${fold(q).replace(/\s+/g, ' ')} `;
  for (const [intent, rx] of RX) if (rx.test(f)) return intent;
  return 'general';
}

// ------------------------------------------------------------------------------------------------
// Search

/** Okapi BM25 over weighted fields. */
class BM25 {
  private docs: { id: string; len: number; tf: Map<string, number> }[] = [];
  private df = new Map<string, number>();
  private avg = 1;

  constructor(items: { id: string; fields: [string, number][] }[]) {
    for (const it of items) {
      const tf = new Map<string, number>();
      let len = 0;
      for (const [text, w] of it.fields) {
        for (const t of words(text)) {
          if (STOP.has(t)) continue;
          const s = stem(t);
          tf.set(s, (tf.get(s) ?? 0) + w);
          len += w;
        }
      }
      for (const s of tf.keys()) this.df.set(s, (this.df.get(s) ?? 0) + 1);
      this.docs.push({ id: it.id, len, tf });
    }
    this.avg = this.docs.reduce((n, d) => n + d.len, 0) / Math.max(1, this.docs.length);
  }

  docFreq(s: string) {
    return this.df.get(s) ?? 0;
  }

  search(stems: string[], limit = 10): { id: string; score: number; coverage: number }[] {
    const q = [...new Set(stems)];
    if (!q.length) return [];
    const N = this.docs.length;
    const out: { id: string; score: number; coverage: number }[] = [];
    for (const d of this.docs) {
      let score = 0;
      let hit = 0;
      for (const s of q) {
        const f = d.tf.get(s);
        if (!f) continue;
        hit++;
        const df = this.df.get(s) ?? 0;
        const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
        score += (idf * (f * 2.2)) / (f + 1.2 * (0.25 + (0.75 * d.len) / this.avg));
      }
      if (hit) out.push({ id: d.id, score, coverage: hit / q.length });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}

/** Damerau–Levenshtein distance, stopping early once it exceeds `max`. */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

const KIND_ORDER = ['Tool', 'Component', 'Method', 'Term', 'Tag', 'Step', 'Card', 'Role', 'General'];
const SCOPE_WORDS: [RegExp, Scope][] = [
  [/\b(component ?1|c1|existing products?)\b/, 'c1'],
  [/\b(component ?2|c2|visual culture|visual)\b/, 'c2'],
  [/\b(component ?3|c3|language|reading language)\b/, 'c3'],
  [/\b(component ?4|c4|material reality|material)\b/, 'c4'],
  [/\b(reflection|claim and reflection|look back)\b/, 'ink'],
];

const pathOf = (href: string | null) => (href ?? '').split('#')[0];

/** Semantic search: below this cosine similarity (and with no keyword match) a passage is not an answer. */
export const SEMANTIC_MIN = 0.8;
/** A glossary entry found only by meaning becomes the answer's term above this. */
export const SEMANTIC_TERM_MIN = 0.84;
/** Above this, a passage is close enough in meaning to show even if it shares none of the question's words. */
export const SEMANTIC_SURE = 0.86;

// ------------------------------------------------------------------------------------------------
// The engine

export class Engine {
  readonly data: AskData;
  private byId = new Map<string, TermLite>();
  private toolById = new Map<string, ToolLite>();
  private toolByPath = new Map<string, ToolLite>();
  /** Stemmed name → term ids. */
  private names = new Map<string, Set<string>>();
  private maxName = 1;
  private termIndex: BM25;
  private goalIndex: BM25;
  private passageIndex: BM25 | null = null;
  private passages = new Map<string, Passage>();

  constructor(data: AskData) {
    this.data = data;
    for (const t of data.terms) this.byId.set(t.id, t);
    for (const t of data.tools) {
      this.toolById.set(t.id, t);
      this.toolByPath.set(t.href, t);
    }
    for (const t of data.terms) {
      for (const n of this.nameVariants(t)) {
        const key = this.key(n);
        if (!key) continue;
        if (!this.names.has(key)) this.names.set(key, new Set());
        this.names.get(key)!.add(t.id);
        this.maxName = Math.max(this.maxName, key.split(' ').length);
      }
    }
    this.termIndex = new BM25(
      data.terms.map((t) => ({
        id: t.id,
        fields: [
          [[t.term, ...t.aka].join(' '), 3],
          [t.context ?? '', 1],
          [[t.def, ...t.facts.map((f) => f.v), ...t.list].join(' '), 1],
        ],
      })),
    );
    this.goalIndex = new BM25(data.goals.map((g, i) => ({ id: String(i), fields: [[g.phrase, 2], [g.tag, 2], [g.component, 1]] })));
  }

  /** Load page passages for the in-browser search (used when Supabase cannot be reached). */
  setPassages(list: Passage[]) {
    this.passages = new Map(list.map((p) => [p.id, p]));
    this.passageIndex = new BM25(
      list.map((p) => ({ id: p.id, fields: [[`${p.title} ${p.section ?? ''}`, 2], [p.content, 1]] })),
    );
  }

  get hasPassages() {
    return this.passageIndex !== null;
  }

  term(id: string) {
    return this.byId.get(id);
  }

  private nameVariants(t: TermLite): string[] {
    const v = new Set<string>([t.term, ...t.aka]);
    for (const n of [...v]) {
      v.add(n.replace(/\s*\([^)]*\)\s*/g, ' ').trim());
      v.add(n.replace(/^\[|\]$/g, ''));
      if (n.includes(' · ')) for (const p of n.split(' · ')) if (p.split(' ').length > 1 || /\d/.test(p)) v.add(p);
    }
    return [...v].filter(Boolean);
  }

  private key(name: string) {
    const w = words(name);
    while (w.length > 1 && (w[0] === 'the' || w[0] === 'a')) w.shift();
    return w.map(stem).join(' ');
  }

  analyse(question: string): Analysis {
    const q = question.trim();
    let intent = intentOf(q);
    const tokens = words(q).map(stem);
    const stems = contentStems(q);
    const f = fold(q);

    // Every run of words that is the name of a term, longest first, without overlaps.
    const found: { start: number; len: number; ids: string[] }[] = [];
    for (let i = 0; i < tokens.length; i++) {
      for (let len = Math.min(this.maxName, tokens.length - i); len >= 1; len--) {
        const ids = this.names.get(tokens.slice(i, i + len).join(' '));
        if (ids) found.push({ start: i, len, ids: [...ids] });
      }
    }
    found.sort((a, b) => b.len - a.len || a.start - b.start);
    const taken = new Array(tokens.length).fill(false);
    const accepted: { start: number; len: number; ids: string[] }[] = [];
    for (const m of found) {
      if (taken.slice(m.start, m.start + m.len).some(Boolean)) continue;
      if (m.len === 1 && STOP.has(words(q)[m.start] ?? '')) continue;
      for (let k = m.start; k < m.start + m.len; k++) taken[k] = true;
      accepted.push(m);
    }
    // One common word ("power", "people", "build") names a term only when the whole question is made of names,
    // or it is a short "what is…" question. Otherwise "who people depend on" would answer with the People layer.
    const topic = tokens.filter((t, i) => !STOP.has(words(q)[i] ?? '') && !ASKING.has(t));
    const allNames = topic.length > 0 && tokens.every((t, i) => taken[i] || STOP.has(words(q)[i] ?? '') || ASKING.has(t));
    const spans = accepted.filter((m) => {
      if (m.len > 1 || allNames) return true;
      const common = this.termIndex.docFreq(tokens[m.start]) > 3;
      return !common || (intent === 'define' && topic.length <= 2);
    });
    for (const m of accepted) if (!spans.includes(m)) for (let k = m.start; k < m.start + m.len; k++) taken[k] = false;

    // Typos: a long word that names nothing, close to a one-word name.
    if (!spans.length) {
      for (const s of stems) {
        // An exact name was already weighed above (and set aside as too common); only misspellings get here.
        if (s.length < 5 || this.names.has(s)) continue;
        const max = s.length >= 9 ? 2 : 1;
        let best: { key: string; d: number } | null = null;
        for (const key of this.names.keys()) {
          if (key.includes(' ')) continue;
          const d = distance(s, key, max);
          if (d <= max && (!best || d < best.d)) best = { key, d };
        }
        if (best) spans.push({ start: tokens.indexOf(s), len: 1, ids: [...this.names.get(best.key)!] });
      }
    }

    let scopeHint: Scope | null = null;
    for (const [rx, s] of SCOPE_WORDS) if (rx.test(f)) scopeHint = s;

    // Senses that agree with the rest of the question come first: "build" next to "loop" is Component 4's Build.
    const toolOf = (t: TermLite) => (t.kind === 'Tool' ? this.toolById.get(t.id) : this.toolByPath.get(pathOf(t.href))) ?? null;
    const rawGroups = spans.sort((a, b) => a.start - b.start).map((m) => m.ids.map((id) => this.byId.get(id)!).filter(Boolean));
    const scopeVotes = new Map<Scope, number>();
    const toolVotes = new Map<string, number>();
    for (const g of rawGroups) {
      for (const sc of new Set(g.map((t) => t.scope))) scopeVotes.set(sc, (scopeVotes.get(sc) ?? 0) + 1 / new Set(g.map((t) => t.scope)).size);
      const tools = new Set(g.map(toolOf).filter(Boolean).map((t) => t!.id));
      for (const id of tools) toolVotes.set(id, (toolVotes.get(id) ?? 0) + 1 / tools.size + (g.some((t) => t.kind === 'Tool' && t.id === id) ? 0.25 : 0));
    }
    const rank = (t: TermLite) =>
      (scopeHint && t.scope === scopeHint ? -10 : 0) -
      (rawGroups.length > 1 ? (scopeVotes.get(t.scope) ?? 0) * 2 : 0) +
      KIND_ORDER.indexOf(t.kind) +
      (t.scope === 'general' ? 5 : 0);
    const groups = rawGroups.map((g) => [...g].sort((a, b) => rank(a) - rank(b)));

    // A question that is only a term ("kahavat", "the loop?") is asking what it is.
    const covered = taken.filter(Boolean).length;
    if (intent === 'general' && groups.length && covered >= tokens.filter((t) => !STOP.has(t)).length) intent = 'define';
    if (intent === 'compare' && groups.length < 2) intent = groups.length ? 'define' : 'general';

    // The tool the question is about: the one most of the named terms belong to.
    let tool: ToolLite | null = null;
    let part: number | null = null;
    if (toolVotes.size) {
      const ranked = [...toolVotes.entries()].sort(
        (a, b) => b[1] - a[1] || (scopeHint ? Number(this.toolById.get(b[0])?.scope === scopeHint) - Number(this.toolById.get(a[0])?.scope === scopeHint) : 0),
      );
      tool = this.toolById.get(ranked[0][0]) ?? null;
      if (tool) {
        for (const g of groups) {
          const pi = tool.parts.findIndex((p) => g.some((t) => this.key(p.title) === this.key(t.term)));
          if (pi >= 0) part = pi;
        }
      }
    }

    return { question: q, intent, stems, spans: groups, tool, part, scopeHint };
  }

  /** The answer from the toolkit's terms, tools and goals, plus local passages if they are loaded. */
  answer(question: string, semantic?: Passage[] | null): Answer {
    const a = this.analyse(question);
    const blocks: Block[] = [];
    const how = new Set<Intent>(['how', 'template', 'time', 'need', 'output']);

    if (a.intent === 'compare' && a.spans.length >= 2) {
      blocks.push({ type: 'compare', terms: a.spans.slice(0, 3).map((g) => g[0]) });
    } else if (a.tool && (how.has(a.intent) || (a.spans[0]?.[0]?.kind === 'Tool' && a.intent !== 'define'))) {
      blocks.push({ type: 'tool', tool: a.tool, focus: a.intent, part: a.part });
    } else if (a.spans.length) {
      for (const g of a.spans.slice(0, a.intent === 'define' ? 2 : 1)) blocks.push({ type: 'term', term: g[0], also: g.slice(1, 4) });
    }

    // Page passages: from Supabase if it answered, else from the in-browser index if loaded.
    let passages: Passage[] = [];
    const topic = a.stems.filter((x) => !ASKING.has(x));
    const share = (p: Passage) => {
      if (!topic.length) return 1;
      const text = new Set(words(`${p.title} ${p.section ?? ''} ${p.content}`).map(stem));
      return topic.filter((x) => text.has(x)).length / topic.length;
    };
    // By meaning alone only when it is close; otherwise it must also share at least half the question's words.
    if (semantic)
      passages = semantic.filter((p) => {
        const sim = p.similarity ?? 0;
        if (sim >= SEMANTIC_SURE) return true;
        return sim >= 0.75 && (sim >= SEMANTIC_MIN || (p.keyword ?? 0) >= 0.5) && share(p) >= 0.5;
      });
    else if (this.passageIndex) {
      const min = a.stems.length >= 2 ? 0.5 : 1;
      passages = this.passageIndex
        .search(a.stems, 12)
        .filter((r) => r.coverage >= min)
        .map((r) => this.passages.get(r.id)!)
        .filter(Boolean);
    }

    // A glossary entry among the passages is a term: show it as one, if nothing else named a term.
    const want = new Set(a.stems);
    const hits = (p: Passage) => new Set(words(`${p.title} ${p.section ?? ''} ${p.content}`).map(stem).filter((w) => want.has(w))).size;
    // Only for "what is…"-style questions: "which tool…" and "how do I…" are answered by goals and tools.
    const strong = (p: Passage) => (semantic ? (p.similarity ?? 0) >= SEMANTIC_TERM_MIN : hits(p) >= a.stems.length);
    // By meaning, a close glossary entry counts even when it shares few words ("passes the cost on" → Offload).
    const glossaryHit = (semantic ?? passages).slice(0, semantic ? 3 : 1).find((p) => p.url.startsWith('/glossary/#') && strong(p));
    if (!blocks.length && glossaryHit && (a.intent === 'define' || a.intent === 'why' || a.intent === 'general')) {
      const t = this.byId.get(glossaryHit.url.slice('/glossary/#'.length));
      if (t) blocks.push({ type: 'term', term: t, also: [] });
    }

    if (a.intent === 'which' || !blocks.length) {
      const goals = this.goalIndex
        .search(a.stems, 4)
        // Two words must both match, three need two, four or more need half.
        .filter((g) => g.coverage >= (a.stems.length <= 2 ? 1 : a.stems.length === 3 ? 0.66 : 0.5))
        .map((g) => this.data.goals[Number(g.id)]);
      if (goals.length) blocks.push({ type: 'goals', goals: goals.slice(0, 3) });
    }

    // What the pages say. Not the glossary (terms are shown as terms), not download lists or the
    // "I want to…" lists (the goals block covers those), one passage per section, and passages whose
    // own text matches the question before those that match only by their heading.
    const inText = (p: Passage) => new Set(words(p.content).map(stem).filter((w) => want.has(w))).size;
    const seen = new Set<string>();
    const picked = passages
      .filter((p) => {
        if (p.url.startsWith('/glossary/')) return false;
        if (p.content.length < 60) return false;
        // "Where is the template for the Loop?": a passage about some other template is no answer.
        if (!semantic && topic.length && !topic.some((x) => words(`${p.title} ${p.section ?? ''} ${p.content}`).map(stem).includes(x))) return false;
        if (/(^|›\s*)(Print|Download|Downloads|I want to…)(\s*›|$)/.test(p.section ?? '')) return false;
        if (seen.has(p.url)) return false;
        seen.add(p.url);
        return true;
      })
      .map((p, i) => ({ p, i, h: inText(p) }))
      .sort((x, y) => Number(y.h > 0) - Number(x.h > 0) || x.i - y.i)
      .map((x) => x.p);
    const limit = blocks.length ? 2 : 3;
    if (picked.length) blocks.push({ type: 'passages', passages: picked.slice(0, limit).map((p) => this.excerpt(p, a.stems)) });

    if (!blocks.length) blocks.push({ type: 'none', suggestions: this.suggest(a) });

    return { question: a.question, intent: a.intent, blocks, followUps: this.followUps(a, blocks) };
  }

  /** Terms that come closest when nothing matched: by words, then by spelling. */
  suggest(a: Analysis): TermLite[] {
    const byWords = this.termIndex
      .search(a.stems, 3)
      .filter((r) => r.coverage >= 0.5)
      .map((r) => this.byId.get(r.id)!);
    return byWords.slice(0, 3);
  }

  private followUps(a: Analysis, blocks: Block[]): string[] {
    const lower = (x: string) => x.replace(/^The /, 'the ').replace(/[?？]+$/, '');
    const ask = (t: TermLite) => (t.term.endsWith('?') ? t.term : `What is ${lower(t.term)}?`);
    const out: string[] = [];
    const first = blocks[0];
    if (first?.type === 'term') {
      const t = first.term;
      const tool = t.kind === 'Tool' ? this.toolById.get(t.id) : this.toolByPath.get(pathOf(t.href));
      if (tool) out.push(`How do I run ${tool.name}?`);
      for (const id of t.see) {
        const s = this.byId.get(id);
        if (!s || s.id === t.id || (tool && s.id === tool.id) || s.kind === 'Component') continue;
        out.push(ask(s));
      }
    } else if (first?.type === 'tool') {
      const n = first.tool.name;
      if (first.focus !== 'template' && first.tool.parts.some((p) => p.template)) out.push(`Where is the template for ${n}?`);
      if (first.focus !== 'need') out.push(`What do I need for ${n}?`);
      const words = this.data.terms.filter((t) => t.kind === 'Term' && t.see.includes(first.tool.id)).slice(0, 2);
      for (const w of words) out.push(ask(w));
    } else if (first?.type === 'compare') {
      for (const t of first.terms.slice(0, 2)) if (t.kind !== 'Tool') out.push(`How is ${lower(t.term)} used?`);
    }
    return [...new Set(out)].filter((x) => fold(x) !== fold(a.question)).slice(0, 4);
  }

  /** The one or two sentences of a passage that best match the question, with the matching words marked. */
  excerpt(p: Passage, stems: string[], max = 340): Excerpt {
    const want = new Set(stems);
    const sentences = p.content
      .split(/\n+|(?<=[.!?…])\s+(?=[“"(\p{Lu}0-9])/u)
      .map((s) => s.trim())
      .filter((s) => s.length > 1);
    const scored = sentences.map((s, i) => {
      const hits = new Set(words(s).map(stem).filter((w) => want.has(w)));
      // A bare heading line ("Power") says nothing: sentences under 25 characters count for less.
      return { s, i, score: (hits.size + (i === 0 ? 0.25 : 0)) * (s.length < 25 ? 0.3 : 1) };
    });
    const best = [...scored].sort((a, b) => b.score - a.score || a.i - b.i);
    // No sentence matches (the passage matched by its heading): show how it begins.
    const chosen = best[0].score < 0.9 ? scored.filter((x) => x.s.length >= 25).slice(0, 2) : [best[0]];
    if (!chosen.length) chosen.push(scored[0]);
    if (best[0].score >= 0.9 && best[1] && best[0].s.length < max * 0.6 && best[1].score >= 0.9) chosen.push(best[1]);
    chosen.sort((a, b) => a.i - b.i);
    let text = chosen.map((c) => c.s).join(chosen.length > 1 && chosen[1].i !== chosen[0].i + 1 ? ' … ' : ' ');
    if (!text) text = p.content;
    if (text.length > max) text = `${text.slice(0, max).replace(/\s+\S*$/, '')}…`;
    const parts: { text: string; mark: boolean }[] = [];
    for (const seg of text.split(/([\p{L}\p{M}\p{N}]+)/u)) {
      if (!seg) continue;
      const mark = /[\p{L}\p{N}]/u.test(seg) && !STOP.has(fold(seg)) && want.has(stem(fold(seg)));
      const last = parts[parts.length - 1];
      if (last && last.mark === mark) last.text += seg;
      else parts.push({ text: seg, mark });
    }
    return { url: p.url, title: p.title, section: p.section ?? null, component: p.component ?? null, parts };
  }
}
