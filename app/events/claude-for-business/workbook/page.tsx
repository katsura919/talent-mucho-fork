'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase-browser';

/* ------------------------------------------------------------------ */
/*  Brand tokens                                                       */
/* ------------------------------------------------------------------ */
const C = {
  bg: '#FAF8F5',
  surface: '#FFFFFF',
  text: '#2A2520',
  primary: '#7D6B5A',
  muted: '#9C8B7A',
  font: 'ui-sans-serif, system-ui, sans-serif',
} as const;

/* ------------------------------------------------------------------ */
/*  Segment / item data                                                */
/* ------------------------------------------------------------------ */
type ItemKind = 'poll' | 'workbook';

interface PollOption {
  value: number;
  label: string;
}

interface SegmentItem {
  kind: ItemKind;
  prompt: string;
  options?: PollOption[];
}

interface Segment {
  num: string;
  title: string;
  items: SegmentItem[];
}

const SEGMENTS: Segment[] = [
  {
    num: '00',
    title: 'Welcome',
    items: [
      {
        kind: 'poll',
        prompt:
          'Drop a 1, 2, 3, or 4 in chat:\n1 = I run my own business\n2 = I work in a company but want my own thing\n3 = I freelance / side hustle\n4 = Just curious about AI',
        options: [
          { value: 1, label: 'I run my own business' },
          { value: 2, label: 'I work in a company but want my own thing' },
          { value: 3, label: 'I freelance / side hustle' },
          { value: 4, label: 'Just curious about AI' },
        ],
      },
    ],
  },
  {
    num: '01',
    title: 'How we got here',
    items: [
      {
        kind: 'workbook',
        prompt: "What's the heaviest task in my work right now?",
      },
    ],
  },
  {
    num: '02',
    title: 'What is Claude',
    items: [
      {
        kind: 'poll',
        prompt: '1 = ChatGPT user, 2 = Claude user, 3 = Both, 4 = Neither yet.',
        options: [
          { value: 1, label: 'ChatGPT user' },
          { value: 2, label: 'Claude user' },
          { value: 3, label: 'Both' },
          { value: 4, label: 'Neither yet' },
        ],
      },
      {
        kind: 'workbook',
        prompt:
          "I'm a [your role], my client/customer [name], here's what just happened: ____, I want Claude to: ____",
      },
    ],
  },
  {
    num: '04',
    title: 'Live demos',
    items: [
      {
        kind: 'poll',
        prompt: 'Which demo would save YOU the most hours? Type 1, 2, or 3.',
        options: [
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
        ],
      },
      {
        kind: 'workbook',
        prompt:
          "What's one folder on your computer that's been a disaster for months?",
      },
    ],
  },
  {
    num: '05',
    title: 'AI employees',
    items: [
      {
        kind: 'workbook',
        prompt: 'The most annoying repetitive thing in my week is: ____.',
      },
    ],
  },
  {
    num: '06',
    title: 'Live build',
    items: [
      {
        kind: 'workbook',
        prompt: "What's YOUR version of this problem? What's the task you'd want Claude to solve first?",
      },
      {
        kind: 'poll',
        prompt:
          'After watching that live build, how confident are you that you could do this yourself?',
        options: [
          { value: 1, label: 'I need more guidance' },
          { value: 2, label: 'I could try it with some help' },
          { value: 3, label: "I'm ready to go" },
          { value: 4, label: "I'm already planning what to build" },
        ],
      },
    ],
  },
];

const TOTAL_ITEMS = SEGMENTS.reduce((n, s) => n + s.items.length, 0);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function itemKey(seg: string, idx: number) {
  return `wb_${seg}_${idx}`;
}

function loadSubmitted(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('wb_submitted') || '{}');
  } catch {
    return {};
  }
}

function saveSubmitted(m: Record<string, boolean>) {
  localStorage.setItem('wb_submitted', JSON.stringify(m));
}

