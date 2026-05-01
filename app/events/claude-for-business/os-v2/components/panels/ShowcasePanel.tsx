'use client';

import type React from 'react';
import type { ShowTab, Palette } from '../../types';

export const ABIE_STACK = [
  { icon: 'CLI', name: 'Email Co-pilot CLI', short: 'Email CLI', desc: 'One command checks, summarises, drafts replies in my voice.' },
  { icon: 'PRP', name: 'Proposal System', short: 'Proposals', desc: 'Messy discovery notes in. Polished proposal out ~ structured by problem, approach, deliverables, timeline, price.' },
  { icon: 'DB', name: 'Personal Dashboard', short: 'Dashboard', desc: 'Replaces Notion + Coda. Custom-built, lives on my own site.' },
  { icon: '⚡', name: 'ADHD Command Centre', short: 'ADHD CC', desc: "Keeps me on track on the days my brain doesn't want to." },
  { icon: '▣', name: 'Carousel Studio', short: 'Carousels', desc: 'Drafts Threads & Instagram in my brand voice.' },
  { icon: 'UGC', name: 'UGC Pipeline', short: 'UGC', desc: 'Tracks every brand deal, deliverable, payment.' },
  { icon: '$', name: 'Sales Pipeline', short: 'Sales', desc: 'Leads, follow-ups, proposals ~ one view.' },
];

const MERI_ITEMS = [
  { icon: '📥', name: 'Inbox Triage AI', desc: 'Sorts, drafts replies in client voice, flags only what needs a human. 3hr/day > 30min.' },
  { icon: '🎯', name: 'Lead Qualification AI', desc: 'Scores leads, drafts first reply. VA only handles real prospects.' },
  { icon: '✍', name: 'Content Review AI', desc: "Checks every post against client's brand voice before going out." },
  { icon: '🤝', name: 'Onboarding AI', desc: 'Generates the full onboarding brief, SOPs, Day-1 task list.' },
  { icon: '📊', name: 'Weekly Report AI', desc: 'Pulls metrics, drafts the recap, flags blockers.' },
  { icon: '🔁', name: 'FAQ Voice AI', desc: "Trained on each client's past replies. Same 10 questions handled in their voice." },
];

export function ShowcasePanel({ showTab, onTabChange, C, mono, serif }: {
  showTab: ShowTab;
  onTabChange: (t: ShowTab) => void;
  C: Palette;
  mono: React.CSSProperties;
  serif: React.CSSProperties;
}) {
  const items = showTab === 'abie' ? ABIE_STACK : MERI_ITEMS;
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {(['abie', 'meri'] as ShowTab[]).map(t => (
          <button key={t} onClick={() => onTabChange(t)} style={{ padding: '4px 13px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', border: `1px solid ${t === showTab ? C.text : C.border}`, background: t === showTab ? C.surface : 'transparent', color: t === showTab ? C.primary : C.muted, transition: 'all 0.15s' }}>
            {t === 'abie' ? "Abie's stack" : 'AI employees'}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: C.text, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 4 }}>
        {showTab === 'abie' ? <>Abie&apos;s <em style={{ ...serif, fontWeight: 400, color: C.primary, textTransform: 'none' }}>setup</em></> : <>Talent Mucho&apos;s <em style={{ ...serif, fontWeight: 400, color: C.primary, textTransform: 'none' }}>AI employees</em></>}
      </div>
      <div style={{ ...serif, fontSize: 12, color: C.muted, marginBottom: 12, lineHeight: 1.5 }}>
        {showTab === 'abie' ? "Most days I don't open Gmail. I open my terminal." : "We don't replace VAs. We multiply what one VA can do."}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface2, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 6, background: 'rgba(125,107,90,0.2)', color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', ...mono, fontSize: 10, fontWeight: 900 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 3 }}>{item.name}</div>
              <div style={{ ...serif, fontSize: 12, lineHeight: 1.5, color: C.muted }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 7, background: C.surface, color: C.primary, ...serif, fontSize: 12, lineHeight: 1.55, textAlign: 'center' }}>
        {showTab === 'abie'
          ? <>Everyone should have <em style={{ color: C.text }}>a system that&apos;s yours.</em><br />Not rented from someone else&apos;s tool.</>
          : <>Same hours, more clients ~ <em style={{ color: C.text }}>or</em> same clients, less burnout.<br />The VA chooses.</>
        }
      </div>
    </div>
  );
}
