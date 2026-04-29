// Supabase server client ~ uses service role key, only used from server routes
// Never import this from a client component (would leak the service role key)

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/**
 * Returns a Supabase server client, or null if env vars aren't configured.
 * Routes should handle the null case gracefully (return a 503 or fallback).
 */
export function getSupabaseServer(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
