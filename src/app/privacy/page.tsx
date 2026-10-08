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
          <span>BACK TO HOME</span>
        </Link>
      </div>

      <Window
        title="legal_privacy.md [DATA_SPEC]"
        cornerBrackets
        className="p-6 sm:p-10 shadow-card"
      >
        <div className="flex items-center gap-2 text-xs text-red-text uppercase tracking-mono mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>LEGAL &amp; DATA PRIVACY SPECIFICATION</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-3">
          <Decode text="Privacy Policy" />
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted mb-8 pb-4 border-b border-line">
          <span>LAST_UPDATED: OCTOBER 2026</span>
          <span>•</span>
          <span className="text-ok font-bold">STATUS: ACTIVE_SPECIFICATION</span>
        </div>

        <div className="space-y-8 font-sans text-sm text-fg/90 leading-relaxed">
          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              1. Information We Collect
            </h2>
            <p>
              When you interact with the Krat.OS website, Project Estimator, or contact dispatchers, we collect only the information necessary to provide project estimates and communicate with you:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-fg-muted">
              <li><strong className="text-fg">Identity &amp; Contact:</strong> Your name, work email address, and optional telephone or WhatsApp number.</li>
              <li><strong className="text-fg">Project Specifications:</strong> Selected architecture modules, timeline requirements, target budget ranges, and project descriptions submitted via our forms.</li>
              <li><strong className="text-fg">Technical Telemetry:</strong> Anonymized interaction events, page URL, referrer parameters, and IP address strictly for rate limiting, DDoS prevention, and security auditing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              2. Data Storage &amp; Third-Party Processors
            </h2>
            <p>
              We do not sell, rent, or monetize your information. We utilize trusted, industry-standard infrastructure providers to process and safeguard your data:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-fg-muted">
              <li><strong className="text-fg">Database Storage (Supabase):</strong> Lead records are stored in access-controlled PostgreSQL instances with Row-Level Security (RLS) policies and encrypted at rest.</li>
              <li><strong className="text-fg">Transactional Delivery (Resend):</strong> Project estimates and inquiry notifications are delivered to you and our lead engineers via Resend transactional email API over TLS 1.3.</li>
              <li><strong className="text-fg">Spam Prevention (Cloudflare Turnstile):</strong> Form submissions are verified with Cloudflare Turnstile to prevent automated abuse without invasive captcha puzzles.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              3. Data Security &amp; Encryption
            </h2>
            <p>
              All traffic between your browser and our infrastructure is strictly encrypted in transit via SSL/TLS 1.3 with modern cipher suites. Database connections enforce SSL with automated security patching and daily backups.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              4. Cookies &amp; Tracking
            </h2>
            <p>
              We avoid intrusive third-party cross-site advertising cookies and behavioral trackers. Client preferences (such as color theme and motion accessibility level) are stored locally in your browser storage (localStorage) and never transmitted to ad brokers.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              5. Your Rights &amp; Data Deletion
            </h2>
            <p>
              Under applicable privacy regulations (including GDPR and CCPA), you have the right to inspect, correct, or request the immediate deletion of your submitted contact records from our database.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              6. Privacy Inquiries
            </h2>
            <p>
              For data access requests, records purge requests, or security notices, email our engineering leads directly at{" "}
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
