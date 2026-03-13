import Link from "next/link";
import { MapPin, Users, Heart, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Talent Mucho | Founder Story & Remote Staffing Mission",
  description:
    "Meet the team behind Talent Mucho — a boutique remote staffing agency with offices in Madrid, Spain and Cagayan de Oro, Philippines. Learn our story and mission.",
};

const locations = [
  {
    city: "Madrid",
    country: "Spain",
    role: "Headquarters & Client Strategy",
    flag: "🇪🇸",
  },
  {
    city: "Cagayan de Oro City",
    country: "Philippines",
    role: "Talent Hub & Operations",
    flag: "🇵🇭",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-beige-100 border-b border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-taupe-400 text-sm uppercase tracking-[0.2em] mb-6">
              Our Story
            </p>
            <h1 className="mb-6">
              Built by a Founder,{" "}
              <em className="text-clay-500 not-italic">for Founders</em>
            </h1>
            <p className="text-lg md:text-xl text-espresso-800 leading-relaxed">
              Talent Mucho was born from a simple frustration: remote talent
              was abundant, but finding people you could actually trust with
              your business was not. We set out to change that.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo placeholder */}
            <div className="relative aspect-[3/4] max-w-sm rounded-2xl overflow-hidden bg-beige-200 border border-beige-300 flex items-center justify-center">
              <div className="text-center text-taupe-400">
                <Users className="w-16 h-16 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Founder photo coming soon</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                Meet the Founder
              </p>
              <h2
                className="text-4xl md:text-5xl text-charcoal-900 mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                  fontWeight: 300,
                }}
              >
                You&apos;ll work directly with me.
              </h2>

              <div className="space-y-4 text-espresso-800 leading-relaxed">
                <p>
                  Talent Mucho is a boutique agency — intentionally small,
                  intensely focused. When you work with us, you&apos;re not
                  handed off to an account manager or lost in a CRM queue.
                  You work directly with the founder, from your first discovery
                  call to your VA&apos;s first week on the job.
                </p>
                <p>
                  With over a decade of experience building and managing remote
                  teams across Europe, Asia, and the Americas, I&apos;ve placed
                  hundreds of professionals with companies at every stage — from
                  solo founders scaling their first hire to established firms
                  building distributed operations centers.
                </p>
                <p>
                  Our edge is our Cagayan de Oro talent hub in the Philippines —
                  a city with exceptional English proficiency, a university-educated
                  workforce, and a strong culture of professionalism and loyalty.
                  Combined with Madrid-based strategy and client management,
                  we offer something no large staffing firm can: genuine care
                  and accountability on both sides of the match.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-beige-100">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="w-8 h-8 text-clay-500 mx-auto mb-6" />
            <h2
              className="text-4xl md:text-5xl text-charcoal-900 mb-6"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontWeight: 300,
              }}
            >
              Our mission
            </h2>
            <p className="text-lg text-espresso-800 leading-relaxed mb-4">
              To make elite remote talent accessible to founder-led businesses
              — and to give skilled professionals in the Philippines the
              meaningful, well-paid remote careers they deserve.
            </p>
            <p className="text-espresso-800 leading-relaxed">
              When we make a great match, everybody wins: the founder gets
              leverage, the VA gets a career, and the business grows.
              That&apos;s the only outcome we optimise for.
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2
              className="text-4xl text-charcoal-900"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontWeight: 300,
              }}
            >
              Two offices. One standard.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="card text-center"
              >
                <p className="text-4xl mb-4">{loc.flag}</p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-clay-500" />
                  <p className="font-semibold text-charcoal-900">
                    {loc.city}, {loc.country}
                  </p>
                </div>
                <p className="text-sm text-taupe-400">{loc.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-charcoal-900 text-center">
        <div className="section-container">
          <h2
            className="text-beige-50 text-4xl md:text-5xl mb-6"
            style={{
              fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
              fontWeight: 300,
            }}
          >
            Ready to meet your VA?
          </h2>
          <p className="text-beige-200/70 text-lg mb-8 max-w-xl mx-auto">
            Book a free 30-minute call. We&apos;ll listen, ask the right
            questions, and tell you exactly how we can help.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-10 py-5 bg-beige-50 text-charcoal-900 font-semibold text-base rounded-xl shadow-xl hover:bg-beige-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out"
          >
            Book a Free Call
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
