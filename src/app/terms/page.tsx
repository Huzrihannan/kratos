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
          <span>[← BACK TO HOME]</span>
        </Link>
      </div>

      <Window
        title="legal_terms.md [DOCUMENTATION]"
        cornerBrackets
        className="p-6 sm:p-10"
      >
        <div className="flex items-center gap-2 text-xs text-red-text uppercase tracking-mono mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>COMMERCIAL TERMS &amp; SPRINT CONDITIONS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-3">
          <Decode text="Terms of Service" />
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted mb-6 pb-4 border-b border-line">
          <span>LAST_UPDATED: OCTOBER 2026</span>
          <span>•</span>
          <span className="text-red-text font-bold">[PLACEHOLDER: REVIEW BY LEGAL]</span>
        </div>

        <div className="p-3.5 rounded-[2px] bg-bg border border-line text-xs text-fg-muted mb-8 leading-relaxed">
          <strong className="text-fg">NOTICE:</strong> These commercial terms outline standard engineering practices. Individual Statements of Work (SOWs) and Master Service Agreements (MSAs) supersede generic terms on this website.
        </div>

        <div className="space-y-8 font-sans text-sm text-fg/90 leading-relaxed">
          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              1. Ballpark Estimator Projections
            </h2>
            <p>
              Calculations, milestone estimates, and numbers produced by the Krat.OS Project Estimator are non-binding budgetary estimates intended for project planning. Formal, binding commitments are exclusively defined in mutually executed Statements of Work (SOWs) detailing specific architecture, milestones, and deliverables.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              2. Intellectual Property &amp; 100% Code Ownership
            </h2>
            <p>
              We enforce complete client sovereignty. Upon receipt of full milestone payment for delivered engineering sprints:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-fg-muted">
              <li>You own 100% of custom application source code, schemas, and design tokens created specifically for your project.</li>
              <li>Source code is hosted directly inside your designated GitHub or GitLab organizations from the initial commit.</li>
              <li>Underlying open-source components (e.g. Next.js, React, Tailwind CSS) remain governed by their respective permissive licenses (MIT or Apache 2.0).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              3. Delivery &amp; Sprint Warranty
            </h2>
            <p>
              We provide a 30-day post-launch warranty with every major milestone deployment. Any defects or deviations from the agreed technical scope discovered within this window are resolved promptly at zero additional charge.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              4. Client Collaboration
            </h2>
            <p>
              Timely sprint velocities depend on timely stakeholder reviews, provision of third-party API keys, and weekly feedback on Friday staging builds.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              5. Governing Law
            </h2>
            <p>
              These terms are construed under the commercial laws of California, United States, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-base font-bold text-fg mb-2">
              6. Legal Contact
            </h2>
            <p>
              For questions regarding MSAs, NDAs, or custom enterprise contracting, email our legal team at{" "}
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