function loadName(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('wb_name') || '';
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function WorkbookPage() {
  const [name, setName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [pollChoices, setPollChoices] = useState<Record<string, number | null>>({});
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  /* hydrate from localStorage */
  useEffect(() => {
    setName(loadName());
    setSubmitted(loadSubmitted());
    setMounted(true);
  }, []);

  const completedCount = Object.values(submitted).filter(Boolean).length;

  /* ---- name gate ---- */
  const saveName = useCallback(() => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setName(trimmed);
    localStorage.setItem('wb_name', trimmed);
  }, [nameInput]);

  /* ---- submit workbook ---- */
  const submitWorkbook = useCallback(
    async (seg: Segment, idx: number, prompt: string) => {
      const key = itemKey(seg.num, idx);
      const text = (responses[key] || '').trim();
      if (!text) return;
      setSending((s) => ({ ...s, [key]: true }));
      try {
        await supabase.from('workbook_responses').insert({
          session_name: name,
          segment_num: seg.num,
          prompt_text: prompt,
          response_text: text,
        });
        setSubmitted((prev) => {
          const next = { ...prev, [key]: true };
          saveSubmitted(next);
          return next;
        });
      } finally {
        setSending((s) => ({ ...s, [key]: false }));
      }
    },
    [name, responses],
  );

  /* ---- submit poll ---- */
  const submitPoll = useCallback(
    async (seg: Segment, idx: number, prompt: string) => {
      const key = itemKey(seg.num, idx);
      const choice = pollChoices[key];
      if (choice == null) return;
      const item = seg.items[idx];
      const label = item.options?.find((o) => o.value === choice)?.label || '';
      setSending((s) => ({ ...s, [key]: true }));
      try {
        await supabase.from('poll_responses').insert({
          session_name: name,
          segment_num: seg.num,
          poll_text: prompt,
          choice,
          choice_label: label,
        });
        setSubmitted((prev) => {
          const next = { ...prev, [key]: true };
          saveSubmitted(next);
          return next;
        });
      } finally {
        setSending((s) => ({ ...s, [key]: false }));
      }
    },
    [name, pollChoices],
  );

  /* ---- don't render until client-side hydration ---- */
  if (!mounted) return null;

  /* ================================================================ */
  /*  Name gate                                                        */
  /* ================================================================ */
  if (!name) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: C.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: C.font,
          padding: 24,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 400,
            background: C.surface,
            borderRadius: 16,
            padding: 32,
            boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: C.text,
              margin: '0 0 6px',
            }}
          >
            Claude for Business
          </h1>
          <p
            style={{
              fontSize: 14,
              color: C.muted,
              margin: '0 0 28px',
            }}
          >
            Live Workbook
          </p>

          <label
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: C.text,
              marginBottom: 8,
              textAlign: 'left',
            }}
          >
            What should we call you?
          </label>
          <input
            type="text"
            placeholder="Your first name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveName()}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: 16,
              border: `1.5px solid ${C.muted}40`,
              borderRadius: 10,
              outline: 'none',
              fontFamily: C.font,
              color: C.text,
              background: C.bg,
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={saveName}
            disabled={!nameInput.trim()}
            style={{
              marginTop: 16,
              width: '100%',
              padding: '13px 0',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: C.font,
              color: '#fff',
              background: nameInput.trim() ? C.primary : `${C.muted}80`,
              border: 'none',
              borderRadius: 10,
              cursor: nameInput.trim() ? 'pointer' : 'default',
              transition: 'background 0.2s',
            }}
          >
            Let&apos;s go
          </button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Main workbook                                                    */
  /* ================================================================ */
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: C.bg,
        fontFamily: C.font,
        color: C.text,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
          padding: '0 16px 64px',
        }}
      >
        {/* ---------- header ---------- */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: C.bg,
            paddingTop: 20,
            paddingBottom: 12,
          }}
        >
          <h1
            style={{
              fontSize: 18,
              fontWeight: 700,
              margin: '0 0 4px',
            }}
          >
            Claude for Business ~ Live Workbook
          </h1>
          <p
            style={{
              fontSize: 13,
              color: C.muted,
              margin: '0 0 12px',
            }}
          >
            Hey {name} ~ {completedCount}/{TOTAL_ITEMS} completed
          </p>

          {/* progress bar */}
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: `${C.muted}25`,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(completedCount / TOTAL_ITEMS) * 100}%`,
                background: C.primary,
                borderRadius: 2,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </header>

        {/* ---------- segments ---------- */}
        {SEGMENTS.map((seg) => (
          <section key={seg.num} style={{ marginTop: 24 }}>
            {/* segment label */}
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: C.muted,
                margin: '0 0 8px',
              }}
            >
              {seg.num} ~ {seg.title}
            </p>

            {seg.items.map((item, idx) => {
              const key = itemKey(seg.num, idx);
              const done = !!submitted[key];
              const busy = !!sending[key];

              return (
                <div
                  key={key}
                  style={{
                    background: C.surface,
                    borderRadius: 14,
                    padding: 20,
                    marginBottom: 12,
                    boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
                    transition: 'opacity 0.3s',
                    opacity: done ? 0.65 : 1,
                  }}
                >
                  {/* prompt text */}
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: 1.5,
                      margin: '0 0 14px',
                      whiteSpace: 'pre-line',
                      color: C.text,
                    }}
                  >
                    {item.kind === 'poll' ? 'POLL' : 'WORKBOOK'}
                    {' ~ '}
                    {item.prompt}
                  </p>

                  {done ? (
                    /* submitted state */
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: C.primary,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle cx="10" cy="10" r="10" fill={C.primary} />
                        <path
                          d="M6 10.5L8.5 13L14 7.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Submitted
                    </div>
                  ) : item.kind === 'poll' ? (
                    /* poll options */
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        {item.options?.map((opt) => {
                          const selected = pollChoices[key] === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() =>
                                setPollChoices((prev) => ({
                                  ...prev,
                                  [key]: opt.value,
                                }))
                              }
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '11px 14px',
                                fontSize: 14,
                                fontFamily: C.font,
                                color: selected ? '#fff' : C.text,
                                background: selected ? C.primary : C.bg,
                                border: `1.5px solid ${selected ? C.primary : `${C.muted}30`}`,
                                borderRadius: 10,
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s',
                                fontWeight: selected ? 600 : 400,
                              }}
                            >
                              <span
                                style={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 12,
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  background: selected
                                    ? 'rgba(255,255,255,0.25)'
                                    : `${C.muted}20`,
                                  color: selected ? '#fff' : C.muted,
                                }}
                              >
                                {opt.value}
                              </span>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => submitPoll(seg, idx, item.prompt)}
                        disabled={pollChoices[key] == null || busy}
                        style={{
                          marginTop: 14,
                          width: '100%',
                          padding: '12px 0',
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: C.font,
                          color: '#fff',
                          background:
                            pollChoices[key] != null
                              ? C.primary
                              : `${C.muted}60`,
                          border: 'none',
                          borderRadius: 10,
                          cursor:
                            pollChoices[key] != null ? 'pointer' : 'default',
                          transition: 'background 0.2s',
                        }}
                      >
                        {busy ? 'Sending...' : 'Submit'}
                      </button>
                    </div>
                  ) : (
                    /* workbook text area */
                    <div>
                      <textarea
                        rows={3}
                        placeholder="Type your answer..."
                        value={responses[key] || ''}
                        onChange={(e) =>
                          setResponses((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: 15,
                          fontFamily: C.font,
                          color: C.text,
                          background: C.bg,
                          border: `1.5px solid ${C.muted}30`,
                          borderRadius: 10,
                          outline: 'none',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                          lineHeight: 1.5,
                        }}
                      />
                      <button
                        onClick={() => submitWorkbook(seg, idx, item.prompt)}
                        disabled={!(responses[key] || '').trim() || busy}
                        style={{
                          marginTop: 10,
                          width: '100%',
                          padding: '12px 0',
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: C.font,
                          color: '#fff',
                          background: (responses[key] || '').trim()
                            ? C.primary
                            : `${C.muted}60`,
                          border: 'none',
                          borderRadius: 10,
                          cursor: (responses[key] || '').trim()
                            ? 'pointer'
                            : 'default',
                          transition: 'background 0.2s',
                        }}
                      >
                        {busy ? 'Sending...' : 'Submit'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
}
