"use client";
import { CheckCircle2, ShieldCheck, Zap, Globe, Users2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const points = [
  {
    title: "One Agency, No Revolving Doors",
    icon: Users2,
    description: "One point of contact. One team that knows your business. No more chasing five different people to get one thing done.",
  },
  {
    title: "Strategy + Execution",
    icon: Zap,
    description: "We don&apos;t just take orders. We help you figure out what needs to happen, then we make it happen. Strategy and execution, together.",
  },
  {
    title: "Flexible & Scalable",
    icon: ShieldCheck,
    description: "Whether you're starting small or scaling fast, our systems and talent adapt to your growth trajectory without friction.",
  },
  {
    title: "Global Talent, Real Accountability",
    icon: Globe,
    description: "Top talent from around the world, held to real standards. Not just available ~ actually good at what they do.",
  },
  {
    title: "Long-Term Partnership",
    icon: CheckCircle2,
    description: "We're not just a vendor ~ we win when you win. Genuinely focused on your long-term growth, not just the contract.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="section-padding bg-beige-100 relative">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
            <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              The Talent Mucho Edge
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              className="mb-6 text-4xl md:text-5xl lg:text-6xl text-charcoal-900 leading-[1.1]"
            >
              Why{" "}
              <em className="text-clay-500" style={{ fontStyle: "italic" }}>Talent Mucho</em>
            </h2>
            <div className="mb-10 text-espresso-800 text-lg leading-relaxed">
              <p className="mb-4">
                You don&apos;t need to hire more people. You need the <strong className="font-semibold text-charcoal-800">right people</strong> doing the <strong className="font-semibold text-charcoal-800">right things</strong> inside a system that actually works.
              </p>
              <p>
                That&apos;s the difference between a business that runs you and one you actually run.
              </p>
            </div>

            <a
              href="https://calendly.com/talentmucho/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-900 text-beige-50 font-medium rounded-full shadow-lg hover:bg-clay-600 hover:shadow-clay-500/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              Book a Free Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Scrollable List */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {points.map((point, index) => {
              const Icon = point.icon;
              // Make some items dark for visual interest
              const isDark = index === 1 || index === 3;

              return (
                <div
                  key={index}
                  className={cn(
                    "group rounded-[2rem] p-8 md:p-10 border transition-all duration-500 relative overflow-hidden",
                    isDark
                      ? "bg-charcoal-900 border-charcoal-800 text-beige-50 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:border-clay-500/50"
                      : "bg-white border-beige-200 text-charcoal-900 hover:border-clay-300 hover:shadow-lg hover:-translate-y-1"
                  )}
                >
                  {isDark && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-clay-500/10 rounded-full blur-3xl pointer-events-none" />
                  )}
                  {!isDark && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-beige-50 rounded-full blur-3xl pointer-events-none opacity-50" />
                  )}

                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110",
                      isDark
                        ? "bg-clay-500 text-white shadow-lg shadow-clay-500/20"
                        : "bg-beige-100 border border-beige-200 text-clay-500 group-hover:bg-clay-50 transition-colors"
                    )}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className={cn(
                        "text-2xl font-semibold mb-3",
                        isDark ? "text-white" : "text-charcoal-900"
                      )}>
                        {point.title}
                      </h3>
                      <p className={cn(
                        "leading-relaxed text-lg",
                        isDark ? "text-beige-100/70" : "text-espresso-800"
                      )}>
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
