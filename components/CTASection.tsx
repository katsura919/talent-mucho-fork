import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

export default function CTASection() {
    const socialLinks = [
        { name: "WhatsApp", icon: FaWhatsapp, href: "https://wa.me/34657752940" },
        { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com/talentmucho" },
        { name: "Instagram", icon: FaInstagram, href: "https://instagram.com/talentmucho" },
        { name: "TikTok", icon: FaTiktok, href: "https://tiktok.com/@talentmucho" },
        { name: "Threads", icon: SiThreads, href: "https://threads.net/@talentmucho" },
    ];

    return (
        <section id="contact" className="relative bg-charcoal-900 py-5 overflow-hidden">
            {/* Diagonal grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(45deg, transparent 49%, #FAF8F5 49%, #FAF8F5 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, #FAF8F5 49%, #FAF8F5 51%, transparent 51%)
          `,
                    backgroundSize: "50px 50px",
                }}
            />

            {/* Glow accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-clay-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-espresso-700/15 rounded-full blur-[80px] pointer-events-none" />

            {/* Content */}
            <div className="section-container relative z-10 py-5 text-center">
                {/* Eyebrow */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-taupe-400/30" />
                    <span className="text-taupe-400 text-xs tracking-[0.25em] uppercase font-semibold">
                        Ready to scale?
                    </span>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-taupe-400/30" />
                </div>

                {/* Headline */}
                <h2
                    className="text-beige-50 mb-6 leading-[1.05]"
                    style={{
                        fontFamily: "var(--font-cormorant)",
                        fontWeight: 300,
                        fontSize: "clamp(2.8rem, 6vw, 5rem)",
                    }}
                >
                    You&apos;ve worked too hard to{" "}
                    <em className="text-clay-500" style={{ fontStyle: "italic" }}>keep doing it alone.</em>
                </h2>

                <p className="text-beige-200/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                    Let&apos;s get you the right people, the right systems, and finally figure out AI together ~ without the overwhelm.
                </p>

                <div className="pb-10">
                    <a
                        href="/booking"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-beige-50 text-charcoal-900 font-semibold text-base rounded-xl shadow-xl hover:bg-beige-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out"
                    >
                        Book Your Free Call ~ Get a Custom Staffing Plan
                        <ArrowUpRight className="w-5 h-5" />
                    </a>
                    <p className="text-beige-200/40 text-xs mt-4">No commitment required · 30-minute session</p>
                </div>

                {/* Footer Minimal Row */}
                <div className="border-t border-beige-200/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Locations */}
                        <div className="text-center md:text-left pt-3">
                            <p className="text-sm text-beige-200/50">Madrid, Spain</p>
                            <p className="text-sm text-beige-200/50">Cagayan de Oro City, Philippines</p>
                        </div>

                        {/* Copyright & Legal */}
                        <div className="text-center md:text-right">
                            <div className="flex items-center justify-center md:justify-end gap-3 text-xm text-beige-200/50">
                                <a href="/tos" className="hover:text-beige-50 transition-colors">Terms of Service</a>
                                <span className="text-beige-200/20">•</span>
                                <a href="/privacy" className="hover:text-beige-50 transition-colors">Privacy Policy</a>
                            </div>
                            <p className="text-sm text-beige-200/30 ">
                                © {new Date().getFullYear()} Talent Mucho. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
