'use client';

import { useState, useEffect } from 'react';
import type { SlideProps } from '../../types';

interface StackItem {
  name: string;
  desc: string;
  value: number | 'priceless';
}

const VIP_STACK: StackItem[] = [
  { name: 'Full replay + transcript',    desc: 'Rewatch any demo · copy any prompt · 30-day access',                             value: 97 },
  { name: 'The Claude Vault',            desc: "Private dashboard setups + Talent Mucho's premium proprietary Claude skills",     value: 297 },
  { name: 'VIP-only group follow-up',    desc: '45-min private session with Abie & Meri · small group',                          value: 'priceless' },
  { name: '30-day Premium Skool access', desc: "Closed mentorship · weekly Vibe Coding · €49/mo after, cancel anytime",          value: 49 },
];

interface DoorOption {
  label: string;
  name: string;
  italic: string;
  price: string;
  pitch: string;
  bestFor: string;
  whatYouGet: string[];
  nextStep: string;
  cta: string;
  ctaUrl: string;
  highlight?: boolean;
}

const THREE_DOORS: DoorOption[] = [
  {
    label: 'Door 1',
    name: 'Free',
    italic: 'just try it',
    price: '€0',
    pitch: 'Open Claude tonight. Try one demo from what you saw.',
    bestFor: "You're curious. Just exploring. Not ready to commit anything.",
    whatYouGet: [
      "Our Skool community ~ free tier, 200+ already in",
      "Abie Maxey's AI Playbooks ~ free, growing every week",
      "The mindset shift you got tonight",
      "Whatever you remember from this session",
    ],
    nextStep: 'Join our Skool, grab the playbooks, open Claude tonight.',
    cta: 'Join the community',
    ctaUrl: 'https://www.skool.com/future-proof-with-ai-4339',
  },
  {
    label: 'Door 2',
    name: 'VIP',
    italic: '€47 ~ the map',
    price: '€47',
    pitch: "The recording, the skill library, 30 days inside our community.",
    bestFor: "Most of you. You don't want to figure this out alone over 6 months.",
    whatYouGet: [
      "Full replay + transcript ~ 30-day access (€97)",
      "The Claude Vault ~ Talent Mucho's premium proprietary skills (€297)",
      "VIP-only group follow-up ~ 45 min with Abie + Meri",
      "30-day Premium Skool · €49/mo after, cancel anytime (€49)",
      "Early access to the upcoming Bootcamp",
    ],
    nextStep: 'Click VIP link → Stripe → instant access tomorrow morning.',
    cta: 'Join VIP — €47',
    ctaUrl: 'https://buy.stripe.com/00w3cpd0W40HbGxgcl73G04',
    highlight: true,
  },
  {
    label: 'Door 3',
    name: 'Custom',
    italic: 'we build it',
    price: 'Talk to us',
    pitch: "We build the AI stack inside your business and place a trained VA inside your team.",
    bestFor: "Founders who are booked-out. Need this done, not learned.",
    whatYouGet: [
      "AI-Trained Ops Manager built for your business",
      "Custom skills + connectors + scheduled runs",
      "A trained VA placed inside your team",
      "Monthly partnership ~ the Operate pillar",
    ],
    nextStep: 'Book a free 30-min call at talentmucho.com/booking',
    cta: 'Book free call',
    ctaUrl: 'https://talentmucho.com/booking',
  },
];

