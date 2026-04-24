"use client";
import { ArrowRight } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Discovery Call",
        description: "We have a real conversation ~ your goals, where you're stuck, what would actually help. No scripts, no sales pressure.",
    },
    {
        number: "02",
        title: "Custom Solution",
        description: "We come back with a plan that actually fits your business ~ not a generic package we sell everyone.",
    },
    {
        number: "03",
        title: "Build & Launch",
        description: "Your VA, systems, or digital assets go live ~ fast, clean, and without you having to manage the whole process.",
    },
    {
        number: "04",
        title: "Optimize & Scale",
        description: "As your business grows, we grow with you. We&apos;re not here for a one-time placement ~ we&apos;re in it for the long haul.",
    },
];

export default function ProcessSection() {
    return (
        <section id="process" className="section-padding bg-charcoal-900 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-clay-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-taupe-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="section-container relative z-10 w-full">
                <div className="text-center mb-20 md:mb-24">
                    <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                        How It Works
                    </p>
                    <h2
                        className="text-beige-50 mb-6 leading-[1.1]"
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                    >
                        Simple. Strategic. <em className="text-clay-400" style={{ fontStyle: "italic" }}>Scalable.</em>
                    </h2>
                    <p className="text-beige-200/70 text-lg max-w-2xl mx-auto leading-relaxed">
                        No guesswork. No fluff. Here&apos;s exactly how we get you set up and moving.
                    </p>
                </div>

                {/* Grid for Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

                    {/* Connecting Horizontal Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-clay-500/30 to-transparent z-0" />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-espresso-900/40 backdrop-blur-md border border-beige-200/10 rounded-[2rem] p-8 hover:bg-espresso-800/60 hover:border-clay-500/30 transition-all duration-500 group relative z-10 hover:-translate-y-2 flex flex-col h-full"
                        >
                            {/* Step Number Circle */}
                            <div className="w-16 h-16 shrink-0 rounded-2xl bg-charcoal-900 border border-beige-200/20 flex items-center justify-center mb-8 mx-auto lg:mx-0 group-hover:border-clay-500 group-hover:scale-110 group-hover:bg-clay-500/10 transition-all duration-500 shadow-xl group-hover:shadow-clay-500/20">
                                <span
                                    className="text-white text-2xl relative z-10"
                                    style={{ fontFamily: "var(--font-cormorant)" }}
                                >
                                    {step.number}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="text-center lg:text-left flex-grow">
                                <h3
                                    className="text-beige-50 text-2xl mb-4 group-hover:text-white transition-colors"
                                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-beige-200/60 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <a
                        href="https://calendly.com/talentmucho/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-clay-500 text-beige-50 font-medium rounded-full shadow-lg shadow-clay-500/20 hover:bg-clay-400 hover:shadow-clay-500/40 hover:-translate-y-1 transition-all duration-300 group"
                    >
                        Start with a Free Call
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
