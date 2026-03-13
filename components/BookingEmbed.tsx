"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CheckCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this really free?",
    answer:
      "Yes — completely. The discovery call is a 30-minute conversation to understand your needs and see if we're a good fit. No pitch, no pressure, no commitment required.",
  },
  {
    question: "What if I'm not ready to hire yet?",
    answer:
      "That's totally fine. Many clients use the call to get clarity on what kind of support they actually need. We'll give you honest advice even if that means we're not the right fit right now.",
  },
  {
    question: "How soon can I have a VA?",
    answer:
      "Most clients are matched and onboarded within 5–7 business days. We pre-vet our talent pool so there's no waiting weeks for a shortlist.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-beige-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-beige-50 hover:bg-beige-100 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-medium text-charcoal-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-clay-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 py-4 bg-white text-espresso-800 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function BookingEmbed() {
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIframeKey(Date.now());
  }, []);

  return (
    <>
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-beige-200 text-clay-500 text-xs font-semibold uppercase tracking-widest bg-white">
                Book a Discovery Call
              </span>

              <h1
                className="text-5xl md:text-6xl leading-tight font-light tracking-tight text-charcoal-900 mb-4"
                style={{
                  fontFamily:
                    "var(--font-cormorant), ui-serif, Georgia, serif",
                }}
              >
                Let&apos;s Build Something{" "}
                <em className="not-italic text-clay-500">Remarkable</em>
              </h1>

              <p className="editorial-subheading max-w-xl mx-auto">
                Schedule a free 30-minute consultation to explore how our
                virtual assistants can streamline your operations.
              </p>
            </div>

            {/* Pre-sell: What happens on the call */}
            <div className="bg-beige-100 rounded-2xl p-8 mb-10">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-5">
                Here&apos;s what happens in your free 30-minute call
              </h2>
              <ul className="space-y-3">
                {[
                  "We learn about your business, your bottlenecks, and where you're losing time every week.",
                  "We recommend the right type of VA (or service mix) based on your actual needs — not a generic package.",
                  "You leave with a clear action plan, whether you hire with us or not.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-clay-500 shrink-0 mt-0.5" />
                    <span className="text-espresso-800 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial placeholder */}
            <blockquote className="border-l-4 border-clay-500 pl-6 mb-10 italic text-espresso-800">
              <p className="mb-2">
                &ldquo;The discovery call was the most useful 30 minutes I&apos;d spent in months. They asked the right questions and matched me with a VA who felt like a natural extension of my team.&rdquo;
              </p>
              <footer className="text-sm text-taupe-400 not-italic">
                — Founder, service business (name withheld for privacy)
              </footer>
            </blockquote>

            {/* Booking iframe */}
            <div className="rounded-2xl overflow-hidden">
              <iframe
                key={iframeKey}
                src="https://links.talentmucho.com/widget/booking/c0TCC0Ut58lEQjIbyXcN"
                style={{
                  width: "100%",
                  border: "none",
                  overflow: "hidden",
                  minHeight: "700px",
                  display: "block",
                }}
                scrolling="no"
                id={`c0TCC0Ut58lEQjIbyXcN_${iframeKey}`}
                title="Book an Appointment with Talent Mucho"
              />
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-6 text-center">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <FaqItem key={faq.question} {...faq} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script
        src="https://links.talentmucho.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
