'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PROMPTS = [
  {
    num: '01',
    icon: '🪪',
    title: 'Write your business system prompt',
    why: 'This is the first thing you build. Paste it at the start of every Claude session and Claude already knows who you are, what you do, and how you communicate ~ before you say anything.',
    prompt: `You are my personal AI assistant. Here's everything you need to know about me before we start:

Name: [your name]
What I do: [your business or job in 1~2 sentences]
Who I work with: [your clients, team, or audience]
How I communicate: [short and direct / warm and casual / formal and precise]
What I use Claude for most: [list 3~5 tasks]
Things you should always know: [context that changes how you'd respond ~ timezone, pricing, tools, goals]

From now on, every response should reflect this context. Don't ask me to re-explain who I am. Treat me like a business partner who already knows the background.`,
    result: 'Paste this once per session. Every response from Claude becomes 10× more relevant overnight.',
    time: '15 min to set up',
  },
  {
    num: '02',
    icon: '✉️',
    title: 'Get Claude to write in your voice',
    why: 'Most people write emails from scratch every time. This prompt teaches Claude your voice in minutes ~ then you never start from scratch again.',
    prompt: `Here are 3~5 emails I've actually sent. Read them carefully.

Study: how I open, how I close, sentence length, tone, what I never say, what I always say.

[paste your last 3~5 sent emails here]

Now write me 8 email templates I can reuse. Keep my exact voice ~ not a polished version of it. Include:
- A follow-up after a call
- A proposal send
- A gentle invoice reminder that doesn't sound corporate
- A check-in with a client I haven't spoken to in a while
- A "no" that keeps the relationship intact`,
    result: 'A personal email library in your voice. 15 minutes now saves hours every week.',
    time: '15 min setup',
  },
  {
    num: '03',
    icon: '🤖',
    title: 'Name and build your first AI employee',
    why: "An AI employee isn't a chatbot. It's a named Claude setup with a specific job, personality, and instructions. This is how you stop doing the same tasks yourself every week.",
    prompt: `I want to create a named AI employee for my business. Here's their job:

Role: [e.g. "Social Media Manager" / "Client Onboarding Assistant" / "Email Drafting VA"]
Name: [give them a name ~ makes it real]
Their job in one sentence: [what they do every week]
What they should always know about my business: [tone, audience, offers, do-nots]
What a perfect output looks like: [describe a 10/10 response from this role]

Now write me:
1. A system prompt I paste when I open a new Claude session for this employee
2. Their first task as a test ~ use a real example from my week`,
    result: 'A working AI employee you can run in Claude Projects. Repeatable, trainable, yours.',
    time: '20 min',
  },
  {
    num: '04',
    icon: '🧠',
    title: 'Brain dump → Monday action plan',
    why: 'Your brain is for thinking, not storing. Drop everything in ~ the messy stuff, the avoidances, the half-ideas ~ and let Claude find the structure.',
    prompt: `Here are my messy notes, open loops, and scattered thoughts from this week. Don't clean them up ~ just read them.

[paste your raw notes, voice memo transcript, or whatever's in your head]

Give me:
1. The 3 actual priorities ~ with a one-line reason why each one matters
2. What I should do first on Monday morning and why
3. What I should stop doing, delegate, or just drop entirely
4. One thing I'm clearly avoiding ~ and why it's probably costing me more than I think`,
    result: 'A clean Monday plan from chaos. Works best when you give Claude the real mess, not a tidy version.',
    time: '10 min',
  },
  {
    num: '05',
    icon: '♻️',
    title: 'Turn one piece of content into five',
    why: "You already made the hard thing ~ the idea. This prompt turns any one piece of content into five formats so you're not starting from scratch every time you post.",
    prompt: `Here is a piece of content I already created:

[paste your blog post / newsletter / voice note transcript / LinkedIn post]

Turn it into:
1. A LinkedIn post (punchy opening, 3~4 short paragraphs, no hashtag overload)
2. A carousel outline (title + 5~7 slides, each with one clear point)
3. A short-form video hook + script (under 60 seconds, starts with the most interesting sentence)
4. A DM I can send to one specific person this content would help
5. A follow-up email for my list (subject line + body, sounds like me ~ not a newsletter)

Keep my voice throughout. Don't make it sound "marketingy."`,
    result: 'Five assets from one idea. Batch this every Monday ~ a week of content in under 30 minutes.',
    time: '10 min/week',
  },
  {
    num: '06',
    icon: '📅',
    title: 'Build your daily AI routine',
    why: "The people getting 9+ hours back a week aren't using Claude differently ~ they just use it consistently. This prompt builds the routine.",
    prompt: `I want to build a daily AI routine for my business. Here's how my week actually looks:

What I do every morning: [list your real morning tasks]
What eats most of my time during the day: [honest answer]
What I always push to the end of the day (and often skip): [be honest]
Tools I use: [list your main tools ~ email, Slack, Notion, etc.]

Design me a daily AI routine with:
1. A 5-min morning briefing prompt I paste every day to orient myself
2. The 3 tasks I should always route through Claude first before doing them manually
3. A 10-min end-of-day prompt to close loops and set up tomorrow
4. One weekly ritual (Friday review or Monday planning) that compounds over time`,
    result: 'A real routine, not a fantasy one. Run it for two weeks and you\'ll never go back.',
    time: '20 min to build',
  },
];

