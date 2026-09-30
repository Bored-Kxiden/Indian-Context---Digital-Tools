// index-sync: keeps the chatbot's search index (public.doc_chunks) in step with the site.
//
//   POST { "mode": "sync" }   fetch the site's published /chat-index.json (only from the allowed
//                             addresses below), add new passages, update changed ones and remove
//                             ones that are gone. At most once every ten minutes.
//   POST { "mode": "embed" }  embed up to 30 passages that have no embedding yet, with the free
//                             gte-small model built into Supabase Edge Functions. Call it again
//                             until `remaining` is 0.
//
// Neither mode takes any content from the caller, so the function is safe to leave public.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { adminClient, cors, json } from '../_shared/http.ts';

const model = new Supabase.ai.Session('gte-small');

const SOURCES = (
  Deno.env.get('INDEX_SOURCES') ??
  'https://meaning-to-interface-toolkit.vercel.app/chat-index.json,https://bored-kxiden.github.io/Indian-Context---Digital-Tools/chat-index.json'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const BATCH = 30;

type Chunk = { id: string; url: string; title: string; section?: string; component?: string; content: string; hash: string };

const valid = (c: Chunk) =>
  c &&
  typeof c.id === 'string' && /^[0-9a-f]{8,40}$/.test(c.id) &&
  typeof c.url === 'string' && c.url.startsWith('/') && c.url.length < 300 &&
  typeof c.title === 'string' && c.title.length < 300 &&
  typeof c.content === 'string' && c.content.length > 0 && c.content.length <= 4000 &&
  typeof c.hash === 'string' && c.hash.length <= 64;

async function sync(db: ReturnType<typeof adminClient>, source: string) {
  const { data: meta } = await db.from('index_meta').select('updated_at').eq('key', 'last_sync').maybeSingle();
  if (meta && Date.now() - new Date(meta.updated_at).getTime() < 10 * 60 * 1000) {
    return json({ error: 'Synced less than ten minutes ago. Try again later.' }, 429);
  }
  const res = await fetch(source, { headers: { accept: 'application/json' } });
  if (!res.ok) return json({ error: `Could not fetch the index (${res.status}).` }, 502);
  const index = await res.json();
  const chunks: Chunk[] = Array.isArray(index?.chunks) ? index.chunks.filter(valid).slice(0, 4000) : [];
  if (chunks.length < 20) return json({ error: 'The index looks empty or malformed; nothing changed.' }, 422);

  const { data: existing, error } = await db.from('doc_chunks').select('id, content_hash').eq('source', 'toolkit');
  if (error) throw error;
  const have = new Map((existing ?? []).map((r) => [r.id, r.content_hash]));
  const keep = new Set(chunks.map((c) => c.id));
  const changed = chunks.filter((c) => have.get(c.id) !== c.hash);
  const gone = [...have.keys()].filter((id) => !keep.has(id));

  for (let i = 0; i < changed.length; i += 200) {
    const rows = changed.slice(i, i + 200).map((c) => ({
      id: c.id,
      source: 'toolkit',
      url: c.url,
      title: c.title,
      section: c.section || null,
      component: c.component || null,
      content: c.content,
      content_hash: c.hash,
      embedding: null,
      updated_at: new Date().toISOString(),
    }));
    const { error: e } = await db.from('doc_chunks').upsert(rows);
    if (e) throw e;
  }
  for (let i = 0; i < gone.length; i += 200) {
    const { error: e } = await db.from('doc_chunks').delete().in('id', gone.slice(i, i + 200));
    if (e) throw e;
  }
  await db.from('index_meta').upsert({ key: 'last_sync', value: source, updated_at: new Date().toISOString() });
  return json({ ok: true, passages: chunks.length, changed: changed.length, removed: gone.length });
}

async function embed(db: ReturnType<typeof adminClient>) {
  const { data: rows, error } = await db
    .from('doc_chunks')
    .select('id, title, section, content')
    .is('embedding', null)
    .limit(BATCH);
  if (error) throw error;
  let done = 0;
  const started = Date.now();
  for (const r of rows ?? []) {
    if (Date.now() - started > 40_000) break;
    const text = [r.title, r.section, r.content].filter(Boolean).join('. ');
    const vector = (await model.run(text, { mean_pool: true, normalize: true })) as number[];
    const { error: e } = await db.from('doc_chunks').update({ embedding: JSON.stringify(vector) }).eq('id', r.id);
    if (e) throw e;
    done++;
  }
  const { count } = await db.from('doc_chunks').select('id', { count: 'exact', head: true }).is('embedding', null);
  return json({ ok: true, embedded: done, remaining: count ?? 0 });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Use POST.' }, 405);
  try {
    const body = await req.json().catch(() => ({}));
    const db = adminClient();
    if (body?.mode === 'sync') {
      const source = typeof body.source === 'string' && SOURCES.includes(body.source) ? body.source : SOURCES[0];
      return await sync(db, source);
    }
    return await embed(db);
  } catch (err) {
    console.error(err);
    return json({ error: 'Something went wrong while updating the index.' }, 500);
  }
});
