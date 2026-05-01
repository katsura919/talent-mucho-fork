'use client';

import type React from 'react';
import type { QAItem, Palette } from '../../types';

export function QAPanel({ qaList, qaInput, inputRef, onInput, onAdd, onVote, onActive, onDismiss, C, mono, serif }: {
  qaList: QAItem[];
  qaInput: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInput: (v: string) => void;
  onAdd: () => void;
  onVote: (id: number, d: number) => void;
  onActive: (id: number) => void;
  onDismiss: (id: number) => void;
  C: Palette;
  mono: React.CSSProperties;
  serif: React.CSSProperties;
}) {
  const live = qaList.filter(q => !q.answered).sort((a, b) => b.votes - a.votes);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 7, padding: '11px 14px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <input ref={inputRef} type="text" value={qaInput} onChange={e => onInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onAdd()}
          placeholder="Question from chat..."
          style={{ flex: 1, padding: '7px 12px', border: `1px solid ${C.border}`, borderRadius: 100, ...mono, fontSize: 11, background: C.bg, color: C.text, outline: 'none' }} />
        <button onClick={onAdd} style={{ padding: '7px 16px', borderRadius: 100, ...mono, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: 'none', background: C.primary, color: C.bg, letterSpacing: '0.07em', textTransform: 'uppercase' }}>+ Add</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px' }}>
        {live.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, opacity: 0.45 }}>
            <div style={{ ...serif, fontSize: 14, color: C.muted }}>No questions yet</div>
            <div style={{ ...mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Meri pulls from chat</div>
          </div>
        ) : live.map(q => (
          <div key={q.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 7, border: `1px solid ${q.active ? C.primary : C.border}`, background: q.active ? 'rgba(125,107,90,0.08)' : C.surface, transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0 }}>
              <button onClick={() => onVote(q.id, 1)} style={{ fontSize: 13, cursor: 'pointer', background: 'none', border: 'none', lineHeight: 1, padding: 2, opacity: 0.5, color: C.text }}>▲</button>
              <div style={{ ...mono, fontSize: 11, fontWeight: 500, color: C.muted }}>{q.votes}</div>
              <button onClick={() => onVote(q.id, -1)} style={{ fontSize: 13, cursor: 'pointer', background: 'none', border: 'none', lineHeight: 1, padding: 2, opacity: 0.5, color: C.text }}>▼</button>
            </div>
            <div style={{ ...serif, fontSize: 13, lineHeight: 1.5, color: C.text, flex: 1, paddingTop: 2 }}>{q.text}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
              <button onClick={() => onActive(q.id)} style={{ padding: '3px 8px', borderRadius: 100, ...mono, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.border}`, background: 'transparent', color: q.active ? C.primary : C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {q.active ? '✓ Live' : 'Go live'}
              </button>
              <button onClick={() => onDismiss(q.id)} style={{ padding: '3px 8px', borderRadius: 100, ...mono, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.border}`, background: 'transparent', color: C.muted, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Done ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
