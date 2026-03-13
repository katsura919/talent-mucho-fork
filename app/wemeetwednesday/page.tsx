import BookingEmbed from "@/components/BookingEmbed";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WeMeetWednesday — Exclusive VA + Website Bundle",
  description:
    "Exclusive offer for WeMeetWednesday community members. Get an elite VA plus a custom website — the complete growth stack for women-led businesses.",
};

const bundleIncludes = [
  "Dedicated VA (20 hrs/week) — admin, scheduling, client comms, and more",
  "Custom conversion-focused landing page or portfolio site",
  "Personal branding strategy session",
  "30-day onboarding support included",
  "Direct access to your account manager",
];

const testimonials = [
  {
    quote:
      "I was drowning in admin and had zero online presence. Within a month of working with Talent Mucho, I had a VA handling my inbox and a new site that actually gets enquiries.",
    name: "Sarah M.",
    title: "Coach & Consultant",
  },
  {
    quote:
      "The bundle was exactly what I needed. I stopped doing $20/hr tasks and started focusing on $500/hr work. Worth every penny.",
    name: "Priya K.",
    title: "Founder, Digital Agency",
  },
];

export default function WeMeetWednesdayPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-beige-100 border-b border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-clay-500/30 bg-clay-500/10 text-clay-500 text-xs font-semibold uppercase tracking-widest mb-6">
              WeMeetWednesday Exclusive
            </span>
            <h1 className="mb-6">
              The Complete Growth Stack for{" "}
              <em className="text-clay-500 not-italic">Women-Led Businesses</em>
            </h1>
            <p className="text-lg md:text-xl text-espresso-800 leading-relaxed mb-8">
              Elite VA support + a website that converts — starting at
              $300/month. Built for busy founders who are done doing everything
              themselves.
            </p>
            <Link
              href="#booking"
              className="inline-flex items-center gap-2 btn-primary"
            >
              Claim Your Spot
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bundle Details */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-4xl md:text-5xl text-charcoal-900 mb-8 text-center"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontWeight: 300,
              }}
            >
              What&apos;s included
            </h2>
            <ul className="space-y-4 mb-10">
              {bundleIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-clay-500 shrink-0 mt-0.5" />
                  <span className="text-espresso-800 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-beige-100 border border-beige-200 rounded-2xl p-6 text-center">
              <p className="text-taupe-400 text-sm mb-1">Starting from</p>
              <p className="text-4xl font-bold text-charcoal-900">$300<span className="text-lg font-normal text-taupe-400">/month</span></p>
              <p className="text-sm text-taupe-400 mt-2">
                Custom pricing based on your needs — discussed on the call.{" "}
                <Link href="/offers" className="text-clay-500 hover:underline">
                  See all offers →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-beige-100">
        <div className="section-container">
          <h2
            className="text-4xl text-charcoal-900 mb-10 text-center"
            style={{
              fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
              fontWeight: 300,
            }}
          >
            Founders who made the leap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="bg-beige-50 rounded-2xl p-8 border border-beige-200"
              >
                <p className="text-espresso-800 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <p className="font-semibold text-charcoal-900">{t.name}</p>
                  <p className="text-sm text-taupe-400">{t.title}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking">
        <BookingEmbed />
      </section>
    </main>
  );
}
