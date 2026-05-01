'use client';

import { useState, useEffect } from 'react';
import type { SlideProps } from '../../types';

const SAMPLE_QUESTIONS = [
  { theme: 'Pricing',        text: "Will Claude Pro be worth it for me as a solo founder?", from: "Marco, Berlin" },
  { theme: 'Skills',         text: "How long does it take to build a custom skill like the carousel one?", from: "Lisa, Lisbon" },
  { theme: 'Project setup',  text: "Should I have one Project per client or one big Project?", from: "Priya, Mumbai" },
  { theme: 'Connectors',     text: "Can Claude really read my Gmail without me sending each email?", from: "Diego, Buenos Aires" },
  { theme: 'For VAs',        text: "Is this going to replace my job or make me more valuable?", from: "Maria, Madrid" },
  { theme: 'Implementation', text: "Where do I start tomorrow ~ I have so many tools already?", from: "Sophie, Paris" },
  { theme: 'Time',           text: "Realistically, how many hours per week to set this up?", from: "Tom, Sydney" },
  { theme: 'Costs',          text: "What's the actual monthly cost to run an AI employee?", from: "Anna, Toronto" },
];

export function LiveQAFeed({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const onDark = '#FAF8F5';
  const sz = (px: number) => Math.round(px * scale);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => {
      setAnswered(prev => new Set([...prev, activeIdx]));
      setActiveIdx(i => (i + 1) % SAMPLE_QUESTIONS.length);
    }, 8000);
    return () => clearInterval(t);
  }, [autoplay, activeIdx]);

  const current = SAMPLE_QUESTIONS[activeIdx]!;
  const upNext = SAMPLE_QUESTIONS.slice(activeIdx + 1, activeIdx + 4);

  function markAnsweredAndAdvance() {
    setAnswered(prev => new Set([...prev, activeIdx]));
    setActiveIdx(i => (i + 1) % SAMPLE_QUESTIONS.length);
  }
  function reset() {
    setAnswered(new Set());
    setActiveIdx(0);
    setAutoplay(false);
  }

  return (
    <div style={{ maxWidth: 1280, margin: '24px auto 0' }}>
      <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ff5e5e', animation: 'pulse 1.4s ease-in-out infinite' }} />
            Live questions
          </span>
        </span>
        <span style={{ ...mono, fontSize: sz(11), color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {answered.size} of {SAMPLE_QUESTIONS.length} answered
        </span>
      </div>
      <div style={{ ...serif, fontSize: sz(20), color: C.muted, marginBottom: 24, lineHeight: 1.5 }}>
        Real questions from real people in the chat. Drop yours in ~ we&apos;ll get to it.
      </div>

      {/* Active question card */}
      <div style={{
        padding: '32px 36px',
        borderRadius: 20,
        background: C.text,
        color: onDark,
        boxShadow: `0 24px 48px -12px ${C.text}40`,
        marginBottom: 18,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: 22, ...serif, fontSize: sz(180), lineHeight: 1, color: C.primary, opacity: 0.18, userSelect: 'none' }}>"</div>
        <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 100, background: `${C.primary}25`, color: C.primary, ...mono, fontSize: sz(10), fontWeight: 800 }}>
            {current.theme}
          </span>
          <span style={{ opacity: 0.5 }}>~ now answering</span>
        </div>
        <div style={{ ...serif, fontSize: sz(28), color: onDark, lineHeight: 1.35, marginBottom: 16, position: 'relative' }}>
          &ldquo;{current.text}&rdquo;
        </div>
        <div style={{ ...mono, fontSize: sz(12), color: 'rgba(250,248,245,0.55)', letterSpacing: '0.08em' }}>
          ~ {current.from}
        </div>
      </div>

      {/* Up next + controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'flex-start' }}>
        <div>
          <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: C.muted, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
            Up next ~
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {upNext.map((q, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                borderRadius: 10,
                background: C.surface,
                border: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', gap: 10,
                opacity: 1 - i * 0.2,
              }}>
                <span style={{ ...mono, fontSize: sz(9), fontWeight: 700, color: C.primary, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {q.theme}
                </span>
                <span style={{ ...serif, fontSize: sz(15), color: C.text }}>
                  &ldquo;{q.text}&rdquo;
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
          <button
            onClick={markAnsweredAndAdvance}
            style={{
              padding: '12px 22px', borderRadius: 100,
              ...mono, fontSize: sz(11), fontWeight: 800,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              cursor: 'pointer',
              background: C.primary,
              color: C.text === '#2A2520' ? onDark : C.bg,
              border: 'none',
              boxShadow: `0 6px 16px -4px ${C.primary}55`,
            }}
          >
            ✓ Answered, next →
          </button>
          <button
            onClick={() => setAutoplay(a => !a)}
            style={{
              padding: '10px 18px', borderRadius: 100,
              ...mono, fontSize: sz(10), fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: 'pointer',
              background: autoplay ? `${C.primary}20` : 'transparent',
              color: C.primary,
              border: `1px solid ${C.primary}`,
            }}
          >
            {autoplay ? '⏸ Pause autoplay' : '▶ Auto-cycle'}
          </button>
          <button
            onClick={reset}
            style={{
              padding: '8px 18px', borderRadius: 100,
              ...mono, fontSize: sz(10), fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: 'pointer',
              background: 'transparent',
              color: C.muted,
              border: `1px solid ${C.border}`,
            }}
          >
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
}
