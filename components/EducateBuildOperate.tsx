const pillars = [
    {
        number: "01",
        title: "Educate",
        description:
            "We teach people and organizations how to actually use AI — workshops, company-wide adoption programs, and hands-on training that turns AI from a buzzword into a competitive advantage.",
    },
    {
        number: "02",
        title: "Build",
        description:
            "We design and build the digital systems, websites, marketing assets, and AI-powered automations your business needs to scale — without the overhead of a full in-house team.",
    },
    {
        number: "03",
        title: "Operate",
        badge: "AI Specialist / Engineers",
        description:
            "Not your ordinary virtual assistant. Our AI Specialists and Engineers run your operations with intelligence and precision — handling the work that used to require an entire department.",
    },
];

export default function EducateBuildOperate() {
    return (
        <section className="section-padding bg-charcoal-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-clay-500/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="section-container relative z-10">
                {/* Eyebrow */}
                <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-16 text-center">
                    Our Vision
                </p>

                {/* Manifesto heading */}
                <div className="text-center mb-6">
                    <h2
                        className="text-white leading-[1.0]"
                        style={{
                            fontFamily: "var(--font-cormorant)",
                            fontWeight: 300,
                            fontSize: "clamp(3.5rem, 8vw, 7rem)",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Educate.{" "}
                        <em className="text-clay-400" style={{ fontStyle: "italic" }}>Build.</em>
                        {" "}Operate.
                    </h2>
                </div>

                <p className="text-beige-100/50 text-center text-lg mb-20 max-w-xl mx-auto leading-relaxed">
                    Three commitments that define everything we do.
                </p>

                {/* Divider */}
                <div className="border-t border-beige-200/10 mb-0" />

                {/* Three pillars — editorial columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-beige-200/10">
                    {pillars.map((pillar, i) => (
                        <div key={i} className="pt-12 pb-4 lg:pb-0 lg:px-12 first:lg:pl-0 last:lg:pr-0">
                            <span
                                className="block text-clay-500/40 text-xs font-bold uppercase tracking-[0.3em] mb-4"
                            >
                                {pillar.number}
                            </span>

                            <h3
                                className="text-white mb-6"
                                style={{
                                    fontFamily: "var(--font-cormorant)",
                                    fontWeight: 300,
                                    fontSize: "clamp(2.8rem, 4vw, 4rem)",
                                    lineHeight: 0.95,
                                }}
                            >
                                {pillar.title}
                            </h3>

                            {pillar.badge && (
                                <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-clay-500 text-white mb-5">
                                    {pillar.badge}
                                </span>
                            )}

                            <p className="text-beige-100/55 text-base leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
