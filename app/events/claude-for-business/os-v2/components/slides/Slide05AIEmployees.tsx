'use client';

import { useState, useEffect } from 'react';
import type { SlideProps } from '../../types';

// ── Data ─────────────────────────────────────────────────────────────────────

const AI_CAPABILITIES = [
  { num: '01', title: 'Knowledge', subtitle: 'THE BRAIN', body: 'What it knows about your business.', detail: 'Claude Project loaded with your playbook, ICP, voice, processes, customer data, brand guidelines.' },
  { num: '02', title: 'Skills', subtitle: 'WHAT IT DOES', body: 'The prompts that execute the work.', detail: 'Call analysis, proposal writing, content repurposing, expense categorization.' },
  { num: '03', title: 'Connectors', subtitle: 'WHERE IT REACHES', body: 'Notion, Gmail, Slack, your CRM, Drive.', detail: "The AI doesn't just talk ~ it works inside the tools you already use." },
  { num: '04', title: 'Memory', subtitle: 'WHAT IT LEARNS', body: 'Every interaction trains it.', detail: 'Every correction sharpens it. The longer it works for you, the more valuable it becomes.' },
];

const AI_LEVELS = [
  { q: 'Q1', title: 'The Foundation', question: 'What do you do repetitively?', action: 'Save it as a skill.', detail: null, no: null, yes: null },
  { q: 'Q2', title: 'Context?', question: 'Does this job need living context that changes over time?', detail: 'ICP, brand voice, pricing, objection library, case studies, files, transcripts.', no: { level: 1, name: 'CONTRACTOR', desc: 'Just a skill in chat.' }, yes: { level: 2, name: 'TRAINED EMPLOYEE', desc: '+ Brain. Skill running inside a workspace loaded with your context.' } },
  { q: 'Q3', title: 'Tools?', question: 'Does it need to pull from ~ or push into ~ other tools?', detail: 'Notion, Gmail, Slack, CRM, Drive, calendar.', no: { level: 2, name: 'TRAINED EMPLOYEE', desc: 'Brain is enough.' }, yes: { level: 3, name: 'CONNECTED EMPLOYEE', desc: '+ Connectors. Reads from and writes to the apps you already use.' } },
  { q: 'Q4', title: 'Autonomy?', question: 'Should ~ and could ~ this run without you?', detail: 'Only after extensive testing at Level 3.', no: { level: 3, name: 'CONNECTED EMPLOYEE', desc: 'You stay in the loop.' }, yes: { level: 4, name: 'AUTONOMOUS EMPLOYEE', desc: '+ Schedule. "It just ran."' } },
];

const CLAUDE_BUILDING_BLOCKS = [
  {
    name: 'Claude Skill', short: 'one-task pro',
    desc: "A specific job Claude nails every time. Built once, reused forever.",
    example: "Our Carousel Generator ~ paste a blog, get 7 slides, copy in your voice, takes 30 seconds. We have one for proposals, one for Threads, one for client briefs. Build a few and your weeks change shape.",
    simulation: { prompt: "Turn this blog post into an Instagram carousel.", steps: ['↳ Reading blog (1,200 words)', '↳ Extracting the 3 key insights', '↳ Structuring 7 slides ~ hook · setup · takeaways · CTA', '↳ Writing each slide in your brand voice', '✓ 7-slide carousel ready in 28 seconds'] },
  },
  {
    name: 'Claude Project', short: 'trained employee',
    desc: "A workspace where Claude has actually been onboarded to your business.",
    example: "Drop your docs, your tone, your clients, your offers ~ once. Every chat in there starts with Claude already knowing you. The difference between hiring a temp and hiring an employee.",
    simulation: { prompt: "Draft a follow-up to Sarah from the call yesterday.", steps: ["↳ Pulling Sarah's profile from Project context", '↳ Reading the call notes from yesterday', '↳ Matching your tone (casual, no "kindly")', '↳ Using your standard follow-up structure', '✓ Draft ready ~ no re-explaining who Sarah is'] },
  },
  {
    name: 'Claude Team', short: 'shared employee',
    desc: "Same trained employee. Everyone on your team has access to it.",
    example: "Add a new client to the Project on Monday ~ your VA's Claude knows about them by Tuesday's standup. No more \"have you got the latest brief?\" Same Claude, same context, same updates.",
    simulation: { prompt: "(Meri uploaded the Maria client brief on Monday)", steps: ['↳ Project syncs the brief across the team', "↳ Tuesday: Abie opens her Claude", '↳ Claude already knows Maria, the offer, the timeline', '↳ No Slack ping. No "did you see the doc?"', '✓ Same Claude. Same context. Same employee.'] },
  },
];

