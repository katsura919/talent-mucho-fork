import { LayoutTemplate, ArrowRight } from "lucide-react";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

const WEBSITE_PROJECTS: FocusRailItem[] = [
    {
        id: 1,
        title: "Happy Voyager",
        description: "The DIY System for Spain's Digital Nomad Visa.",
        meta: "Digital Nomad • Travel",
        imageSrc: "https://res.cloudinary.com/drpxke63n/image/upload/v1772444270/happy.png",
        href: "#eco-store",
    },
    {
        id: 2,
        title: "Gen X Authority Mentor",
        description: "Own Your Life. Reclaim Your Authority. Begin Again-On Your Terms.",
        meta: "Personal Brand • Coaching",
        imageSrc: "https://res.cloudinary.com/drpxke63n/image/upload/v1772444675/genx_wj4doa.png",
        href: "#exec-port",
    },
    {
        id: 3,
        title: "Advanced Virtual Staff PH",
        description: "Empowering the Digital-First World with AI-Driven Virtual Assistant.",
        meta: "Virtual Assistant • AI",
        imageSrc: "https://res.cloudinary.com/drpxke63n/image/upload/v1772445050/avsph_dabzkj.png",
        href: "#tech-launch",
    },
];

export default function WebsiteServiceSection() {
    return (
        <section id="website-services" className="py-24 md:py-32 bg-charcoal-900">
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                        Digital Foundations
                    </p>
                    <h2
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                        className="mb-5 text-4xl md:text-5xl text-beige-50"
                    >
                        Your Digital Storefront
                        <br />
                        <em className="text-clay-400" style={{ fontStyle: "italic" }}>Built for Conversion</em>
                    </h2>
                    <p className="text-beige-200/60 text-lg max-w-2xl mx-auto leading-relaxed">
                        We build high-performance websites and landing pages that don&apos;t just look premium, they drive action and elevate your brand&apos;s perceived value.
                    </p>
                </div>

                {/* Visual Area: FocusRail Showcase */}
                <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 bg-charcoal-900">
                    <FocusRail
                        items={WEBSITE_PROJECTS}
                        autoPlay={true}
                        loop={true}
                        className="h-[670px] md:h-[750px]"
                    />
                </div>
            </div>
        </section>
    );
}
