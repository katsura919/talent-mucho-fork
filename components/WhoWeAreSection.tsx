import { Users, Rocket, ShieldCheck, ArrowRight } from "lucide-react";

export default function WhoWeAreSection() {
    const highlights = [
        {
            icon: Users,
            title: "Top-Tier Talent",
            description: "Carefully vetted virtual professionals seamlessly integrated into your workflow.",
        },
        {
            icon: Rocket,
            title: "Strategic Execution",
            description: "We don&apos;t just do tasks, we implement strategies that accelerate growth.",
        },
        {
            icon: ShieldCheck,
            title: "Zero Chaos",
            description: "Scale smoothly with proven systems and reliable, accountable management.",
        },
    ];

    return (
        <section id="who-we-are" className="section-padding bg-charcoal-900 relative overflow-hidden">
            {/* Warm glow */}
            <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-clay-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-espresso-700/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left */}
                    <div>
                        <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-5">
                            The Talent Mucho Way
                        </p>
                        <h2
                            className="text-white mb-6 leading-[1.1]"
                            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
                        >
                            More Than Staffing.
                            <br />
                            We&apos;re Your {" "}
                            <em className="text-clay-400" style={{ fontStyle: "italic" }}>Growth Team.</em>
                        </h2>

                        <div className="space-y-5 text-beige-100/80 leading-relaxed mb-10">
                            <p className="text-lg border-l-2 border-clay-500 pl-5 text-white">
                                Most agencies drop a VA in your lap and disappear. We stay and build around what you actually need.
                            </p>
                            <p className="text-beige-100/70">
                                Talent Mucho is for founders who are done doing it all ~ women especially, who are running businesses, figuring out AI, and trying to breathe at the same time.
                            </p>
                            <p className="text-beige-100/70">
                                We bring the talent, build the systems, and{" "}
                                <span className="text-clay-400 font-medium">make sure none of it falls apart the moment you step away.</span>
                            </p>
                            <p className="text-beige-100/50 text-sm italic">
                                Built by two women who&apos;ve done this themselves, for founders who know what it takes.
                            </p>
                        </div>

                        <a href="#services" className="inline-flex items-center gap-2 text-white font-medium transition-colors group btn-primary">
                            Explore Our Services
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right — highlight cards */}
                    <div className="grid grid-cols-1 gap-5">
                        {highlights.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex items-start gap-5 bg-espresso-800/50 border border-beige-200/10 rounded-2xl p-6 hover:border-clay-500/30 transition-all duration-500 group"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-clay-500/20 border border-clay-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-clay-500/30 transition-colors">
                                        <Icon className="w-5 h-5 text-clay-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                                        <p className="text-beige-100/70 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
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
    