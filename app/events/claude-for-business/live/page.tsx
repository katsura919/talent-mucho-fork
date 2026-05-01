'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

interface SegmentCard {
  id: number;
  num: string;
  title: string;
  titleItalic: string;
  subtitle: string;
  audWhatTitle: string;
  audWhatBody: string;
  audTakeaway: string;
  emoji: string;
}

const SEGMENTS: SegmentCard[] = [
  {
    id: 0, num: '00', title: 'Welcome', titleItalic: '', subtitle: '6:00~6:05 PM',
    emoji: '👋',
    audWhatTitle: 'This is where you start.',
    audWhatBody: "You signed up because you've been saying \"I need to learn AI\" for months. Tonight you actually do it ~ in a small group, with two operators who run businesses on this stack every day. By the end, you'll have a clear starting point, not more overwhelm. That's the deal.",
    audTakeaway: 'You came for a starting point. You leave with one.',
  },
  {
    id: 1, num: '01', title: 'How we got here', titleItalic: 'got here', subtitle: '6:05~6:15 PM',
    emoji: '🗺',
    audWhatTitle: 'How we got here',
    audWhatBody: "Two very different stories. One business. You're learning from two operators who actually run what they teach ~ not from coaches selling a course. Abie's the engineer who came back to building. Meri's the marketer who burned out hiring people and figured out AI was the answer.",
    audTakeaway: "Not coaches. Operators. What we teach tonight is what we run every day.",
  },
  {
    id: 2, num: '02', title: 'What is AI and Claude', titleItalic: 'and Claude', subtitle: '6:15~6:30 PM',
    emoji: '🤖',
    audWhatTitle: 'What is Claude ~ and how is it different?',
    audWhatBody: "There are dozens of AI tools out there. We'll show you the landscape ~ who the major players are and what each one does ~ then zoom in on why Claude is different and why it changed everything for us.",
    audTakeaway: "Claude is not a search engine. It's a thinking partner. The skill is in the context you bring.",
  },
  {
    id: 3, num: '03', title: 'The four Claudes', titleItalic: 'Claudes', subtitle: '6:27~6:40 PM',
    emoji: '4️⃣',
    audWhatTitle: 'The four Claudes + three models',
    audWhatBody: "The confusing thing about Claude ~ there are four products and three model sizes. Same brain underneath. Different doors depending on what you're doing. You only need Chat for your first month. We'll show you the others so you know what's out there ~ then we land on what matters.",
    audTakeaway: 'Coming from ChatGPT? Sonnet is your GPT-4o. When in doubt, just use Sonnet.',
  },
  {
    id: 4, num: '04', title: 'Live demos', titleItalic: 'demos', subtitle: '6:40~7:05 PM',
    emoji: '🎬',
    audWhatTitle: 'What we demo live',
    audWhatBody: "This is the part you came for. Real tools. Live, on screen. Our Talent Mucho AI Architects are in the room ~ each one specialised in a different tool. We spin the wheel. Whatever it lands on, an Architect demos it live.",
    audTakeaway: 'Your job tonight: copy one of these prompts and try it tomorrow.',
  },
  {
    id: 5, num: '05', title: 'AI employees', titleItalic: 'employees', subtitle: '7:05~7:20 PM',
    emoji: '👥',
    audWhatTitle: 'AI employees ~ the Operate pillar',
    audWhatBody: "This is the Operate pillar at Talent Mucho. We don't replace VAs ~ we multiply them. You'll see how an \"AI employee\" gets built, what one does day-to-day, and how a VA + AI together does the work of three.",
    audTakeaway: "Don't replace people with AI. Give them an AI co-worker that handles the boring 80%.",
  },
  {
    id: 6, num: '06', title: 'Live build', titleItalic: 'build', subtitle: '7:20~7:35 PM',
    emoji: '🔨',
    audWhatTitle: 'Build it ~ together, right now',
    audWhatBody: "Scan the QR or go to abiemaxey.com/web-works. Grab a prompt. Abie shares her screen and runs hers ~ you run yours at the same time. While Claude builds, step away, take a breath, come back and see what it made. Then one person from the room shares their output.",
    audTakeaway: "You didn't just watch someone build. You built it ~ side by side.",
  },
  {
    id: 7, num: '07', title: 'Open Q&A', titleItalic: 'Q&A', subtitle: '7:35~7:50 PM',
    emoji: '❓',
    audWhatTitle: 'Open Q&A',
    audWhatBody: "Meri's been collecting your questions all hour. We take the top ones and answer them with real demos ~ not generic advice. 3 minutes max each.",
    audTakeaway: "No question is too basic. Ask now or ask in Skool later.",
  },
  {
    id: 8, num: '08', title: 'Next step', titleItalic: 'step', subtitle: '7:50~8:00 PM',
    emoji: '🚀',
    audWhatTitle: 'Your next step',
    audWhatBody: "We delivered what we promised. Now here's what comes next ~ whether you go free, grab the community, or join the Bootcamp. Three doors. One decision.",
    audTakeaway: "The difference between tonight being interesting and tonight changing your business is what you do in the next 24 hours.",
  },
];