const OPS_MANAGER_DAY = [
  { time: '6:45 AM', icon: '☕', title: "You're still asleep", oneLiner: "Sarah's about to clock in. You're snoring.", detail: "Sarah is your AI Ops Manager. She runs on a schedule, lives inside a Claude Project trained on your business, and has access to your tools. While you sleep, she's lining up the day so you can wake up to results, not a to-do list.", skill: 'Schedule trigger', connectors: ['Calendar', 'Drive'], sample: '~ Sarah is reviewing her morning brief ~', saved: 'all of it' },
  { time: '7:00 AM', icon: '📧', title: 'Triages overnight inbox', oneLiner: "Reads 47 emails. Flags 3 for you. Drafts 12 replies in your voice.", detail: "Sarah opens Gmail, reads every overnight email, sorts by urgency, drafts replies in your tone for the easy ones, and flags only the 3 that need a human. The 12 drafts sit waiting for your one-click approval.", skill: 'Inbox Triage', connectors: ['Gmail', 'Drive'], sample: '"Hey Sarah, hope you\'re doing well! Quick one ~ invoice INV-204 hit the 7-day mark today..."', saved: '~3 hours' },
  { time: '8:30 AM', icon: '📊', title: 'Drafts the Monday report', oneLiner: "Pulls last week's metrics. Writes the recap. Spots 2 blockers.", detail: "Sarah pulls the numbers from your sheets, compares against last week, drafts the full Monday recap with bullet highlights, and flags 2 blockers she thinks deserve attention.", skill: 'Weekly Report', connectors: ['Sheets', 'Drive', 'Slack'], sample: "Revenue +12% WoW · Outreach replies down 30% (needs a look) · Sarah's invoice still outstanding", saved: '~1 hour' },
  { time: '9:30 AM', icon: '🎯', title: 'Qualifies 5 new leads', oneLiner: "Scores them. Drafts a first reply. Updates the CRM.", detail: "5 new leads landed overnight. Sarah scans LinkedIn + their website, scores each one, drafts a tailored first reply, and updates the CRM with notes. You only see the qualified ones.", skill: 'Lead Qualification', connectors: ['CRM', 'Gmail', 'Chrome agent'], sample: 'Lead 4/5 (€8K agency, MVP fit, replied to Threads post) ~ ready to reply', saved: '~45 minutes' },
  { time: '11:00 AM', icon: '🤝', title: 'Onboards a new client', oneLiner: "Sends welcome email. Generates SOPs. Creates Day-1 task list.", detail: "New client signed yesterday. Sarah pulls the intake form, writes a personalised welcome email in your voice, generates the project SOP doc, schedules the kickoff, and posts the Day-1 task list to your project channel.", skill: 'Onboarding', connectors: ['Gmail', 'Drive', 'Calendar', 'Slack'], sample: '"Welcome aboard, Maria! Couldn\'t be more excited. Here\'s how Week 1 looks..."', saved: '~2 hours' },
  { time: '2:00 PM', icon: '📝', title: 'Updates your project notes', oneLiner: "Writes up yesterday's call. Drafts decisions. Pings the team.", detail: "Yesterday's client call was 47 minutes. Sarah pulls the transcript, extracts decisions made, writes the action items, updates the project doc, and pings the relevant teammates with their next-step assignments.", skill: 'Meeting Notes', connectors: ['Notion', 'Drive', 'Slack'], sample: '3 decisions logged · 5 action items assigned · Meri tagged on the brief', saved: '~40 minutes' },
  { time: '4:00 PM', icon: '🚨', title: 'Chases overdue invoices', oneLiner: "Finds 4 invoices past due. Drafts reminders in matching tone.", detail: "Sarah scans Stripe, finds invoices past 7 days, looks up each client's relationship history (first time late? pattern?), and drafts reminders in the right tone ~ gentle for first-timers, firmer for repeat offenders.", skill: 'Invoice Chaser', connectors: ['Stripe', 'Gmail', 'CRM'], sample: 'INV-204 (Sarah, gentle) · INV-198 (Marco, firm) · INV-187 (Lisa, final notice)', saved: '~30 minutes' },
  { time: '5:30 PM', icon: '📤', title: 'Posts the EOD summary', oneLiner: "Done for the day. Posts a 5-line wrap-up to Slack.", detail: "Sarah closes out the day with a clean Slack summary: what got done, what got drafted, what needs your one-click sign-off tomorrow, and the 1 thing she couldn't figure out herself.", skill: 'EOD Summary', connectors: ['Slack'], sample: '✓ 12 emails drafted · ✓ Monday report ready · ⏳ 3 awaiting your sign-off · ❓ 1 question for tomorrow', saved: 'mental load' },
];

