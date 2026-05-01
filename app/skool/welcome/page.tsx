'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, BookOpen, Zap } from 'lucide-react';

const SKOOL_URL = 'https://www.skool.com/future-proof-with-ai-4339';

type Member = {
  name: string;
  email: string;
  phone: string;
  country: string;
  howFound: string;
};

const nextSteps = [
  {
    step: '01',
    icon: <Users className="w-5 h-5 text-clay-500" />,
    title: 'Access your premium community',
    body: 'Click below to enter the vault. Your membership unlocks everything ~ workshops, replays, vibe coding sessions, and the inner circle.',
    cta: { label: 'Enter the community', href: SKOOL_URL },
  },
  {
    step: '02',
    icon: <BookOpen className="w-5 h-5 text-clay-500" />,
    title: 'Check your email',
    body: 'Your receipt and subscription details are on their way. If you don\'t see it in 5 minutes, check your spam and mark us as safe so you never miss a workshop invite.',
    cta: null,
  },
  {
    step: '03',
    icon: <Zap className="w-5 h-5 text-clay-500" />,
    title: 'Show up to the next live session',
    body: 'We run live AI workshops every month. Your membership gives you full access ~ replays, resources, and the community chat between sessions.',
    cta: null,
  },
];

export default function SkoolWelcomePage() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/skool/session?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => { if (data.email) setMember(data); })
      .catch(() => {});
  }, [sessionId]);

  const firstName = member?.name?.split(' ')[0] ?? '';

  return (
    <>
      {/* HERO */}
      <section className="pt-20 pb-24 md:pt-28 md:pb-32 bg-charcoal-900">
        <div className="section-container mt-20">
          <div className="max-w-3xl mx-auto text-center">

            <div className="flex flex-col items-center gap-4 mb-10">
              <Image
                src="/assets/website-samples/hero_image.png"
                alt="Abie Maxey and Meri Gee"
                width={160}
                height={192}
                className="w-32 object-contain drop-shadow-md"
              />
              <p className="text-beige-300/50 text-base font-light italic">
                Abie Maxey and Meri Gee
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-clay-500/20 border border-clay-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-clay-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                Membership Active
              </span>
            </div>

            <h1
              className="font-light tracking-tight text-beige-50 mb-6"
              style={{
                fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                lineHeight: 1.05,
              }}
            >
              {firstName ? `Welcome, ${firstName}.` : 'You\'re officially'}
              <br />
              <em className="italic text-clay-500">
                {firstName ? 'You\'re one of us.' : 'one of us.'}
              </em>
            </h1>

            <p className="text-lg md:text-xl text-beige-200 font-light leading-relaxed max-w-xl mx-auto mb-10">
              Welcome to the Talent Mucho community ~ where creators and entrepreneurs learn to work smarter with AI. Here&apos;s what to do next.
            </p>

            {member?.email && (
              <p className="text-sm text-beige-300/50 font-light mb-6 -mt-4">
                Confirmation going to <span className="text-beige-200">{member.email}</span>
              </p>
            )}

            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Enter the community
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3 text-center">
              What to do right now
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-14 text-center"
              style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
            >
              Three steps to get started.
            </h2>

            <div className="flex flex-col gap-6">
              {nextSteps.map(({ step, title, body, cta }) => (
                <div
                  key={step}
                  className="bg-white border border-beige-200 rounded-2xl p-7 flex gap-6 items-start"
                  style={step === '01' ? { borderColor: 'rgba(180,120,90,0.3)' } : {}}
                >
                  <span
                    className="text-5xl font-light leading-none text-beige-300 shrink-0"
                    style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
                  >
                    {step}
                  </span>
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="font-semibold text-charcoal-900 text-base">{title}</p>
                    <p className="text-sm text-taupe-400 font-light leading-relaxed">{body}</p>
                    {cta && (
                      <a
                        href={cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-6 py-3 rounded-full transition-colors duration-200 self-start"
                      >
                        {cta.label}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-16 bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
              Your membership includes
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-beige-50 mb-10 leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), ui-serif, Georgia, serif' }}
            >
              Everything you need to build with AI.
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Live workshops', desc: 'Monthly sessions with Abie and Meri' },
                { label: 'Full replays', desc: 'Every session on demand, forever' },
                { label: 'Community chat', desc: 'Ask questions, share wins, get unstuck' },
                { label: 'Early access to bootcamps', desc: 'First in line before doors open to the public' },
                { label: 'Inner circle', desc: 'Direct line to Abie & Meri and the team ~ not a ticketing system' },
                { label: 'Vibe coding sessions', desc: 'Build real things with AI ~ no experience needed' },
                { label: 'Resources & templates', desc: 'Prompts, playbooks, and tools that actually work' },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="bg-espresso-800 border border-white/10 rounded-2xl p-5 text-center"
                >
                  <p className="text-beige-50 font-semibold text-sm mb-1">{label}</p>
                  <p className="text-beige-300/60 text-xs font-light">{desc}</p>
                </div>
              ))}
            </div>
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Go to my community
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

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
