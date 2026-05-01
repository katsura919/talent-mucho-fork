'use client';

import { useState, useEffect } from 'react';
import type { Segment } from '../config';
import type { Palette, ThemeKey } from '../types';
import { COMPARE_PRESETS } from '../config';
import { Editable } from './Editable';
import { CLAUDE_PRODUCTS } from './panels/ProductsPanel';
import { ABIE_STACK } from './panels/ShowcasePanel';
import { SpinWheel } from './slides/Slide04Demos';
import { WelcomeInteractive, LocationCloud, CommunityPulse } from './slides/Slide00Welcome';
import { OriginIntro } from './slides/Slide01Origins';
import { AIEmployeeLayers, OpsManagerDay } from './slides/Slide05AIEmployees';
import { LiveBuildGuide } from './slides/Slide06LiveBuild';
import { LiveQAFeed } from './slides/Slide07QA';
import { ValueStack, ThreeDoorsOut } from './slides/Slide08NextStep';
import { LiveResponses } from './slides/LiveResponses';
import { AILandscape } from './slides/Slide02AILandscape';

export function AudienceView({ seg, segIdx, totalSegs, wbBlock, pollBlock, timerSecs, fontSize, segments, C, mono, serif, sans, spkColor, theme, editMode, onSaveEdit }: {
  seg: Segment; segIdx: number; beat: number;
  totalSegs: number;
  wbBlock: { text?: string } | undefined;
  pollBlock: { text?: string } | undefined;
  timerSecs: number;
  fontSize: number;
  segments: Segment[];
  C: Palette; mono: React.CSSProperties; serif: React.CSSProperties; sans: React.CSSProperties;
  spkColor: (spk: string) => string;
  theme: ThemeKey;
  editMode: boolean;
  onSaveEdit: (path: string, value: string) => void;
}) {
  const audScale = fontSize / 19;
  const sz = (px: number) => Math.round(px * audScale);
  const fmtEvent = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const pollLines = pollBlock?.text?.replace(/^POLL ~ /, '').split('\n') ?? [];
  const wbText = wbBlock?.text?.replace(/^WORKBOOK ~ /, '') ?? '';

  const [compareStage, setCompareStage] = useState(0);
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null);
  const [activeClaude, setActiveClaude] = useState<number | null>(null);
  const [revealedSteps, setRevealedSteps] = useState(0);

  useEffect(() => {
    setCompareStage(0);
    setSelectedDraft(null);
    setActiveClaude(null);
    setRevealedSteps(0);
  }, [segIdx]);

  useEffect(() => {
    if (activeClaude === null) { setRevealedSteps(0); return; }
    const product = CLAUDE_PRODUCTS[activeClaude];
    setRevealedSteps(0);
    let i = 0;
    const total = product.simulation.steps.length;
    const tick = () => {
      i += 1;
      setRevealedSteps(i);
      if (i < total) setTimeout(tick, 700);
    };
    const initial = setTimeout(tick, 350);
    return () => clearTimeout(initial);
  }, [activeClaude]);

  const onDark = '#FAF8F5';
  const brand = 'TALENT MUCHO';
  const brandSub = 'CLAUDE FOR BUSINESS';
  const footerLink = 'talentmucho.com';

  const emRender = (html: string) => html.replace(/<em>/g, `<em style="color:${C.primary};font-family:${(serif.fontFamily as string)}">`);
  const emOnDark = (html: string) => html.replace(/<em>/g, `<em style="color:${C.primary};font-family:${(serif.fontFamily as string)}">`);

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: C.bg, color: C.text, ...sans, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5, background: `radial-gradient(ellipse at top, ${C.primary}15 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${C.peach} 0%, transparent 50%)` }} />

      {/* ── HERO TOP STRIP ── */}
      <div style={{ background: C.text, color: onDark, padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', ...mono, fontSize: 11, fontWeight: 800, color: C.text }}>
            {theme === 'tm' ? 'tm' : 'am'}
          </div>
          <div>
            <div style={{ ...mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.primary }}>{brand}</div>
            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,248,245,0.45)', marginTop: 2 }}>{brandSub}</div>
          </div>
        </div>
        <div style={{ ...mono, fontSize: 11, color: 'rgba(250,248,245,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ff5e5e', animation: 'pulse 1.4s ease-in-out infinite', boxShadow: '0 0 12px #ff5e5e' }} />
          LIVE <span style={{ opacity: 0.4 }}>~</span> <span style={{ fontWeight: 600, color: onDark }}>{fmtEvent(timerSecs)}</span> LEFT
        </div>
      </div>

      {/* ── HERO TITLE BAND ── */}
      <div style={{ padding: '32px 48px 24px', position: 'relative', zIndex: 2, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ ...mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: C.primary }} />
            Segment {seg.num} <span style={{ opacity: 0.4 }}>of {String(totalSegs).padStart(2, '0')}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1, color: C.text, margin: 0, ...sans }}>
            <span style={{ textTransform: 'uppercase' }}>
              <Editable key={`av-t-${segIdx}`} value={seg.title} editMode={editMode} onSave={v => onSaveEdit(`${segIdx}.title`, v)} />
            </span>
            {(seg.titleItalic || editMode) && <>{' '}<em style={{ ...serif, fontWeight: 400, color: C.primary, textTransform: 'none', letterSpacing: 0 }}>
              <Editable key={`av-ti-${segIdx}`} value={seg.titleItalic} editMode={editMode} onSave={v => onSaveEdit(`${segIdx}.titleItalic`, v)} />
            </em></>}
          </h1>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 28, justifyContent: 'flex-end' }}>
            {Array.from({ length: totalSegs }).map((_, i) => (
              <div key={i} style={{
                height: 4,
                width: i === segIdx ? 32 : 14,
                borderRadius: 4,
                background: i < segIdx ? C.primary : i === segIdx ? C.primary : `${C.muted}40`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ flex: 1, padding: '40px 48px 80px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: (seg.panel === 'compare' || seg.num === '00' || seg.num === '01') ? 'none' : 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 36, maxWidth: 1280, margin: '0 auto' }}>

          {/* ── LEFT: What we're covering ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ ...mono, fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
                What we&apos;re covering
              </div>
              <Editable
                key={`awt-${segIdx}`}
                tagName="div"
                value={emRender(seg.audWhatTitle)}
                editMode={editMode}
                onSave={v => onSaveEdit(`${segIdx}.audWhatTitle`, v.replace(/<em [^>]*>/g, '<em>'))}
                style={{ ...sans, fontSize: 42, fontWeight: 700, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 22 }}
              />
              <Editable
                key={`awb-${segIdx}`}
                tagName="div"
                value={emRender(seg.audWhatBody)}
                editMode={editMode}
                onSave={v => onSaveEdit(`${segIdx}.audWhatBody`, v.replace(/<em [^>]*>/g, '<em>'))}
                style={{ ...serif, fontSize: 26, lineHeight: 1.6, color: C.text, opacity: 0.9 }}
              />
            </div>
          </div>

          {/* ── RIGHT: Takeaway + active prompt ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {seg.panel !== 'products' && (
              <div style={{
                background: C.text, color: onDark,
                borderRadius: 20, padding: '34px 30px',
                boxShadow: `0 24px 48px -12px ${C.text}30, 0 0 0 1px ${C.primary}25`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -22, right: 18, ...serif, fontSize: 140, lineHeight: 1, color: C.primary, opacity: 0.25, userSelect: 'none' }}>"</div>
                <div style={{ ...mono, fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                  <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
                  Take this with you
                </div>
                <Editable
                  key={`atk-${segIdx}`}
                  tagName="div"
                  value={emOnDark(seg.audTakeaway)}
                  editMode={editMode}
                  onSave={v => onSaveEdit(`${segIdx}.audTakeaway`, v.replace(/<em [^>]*>/g, '<em>'))}
                  style={{ ...serif, fontSize: 30, lineHeight: 1.45, color: onDark, position: 'relative' }}
                />
              </div>
            )}

            {seg.panel === 'products' && (
              <div style={{
                background: C.surface, borderRadius: 20, padding: '26px 28px',
                border: `1px solid ${C.border}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: C.primary }} />
                <div style={{ ...mono, fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>
                  The 3 models
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { claude: 'Opus', desc: 'the genius', gpt: 'o1 / GPT-4', when: 'Complex thinking, strategy' },
                    { claude: 'Sonnet', desc: 'the workhorse', gpt: 'GPT-4o', when: 'Daily driver · use 90% of the time', highlight: true },
                    { claude: 'Haiku', desc: 'the fast one', gpt: 'GPT-4o mini', when: 'Quick lookups, short answers' },
                  ].map(row => (
                    <div key={row.claude} style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: row.highlight ? `${C.primary}18` : `${C.muted}10`,
                      border: row.highlight ? `1px solid ${C.primary}` : `1px solid ${C.border}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 4 }}>
                        <div style={{ ...sans, fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: '-0.01em' }}>
                          {row.claude}
                          <span style={{ ...serif, fontSize: 14, color: C.muted, fontWeight: 400, marginLeft: 8 }}>~ {row.desc}</span>
                        </div>
                        <div style={{ ...mono, fontSize: 11, color: C.primary, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                          ≈ {row.gpt}
                        </div>
                      </div>
                      <div style={{ ...mono, fontSize: 11, color: C.muted, letterSpacing: '0.04em' }}>{row.when}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, ...mono, fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center' }}>
                  TL;DR ~ just use Sonnet
                </div>
              </div>
            )}

            {wbBlock && (
              <div style={{
                background: C.surface, borderRadius: 20, padding: '26px 28px',
                border: `1px solid ${C.border}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: C.primary }} />
                <div style={{ ...mono, fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>
                  ~ Workbook moment
                </div>
                <div style={{ ...sans, fontSize: 24, fontWeight: 600, color: C.text, marginBottom: 12, letterSpacing: '-0.01em', lineHeight: 1.3 }}
                  dangerouslySetInnerHTML={{ __html: wbText.split('"')[1] ? `&ldquo;${wbText.split('"')[1]}&rdquo;` : wbText }} />
                <div style={{ ...serif, fontSize: 17, color: C.muted, lineHeight: 1.55 }}>
                  Write your answer down ~ paper or notes app. We&apos;ll come back to these.
                </div>
              </div>
            )}

            {pollBlock && (
              <div style={{
                background: C.surface2, borderRadius: 20, padding: '26px 28px',
                border: `1px solid ${C.primary}40`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: C.primary }} />
                <div style={{ ...mono, fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>
                  ~ Audience moment
                </div>
                <div style={{ ...sans, fontSize: 22, fontWeight: 600, color: C.text, marginBottom: 14, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  {pollLines[0]}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {pollLines.slice(1).map((l, i) => (
                    <div key={i} style={{
                      padding: '12px 16px', background: C.surface, borderRadius: 10,
                      ...mono, fontSize: 16, color: C.text,
                      border: `1px solid ${C.border}`,
                    }}>{l}</div>
                  ))}
                </div>
                <div style={{ marginTop: 16, ...mono, fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  ↳ Drop your answer in the Zoom chat
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── AI Landscape ~ segment 02 (above compare panel) ── */}
        {seg.num === '02' && (
          <AILandscape C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
        )}

        {/* ── ChatGPT vs Claude side-by-side ── */}
        {seg.panel === 'compare' && seg.panelData && COMPARE_PRESETS[seg.panelData] && (() => {
          const p = COMPARE_PRESETS[seg.panelData];
          const samePrompt = p.leftPrompt === p.rightPrompt;
          const cols = [
            { side: 'left' as const, tag: p.leftTag, title: p.leftTitle, why: p.leftWhy, prompt: p.leftPrompt, answer: p.leftAnswer, annLbl: p.leftAnnLbl, annTxt: p.leftAnnTxt },
            { side: 'right' as const, tag: p.rightTag, title: p.rightTitle, why: p.rightWhy, prompt: p.rightPrompt, answer: p.rightAnswer, annLbl: p.rightAnnLbl, annTxt: p.rightAnnTxt },
          ];
          return (
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div style={{ ...mono, fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
                {samePrompt ? 'Same prompt, two responses' : 'Same prompt, two ways'}
              </div>
              <div style={{ ...serif, fontSize: 18, color: C.muted, marginBottom: 24, lineHeight: 1.5 }}>{p.scenario}</div>

              {samePrompt && (
                <div style={{ padding: '20px 26px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 22, textAlign: 'center' }}>
                  <div style={{ ...mono, fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                    The prompt (sent to both)
                  </div>
                  <div style={{ ...mono, fontSize: 22, lineHeight: 1.4, color: C.text, fontWeight: 500 }}>
                    &ldquo;{p.leftPrompt}&rdquo;
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, alignItems: 'stretch' }}>
                {cols.map(col => {
                  const isBad = col.side === 'left';
                  const tagBg = isBad ? 'rgba(176,58,46,0.12)' : 'rgba(74,124,89,0.14)';
                  const tagFg = isBad ? '#b03a2e' : '#1e8449';
                  const tagBorder = isBad ? 'rgba(176,58,46,0.3)' : 'rgba(74,124,89,0.3)';
                  return (
                    <div key={col.side} style={{ background: C.surface, borderRadius: 18, border: `1px solid ${C.border}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '20px 22px 18px', borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 12px', borderRadius: 100, ...mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', background: tagBg, color: tagFg, border: `1px solid ${tagBorder}`, marginBottom: 12 }}>{col.tag}</div>
                        <div style={{ ...sans, fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 8 }}
                          dangerouslySetInnerHTML={{ __html: col.title.replace(/<em>/g, `<em style="font-family:${(serif.fontFamily as string)};font-weight:400;color:${C.primary}">`) }} />
                        <div style={{ ...serif, fontSize: 16, color: C.muted, lineHeight: 1.5 }}>{col.why}</div>
                      </div>
                      {!samePrompt && (
                        <div style={{ padding: '14px 22px', background: C.surface2, borderBottom: `1px solid ${C.border}` }}>
                          <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>The prompt</div>
                          <div style={{ ...mono, fontSize: 14, lineHeight: 1.55, color: C.text, whiteSpace: 'pre-wrap' }}>{col.prompt}</div>
                        </div>
                      )}
                      <div style={{ padding: '16px 22px 14px', borderBottom: `1px solid ${C.border}`, flex: 1 }}>
                        <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>
                          {col.side === 'right' && p.rightDrafts ? 'Step 1 · Claude asks back' : 'The response'}
                        </div>
                        <div style={{ ...serif, fontSize: 16, lineHeight: 1.6, color: C.text, whiteSpace: 'pre-wrap' }}>{col.answer}</div>
                      </div>

                      {col.side === 'right' && p.rightDrafts && compareStage >= 1 && (
                        <div style={{ padding: '18px 22px 16px', borderBottom: `1px solid ${C.border}`, background: `${C.primary}10` }}>
                          <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
                            Step 2 · Claude offers a selection
                          </div>
                          {p.rightBridge && (
                            <div style={{ ...serif, fontSize: 16, lineHeight: 1.55, color: C.text, marginBottom: 14 }}>{p.rightBridge}</div>
                          )}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {p.rightDrafts.map((draft, i) => {
                              const isSelected = selectedDraft === i;
                              return (
                                <div key={i} onClick={() => setSelectedDraft(isSelected ? null : i)} style={{
                                  padding: '14px 16px', borderRadius: 12,
                                  border: `2px solid ${isSelected ? C.primary : C.border}`,
                                  background: isSelected ? C.text : C.surface,
                                  color: isSelected ? onDark : C.text,
                                  cursor: 'pointer', transition: 'all 0.2s',
                                  boxShadow: isSelected ? `0 8px 24px -6px ${C.primary}55` : 'none',
                                  transform: isSelected ? 'translateY(-1px)' : 'none',
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isSelected ? 10 : 0 }}>
                                    <div style={{ ...mono, fontSize: 11, fontWeight: 700, color: isSelected ? C.primary : C.text, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{draft.label}</div>
                                    <div style={{ ...mono, fontSize: 9, fontWeight: 700, color: isSelected ? C.primary : C.muted, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                                      {isSelected ? '✓ Selected' : 'Click to select'}
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <div style={{ ...serif, fontSize: 15, lineHeight: 1.65, color: onDark, whiteSpace: 'pre-wrap', marginTop: 4 }}>{draft.body}</div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          {selectedDraft === null && (
                            <div style={{ ...mono, fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 12, textAlign: 'center', opacity: 0.7 }}>
                              ↑ click any version to read it
                            </div>
                          )}
                        </div>
                      )}

                      <div style={{ padding: '14px 22px 18px' }}>
                        <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>{col.annLbl}</div>
                        <div style={{ ...serif, fontSize: 17, color: C.text, lineHeight: 1.5 }}>{col.annTxt}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {p.rightDrafts && (
                <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                  {compareStage === 0 && (
                    <button onClick={() => setCompareStage(1)} style={{ padding: '12px 28px', borderRadius: 100, ...mono, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', background: C.primary, color: C.text === '#2A2520' ? '#FAF8F5' : C.bg, border: 'none', boxShadow: `0 6px 16px -4px ${C.primary}60` }}>
                      ▸ Show Claude&apos;s 3 versions
                    </button>
                  )}
                  {compareStage === 1 && (
                    <button onClick={() => { setCompareStage(0); setSelectedDraft(null); }} style={{ padding: '12px 28px', borderRadius: 100, ...mono, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', background: 'transparent', color: C.muted, border: `1px solid ${C.border}` }}>
                      ↺ Reset
                    </button>
                  )}
                </div>
              )}
              <div style={{ marginTop: 26, padding: '22px 28px', background: C.text, color: '#FAF8F5', borderRadius: 14, textAlign: 'center' }}>
                <div style={{ ...serif, fontSize: 24, color: '#FAF8F5', lineHeight: 1.45 }}
                  dangerouslySetInnerHTML={{ __html: p.landing.replace(/<em>/g, `<em style="color:${C.primary};">`) }} />
              </div>
            </div>
          );
        })()}

        {/* ── Spin the wheel ~ segment 04 ── */}
        {seg.num === '04' && (
          <SpinWheel items={ABIE_STACK} C={C} mono={mono} sans={sans} serif={serif} />
        )}

        {/* ── Welcome ~ segment 00 ── */}
        {seg.num === '00' && (
          <>
            <WelcomeInteractive C={C} mono={mono} sans={sans} serif={serif} scale={audScale} segments={segments} timerSecs={timerSecs} />
            <LocationCloud C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
            <CommunityPulse C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
          </>
        )}

        {/* ── Origin intros ~ segment 01 ── */}
        {seg.num === '01' && (
          <OriginIntro C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
        )}

        {/* ── AI Employee layers ~ segment 05 ── */}
        {seg.num === '05' && (
          <>
            <AIEmployeeLayers C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
            <OpsManagerDay C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
          </>
        )}

        {/* ── Live build ~ segment 06 ── */}
        {seg.num === '06' && (
          <LiveBuildGuide C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
        )}

        {/* ── Q&A ~ segment 07 ── */}
        {seg.num === '07' && (
          <LiveQAFeed C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
        )}

        {/* ── Next step ~ segment 08 ── */}
        {seg.num === '08' && (
          <>
            <ValueStack C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
            <ThreeDoorsOut C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
          </>
        )}

        {/* ── Live responses ~ word cloud + poll ── */}
        {seg.beats.some(b => b.blocks.some(bl => bl.type === 'workbook' || bl.type === 'poll')) && (
          <LiveResponses segmentNum={seg.num} C={C} mono={mono} sans={sans} serif={serif} scale={audScale} />
        )}

        {/* ── 4 Claudes grid ~ interactive simulation ── */}
        {seg.panel === 'products' && (
          <div style={{ maxWidth: 1280, margin: '48px auto 0' }}>
            <div style={{ ...mono, fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
              Same brain ~ four doors
            </div>
            <div style={{ ...mono, fontSize: 12, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 22, opacity: 0.7 }}>
              {activeClaude === null ? '↓ click any door to see it in action' : '↓ click another to switch · click again to close'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
              {CLAUDE_PRODUCTS.map((p, i) => {
                const isActive = activeClaude === i;
                return (
                  <div key={p.icon} onClick={() => setActiveClaude(isActive ? null : i)} style={{
                    padding: '24px 26px', borderRadius: 16,
                    border: `2px solid ${isActive ? C.primary : C.border}`,
                    background: isActive ? C.text : C.surface,
                    color: isActive ? onDark : C.text,
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isActive ? 'translateY(-2px)' : 'none',
                    boxShadow: isActive ? `0 16px 32px -10px ${C.primary}55` : 'none',
                    display: 'flex', flexDirection: 'column', gap: 16,
                  }}>
                    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 52, height: 52, flexShrink: 0, borderRadius: 12,
                        background: isActive ? C.primary : `${C.primary}20`,
                        color: isActive ? (C.text === '#2A2520' ? '#FAF8F5' : C.bg) : C.primary,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        ...mono, fontSize: 18, fontWeight: 800,
                      }}>{p.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ ...sans, fontSize: 22, fontWeight: 700, color: isActive ? onDark : C.text, letterSpacing: '-0.01em', marginBottom: 4 }}>{p.name}</div>
                        <div style={{ ...mono, fontSize: 11, color: C.primary, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>{p.tag}</div>
                        <div style={{ ...serif, fontSize: 18, lineHeight: 1.5, color: isActive ? onDark : C.text, marginBottom: 8 }}>{p.desc}</div>
                        <div style={{ ...mono, fontSize: 11, color: isActive ? 'rgba(250,248,245,0.55)' : C.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          Best for ~ <span style={{ color: isActive ? onDark : C.text, fontWeight: 700 }}>{p.best}</span>
                        </div>
                      </div>
                    </div>

                    {isActive && (
                      <div style={{ marginTop: 4, padding: '14px 16px', background: 'rgba(250,248,245,0.06)', borderRadius: 10, border: '1px solid rgba(250,248,245,0.1)' }}>
                        <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>You ~</div>
                        <div style={{ ...mono, fontSize: 14, lineHeight: 1.5, color: onDark, marginBottom: 14 }}>&ldquo;{p.simulation.prompt}&rdquo;</div>
                        <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Claude ~</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {p.simulation.steps.slice(0, revealedSteps).map((step, si) => (
                            <div key={si} style={{
                              ...mono, fontSize: 13, lineHeight: 1.5,
                              color: step.startsWith('✓') ? C.primary : 'rgba(250,248,245,0.85)',
                              fontWeight: step.startsWith('✓') ? 700 : 400,
                              opacity: 0,
                              animation: 'fadeInUp 0.4s ease forwards',
                            }}>{step}</div>
                          ))}
                          {revealedSteps < p.simulation.steps.length && (
                            <div style={{ ...mono, fontSize: 13, color: C.primary, opacity: 0.7 }}>
                              <span style={{ display: 'inline-block', animation: 'blink 0.8s step-end infinite' }}>▋</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <style>{`
              @keyframes fadeInUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
              @keyframes blink { 0%, 100% { opacity: 0.7; } 50% { opacity: 0; } }
            `}</style>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: C.text, color: 'rgba(250,248,245,0.55)', padding: '14px 48px', flexShrink: 0, ...mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div>Workshop hosted by <span style={{ color: onDark }}>Abie Maxey</span> + <span style={{ color: onDark }}>Meri Gee</span></div>
        <div>
          <a href={`https://${footerLink}`} style={{ color: C.primary, textDecoration: 'none', fontWeight: 700 }}>{footerLink}</a>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(1.1)}}`}</style>
    </div>
  );
}
