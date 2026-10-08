import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Decode } from "@/components/fx/Decode";
import { Window } from "@/components/ui/Window";

export const metadata: Metadata = {
  title: "Terms of Service | Krat.OS Software Solutions",
  description: "Terms of service and engagement conditions for Krat.OS Software Solutions.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
        title="legal_terms.md [COMMERCIAL_SPEC]"
        cornerBrackets
        className="p-6 sm:p-10 shadow-card"
      >
        <div className="flex items-center gap-2 text-xs text-red-text uppercase tracking-mono mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>COMMERCIAL TERMS &amp; SPRINT CONDITIONS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-3">
          <Decode text="Terms of Service" />
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted mb-8 pb-4 border-b border-line">
          <span>LAST_UPDATED: OCTOBER 2026</span>
          <span>•</span>
          <span className="text-ok font-bold">STATUS: ACTIVE_SPECIFICATION</span>
        </div>

        <div className="space-y-8 font-sans text-sm text-fg/90 leading-relaxed">
          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              1. Project Estimator &amp; Ballpark Figures
            </h2>
            <p>
              Calculations, milestone projections, and ballpark figures produced by the Krat.OS Project Estimator are non-binding budgetary estimates intended for scope planning. Formal, binding commitments are exclusively established through mutually executed Statements of Work (SOWs) specifying architectures, deliverables, and payment milestones.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              2. Intellectual Property &amp; 100% Code Ownership
            </h2>
            <p>
              We enforce complete client sovereignty upon receipt of milestone payments for agreed engineering sprints:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-fg-muted">
              <li>You own 100% of custom application source code, schemas, and design tokens created specifically for your organization.</li>
              <li>Source repositories are hosted directly in your private GitHub or cloud accounts from the initial sprint commit.</li>
              <li>Underlying open-source frameworks (Next.js, React, Tailwind CSS, TypeScript) remain governed by their respective permissive licenses (MIT or Apache 2.0).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              3. Delivery Sprints &amp; Bug Warranty
            </h2>
            <p>
              Engineering engagements operate in transparent sprint cycles with working staging builds delivered every Friday. Every major milestone deployment includes a 30-day comprehensive post-launch bug warranty to remediate defects or deviations from the agreed technical specification at zero additional cost.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              4. Client Collaboration &amp; Access
            </h2>
            <p>
              Predictable engineering velocity requires timely stakeholder feedback, sprint milestone approvals, and provision of required third-party service credentials or API keys.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              5. Governing Law
            </h2>
            <p>
              These general commercial terms are construed under commercial contract law, without prejudice to localized terms established in custom corporate Master Service Agreements (MSAs).
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              6. Legal Contact
            </h2>
            <p>
              For enterprise inquiries, Master Service Agreements (MSAs), or mutual non-disclosure agreements (NDAs), contact our legal and engineering team at{" "}
              <a href="mailto:legal@krat-os.dev" className="text-red-text font-bold underline font-mono">
                legal@krat-os.dev
              </a>.
            </p>
          </section>
        </div>
      </Window>
    </div>
  );
}
