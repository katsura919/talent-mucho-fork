import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies Policy | Talent Mucho",
  description: "How Talent Mucho uses cookies on its website.",
};

export default function CookiesPage() {
  return (
    <section className="pt-32 pb-24 bg-beige-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">Legal</p>
          <h1
            className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
          >
            Cookies Policy
          </h1>
          <p className="text-sm text-taupe-400 font-light mb-12">Last updated: April 2026</p>

          <div className="prose prose-sm max-w-none text-espresso-800 font-light leading-relaxed space-y-10">

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">1. What are cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">2. Cookies we use</h2>

              <div className="mt-4 space-y-6">
                <div className="bg-white border border-beige-200 rounded-2xl p-6">
                  <p className="font-semibold text-charcoal-900 text-sm mb-1">Essential cookies</p>
                  <p className="text-xs text-clay-500 font-medium uppercase tracking-wide mb-3">Always active</p>
                  <p className="text-sm">These cookies are necessary for the website to function. They cannot be disabled. They include cookies that remember your cookie consent preference.</p>
                </div>

                <div className="bg-white border border-beige-200 rounded-2xl p-6">
                  <p className="font-semibold text-charcoal-900 text-sm mb-1">Analytics cookies</p>
                  <p className="text-xs text-taupe-400 font-medium uppercase tracking-wide mb-3">Optional ~ requires consent</p>
                  <p className="text-sm">We use Vercel Analytics to understand how visitors interact with our site. This data is anonymous and helps us improve the user experience. No personal data is shared with third parties for advertising purposes.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">3. How to manage cookies</h2>
              <p>
                You can manage or delete cookies at any time through your browser settings. Note that disabling certain cookies may affect the functionality of our website.
              </p>
              <p className="mt-3">
                You can also withdraw your consent at any time by clearing your browser cookies and revisiting our site ~ the consent banner will reappear.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">4. Third-party cookies</h2>
              <p>
                Some pages on our site may include content or tools from third parties (such as Stripe for payments or Zoom for events) that may set their own cookies. We do not control these cookies ~ please refer to the respective third-party privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">5. Contact</h2>
              <p>
                For questions about our use of cookies, contact us at{" "}
                <a href="mailto:hello@talentmucho.com" className="text-clay-500 hover:underline">hello@talentmucho.com</a>.
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-beige-200 flex flex-wrap gap-4 text-sm text-taupe-400 font-light">
            <Link href="/privacy" className="hover:text-clay-500 transition-colors">Privacy Policy</Link>
            <Link href="/tos" className="hover:text-clay-500 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-clay-500 transition-colors">← Back to Home</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
