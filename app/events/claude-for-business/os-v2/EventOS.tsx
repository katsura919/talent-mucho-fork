'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SEGMENTS, SPEAKERS, COMPARE_PRESETS, type Segment, type ComparePreset } from './config';
import { THEMES, FONTS } from './themes';
import type { ThemeKey, Palette, QAItem, Mode, ViewType, ShowTab, CompareState } from './types';
import { Btn } from './components/Btn';
import { Editable } from './components/Editable';
import { PinGate } from './components/PinGate';
import { ComparePanel } from './components/panels/ComparePanel';
import { ProductsPanel } from './components/panels/ProductsPanel';
import { ShowcasePanel } from './components/panels/ShowcasePanel';
import { QAPanel } from './components/panels/QAPanel';
import { AudienceView } from './components/AudienceView';

// ── Edit helpers ~ deep get/set for path-based field editing ─────────────────
type AnyRecord = Record<string, unknown>;
function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => {
    if (o == null) return undefined;
    if (Array.isArray(o)) return o[Number(k)];
    return (o as AnyRecord)[k];
  }, obj);
}
function setByPath(obj: unknown, path: string, value: unknown): void {
  const keys = path.split('.');
  const last = keys.pop()!;
  const target = keys.reduce<unknown>((o, k) => {
    if (o == null) return undefined;
    if (Array.isArray(o)) return o[Number(k)];
    return (o as AnyRecord)[k];
  }, obj);
  if (target == null) return;
  if (Array.isArray(target)) (target as unknown[])[Number(last)] = value;
  else (target as AnyRecord)[last] = value;
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
  const [showDemoPanel, setShowDemoPanel] = useState(false); // collapsed by default ~ toggle in top bar
  const [compareState, setCompareState] = useState<CompareState>({
    step: 0, running: false, leftText: '', rightText: '', leftDone: false, rightDone: false,
  });
  const [activePreset, setActivePreset] = useState<ComparePreset | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [segments, setSegments] = useState<Segment[]>(SEGMENTS);
  const [editStatus, setEditStatus] = useState('');

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prompterRef = useRef<HTMLDivElement>(null);
  const qaInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  // Clamp segment + beat indices defensively in case state goes out of bounds
  // (e.g. after edits remove beats, after imports, or during transitions)
  const seg = segments[segIdx] ?? segments[0];
  const beat = seg?.beats[beatIdx] ?? seg?.beats[0];

  // ── Edit persistence ─ server (Vercel Blob) is source of truth, localStorage backs it up
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'synced' | 'offline'>('idle');

  useEffect(() => {
    let cancelled = false;
    function applyEdits(edits: Record<string, string>) {
      if (cancelled) return;
      const copy: Segment[] = JSON.parse(JSON.stringify(SEGMENTS));
      Object.entries(edits).forEach(([path, val]) => setByPath(copy, path, val));
      setSegments(copy);
    }
    // 1. Hydrate immediately from localStorage (fast)
    try {
      const local = localStorage.getItem('os-edits');
      if (local) applyEdits(JSON.parse(local));
    } catch { /* ignore */ }
    // 2. Then fetch the canonical version from the server
    fetch('/api/events/claude-for-business/script', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.edits) return;
        applyEdits(data.edits);
        localStorage.setItem('os-edits', JSON.stringify(data.edits));
        setSyncStatus('synced');
      })
      .catch(() => setSyncStatus('offline'));
    return () => { cancelled = true; };
  }, []);

  function persistEditsToServer(edits: Record<string, string>) {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSyncStatus('saving');
    saveTimerRef.current = setTimeout(() => {
      fetch('/api/events/claude-for-business/script', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ edits }),
      })
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(() => setSyncStatus('synced'))
        .catch(() => setSyncStatus('offline'));
    }, 700);
  }

  function flashStatus(msg: string) {
    setEditStatus(msg);
    setTimeout(() => setEditStatus(''), 1800);
  }

  function saveEdit(path: string, value: string) {
    const copy: Segment[] = JSON.parse(JSON.stringify(segments));
    setByPath(copy, path, value);
    setSegments(copy);

    const original = String(getByPath(SEGMENTS, path) ?? '');
    const stored = JSON.parse(localStorage.getItem('os-edits') || '{}') as Record<string, string>;
    if (value !== original) stored[path] = value;
    else delete stored[path];
    localStorage.setItem('os-edits', JSON.stringify(stored));
    persistEditsToServer(stored);
    flashStatus('Saved ✓');
  }

  function resetEdits() {
    if (!confirm('Reset all edits? Original script will be restored.')) return;
    localStorage.removeItem('os-edits');
    setSegments(SEGMENTS);
    persistEditsToServer({});
    flashStatus('Reset ✓');
  }

  function exportConfig() {
    const blob = new Blob([JSON.stringify(segments, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `event-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    flashStatus('Downloaded ✓');
  }

  function importConfig(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(String(ev.target?.result)) as Segment[];
        if (!Array.isArray(parsed)) throw new Error('not an array');
        setSegments(parsed);
        // Save full snapshot as edits
        const edits: Record<string, string> = {};
        parsed.forEach((s, i) => {
          ['title', 'titleItalic', 'subtitle', 'duration', 'audWhatTitle', 'audWhatBody', 'audTakeaway'].forEach(field => {
            const orig = String(getByPath(SEGMENTS, `${i}.${field}`) ?? '');
            const newVal = String(getByPath(parsed, `${i}.${field}`) ?? '');
            if (orig !== newVal) edits[`${i}.${field}`] = newVal;
          });
        });
        localStorage.setItem('os-edits', JSON.stringify(edits));
        persistEditsToServer(edits);
        flashStatus('Imported ✓');
      } catch {
        flashStatus('Invalid file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

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
    const s = segments[idx];
    if (!s) return;
    const newMode = s.panel as Mode;
    setMode(newMode);
    if (newMode === 'compare' && s.panelData) {
      const preset = COMPARE_PRESETS[s.panelData];
      if (preset) { setActivePreset(preset); resetCompare(); }
    }
    const speakers = s.speakers ?? [];
    if (speakers.includes('MERI') && !speakers.includes('ABIE')) setShowTab('meri');
    else setShowTab('abie');
    prompterRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToBeat = useCallback((idx: number) => {
    setBeatIdx(idx);
    const b = segments[segIdx]?.beats[idx];
    if (b && mode === 'showcase') {
      if (b.speaker === 'MERI') setShowTab('meri');
      else if (b.speaker === 'ABIE') setShowTab('abie');
    }
    const el = document.getElementById(`beat-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [segIdx, mode, segments]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      // Don't intercept while editing contentEditable text
      if ((e.target as HTMLElement).isContentEditable) return;
      const s = segments[segIdx];
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (beatIdx < s.beats.length - 1) goToBeat(beatIdx + 1);
        else if (segIdx < segments.length - 1) goToSeg(segIdx + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (beatIdx > 0) goToBeat(beatIdx - 1);
        else if (segIdx > 0) {
          const prevSeg = segIdx - 1;
          setSegIdx(prevSeg);
          const lastBeat = segments[prevSeg].beats.length - 1;
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
    const lines = segments.map(s => {
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
          {segments.map((s, i) => (
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
          <Btn onClick={() => setShowDemoPanel(d => !d)} C={C} style={{ color: showDemoPanel ? C.primary : C.muted }}>
            {showDemoPanel ? '◧ HIDE PANEL' : '◨ SHOW PANEL'}
          </Btn>
          <Btn onClick={() => setEditMode(v => !v)} C={C} primary={editMode} style={!editMode ? { color: C.muted } : undefined}>
            {editMode ? '✓ DONE' : '✎ EDIT'}
          </Btn>
          {editMode && (
            <div title={`Sync: ${syncStatus}`} style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: syncStatus === 'offline' ? '#b03a2e' : syncStatus === 'saving' ? '#d4a92a' : C.primary, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', animation: syncStatus === 'saving' ? 'blink 1s ease-in-out infinite' : undefined }} />
              {syncStatus === 'saving' ? 'SYNC' : syncStatus === 'synced' ? 'CLOUD' : syncStatus === 'offline' ? 'OFFLINE' : 'LOCAL'}
            </div>
          )}

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

      {/* ── EDIT MODE TOOLBAR ── */}
      {editMode && (
        <div style={{
          padding: '10px 16px',
          background: '#fff8d6', borderBottom: '2px solid #d4a92a',
          flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          ...mono,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a5e10' }}>
            ✎ Edit mode
          </span>
          <span style={{ fontSize: 10, color: '#7a5e10', opacity: 0.7 }}>
            ~ Click any text to edit ~ saves automatically
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
            {editStatus && <span style={{ fontSize: 9, color: '#7a5e10', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{editStatus}</span>}
            <button onClick={exportConfig} style={{ padding: '5px 12px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700, cursor: 'pointer', background: '#3a3a3a', color: '#fff', border: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>↓ Export</button>
            <button onClick={() => importInputRef.current?.click()} style={{ padding: '5px 12px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: '#7a5e10', border: '1px solid #7a5e10', letterSpacing: '0.08em', textTransform: 'uppercase' }}>↑ Import</button>
            <input type="file" ref={importInputRef} accept=".json" style={{ display: 'none' }} onChange={importConfig} />
            <button onClick={resetEdits} style={{ padding: '5px 12px', borderRadius: 100, ...mono, fontSize: 9, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: '#b03a2e', border: '1px solid #b03a2e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>↺ Reset</button>
          </span>
        </div>
      )}

      {/* Edit-mode highlighting */}
      {editMode && (
        <style>{`
          .os-editable { outline: none; cursor: text; transition: background 0.15s, box-shadow 0.15s; border-radius: 3px; padding: 0 2px; margin: 0 -2px; box-shadow: 0 1px 0 rgba(212,169,42,0.5); }
          .os-editable:hover { background: rgba(255,243,189,0.5); }
          .os-editable:focus { background: rgba(255,243,189,0.85); box-shadow: 0 2px 0 #d4a92a; }
        `}</style>
      )}

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
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: showDemoPanel ? `1px solid ${C.border}` : 'none', minWidth: 0 }}>
            {/* Seg header */}
            <div style={{ padding: '12px 24px 10px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, background: C.surface, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <div style={{ ...mono, fontSize: 9, color: C.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>
                  SEGMENT {seg.num}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                  <Editable key={`title-${segIdx}`} value={seg.title} editMode={editMode} onSave={v => saveEdit(`${segIdx}.title`, v)} />
                  {(seg.titleItalic || editMode) && <>{' '}<em style={{ ...serif, fontWeight: 400, color: C.primary, textTransform: 'none', letterSpacing: 0 }}>
                    <Editable key={`titleI-${segIdx}`} value={seg.titleItalic} editMode={editMode} onSave={v => saveEdit(`${segIdx}.titleItalic`, v)} />
                  </em></>}
                </div>
                <div style={{ ...serif, fontSize: 12, color: C.muted, marginTop: 3 }}>
                  <Editable key={`sub-${segIdx}`} value={seg.subtitle} editMode={editMode} onSave={v => saveEdit(`${segIdx}.subtitle`, v)} />
                </div>
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
                    {seg.num}.{String(bi + 1).padStart(2, '0')} ~{' '}
                    <Editable key={`bt-${segIdx}-${bi}`} value={b.title} editMode={editMode} onSave={v => saveEdit(`${segIdx}.beats.${bi}.title`, v)} />
                  </div>
                  {b.blocks.map((bl, bli) => {
                    const blPath = `${segIdx}.beats.${bi}.blocks.${bli}`;
                    return (
                    <div key={bli} style={{ marginBottom: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {bl.type === 'stage' && (
                        <div style={{ ...mono, fontSize: 11, color: C.muted, background: C.surface2, border: `1px dashed rgba(156,139,122,0.3)`, borderRadius: 6, padding: '8px 12px', letterSpacing: '0.03em', width: '100%' }}>
                          🎬{' '}
                          <Editable key={`stage-${segIdx}-${bi}-${bli}`} value={bl.text ?? ''} editMode={editMode} onSave={v => saveEdit(`${blPath}.text`, v)} />
                        </div>
                      )}
                      {bl.type === 'poll' && (
                        <div style={{ background: 'rgba(125,107,90,0.12)', border: `1px solid rgba(125,107,90,0.3)`, borderRadius: 8, padding: '10px 14px', width: '100%' }}>
                          <div style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.primary, marginBottom: 6 }}>~ Audience moment</div>
                          <div style={{ ...mono, fontSize: 11, color: C.text }}>
                            <Editable key={`poll-${segIdx}-${bi}-${bli}`} value={(bl.text ?? '').replace(/\n/g, ' · ')} editMode={editMode} onSave={v => saveEdit(`${blPath}.text`, v.replace(/ · /g, '\n'))} />
                          </div>
                        </div>
                      )}
                      {bl.type === 'workbook' && (
                        <div style={{ background: 'rgba(156,139,122,0.12)', border: `1px solid rgba(156,139,122,0.3)`, borderRadius: 8, padding: '10px 14px', width: '100%' }}>
                          <div style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8bab9a', marginBottom: 6 }}>~ Workbook moment</div>
                          <div style={{ ...mono, fontSize: 11, color: C.text }}>
                            <Editable key={`wb-${segIdx}-${bi}-${bli}`} value={bl.text ?? ''} editMode={editMode} onSave={v => saveEdit(`${blPath}.text`, v)} />
                          </div>
                        </div>
                      )}
                      {(bl.type === 'scripted' || bl.type === 'bullets') && (
                        <>
                          <div style={{ width: 56, flexShrink: 0, paddingTop: 1 }}>
                            {(() => {
                              const sp = bl.speaker;
                              if (!sp) return null;
                              const color = spkColor(sp);
                              return (
                                <button
                                  onClick={() => {
                                    const order: readonly string[] = ['ABIE', 'MERI', 'BOTH'];
                                    const cur = order.indexOf(sp);
                                    const next = order[(cur + 1) % order.length] ?? 'ABIE';
                                    saveEdit(`${blPath}.speaker`, next);
                                  }}
                                  title="Click to cycle: ABIE → MERI → BOTH"
                                  style={{
                                    ...mono, fontSize: 9, fontWeight: 500,
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                    color,
                                    background: 'transparent',
                                    border: `1px dashed ${color}50`,
                                    borderRadius: 6,
                                    padding: '3px 6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.background = `${color}15`; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                                >
                                  {SPEAKERS[sp]?.name}
                                </button>
                              );
                            })()}
                          </div>
                          <div style={{ flex: 1 }}>
                            {bl.type === 'scripted' ? (
                              <Editable
                                key={`scr-${segIdx}-${bi}-${bli}`}
                                tagName="div"
                                value={(bl.text ?? '').replace(/<em>/g, `<em style="color:${C.primary}">`)}
                                editMode={editMode}
                                onSave={v => saveEdit(`${blPath}.text`, v.replace(/<em [^>]*>/g, '<em>'))}
                                style={{ ...serif, fontSize, lineHeight: 1.75, fontWeight: 400, color: C.text }}
                              />
                            ) : (
                              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                                {bl.items?.map((item, ii) => (
                                  <li key={ii} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                    <span style={{ ...mono, fontSize: 12, color: C.primary, flexShrink: 0, paddingTop: 3 }}>~</span>
                                    <Editable
                                      key={`b-${segIdx}-${bi}-${bli}-${ii}`}
                                      value={item.replace(/<em>/g, `<em style="color:${C.primary}">`)}
                                      editMode={editMode}
                                      onSave={v => saveEdit(`${blPath}.items.${ii}`, v.replace(/<em [^>]*>/g, '<em>'))}
                                      style={{ ...serif, fontSize: fontSize - 2, lineHeight: 1.6, color: C.text }}
                                    />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );})}
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

          {/* DEMO PANEL ~ collapsed by default · toggle from the top bar (◧/◨ button) */}
          {showDemoPanel && (
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
                      <div style={{ ...serif, fontSize: 14, color: C.muted, textAlign: 'center', lineHeight: 1.6 }}>
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, ...serif, fontSize: 14, color: C.muted }}>
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
          )}
        </div>
      )}

      {/* ── AUDIENCE VIEW ── */}
      {view === 'audience' && (
        <AudienceView
          seg={seg} segIdx={segIdx} beat={beatIdx}
          totalSegs={segments.length}
          wbBlock={wbBlock} pollBlock={pollBlock}
          timerSecs={eventSecs}
          fontSize={fontSize}
          segments={segments}
          C={C} mono={mono} serif={serif} sans={sans}
          spkColor={spkColor}
          theme={theme}
          editMode={editMode}
          onSaveEdit={saveEdit}
        />
      )}
    </div>
  );
}
