import Image from "next/image";
import { Target, Briefcase, Star, CheckCircle } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-beige-100 overflow-hidden">
      {/* Diagonal Cross Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
                        linear-gradient(45deg, transparent 49%, #DED4C4 49%, #DED4C4 51%, transparent 51%),
                        linear-gradient(-45deg, transparent 49%, #DED4C4 49%, #DED4C4 51%, transparent 51%)
                    `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-beige-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-beige-300/40 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left order-2 lg:order-1">
            {/* Tagline */}
            <p className="text-taupe-400 text-sm uppercase tracking-[0.2em] mb-6 animate-fade-in">
              Global Talent Studio
            </p>

            {/* Main Headline */}
            <h1 className="mb-6 animate-fade-in-up">
              Elite Remote Staffing + Digital Services
            
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-espresso-800 max-w-lg mb-8 leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
              Get elite remote talent and the systems to manage them — without the overhead.
            </p>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-10 opacity-0 animate-fade-in-up animation-delay-300">
              {[
                "Virtual Assistants",
                "Websites & Branding",
                "Social Media & SEO",
                "One partner. One strategy. Real results.",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-espresso-800">
                  <CheckCircle className="w-6 h-6 text-clay-500 flex-shrink-0 mt-0.5" />
                  <span className={`text-lg font-medium ${index === 3 ? "font-bold text-charcoal-900" : ""}`}>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 opacity-0 animate-fade-in-up animation-delay-400">
              <a
                href="/booking"
                className="btn-primary"
              >
                Get Your Free VA Match
              </a>
            </div>
          </div>

          {/* Right Column - Image with Floating Cards */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Main Image Container */}
            <div className="relative">
              {/* Circular backdrop */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-beige-200/60 to-beige-300/40 border border-beige-300/50" />
              </div>

              {/* Person Image */}
              <div className="relative z-10 animate-fade-in-up">
                <Image
                  src="/assets/website-samples/hero_image.png"
                  alt="Professional talent consultant"
                  width={400}
                  height={480}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>

              {/* Floating Card - Experience Badge */}
              <div className="absolute top-8 right-0 lg:-right-4 z-20 animate-fade-in-up animation-delay-300">
                <div className="bg-clay-500 text-beige-50 px-4 py-3 rounded-lg shadow-lg">
                  <span className="text-2xl font-bold flex items-center">
                    <NumberTicker value={10} className="text-beige-50" />
                    <span>+</span>
                  </span>
                  <p className="text-white text-xs opacity-90">
                    Years
                    <br />
                    Experience
                  </p>
                </div>
              </div>

              {/* Floating Card - Talent Stats */}
              <div className="absolute top-1/2 -left-4 lg:-left-12 z-20 opacity-0 animate-fade-in-up animation-delay-400">
                <div className="bg-beige-50 px-4 py-3 rounded-xl shadow-lg border border-beige-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-beige-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-espresso-700">
                        TM
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal-900">
                        Professionals Placed
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-clay-500 flex items-center">
                    <NumberTicker value={200} className="text-clay-500" />
                    <span>+</span>
                  </p>
                </div>
              </div>

              {/* Floating Card - Growth Chart */}
              <div className="absolute bottom-20 -right-4 lg:-right-8 z-20 opacity-0 animate-fade-in-up animation-delay-500">
                <div className="bg-beige-50 px-4 py-3 rounded-xl shadow-lg border border-beige-200">
                  <p className="text-xs text-taupe-400 mb-1">Client Retention</p>
                  <p className="text-lg font-bold text-charcoal-900 flex items-center">
                    <NumberTicker value={98} className="text-charcoal-900" />
                    <span>%</span>
                  </p>
                  <div className="flex items-end gap-1 mt-2">
                    <div className="w-2 h-3 bg-beige-300 rounded-sm" />
                    <div className="w-2 h-4 bg-beige-300 rounded-sm" />
                    <div className="w-2 h-5 bg-taupe-400 rounded-sm" />
                    <div className="w-2 h-6 bg-taupe-400 rounded-sm" />
                    <div className="w-2 h-8 bg-clay-500 rounded-sm" />
                    <div className="w-2 h-7 bg-clay-500 rounded-sm" />
                    <div className="w-2 h-10 bg-clay-500 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Floating Icon Reactions */}
              <div className="absolute bottom-8 left-8 z-20 opacity-0 animate-fade-in-up animation-delay-400">
                <div className="bg-beige-50 px-3 py-2 rounded-full shadow-md border border-beige-200 flex items-center gap-2">
                  <Target className="w-5 h-5 text-clay-500" />
                  <Briefcase className="w-5 h-5 text-espresso-700" />
                  <Star className="w-5 h-5 text-taupe-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