export default function AudienceLivePage() {
  const [currentSegment, setCurrentSegment] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [connected, setConnected] = useState(false);
  const segRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch initial state + subscribe to realtime
  useEffect(() => {
    fetch('/api/events/claude-for-business/state')
      .then(r => r.json())
      .then(d => {
        setCurrentSegment(d.current_segment ?? 0);
        setIsLive(d.is_live ?? false);
      })
      .catch(() => setCurrentSegment(0));

    const channel = supabase
      .channel('event-state-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'event_state', filter: 'slug=eq.claude-for-business' },
        (payload) => {
          const row = payload.new as { current_segment: number; is_live: boolean };
          setCurrentSegment(row.current_segment);
          setIsLive(row.is_live);
        }
      )
      .subscribe((status) => {
        setConnected(status === 'SUBSCRIBED');
      });

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Scroll to current segment when it changes during live event
  useEffect(() => {
    if (!isLive || currentSegment === null) return;
    const el = segRefs.current[currentSegment];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentSegment, isLive]);

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F5', fontFamily: '"Avenir Next", Avenir, system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ background: '#2A2520', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#FAF8F5', letterSpacing: '0.02em' }}>Claude for Business</span>
          <span style={{ fontSize: 12, color: 'rgba(250,248,245,0.4)', fontWeight: 400 }}>· May 1, 2026</span>
        </div>
        {isLive ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(196,154,108,0.15)', border: '1px solid rgba(196,154,108,0.4)', borderRadius: 100, padding: '4px 10px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C49A6C', display: 'inline-block', animation: 'pulse 1.4s ease-in-out infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: '#C49A6C', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Live now</span>
          </div>
        ) : (
          <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(250,248,245,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Reference guide</span>
        )}
      </div>

      {/* Live banner */}
      {isLive && currentSegment !== null && (
        <div style={{ background: '#C49A6C', padding: '10px 20px', textAlign: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#2A2520', letterSpacing: '0.08em' }}>
            Now on segment {SEGMENTS[currentSegment]?.num} ~ {SEGMENTS[currentSegment]?.audWhatTitle}
          </span>
        </div>
      )}

      {/* Intro */}
      <div style={{ padding: '32px 20px 8px', maxWidth: 600, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#C49A6C', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
          {isLive ? 'Follow along' : 'Session guide'}
        </p>
        <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 32, fontWeight: 300, color: '#2A2520', lineHeight: 1.15, marginBottom: 8 }}>
          {isLive ? 'Follow the session live.' : 'Everything you need to know about Claude.'}
        </h1>
        <p style={{ fontSize: 14, color: '#7D6B5A', lineHeight: 1.6, marginBottom: 4 }}>
          {isLive
            ? 'This page updates as the session moves forward. The current segment is highlighted.'
            : 'Nine segments. Read at your own pace. The prompts and guide are at the bottom.'}
        </p>
      </div>

      {/* Segments */}
      <div style={{ padding: '16px 20px 40px', maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SEGMENTS.map((seg, i) => {
          const isCurrent = isLive && currentSegment === i;
          const isPast = isLive && currentSegment !== null && i < currentSegment;
          const isUpcoming = isLive && currentSegment !== null && i > currentSegment;

          return (
            <div
              key={seg.id}
              ref={el => { segRefs.current[i] = el; }}
              style={{
                borderRadius: 16,
                border: isCurrent ? '2px solid #C49A6C' : '1.5px solid #E8E0D5',
                background: isCurrent ? '#2A2520' : isPast ? '#F5F0E8' : '#FFFFFF',
                padding: isCurrent ? '20px 20px 20px' : '16px 18px',
                transition: 'all 0.35s ease',
                opacity: isUpcoming ? 0.5 : 1,
                boxShadow: isCurrent ? '0 12px 32px -8px rgba(196,154,108,0.35)' : 'none',
              }}
            >
              {/* Segment header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isCurrent ? 14 : 6 }}>
                <span style={{
                  fontSize: 11, fontWeight: 800,
                  fontFamily: 'monospace',
                  color: isCurrent ? '#C49A6C' : isPast ? '#B8A898' : '#C49A6C',
                  letterSpacing: '0.16em',
                  background: isCurrent ? 'rgba(196,154,108,0.15)' : isPast ? 'rgba(184,168,152,0.15)' : 'rgba(196,154,108,0.1)',
                  padding: '2px 8px', borderRadius: 100,
                }}>
                  {seg.num}
                </span>
                <span style={{ fontSize: isCurrent ? 16 : 14, fontWeight: isCurrent ? 700 : 600, color: isCurrent ? '#FAF8F5' : isPast ? '#B8A898' : '#2A2520', flex: 1 }}>
                  {seg.audWhatTitle}
                </span>
                {isCurrent && (
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#2A2520', background: '#C49A6C', padding: '3px 8px', borderRadius: 100, letterSpacing: '0.14em', textTransform: 'uppercase', flexShrink: 0 }}>
                    Now
                  </span>
                )}
                {isPast && (
                  <span style={{ fontSize: 14, color: '#B8A898' }}>✓</span>
                )}
                <span style={{ fontSize: 11, color: isCurrent ? 'rgba(250,248,245,0.4)' : '#B8A898', flexShrink: 0, marginLeft: 4 }}>
                  {seg.subtitle}
                </span>
              </div>

              {/* Body ~ only show when current or not live */}
              {(isCurrent || !isLive) && (
                <>
                  <p style={{ fontSize: 14, color: isCurrent ? 'rgba(250,248,245,0.78)' : '#7D6B5A', lineHeight: 1.65, marginBottom: 14 }}>
                    {seg.audWhatBody}
                  </p>
                  <div style={{
                    borderRadius: 10,
                    background: isCurrent ? 'rgba(196,154,108,0.12)' : '#F5F0E8',
                    border: `1px solid ${isCurrent ? 'rgba(196,154,108,0.3)' : '#E8E0D5'}`,
                    padding: '10px 14px',
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                  }}>
                    <span style={{ fontSize: 12, color: '#C49A6C', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                    <p style={{ fontSize: 13, color: isCurrent ? '#C49A6C' : '#7D6B5A', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                      {seg.audTakeaway}
                    </p>
                  </div>
                </>
              )}

              {/* Collapsed past segments ~ show just emoji */}
              {isPast && (
                <p style={{ fontSize: 12, color: '#B8A898', margin: 0 }}>{seg.audTakeaway}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom links */}
      <div style={{ borderTop: '1px solid #E8E0D5', background: '#F5F0E8', padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#C49A6C', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, textAlign: 'center' }}>
          Take the next step
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href="/events/claude-for-business/guide"
            style={{ display: 'block', background: '#C49A6C', color: '#FAF8F5', borderRadius: 100, padding: '14px 20px', textAlign: 'center', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}
          >
            Get the starter playbook ~ 6 copy-paste prompts
          </a>
          <a
            href="https://buy.stripe.com/00wbIV3qm1SzcKBd0973G07"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', background: '#2A2520', color: '#FAF8F5', borderRadius: 100, padding: '14px 20px', textAlign: 'center', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}
          >
            Join the Bootcamp · €247 tonight only
          </a>
          <a
            href="https://buy.stripe.com/cNifZb3qm7cTdOFf8h73G05"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', background: '#FFFFFF', color: '#2A2520', border: '1.5px solid #E8E0D5', borderRadius: 100, padding: '14px 20px', textAlign: 'center', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
          >
            Join the community · €49/mo
          </a>
        </div>
        <p style={{ fontSize: 11, color: '#B8A898', textAlign: 'center', marginTop: 16 }}>
          <Link href="/events/claude-for-business" style={{ color: '#B8A898', textDecoration: 'none' }}>← Back to the event</Link>
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
