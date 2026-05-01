'use client';

import { useState, useEffect } from 'react';
import type { SlideProps } from '../../types';

const AI_EXPLAINER = [
  { label: 'It reads',     desc: 'Trained on billions of pages ~ books, websites, conversations' },
  { label: 'It connects',  desc: 'Learns patterns in language ~ what usually follows what' },
  { label: 'It generates', desc: 'Predicts the best next word, thousands of times per second' },
  { label: 'The result',   desc: 'A well-read colleague who never sleeps and never forgets' },
];

const AI_WRAPPERS = [
  { tool: 'Notion AI',    uses: 'Claude',        accent: '#d97706' },
  { tool: 'Canva AI',     uses: 'GPT + others',  accent: '#10a37f' },
  { tool: 'Jasper',       uses: 'GPT',           accent: '#10a37f' },
  { tool: 'Grammarly AI', uses: 'GPT + others',  accent: '#10a37f' },
  { tool: 'Perplexity',   uses: 'Claude + GPT',  accent: '#d97706' },
  { tool: 'Cursor',       uses: 'Claude + GPT',  accent: '#d97706' },
  { tool: 'lovable.dev',  uses: 'Claude + GPT',  accent: '#d97706' },
  { tool: 'Replit',       uses: 'Claude + GPT',  accent: '#d97706' },
  { tool: 'Poe',          uses: 'All of them',   accent: '#888' },
];

const AI_MODELS = [
  {
    name: 'ChatGPT', maker: 'OpenAI', accent: '#10a37f',
    vibe: 'The one everyone knows',
    superpower: 'Fast, general-purpose, great at brainstorming and creative writing',
    bestFor: 'Quick answers, first drafts, coding help',
    wow: 'Can browse the web, generate images, and analyze data ~ all in one conversation',
  },
  {
    name: 'Gemini', maker: 'Google', accent: '#4285f4',
    vibe: 'The Google-connected brain',
    superpower: 'Deep integration with Gmail, Docs, Calendar, and Search',
    bestFor: 'People who live in Google Workspace',
    wow: 'Can search your entire email history and summarize what matters in seconds',
  },
  {
    name: 'Claude', maker: 'Anthropic', accent: '#d97706', highlight: true,
    vibe: 'The thinking partner',
    superpower: 'Asks questions back, reasons carefully, handles long documents',
    bestFor: 'Business writing, strategy, complex tasks that need nuance',
    wow: 'Can read a 200-page PDF in one go ~ and organize your computer while you sleep',
  },
  {
    name: 'Copilot', maker: 'Microsoft', accent: '#0078d4',
    vibe: 'The Office assistant',
    superpower: 'Built into Word, Excel, PowerPoint, and Teams',
    bestFor: 'Corporate teams already paying for Microsoft 365',
    wow: 'Can turn a rough email thread into a polished PowerPoint deck in 30 seconds',
  },
  {
    name: 'Llama', maker: 'Meta', accent: '#0668E1',
    vibe: 'The open-source one',
    superpower: 'Free, customizable, runs on your own hardware',
    bestFor: 'Developers and companies who want full control',
    wow: 'Powers thousands of apps you use daily ~ without you even knowing',
  },
];

