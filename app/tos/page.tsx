import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Talent Mucho",
  description: "Terms and conditions for using Talent Mucho services and events.",
};

export default function TosPage() {
  return (
    <section className="pt-32 pb-24 bg-beige-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">Legal</p>
          <h1
            className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-taupe-400 font-light mb-12">Last updated: April 2026</p>

          <div className="prose prose-sm max-w-none text-espresso-800 font-light leading-relaxed space-y-10">

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">1. About us</h2>
              <p>
                These Terms of Service govern your use of <strong>Talent Mucho</strong>, operated by Joenabie Gamao (Abie Maxey) and Mary Kris Gebe, freelancers registered in Spain. By accessing our website or registering for any of our events or services, you agree to these terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">2. Events and registrations</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>By registering for a free event, you agree to receive a Zoom link and event-related communications via email.</li>
                <li>Free event spots are not guaranteed until registration is confirmed via email.</li>
                <li>We reserve the right to cancel or reschedule events. In such cases, registered attendees will be notified by email.</li>
                <li>Event recordings may be shared with registered attendees at our discretion.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">3. Paid products and VIP access</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>All payments are processed securely via Stripe. By completing a purchase, you agree to Stripe&apos;s terms of service.</li>
                <li>VIP event access includes the benefits listed at the time of purchase.</li>
                <li>Prices are shown in euros (€) and are inclusive of any applicable taxes unless stated otherwise.</li>
                <li>All sales are final unless otherwise stated. If you have an issue with your purchase, contact us at <a href="mailto:hello@talentmucho.com" className="text-clay-500 hover:underline">hello@talentmucho.com</a> and we will do our best to resolve it.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">4. Intellectual property</h2>
              <p>
                All content on this website ~ including text, design, graphics, and event materials ~ is the property of Talent Mucho. You may not reproduce, distribute, or use our content without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">5. Code of conduct</h2>
              <p>By attending our events, you agree to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Treat all attendees, hosts, and speakers with respect</li>
                <li>Not record, share, or redistribute event content without permission</li>
                <li>Not use the event for unsolicited promotion or spam</li>
              </ul>
              <p className="mt-3">We reserve the right to remove anyone from an event who violates these terms.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">6. Limitation of liability</h2>
              <p>
                Talent Mucho provides educational content and events for informational purposes only. We do not guarantee specific results from attending our events or using our materials. To the extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">7. Third-party platforms</h2>
              <p>
                Our services use third-party platforms including Zoom, Skool, Stripe, and GoHighLevel. Your use of these platforms is subject to their respective terms of service. We are not responsible for any issues arising from third-party platforms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">8. Governing law</h2>
              <p>
                These terms are governed by the laws of Spain. Any disputes will be subject to the jurisdiction of the courts of Spain.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">9. Changes to these terms</h2>
              <p>
                We may update these terms from time to time. Continued use of our services after changes are posted constitutes your acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">10. Contact</h2>
              <p>
                For any questions about these Terms of Service, contact us at <a href="mailto:hello@talentmucho.com" className="text-clay-500 hover:underline">hello@talentmucho.com</a>.
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-beige-200 flex flex-wrap gap-4 text-sm text-taupe-400 font-light">
            <Link href="/privacy" className="hover:text-clay-500 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-clay-500 transition-colors">← Back to Home</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
