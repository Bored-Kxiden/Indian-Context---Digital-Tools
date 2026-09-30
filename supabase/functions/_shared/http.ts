// Shared by the Edge Functions: CORS, JSON replies, and the admin client.
import { createClient } from 'npm:@supabase/supabase-js@2';

export const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8', ...extra },
  });

/** The service-role client: bypasses RLS. Only ever used inside an Edge Function. */
export function adminClient() {
  const url = Deno.env.get('SUPABASE_URL')!;
  let key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!key) {
    try {
      key = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') ?? '{}').default;
    } catch {
      key = undefined;
    }
  }
  if (!key) throw new Error('No service key available to the function.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
