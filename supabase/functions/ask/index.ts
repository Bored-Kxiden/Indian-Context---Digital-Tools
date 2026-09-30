// ask: finds the passages of the toolkit that best match a question. There is no language model:
// it only ranks the toolkit's own text, so everything the site shows is a quote with a link.
//
//   POST { "question": "How do I run reverse thick translation?" }
//   → { "mode": "passages", "passages": [{ id, url, title, section, component, content, similarity, keyword }] }
//   → { "mode": "none" }                      nothing close enough
//   → { "mode": "limited", ... } (429)        too many questions (per visitor per minute and per day, and site-wide per day)
//
// Meaning: gte-small embeddings, built into Supabase Edge Functions and free. Keywords: Postgres
// full-text search. The two rankings are merged in public.match_chunks. The site's /ask/ page arranges
// the passages together with the glossary and tool data it already has; if this function cannot be
// reached, the page searches /chat-index.json in the browser instead.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { adminClient, cors, json } from '../_shared/http.ts';

const model = new Supabase.ai.Session('gte-small');

const MAX_QUESTION = 500;
// A passage is returned when its meaning is close (cosine similarity at or above MIN_SIMILARITY), or when it
// shares strong keywords and is not far off in meaning. Measured on the toolkit: questions about it score
// 0.81 and up; off-topic ones ("write me a poem") 0.76–0.78, with weak keyword hits on words like "write".
const MIN_SIMILARITY = Number(Deno.env.get('ASK_MIN_SIMILARITY') ?? '0.8');
const MIN_KEYWORD = 0.5;
const MIN_SIMILARITY_WITH_KEYWORD = 0.75;
const LIMITS = {
  perMinute: Number(Deno.env.get('ASK_PER_MINUTE') ?? '20'),
  perDay: Number(Deno.env.get('ASK_PER_DAY') ?? '300'),
  sitePerDay: Number(Deno.env.get('ASK_SITE_PER_DAY') ?? '5000'),
};

type Match = {
  id: string;
  url: string;
  title: string;
  section: string | null;
  component: string | null;
  content: string;
  similarity: number;
  keyword_rank: number;
};

function visitorId(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const salt = Deno.env.get('ASK_SALT') ?? Deno.env.get('SUPABASE_URL') ?? '';
  const day = new Date().toISOString().slice(0, 10);
  return crypto.subtle
    .digest('SHA-256', new TextEncoder().encode(`${salt}|${day}|${ip}`))
    .then((b) => [...new Uint8Array(b)].slice(0, 12).map((x) => x.toString(16).padStart(2, '0')).join(''));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Use POST.' }, 405);

  let question = '';
  try {
    const body = await req.json();
    question = String(body?.question ?? '')
      .replace(/[\u0000-\u001f\u007f]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  } catch {
    return json({ error: 'Send JSON: { "question": "…" }' }, 400);
  }
  if (question.length < 2) return json({ error: 'Ask a question of at least a word.' }, 400);
  if (question.length > MAX_QUESTION) return json({ error: `Keep the question under ${MAX_QUESTION} characters.` }, 400);

  try {
    const db = adminClient();
    const limited = await db.rpc('take_chat_token', {
      visitor: await visitorId(req),
      per_minute: LIMITS.perMinute,
      per_day: LIMITS.perDay,
      site_per_day: LIMITS.sitePerDay,
    });
    if (limited.data) {
      const message =
        limited.data === 'minute'
          ? 'That is a lot of questions in a minute. Wait a moment and ask again.'
          : 'The search has reached today’s limit. Answers now come from the search in your browser.';
      return json({ mode: 'limited', limit: limited.data, message }, 429);
    }

    const embedding = (await model.run(question, { mean_pool: true, normalize: true })) as number[];
    const { data, error } = await db.rpc('match_chunks', {
      query_text: question,
      query_embedding: JSON.stringify(embedding),
      match_count: 10,
    });
    if (error) throw error;
    const passages = ((data ?? []) as Match[])
      .filter((m) => m.similarity >= MIN_SIMILARITY || (m.keyword_rank >= MIN_KEYWORD && m.similarity >= MIN_SIMILARITY_WITH_KEYWORD))
      .map((m) => ({
        id: m.id,
        url: m.url,
        title: m.title,
        section: m.section,
        component: m.component,
        content: m.content,
        similarity: Math.round(m.similarity * 1000) / 1000,
        keyword: Math.round(m.keyword_rank * 1000) / 1000,
      }));
    if (!passages.length) return json({ mode: 'none', passages: [] });
    return json({ mode: 'passages', passages });
  } catch (err) {
    console.error(err);
    return json({ mode: 'error', error: 'The search is not available right now. Answers now come from the search in your browser.' }, 503);
  }
});
