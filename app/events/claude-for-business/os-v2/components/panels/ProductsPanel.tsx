'use client';

import type React from 'react';
import type { Palette } from '../../types';

interface ClaudeProduct {
  icon: string;
  name: string;
  tag: string;
  desc: string;
  best: string;
  simulation: { prompt: string; steps: string[] };
}

export const CLAUDE_PRODUCTS: ClaudeProduct[] = [
  {
    icon: '01', name: 'Claude Chat', tag: 'claude.ai ~ start here',
    desc: "The chat window. Where 90% of your wins start.",
    best: 'emails, content, replies, decisions',
    simulation: {
      prompt: "Help me reply to this difficult client email...",
      steps: [
        '↳ Reading your message + the client thread',
        '↳ Drafting a reply that acknowledges + redirects',
        '↳ Offering 3 versions: warm, neutral, firm',
        '✓ Done in under 30 seconds',
      ],
    },
  },
  {
    icon: '02', name: 'Claude Cowork', tag: 'desktop ~ runs alongside your work',
    desc: "Lives next to your files. Stops the copy-paste tax.",
    best: 'client docs, daily ops, multi-file work',
    simulation: {
      prompt: "Organise my Downloads folder by category",
      steps: [
        '↳ Scanning 247 files in /Downloads',
        '↳ Sorting → Images / Documents / Spreadsheets / Invoices',
        '↳ Renaming invoices by client + date',
        '✓ All clean. 3 hours of admin done in 30 seconds.',
      ],
    },
  },
  {
    icon: '03', name: 'Claude Code', tag: 'terminal ~ for builders',
    desc: "Plain-English coding. You describe, it builds.",
    best: 'automations, CSV cleaners, custom tools',
    simulation: {
      prompt: "Add a Privacy Policy page to talentmucho.com",
      steps: [
        '↳ Reading repo structure',
        '↳ Writing /app/privacy/page.tsx with GDPR copy',
        '↳ git commit -m "feat: add privacy policy"',
        '↳ Deploying to Vercel',
        '✓ Live at talentmucho.com/privacy in 90 seconds',
      ],
    },
  },
  {
    icon: '04', name: 'Claude in Chrome', tag: 'browser agent ~ does tasks for you',
    desc: "Browses, clicks, fills forms on your behalf.",
    best: 'research, lead gen, repetitive web tasks',
    simulation: {
      prompt: "Find 10 marketing agencies in Madrid hiring VAs",
      steps: [
        '↳ Opening LinkedIn + filtering by industry + city',
        '↳ Scanning 60 profiles for "hiring" + "remote"',
        '↳ Pulling: name, role, contact, recent post',
        '↳ Saving to Google Sheet you can act on',
        '✓ 10 qualified leads, ready to outreach',
      ],
    },
  },
];

export function ProductsPanel({ C, mono, serif }: { C: Palette; mono: React.CSSProperties; serif: React.CSSProperties }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px' }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: C.text, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 4 }}>
        The four <em style={{ ...serif, fontWeight: 400, color: C.primary, textTransform: 'none' }}>Claudes</em>
      </div>
      <div style={{ ...serif, fontSize: 12, color: C.muted, marginBottom: 14, lineHeight: 1.5 }}>
        Same brain. Four doors. Pick the one that matches what you&apos;re trying to do.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {CLAUDE_PRODUCTS.map(p => (
          <div key={p.icon} style={{ padding: '11px 13px', borderRadius: 9, border: `1px solid ${C.border}`, background: C.surface2, display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <div style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 7, background: 'rgba(125,107,90,0.2)', color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', ...mono, fontSize: 11, fontWeight: 900 }}>{p.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.text, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 2 }}>{p.name}</div>
              <div style={{ ...mono, fontSize: 9, color: C.primary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>{p.tag}</div>
              <div style={{ ...serif, fontSize: 12, lineHeight: 1.5, color: C.text }}>{p.desc}</div>
              <div style={{ ...mono, fontSize: 9, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 5 }}>
                Best for ~ <span style={{ color: C.text, fontWeight: 700 }}>{p.best}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
