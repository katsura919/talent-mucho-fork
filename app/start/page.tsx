'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Lock } from 'lucide-react';

const NUGGETS = [
  {
    num: '01',
    icon: '✉️',
    title: 'The 15-min email trick',
    why: 'Most people write emails from scratch every time. Claude can absorb your voice in minutes and draft at your pace indefinitely.',
    prompt: `Here are 5 emails I've sent recently. Study my writing style carefully — how I open, close, the tone, sentence length, and personality. Then write 10 different email templates I can reuse, each in my exact voice.

[paste your last 5 sent emails here]`,
    result: 'A personal email template library in your voice. Takes 15 minutes to set up, saves hours every week.',
    time: '15 min setup',
  },
  {
    num: '02',
    icon: '🃏',
    title: 'Build your first skill card',
    why: 'A skill card is a saved prompt that turns a recurring task into a one-click operation. Once built, you never start from scratch again.',
    prompt: `I do this task every week: [describe your task in detail ~ what triggers it, what steps you take, what a good output looks like].

Walk me through it step by step as if you're teaching it to an assistant. Then rewrite it as a reusable prompt I can paste at the start of any Claude session to run this task automatically.`,
    result: 'A reusable prompt you paste once. Claude runs the whole task from there.',
    time: '20 min',
  },
  {
    num: '03',
    icon: '🧠',
    title: 'Brain dump → action plan',
    why: 'Your brain is for thinking, not storing. Dumping everything into Claude and letting it find the structure frees you to move.',
    prompt: `Here are my messy notes, ideas, and open loops from this week. Don't clean them up — just read them.

Then give me:
1. The top 3 priorities with a one-line reason for each
2. What I should do first thing Monday and why
3. What I should delegate, automate, or just drop

Notes: [paste your raw notes, voice memo transcript, or scattered ideas]`,
    result: 'A clean Monday morning plan from chaos. Works best when you give Claude the real mess.',
    time: '10 min',
  },
  {
    num: '04',
    icon: '🪪',
    title: 'Write your system prompt',
    why: 'A system prompt tells Claude who you are before you say anything. Every session starts with context — no re-explaining, no generic responses.',
    prompt: `I want a custom system prompt I paste at the start of every Claude session. Use this to write it:

Name: [your name]
What I do: [your job or business in 1–2 sentences]
Who I work with: [clients, team, audience]
How I communicate: [short and direct / warm and casual / formal and precise]
What I use Claude for most: [list 3–5 tasks]
Things Claude should always know about me: [context that changes how you work]

Write me a system prompt that makes Claude feel like a personal assistant who already knows me.`,
    result: 'A permanent system prompt you paste once per session. Claude becomes 10x more useful overnight.',
    time: '15 min',
  },
  {
    num: '05',
    icon: '📅',
    title: 'The Friday review ritual',
    why: 'Most people reflect in their head and forget by Monday. Giving Claude your week lets it spot patterns you miss and build momentum week over week.',
    prompt: `Here's my week. Read it and give me:
1. What patterns do you see — in what I did, what slowed me down, and what I kept avoiding?
2. One thing I should stop doing next week
3. What to do first on Monday morning and why

Wins this week: [list anything that worked, shipped, or moved forward]
Blocks: [what slowed you down or felt hard]
Open loops: [things unfinished or still on your mind]`,
    result: 'A clear Monday plan and one honest insight about how you work. Do this every Friday for 4 weeks.',
    time: '10 min / week',
  },
];

