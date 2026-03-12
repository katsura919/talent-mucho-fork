import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Share2 } from "lucide-react";

export const metadata = {
    title: "Marketing & Strategy | Talent Mucho",
    description:
        "Turn your brand into an authority with targeted marketing execution — brand positioning, social media management, and SEO strategies that drive real results.",
};

const marketingTypes = [
    {
        slug: "brand-positioning",
        title: "Brand Positioning",
        subtitle: "Stand out in a crowded market",
        description:
            "We help you define a razor-sharp market position — your unique value, ideal client, messaging framework, and competitive edge — so every piece of content and outreach hits the mark.",
        image: "/service-marketing.png",
        imageAlt: "Brand positioning strategy",
        features: [
            "Brand audit & competitive analysis",
            "Ideal client profile definition",
            "Unique value proposition crafting",
            "Messaging framework & voice guide",
            "Positioning statement development",
            "Brand story & narrative creation",
        ],
        accent: "bg-charcoal-900 text-beige-50",
        tag: "Start Here",
    },
    {
        slug: "social-media",
        title: "Social Media Management",
        subtitle: "Consistent presence, real engagement",
        description:
            "Our team manages your social channels end-to-end — from content creation and scheduling to community engagement and performance reporting — so you grow without the grind.",
        image: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773323912/hero-social-media-management-01-1_hyofs2.png",
        imageAlt: "Social media management dashboard",
        features: [
            "Multi-platform content creation",
            "Posting calendar & scheduling",
            "Community management & replies",
            "Hashtag & reach strategy",
            "Story & reel production",
            "Monthly analytics reports",
        ],
        accent: "bg-clay-500 text-beige-50",
        tag: "Most Popular",
    },
    {
        slug: "seo",
        title: "SEO & Visibility",
        subtitle: "Get found by the right people",
        description:
            "Technical and content SEO that drives qualified organic traffic — from on-page optimisation and keyword strategy to backlink building and local search domination.",
        image: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773323832/SEO-Services_drhhcz.webp",
        imageAlt: "SEO analytics and visibility",
        features: [
            "Keyword research & mapping",
            "On-page SEO optimisation",
            "Technical SEO audits & fixes",
            "Content SEO & blog strategy",
            "Backlink outreach campaigns",
            "Local & Google Business profile",
        ],
        accent: "bg-espresso-800 text-beige-50",
        tag: "Long Game",
    },
];

export default function MarketingPage() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="section-padding bg-beige-50 border-b border-beige-200">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-beige-200 bg-white text-clay-500 text-xs font-semibold uppercase tracking-widest mb-6">
                            <Share2 className="w-3.5 h-3.5" />
                            Marketing & Strategy
                        </span>

                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl leading-tight font-light tracking-tight text-charcoal-900 mb-6"
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                        >
                            Marketing That Drives{" "}
                            <em className="not-italic text-clay-500">Real Growth</em>
                        </h1>

                        <p className="text-lg text-espresso-800 leading-relaxed max-w-2xl">
                            We turn visibility into authority and authority into revenue — through strategic brand positioning, consistent social presence, and SEO that compounds over time.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Marketing Services ── */}
            <section className="section-padding bg-beige-100">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                            What We Execute
                        </p>
                        <h2
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif", fontWeight: 300 }}
                            className="text-4xl md:text-5xl text-charcoal-900"
                        >
                            Three growth levers.{" "}
                            <em className="text-clay-500" style={{ fontStyle: "italic" }}>
                                One focused strategy.
                            </em>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-24">
                        {marketingTypes.map((type, idx) => (
                            <div
                                key={type.slug}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                            >
                                <div className={`relative rounded-2xl overflow-hidden shadow-elegant border border-beige-200 aspect-[4/3] ${idx % 2 === 1 ? "lg:col-start-2" : ""}`}>
                                    <Image src={type.image} alt={type.imageAlt} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
                                    <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${type.accent}`}>
                                        {type.tag}
                                    </span>
                                </div>

                                <div className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                                    <h3
                                        className="text-4xl md:text-5xl text-charcoal-900 mb-2 leading-tight"
                                        style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif", fontWeight: 400 }}
                                    >
                                        {type.title}
                                    </h3>
                                    <p className="text-clay-500 font-semibold text-sm uppercase tracking-widest mb-5">{type.subtitle}</p>
                                    <p className="text-espresso-800 text-lg leading-relaxed mb-8">{type.description}</p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                        {type.features.map((f) => (
                                            <li key={f} className="flex items-start gap-2.5">
                                                <CheckCircle className="w-4 h-4 text-clay-500 mt-0.5 shrink-0" />
                                                <span className="text-sm text-espresso-800">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/booking" className="inline-flex items-center gap-2 btn-primary text-sm">
                                        Start Growing Today
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
