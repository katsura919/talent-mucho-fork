const pillars = [
    {
        number: "01",
        title: "Educate",
        description:
            "You don't need to become a tech person. You just need to know how AI can work for your business. We run workshops, hands-on training, and team adoption programs that make it actually click.",
    },
    {
        number: "02",
        title: "Build",
        description:
            "We build the websites, automations, and digital systems your business runs on. No more duct-taping tools together at midnight. Just clean, functional systems that work while you sleep.",
    },
    {
        number: "03",
        title: "Operate",
        badge: "AI Specialist / Engineers",
        description:
            "Not your average VA. Our AI-trained specialists handle the admin, operations, and execution that used to eat your whole week ~ so you can show up for your business as the CEO, not the assistant.",
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
                    This is how we show up for your business ~ and for you.
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
