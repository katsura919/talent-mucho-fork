import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Talent Mucho",
  description: "How Talent Mucho collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24 bg-beige-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">Legal</p>
          <h1
            className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-taupe-400 font-light mb-12">Last updated: April 2026</p>

          <div className="prose prose-sm max-w-none text-espresso-800 font-light leading-relaxed space-y-10">

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">1. Who we are</h2>
              <p>
                This Privacy Policy applies to <strong>Talent Mucho</strong>, operated by Joenabie Gamao (Abie Maxey), a freelancer (autónoma) registered in Spain. Our website is <a href="https://talentmucho.com" className="text-clay-500 hover:underline">talentmucho.com</a>.
              </p>
              <p className="mt-3">
                For any privacy-related questions, contact us at: <a href="mailto:hello@abiemaxey.com" className="text-clay-500 hover:underline">hello@abiemaxey.com</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">2. What data we collect</h2>
              <p>When you register for an event, sign up for our newsletter, or contact us, we may collect:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Business type and professional background</li>
                <li>How you found us (referral source)</li>
                <li>Your current level of experience with AI</li>
                <li>Payment information (processed securely by Stripe ~ we do not store card details)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">3. How we use your data</h2>
              <p>We use your personal data to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Process your event registration and send you the Zoom link</li>
                <li>Send event-related updates and reminders</li>
                <li>Improve our events and services based on your profile</li>
                <li>Contact you about future events or offers (you can opt out at any time)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">4. Legal basis for processing</h2>
              <p>We process your data based on:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Consent</strong> ~ when you tick the consent box at registration</li>
                <li><strong>Contractual necessity</strong> ~ to deliver the event you registered for</li>
                <li><strong>Legitimate interests</strong> ~ to improve our services and communicate relevant offers</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">5. Who we share your data with</h2>
              <p>We do not sell your data. We may share it with trusted third-party tools we use to operate our business:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>GoHighLevel (GHL)</strong> ~ CRM and email communication</li>
                <li><strong>Stripe</strong> ~ payment processing</li>
                <li><strong>Zoom</strong> ~ live event delivery</li>
                <li><strong>Skool</strong> ~ community platform</li>
                <li><strong>Resend</strong> ~ transactional email</li>
              </ul>
              <p className="mt-3">All third-party tools are GDPR-compliant or operate under standard contractual clauses.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">6. How long we keep your data</h2>
              <p>
                We retain your data for as long as necessary to provide our services, or until you request deletion. If you registered for an event, we keep your data for up to 2 years after the event unless you ask us to delete it sooner.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">7. Your rights (GDPR)</h2>
              <p>As a resident of the EU/EEA, you have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Access</strong> ~ request a copy of your personal data</li>
                <li><strong>Rectification</strong> ~ correct inaccurate data</li>
                <li><strong>Erasure</strong> ~ request deletion of your data</li>
                <li><strong>Restriction</strong> ~ limit how we process your data</li>
                <li><strong>Portability</strong> ~ receive your data in a portable format</li>
                <li><strong>Objection</strong> ~ object to processing based on legitimate interests</li>
                <li><strong>Withdraw consent</strong> ~ at any time, without affecting prior processing</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email us at <a href="mailto:hello@abiemaxey.com" className="text-clay-500 hover:underline">hello@abiemaxey.com</a>. We will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">8. Cookies</h2>
              <p>
                Our website may use essential cookies to ensure basic functionality. We do not use tracking or advertising cookies without your consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">9. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. We will notify you of significant changes by email or by posting a notice on our website. The date at the top of this page reflects the most recent update.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">10. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, contact us at <a href="mailto:hello@abiemaxey.com" className="text-clay-500 hover:underline">hello@abiemaxey.com</a>.
              </p>
              <p className="mt-3">
                You also have the right to lodge a complaint with the Spanish data protection authority: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-clay-500 hover:underline">Agencia Española de Protección de Datos (AEPD)</a>.
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-beige-200 flex flex-wrap gap-4 text-sm text-taupe-400 font-light">
            <Link href="/tos" className="hover:text-clay-500 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-clay-500 transition-colors">← Back to Home</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
