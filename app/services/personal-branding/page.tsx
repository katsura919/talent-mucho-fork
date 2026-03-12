import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp } from "lucide-react";

export const metadata = {
    title: "Personal Branding | Talent Mucho",
    description:
        "Build a compelling personal brand that establishes authority and drives meaningful connections. Content strategy, profile optimisation, thought leadership, and audience growth.",
};

const brandingTypes = [
    {
        slug: "content-strategy",
        title: "Content Strategy",
        subtitle: "A voice that commands attention",
        description:
            "We craft a bespoke content roadmap aligned with your expertise and goals — so every post, article, and video builds your authority, not just your follower count.",
        image: "/service-branding.png",
        imageAlt: "Content strategy planning session",
        features: [
            "Niche & audience positioning",
            "Content pillars & themes",
            "Publishing calendar & cadence",
            "Platform-specific strategy",
            "Tone of voice & messaging guide",
            "Competitor gap analysis",
        ],
        accent: "bg-charcoal-900 text-beige-50",
        tag: "Foundation First",
    },
    {
        slug: "profile-optimisation",
        title: "Profile Optimisation",
        subtitle: "First impressions that convert",
        description:
            "Your LinkedIn, website bio, and social profiles are your digital handshake. We optimise every element — headline, summary, visuals — to attract the right opportunities.",
        image: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773323263/social-media-profiles_rayrme.jpg",
        imageAlt: "Professional profile optimisation",
        features: [
            "LinkedIn profile overhaul",
            "Bio & headline copywriting",
            "Profile photo & banner direction",
            "Keyword-optimised summary",
            "Skills & endorsements strategy",
            "Featured section curation",
        ],
        accent: "bg-clay-500 text-beige-50",
        tag: "Quick Wins",
    },
];

export default function PersonalBrandingPage() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="section-padding bg-beige-50 border-b border-beige-200">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-beige-200 bg-white text-clay-500 text-xs font-semibold uppercase tracking-widest mb-6">
                            <TrendingUp className="w-3.5 h-3.5" />
                            Personal Branding
                        </span>

                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl leading-tight font-light tracking-tight text-charcoal-900 mb-6"
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                        >
                            Build an Authority Brand That{" "}
                            <em className="not-italic text-clay-500">Opens Doors</em>
                        </h1>

                        <p className="text-lg text-espresso-800 leading-relaxed max-w-2xl">
                            We help founders, executives, and consultants build compelling personal brands that attract premium clients, speaking opportunities, and meaningful influence — consistently.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Branding Services ── */}
            <section className="section-padding bg-beige-100">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                            What We Deliver
                        </p>
                        <h2
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif", fontWeight: 300 }}
                            className="text-4xl md:text-5xl text-charcoal-900"
                        >
                            Three pillars of influence.{" "}
                            <em className="text-clay-500" style={{ fontStyle: "italic" }}>
                                One coherent brand.
                            </em>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-24">
                        {brandingTypes.map((type, idx) => (
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
                                        Start Building Your Brand
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
