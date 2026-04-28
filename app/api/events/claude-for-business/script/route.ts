// Stores the Event OS script edits as a single JSON blob in Vercel Blob.
// One file per event. The /os page loads it on mount and saves on each edit.

import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

// Path used in Blob storage
const BLOB_KEY = 'events/claude-for-business/script.json';

export async function GET() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ edits: {}, note: 'BLOB_READ_WRITE_TOKEN not configured' }, { status: 200 });
    }
    // List blobs and find the latest under our prefix
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (!blobs.length) return NextResponse.json({ edits: {} });
    const latest = blobs.sort((a, b) => (b.uploadedAt > a.uploadedAt ? 1 : -1))[0];
    const res = await fetch(latest.url, { cache: 'no-store' });
    if (!res.ok) return NextResponse.json({ edits: {} });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Script GET error', err);
    return NextResponse.json({ edits: {}, error: 'load failed' }, { status: 200 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN not configured' }, { status: 503 });
    }
    const body = await req.json();
    const edits = body?.edits;
    if (!edits || typeof edits !== 'object') {
      return NextResponse.json({ error: 'invalid body' }, { status: 400 });
    }
    const payload = JSON.stringify({
      edits,
      updatedAt: new Date().toISOString(),
    });
    const blob = await put(BLOB_KEY, payload, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return NextResponse.json({ success: true, url: blob.url });
  } catch (err) {
    console.error('Script PUT error', err);
    return NextResponse.json({ error: 'save failed' }, { status: 500 });
  }
}
