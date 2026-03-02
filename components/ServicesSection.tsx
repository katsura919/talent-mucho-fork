"use client";

import { motion } from "motion/react";
import {
    UserCheck,
    Cpu,
    Video,
    Share2,
    LayoutTemplate,
    ArrowRight,
    Search,
    PenTool,
    Globe,
    CheckCircle,
    Zap,
    TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    {
        id: "va",
        title: "Virtual Assistants",
        subtitle: "Done Right",
        description: "Not just task-doers. We place trained, vetted VAs who understand business goals — not just to-do lists.",
        icon: UserCheck,
        className: "lg:col-span-8 lg:row-span-2 bg-white",
        features: [
            "Executive & Admin VAs",
            "Customer Support",
            "Operations & Back-Office",
            "CRM & Automation"
        ],
        details: "Skills-matched hiring — not guesswork."
    },
    {
        id: "branding",
        title: "Personal Branding",
        subtitle: "Authority & Influence",
        description: "Build a compelling personal brand that establishes authority and drives meaningful connections.",
        icon: TrendingUp,
        className: "lg:col-span-4 lg:row-span-2 bg-charcoal-900 text-beige-50 border-charcoal-800",
        features: [
            "Content Strategy",
            "Profile Optimization",
            "Thought Leadership",
            "Audience Growth"
        ]
    },
    {
        id: "marketing",
        title: "Marketing & Strategy",
        subtitle: "Visibility & Growth",
        description: "Turn founders into authorities with targeted execution and strategic brand positioning.",
        icon: Share2,
        className: "lg:col-span-6 bg-white",
        features: ["Brand Positioning", "SMM & Engagement", "SEO & Visibility"]
    },
    {
        id: "web",
        title: "Websites & Pages",
        subtitle: "Digital Storefronts",
        description: "Conversion-focused designs that look good and work hard for your brand's growth.",
        icon: LayoutTemplate,
        className: "lg:col-span-6 bg-white",
        features: ["Custom Web Design", "LP Optimization", "Speed & Mobile First"]
    }
];

export default function ServicesSection() {
    return (
        <section id="services" className="section-padding bg-beige-100 overflow-hidden">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                        What We Offer
                    </p>
                    <h2
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                        className="mb-6 text-5xl md:text-6xl text-charcoal-900 leading-[1.1]"
                    >
                        Scale Your Operations
                        <br />
                        <em className="text-clay-500" style={{ fontStyle: "italic" }}>Without the Overhead</em>
                    </h2>
                    <p className="text-espresso-800 text-lg max-w-2xl mx-auto leading-relaxed">
                        We provide everything you need to scale — from skilled virtual professionals to comprehensive digital strategies that drive real results.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* Pricing Hint / Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-24 text-center"
                >
                    <a
                        href="https://calendly.com/talentmucho/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-charcoal-900 text-beige-50 font-medium rounded-full shadow-2xl hover:bg-clay-600 hover:shadow-clay-500/20 hover:-translate-y-1 transition-all duration-500 group"
                    >
                        Book a Free Strategy Call
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
    const Icon = service.icon;
    const isDark = service.id === "branding";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={cn(
                "group relative rounded-[2.5rem] p-8 md:p-10 border transition-all duration-700 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1",
                isDark ? "hover:border-clay-500/50" : "border-beige-200 hover:border-clay-300",
                service.className
            )}
        >
            {/* Background Effects */}
            {isDark ? (
                <div className="absolute inset-0 bg-gradient-to-br from-clay-500/10 to-transparent opacity-50 pointer-events-none" />
            ) : (
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-clay-100/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-clay-200/30 transition-colors duration-700" />
            )}

            <div className="relative z-10">
                <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
                    isDark ? "bg-clay-500 text-white" : "bg-beige-100 text-clay-500 border border-beige-200"
                )}>
                    <Icon className="w-7 h-7" />
                </div>

                <div className="mb-8">
                    <h3
                        className={cn(
                            "text-3xl md:text-4xl leading-tight mb-3",
                            isDark ? "text-white" : "text-charcoal-900"
                        )}
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                    >
                        {service.title}
                        <br />
                        <em className={cn(
                            "text-xl font-light",
                            isDark ? "text-clay-400" : "text-clay-500"
                        )} style={{ fontStyle: "italic" }}>— {service.subtitle}</em>
                    </h3>
                    <p className={cn(
                        "text-lg leading-relaxed max-w-md",
                        isDark ? "text-beige-100/70" : "text-espresso-800"
                    )}>
                        {service.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {service.features.map((f: string, i: number) => (
                        <span
                            key={i}
                            className={cn(
                                "text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-300",
                                isDark
                                    ? "bg-charcoal-800 text-beige-300 border-charcoal-700 group-hover:bg-clay-500 group-hover:text-white group-hover:border-clay-500"
                                    : "bg-beige-50 text-taupe-500 border-beige-200 group-hover:bg-clay-50 group-hover:text-clay-600 group-hover:border-clay-200"
                            )}
                        >
                            {f}
                        </span>
                    ))}
                </div>
            </div>

            {/* Service-specific visual decorations */}
            {service.id === "va" && (
                <div className="mt-10 pt-8 border-t border-beige-100 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-beige-200 overflow-hidden shadow-sm">
                                    <div className="w-full h-full bg-gradient-to-br from-taupe-200 to-clay-300 opacity-60" />
                                </div>
                            ))}
                        </div>
                        <p className="text-xs font-semibold text-taupe-400 tracking-wide">
                            {service.details}
                        </p>
                    </div>
                </div>
            )}

            {service.id === "branding" && (
                <div className="absolute bottom-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                    <TrendingUp className="w-32 h-32" />
                </div>
            )}
        </motion.div>
    );
}
