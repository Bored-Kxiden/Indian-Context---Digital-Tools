// Where the site's small backend lives (Supabase). Both values are public by design: the project address
// is in every request the browser makes, and the publishable key only allows what the database's row-level
// security allows. Set PUBLIC_SUPABASE_URL to "off" to build a site that never calls it (the Ask page then
// searches in the browser only). See README, "Backend".

const env = import.meta.env;
const configured = (env.PUBLIC_SUPABASE_URL as string | undefined)?.trim();

export const supabaseUrl = configured === 'off' ? '' : (configured || 'https://pxdjwsytbtccuqhmdlvl.supabase.co').replace(/\/+$/, '');
export const supabasePublishableKey = ((env.PUBLIC_SUPABASE_PUBLISHABLE_KEY as string | undefined) ?? '').trim();
/** Edge Functions base address, or '' when the backend is off. */
export const functionsUrl = supabaseUrl ? `${supabaseUrl}/functions/v1` : '';
