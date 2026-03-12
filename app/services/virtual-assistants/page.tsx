import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, UserCheck } from "lucide-react";

export const metadata = {
    title: "Virtual Assistants | Talent Mucho",
    description:
        "Trained, vetted Virtual Assistants who understand business goals — not just to-do lists. Executive VAs, customer support, operations, and CRM automation.",
};

const vaTypes = [
    {
        slug: "executive-admin",
        title: "Executive & Admin VAs",
        subtitle: "Your right-hand professional",
        description:
            "Highly capable VAs who manage your calendar, inbox, travel, and day-to-day admin — so you can focus on the work only you can do. Discreet, proactive, and deadline-driven.",
        image: "/service-va.png",
        imageAlt: "Virtual assistant working remotely",
        features: [
            "Calendar & schedule management",
            "Email triage & correspondence",
            "Travel booking & itineraries",
            "Meeting prep & follow-ups",
            "Document & report creation",
            "Data entry & research",
        ],
        accent: "bg-charcoal-900 text-beige-50",
        tag: "Most Requested",
    },
    {
        slug: "customer-support",
        title: "Customer Support VAs",
        subtitle: "Always-on client care",
        description:
            "Dedicated support VAs who handle your customers with speed and empathy — managing tickets, live chat, social DMs, and satisfaction follow-ups across every channel.",
        image: "https://aristosourcing.com/wp-content/uploads/2021/09/Customer-Service.jpg",
        imageAlt: "VA providing customer support",
        features: [
            "Help desk & ticket management",
            "Live chat handling",
            "Social media DM responses",
            "Order tracking & issue resolution",
            "Customer satisfaction follow-up",
            "FAQ & knowledge base upkeep",
        ],
        accent: "bg-clay-500 text-beige-50",
        tag: "High Impact",
    },
    {
        slug: "operations",
        title: "Operations & Back-Office",
        subtitle: "The engine behind your business",
        description:
            "Process-focused VAs who keep your internal operations running smoothly — from workflow coordination and vendor management to reporting and CRM automation.",
        image: "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773315738/Transportation-Body-1_bcb6oh.png",
        imageAlt: "VA managing operations and back-office",
        features: [
            "Workflow & SOP management",
            "CRM data entry & cleanup",
            "Vendor & supplier coordination",
            "Reporting & KPI tracking",
            "Tool & software administration",
            "Team scheduling & task routing",
        ],
        accent: "bg-espresso-800 text-beige-50",
        tag: "Scale Faster",
    },
];

export default function VirtualAssistantsPage() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="section-padding bg-beige-50 border-b border-beige-200">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-beige-200 bg-white text-clay-500 text-xs font-semibold uppercase tracking-widest mb-6">
                            <UserCheck className="w-3.5 h-3.5" />
                            Virtual Assistants
                        </span>

                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl leading-tight font-light tracking-tight text-charcoal-900 mb-6"
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                        >
                            Skilled VAs Who{" "}
                            <em className="not-italic text-clay-500">Get It Done</em> — Right
                        </h1>

                        <p className="text-lg text-espresso-800 leading-relaxed max-w-2xl">
                            We don&apos;t just fill a seat. We match you with trained, vetted Virtual Assistants who understand your business goals and operate like trusted extensions of your team.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── VA Types ── */}
            <section className="section-padding bg-beige-100">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                            What We Place
                        </p>
                        <h2
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif", fontWeight: 300 }}
                            className="text-4xl md:text-5xl text-charcoal-900"
                        >
                            Three VA specialisations.{" "}
                            <em className="text-clay-500" style={{ fontStyle: "italic" }}>
                                One rigorous standard.
                            </em>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-24">
                        {vaTypes.map((type, idx) => (
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
                                        Hire a {type.title.split(" ")[0]} VA
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
