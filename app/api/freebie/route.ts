import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { email, source = 'start-page' } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const db = getSupabaseServer();
  if (db) {
    await db
      .from('freebie_subscribers')
      .upsert({ email: email.toLowerCase().trim(), source }, { onConflict: 'email' });
  }

  return NextResponse.json({ ok: true });
}
