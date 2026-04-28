// Streams a single Anthropic message ~ used by the Event OS compare panel
// Requires ANTHROPIC_API_KEY in environment variables

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured ~ add it to .env.local' },
      { status: 503 }
    );
  }

  let prompt: string;
  try {
    const body = await req.json();
    prompt = body.prompt;
    if (!prompt || typeof prompt !== 'string') throw new Error('missing prompt');
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      stream: true,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => 'unknown error');
    return NextResponse.json({ error: text }, { status: upstream.status });
  }

  // Pass the SSE stream straight through to the client
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
