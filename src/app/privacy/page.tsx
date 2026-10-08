import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Decode } from "@/components/fx/Decode";
import { Window } from "@/components/ui/Window";

export const metadata: Metadata = {
  title: "Privacy Policy | Krat.OS Software Solutions",
  description: "Privacy policy and data handling practices for Krat.OS Software Solutions.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full font-mono">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-mono text-fg-muted hover:text-red-text transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>[← BACK TO HOME]</span>
        </Link>
      </div>

      <Window
        title="legal_privacy.md [DOCUMENTATION]"
        cornerBrackets
        className="p-6 sm:p-10"
      >
        <div className="flex items-center gap-2 text-xs text-red-text uppercase tracking-mono mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>LEGAL &amp; DATA PRIVACY SPECIFICATION</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-3">
          <Decode text="Privacy Policy" />
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted mb-6 pb-4 border-b border-line">
          <span>LAST_UPDATED: OCTOBER 2026</span>
          <span>•</span>
          <span className="text-red-text font-bold">[PLACEHOLDER: REVIEW BY LEGAL]</span>
        </div>

        <div className="p-3.5 rounded-[2px] bg-bg border border-line text-xs text-fg-muted mb-8 leading-relaxed">
          <strong className="text-fg">NOTICE:</strong> This privacy documentation represents a structured baseline for development preview. It must be customized with accredited legal counsel prior to formal enterprise contracting.
        </div>

        <div className="space-y-8 font-sans text-sm text-fg/90 leading-relaxed">
          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              1. Information We Collect
            </h2>
            <p>
              When you interact with the Krat.OS website, Project Estimator, or inquiry dispatcher, we may collect information you voluntarily transmit, including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-fg-muted">
              <li>Contact identity: your name, business email address, and optional WhatsApp/phone number.</li>
              <li>Project scope data: selected architectures, timeline urgency, budget bands, and technical specifications.</li>
              <li>Telemetry: anonymized analytics pings, IP address (for rate limiting and DDoS prevention), and browser user-agent.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              2. How We Use Submitted Data
            </h2>
            <p>
              Submitted data is used exclusively to compile your ballpark estimates, reply to engineering inquiries, schedule discovery calls, and deliver technical roadmaps. We do not sell, rent, or monetize your contact information to third-party data brokers or marketing lists.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              3. Data Security &amp; Encryption
            </h2>
            <p>
              All traffic between your browser and our infrastructure is encrypted in transit via SSL/TLS 1.3. Lead records are stored in access-controlled databases with row-level security (RLS) policies. In-memory IP rate limiting prevents automated abuse.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              4. Tracking &amp; Spam Protection
            </h2>
            <p>
              We avoid intrusive third-party cross-site advertising cookies. Cloudflare Turnstile protects form endpoints without invasive puzzle captchas.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              5. Data Sovereignty &amp; Your Rights
            </h2>
            <p>
              Under applicable regulations (including GDPR and CCPA), you have the right to request access to any personal data on file or request immediate and complete deletion.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              6. Privacy Inquiries
            </h2>
            <p>
              For privacy requests or record purge verification, email our engineering leads directly at{" "}
              <a href="mailto:privacy@krat-os.dev" className="text-red-text font-bold underline font-mono">
                privacy@krat-os.dev
              </a>.
            </p>
          </section>
        </div>
      </Window>
    </div>
  );
}
