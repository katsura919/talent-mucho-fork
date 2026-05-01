'use client';

import type React from 'react';
import type { CompareState, Palette } from '../../types';
import type { ComparePreset } from '../../config';

export function ComparePanel({ preset, state, onRun, onReset, C, mono, serif }: {
  preset: ComparePreset;
  state: CompareState;
  onRun: () => void;
  onReset: () => void;
  C: Palette;
  mono: React.CSSProperties;
  serif: React.CSSProperties;
}) {
  const steps = ['Ready', 'Left runs', 'Right runs', 'Lands'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Steps */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, background: C.surface, overflowX: 'auto' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, ...mono, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: state.step === i ? C.text : state.step > i ? C.primaryHover : C.muted, whiteSpace: 'nowrap' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: state.step === i ? C.primary : state.step > i ? C.primaryHover : C.border }} />
            {s}
            {i < 3 && <span style={{ color: C.border, margin: '0 2px' }}>~</span>}
          </div>
        ))}
      </div>
      {/* Run row */}
      <div style={{ display: 'flex', gap: 6, padding: '7px 14px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, alignItems: 'center' }}>
        <button onClick={onRun} disabled={state.running} style={{ padding: '5px 16px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700, cursor: state.running ? 'not-allowed' : 'pointer', border: 'none', background: state.running ? C.border : C.primary, color: state.running ? C.muted : C.bg, letterSpacing: '0.09em', textTransform: 'uppercase', opacity: state.running ? 0.5 : 1 }}>
          {state.running ? '● RUNNING' : state.step === 3 ? '↺ AGAIN' : '▶ RUN'}
        </button>
        <button onClick={onReset} style={{ padding: '5px 14px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.border}`, background: 'transparent', color: C.muted, letterSpacing: '0.09em', textTransform: 'uppercase' }}>
          RESET
        </button>
        <span style={{ ...mono, fontSize: 9, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{preset.scenario}</span>
      </div>
      {/* Columns */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {[
          { tag: preset.leftTag, title: preset.leftTitle, why: preset.leftWhy, prompt: preset.leftPrompt, output: state.leftText, annLbl: preset.leftAnnLbl, annTxt: preset.leftAnnTxt, done: state.leftDone, isLeft: true },
          { tag: preset.rightTag, title: preset.rightTitle, why: preset.rightWhy, prompt: preset.rightPrompt, output: state.rightText, annLbl: preset.rightAnnLbl, annTxt: preset.rightAnnTxt, done: state.rightDone, isLeft: false },
        ].map((col, ci) => (
          <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: ci === 0 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ padding: '8px 12px 6px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, background: C.surface }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5, background: col.isLeft ? 'rgba(139,58,58,0.12)' : 'rgba(74,124,89,0.12)', color: col.isLeft ? '#b06060' : '#4a7c59', border: `1px solid ${col.isLeft ? 'rgba(139,58,58,0.25)' : 'rgba(74,124,89,0.25)'}` }}>
                {col.tag}
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.text, letterSpacing: '-0.01em', textTransform: 'uppercase' }}
                dangerouslySetInnerHTML={{ __html: col.title.replace(/<em>/g, `<em style="font-family:${serif.fontFamily as string};font-weight:400;color:${C.primary};text-transform:none">`) }} />
              <div style={{ ...serif, fontSize: 11, color: C.muted, marginTop: 3, lineHeight: 1.4 }}>{col.why}</div>
            </div>
            <div style={{ padding: '6px 12px', background: C.surface2, flexShrink: 0, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 3 }}>Prompt</div>
              <div style={{ ...mono, fontSize: 10, lineHeight: 1.5, color: col.isLeft || state.step >= 2 ? C.text : C.muted, opacity: col.isLeft || state.step >= 2 ? 1 : 0.5, whiteSpace: 'pre-wrap', maxHeight: 80, overflowY: 'auto' }}>
                {col.prompt}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
              <div style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 7 }}>Response</div>
              <div style={{ ...serif, fontSize: 12, lineHeight: 1.65, color: C.text, whiteSpace: 'pre-wrap', minHeight: 32 }}>
                {col.output || <span style={{ opacity: 0.4 }}>{col.isLeft ? 'Hit RUN...' : 'Unlocks after left...'}</span>}
                {((col.isLeft && state.step === 1) || (!col.isLeft && state.step === 2)) && !col.done && (
                  <span style={{ animation: 'blink 0.65s step-end infinite', color: C.primary }}>▋</span>
                )}
              </div>
            </div>
            {col.done && (
              <div style={{ margin: '0 12px 10px', padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.border}`, background: C.surface2 }}>
                <div style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>{col.annLbl}</div>
                <div style={{ ...serif, fontSize: 11, color: C.text, lineHeight: 1.5 }}>{col.annTxt}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {state.step === 3 && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: '10px 14px', background: C.surface, flexShrink: 0 }}>
          <div style={{ ...serif, fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: 'center' }}
            dangerouslySetInnerHTML={{ __html: preset.landing.replace(/<em>/g, `<em style="color:${C.primary};">`) }} />
        </div>
      )}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}
