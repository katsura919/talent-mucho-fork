"use client";
import { Zap, Brain, TrendingUp, Clock, Layers, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Zap,
    title: "Built-in Efficiency",
    description: "Stop doing the same things over and over. Our trained VAs automate the repetitive stuff so you get hours back every single week.",
  },
  {
    icon: Brain,
    title: "Smarter Decisions",
    description: "Someone in your corner who actually thinks with you ~ not just someone who waits to be told what to do.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    description: "Targeted execution powered by real strategy and data-informed decisions driving your bottom line.",
  },
  {
    icon: Clock,
    title: "Your Time Back",
    description: "You started this business with a vision. Our team handles the heavy lifting so you can spend your time on the parts only you can do.",
  },
  {
    icon: Layers,
    title: "Scales With You",
    description: "Start where you are. Scale when you&apos;re ready. No contracts locking you in, just a team that grows with you.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="section-padding bg-beige-50 relative">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          {/* Scrollable List */}
          <div className="lg:w-2/3 flex flex-col gap-6 order-last lg:order-first">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              // Make some items dark for visual interest
              const isDark = index === 0 || index === 3;

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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-beige-100 rounded-full blur-3xl pointer-events-none opacity-50" />
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
                        {benefit.title}
                      </h3>
                      <p className={cn(
                        "leading-relaxed text-lg",
                        isDark ? "text-beige-100/70" : "text-espresso-800"
                      )}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit order-first lg:order-last mb-12 lg:mb-0">
            <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              The Difference
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              className="mb-6 text-4xl md:text-5xl lg:text-6xl text-charcoal-900 leading-[1.1]"
            >
              Why founders choose{" "}
              <em className="text-clay-500" style={{ fontStyle: "italic" }}>Talent Mucho</em>
            </h2>
            <p className="text-espresso-800 text-lg leading-relaxed mb-10">
              You didn&apos;t start your business to be buried in it. The right team and the right systems give you something every founder deserves ~ time to actually lead.
            </p>

            <a
              href="https://calendly.com/talentmucho/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-900 text-beige-50 font-medium rounded-full shadow-lg hover:bg-clay-600 hover:shadow-clay-500/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              Explore Our Plans
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
