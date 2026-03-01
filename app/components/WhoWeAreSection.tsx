import { Users, Rocket, ShieldCheck } from "lucide-react";

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
            description: "We don't just do tasks; we implement strategies that accelerate growth.",
        },
        {
            icon: ShieldCheck,
            title: "Zero Chaos",
            description: "Scale your operations smoothly with proven systems and reliable management.",
        },
    ];

    return (
        <section id="who-we-are" className="section-padding bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-beige-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-beige-200/40 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Text Content */}
                    <div className="animate-fade-in-up">
                        <p className="text-taupe-400 text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
                            Who We Are
                        </p>
                        <h2 className="mb-6 text-4xl md:text-5xl lg:text-5xl leading-tight">
                            More Than Staffing. <br className="hidden md:block" />
                            We&apos;re Your <span className="text-clay-500 italic">Growth Team.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-espresso-800 leading-relaxed">
                            <p className="font-semibold text-xl text-charcoal-900 border-l-4 border-clay-500 pl-5 py-1 bg-beige-50/50 rounded-r-lg">
                                Most agencies stop at &quot;here&apos;s your VA.&quot; We don&apos;t.
                            </p>
                            <p>
                                Talent Mucho blends top-tier virtual professionals with strategic
                                digital services to help founders, startups, and growing businesses
                                scale without the chaos.
                            </p>
                            <p>
                                Whether you need hands-on execution, strategic direction, or both,
                                we build teams and <span className="font-medium text-charcoal-900">systems that drive real, sustainable results.</span>
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-beige-200">
                            <a href="#services" className="font-semibold text-clay-500 hover:text-charcoal-900 transition-colors flex items-center gap-2 group">
                                Explore Our Services
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                        {/* Center decorative element for the grid */}
                        <div className="hidden sm:block absolute left-1/2 top-1/2 -ml-12 -mt-12 w-24 h-24 bg-gradient-to-br from-beige-200 to-transparent rounded-full opacity-50 blur-xl pointer-events-none" />

                        {highlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className={`bg-beige-50 border border-beige-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative z-10 opacity-0 animate-fade-in-up ${index === 0 ? "animation-delay-200 sm:col-span-2 sm:w-3/4 mx-auto" :
                                            index === 1 ? "animation-delay-300" :
                                                "animation-delay-400 sm:mt-12"
                                        }`}
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-beige-100 flex items-center justify-center mb-5">
                                        <Icon className="w-6 h-6 text-clay-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-espresso-800 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
