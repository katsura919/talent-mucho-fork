import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | Talent Mucho",
  description: "Talent Mucho refund and cancellation policy for events and paid products.",
};

export default function RefundsPage() {
  return (
    <section className="pt-32 pb-24 bg-beige-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">Legal</p>
          <h1
            className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
          >
            Refund Policy
          </h1>
          <p className="text-sm text-taupe-400 font-light mb-12">Last updated: April 2026</p>

          <div className="prose prose-sm max-w-none text-espresso-800 font-light leading-relaxed space-y-10">

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">1. Free events</h2>
              <p>
                Free event registrations require no payment and are therefore not subject to any refund. You may cancel your registration at any time by contacting us ~ your spot will be released to someone on the waitlist.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">2. Paid products and VIP access</h2>
              <p>All sales are final. We do not offer refunds on:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>VIP event access</li>
                <li>Bootcamp registrations</li>
                <li>Community subscriptions (once the billing period has started)</li>
                <li>Digital products and downloadable content</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">3. Exceptions</h2>
              <p>We will issue a full refund if:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>We cancel the event and cannot offer a reschedule</li>
                <li>A technical error resulted in a duplicate charge</li>
                <li>You were charged incorrectly due to a platform error</li>
              </ul>
              <p className="mt-3">
                In any of these cases, contact us within 7 days of the charge at{" "}
                <a href="mailto:hello@talentmucho.com" className="text-clay-500 hover:underline">hello@talentmucho.com</a> and we will resolve it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">4. Event rescheduling</h2>
              <p>
                If we reschedule an event, your registration will automatically transfer to the new date. If the new date does not work for you, contact us within 7 days of the announcement and we will issue a full refund.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">5. How to request a refund</h2>
              <p>
                Email us at <a href="mailto:hello@talentmucho.com" className="text-clay-500 hover:underline">hello@talentmucho.com</a> with your name, email used at purchase, and the reason for your request. We aim to respond within 2 business days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">6. Consumer rights (EU)</h2>
              <p>
                If you are an EU consumer, you may have a statutory right of withdrawal within 14 days of purchase for certain digital products. However, by accessing digital content immediately upon purchase (such as event replays or community access), you acknowledge and agree that the right of withdrawal no longer applies once access has been granted.
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-beige-200 flex flex-wrap gap-4 text-sm text-taupe-400 font-light">
            <Link href="/tos" className="hover:text-clay-500 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-clay-500 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-clay-500 transition-colors">← Back to Home</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