export function ValueStack({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const onDark = '#FAF8F5';
  const sz = (px: number) => Math.round(px * scale);
  const totalNumeric = VIP_STACK.reduce((s, item) => s + (typeof item.value === 'number' ? item.value : 0), 0);
  const [pricesRevealed, setPricesRevealed] = useState(false);
  const [revealedItems, setRevealedItems] = useState(0);

  useEffect(() => {
    if (!pricesRevealed) { setRevealedItems(0); return; }
    setRevealedItems(0);
    let i = 0;
    const tick = () => {
      i += 1;
      setRevealedItems(i);
      if (i < VIP_STACK.length) setTimeout(tick, 280);
    };
    const initial = setTimeout(tick, 200);
    return () => clearTimeout(initial);
  }, [pricesRevealed]);

  const allItemsRevealed = revealedItems >= VIP_STACK.length;

  return (
    <div style={{ maxWidth: 1280, margin: '48px auto 0' }}>
      <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
          The VIP stack
        </span>
        <button
          onClick={() => setPricesRevealed(p => !p)}
          style={{
            ...mono, fontSize: sz(11), fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: pricesRevealed ? C.muted : (C.text === '#2A2520' ? onDark : C.bg),
            background: pricesRevealed ? 'transparent' : C.primary,
            border: `1px solid ${pricesRevealed ? C.border : C.primary}`,
            borderRadius: 100,
            padding: '6px 16px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {pricesRevealed ? '↺ Hide the math' : '▸ Reveal the math'}
        </button>
      </div>
      <div style={{ ...serif, fontSize: sz(20), color: C.muted, marginBottom: 26, lineHeight: 1.5 }}>
        {pricesRevealed ? "Honest values. Math doesn't lie." : "Click reveal when you're ready to drop the math."}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginBottom: 18 }}>
        {VIP_STACK.map((item, i) => {
          const isPriceless = item.value === 'priceless';
          const showPrice = pricesRevealed && i < revealedItems;
          return (
            <div key={item.name} style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: 18,
              alignItems: 'center',
              padding: '18px 22px',
              borderRadius: 12,
              background: C.surface,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: sz(34), height: sz(34),
                borderRadius: '50%',
                background: `${C.primary}20`,
                color: C.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                ...mono, fontSize: sz(13), fontWeight: 800,
              }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div style={{ ...sans, fontSize: sz(20), fontWeight: 700, color: C.text, letterSpacing: '-0.01em', marginBottom: 3 }}>
                  {item.name}
                </div>
                <div style={{ ...serif, fontSize: sz(15), color: C.muted, lineHeight: 1.45 }}>
                  {item.desc}
                </div>
              </div>
              <div style={{
                ...mono, fontSize: sz(16), fontWeight: 800,
                color: showPrice ? (isPriceless ? C.primary : C.text) : C.muted,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                opacity: showPrice ? 1 : 0.4,
                transition: 'all 0.4s ease',
                transform: showPrice ? 'translateY(0)' : 'translateY(4px)',
                filter: showPrice ? 'none' : 'blur(6px)',
                userSelect: showPrice ? 'auto' : 'none',
              }}>
                {showPrice ? (isPriceless ? 'priceless' : `€${item.value}`) : '€▒▒▒'}
              </div>
            </div>
          );
        })}
      </div>

      {allItemsRevealed && (
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
          padding: '24px 28px', borderRadius: 16,
          background: C.text, color: onDark,
          boxShadow: `0 18px 40px -14px ${C.text}40`,
          animation: 'fadeInUp 0.5s ease forwards',
        }}>
          <div>
            <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: 'rgba(250,248,245,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
              Real value if bought separately
            </div>
            <div style={{ ...sans, fontSize: sz(36), fontWeight: 700, color: 'rgba(250,248,245,0.6)', letterSpacing: '-0.02em', textDecoration: 'line-through', textDecorationThickness: 2 }}>
              €{totalNumeric}+
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: C.primary, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
              Tonight only
            </div>
            <div style={{ ...sans, fontSize: sz(48), fontWeight: 800, color: C.primary, letterSpacing: '-0.03em', lineHeight: 1 }}>
              €47
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ThreeDoorsOut({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const [activeDoor, setActiveDoor] = useState(1);
  const onDark = '#FAF8F5';
  const sz = (px: number) => Math.round(px * scale);

  return (
    <div style={{ maxWidth: 1280, margin: '56px auto 0' }}>
      <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
        Three doors out
      </div>
      <div style={{ ...serif, fontSize: sz(20), color: C.muted, marginBottom: 32, lineHeight: 1.5 }}>
        Three ways to use what you learned tonight. Mapped to how we work at Talent Mucho ~ <span style={{ color: C.primary, fontWeight: 600 }}>Educate · Educate Deeper · Build &amp; Operate.</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'stretch' }}>
        {THREE_DOORS.map((door, i) => {
          const isActive = activeDoor === i;
          const accentBg = door.highlight ? C.primary : (isActive ? C.text : C.surface);
          return (
            <div
              key={door.label}
              onClick={() => setActiveDoor(i)}
              style={{
                display: 'flex', flexDirection: 'column',
                padding: '26px 26px 22px',
                borderRadius: 18,
                background: door.highlight ? C.text : (isActive ? C.surface2 : C.surface),
                border: `2px solid ${door.highlight ? C.primary : (isActive ? C.primary : C.border)}`,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: door.highlight
                  ? `0 24px 48px -12px ${C.primary}55`
                  : isActive ? `0 12px 28px -10px ${C.text}25` : 'none',
                transform: door.highlight ? 'translateY(-4px)' : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {door.highlight && (
                <div style={{
                  position: 'absolute', top: 14, right: 16,
                  ...mono, fontSize: sz(9), fontWeight: 800,
                  color: C.text, background: C.primary,
                  padding: '4px 10px', borderRadius: 100,
                  letterSpacing: '0.18em',
                }}>RECOMMENDED</div>
              )}

              <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: door.highlight ? C.primary : C.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                {door.label}
              </div>
              <div style={{ ...sans, fontSize: sz(34), fontWeight: 700, color: door.highlight ? onDark : C.text, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 4 }}>
                {door.name}
              </div>
              <div style={{ ...serif, fontSize: sz(18), color: C.primary, marginBottom: 14, lineHeight: 1.3 }}>
                ~ {door.italic}
              </div>
              <div style={{ ...sans, fontSize: sz(16), fontWeight: 600, color: door.highlight ? onDark : C.text, marginBottom: 14, lineHeight: 1.4 }}>
                {door.pitch}
              </div>
              <div style={{ ...serif, fontSize: sz(14), color: door.highlight ? 'rgba(250,248,245,0.7)' : C.muted, marginBottom: 16, lineHeight: 1.45, paddingBottom: 12, borderBottom: `1px solid ${door.highlight ? 'rgba(250,248,245,0.18)' : C.border}` }}>
                <span style={{ ...mono, fontSize: sz(9), fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginRight: 6 }}>Best for ~</span>
                {door.bestFor}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18, flex: 1 }}>
                {door.whatYouGet.map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, ...serif, fontSize: sz(14), color: door.highlight ? 'rgba(250,248,245,0.88)' : C.text, lineHeight: 1.4 }}>
                    <span style={{ ...mono, fontSize: sz(12), color: C.primary, flexShrink: 0, paddingTop: 2 }}>~</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ ...mono, fontSize: sz(9), fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Next step ~
                </div>
                <div style={{ ...serif, fontSize: sz(13), color: door.highlight ? 'rgba(250,248,245,0.78)' : C.muted, lineHeight: 1.5, marginBottom: 14 }}>
                  {door.nextStep}
                </div>
                <a
                  href={door.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'block',
                    padding: `${sz(14)}px ${sz(20)}px`,
                    borderRadius: 100,
                    textAlign: 'center',
                    textDecoration: 'none',
                    ...mono, fontSize: sz(12), fontWeight: 800,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    background: door.highlight ? C.primary : (accentBg === C.text ? C.primary : C.text),
                    color: door.highlight ? onDark : (accentBg === C.text ? C.text : onDark),
                    border: 'none',
                  }}
                >
                  {door.cta} →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
