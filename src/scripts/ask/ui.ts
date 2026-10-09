// "Ask the toolkit": the conversation, shared by the /ask/ page and the chat panel on every page.
//
// It asks the engine (./engine.ts, no language model), fetches page passages from the Supabase `ask` function or,
// when that cannot be reached, searches /chat-index.json in the browser, and renders each answer with DOM methods
// (nothing is inserted as HTML). The conversation is kept for the visit in sessionStorage, so it follows the reader
// from page to page and between the panel and the full page. Styles: src/styles/ask.css (scoped under .askui).

import { Engine, type Answer, type AskData, type Block, type Passage, type TermLite, type ToolLite } from './engine';

export interface AskUIOptions {
  /** The transcript list (gets the .askui class). */
  log: HTMLOListElement;
  /** A polite live region for "Answer ready" and similar. */
  status: HTMLElement;
  /** Optional line that says how the search ran. */
  modeNote?: HTMLElement | null;
  /** Site base path, e.g. "/" or "/Indian-Context---Digital-Tools/". */
  base: string;
  /** Edge Functions address, or '' when the backend is off. */
  functionsUrl: string;
  /** The scrolling box the log sits in (the chat panel); the page scrolls itself when absent. */
  scroller?: HTMLElement | null;
}

interface Saved {
  q: string;
  a: Answer;
  note?: string;
}

const KEY = 'bte-ask-v1';
const KEEP = 12;

// Shared across every conversation on the page.
let engineP: Promise<Engine> | null = null;
let passagesP: Promise<void> | null = null;
let semanticDown = false;
let failures = 0;

function loadEngine(link: (p: string) => string) {
  engineP ??= fetch(link('/ask-data.json'))
    .then((r) => {
      if (!r.ok) throw new Error('data');
      return r.json();
    })
    .then((d: AskData) => new Engine(d))
    .catch((err) => {
      engineP = null;
      throw err;
    });
  return engineP;
}

function readSaved(): Saved[] {
  try {
    const v = JSON.parse(sessionStorage.getItem(KEY) ?? '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
function writeSaved(list: Saved[]) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(list.slice(-KEEP)));
  } catch {
    /* private mode or full: the conversation just isn't kept */
  }
}
export const hasSavedConversation = () => readSaved().length > 0;

