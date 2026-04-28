'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SEGMENTS, SPEAKERS, COMPARE_PRESETS, type Segment, type ComparePreset } from './config';

// ── Palettes ─────────────────────────────────────────────────────────────────
type ThemeKey = 'tm' | 'am';
type Palette = Record<string, string>;

interface ThemeFonts {
  sans: string;   // UI / body
  serif: string;  // scripted / italic accents
}

const FONTS: Record<ThemeKey, ThemeFonts> = {
  // Talent Mucho ~ Manrope + Cormorant Garamond (project defaults)
  tm: {
    sans: 'var(--font-manrope, ui-sans-serif, system-ui, sans-serif)',
    serif: 'var(--font-cormorant, ui-serif, Georgia, serif)',
  },
  // Abie Maxey ~ Host Grotesk + Instrument Serif (her personal brand fonts)
  am: {
    sans: 'var(--font-host-grotesk, ui-sans-serif, system-ui, sans-serif)',
    serif: 'var(--font-instrument-serif, ui-serif, Georgia, serif)',
  },
};

const THEMES: Record<ThemeKey, { label: string; sub: string; isDark: boolean; C: Palette }> = {
  // Talent Mucho ~ dark, earthy, professional
  tm: {
    label: 'TM',
    sub: 'Talent Mucho',
    isDark: true,
    C: {
      bg: '#1a1613', surface: '#2A2520', surface2: '#3D352E',
      border: 'rgba(156,139,122,0.18)',
      primary: '#7D6B5A', primaryHover: '#9C8B7A',
      text: '#FAF8F5', muted: 'rgba(250,248,245,0.5)',
      peach: 'rgba(125,107,90,0.12)', sage: 'rgba(156,139,122,0.25)',
      abie: '#FAF8F5', meri: '#9C8B7A', both: 'rgba(250,248,245,0.45)',
      good: '#4a7c59', bad: '#8b3a3a',
    },
  },
  // Abie Maxey ~ light, peach, sage ~ creator personal brand
  am: {
    label: 'AM',
    sub: 'Abie Maxey',
    isDark: false,
    C: {
      bg: '#f9f5f2', surface: '#ffffff', surface2: '#e7ddd3',
      border: 'rgba(58,58,58,0.12)',
      primary: '#e3a99c', primaryHover: '#d49283',
      text: '#3a3a3a', muted: '#6b6b6b',
      peach: '#f2d6c9', sage: '#bbcccd',
      abie: '#3a3a3a', meri: '#e3a99c', both: '#bbcccd',
      good: '#1e8449', bad: '#b03a2e',
    },
  },
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface QAItem { id: number; text: string; votes: number; answered: boolean; active: boolean; }
type Mode = 'demo' | 'compare' | 'products' | 'showcase' | 'qa';
type ViewType = 'presenter' | 'audience';
type ShowTab = 'abie' | 'meri';

interface CompareState {
  step: number;         // 0=ready, 1=left running, 2=right running, 3=landed
  running: boolean;
  leftText: string;
  rightText: string;
  leftDone: boolean;
  rightDone: boolean;
}

// ── Pin gate ───────────────────────────────────────────────────────────────────
const PIN = '1234'; // change this or set via NEXT_PUBLIC_EVENT_OS_PIN

function PinGate({ onUnlock, theme }: { onUnlock: () => void; theme: ThemeKey }) {
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

// ── Typewriter helper ~ fakes streaming for pre-written answers ──────────────
async function typeOut(
  text: string,
  onChunk: (chunk: string) => void,
  signal: { cancelled: boolean },
): Promise<void> {
  // Stream word-by-word with small randomized delays (feels like a real model)
  const tokens = text.match(/\S+\s*/g) ?? [text];
  for (const tok of tokens) {
    if (signal.cancelled) return;
    onChunk(tok);
    // 20ms~55ms per token, slightly longer on punctuation
    const delay = /[.!?]\s*$/.test(tok) ? 90 : 22 + Math.random() * 30;
    await new Promise(r => setTimeout(r, delay));
  }
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function EventOS() {
  const [unlocked, setUnlocked] = useState(false);
  const [theme, setTheme] = useState<ThemeKey>('tm');

  useEffect(() => {
    if (sessionStorage.getItem('os-unlocked') === '1') setUnlocked(true);
    const saved = localStorage.getItem('os-theme') as ThemeKey | null;
    if (saved && THEMES[saved]) setTheme(saved);
  }, []);

  function unlock() {
    sessionStorage.setItem('os-unlocked', '1');
    setUnlocked(true);
  }

  function changeTheme(t: ThemeKey) {
    setTheme(t);
    localStorage.setItem('os-theme', t);
  }

  if (!unlocked) return <PinGate onUnlock={unlock} theme={theme} />;
  return <OSApp theme={theme} onThemeChange={changeTheme} />;
}

// ── The actual OS ──────────────────────────────────────────────────────────────
function OSApp({ theme, onThemeChange }: { theme: ThemeKey; onThemeChange: (t: ThemeKey) => void }) {
  const C = THEMES[theme].C;
  const isDark = THEMES[theme].isDark;
  const [segIdx, setSegIdx] = useState(0);
  const [beatIdx, setBeatIdx] = useState(0);
  const [view, setView] = useState<ViewType>('presenter');
  const [mode, setMode] = useState<Mode>('demo');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSecs, setTimerSecs] = useState(0);
  const [eventSecs, setEventSecs] = useState(7200);
  const [fontSize, setFontSize] = useState(19);
  const [showTab, setShowTab] = useState<ShowTab>('abie');
  const [qaList, setQaList] = useState<QAItem[]>([]);
  const [qaInput, setQaInput] = useState('');
  const [nextQId, setNextQId] = useState(1);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [showNotes, setShowNotes] = useState(false);
  const [compareState, setCompareState] = useState<CompareState>({
    step: 0, running: false, leftText: '', rightText: '', leftDone: false, rightDone: false,
  });
  const [activePreset, setActivePreset] = useState<ComparePreset | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prompterRef = useRef<HTMLDivElement>(null);
  const qaInputRef = useRef<HTMLInputElement>(null);

  const seg = SEGMENTS[segIdx];
  const beat = seg.beats[beatIdx];

  // ── Persist notes ─────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('os-notes');
    if (saved) try { setNotes(JSON.parse(saved)); } catch { /* ignore */ }
  }, []);

  function saveNote(segId: number, val: string) {
    const next = { ...notes, [segId]: val };
    setNotes(next);
    localStorage.setItem('os-notes', JSON.stringify(next));
  }

  // ── Timer ─────────────────────────────────────────────────────────────────
  function toggleTimer() {
    if (timerRunning) {
      clearInterval(timerRef.current!);
      setTimerRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setTimerSecs(s => s + 1);
        setEventSecs(s => Math.max(0, s - 1));
      }, 1000);
      setTimerRunning(true);
    }
  }

  function resetTimer() { clearInterval(timerRef.current!); setTimerRunning(false); setTimerSecs(0); }

  useEffect(() => () => clearInterval(timerRef.current!), []);

  function fmt(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }
  function fmtEvent(s: number) {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sc = s % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`;
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  const goToSeg = useCallback((idx: number) => {
    setSegIdx(idx); setBeatIdx(0);
    const s = SEGMENTS[idx];
    const newMode = s.panel as Mode;
    setMode(newMode);
    if (newMode === 'compare' && s.panelData) {
      const preset = COMPARE_PRESETS[s.panelData];
      if (preset) { setActivePreset(preset); resetCompare(); }
    }
    if (s.speakers.includes('MERI') && !s.speakers.includes('ABIE')) setShowTab('meri');
    else setShowTab('abie');
    prompterRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToBeat = useCallback((idx: number) => {
    setBeatIdx(idx);
    const b = SEGMENTS[segIdx].beats[idx];
    if (mode === 'showcase') {
      if (b.speaker === 'MERI') setShowTab('meri');
      else if (b.speaker === 'ABIE') setShowTab('abie');
    }
    const el = document.getElementById(`beat-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [segIdx, mode]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const s = SEGMENTS[segIdx];
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (beatIdx < s.beats.length - 1) goToBeat(beatIdx + 1);
        else if (segIdx < SEGMENTS.length - 1) goToSeg(segIdx + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (beatIdx > 0) goToBeat(beatIdx - 1);
        else if (segIdx > 0) {
          const prevSeg = segIdx - 1;
          setSegIdx(prevSeg);
          const lastBeat = SEGMENTS[prevSeg].beats.length - 1;
          setBeatIdx(lastBeat);
          goToSeg(prevSeg);
          setTimeout(() => goToBeat(lastBeat), 50);
        }
      }
      if (e.key === ' ') { e.preventDefault(); toggleTimer(); }
      if (e.key === 'v' || e.key === 'V') setView(v => v === 'presenter' ? 'audience' : 'presenter');
      if (e.key === 'n' || e.key === 'N') setShowNotes(n => !n);
      if (e.key === 'r' || e.key === 'R') resetTimer();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [segIdx, beatIdx, goToBeat, goToSeg, toggleTimer]);

  // ── Compare ───────────────────────────────────────────────────────────────
  function resetCompare() {
    compareSignal.current.cancelled = true;
    setCompareState({ step: 0, running: false, leftText: '', rightText: '', leftDone: false, rightDone: false });
  }

  const compareSignal = useRef({ cancelled: false });
  async function runCompare() {
    if (!activePreset || compareState.running) return;
    compareSignal.current = { cancelled: false };
    resetCompare();
    setCompareState(s => ({ ...s, running: true, step: 1 }));
    await typeOut(activePreset.leftAnswer, (chunk) => {
      setCompareState(s => ({ ...s, leftText: s.leftText + chunk }));
    }, compareSignal.current);
    if (compareSignal.current.cancelled) return;
    setCompareState(s => ({ ...s, leftDone: true, step: 2 }));
    await new Promise(r => setTimeout(r, 500));
    if (compareSignal.current.cancelled) return;
    await typeOut(activePreset.rightAnswer, (chunk) => {
      setCompareState(s => ({ ...s, rightText: s.rightText + chunk }));
    }, compareSignal.current);
    if (compareSignal.current.cancelled) return;
    setCompareState(s => ({ ...s, rightDone: true, step: 3, running: false }));
  }

  // ── Q&A ───────────────────────────────────────────────────────────────────
  function addQA() {
    const text = qaInput.trim(); if (!text) return;
    setQaList(l => [...l, { id: nextQId, text, votes: 0, answered: false, active: false }]);
    setNextQId(n => n + 1); setQaInput('');
  }
  function voteQA(id: number, d: number) {
    setQaList(l => l.map(q => q.id === id ? { ...q, votes: Math.max(0, q.votes + d) } : q));
  }
  function toggleActiveQA(id: number) {
    setQaList(l => l.map(q => ({ ...q, active: q.id === id ? !q.active : false })));
  }
  function dismissQA(id: number) {
    setQaList(l => l.map(q => q.id === id ? { ...q, answered: true, active: false } : q));
  }

  // ── Export notes ──────────────────────────────────────────────────────────
  function exportNotes() {
    const lines = SEGMENTS.map(s => {
      const note = notes[s.id];
      return note ? `## Segment ${s.num} ~ ${s.title}${s.titleItalic ? ' ' + s.titleItalic : ''}\n${note}` : null;
    }).filter(Boolean);
    if (!lines.length) return alert('No notes yet.');
    const blob = new Blob([lines.join('\n\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'event-notes.txt';
    a.click();
  }

  // ── Speaker color helper ──────────────────────────────────────────────────
  function spkColor(spk: string) {
    if (spk === 'ABIE') return C.abie;
    if (spk === 'MERI') return C.meri;
    return C.both;
  }

  // ── Handoff text ──────────────────────────────────────────────────────────
  function handoffText() {
    if (!beat) return '';
    if (beat.speaker === 'BOTH') return 'BOTH ON CAM';
    if (beat.speaker === 'ABIE') return 'ABIE ON CAM ~ Meri on chat';
    return 'MERI ON CAM ~ Abie on chat';
  }

  // ── Progress ──────────────────────────────────────────────────────────────
  const progress = seg.beats.length > 1 ? (beatIdx / (seg.beats.length - 1)) * 100 : 100;

  // ── Audience workbook ~ find active poll/workbook ──────────────────────────
  const wbBlock = beat?.blocks.find(b => b.type === 'workbook');
  const pollBlock = beat?.blocks.find(b => b.type === 'poll');

  // ── Styles ────────────────────────────────────────────────────────────────
  const F = FONTS[theme];
  const mono: React.CSSProperties = { fontFamily: 'ui-monospace, "Geist Mono", monospace' };
  const sans: React.CSSProperties = { fontFamily: F.sans };
  const serif: React.CSSProperties = { fontFamily: F.serif };

  return (
    <div style={{ background: C.bg, color: C.text, height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden', ...sans }}>

      {/* ── TOP BAR ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', background: C.surface, borderBottom: `1px solid ${C.border}`, flexShrink: 0, flexWrap: 'wrap' }}>
        <div style={{ ...mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.primary, whiteSpace: 'nowrap', marginRight: 4 }}>
          TM<span style={{ color: C.muted, margin: '0 5px' }}>~</span>CFB
        </div>

        {/* Segment tabs */}
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', flex: 1 }}>
          {SEGMENTS.map((s, i) => (
            <button key={s.id} onClick={() => goToSeg(i)} style={{
              padding: '3px 9px', borderRadius: 100, fontSize: 9, ...mono,
              cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
              border: `1px solid ${i === segIdx ? C.primary : C.border}`,
              background: i === segIdx ? C.primary : 'transparent',
              color: i === segIdx ? C.bg : C.muted,
              fontWeight: i === segIdx ? 700 : 400,
              transition: 'all 0.15s',
            }}>
              {s.num} {s.title}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ ...mono, fontSize: 10, color: C.muted, paddingRight: 8, borderRight: `1px solid ${C.border}` }}>
            {fmtEvent(eventSecs)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ ...mono, fontSize: 9, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>SIZE</span>
            <input type="range" min={14} max={30} value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              style={{ width: 50, accentColor: C.primary }} />
          </div>
          <div style={{ ...mono, fontSize: 17, fontWeight: 500, minWidth: 52, textAlign: 'right' }}>{fmt(timerSecs)}</div>
          <Btn primary C={C} onClick={toggleTimer}>{timerRunning ? '⏸' : '▶'} {timerRunning ? 'PAUSE' : 'START'}</Btn>
          <Btn C={C} onClick={resetTimer} style={{ fontSize: 9 }}>↺</Btn>
          <Btn C={C} onClick={() => setView(v => v === 'presenter' ? 'audience' : 'presenter')}>
            {view === 'presenter' ? '🖥 SHARE' : '⬅ BACK'}
          </Btn>
          <Btn onClick={() => setShowNotes(n => !n)} C={C} style={{ color: showNotes ? C.primary : C.muted }}>
            ✎ NOTES
          </Btn>

          {/* Theme toggle ~ TM / AM */}
          <div style={{ display: 'flex', gap: 0, border: `1px solid ${C.border}`, borderRadius: 100, overflow: 'hidden', marginLeft: 4 }}>
            {(['tm', 'am'] as ThemeKey[]).map(t => (
              <button
                key={t}
                onClick={() => onThemeChange(t)}
                title={THEMES[t].sub}
                style={{
                  padding: '4px 10px',
                  ...mono,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                  background: t === theme ? C.primary : 'transparent',
                  color: t === theme ? (isDark ? C.bg : C.text) : C.muted,
                  transition: 'all 0.15s',
                }}
              >
                {THEMES[t].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── HANDOFF BANNER ── */}
      {beat && (
        <div style={{
          padding: '5px 16px', textAlign: 'center', ...mono,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          background: beat.speaker === 'ABIE' ? 'rgba(250,248,245,0.05)' : beat.speaker === 'MERI' ? 'rgba(125,107,90,0.18)' : 'rgba(156,139,122,0.12)',
          color: spkColor(beat.speaker),
          flexShrink: 0,
        }}>
          ↑  {handoffText()}  ↑
        </div>
      )}

      {/* ── LEGEND ── */}
      {view === 'presenter' && (
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '5px 16px', background: C.surface2, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <span style={{ ...mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Roles ~</span>
          {Object.entries(SPEAKERS).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, ...mono, fontSize: 9, color: C.muted }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: spkColor(k) }} />
              {v.name}
            </div>
          ))}
          <span style={{ marginLeft: 'auto', ...mono, fontSize: 9, color: C.muted, opacity: 0.55 }}>
            ← → beats &nbsp;·&nbsp; SPACE timer &nbsp;·&nbsp; R reset &nbsp;·&nbsp; V audience &nbsp;·&nbsp; N notes
          </span>
        </div>
      )}

      {/* ── NOTES DRAWER ── */}
      {showNotes && view === 'presenter' && (
        <div style={{ background: '#fff8d6', borderBottom: '2px solid #d4a92a', padding: '10px 16px', flexShrink: 0, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a5e10', marginBottom: 6 }}>
              Seg {seg.num} notes ~ auto-saved
            </div>
            <textarea
              value={notes[seg.id] ?? ''}
              onChange={e => saveNote(seg.id, e.target.value)}
              placeholder="Type notes for this segment..."
              style={{ width: '100%', minHeight: 56, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(212,169,42,0.4)', borderRadius: 8, padding: '8px 12px', fontSize: 12, fontFamily: 'var(--font-manrope, sans-serif)', color: '#3a3a3a', resize: 'vertical', outline: 'none' }}
            />
          </div>
          <button onClick={exportNotes} style={{ padding: '6px 14px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700, cursor: 'pointer', background: '#3a3a3a', color: '#fff', border: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            ↓ Export notes
          </button>
        </div>
      )}

      {/* ── PRESENTER VIEW ── */}
      {view === 'presenter' && (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

          {/* SIDEBAR */}
          <div style={{ width: 190, background: C.surface, borderRight: `1px solid ${C.border}`, overflowY: 'auto', flexShrink: 0, padding: '12px 0' }}>
            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, padding: '0 12px 8px' }}>Beats</div>
            {seg.beats.map((b, i) => (
              <div key={b.id} onClick={() => goToBeat(i)} style={{
                padding: '8px 12px', cursor: 'pointer', borderLeft: `3px solid ${i === beatIdx ? C.primary : 'transparent'}`,
                background: i === beatIdx ? 'rgba(125,107,90,0.1)' : 'transparent',
                transition: 'all 0.15s',
              }}>
                <div style={{ ...mono, fontSize: 9, color: C.muted, marginBottom: 2, letterSpacing: '0.06em' }}>
                  {seg.num}.{String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.35 }}>{b.title}</div>
                <div style={{ ...mono, fontSize: 9, marginTop: 2, color: spkColor(b.speaker), letterSpacing: '0.05em' }}>
                  {SPEAKERS[b.speaker]?.name}
                </div>
              </div>
            ))}
          </div>

          {/* PROMPTER */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: `1px solid ${C.border}`, minWidth: 0 }}>
            {/* Seg header */}
            <div style={{ padding: '12px 24px 10px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, background: C.surface, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <div style={{ ...mono, fontSize: 9, color: C.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>
                  SEGMENT {seg.num}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                  {seg.title}{seg.titleItalic && <> <em style={{ ...serif, fontStyle: 'italic', fontWeight: 400, color: C.primary, textTransform: 'none', letterSpacing: 0 }}>{seg.titleItalic}</em></>}
                </div>
                <div style={{ ...serif, fontStyle: 'italic', fontSize: 12, color: C.muted, marginTop: 3 }}>{seg.subtitle}</div>
                <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                  {seg.speakers.map(sk => (
                    <div key={sk} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 9px', borderRadius: 100, border: `1px solid ${spkColor(sk)}`, ...mono, fontSize: 9, fontWeight: 500, color: spkColor(sk), letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: spkColor(sk) }} />
                      {SPEAKERS[sk]?.name}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...mono, fontSize: 9, color: C.muted, padding: '3px 10px', border: `1px solid ${C.border}`, borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.07em', textTransform: 'uppercase', alignSelf: 'flex-start', marginTop: 2 }}>
                ⏱ {seg.duration}
              </div>
            </div>

            {/* Script */}
            <div ref={prompterRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 60px', background: C.bg }}>
              {seg.beats.map((b, bi) => (
                <div key={b.id} id={`beat-${bi}`} style={{ marginBottom: bi < seg.beats.length - 1 ? 0 : 0 }}>
                  <div style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: 14, paddingBottom: 7, borderBottom: `1px solid ${C.border}` }}>
                    {seg.num}.{String(bi + 1).padStart(2, '0')} ~ {b.title}
                  </div>
                  {b.blocks.map((bl, bli) => (
                    <div key={bli} style={{ marginBottom: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {bl.type === 'stage' && (
                        <div style={{ ...mono, fontSize: 11, color: C.muted, background: C.surface2, border: `1px dashed rgba(156,139,122,0.3)`, borderRadius: 6, padding: '8px 12px', letterSpacing: '0.03em', width: '100%' }}>
                          🎬 {bl.text}
                        </div>
                      )}
                      {bl.type === 'poll' && (
                        <div style={{ background: 'rgba(125,107,90,0.12)', border: `1px solid rgba(125,107,90,0.3)`, borderRadius: 8, padding: '10px 14px', width: '100%' }}>
                          <div style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.primary, marginBottom: 6 }}>~ Audience moment</div>
                          <div style={{ ...mono, fontSize: 11, color: C.text }}>{bl.text?.replace(/\n/g, ' · ')}</div>
                        </div>
                      )}
                      {bl.type === 'workbook' && (
                        <div style={{ background: 'rgba(156,139,122,0.12)', border: `1px solid rgba(156,139,122,0.3)`, borderRadius: 8, padding: '10px 14px', width: '100%' }}>
                          <div style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8bab9a', marginBottom: 6 }}>~ Workbook moment</div>
                          <div style={{ ...mono, fontSize: 11, color: C.text }}>{bl.text}</div>
                        </div>
                      )}
                      {(bl.type === 'scripted' || bl.type === 'bullets') && (
                        <>
                          <div style={{ width: 56, flexShrink: 0, paddingTop: 1 }}>
                            {bl.speaker && (
                              <div style={{ ...mono, fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: spkColor(bl.speaker) }}>
                                {SPEAKERS[bl.speaker]?.name}
                              </div>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5, color: C.muted }}>
                              {bl.type === 'scripted' ? '✦ scripted' : '~ bullets'}
                            </div>
                            {bl.type === 'scripted' ? (
                              <div
                                style={{ ...serif, fontSize, lineHeight: 1.75, fontWeight: 400, color: C.text }}
                                dangerouslySetInnerHTML={{ __html: bl.text?.replace(/<em>/g, `<em style="font-style:italic;color:${C.primary}">`) ?? '' }}
                              />
                            ) : (
                              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                                {bl.items?.map((item, ii) => (
                                  <li key={ii} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                    <span style={{ ...mono, fontSize: 12, color: C.primary, flexShrink: 0, paddingTop: 3 }}>~</span>
                                    <span style={{ ...serif, fontSize: fontSize - 2, lineHeight: 1.6, color: C.text }}
                                      dangerouslySetInnerHTML={{ __html: item.replace(/<em>/g, `<em style="font-style:italic;color:${C.primary}">`) }} />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {bi < seg.beats.length - 1 && (
                    <div style={{ height: 1, background: C.border, margin: '16px 0 20px' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ height: 3, background: C.surface2, flexShrink: 0 }}>
              <div style={{ height: '100%', background: C.primary, width: `${progress}%`, transition: 'width 0.3s' }} />
            </div>
          </div>

          {/* DEMO PANEL */}
          <div style={{ width: 420, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.surface }}>
            {/* Panel header */}
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, background: C.surface2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ ...mono, fontSize: 11, fontWeight: 700, color: C.text }}>
                {{ demo: 'Live demo', compare: 'Compare', products: '4 Claudes', showcase: 'Behind scenes', qa: 'Q&A queue' }[mode]}
              </div>
              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {(['demo', 'compare', 'products', 'showcase', 'qa'] as Mode[]).map(m => (
                  <button key={m} onClick={() => setMode(m)} style={{
                    padding: '3px 9px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700,
                    cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase',
                    border: `1px solid ${m === mode ? C.primary : C.border}`,
                    background: m === mode ? C.primary : 'transparent',
                    color: m === mode ? C.bg : C.muted,
                    transition: 'all 0.15s',
                  }}>{m}</button>
                ))}
              </div>
            </div>

            {/* Panel content */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

              {/* Demo iframe */}
              {mode === 'demo' && (
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                  {seg.panelUrl ? (
                    <iframe src={seg.panelUrl} style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, padding: 24 }}>
                      <div style={{ fontSize: 28, opacity: 0.3 }}>↗</div>
                      <div style={{ ...serif, fontStyle: 'italic', fontSize: 14, color: C.muted, textAlign: 'center', lineHeight: 1.6 }}>
                        Switch to compare, products,<br />or showcase for this segment
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Compare */}
              {mode === 'compare' && activePreset && (
                <ComparePanel
                  preset={activePreset}
                  state={compareState}
                  onRun={runCompare}
                  onReset={resetCompare}
                  C={C} mono={mono} serif={serif}
                />
              )}
              {mode === 'compare' && !activePreset && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, ...serif, fontStyle: 'italic', fontSize: 14, color: C.muted }}>
                  No compare preset for this segment
                </div>
              )}

              {/* Products */}
              {mode === 'products' && <ProductsPanel C={C} mono={mono} serif={serif} />}

              {/* Showcase */}
              {mode === 'showcase' && (
                <ShowcasePanel showTab={showTab} onTabChange={setShowTab} C={C} mono={mono} serif={serif} />
              )}

              {/* Q&A */}
              {mode === 'qa' && (
                <QAPanel
                  qaList={qaList} qaInput={qaInput} inputRef={qaInputRef}
                  onInput={setQaInput} onAdd={addQA}
                  onVote={voteQA} onActive={toggleActiveQA} onDismiss={dismissQA}
                  C={C} mono={mono} serif={serif}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── AUDIENCE VIEW ── */}
      {view === 'audience' && (
        <AudienceView
          seg={seg} segIdx={segIdx} beat={beatIdx}
          wbBlock={wbBlock} pollBlock={pollBlock}
          timerSecs={timerRunning ? eventSecs : eventSecs}
          C={C} mono={mono} serif={serif} sans={sans}
          spkColor={spkColor}
        />
      )}
    </div>
  );
}

// ── Reusable Btn ─────────────────────────────────────────────────────────────
function Btn({ children, onClick, primary, style, C }: {
  children: React.ReactNode; onClick?: () => void; primary?: boolean;
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

// ── Compare Panel ─────────────────────────────────────────────────────────────
function ComparePanel({ preset, state, onRun, onReset, C, mono, serif }: {
  preset: ComparePreset;
  state: CompareState;
  onRun: () => void;
  onReset: () => void;
  C: Record<string, string>;
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
                dangerouslySetInnerHTML={{ __html: col.title.replace(/<em>/g, `<em style="font-family:${serif.fontFamily as string};font-style:italic;font-weight:400;color:${C.primary};text-transform:none">`) }} />
              <div style={{ ...serif, fontStyle: 'italic', fontSize: 11, color: C.muted, marginTop: 3, lineHeight: 1.4 }}>{col.why}</div>
            </div>
            <div style={{ padding: '6px 12px', background: C.bg, flexShrink: 0, borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
              <div style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,248,245,0.3)', marginBottom: 3 }}>Prompt</div>
              <div style={{ ...mono, fontSize: 10, lineHeight: 1.5, color: col.isLeft || state.step >= 2 ? 'rgba(250,248,245,0.75)' : 'rgba(250,248,245,0.25)', whiteSpace: 'pre-wrap', maxHeight: 80, overflowY: 'auto' }}>
                {col.prompt}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
              <div style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 7 }}>Response</div>
              <div style={{ ...serif, fontSize: 12, lineHeight: 1.65, color: C.text, whiteSpace: 'pre-wrap', minHeight: 32 }}>
                {col.output || <span style={{ fontStyle: 'italic', opacity: 0.4 }}>{col.isLeft ? 'Hit RUN...' : 'Unlocks after left...'}</span>}
                {((col.isLeft && state.step === 1) || (!col.isLeft && state.step === 2)) && !col.done && (
                  <span style={{ animation: 'blink 0.65s step-end infinite', color: C.primary }}>▋</span>
                )}
              </div>
            </div>
            {col.done && (
              <div style={{ margin: '0 12px 10px', padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.border}`, background: C.surface2 }}>
                <div style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>{col.annLbl}</div>
                <div style={{ ...serif, fontStyle: 'italic', fontSize: 11, color: C.text, lineHeight: 1.5 }}>{col.annTxt}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {state.step === 3 && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: '10px 14px', background: C.surface, flexShrink: 0 }}>
          <div style={{ ...serif, fontStyle: 'italic', fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: 'center' }}
            dangerouslySetInnerHTML={{ __html: preset.landing.replace(/<em>/g, `<em style="color:${C.primary};font-style:italic">`) }} />
        </div>
      )}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}

// ── Products Panel ────────────────────────────────────────────────────────────
function ProductsPanel({ C, mono, serif }: { C: Record<string, string>; mono: React.CSSProperties; serif: React.CSSProperties }) {
  const products = [
    { icon: '01', name: 'Claude Chat', tag: 'claude.ai ~ start here', desc: "The chat window. Where 90% of your wins start.", best: 'emails, content, replies, decisions' },
    { icon: '02', name: 'Claude Cowork', tag: 'desktop ~ runs alongside your work', desc: "Lives next to your files. Stops the copy-paste tax.", best: 'client docs, daily ops, multi-file work' },
    { icon: '03', name: 'Claude Code', tag: 'terminal ~ for builders', desc: "Plain-English coding. You describe, it builds.", best: 'automations, CSV cleaners, custom tools' },
    { icon: '04', name: 'Claude in Chrome', tag: 'browser agent ~ does tasks for you', desc: "Browses, clicks, fills forms on your behalf.", best: 'research, lead gen, repetitive web tasks' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px' }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: C.text, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 4 }}>
        The four <em style={{ ...serif, fontStyle: 'italic', fontWeight: 400, color: C.primary, textTransform: 'none' }}>Claudes</em>
      </div>
      <div style={{ ...serif, fontStyle: 'italic', fontSize: 12, color: C.muted, marginBottom: 14, lineHeight: 1.5 }}>
        Same brain. Four doors. Pick the one that matches what you&apos;re trying to do.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {products.map(p => (
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

// ── Showcase Panel ────────────────────────────────────────────────────────────
function ShowcasePanel({ showTab, onTabChange, C, mono, serif }: {
  showTab: ShowTab; onTabChange: (t: ShowTab) => void;
  C: Record<string, string>; mono: React.CSSProperties; serif: React.CSSProperties;
}) {
  const abieItems = [
    { icon: 'CLI', name: 'Email Co-pilot CLI', desc: 'One command checks, summarises, drafts replies in my voice.' },
    { icon: 'CC', name: 'Website edits > GitHub', desc: 'Describe the change. Claude writes, commits, deploys.' },
    { icon: 'DB', name: 'Personal Dashboard', desc: 'Replaces Notion + Coda. Custom-built, lives on my own site.' },
    { icon: '⚡', name: 'ADHD Command Centre', desc: "Keeps me on track on the days my brain doesn't want to." },
    { icon: '▣', name: 'Carousel Studio', desc: 'Drafts Threads & Instagram in my brand voice.' },
    { icon: 'UGC', name: 'UGC Pipeline', desc: 'Tracks every brand deal, deliverable, payment.' },
    { icon: '$', name: 'Sales Pipeline', desc: 'Leads, follow-ups, proposals ~ one view.' },
  ];
  const meriItems = [
    { icon: '📥', name: 'Inbox Triage AI', desc: 'Sorts, drafts replies in client voice, flags only what needs a human. 3hr/day > 30min.' },
    { icon: '🎯', name: 'Lead Qualification AI', desc: 'Scores leads, drafts first reply. VA only handles real prospects.' },
    { icon: '✍', name: 'Content Review AI', desc: "Checks every post against client's brand voice before going out." },
    { icon: '🤝', name: 'Onboarding AI', desc: 'Generates the full onboarding brief, SOPs, Day-1 task list.' },
    { icon: '📊', name: 'Weekly Report AI', desc: 'Pulls metrics, drafts the recap, flags blockers.' },
    { icon: '🔁', name: 'FAQ Voice AI', desc: "Trained on each client's past replies. Same 10 questions handled in their voice." },
  ];

  const items = showTab === 'abie' ? abieItems : meriItems;
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
        {showTab === 'abie' ? <>Abie&apos;s <em style={{ ...serif, fontStyle: 'italic', fontWeight: 400, color: C.primary, textTransform: 'none' }}>setup</em></> : <>Talent Mucho&apos;s <em style={{ ...serif, fontStyle: 'italic', fontWeight: 400, color: C.primary, textTransform: 'none' }}>AI employees</em></>}
      </div>
      <div style={{ ...serif, fontStyle: 'italic', fontSize: 12, color: C.muted, marginBottom: 12, lineHeight: 1.5 }}>
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
      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 7, background: C.surface, color: C.primary, ...serif, fontStyle: 'italic', fontSize: 12, lineHeight: 1.55, textAlign: 'center' }}>
        {showTab === 'abie'
          ? <>Everyone should have <em style={{ color: C.text, fontStyle: 'italic' }}>a system that&apos;s yours.</em><br />Not rented from someone else&apos;s tool.</>
          : <>Same hours, more clients ~ <em style={{ color: C.text, fontStyle: 'italic' }}>or</em> same clients, less burnout.<br />The VA chooses.</>
        }
      </div>
    </div>
  );
}

// ── Q&A Panel ─────────────────────────────────────────────────────────────────
function QAPanel({ qaList, qaInput, inputRef, onInput, onAdd, onVote, onActive, onDismiss, C, mono, serif }: {
  qaList: QAItem[]; qaInput: string; inputRef: React.RefObject<HTMLInputElement | null>;
  onInput: (v: string) => void; onAdd: () => void;
  onVote: (id: number, d: number) => void; onActive: (id: number) => void; onDismiss: (id: number) => void;
  C: Record<string, string>; mono: React.CSSProperties; serif: React.CSSProperties;
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
            <div style={{ ...serif, fontStyle: 'italic', fontSize: 14, color: C.muted }}>No questions yet</div>
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
              <button onClick={() => onDismiss(q.id)} style={{ padding: '3px 8px', borderRadius: 100, ...mono, fontSize: 9, cursor: 'pointer', border: `1px solid rgba(156,139,122,0.2)`, background: 'transparent', color: 'rgba(250,248,245,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Done ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Audience View ─────────────────────────────────────────────────────────────
function AudienceView({ seg, segIdx, beat, wbBlock, pollBlock, timerSecs, C, mono, serif, sans, spkColor }: {
  seg: Segment; segIdx: number; beat: number;
  wbBlock: { text?: string } | undefined;
  pollBlock: { text?: string } | undefined;
  timerSecs: number;
  C: Record<string, string>; mono: React.CSSProperties; serif: React.CSSProperties; sans: React.CSSProperties;
  spkColor: (spk: string) => string;
}) {
  const fmtEvent = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const pollLines = pollBlock?.text?.replace(/^POLL ~ /, '').split('\n') ?? [];
  const wbText = wbBlock?.text?.replace(/^WORKBOOK ~ /, '') ?? '';

  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#FAF8F5', color: '#2A2520', ...sans }}>
      {/* Top bar */}
      <div style={{ background: '#2A2520', color: '#FAF8F5', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '3px solid #7D6B5A' }}>
        <div style={{ ...mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7D6B5A' }}>
          TALENT MUCHO<span style={{ color: 'rgba(250,248,245,0.35)', margin: '0 7px' }}>~</span>CLAUDE FOR BUSINESS
        </div>
        <div style={{ ...mono, fontSize: 11, color: 'rgba(250,248,245,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ff5e5e', animation: 'pulse 1.4s ease-in-out infinite' }} />
          LIVE WORKSHOP ~ {fmtEvent(timerSecs)} LEFT
        </div>
      </div>

      {/* Current segment bar */}
      <div style={{ background: '#7D6B5A', color: '#2A2520', padding: '12px 32px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div>
          <div style={{ ...mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.65, marginBottom: 3 }}>
            Segment {seg.num}
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05, textTransform: 'uppercase' }}>
            {seg.title}{seg.titleItalic && <> <em style={{ ...serif, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>{seg.titleItalic}</em></>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {SEGMENTS.map((_, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < segIdx ? '#2A2520' : i === segIdx ? '#2A2520' : 'rgba(42,37,32,0.18)', boxShadow: i === segIdx ? '0 0 0 4px rgba(42,37,32,0.18)' : 'none', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, maxWidth: 1200, margin: '0 auto' }}>
          {/* Left col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ background: '#fff', border: '1px solid #DED4C4', borderRadius: 12, padding: '20px 22px' }}>
              <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: '#7D6B5A', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ display: 'inline-block', width: 14, height: 1, background: '#7D6B5A' }} />
                What we&apos;re covering
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#2A2520', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 10, textTransform: 'uppercase' }}
                dangerouslySetInnerHTML={{ __html: seg.audWhatTitle }} />
              <div style={{ ...serif, fontSize: 15, lineHeight: 1.65, color: '#2A2520' }}
                dangerouslySetInnerHTML={{ __html: seg.audWhatBody }} />
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 10 }}>
                {seg.speakers.map(sk => (
                  <div key={sk} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 100, ...mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', border: `1px solid ${spkColor(sk)}`, color: spkColor(sk) === '#FAF8F5' ? '#2A2520' : spkColor(sk) }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: spkColor(sk) === '#FAF8F5' ? '#2A2520' : spkColor(sk) }} />
                    {SPEAKERS[sk]?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Takeaway */}
            <div style={{ background: '#2A2520', border: '1px solid #2A2520', borderRadius: 12, padding: '22px 22px' }}>
              <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: '#7D6B5A', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ display: 'inline-block', width: 14, height: 1, background: '#7D6B5A' }} />
                Take this with you
              </div>
              <div style={{ ...serif, fontStyle: 'italic', fontSize: 18, lineHeight: 1.55, color: '#FAF8F5' }}
                dangerouslySetInnerHTML={{ __html: seg.audTakeaway.replace(/<em>/g, '<em style="color:#7D6B5A;font-style:italic">') }} />
            </div>

            {/* Workbook */}
            {wbBlock && (
              <div style={{ background: '#EBE4D8', border: '1px solid #DED4C4', borderRadius: 12, padding: '20px 22px' }}>
                <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: '#7D6B5A', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>~ Workbook moment</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#2A2520', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '-0.01em' }}
                  dangerouslySetInnerHTML={{ __html: wbText.split('"')[1] ? `"${wbText.split('"')[1]}"` : wbText }} />
                <div style={{ ...serif, fontStyle: 'italic', fontSize: 13, color: '#9C8B7A', lineHeight: 1.5 }}>
                  Write your answer down ~ paper or notes app. We&apos;ll come back to these.
                </div>
              </div>
            )}

            {/* Poll */}
            {pollBlock && (
              <div style={{ background: '#F5F0E8', border: '1px solid rgba(125,107,90,0.4)', borderRadius: 12, padding: '20px 22px' }}>
                <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: '#7D6B5A', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>~ Audience moment</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#2A2520', marginBottom: 8, textTransform: 'uppercase' }}>{pollLines[0]}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, ...mono, fontSize: 13, color: '#2A2520' }}>
                  {pollLines.slice(1).map((l, i) => (
                    <div key={i} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.6)', borderRadius: 7 }}>{l}</div>
                  ))}
                </div>
                <div style={{ marginTop: 10, ...mono, fontSize: 10, color: '#7D6B5A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Drop your answer in the Zoom chat
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#2A2520', color: 'rgba(250,248,245,0.5)', padding: '9px 32px', flexShrink: 0, ...mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Workshop hosted by Abie Maxey + Meri Gee</div>
        <div><a href="https://talentmucho.com" style={{ color: '#7D6B5A', textDecoration: 'none' }}>talentmucho.com</a> ~ abiemaxey.com</div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}
