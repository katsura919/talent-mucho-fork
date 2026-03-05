import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, MessageCircle, CalendarDays } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import BookingEmbed from "../../components/BookingEmbed";

export const revalidate = false;

export const metadata = {
    title: "Contact Us | Talent Mucho",
    description:
        "Get in touch with Talent Mucho. Book a discovery call, send us an email, or connect on social media. We're based in Madrid, Spain and Cagayan de Oro, Philippines.",
};

const socialLinks = [
    {
        name: "WhatsApp",
        handle: "+34 657 752 940",
        href: "https://wa.me/34657752940",
        icon: FaWhatsapp,
        color: "hover:bg-green-500 hover:border-green-500 hover:text-white",
    },
    {
        name: "Facebook",
        handle: "talentmucho",
        href: "https://facebook.com/talentmucho",
        icon: FaFacebookF,
        color: "hover:bg-blue-600 hover:border-blue-600 hover:text-white",
    },
    {
        name: "Instagram",
        handle: "@talentmucho",
        href: "https://instagram.com/talentmucho",
        icon: FaInstagram,
        color: "hover:bg-pink-500 hover:border-pink-500 hover:text-white",
    },
    {
        name: "TikTok",
        handle: "@talentmucho",
        href: "https://tiktok.com/@talentmucho",
        icon: FaTiktok,
        color: "hover:bg-charcoal-900 hover:border-charcoal-900 hover:text-white",
    },
    {
        name: "Threads",
        handle: "@talentmucho",
        href: "https://threads.net/@talentmucho",
        icon: SiThreads,
        color: "hover:bg-charcoal-900 hover:border-charcoal-900 hover:text-white",
    },
];

const contactCards = [
    {
        icon: Mail,
        label: "Email Us",
        value: "hello@talentmucho.com",
        href: "mailto:hello@talentmucho.com",
        description: "We reply within 24 hours.",
    },
    {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "+34 657 752 940",
        href: "https://wa.me/34657752940",
        description: "Message us directly for a quick response.",
    },
    {
        icon: CalendarDays,
        label: "Book a Call",
        value: "30-min Discovery Call",
        href: "#schedule",
        description: "Pick a time that suits you — no commitment.",
    },
];

const offices = [
    {
        city: "Madrid",
        country: "Spain",
        emoji: "🇪🇸",
        detail: "Remote team",
    },
    {
        city: "Cagayan de Oro City",
        country: "Philippines",
        emoji: "🇵🇭",
        detail: "Remote team",
    },
];

export default function ContactPage() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="section-padding bg-beige-50 border-b border-beige-200">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-beige-200 bg-white text-clay-500 text-xs font-semibold uppercase tracking-widest">
                            Get in Touch
                        </span>
                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl leading-tight font-light tracking-tight text-charcoal-900 mb-6"
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                        >
                            Let&apos;s Start a{" "}
                            <em className="not-italic text-clay-500">Conversation</em>
                        </h1>
                        <p className="text-lg text-espresso-800 leading-relaxed max-w-xl">
                            Whether you&apos;re ready to hire, just exploring, or have a specific project in
                            mind, we&apos;d love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Contact Cards ── */}
            <section className="pt-16 pb-4 bg-beige-100">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {contactCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <a
                                    key={card.label}
                                    href={card.href}
                                    className="group flex flex-col gap-4 p-6 rounded-2xl bg-white border border-beige-200 shadow-sm hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-beige-100 border border-beige-200 flex items-center justify-center text-clay-500 group-hover:bg-clay-500 group-hover:text-white group-hover:border-clay-500 transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-taupe-400 mb-1">
                                            {card.label}
                                        </p>
                                        <p
                                            className="text-charcoal-900 font-semibold text-lg leading-snug mb-1"
                                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                                        >
                                            {card.value}
                                        </p>
                                        <p className="text-sm text-taupe-400">{card.description}</p>
                                    </div>
                                    <span className="inline-flex items-center gap-1 text-clay-500 text-xs font-semibold mt-auto group-hover:gap-2 transition-all duration-200">
                                        Reach out <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </a>
                            );
                        })}
                    </div>

                    {/* ── Social + Locations row ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {/* Socials */}
                        <div className="bg-white rounded-2xl border border-beige-200 p-8 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-widest text-taupe-400 mb-6">
                                Follow Us
                            </p>
                            <div className="flex flex-col gap-3">
                                {socialLinks.map((s) => {
                                    const Icon = s.icon;
                                    return (
                                        <a
                                            key={s.name}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-4 p-3 rounded-xl border border-beige-200 bg-beige-50 text-charcoal-900 transition-all duration-200 ${s.color}`}
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            <span className="font-medium text-sm">{s.name}</span>
                                            <span className="ml-auto text-xs text-taupe-400 group-hover:text-white">
                                                {s.handle}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Locations + FAQ hint */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-2xl border border-beige-200 p-8 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-widest text-taupe-400 mb-6">
                                    Where We Are
                                </p>
                                <div className="flex flex-col gap-4">
                                    {offices.map((o) => (
                                        <div key={o.city} className="flex items-start gap-4">
                                            <span className="text-2xl">{o.emoji}</span>
                                            <div>
                                                <p className="font-semibold text-charcoal-900">
                                                    {o.city}
                                                </p>
                                                <p className="text-sm text-taupe-400">
                                                    {o.country} · {o.detail}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-charcoal-900 rounded-2xl p-8 text-beige-50 flex flex-col gap-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-taupe-400">
                                    Response Time
                                </p>
                                <p
                                    className="text-3xl font-light text-white"
                                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                                >
                                    Within <em className="text-clay-400 not-italic">24 hours</em>
                                </p>
                                <p className="text-beige-300 text-sm leading-relaxed">
                                    We take every inquiry seriously. Expect a thoughtful, personalised response — not a template.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Booking Calendar ── */}
            <div id="schedule">
                <BookingEmbed />
            </div>
        </>
    );
}
