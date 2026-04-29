// Returns the most recent script versions for the event (for recovery / audit)
// GET /api/events/claude-for-business/script/history?limit=10

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

const SLUG = 'claude-for-business';

export async function GET(req: NextRequest) {
  const sb = getSupabaseServer();
  if (!sb) {
    return NextResponse.json({ history: [], note: 'Supabase not configured' });
  }

  const url = new URL(req.url);
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') ?? 10)));

  const { data, error } = await sb
    .from('event_script_history')
    .select('id, version, edits, saved_at')
    .eq('slug', SLUG)
    .order('saved_at', { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ history: [], error: error.message }, { status: 200 });
  }
  return NextResponse.json({ history: data ?? [] });
}
