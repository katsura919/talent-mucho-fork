'use client';

import type { SlideProps } from '../../types';

const BUILD_STEPS = [
  { num: '01', label: 'DEFINE', title: 'Name the problem', desc: 'What goes in, what comes out. One sentence.' },
  { num: '02', label: 'CONTEXT', title: 'Feed Claude', desc: 'Paste an example. Describe the tone. Set constraints.' },
  { num: '03', label: 'RUN', title: 'Execute + refine', desc: 'Review the output. Tweak. Run again. Ship it.' },
];

export function LiveBuildGuide({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const sz = (px: number) => Math.round(px * scale);

  return (
    <div style={{ maxWidth: 1280, margin: '36px auto 0', display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Call to action */}
      <div style={{
        padding: '32px 36px',
        borderRadius: 18,
        background: C.text,
        color: '#FAF8F5',
        textAlign: 'center',
      }}>
        <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 10 }}>
          Your turn
        </div>
        <div style={{ ...serif, fontSize: sz(24), color: '#FAF8F5', lineHeight: 1.45, marginBottom: 12 }}>
          Drop your problem in the chat.
        </div>
        <div style={{ ...sans, fontSize: sz(14), color: 'rgba(250,248,245,0.6)', lineHeight: 1.6 }}>
          One sentence. &quot;I spend 3 hours a week doing X.&quot; We&apos;ll pick one and build it live.
        </div>
      </div>

      {/* 3-step process */}
      <div>
        <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
          The process ~ every time
        </div>
        <div style={{ marginBottom: 22 }}>
          <span style={{ ...sans, fontSize: sz(26), fontWeight: 800, color: C.text }}>3 steps to solve </span>
          <span style={{ ...serif, fontSize: sz(26), fontWeight: 400, color: C.text }}>any problem with Claude.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {BUILD_STEPS.map((step, i) => (
            <div key={step.num} style={{
              padding: '28px 24px',
              borderRadius: 16,
              background: C.surface,
              border: `1px solid ${C.border}`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ ...serif, fontSize: sz(48), color: C.primary, opacity: 0.12, position: 'absolute', top: 12, right: 18, lineHeight: 1 }}>{step.num}</div>
              <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, letterSpacing: '0.18em', color: C.primary, marginBottom: 10 }}>{step.label}</div>
              <div style={{ ...sans, fontSize: sz(18), fontWeight: 700, color: C.text, marginBottom: 8 }}>{step.title}</div>
              <div style={{ ...sans, fontSize: sz(13), color: C.muted, lineHeight: 1.5 }}>{step.desc}</div>
              {i < BUILD_STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
                  ...mono, fontSize: sz(18), color: C.primary, opacity: 0.4, zIndex: 2,
                }}>
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key message */}
      <div style={{
        padding: '24px 30px',
        borderRadius: 16,
        background: `${C.primary}10`,
        border: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        <div style={{ ...serif, fontSize: sz(36), color: C.primary, opacity: 0.3, flexShrink: 0 }}>&#9733;</div>
        <div>
          <div style={{ ...sans, fontSize: sz(15), fontWeight: 600, color: C.text, lineHeight: 1.5 }}>
            No magic. No code. Just a clear problem and a good prompt.
          </div>
          <div style={{ ...sans, fontSize: sz(13), color: C.muted, marginTop: 4, lineHeight: 1.5 }}>
            The most annoying repetitive thing in your week? That&apos;s what you build first.
          </div>
        </div>
      </div>
    </div>
  );
}