const DASHBOARD_PROMPTS = [
  {
    num: 'D1',
    icon: '🏠',
    title: 'Build your business command centre',
    why: "This is your reusable business brief. Paste it whenever you start a new Claude session and Claude already knows who you are, what you're building, and what matters this week ~ before you say anything.",
    prompt: `Here's everything about my business right now. Read it carefully.

Name: [your name]
What I do: [your business in 1~2 sentences]
Who I work with: [your clients or audience ~ be specific]
My top offer: [what you sell or deliver]
My 3 priorities this week: [what actually matters, not the ideal list]
My biggest bottleneck right now: [the thing slowing everything down]
How I communicate: [short and direct / warm and casual / formal]

Now give me:
1. A one-paragraph "about me" brief I can paste at the top of any Claude session
2. A one-sentence answer to "what do you do?" I can use in any conversation
3. The 3 Claude tasks I should run every week based on what I just told you
4. One thing I should stop doing manually that Claude can handle today`,
    result: 'Your business brief, ready to paste anywhere. Run this once and update it every Monday.',
    time: '10 min',
  },
  {
    num: 'D2',
    icon: '📋',
    title: 'Weekly priority stack',
    why: "Your brain is not a task manager. Drop everything in ~ the messy to-do list, the voice memo, the sticky notes ~ and let Claude sort what actually matters from what's just noise.",
    prompt: `Here's everything on my plate right now. Don't organise it ~ just read it.

[paste your to-do list, brain dump, notes, voice memo transcript ~ whatever's in your head]

Now give me:
1. Top 3 priorities ~ the ones that move the needle this week. One line each on why.
2. Quick wins ~ tasks under 15 minutes I can knock off today
3. Park it ~ things I should stop doing, delegate, or drop entirely
4. The one thing I'm clearly avoiding ~ and what it's actually costing me`,
    result: 'A clean week from chaos. Works best when you give Claude the real mess, not a tidy version.',
    time: '5 min/week',
  },
  {
    num: 'D3',
    icon: '👥',
    title: 'Active client status board',
    why: "If you work with multiple clients, this turns a scattered mental model into a clean dashboard. Paste it every Monday and you always know where each relationship stands.",
    prompt: `Here are my active clients or projects right now. For each one I'll give you: name, what we're working on, and where things stand.

[paste each client / project with a sentence or two ~ rough is fine]

Turn this into a clean status board with:
- Client / Project name
- Current status (on track / needs attention / stalled)
- Last touchpoint
- Next action I need to take
- Urgency (this week / this month / no rush)

Flag anything that looks like it's slipping.`,
    result: "A client dashboard in 3 minutes. Better than any CRM you've been meaning to set up.",
    time: '5 min/week',
  },
  {
    num: 'D4',
    icon: '📣',
    title: 'Content week view',
    why: "Content takes forever because you start from scratch every time. This prompt turns raw ideas into a ready-to-execute week ~ platforms, hooks, formats, all sorted.",
    prompt: `Here are my content ideas for this week. They're rough ~ don't clean them up.

[paste 3~5 ideas, topics, thoughts, or things you want to talk about]

Build me a 7-day content plan:
- Day and platform (LinkedIn / Instagram / email / etc.)
- Content format (post / carousel / short video / story)
- The hook ~ the first sentence or visual that stops the scroll
- One-line description of what the piece actually says
- The CTA ~ what do I want people to do or feel after?

Keep it lean. One piece per day max. I want to execute this, not admire it.`,
    result: 'A full content week from 5 rough ideas. Run this every Sunday ~ batch the writing in one session.',
    time: '10 min/week',
  },
];

