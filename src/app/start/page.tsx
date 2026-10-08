import React from "react";
import type { Metadata } from "next";
import { EstimatorWizard } from "@/components/estimator/EstimatorWizard";

export const metadata: Metadata = {
  title: "Project Estimator | Krat.OS Software Solutions",
  description:
    "Get an instant ballpark estimate and timeline for your web app, mobile product, or automation workflow in under 60 seconds.",
  alternates: {
    canonical: "/start",
  },
  openGraph: {
    title: "Project Estimator | Krat.OS Software Solutions",
    description:
      "Get an instant ballpark estimate and timeline for your web app, mobile product, or automation workflow in under 60 seconds.",
    url: "/start",
  },
};

export default function StartPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://krat-os.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Project Estimator",
        item: "https://krat-os.dev/start",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full min-h-[calc(100vh-12rem)] flex flex-col items-center justify-start py-8 sm:py-14 px-4 sm:px-6 lg:px-8 bg-bg text-fg">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-surface border border-line text-xs font-mono text-fg-muted uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-ok shadow-[0_0_6px_var(--ok)]" />
            <span>/01 CONFIG // SYSTEM_SPEC</span>
          </div>
          <h1 className="font-mono font-extrabold text-3xl sm:text-4xl md:text-5xl text-fg tracking-[-0.04em] leading-tight mb-3">
            Estimate your project in 60 seconds.
          </h1>
          <p className="font-sans text-fg-muted text-sm sm:text-base max-w-xl mx-auto">
            Transparent ballpark projections, realistic sprint pacing, and zero sales pressure. Select your architecture below.
          </p>
        </div>

        {/* Two-Column Configurator Container */}
        <div className="w-full max-w-6xl">
          <EstimatorWizard isModal={false} />
        </div>
      </div>
    </>
  );
}
