import type { APIRoute } from 'astro';
import { glossary } from '../data/glossary';
import { components } from '../data/components';
import { goals, languageSteps } from '../data/goals';
import { getDownloadById } from '../data/downloads';
import { tools as c1Tools } from '../data/booklet/existing-products';
import { tools as c2Tools } from '../data/booklet/visual-culture';
import { tools as c3Tools } from '../data/booklet/language';
import { tools as c4Tools } from '../data/booklet/material-reality';
import type { Tool } from '../data/booklet/types';

// /ask-data.json: what "Ask the toolkit" answers from, besides the page passages in
// /chat-index.json. Built with the site from the same data as the pages, so an answer can never
// say something the pages don't. Paths are without the site's base path.

const comp = Object.fromEntries(components.map((c) => [c.id, c]));

const tool = (t: Tool) => {
  const c = comp[t.component];
  const href = `${c.href}${t.slug}/`;
  return {
    id: `${t.component}-${t.slug}`,
    name: t.name,
    short: t.short,
    number: t.number ?? null,
    kind: t.kind ?? null,
    component: c.name,
    scope: c.c,
    href,
    question: t.question,
    what: t.whatIsIt,
    shows: t.shows,
    time: t.time,
    group: t.group ?? null,
    mode: t.mode ?? null,
    need: t.need,
    endUp: t.endUp,
    done: t.done,
    stepsTitle: t.stepsTitle ?? null,
    stepsList: t.stepsList ?? null,
    parts: t.parts.map((p) => {
      const dl = getDownloadById(`tpl-${p.blank.pdf.replace(/\.pdf$/, '')}`);
      return {
        label: p.label,
        title: p.title,
        steps: p.steps,
        template: dl ? { title: dl.title, href: dl.href, format: dl.format, size: dl.size, printed: p.blank.printed } : null,
      };
    }),
  };
};

export const GET: APIRoute = () => {
  const data = {
    version: 1,
    terms: glossary.map((t) => ({
      id: t.id,
      term: t.term,
      aka: t.aka ?? [],
      kind: t.kind,
      scope: t.scope,
      context: t.context ?? null,
      def: t.def,
      facts: t.facts ?? [],
      list: t.list ?? [],
      href: t.href ?? null,
      see: t.see ?? [],
      source: t.source ?? null,
    })),
    tools: [...c1Tools, ...c2Tools, ...c3Tools, ...c4Tools].map(tool),
    goals: [
      ...goals.flatMap((g) => g.items.map((i) => ({ phrase: i.phrase.replace(/^…/, 'I want to '), tag: i.tag, href: i.href, scope: i.tone, component: g.componentLabel }))),
      ...languageSteps.flatMap((g) =>
        // "…by writing down where I am coming from" continues its theme: "I want to understand the setting, by writing…"
        g.items.map((i) => ({
          phrase: `I want to ${g.theme.charAt(0).toLowerCase()}${g.theme.slice(1)}, ${i.phrase.replace(/^…/, '')}`,
          tag: i.tag,
          href: i.href,
          scope: i.tone,
          component: `Language · ${g.theme}`,
        })),
      ),
    ],
  };
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
