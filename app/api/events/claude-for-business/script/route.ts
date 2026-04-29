// Stores the Event OS script edits in Supabase Postgres.
// Schema lives in /supabase/migrations/0001_event_scripts.sql

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

const SLUG = 'claude-for-business';

interface EditsBody {
  edits?: Record<string, string>;
}

export async function GET() {
  const sb = getSupabaseServer();
  if (!sb) {
    return NextResponse.json(
      { edits: {}, note: 'Supabase not configured ~ add NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY' },
      { status: 200 }
    );
  }

  const { data, error } = await sb
    .from('event_scripts')
    .select('edits, updated_at, version')
    .eq('slug', SLUG)
    .maybeSingle();

  if (error) {
    console.error('[script GET]', error);
    return NextResponse.json({ edits: {}, error: error.message }, { status: 200 });
  }
  if (!data) {
    // Row doesn't exist yet ~ first save will create it on PUT via upsert
    return NextResponse.json({ edits: {}, version: 0 });
  }

  return NextResponse.json({
    edits: data.edits ?? {},
    updatedAt: data.updated_at,
    version: data.version,
  });
}

export async function PUT(req: NextRequest) {
  const sb = getSupabaseServer();
  if (!sb) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 503 }
    );
  }

  let body: EditsBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const edits = body?.edits;
  if (!edits || typeof edits !== 'object' || Array.isArray(edits)) {
    return NextResponse.json({ error: 'Body must contain { edits: {...} }' }, { status: 400 });
  }

  // ── Safety guard ~ refuse to clear all edits unless ?force=1
  // (prevents accidental wipes during development/testing)
  const url = new URL(req.url);
  if (Object.keys(edits).length === 0 && !url.searchParams.has('force')) {
    return NextResponse.json(
      { error: "Refusing to clear all edits ~ pass '?force=1' if you really mean it" },
      { status: 400 }
    );
  }

  // Upsert ~ creates the row if first save, otherwise updates (history trigger
  // captures the previous edits automatically via the database trigger)
  const { data, error } = await sb
    .from('event_scripts')
    .upsert(
      { slug: SLUG, edits, updated_at: new Date().toISOString() },
      { onConflict: 'slug' }
    )
    .select('updated_at, version')
    .maybeSingle();

  if (error) {
    console.error('[script PUT]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    updatedAt: data?.updated_at,
    version: data?.version,
  });
}
