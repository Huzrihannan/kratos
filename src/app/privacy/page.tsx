import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Kratos Software Solutions",
  description: "Privacy policy and data handling practices for Kratos Software Solutions.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft hover:text-orange-deep transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="rounded-[32px] bg-peach/40 border-2 border-peach/80 p-8 sm:p-12 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/20 text-orange-deep text-xs font-bold uppercase tracking-wider mb-6">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal & Transparency</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink mb-4">
          Privacy Policy
        </h1>
        <p className="text-ink-soft text-sm mb-6">
          Last updated: October 2026 • <strong>[PLACEHOLDER: review by legal]</strong>
        </p>

        <div className="p-4 rounded-2xl bg-butter/30 border border-butter/80 text-ink text-xs mb-8">
          <strong>Notice:</strong> This privacy policy is a structured draft template provided for development preview. It should be reviewed and customized by qualified legal counsel prior to formal enterprise engagements.
        </div>

        <div className="space-y-8 text-ink/90 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you interact with the Kratos website, Project Estimator, or contact forms, we may collect information you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-ink-soft">
              <li>Contact details: your name, business email address, and optional phone/WhatsApp number.</li>
              <li>Project scope data: selected project types, anticipated features, budget bands, and timeline goals.</li>
              <li>Technical usage data: anonymized analytics pings, IP address (for rate limiting and fraud prevention), and browser user-agent.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              We use your submitted data exclusively to prepare your project estimate, reply to inquiries, coordinate discovery calls, and communicate about engineering services. We do not sell, rent, or trade your personal information to third-party data brokers or advertisers.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              3. Data Security & Storage
            </h2>
            <p>
              Inquiries submitted through our forms are securely transmitted over SSL/TLS encryption and stored in secure, access-controlled databases with strict row-level security. We implement continuous vulnerability scanning and in-memory rate limiting to protect against automated abuse.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              4. Cookies & Anti-Spam Protection
            </h2>
            <p>
              We avoid intrusive third-party cross-site advertising cookies. We use Cloudflare Turnstile to verify human traffic without invasive puzzle captchas, and lightweight privacy-respecting analytics to understand page popularity.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              5. Your Rights
            </h2>
            <p>
              Under applicable data protection laws (including GDPR and CCPA), you have the right to request access to the personal data we hold about you, request corrections, or request complete deletion of your contact records.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              6. Contact Regarding Privacy
            </h2>
            <p>
              If you have any questions or wish to request data removal, please email us directly at{" "}
              <a href="mailto:privacy@kratos.dev" className="text-orange-deep font-semibold underline">
                privacy@kratos.dev
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
