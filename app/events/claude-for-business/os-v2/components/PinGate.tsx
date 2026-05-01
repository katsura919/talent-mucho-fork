'use client';

import { useState, useEffect, useRef } from 'react';
import type { ThemeKey } from '../types';
import { THEMES, FONTS } from '../themes';

const PIN = '2028';

export function PinGate({ onUnlock, theme }: { onUnlock: () => void; theme: ThemeKey }) {
  const C = THEMES[theme].C;
  const [val, setVal] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  function tryPin(v: string) {
    if (v === PIN) { onUnlock(); return; }
    if (v.length === 4) {
      setShake(true); setVal('');
      setTimeout(() => setShake(false), 500);
    } else {
      setVal(v);
    }
  }

  return (
    <div style={{ background: C.bg, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24, fontFamily: FONTS[theme].sans }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.primary, fontWeight: 700 }}>{THEMES[theme].sub.toUpperCase()} ~ EVENT OS</div>
      <div style={{ fontSize: 13, color: C.muted, letterSpacing: '0.08em' }}>Enter access PIN to continue</div>
      <input
        ref={inputRef}
        type="password"
        inputMode="numeric"
        maxLength={4}
        value={val}
        onChange={e => tryPin(e.target.value)}
        style={{
          background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
          color: C.text, fontSize: 24, textAlign: 'center', letterSpacing: 12,
          padding: '14px 28px', width: 160, outline: 'none',
          transition: 'all 0.15s',
          animation: shake ? 'shake 0.4s ease' : 'none',
        }}
        placeholder="····"
      />
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
    </div>
  );
}
