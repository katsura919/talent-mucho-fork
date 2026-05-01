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

export default function EventGuidePage() {
  const [copied, setCopied] = useState<string | null>(null);

  function copyPrompt(num: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(num);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-20 pb-24 md:pt-28 md:pb-32 bg-charcoal-900">
        <div className="section-container mt-20">
          <div className="max-w-2xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 bg-clay-500/20 border border-clay-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-clay-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                Free · Claude for Business · Tonight only
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
              Everything from tonight ~
              <br />
              <em className="italic text-clay-500">copy-paste ready.</em>
            </h1>

            <p className="text-lg md:text-xl text-beige-200 font-light leading-relaxed max-w-xl mx-auto mb-6">
              Every prompt, every framework, every demo from the workshop. Cleaned up and yours to keep.
            </p>

            <p className="text-sm text-beige-300/50 font-light">
              Scroll down ~ six prompts to run tonight.
            </p>

          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">Your starter playbook</p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal-900 leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
              >
                Copy the prompt.<br />Run it tonight.
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {PROMPTS.map((p) => (
                <div
                  key={p.num}
                  className="bg-white border border-beige-200 rounded-2xl overflow-hidden"
                >
                  {/* Card header */}
                  <div className="p-7 pb-0 flex gap-5 items-start">
                    <span
                      className="text-5xl font-light leading-none text-beige-300 shrink-0 mt-1"
                      style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
                    >
                      {p.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{p.icon}</span>
                        <span className="font-semibold text-charcoal-900 text-base">{p.title}</span>
                      </div>
                      <p className="text-sm text-taupe-400 font-light leading-relaxed">{p.why}</p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-clay-500/60 shrink-0 mt-1">{p.time}</span>
                  </div>

                  {/* Prompt block */}
                  <div className="mx-7 my-5 rounded-xl bg-charcoal-900 relative">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                      <span className="text-xs font-semibold uppercase tracking-widest text-beige-300/50">Prompt</span>
                      <button
                        onClick={() => copyPrompt(p.num, p.prompt)}
                        className="text-xs font-medium text-clay-400 hover:text-clay-300 transition-colors"
                      >
                        {copied === p.num ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-4 text-sm text-beige-200 font-light leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
                      {p.prompt}
                    </pre>
                  </div>

                  {/* Result */}
                  <div className="px-7 pb-6 flex items-start gap-3">
                    <span className="text-clay-500 text-sm mt-0.5 shrink-0">→</span>
                    <p className="text-sm text-taupe-400 font-light leading-relaxed italic">{p.result}</p>
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
                  className="inline-flex items-center gap-2 border border-charcoal-900/20 text-charcoal-900 hover:bg-charcoal-900/5 font-medium text-base px-9 py-4 rounded-full transition-all duration-200"
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
