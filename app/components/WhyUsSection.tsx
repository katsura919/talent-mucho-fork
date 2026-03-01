import Section from "./Section";
import { CheckCircle2, ShieldCheck, Zap, Globe, Users2 } from "lucide-react";

export default function WhyUsSection() {
  const points = [
    {
      title: "One agency instead of multiple freelancers",
      icon: Users2,
      description: "Stop managing a revolving door of contractors. We provide a cohesive team under one roof.",
    },
    {
      title: "Strategy + execution under one roof",
      icon: Zap,
      description: "We don't just follow tasks; we help you plan the roadmap and then we build it for you.",
    },
    {
      title: "Flexible, scalable solutions",
      icon: ShieldCheck,
      description: "Whether you're starting small or scaling fast, our systems and talent adapt to your growth.",
    },
    {
      title: "Global talent, real accountability",
      icon: Globe,
      description: "Elite professionals from across the globe, managed with strict quality and performance standards.",
    },
    {
      title: "Long-term partnership mindset",
      icon: CheckCircle2,
      description: "We're not just a vendor. We win when you win, focusing on sustainable, long-term success.",
    },
  ];

  return (
    <Section id="why-us" className="bg-beige-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-taupe-400 text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
            The Talent Mucho Edge
          </p>
          <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
            Why <span className="text-clay-500 italic">Talent Mucho</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side: Illustration or Value Prop */}
          <div className="bg-clay-500 rounded-[2.5rem] p-10 lg:p-16 text-beige-50 shadow-2xl relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-espresso-900/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/30 backdrop-blur-sm">
                Our Core Philosophy
              </span>
              <h3 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight font-serif">
                You don&apos;t need <span className="italic">more</span> people.
              </h3>
              <p className="text-2xl lg:text-3xl text-beige-200 mb-10 leading-relaxed italic">
                You need the right <span className="text-white font-bold underline decoration-clay-300 underline-offset-8">system</span> + right <span className="text-white font-bold underline decoration-clay-300 underline-offset-8">talent</span>.
              </p>

              <div className="h-px w-full bg-white/20 mb-10" />

              <p className="text-lg text-beige-100/90 leading-relaxed max-w-md">
                We bridge the gap between human expertise and strategic systems to create growth that lasts.
              </p>
            </div>
          </div>

          {/* Right Side: List of Points */}
          <div className="space-y-8">
            {points.map((point, index) => (
              <div
                key={index}
                className={`flex gap-6 group animate-fade-in-up`}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-white border border-beige-200 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-clay-500 group-hover:border-clay-500 transition-all duration-500">
                  <point.icon className="w-7 h-7 text-clay-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="pt-2">
                  <h4 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-clay-500 transition-colors">
                    {point.title}
                  </h4>
                  <p className="text-taupe-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