export function AILandscape({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const sz = (px: number) => Math.round(px * scale);
  const [revealed, setRevealed] = useState(0);
  const [activeModel, setActiveModel] = useState<number | null>(null);
  const [everClicked, setEverClicked] = useState(false);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      i += 1;
      setRevealed(i);
      if (i < 6) setTimeout(tick, 500);
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []);

  function handleModelClick(idx: number) {
    setActiveModel(prev => prev === idx ? null : idx);
    if (!everClicked) setEverClicked(true);
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto 36px' }}>
      {/* Section A ~ What is AI */}
      <div style={{ padding: '28px 30px', borderRadius: 18, background: C.surface, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
          What is AI? ~ in 10 seconds
        </div>
        <div style={{ ...serif, fontStyle: 'italic', fontSize: sz(15), color: C.muted, marginBottom: 22, lineHeight: 1.5 }}>
          No jargon. No PhD required.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {AI_EXPLAINER.map((step, i) => (
            <div key={step.label} style={{
              padding: '20px 18px', borderRadius: 14,
              background: `${C.primary}${i === 3 ? '18' : '08'}`,
              border: `1px solid ${i === 3 ? `${C.primary}40` : C.border}`,
              opacity: revealed >= i + 1 ? 1 : 0,
              transform: revealed >= i + 1 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ ...sans, fontSize: sz(16), fontWeight: 700, color: C.text, marginBottom: 6, letterSpacing: '-0.01em' }}>
                {step.label}
              </div>
              <div style={{ ...serif, fontStyle: 'italic', fontSize: sz(13), color: C.muted, lineHeight: 1.45 }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section B ~ The AI Landscape */}
      <div style={{
        padding: '28px 30px', borderRadius: 18,
        background: C.surface, border: `1px solid ${C.border}`,
        opacity: revealed >= 5 ? 1 : 0,
        transform: revealed >= 5 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
          The AI landscape ~ 2025
        </div>
        <div style={{ ...mono, fontSize: sz(11), color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 22, opacity: 0.7 }}>
          click any model to explore
        </div>

        {/* Model cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: activeModel !== null ? 20 : 0 }}>
          {AI_MODELS.map((model, i) => {
            const isActive = activeModel === i;
            const isHighlight = 'highlight' in model && model.highlight;
            return (
              <div
                key={model.name}
                onClick={() => handleModelClick(i)}
                style={{
                  padding: '18px 16px', borderRadius: 14, cursor: 'pointer',
                  background: isActive ? C.text : isHighlight ? `${C.primary}10` : C.bg,
                  border: `2px solid ${isActive ? C.text : isHighlight ? `${C.primary}50` : C.border}`,
                  boxShadow: isActive ? `0 8px 24px -8px ${C.text}40` : 'none',
                  transform: isActive ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  opacity: revealed >= 5 ? 1 : 0,
                }}
              >
                {isHighlight && (
                  <div style={{
                    position: 'absolute', top: -10, right: 12,
                    ...mono, fontSize: sz(9), fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                    background: C.primary, color: '#FAF8F5', padding: '3px 10px', borderRadius: 6,
                  }}>
                    Tonight&apos;s focus
                  </div>
                )}
                <div style={{
                  width: sz(10), height: sz(10), borderRadius: '50%', background: model.accent, marginBottom: 10,
                  boxShadow: isActive ? `0 0 12px ${model.accent}` : 'none', transition: 'box-shadow 0.3s',
                }} />
                <div style={{ ...sans, fontSize: sz(17), fontWeight: 700, color: isActive ? '#FAF8F5' : C.text, letterSpacing: '-0.01em', marginBottom: 3 }}>
                  {model.name}
                </div>
                <div style={{ ...mono, fontSize: sz(10), fontWeight: 600, color: isActive ? 'rgba(250,248,245,0.5)' : C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {model.maker}
                </div>
                <div style={{ ...serif, fontStyle: 'italic', fontSize: sz(12), color: isActive ? 'rgba(250,248,245,0.7)' : C.muted, lineHeight: 1.4 }}>
                  {model.vibe}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded detail */}
        {activeModel !== null && (() => {
          const m = AI_MODELS[activeModel]!;
          return (
            <div style={{ padding: '24px 28px', borderRadius: 16, background: C.text, color: '#FAF8F5', animation: 'aiLandFadeIn 0.4s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                <div>
                  <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: m.accent, marginBottom: 8 }}>Superpower</div>
                  <div style={{ ...sans, fontSize: sz(14), color: '#FAF8F5', lineHeight: 1.5 }}>{m.superpower}</div>
                </div>
                <div>
                  <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: m.accent, marginBottom: 8 }}>Best for</div>
                  <div style={{ ...sans, fontSize: sz(14), color: '#FAF8F5', lineHeight: 1.5 }}>{m.bestFor}</div>
                </div>
                <div>
                  <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: m.accent, marginBottom: 8 }}>The wow factor</div>
                  <div style={{ ...serif, fontStyle: 'italic', fontSize: sz(14), color: '#FAF8F5', lineHeight: 1.5 }}>{m.wow}</div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Wrapper reveal */}
        {everClicked && (
          <div style={{ marginTop: 22, padding: '22px 26px', borderRadius: 16, background: `${C.primary}08`, border: `1px solid ${C.primary}20`, animation: 'aiLandFadeIn 0.5s ease' }}>
            <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.primary, marginBottom: 6 }}>
              The part nobody tells you
            </div>
            <div style={{ ...serif, fontStyle: 'italic', fontSize: sz(16), color: C.text, marginBottom: 16, lineHeight: 1.5 }}>
              Most AI tools you&apos;ve seen? They&apos;re <em style={{ color: C.primary }}>wrappers</em>. Same brain underneath ~ just a different interface.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {AI_WRAPPERS.map(w => (
                <div key={w.tool} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 10, background: C.bg, border: `1px solid ${C.border}` }}>
                  <div style={{ ...sans, fontSize: sz(13), fontWeight: 600, color: C.text }}>{w.tool}</div>
                  <div style={{ ...mono, fontSize: sz(9), color: C.muted, letterSpacing: '0.06em' }}>~</div>
                  <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: w.accent, padding: '2px 8px', borderRadius: 6, background: `${w.accent}15`, letterSpacing: '0.04em' }}>
                    {w.uses}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...sans, fontSize: sz(14), color: C.text, lineHeight: 1.55, fontWeight: 500 }}>
              When you learn <em style={{ color: C.primary, fontStyle: 'italic' }}>the source</em> directly, you don&apos;t need the wrapper. You get more control, more power, and you stop paying for a pretty interface on top of the same intelligence.
            </div>
          </div>
        )}

        {/* Landing line */}
        {everClicked && (
          <div style={{ marginTop: 24, textAlign: 'center', animation: 'aiLandFadeIn 0.6s ease' }}>
            <div style={{ ...serif, fontStyle: 'italic', fontSize: sz(18), color: C.muted, lineHeight: 1.5 }}>
              Now you know the players. Let&apos;s zoom in on the one that changes how you <em style={{ color: C.primary, fontStyle: 'italic' }}>work</em>.
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes aiLandFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