const OPS_TOTAL_SAVED = '~7+ hours per day';

// ── AIEmployeeLayers ──────────────────────────────────────────────────────────

export function AIEmployeeLayers({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const sz = (px: number) => Math.round(px * scale);
  return (
    <div style={{ maxWidth: 1280, margin: '36px auto 0', display: 'flex', flexDirection: 'column', gap: 36 }}>
      {/* 4 Capabilities */}
      <div>
        <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
          An AI employee, in four layers
        </div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ ...sans, fontSize: sz(28), fontWeight: 800, color: C.text }}>The 4 Capabilities of an </span>
          <span style={{ ...serif, fontSize: sz(28), fontWeight: 400, color: C.text }}>AI Employee.</span>
        </div>
        <div style={{ ...serif, fontSize: sz(15), color: C.muted, marginBottom: 22, lineHeight: 1.5 }}>
          Not a chatbot. A trained team member with four distinct layers ~ and most people only ever build the second.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {AI_CAPABILITIES.map(cap => (
            <div key={cap.num} style={{ padding: '24px 22px', borderRadius: 16, background: C.surface, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ ...serif, fontSize: sz(22), color: C.muted, opacity: 0.5 }}>{cap.num}</div>
              <div>
                <div style={{ ...sans, fontSize: sz(20), fontWeight: 700, color: C.text }}>{cap.title}</div>
                <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.primary, marginTop: 4 }}>{cap.subtitle}</div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ ...sans, fontSize: sz(13), color: C.text, fontWeight: 600, lineHeight: 1.5, marginBottom: 4 }}>{cap.body}</div>
                <div style={{ ...sans, fontSize: sz(12), color: C.muted, lineHeight: 1.5 }}>{cap.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Levels ladder */}
      <div>
        <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.primary, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
          Four questions. Each yes climbs one rung.
        </div>
        <div style={{ marginBottom: 22 }}>
          <span style={{ ...sans, fontSize: sz(28), fontWeight: 800, color: C.text }}>How to pick the right level </span>
          <span style={{ ...serif, fontSize: sz(28), fontWeight: 400, color: C.text }}>for the job.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {AI_LEVELS.map((lvl, i) => (
            <div key={lvl.q} style={{ padding: '22px 28px', borderRadius: 16, background: C.surface, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'flex-start', gap: 24 }}>
              <div style={{ flexShrink: 0, minWidth: sz(110) }}>
                <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, letterSpacing: '0.12em', color: C.primary }}>{lvl.q}</div>
                <div style={{ ...serif, fontSize: sz(22), color: C.text, lineHeight: 1.2, marginTop: 4 }}>{lvl.title}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...sans, fontSize: sz(14), color: C.text, lineHeight: 1.5 }}>
                  {lvl.question} {i === 0 && <strong>Save it as a skill.</strong>}
                </div>
                {lvl.detail && <div style={{ ...sans, fontSize: sz(12), color: C.muted, marginTop: 4 }}>{lvl.detail}</div>}
              </div>
              {(lvl.no || lvl.yes) && (
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, minWidth: sz(300) }}>
                  {lvl.no && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ ...mono, fontSize: sz(9), fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 100, background: `${C.muted}20`, color: C.muted, whiteSpace: 'nowrap', flexShrink: 0 }}>NO · STAY</span>
                      <div>
                        <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, letterSpacing: '0.1em', color: C.text }}>LEVEL {lvl.no.level} · {lvl.no.name}</div>
                        <div style={{ ...sans, fontSize: sz(11), color: C.muted, marginTop: 2 }}>{lvl.no.desc}</div>
                      </div>
                    </div>
                  )}
                  {lvl.yes && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ ...mono, fontSize: sz(9), fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 100, background: `${C.primary}25`, color: C.primary, whiteSpace: 'nowrap', flexShrink: 0 }}>YES · CLIMB</span>
                      <div>
                        <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, letterSpacing: '0.1em', color: C.text }}>LEVEL {lvl.yes.level} · {lvl.yes.name}</div>
                        <div style={{ ...sans, fontSize: sz(11), color: C.muted, marginTop: 2 }}>{lvl.yes.desc}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── OpsManagerDay ─────────────────────────────────────────────────────────────

