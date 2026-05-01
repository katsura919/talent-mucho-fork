'use client';

import type { SlideProps } from '../../types';

const HOSTS = [
  {
    name: 'Abie',
    accent: 'Maxey',
    role: 'The engineer who came back',
    avatar: 'A',
    flag: '🇵🇭 → 🇪🇸',
    location: 'Philippines → Madrid',
    story: [
      "Software engineer who stopped coding for years.",
      "<em>Claude Code brought me back.</em> Now I build websites + tools by describing them out loud.",
      "Weak passport. Strong plan. Spanish residency without a lawyer ~ <em>that's my whole thing.</em>",
    ],
    handle: 'abiemaxey.com',
    handleUrl: 'https://abiemaxey.com',
  },
  {
    name: 'Meri',
    accent: 'Gee',
    role: 'The marketer who burned out',
    avatar: 'M',
    flag: '🇵🇭',
    location: 'Cagayan de Oro, Philippines',
    story: [
      "Marketing + business, not tech. Built my agency from scratch.",
      "Burned out managing people, personalities, deadlines. <em>It was exhausting.</em>",
      "ChatGPT made me curious. <em>Claude changed everything.</em> Less staff. More output. Better results.",
    ],
    handle: 'talentmucho.com',
    handleUrl: 'https://talentmucho.com',
  },
];

export function OriginIntro({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const onDark = '#FAF8F5';
  const sz = (px: number) => Math.round(px * scale);

  return (
    <div style={{ maxWidth: 1280, margin: '24px auto 0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -20, right: 0, transform: 'rotate(8deg)', zIndex: 1, pointerEvents: 'none', animation: 'floatSticker 4s ease-in-out infinite' }}>
        <img src="/assets/stickers/ok.png" alt="" style={{ width: sz(96), height: 'auto', filter: `drop-shadow(0 8px 16px ${C.text}25)` }} />
      </div>

      <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
        Meet your hosts
      </div>
      <div style={{ ...serif, fontSize: sz(20), color: C.muted, marginBottom: 32, lineHeight: 1.5, maxWidth: 700 }}>
        Two very different stories. One business. <span style={{ color: C.primary, fontWeight: 600 }}>Operators, not coaches.</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22 }}>
        {HOSTS.map(host => (
          <div key={host.name} style={{ position: 'relative', padding: '32px 32px 28px', borderRadius: 22, background: C.surface, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: C.primary }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
              <div style={{ width: sz(72), height: sz(72), flexShrink: 0, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryHover} 100%)`, color: C.text === '#2A2520' ? onDark : C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', ...sans, fontSize: sz(34), fontWeight: 800, boxShadow: `0 8px 20px -6px ${C.primary}55` }}>{host.avatar}</div>
              <div>
                <div style={{ ...sans, fontSize: sz(34), fontWeight: 700, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                  {host.name}{' '}<em style={{ ...serif, fontWeight: 400, color: C.primary }}>{host.accent}</em>
                </div>
                <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 4 }}>{host.role}</div>
              </div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 100, background: `${C.muted}15`, marginBottom: 16 }}>
              <span style={{ fontSize: sz(13) }}>{host.flag}</span>
              <span style={{ ...mono, fontSize: sz(11), color: C.text, letterSpacing: '0.06em' }}>{host.location}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              {host.story.map((line, i) => (
                <div key={i} style={{ ...serif, fontSize: sz(17), lineHeight: 1.55, color: C.text }}
                  dangerouslySetInnerHTML={{ __html: line.replace(/<em>/g, `<em style="color:${C.primary}">`) }} />
              ))}
            </div>
            <a href={host.handleUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...mono, fontSize: sz(11), fontWeight: 700, color: C.primary, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', paddingTop: 14, borderTop: `1px solid ${C.border}`, width: '100%' }}>
              ↳ {host.handle}
            </a>
          </div>
        ))}
      </div>

      <style>{`@keyframes floatSticker { 0%, 100% { transform: rotate(8deg) translateY(0); } 50% { transform: rotate(8deg) translateY(-8px); } }`}</style>
    </div>
  );
}
