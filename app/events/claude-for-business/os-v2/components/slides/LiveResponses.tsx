'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SlideProps } from '../../types';

interface LiveResponsesProps extends SlideProps {
  segmentNum: string;
}

export function LiveResponses({ segmentNum, C, mono, sans, serif, scale = 1 }: LiveResponsesProps) {
  const sz = (px: number) => Math.round(px * scale);

  const [wordFreq, setWordFreq] = useState<Record<string, number>>({});
  const [newWords, setNewWords] = useState<Set<string>>(new Set());
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({});

  const mergeWords = useCallback((text: string, existing: Record<string, number>) => {
    const updated = { ...existing };
    const added: string[] = [];
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9À-ɏ\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);
    for (const w of words) {
      if (!updated[w]) added.push(w);
      updated[w] = (updated[w] || 0) + 1;
    }
    return { updated, added };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const { supabase } = await import('@/lib/supabase-browser');

      const { data: wbRows } = await supabase
        .from('workbook_responses')
        .select('response_text')
        .eq('segment_num', segmentNum);

      if (!cancelled && wbRows) {
        let freq: Record<string, number> = {};
        for (const row of wbRows) {
          const { updated } = mergeWords(row.response_text, freq);
          freq = updated;
        }
        setWordFreq(freq);
      }

      const { data: pollRows } = await supabase
        .from('poll_responses')
        .select('choice_label')
        .eq('segment_num', segmentNum);

      if (!cancelled && pollRows) {
        const votes: Record<string, number> = {};
        for (const row of pollRows) {
          votes[row.choice_label] = (votes[row.choice_label] || 0) + 1;
        }
        setPollVotes(votes);
      }

      const wbChannel = supabase
        .channel(`wb-${segmentNum}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'workbook_responses', filter: `segment_num=eq.${segmentNum}` },
          (payload: { new: { response_text: string } }) => {
            if (cancelled) return;
            setWordFreq(prev => {
              const { updated, added } = mergeWords(payload.new.response_text, prev);
              if (added.length) {
                setNewWords(new Set(added));
                setTimeout(() => setNewWords(new Set()), 2000);
              }
              return updated;
            });
          }
        )
        .subscribe();

      const pollChannel = supabase
        .channel(`poll-${segmentNum}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'poll_responses', filter: `segment_num=eq.${segmentNum}` },
          (payload: { new: { choice_label: string } }) => {
            if (cancelled) return;
            setPollVotes(prev => ({
              ...prev,
              [payload.new.choice_label]: (prev[payload.new.choice_label] || 0) + 1,
            }));
          }
        )
        .subscribe();

      return () => {
        cancelled = true;
        supabase.removeChannel(wbChannel);
        supabase.removeChannel(pollChannel);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => { cancelled = true; cleanup?.(); };
  }, [segmentNum, mergeWords]);

  const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 80);
  const maxFreq = sortedWords[0]?.[1] || 1;

  const sortedPoll = Object.entries(pollVotes).sort((a, b) => b[1] - a[1]);
  const totalVotes = sortedPoll.reduce((s, [, v]) => s + v, 0) || 1;
  const maxVotes = sortedPoll[0]?.[1] || 1;

  const brandColors = [C.primary, C.text, C.muted, C.primaryHover ?? C.primary];
  const hasWords = sortedWords.length > 0;
  const hasPoll = sortedPoll.length > 0;

  if (!hasWords && !hasPoll) return null;

  return (
    <div style={{ maxWidth: 1280, margin: '36px auto 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {hasWords && (
        <div style={{ padding: '28px 30px', borderRadius: 18, background: C.surface, border: `1px solid ${C.border}` }}>
          <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
            Live word cloud
          </div>
          <div style={{ ...serif, fontSize: sz(15), color: C.muted, marginBottom: 18, lineHeight: 1.5 }}>
            Words from your workbook responses ~ updating in real time
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', alignItems: 'baseline', minHeight: sz(60) }}>
            {sortedWords.map(([word, freq], i) => {
              const ratio = freq / maxFreq;
              const size = sz(14 + Math.round(ratio * 28));
              const colorIdx = i % brandColors.length;
              const isNew = newWords.has(word);
              return (
                <span
                  key={word}
                  style={{
                    ...sans,
                    fontSize: size,
                    fontWeight: ratio > 0.6 ? 700 : ratio > 0.3 ? 600 : 400,
                    color: brandColors[colorIdx],
                    opacity: 0.4 + ratio * 0.6,
                    transition: 'all 0.5s ease',
                    animation: isNew ? 'lrFadeIn 0.6s ease' : undefined,
                    lineHeight: 1.3,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {hasPoll && (
        <div style={{ padding: '28px 30px', borderRadius: 18, background: C.surface, border: `1px solid ${C.border}` }}>
          <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
            Live poll results
          </div>
          <div style={{ ...serif, fontSize: sz(15), color: C.muted, marginBottom: 18, lineHeight: 1.5 }}>
            {totalVotes} vote{totalVotes !== 1 ? 's' : ''} so far
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sortedPoll.map(([option, votes]) => {
              const pct = Math.round((votes / totalVotes) * 100);
              const barWidth = Math.max(2, (votes / maxVotes) * 100);
              return (
                <div key={option}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ ...sans, fontSize: sz(14), fontWeight: 600, color: C.text }}>{option}</span>
                    <span style={{ ...mono, fontSize: sz(12), color: C.muted, letterSpacing: '0.06em' }}>{pct}% ({votes})</span>
                  </div>
                  <div style={{ height: sz(22), borderRadius: sz(6), background: `${C.primary}15`, overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      height: '100%',
                      width: `${barWidth}%`,
                      borderRadius: sz(6),
                      background: C.primary,
                      transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes lrFadeIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
