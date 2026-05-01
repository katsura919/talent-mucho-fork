import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

const SLUG = 'claude-for-business';

export async function GET() {
  const sb = getSupabaseServer();
  if (!sb) {
    return NextResponse.json({ current_segment: 0, is_live: false });
  }

  const { data, error } = await sb
    .from('event_state')
    .select('current_segment, is_live, updated_at')
    .eq('slug', SLUG)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ current_segment: 0, is_live: false });
  }

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const sb = getSupabaseServer();
  if (!sb) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  let body: { current_segment?: number; is_live?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.current_segment === 'number') update.current_segment = body.current_segment;
  if (typeof body.is_live === 'boolean') update.is_live = body.is_live;

  const { error } = await sb
    .from('event_state')
    .upsert({ slug: SLUG, ...update }, { onConflict: 'slug' });

  if (error) {
    console.error('[state PUT]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
