import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Kratos Software Solutions",
  description: "Terms of service and engagement conditions for Kratos Software Solutions.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
          <FileText className="w-3.5 h-3.5" />
          <span>Terms & Conditions</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink mb-4">
          Terms of Service
        </h1>
        <p className="text-ink-soft text-sm mb-6">
          Last updated: October 2026 • <strong>[PLACEHOLDER: review by legal]</strong>
        </p>

        <div className="p-4 rounded-2xl bg-butter/30 border border-butter/80 text-ink text-xs mb-8">
          <strong>Notice:</strong> These terms of service represent standard commercial guidelines for software design and engineering contracts. Individual project statements of work (SOWs) supersede generic terms on this website.
        </div>

        <div className="space-y-8 text-ink/90 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              1. Nature of Website Estimates
            </h2>
            <p>
              Calculations, numbers, and ballpark ranges produced by the Kratos Project Estimator are non-binding budgetary estimates intended to assist project planning. Formal, binding commitments are exclusively defined in mutually executed Statements of Work (SOWs) specifying technical scope, milestones, and deliverables.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              2. Intellectual Property & Code Ownership
            </h2>
            <p>
              We believe in complete client sovereignty. Upon receipt of full milestone payment for delivered work:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-ink-soft">
              <li>You own 100% of custom application source code, database architectures, and design tokens created specifically for your project.</li>
              <li>Source repositories are hosted directly in your designated GitHub or GitLab organizations.</li>
              <li>Underlying open-source libraries (e.g. Next.js, React, Tailwind CSS) remain subject to their respective open-source licenses (such as MIT or Apache 2.0).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              3. Delivery & Sprint Warranty
            </h2>
            <p>
              We provide a 30-day post-launch warranty with every major milestone deployment. During this window, any defects or deviations from the agreed technical scope are resolved promptly at zero additional cost.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              4. Client Cooperation
            </h2>
            <p>
              Timely sprint deliveries depend on prompt feedback, access to necessary third-party API keys, and collaborative milestone approvals. We coordinate directly with your designated product lead to keep sprints on schedule.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with commercial laws of California, United States, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-3">
              6. Contact
            </h2>
            <p>
              For legal questions regarding contracts, NDAs, or master service agreements, contact us at{" "}
              <a href="mailto:legal@kratos.dev" className="text-orange-deep font-semibold underline">
                legal@kratos.dev
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
