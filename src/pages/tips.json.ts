import type { APIRoute } from 'astro';
import { tips } from '../data/tips';
import { glossary } from '../data/glossary';

// /tips.json: the keyword tips (src/data/tips.ts), read by scripts/mark-terms.mjs after the build. A tip whose
// glossary entry does not exist fails the build, so a link never points nowhere.
const ids = new Set(glossary.map((t) => t.id));
for (const t of tips) if (t.glossary && !ids.has(t.glossary)) throw new Error(`tips: no glossary entry "${t.glossary}"`);

export const GET: APIRoute = () => new Response(JSON.stringify({ tips }), { headers: { 'Content-Type': 'application/json' } });