export default function EventGuidePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activePrompt, setActivePrompt] = useState<string>('01');
  const [activeDashPrompt, setActiveDashPrompt] = useState<string>('D1');

  function copyPrompt(num: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(num);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-beige-50 overflow-hidden">
        {/* Subtle warm glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(196,154,108,0.14) 0%, transparent 70%)' }} />
        <div className="section-container relative">
          <div className="max-w-2xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 border border-clay-500/30 bg-clay-500/8 rounded-full px-4 py-1.5 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-clay-500" />
              <span className="text-xs font-medium tracking-[0.2em] text-clay-500 uppercase">Claude for Business · May 1, 2026</span>
            </div>

            <h1
              className="font-light text-charcoal-900 mb-7"
              style={{
                fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
              }}
            >
              You were in the room.
              <br />
              <em className="italic text-clay-500">Here&apos;s what you take home.</em>
            </h1>

            <p className="text-base text-taupe-400 font-light leading-relaxed max-w-lg mx-auto mb-12">
              Every prompt from tonight ~ cleaned up, copy-paste ready, and structured so you can actually use them tomorrow morning.
            </p>

            {/* Stats strip */}
            <div className="inline-flex items-center gap-0 border border-charcoal-900/10 rounded-2xl overflow-hidden bg-white/60">
              {[
                { num: '9', label: 'Segments' },
                { num: '10', label: 'Prompts' },
                { num: '1', label: 'Live build' },
              ].map((s, i) => (
                <div key={s.label} className={`px-7 py-4 text-center ${i < 2 ? 'border-r border-charcoal-900/10' : ''}`}>
                  <div className="text-2xl font-semibold text-charcoal-900" style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}>{s.num}</div>
                  <div className="text-xs text-taupe-400 uppercase tracking-widest font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* WHAT WE COVERED TONIGHT */}
      <div className="bg-charcoal-900 border-y border-white/8">
        <div className="section-container">
          <div className="max-w-3xl mx-auto py-8">

            {/* Free resource card */}
            <div className="flex items-center gap-4 bg-clay-500/10 border border-clay-500/25 rounded-2xl px-5 py-4 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/stickers/ok.png" alt="" className="w-10 h-10 object-contain shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-500 mb-0.5">Free resource</p>
                <p className="text-sm font-semibold text-beige-50">Claude AI for Business Owners</p>
                <p className="text-xs text-beige-300/50 font-light">The Talent Mucho resource file ~ yours to keep</p>
              </div>
              <a
                href="/claude-ai-for-business-resource.pdf"
                download="Claude_AI_for_Business_Owners.pdf"
                className="flex items-center gap-1.5 bg-clay-500 hover:bg-clay-600 text-beige-50 font-semibold text-xs px-4 py-2 rounded-full transition-all duration-200 shrink-0"
              >
                Download ↓
              </a>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-beige-300/30">What we covered tonight</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { num: '01', title: 'The AI landscape', note: 'ChatGPT vs Claude ~ who does what' },
                { num: '02', title: 'The four Claudes', note: 'Chat · Cowork · Code · Chrome' },
                { num: '03', title: 'Live demos', note: 'Real tools built on screen' },
                { num: '04', title: 'AI employees', note: 'How to multiply your VA output' },
              ].map((item) => (
                <div key={item.num} className="rounded-xl border border-white/8 bg-white/3 p-4">
                  <div className="text-xs font-mono text-clay-500/70 tracking-widest mb-2">{item.num}</div>
                  <div className="text-sm font-semibold text-beige-100 mb-1 leading-snug">{item.title}</div>
                  <div className="text-xs text-beige-300/40 font-light leading-relaxed">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NEXT 24 HOURS */}
      <section className="py-16 md:py-20 bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500">Your next 24 hours</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  step: '01',
                  action: 'Download the resource',
                  desc: 'Get the Talent Mucho Claude AI resource file. Read it before you sleep.',
                  cta: 'Download PDF',
                  href: '/claude-ai-for-business-resource.pdf',
                  download: 'Claude_AI_for_Business_Owners.pdf',
                  external: false,
                },
                {
                  step: '02',
                  action: 'Build your dashboard',
                  desc: 'Go to abiemaxey.com/web-works. Pick a prompt. Run it in Claude. Takes 10 minutes.',
                  cta: 'Open web-works',
                  href: 'https://abiemaxey.com/web-works',
                  download: undefined,
                  external: true,
                },
                {
                  step: '03',
                  action: 'Run one prompt tonight',
                  desc: 'Scroll down. Pick the prompt most relevant to your week. Run it before you close this tab.',
                  cta: 'Jump to prompts',
                  href: '#prompt-D1',
                  download: undefined,
                  external: false,
                },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-white/8 bg-white/3 p-6 flex flex-col gap-4">
                  <div className="text-xs font-mono text-clay-500/60 tracking-[0.2em]">STEP {item.step}</div>
                  <div>
                    <div className="text-base font-semibold text-beige-50 mb-2 leading-snug">{item.action}</div>
                    <div className="text-sm text-beige-300/50 font-light leading-relaxed">{item.desc}</div>
                  </div>
                  <div className="mt-auto">
                    {item.download ? (
                      <a href={item.href} download={item.download} className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-200">
                        {item.cta} ↓
                      </a>
                    ) : (
                      <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-beige-100 font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-200">
                        {item.cta} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PROMPTS */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">

            <div className="mb-14">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">From tonight&apos;s live build</p>
                <h2
                  className="text-4xl md:text-5xl font-light text-beige-50 leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
                >
                  Build your personal<br /><em className="italic text-clay-500">dashboard.</em>
                </h2>
              </div>

              {/* Step 01 */}
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs font-800 text-clay-500 bg-clay-500/15 px-3 py-1 rounded-full tracking-widest font-bold">STEP 01</span>
                  <span className="text-base font-semibold text-beige-50">Select your theme</span>
                </div>
                <p className="text-sm text-beige-300/60 font-light leading-relaxed mb-6">
                  Get your branded prompts at abiemaxey.com/web-works. We turn this landing page into your personalised dashboard ~ styled to your business, ready to run.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* QR */}
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-3 w-full sm:w-auto">
                    <div className="bg-[#FAF8F5] p-2 rounded-lg border border-clay-500/40 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent('https://abiemaxey.com/web-works')}&margin=0&color=2A2520&bgcolor=FAF8F5`}
                        width={56} height={56} alt="abiemaxey.com/web-works" className="block"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay-500">Scan to open</p>
                      <a href="https://abiemaxey.com/web-works" target="_blank" rel="noopener noreferrer" className="text-sm text-beige-200 hover:text-clay-300 transition-colors">
                        abiemaxey.com/web-works
                      </a>
                      <button
                        onClick={() => copyPrompt('webworks', 'https://abiemaxey.com/web-works')}
                        className="text-xs font-semibold text-clay-400 hover:text-clay-300 transition-colors text-left"
                      >
                        {copied === 'webworks' ? '✓ Copied' : 'Copy link'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs font-800 text-clay-500 bg-clay-500/15 px-3 py-1 rounded-full tracking-widest font-bold">STEP 02</span>
                  <span className="text-base font-semibold text-beige-50">Select a purpose</span>
                </div>
                <p className="text-sm text-beige-300/60 font-light leading-relaxed mb-6">
                  Pick what you want to build first. Each prompt below turns Claude into a specific tool for your week.
                </p>
                {/* Selector pills */}
                <div className="flex flex-wrap gap-2">
                  {DASHBOARD_PROMPTS.map((p) => (
                    <button
                      key={p.num}
                      onClick={() => setActiveDashPrompt(p.num)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150 ${
                        activeDashPrompt === p.num
                          ? 'bg-clay-500 border-clay-500 text-beige-50'
                          : 'border-white/15 text-beige-300/70 hover:border-clay-500/40 hover:text-beige-100 bg-white/5'
                      }`}
                    >
                      <span className="text-base leading-none">{p.icon}</span>
                      <span>{p.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active dashboard prompt card */}
            {DASHBOARD_PROMPTS.filter((p) => p.num === activeDashPrompt).map((p) => (
              <div
                key={p.num}
                id={`prompt-${p.num}`}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden scroll-mt-24"
              >
                <div className="p-5 sm:p-7 pb-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{p.icon}</span>
                      <span className="font-semibold text-beige-50 text-base">{p.title}</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-clay-500/60 shrink-0">{p.time}</span>
                  </div>
                  <p className="text-sm text-beige-300/60 font-light leading-relaxed">{p.why}</p>
                </div>

                <div className="mx-4 sm:mx-7 my-5 rounded-xl bg-black/30 relative border border-white/10">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                    <span className="text-xs font-semibold uppercase tracking-widest text-beige-300/40">Prompt</span>
                    <button
                      onClick={() => copyPrompt(p.num, p.prompt)}
                      className="text-xs font-medium text-clay-400 hover:text-clay-300 transition-colors"
                    >
                      {copied === p.num ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm text-beige-200 font-light leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
                    {p.prompt}
                  </pre>
                </div>

                <div className="px-5 sm:px-7 pb-6 flex items-start gap-3">
                  <span className="text-clay-500 text-sm mt-0.5 shrink-0">→</span>
                  <p className="text-sm text-beige-300/60 font-light leading-relaxed italic">{p.result}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">More prompts to try</p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal-900 leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
              >
                Pick one.<br />Run it tonight.
              </h2>
            </div>

            {/* Selector pills */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {PROMPTS.map((p) => (
                <button
                  key={p.num}
                  onClick={() => setActivePrompt(p.num)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150 ${
                    activePrompt === p.num
                      ? 'bg-clay-500 border-clay-500 text-beige-50'
                      : 'border-charcoal-900/15 text-taupe-400 hover:border-clay-500/40 hover:text-charcoal-900 bg-white/60'
                  }`}
                >
                  <span className="text-base leading-none">{p.icon}</span>
                  <span>{p.title}</span>
                </button>
              ))}
            </div>

            {/* Active prompt card */}
            {PROMPTS.filter((p) => p.num === activePrompt).map((p) => (
              <div
                key={p.num}
                className="bg-white border border-beige-200 rounded-2xl overflow-hidden"
              >
                {/* Card header */}
                <div className="p-5 sm:p-7 pb-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{p.icon}</span>
                      <span className="font-semibold text-charcoal-900 text-base">{p.title}</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-clay-500/60 shrink-0">{p.time}</span>
                  </div>
                  <p className="text-sm text-taupe-400 font-light leading-relaxed">{p.why}</p>
                </div>

                {/* Prompt block */}
                <div className="mx-4 sm:mx-7 my-5 rounded-xl bg-charcoal-900 relative">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                    <span className="text-xs font-semibold uppercase tracking-widest text-beige-300/50">Prompt</span>
                    <button
                      onClick={() => copyPrompt(p.num, p.prompt)}
                      className="text-xs font-medium text-clay-400 hover:text-clay-300 transition-colors"
                    >
                      {copied === p.num ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm text-beige-200 font-light leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
                    {p.prompt}
                  </pre>
                </div>

                {/* Result */}
                <div className="px-5 sm:px-7 pb-6 flex items-start gap-3">
                  <span className="text-clay-500 text-sm mt-0.5 shrink-0">→</span>
                  <p className="text-sm text-taupe-400 font-light leading-relaxed italic">{p.result}</p>
                </div>
              </div>
            ))}

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">Want to go deeper?</p>
              <h3
                className="text-3xl md:text-4xl font-light text-charcoal-900 mb-5"
                style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
              >
                Build all of this with us.
              </h3>
              <p className="text-base text-taupe-400 font-light mb-8 max-w-lg mx-auto">
                The AI Business Bootcamp takes you from these prompts to a fully running AI system inside your business ~ in four weeks. Cohort 1 closes tonight.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://buy.stripe.com/00wbIV3qm1SzcKBd0973G07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Join the Bootcamp · €247
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://buy.stripe.com/cNifZb3qm7cTdOFf8h73G05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-charcoal-900/25 text-charcoal-900 hover:bg-charcoal-900/8 font-medium text-base px-9 py-4 rounded-full transition-all duration-200"
                >
                  Join the community · €49/mo
                </a>
              </div>
              <p className="text-xs text-beige-300/40 mt-5 font-light">
                Bootcamp Cohort 1 closes tonight at midnight. €247 now ~ €397 next cohort.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ADVANCED ~ MORE FROM ABIEMAXEY */}
      <section className="py-16 md:py-20 bg-charcoal-900 border-t border-white/8">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500">More advanced</span>
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-beige-300/30 font-light whitespace-nowrap">from abiemaxey.com freebies</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* QR block */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-center text-center gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">Scan to browse all playbooks</p>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-clay-500/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://abiemaxey.com/playbooks')}&margin=0&color=2A2520&bgcolor=FAF8F5`}
                    width={120} height={120} alt="abiemaxey.com/playbooks"
                    className="block"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <a
                    href="https://abiemaxey.com/playbooks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-beige-100 hover:text-clay-300 transition-colors"
                  >
                    abiemaxey.com/playbooks
                  </a>
                  <button
                    onClick={() => copyPrompt('playbooks', 'https://abiemaxey.com/playbooks')}
                    className="text-xs font-semibold text-clay-400 hover:text-clay-300 transition-colors"
                  >
                    {copied === 'playbooks' ? '✓ Copied' : 'Copy link'}
                  </button>
                </div>
              </div>

              {/* Playbook cards */}
              <div className="flex flex-col gap-3">
                {[
                  {
                    num: '01',
                    title: 'Master Claude',
                    desc: 'Go from prompts to systems. The complete guide to using Claude like a power user.',
                    href: 'https://abiemaxey.com/playbooks/master-claude',
                    slug: 'master-claude',
                  },
                  {
                    num: '02',
                    title: 'Claude as EA',
                    desc: 'Set Claude up as your executive assistant ~ email, calendar, research, and ops.',
                    href: 'https://abiemaxey.com/playbooks/claude-ea',
                    slug: 'claude-ea',
                  },
                  {
                    num: '03',
                    title: 'Zero to Production',
                    desc: 'Build and ship a real project with Claude Code, even if you\'ve never coded before.',
                    href: 'https://abiemaxey.com/playbooks/zero-to-production',
                    slug: 'zero-to-production',
                  },
                ].map((pb) => (
                  <a
                    key={pb.num}
                    href={pb.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-clay-500/30 px-5 py-4 transition-all duration-150 group"
                  >
                    <span className="text-xs font-mono text-clay-500/60 tracking-widest shrink-0 w-5">{pb.num}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-beige-100 group-hover:text-beige-50 transition-colors mb-0.5">{pb.title}</div>
                      <div className="text-xs text-beige-300/40 font-light leading-relaxed">{pb.desc}</div>
                    </div>
                    <span className="text-clay-500/50 group-hover:text-clay-400 transition-colors shrink-0">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE GOT HERE */}
      <section className="py-16 md:py-24 bg-beige-50 border-t border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">The people behind tonight</p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal-900 leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
              >
                How we got here.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Abie */}
              <div className="rounded-2xl border border-beige-200 bg-white overflow-hidden flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-beige-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.talentmucho.com/assets/abiemaxey.jpg"
                    alt="Abie Maxey"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div>
                    <div className="font-semibold text-charcoal-900 text-lg leading-snug">Abie Maxey</div>
                    <div className="text-xs text-taupe-400 font-light mt-0.5">The Tech Chameleon · Engineer · Builder</div>
                  </div>
                  <p className="text-sm text-taupe-400 font-light leading-relaxed">
                    Decade in tech ~ analyst, architect, engineer, manager. Davao to Madrid. Found her love in AI and finally found her base in Spain. Her build era.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <a href="https://instagram.com/abiemaxey" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-clay-500 hover:text-clay-600 transition-colors">@abiemaxey</a>
                    <span className="text-beige-300 text-xs">·</span>
                    <a href="https://abiemaxey.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-charcoal-900/40 hover:text-clay-500 transition-colors">abiemaxey.com</a>
                  </div>
                </div>
              </div>

              {/* Meri */}
              <div className="rounded-2xl border border-beige-200 bg-white overflow-hidden flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-beige-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.talentmucho.com/assets/merigee.jpg"
                    alt="Meri Gee"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div>
                    <div className="font-semibold text-charcoal-900 text-lg leading-snug">Meri Gee</div>
                    <div className="text-xs text-taupe-400 font-light mt-0.5">The Marketer who burned out · Operator</div>
                  </div>
                  <p className="text-sm text-taupe-400 font-light leading-relaxed">
                    Marketing, no tech background. Built an agency from scratch. Burned out managing people. Claude changed everything ~ less staff, more output, better results. Streaming from the Balkans.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <a href="https://instagram.com/udreamtravels" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-clay-500 hover:text-clay-600 transition-colors">@udreamtravels</a>
                    <span className="text-beige-300 text-xs">·</span>
                    <a href="https://udreamtravels.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-charcoal-900/40 hover:text-clay-500 transition-colors">udreamtravels.com</a>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-taupe-400/50 font-light text-center mt-10">
              See you in the next one.
            </p>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="py-8 bg-beige-100 border-t border-beige-200 text-center">
        <Link
          href="/events/claude-for-business"
          className="text-sm text-taupe-400 font-light hover:text-clay-500 transition-colors"
        >
          ← Back to the event
        </Link>
      </div>
    </>
  );
}