export default function StartPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch('/api/freebie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus('done');
      setUnlocked(true);
    } catch {
      setStatus('error');
    }
  }

  function copyPrompt(num: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(num);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      {/* HERO / GATE */}
      <section className="pt-20 pb-24 md:pt-28 md:pb-32 bg-charcoal-900">
        <div className="section-container mt-20">
          <div className="max-w-2xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 bg-clay-500/20 border border-clay-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-clay-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                Free · Claude for Business
              </span>
            </div>

            <h1
              className="font-light tracking-tight text-beige-50 mb-6"
              style={{
                fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                lineHeight: 1.05,
              }}
            >
              Five things to do with AI
              <br />
              <em className="italic text-clay-500">this week.</em>
            </h1>

            <p className="text-lg md:text-xl text-beige-200 font-light leading-relaxed max-w-xl mx-auto mb-10">
              No setup. No paid tools. Just Claude and 15 minutes ~ with the exact prompts to get started tonight.
            </p>

            {!unlocked ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-beige-50 placeholder:text-beige-300/40 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-clay-500/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                >
                  {status === 'loading' ? 'Sending...' : 'Get access'}
                  {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            ) : (
              <div className="inline-flex items-center gap-2 bg-clay-500/20 border border-clay-500/40 rounded-full px-6 py-3 text-clay-400 text-sm font-medium">
                ✓ Unlocked ~ scroll down for your five prompts
              </div>
            )}

            {status === 'error' && (
              <p className="text-sm text-red-400 mt-3">Something went wrong ~ try again.</p>
            )}

            {!unlocked && (
              <p className="text-xs text-beige-300/40 mt-4 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" />
                One email gets you access. No spam, ever.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* PLAYBOOK */}
      {unlocked && (
        <section className="section-padding bg-beige-50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">

              <div className="text-center mb-14">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">Your AI starter kit</p>
                <h2
                  className="text-4xl md:text-5xl font-light text-charcoal-900 leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
                >
                  Copy the prompt.<br />Run it tonight.
                </h2>
              </div>

              <div className="flex flex-col gap-8">
                {NUGGETS.map((n) => (
                  <div
                    key={n.num}
                    className="bg-white border border-beige-200 rounded-2xl overflow-hidden"
                  >
                    {/* Card header */}
                    <div className="p-7 pb-0 flex gap-5 items-start">
                      <span
                        className="text-5xl font-light leading-none text-beige-300 shrink-0 mt-1"
                        style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
                      >
                        {n.num}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{n.icon}</span>
                          <p className="font-semibold text-charcoal-900 text-base">{n.title}</p>
                        </div>
                        <p className="text-sm text-taupe-400 font-light leading-relaxed">{n.why}</p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-clay-500/60 shrink-0 mt-1">{n.time}</span>
                    </div>

                    {/* Prompt block */}
                    <div className="mx-7 my-5 rounded-xl bg-charcoal-900 relative">
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                        <span className="text-xs font-semibold uppercase tracking-widest text-beige-300/50">Prompt</span>
                        <button
                          onClick={() => copyPrompt(n.num, n.prompt)}
                          className="text-xs font-medium text-clay-400 hover:text-clay-300 transition-colors"
                        >
                          {copied === n.num ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="p-4 text-sm text-beige-200 font-light leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
                        {n.prompt}
                      </pre>
                    </div>

                    {/* Result */}
                    <div className="px-7 pb-6 flex items-start gap-3">
                      <span className="text-clay-500 text-sm mt-0.5 shrink-0">→</span>
                      <p className="text-sm text-taupe-400 font-light leading-relaxed italic">{n.result}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">Want to go deeper?</p>
                <h3
                  className="text-3xl md:text-4xl font-light text-charcoal-900 mb-5"
                  style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
                >
                  Join the Talent Mucho community.
                </h3>
                <p className="text-base text-taupe-400 font-light mb-8 max-w-lg mx-auto">
                  Live workshops, vault access, vibe coding sessions, and a direct line to Abie & Meri ~ not a ticketing system.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://buy.stripe.com/cNifZb3qm7cTdOFf8h73G05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Join monthly · €49/mo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://buy.stripe.com/14A6oBgd8gNtfWN7FP73G06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-charcoal-900/20 text-charcoal-900 hover:bg-charcoal-900/5 font-medium text-base px-9 py-4 rounded-full transition-all duration-200"
                  >
                    Annual · €399/yr
                    <span className="text-xs text-clay-500 font-semibold">Save 32%</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* FOOTER NAV */}
      <div className="py-8 bg-beige-100 border-t border-beige-200 text-center">
        <Link
          href="/"
          className="text-sm text-taupe-400 font-light hover:text-clay-500 transition-colors"
        >
          ← Back to Talent Mucho
        </Link>
      </div>
    </>
  );
}