export function OpsManagerDay({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const [activeIdx, setActiveIdx] = useState(1);
  const [autoplay, setAutoplay] = useState(false);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [blockSteps, setBlockSteps] = useState(0);
  const [expandedExamples, setExpandedExamples] = useState<Set<number>>(new Set());
  const onDark = '#FAF8F5';
  const active = OPS_MANAGER_DAY[activeIdx];
  const sz = (px: number) => Math.round(px * scale);

  useEffect(() => {
    if (activeBlock === null) { setBlockSteps(0); return; }
    const total = CLAUDE_BUILDING_BLOCKS[activeBlock].simulation.steps.length;
    setBlockSteps(0);
    let i = 0;
    const tick = () => { i += 1; setBlockSteps(i); if (i < total) setTimeout(tick, 700); };
    const initial = setTimeout(tick, 350);
    return () => clearTimeout(initial);
  }, [activeBlock]);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setActiveIdx(i => (i + 1) % OPS_MANAGER_DAY.length), 5000);
    return () => clearInterval(t);
  }, [autoplay]);

  return (
    <div style={{ maxWidth: 1280, margin: '48px auto 0' }}>
      {/* Building blocks */}
      <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
        First, the building blocks
      </div>
      <div style={{ ...serif, fontSize: sz(20), color: C.muted, marginBottom: 16, lineHeight: 1.5 }}>
        Three Claude features that turn &ldquo;cool AI tool&rdquo; into &ldquo;an employee that runs without you.&rdquo;
      </div>
      <div style={{ ...mono, fontSize: sz(12), color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 22, opacity: 0.75 }}>
        ↓ click any block to see it run live
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 60 }}>
        {CLAUDE_BUILDING_BLOCKS.map((b, i) => {
          const isActive = activeBlock === i;
          const isExpanded = expandedExamples.has(i);
          return (
            <div key={b.name} onClick={() => setActiveBlock(isActive ? null : i)} style={{ padding: '26px 28px', borderRadius: 16, background: isActive ? C.text : C.surface, color: isActive ? onDark : C.text, border: `2px solid ${isActive ? C.primary : C.border}`, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', transform: isActive ? 'translateY(-2px)' : 'none', boxShadow: isActive ? `0 18px 36px -12px ${C.primary}55` : 'none' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: C.primary }} />
              <div style={{ ...mono, fontSize: sz(11), fontWeight: 800, color: C.primary, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{String(i + 1).padStart(2, '0')} · {b.short}</div>
              <div style={{ ...sans, fontSize: sz(28), fontWeight: 700, color: isActive ? onDark : C.text, letterSpacing: '-0.01em' }}>{b.name}</div>
              <div style={{ ...serif, fontSize: sz(20), lineHeight: 1.5, color: isActive ? onDark : C.text }}>{b.desc}</div>
              <div style={{ paddingTop: 10, borderTop: `1px solid ${isActive ? 'rgba(250,248,245,0.15)' : C.border}` }}>
                <button onClick={(e) => { e.stopPropagation(); setExpandedExamples(prev => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; }); }} style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ display: 'inline-block', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▸</span>
                  How we use it
                </button>
                {isExpanded && <div style={{ ...serif, fontSize: sz(17), lineHeight: 1.6, color: isActive ? 'rgba(250,248,245,0.78)' : C.muted, marginTop: 10, animation: 'fadeInUp 0.25s ease' }}>{b.example}</div>}
              </div>
              {isActive && (
                <div style={{ marginTop: 6, padding: '14px 16px', background: 'rgba(250,248,245,0.06)', borderRadius: 10, border: '1px solid rgba(250,248,245,0.1)' }}>
                  <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: C.primary, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>You ~</div>
                  <div style={{ ...mono, fontSize: sz(13), lineHeight: 1.5, color: onDark, marginBottom: 12 }}>&ldquo;{b.simulation.prompt}&rdquo;</div>
                  <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: C.primary, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Claude ~</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {b.simulation.steps.slice(0, blockSteps).map((step, si) => (
                      <div key={si} style={{ ...mono, fontSize: sz(12), lineHeight: 1.5, color: step.startsWith('✓') ? C.primary : 'rgba(250,248,245,0.85)', fontWeight: step.startsWith('✓') ? 700 : 400, opacity: 0, animation: 'fadeInUp 0.4s ease forwards' }}>{step}</div>
                    ))}
                    {blockSteps < b.simulation.steps.length && <div style={{ ...mono, fontSize: sz(12), color: C.primary, opacity: 0.7 }}><span style={{ display: 'inline-block', animation: 'blink 0.8s step-end infinite' }}>▋</span></div>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } } @keyframes blink { 0%, 100% { opacity: 0.7; } 50% { opacity: 0; } }`}</style>

      {/* Sarah profile */}
      <div style={{ ...mono, fontSize: sz(13), fontWeight: 700, color: C.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'inline-block', width: 22, height: 1, background: C.primary }} />
        A day with a Talent Mucho <em style={{ ...serif, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>AI-Trained</em> Ops Manager
      </div>
      <div style={{ ...serif, fontSize: sz(20), color: C.muted, marginBottom: 32, lineHeight: 1.5 }}>
        Meet <span style={{ color: C.primary, fontWeight: 600 }}>Sarah</span> ~ this is what we place inside our clients&apos; businesses.
        Same Claude underneath, trained on your business (Project), plugged into your tools (Connectors), on a schedule.
        <span style={{ color: C.primary }}> Click any moment to see what she&apos;s doing.</span>
      </div>

      {/* Profile card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 22, alignItems: 'center', padding: '22px 26px', borderRadius: 18, background: C.text, color: onDark, marginBottom: 28, boxShadow: `0 18px 40px -14px ${C.text}40` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: sz(72), height: sz(72), flexShrink: 0, borderRadius: '50%', background: C.primary, color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', ...mono, fontSize: sz(26), fontWeight: 800, boxShadow: `0 0 0 4px ${C.primary}30` }}>tm</div>
          <div>
            <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: C.primary, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>Talent Mucho ~ AI-Trained Ops Manager</div>
            <div style={{ ...sans, fontSize: sz(32), fontWeight: 700, color: onDark, letterSpacing: '-0.01em', lineHeight: 1.1 }}>Sarah <em style={{ ...serif, fontWeight: 400, color: C.primary }}>~ your second pair of hands</em></div>
            <div style={{ ...serif, fontSize: sz(17), color: 'rgba(250,248,245,0.65)', marginTop: 8 }}>Reports to: you · Salary: €0 · Sleeps: never · Asks dumb questions: also never</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: 'rgba(250,248,245,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Saves you ~</div>
          <div style={{ ...sans, fontSize: sz(38), fontWeight: 800, color: C.primary, letterSpacing: '-0.02em', lineHeight: 1 }}>{OPS_TOTAL_SAVED}</div>
          <div style={{ ...mono, fontSize: sz(11), color: 'rgba(250,248,245,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>every weekday</div>
        </div>
      </div>

      {/* Timeline + detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 26, alignItems: 'flex-start' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 23, top: 16, bottom: 16, width: 2, background: `linear-gradient(to bottom, ${C.primary}, ${C.muted}40)`, borderRadius: 2, zIndex: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {OPS_MANAGER_DAY.map((ev, i) => {
              const isAct = activeIdx === i; const isPast = i < activeIdx;
              return (
                <div key={ev.time} onClick={() => { setActiveIdx(i); setAutoplay(false); }} style={{ position: 'relative', display: 'grid', gridTemplateColumns: '50px 1fr', gap: 14, padding: '14px 16px 14px 0', cursor: 'pointer', borderRadius: 12, background: isAct ? `${C.primary}10` : 'transparent', transition: 'background 0.2s' }}>
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', paddingTop: 2 }}>
                    <div style={{ width: sz(40), height: sz(40), borderRadius: '50%', background: isAct ? C.primary : (isPast ? `${C.primary}50` : C.surface), border: `2px solid ${isAct ? C.primary : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: sz(20), transition: 'all 0.2s', boxShadow: isAct ? `0 0 0 4px ${C.primary}25` : 'none' }}>{ev.icon}</div>
                  </div>
                  <div>
                    <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: isAct ? C.primary : C.muted, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>{ev.time}</div>
                    <div style={{ ...sans, fontSize: sz(19), fontWeight: 700, color: C.text, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 4 }}>{ev.title}</div>
                    <div style={{ ...serif, fontSize: sz(15), color: C.muted, lineHeight: 1.45 }}>{ev.oneLiner}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 8 }}>
            <button onClick={() => setAutoplay(a => !a)} style={{ padding: '8px 18px', borderRadius: 100, ...mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', background: autoplay ? C.primary : 'transparent', color: autoplay ? (C.text === '#2A2520' ? onDark : C.bg) : C.primary, border: `1px solid ${C.primary}` }}>
              {autoplay ? '⏸ Pause autoplay' : '▶ Play her day'}
            </button>
          </div>
          <div style={{ marginTop: 26, padding: '16px 18px', borderRadius: 12, background: `${C.primary}15`, border: `1px solid ${C.primary}40`, textAlign: 'center' }}>
            <div style={{ ...mono, fontSize: sz(11), fontWeight: 700, color: C.primary, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>↳ This is the Operate pillar</div>
            <div style={{ ...serif, fontSize: sz(16), color: C.text, lineHeight: 1.5 }}>We build, train, and place these inside our clients&apos; businesses.</div>
          </div>
        </div>

        {/* Active event detail */}
        <div style={{ padding: '28px 30px', borderRadius: 18, background: C.surface, border: `1px solid ${C.border}`, position: 'sticky', top: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
            <div style={{ width: sz(60), height: sz(60), flexShrink: 0, borderRadius: 14, background: `${C.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: sz(30) }}>{active.icon}</div>
            <div>
              <div style={{ ...mono, fontSize: sz(12), fontWeight: 700, color: C.primary, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>{active.time}</div>
              <div style={{ ...sans, fontSize: sz(28), fontWeight: 700, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{active.title}</div>
            </div>
          </div>
          <div style={{ ...serif, fontSize: sz(20), color: C.text, lineHeight: 1.5, marginBottom: 20 }}>{active.oneLiner}</div>
          <div style={{ ...serif, fontSize: sz(18), lineHeight: 1.65, color: C.text, opacity: 0.88, marginBottom: 24 }}>{active.detail}</div>
          <div style={{ padding: '16px 20px', background: C.surface2, borderRadius: 10, borderLeft: `3px solid ${C.primary}`, marginBottom: 24 }}>
            <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>Sample output ~</div>
            <div style={{ ...mono, fontSize: sz(15), lineHeight: 1.55, color: C.text }}>{active.sample}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: '14px 16px', background: `${C.primary}12`, borderRadius: 10, border: `1px solid ${C.primary}25` }}>
              <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: sz(16), height: sz(16), borderRadius: '50%', background: C.primary, color: C.text, fontSize: sz(8), fontWeight: 800 }}>tm</span>
                Talent Mucho Skill
              </div>
              <div style={{ ...sans, fontSize: sz(16), fontWeight: 700, color: C.text, letterSpacing: '-0.01em' }}>{active.skill}</div>
            </div>
            <div style={{ padding: '14px 16px', background: `${C.primary}15`, borderRadius: 10, border: `1px solid ${C.primary}30` }}>
              <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: C.primary, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>Time saved</div>
              <div style={{ ...sans, fontSize: sz(16), fontWeight: 700, color: C.text, letterSpacing: '-0.01em' }}>{active.saved}</div>
            </div>
          </div>
          {active.connectors.length > 0 && (
            <div style={{ marginTop: 12, padding: '14px 16px', background: `${C.muted}10`, borderRadius: 10 }}>
              <div style={{ ...mono, fontSize: sz(10), fontWeight: 700, color: C.muted, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>Connectors plugged in</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {active.connectors.map(con => (
                  <div key={con} style={{ padding: '5px 12px', borderRadius: 100, background: C.surface, border: `1px solid ${C.border}`, ...mono, fontSize: sz(13), fontWeight: 600, color: C.text, letterSpacing: '0.04em' }}>{con}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