export function createAsk(o: AskUIOptions) {
  const base = o.base.replace(/\/$/, '');
  const link = (path: string) => (/^https?:/.test(path) ? path : `${base}${path}`);
  if (!o.functionsUrl) semanticDown = true;
  o.log.classList.add('askui');

  // ---- Search

  async function semantic(question: string): Promise<Passage[] | null> {
    if (semanticDown) return null;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    try {
      const res = await fetch(`${o.functionsUrl}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal: ctrl.signal,
      });
      const j = await res.json().catch(() => ({}));
      if (res.status === 429 && j?.limit !== 'minute') semanticDown = true;
      if (!res.ok) return null;
      failures = 0;
      return Array.isArray(j?.passages) ? (j.passages as Passage[]) : [];
    } catch {
      // Out of reach (offline, blocked, too slow): after two tries, search in the browser for the rest of the visit.
      if (++failures >= 2) semanticDown = true;
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  function localPassages(e: Engine) {
    if (e.hasPassages) return Promise.resolve();
    passagesP ??= fetch(link('/chat-index.json'))
      .then((r) => r.json())
      .then((j: { chunks: Passage[] }) => e.setPassages(j.chunks));
    return passagesP;
  }

  // ---- Rendering

  function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function a(href: string, text: string, cls = 'link-arrow') {
    const n = el('a', cls, text);
    n.href = link(href);
    if (/^https?:/.test(href)) n.rel = 'noopener';
    return n;
  }
  function chip(text: string, onClick: () => void) {
    const b = el('button', 'chip', text) as HTMLButtonElement;
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }
  const scopeC = (s: string) => (s === 'toolkit' || s === 'general' ? '' : s);

  function termCard(t: TermLite, also: TermLite[] = [], compact = false) {
    const card = el('article', 'ans term');
    if (scopeC(t.scope)) card.dataset.c = scopeC(t.scope);
    card.append(el('p', 'kind', t.scope === 'general' ? 'General term · not from the toolkit' : `${t.kind}${t.context ? ` · ${t.context}` : ''}`));
    card.append(el('h3', '', t.term));
    card.append(el('p', 'def', t.def));
    if (!compact) {
      if (t.facts.length) {
        const dl = el('dl', 'facts');
        for (const f of t.facts) {
          const d = el('div');
          d.append(el('dt', '', f.k), el('dd', '', f.v));
          dl.append(d);
        }
        card.append(dl);
      }
      if (t.list.length) {
        const ul = el('ul', 'items');
        for (const x of t.list) ul.append(el('li', '', x));
        card.append(ul);
      }
    }
    const foot = el('p', 'links');
    if (t.href) foot.append(a(t.href, t.scope === 'general' ? 'Where the toolkit uses it' : 'Where it’s used'));
    foot.append(a(`/glossary/#${t.id}`, 'In the glossary'));
    if (t.source?.href) foot.append(a(t.source.href, t.source.label));
    card.append(foot);
    if (t.source && !t.source.href) card.append(el('p', 'small', `Source: ${t.source.label}`));
    if (also.length) {
      const p = el('p', 'also');
      p.append(el('span', 'k', 'Also means'));
      for (const x of also) p.append(chip(`${x.term}${x.context ? ` (${x.context})` : ''}`, () => showTerm(x)));
      card.append(p);
    }
    return card;
  }

  function toolCard(t: ToolLite, focus: string, part: number | null) {
    const card = el('article', 'ans tool');
    card.dataset.c = scopeC(t.scope);
    card.append(el('p', 'kind', `${t.component}${t.number ? ` · Tool ${t.number}` : ''}`));
    card.append(el('h3', '', t.name));
    card.append(el('p', 'q', t.question));
    const meta = el('ul', 'meta');
    for (const m of [t.time, t.group, t.mode].filter(Boolean) as string[]) meta.append(el('li', 'chip chip--quiet', m));
    card.append(meta);

    const show = (k: string, v: string) => {
      const d = el('div', 'fact');
      d.append(el('p', 'k', k), el('p', '', v));
      card.append(d);
    };
    if (focus === 'need') show('You need', t.need);
    if (focus === 'output') {
      show('You end up with', t.endUp);
      show('Done when', t.done);
    }
    if (focus === 'time') show('Time', `${t.time}${t.group ? ` · ${t.group}` : ''}`);
    if (focus === 'general' || focus === 'how' || focus === 'define' || focus === 'why') card.append(el('p', 'def', t.what.join(' ')));

    const parts = part !== null && t.parts[part] ? [t.parts[part]] : t.parts;
    if (focus !== 'template' && focus !== 'need' && focus !== 'time') {
      if (t.stepsList?.length) {
        card.append(el('h4', '', t.stepsTitle ?? 'Steps'));
        const ol = el('ol', 'steps');
        for (const s of t.stepsList) {
          const li = el('li');
          li.append(el('b', '', `${s.title}. `), document.createTextNode(s.body));
          ol.append(li);
        }
        card.append(ol);
      } else {
        for (const p of parts) {
          card.append(el('h4', '', t.parts.length > 1 ? `${p.label} · ${p.title}` : `Steps · ${p.title}`));
          const ol = el('ol', 'steps');
          for (const s of p.steps) ol.append(el('li', '', s));
          card.append(ol);
        }
      }
    }
    if (focus !== 'need' && focus !== 'output' && focus !== 'time') {
      const tpls = parts.map((p) => p.template).filter(Boolean) as NonNullable<ToolLite['parts'][number]['template']>[];
      if (tpls.length && (focus === 'template' || focus === 'how')) {
        card.append(el('h4', '', 'Templates'));
        const ul = el('ul', 'tpls');
        for (const x of tpls) {
          const li = el('li');
          const d = a(x.href, x.title, 'dl');
          d.setAttribute('download', '');
          li.append(d, el('span', 'small', ` ${x.format} · ${x.size} · ${x.printed}`));
          ul.append(li);
        }
        card.append(ul);
      }
    }
    if (focus === 'how' || focus === 'general') show('You need', t.need);
    const foot = el('p', 'links');
    foot.append(a(t.href, 'Open the tool'), a(`${t.href}#example`, 'See the example'));
    card.append(foot);
    return card;
  }

  function block(b: Block): HTMLElement {
    switch (b.type) {
      case 'term':
        return termCard(b.term, b.also);
      case 'tool':
        return toolCard(b.tool, b.focus, b.part);
      case 'compare': {
        const w = el('div', 'ans compare');
        for (const t of b.terms) w.append(termCard(t, [], true));
        return w;
      }
      case 'goals': {
        const w = el('section', 'ans goals');
        w.append(el('h3', 'sub', 'Where to start'));
        const ul = el('ul');
        for (const g of b.goals) {
          const li = el('li');
          if (scopeC(g.scope)) li.dataset.c = scopeC(g.scope);
          li.append(a(g.href, g.phrase, 'goal'), el('span', 'chip chip--solid', g.tag));
          ul.append(li);
        }
        w.append(ul);
        return w;
      }
      case 'passages': {
        const w = el('section', 'ans passages');
        w.append(el('h3', 'sub', 'From the pages'));
        const ul = el('ul');
        for (const p of b.passages) {
          const li = el('li');
          const q = el('blockquote');
          for (const part of p.parts) q.append(part.mark ? el('mark', '', part.text) : document.createTextNode(part.text));
          li.append(a(p.url, [p.title, p.section].filter(Boolean).join(' › '), 'src'), q);
          ul.append(li);
        }
        w.append(ul);
        return w;
      }
      case 'none': {
        const w = el('section', 'ans none');
        w.append(el('p', 'def', 'I couldn’t find that in the toolkit.'));
        if (b.suggestions.length) {
          const p = el('p', 'also');
          p.append(el('span', 'k', 'Did you mean'));
          for (const t of b.suggestions) p.append(chip(t.term, () => showTerm(t)));
          w.append(p);
        }
        const foot = el('p', 'links');
        foot.append(a('/glossary/', 'Browse the glossary'), a('/components/', 'See all tools'));
        w.append(foot);
        return w;
      }
    }
  }

  function render(turn: HTMLElement, ans: Answer, note?: string) {
    const body = turn.querySelector<HTMLElement>('.a')!;
    body.replaceChildren(...ans.blocks.map(block));
    if (note) body.append(el('p', 'small note', note));
    if (ans.followUps.length) {
      const p = el('p', 'follow');
      p.append(el('span', 'k', 'Ask next'));
      for (const f of ans.followUps) p.append(chip(f, () => ask(f)));
      body.append(p);
    }
  }

  function reveal(turn: HTMLElement) {
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (o.scroller) {
      const top = turn.offsetTop - o.log.offsetTop - 8;
      o.scroller.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
    } else turn.scrollIntoView({ block: 'nearest', behavior: smooth ? 'smooth' : 'auto' });
  }

  function newTurn(question: string, busy = true) {
    const li = el('li', 'turn');
    if (busy) li.setAttribute('aria-busy', 'true');
    const q = el('p', 'q');
    q.append(el('span', 'visually-hidden', 'You asked: '), document.createTextNode(question));
    const body = el('div', 'a');
    body.append(el('p', 'wait', 'Looking through the toolkit…'));
    li.append(q, body);
    o.log.append(li);
    return li;
  }

  function save(q: string, a: Answer, note?: string) {
    const list = readSaved();
    list.push({ q, a, note });
    writeSaved(list);
  }

  // ---- Public

  async function ask(question: string) {
    const q = question.trim().slice(0, 300);
    if (!q) return;
    const turn = newTurn(q);
    reveal(turn);
    o.status.textContent = 'Looking…';
    try {
      const e = await loadEngine(link);
      // Terms and tools answer at once; page passages follow.
      const quick = e.answer(q, []);
      if (quick.blocks.some((b) => b.type === 'term' || b.type === 'tool' || b.type === 'compare')) render(turn, quick);
      const sem = await semantic(q);
      let note: string | undefined;
      if (sem === null) {
        await localPassages(e);
        note = o.functionsUrl ? 'Searched in your browser, by keywords only: the toolkit’s search service is busy or out of reach.' : undefined;
        if (o.modeNote) o.modeNote.textContent = 'Searching in your browser, by keywords. There is no AI model writing answers.';
      } else if (o.modeNote) {
        o.modeNote.textContent = 'Searching by meaning and keywords. There is no AI model writing answers: it only finds and arranges what the toolkit already says.';
      }
      const ans = e.answer(q, sem);
      render(turn, ans, note);
      // Again, now that the answer has its height: the first scroll could only go as far as the page was long.
      reveal(turn);
      save(q, ans, note);
      const first = ans.blocks[0];
      o.status.textContent =
        first.type === 'none'
          ? 'No answer found in the toolkit.'
          : `Answer ready${first.type === 'term' ? `: ${first.term.term}` : first.type === 'tool' ? `: ${first.tool.name}` : ''}.`;
    } catch {
      turn.querySelector('.a')!.replaceChildren(el('p', 'def', 'Something went wrong loading the answers. Try again, or browse the glossary.'));
      o.status.textContent = 'Something went wrong.';
    } finally {
      turn.removeAttribute('aria-busy');
    }
  }

  function showTerm(t: TermLite) {
    const q = `What is ${t.term}${t.context ? ` (${t.context})` : ''}?`;
    const turn = newTurn(q, false);
    const ans: Answer = { question: q, intent: 'define', blocks: [{ type: 'term', term: t, also: [] }], followUps: [] };
    render(turn, ans);
    save(q, ans);
    reveal(turn);
    o.status.textContent = `Answer ready: ${t.term}.`;
  }

  /** Re-draw the conversation kept for this visit. Returns how many turns there were. */
  function restore() {
    const list = readSaved();
    o.log.replaceChildren();
    for (const s of list) render(newTurn(s.q, false), s.a, s.note);
    const last = o.log.lastElementChild as HTMLElement | null;
    if (last && o.scroller) o.scroller.scrollTop = Math.max(0, last.offsetTop - o.log.offsetTop - 8);
    return list.length;
  }

  function clear() {
    writeSaved([]);
    o.log.replaceChildren();
    o.status.textContent = 'Conversation cleared.';
  }

  /** Questions to suggest on this page: about its tool, if it is a tool page. */
  async function suggestionsFor(path: string, fallback: string[]) {
    try {
      const e = await loadEngine(link);
      const here = path.slice(base.length) || '/';
      const tool = e.data.tools.find((t) => here === t.href || here.startsWith(t.href));
      if (tool) {
        const out = [`How do I run ${tool.name}?`, `What do I need for ${tool.name}?`];
        if (tool.parts.some((p) => p.template)) out.push(`Where is the template for ${tool.name}?`);
        const word = e.data.terms.find((t) => t.kind === 'Term' && t.see.includes(tool.id));
        if (word) out.push(`What is ${word.term.replace(/^The /, 'the ')}?`);
        return out;
      }
    } catch {
      /* fall back */
    }
    return fallback;
  }

  return { ask, showTerm, restore, clear, suggestionsFor, preload: () => loadEngine(link).catch(() => undefined) };
}
