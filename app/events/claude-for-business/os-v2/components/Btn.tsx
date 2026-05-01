'use client';

import type React from 'react';
import type { Palette } from '../types';

export function Btn({ children, onClick, primary, style, C }: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  style?: React.CSSProperties;
  C?: Palette;
}) {
  const p = C?.primary ?? '#7D6B5A';
  const bg = C?.bg ?? '#1a1613';
  const text = C?.text ?? '#FAF8F5';
  const border = C?.border ?? 'rgba(156,139,122,0.3)';
  return (
    <button onClick={onClick} style={{
      padding: '4px 12px', borderRadius: 100, fontSize: 9,
      fontFamily: 'ui-monospace, monospace', fontWeight: 700,
      cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase',
      border: `1px solid ${primary ? p : border}`,
      background: primary ? p : 'transparent',
      color: primary ? bg : text,
      transition: 'all 0.15s', whiteSpace: 'nowrap',
      ...style,
    }}>
      {children}
    </button>
  );
}
