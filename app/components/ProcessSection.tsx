import Section from "./Section";

export default function ProcessSection() {
    const steps = [
        {
            number: "01",
            title: "Discovery Call",
            description: "We learn your goals, gaps, and growth stage.",
        },
        {
            number: "02",
            title: "Custom Solution",
            description: "We recommend the right mix of talent + services.",
        },
        {
            number: "03",
            title: "Build & Launch",
            description: "Your VA, systems, or digital assets go live, fast.",
        },
        {
            number: "04",
            title: "Optimize & Scale",
            description: "We refine, improve, and expand as your business grows.",
        },
    ];

    return (
        <Section id="process">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-taupe-400 text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
                        How It Works
                    </p>
                    <h2 className="mb-6 text-4xl md:text-5xl">Simple. Strategic. Scalable.</h2>
                    <p className="editorial-subheading max-w-2xl mx-auto">
                        Building great teams takes care and intention. Here's how we walk
                        that path together.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute left-8 top-8 bottom-10 w-px bg-beige-300" />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-8 group">
                                {/* Step number */}
                                <div className="flex-shrink-0 relative">
                                    <div className="w-16 h-16 bg-beige-100 border-2 border-beige-300 rounded-full flex items-center justify-center group-hover:border-clay-500 group-hover:bg-clay-500 transition-all duration-300">
                                        <span className="font-serif text-xl text-clay-500 group-hover:text-beige-50 transition-colors duration-300">
                                            {step.number}
                                        </span>
                                    </div>
                                </div>

                                {/* Step content */}
                                <div className="pt-2">
                                    <h3 className="text-2xl mb-3">{step.title}</h3>
                                    <p className="text-taupe-400 leading-relaxed max-w-xl">
                                        {step.description}
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
