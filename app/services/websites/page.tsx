import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, LayoutTemplate } from "lucide-react";

export const metadata = {
    title: "Websites & Pages | Talent Mucho",
    description:
        "Conversion-focused websites built for your brand — landing pages, personal portfolios, and custom web systems designed to grow your business.",
};

const websiteTypes = [
    {
        slug: "landing-page",
        title: "Landing Pages",
        subtitle: "Convert visitors into clients",
        description:
            "High-performance, persuasive landing pages engineered around a single goal — generating leads, sales, or sign-ups. Every element is crafted to guide visitors toward action.",
        image: "/website-landing-page.png",
        imageAlt: "Landing page design example",
        features: [
            "Conversion-optimised layout",
            "Mobile-first responsive design",
            "A/B testing ready structure",
            "Fast load times & SEO setup",
            "CTA-focused copywriting support",
            "Analytics & tracking integration",
        ],
        accent: "bg-charcoal-900 text-beige-50",
        tag: "Most Popular",
    },
    {
        slug: "portfolio",
        title: "Personal Portfolio",
        subtitle: "Your digital first impression",
        description:
            "Elegant, memorable portfolio sites that position you as an authority in your field. Perfect for executives, consultants, coaches, and creative professionals.",
        image: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773324100/Screenshot_2026-03-12_220127_gklqjk.png",
        imageAlt: "Personal portfolio website example",
        features: [
            "Personal brand alignment",
            "Case studies & project showcases",
            "Testimonials & social proof",
            "Blog / thought-leadership ready",
            "Contact & booking integration",
            "LinkedIn & social profile sync",
        ],
        accent: "bg-clay-500 text-beige-50",
        tag: "Executive Favourite",
    },
    {
        slug: "custom-system",
        title: "Custom Web Systems",
        subtitle: "Tools built for your workflow",
        description:
            "Beyond brochure sites — fully functional web apps, client portals, internal dashboards, and automated systems tailored to your exact operations.",
        image: "/website-custom-system.png",
        imageAlt: "Custom web system dashboard example",
        features: [
            "Client portals & dashboards",
            "CRM & automation integrations",
            "Form & data collection systems",
            "Membership & gated content",
            "API & third-party connections",
            "Ongoing support & maintenance",
        ],
        accent: "bg-espresso-800 text-beige-50",
        tag: "For Growing Teams",
    },
];

export default function WebsitesPage() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="section-padding bg-beige-50 border-b border-beige-200">
                <div className="section-container">
                    <div className="max-w-3xl">


                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl leading-tight font-light tracking-tight text-charcoal-900 mb-6"
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                        >
                            Digital Storefronts That{" "}
                            <em className="not-italic text-clay-500">Work Hard</em> for Your Brand
                        </h1>

                        <p className="text-lg text-espresso-800 leading-relaxed max-w-2xl">
                            We build conversion-focused websites tailored to your business goals — from
                            one-page campaigns to full custom web systems. Every pixel has a purpose.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Website Types ── */}
            <section className="section-padding bg-beige-100">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                            What We Build
                        </p>
                        <h2
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif", fontWeight: 300 }}
                            className="text-4xl md:text-5xl text-charcoal-900"
                        >
                            Three types of websites.{" "}
                            <em className="text-clay-500" style={{ fontStyle: "italic" }}>
                                One standard of excellence.
                            </em>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-24">
                        {websiteTypes.map((type, idx) => (
                            <div
                                key={type.slug}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""
                                    }`}
                            >
                                {/* Image */}
                                <div
                                    className={`relative rounded-2xl overflow-hidden shadow-elegant border border-beige-200 aspect-[4/3] ${idx % 2 === 1 ? "lg:col-start-2" : ""
                                        }`}
                                >
                                    <Image
                                        src={type.image}
                                        alt={type.imageAlt}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    {/* Tag badge */}
                                    <span
                                        className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${type.accent}`}
                                    >
                                        {type.tag}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                                    <h3
                                        className="text-4xl md:text-5xl text-charcoal-900 mb-2 leading-tight"
                                        style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif", fontWeight: 400 }}
                                    >
                                        {type.title}
                                    </h3>
                                    <p className="text-clay-500 font-semibold text-sm uppercase tracking-widest mb-5">
                                        {type.subtitle}
                                    </p>
                                    <p className="text-espresso-800 text-lg leading-relaxed mb-8">
                                        {type.description}
                                    </p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                        {type.features.map((f) => (
                                            <li key={f} className="flex items-start gap-2.5">
                                                <CheckCircle className="w-4 h-4 text-clay-500 mt-0.5 shrink-0" />
                                                <span className="text-sm text-espresso-800">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href="/booking"
                                        className="inline-flex items-center gap-2 btn-primary text-sm"
                                    >
                                        Start with {type.title}
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
