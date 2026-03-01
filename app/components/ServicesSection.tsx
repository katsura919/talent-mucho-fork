import Section from "./Section";
import { CheckCircle, LayoutTemplate, PenTool, Share2, Search, ArrowRight, UserCheck } from "lucide-react";

export default function ServicesSection() {
    const vaRoles = [
        "Executive & Admin VAs",
        "Social Media Managers",
        "Customer Support",
        "CRM & Automation Assistants",
        "Marketing & Sales Support",
        "Operations & Back-Office VAs",
    ];

    const vaDifferences = [
        "Skills-matched hiring",
        "Onboarding support",
        "Performance monitoring",
        "Scalability as you grow",
    ];

    const digitalServices = [
        {
            title: "Website Design & Development",
            subtitle: "Conversion-focused websites that look good and work hard.",
            bullets: [
                "Business & personal brand websites",
                "Landing pages",
                "Optimized for speed, SEO & mobile"
            ],
            icon: LayoutTemplate,
            sampleText: "Sample Websites (e.g. past projects with Jan)",
        },
        {
            title: "Personal Branding",
            subtitle: "Turn founders into authorities.",
            bullets: [
                "Brand positioning",
                "Visual identity",
                "Content strategy",
                "Online presence setup"
            ],
            icon: PenTool,
            sampleText: "Sample Personal Brand (e.g. Abby's Brand)",
        },
        {
            title: "Social Media Management",
            subtitle: "We don't chase trends, we build brands.",
            bullets: [
                "Content planning & posting",
                "Captions & creatives",
                "Engagement & growth strategy"
            ],
            icon: Share2,
            sampleText: "Sample Social Contents (To be provided)",
        },
        {
            title: "SEO & Visibility",
            subtitle: "Because being invisible online is expensive.",
            bullets: [
                "On-page SEO",
                "Content optimization",
                "Local & service-based SEO"
            ],
            icon: Search,
            sampleText: "",
        }
    ];

    return (
        <Section id="services" variant="alt">
            <div className="text-center mb-16">
                <p className="text-taupe-400 text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
                    Our Services
                </p>
                <h2 className="mb-6 text-4xl md:text-5xl lg:text-5xl">End-to-End Solutions</h2>
                <p className="editorial-subheading mx-auto">
                    We provide everything you need to scale. From skilled virtual professionals to comprehensive digital strategies.
                </p>
            </div>

            <div className="space-y-24">
                {/* 1. Virtual Assistants */}
                <div className="animate-fade-in-up">
                    <div className="mb-10 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center p-4 bg-clay-500 rounded-2xl mb-6 shadow-sm">
                            <UserCheck className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
                            1. Virtual Assistants <span className="text-clay-500 italic font-medium">(Done Right)</span>
                        </h3>
                        <p className="text-xl text-espresso-800 max-w-3xl font-medium mx-auto lg:mx-0">
                            Not just task-doers. We place trained, vetted, and managed VAs who understand business goals, not just to-do lists.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-beige-200">
                            <h4 className="text-xl font-bold text-charcoal-900 mb-6 font-serif">
                                Roles we offer:
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {vaRoles.map((role, idx) => (
                                    <span key={idx} className="bg-beige-50 text-espresso-800 px-4 py-2 rounded-full border border-beige-200 text-sm font-medium hover:bg-beige-100 hover:border-clay-300 transition-colors cursor-default">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-clay-500 rounded-3xl p-8 lg:p-10 shadow-lg text-beige-50 border border-clay-600 relative overflow-hidden">
                            {/* Decorative bg inside card */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                            <h4 className="text-xl font-bold text-white mb-6 relative z-10 font-serif">
                                What&apos;s different?
                            </h4>
                            <ul className="space-y-5 relative z-10">
                                {vaDifferences.map((diff, idx) => (
                                    <li key={idx} className="flex items-center gap-4">
                                        <CheckCircle className="w-6 h-6 text-beige-200 flex-shrink-0" />
                                        <span className="text-lg font-medium">{diff}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-beige-300/50"></div>

                {/* 2. Digital Services */}
                <div className="animate-fade-in-up animation-delay-200">
                    <div className="mb-12 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center p-4 bg-charcoal-900 rounded-2xl mb-6 shadow-sm">
                            <LayoutTemplate className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
                            2. Digital Services <span className="text-taupe-400 italic font-medium">(Built for Growth)</span>
                        </h3>
                        <p className="text-xl text-espresso-800 max-w-2xl font-medium mx-auto lg:mx-0">
                            Need results, not freelancers? We&apos;ve got you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {digitalServices.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-8 lg:p-10 border border-beige-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="w-14 h-14 bg-beige-50 rounded-2xl flex items-center justify-center shadow-sm border border-beige-100 group-hover:bg-clay-50 transition-colors">
                                        <service.icon className="w-7 h-7 text-clay-500" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-charcoal-900">{service.title}</h4>
                                </div>

                                <p className="text-espresso-800 italic mb-6 text-lg">&quot;{service.subtitle}&quot;</p>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {service.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-clay-500 mt-2 flex-shrink-0"></div>
                                            <span className="text-charcoal-900 font-medium">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

                                {service.sampleText && (
                                    <div className="mt-auto pt-6 border-t border-beige-100">
                                        <div className="aspect-[16/9] w-full bg-beige-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-beige-300 hover:border-clay-300 text-taupe-400 p-6 text-center cursor-pointer transition-colors group/sample">
                                            <span className="font-bold text-xs uppercase tracking-[0.15em] mb-2 text-charcoal-900/60 group-hover/sample:text-clay-500 transition-colors">
                                                Placeholder Preview
                                            </span>
                                            <span className="text-sm font-medium">{service.sampleText}</span>
                                            <div className="mt-6 w-10 h-10 rounded-full bg-white shadow-sm border border-beige-200 flex items-center justify-center group-hover/sample:scale-110 group-hover/sample:bg-clay-500 group-hover/sample:border-clay-500 transition-all">
                                                <ArrowRight className="w-5 h-5 text-clay-500 group-hover/sample:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
