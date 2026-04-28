import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Video, Star } from "lucide-react";
import AddToCalendar from "@/components/AddToCalendar";
import VipRegisterForm from "./VipRegisterForm";

export const metadata: Metadata = {
  title: "You're VIP ~ Claude AI for Business | Talent Mucho",
  description: "Welcome to the inner circle. Here's everything you need to know before May 1.",
};

const PAID_SKOOL_URL = "https://www.skool.com/future-proof-with-ai-4339";

type WhatNextItem = {
  step: string;
  title: string;
  body: string;
  cta: { type: "link"; href: string; label: string } | { type: "calendar" } | null;
};

const whatNext: WhatNextItem[] = [
  {
    step: "02",
    title: "Save the date for May 1",
    body: "You're guaranteed a seat on the live Zoom. We'll send the link to your email a few days before ~ check your inbox and mark us as safe.",
    cta: { type: "calendar" },
  },
  {
    step: "03",
    title: "VIP follow-up call ~ date TBC",
    body: "Your 45 min private session with Abie & Meri will be announced in the community. Watch for the invite ~ this is where things get real.",
    cta: null,
  },
];

export default function VipSuccessPage() {
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
              <Star className="w-3.5 h-3.5 text-clay-500 fill-clay-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                VIP Access Confirmed
              </span>
            </div>

            <h1
              className="font-light tracking-tight text-beige-50 mb-6"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 1.05,
              }}
            >
              You&apos;re in the
              <br />
              <em className="italic text-clay-500">inner circle.</em>
            </h1>

            <p className="text-lg md:text-xl text-beige-200 font-light leading-relaxed max-w-xl mx-auto mb-10">
              Payment received. Welcome to VIP ~ here&apos;s everything that happens next.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: <Calendar className="w-3.5 h-3.5" />, label: "Friday, May 1, 2026" },
                { icon: <Video className="w-3.5 h-3.5" />, label: "Live on Zoom" },
                { icon: <Star className="w-3.5 h-3.5" />, label: "VIP seat guaranteed" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 bg-espresso-800 border border-white/10 rounded-full px-4 py-2 text-sm text-beige-200 font-light"
                >
                  <span className="text-clay-500">{icon}</span>
                  {label}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3 text-center">
              What happens next
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-14 text-center"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Three things to do right now.
            </h2>

            <div className="flex flex-col gap-6">
              {/* Step 01 ~ VIP registration */}
              <div className="bg-white border border-clay-500/30 rounded-2xl p-7 flex gap-6 items-start">
                <span
                  className="text-5xl font-light leading-none text-beige-300 shrink-0"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  01
                </span>
                <div className="flex flex-col gap-3 flex-1">
                  <p className="font-semibold text-charcoal-900 text-base">Confirm your details</p>
                  <p className="text-sm text-taupe-400 font-light leading-relaxed">
                    So we can tag you as VIP in our system and upgrade your Skool account within 24 hours.
                  </p>
                  <VipRegisterForm />
                </div>
              </div>

              {whatNext.map(({ step, title, body, cta }) => (
                <div
                  key={step}
                  className="bg-white border border-beige-200 rounded-2xl p-7 flex gap-6 items-start"
                >
                  <span
                    className="text-5xl font-light leading-none text-beige-300 shrink-0"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    {step}
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold text-charcoal-900 text-base">{title}</p>
                    <p className="text-sm text-taupe-400 font-light leading-relaxed">{body}</p>
                    {cta?.type === "link" && (
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
                    {cta?.type === "calendar" && (
                      <AddToCalendar variant="light" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOOTCAMP TEASER */}
      <section className="py-16 bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
              Coming soon ~ VIP only
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-beige-50 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              The 3-day bootcamp is coming.
            </h2>
            <p className="text-beige-200 font-light leading-relaxed mb-8">
              As a VIP you get first access ~ before it opens to anyone else. Details will be announced in the community. Make sure you&apos;re in.
            </p>
            <a
              href={PAID_SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Join the Community
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* BACK TO EVENT */}
      <div className="py-8 bg-beige-100 border-t border-beige-200 text-center">
        <Link
          href="/events/claude-for-business"
          className="text-sm text-taupe-400 font-light hover:text-clay-500 transition-colors"
        >
          ← Back to event page
        </Link>
      </div>
    </>
  );
}
