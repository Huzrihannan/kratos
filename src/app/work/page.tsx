import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { caseStudiesData } from "@/content/work";
import { WorkFilter } from "@/components/work/WorkFilter";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";
import { Decode } from "@/components/fx/Decode";
import { Window } from "@/components/ui/Window";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Work & Case Studies | Krat.OS Software Solutions",
  description:
    "Explore real software solutions built by Krat.OS: FinTech transaction portals, pediatric telehealth mobile apps, and automated freight dispatch systems.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work & Case Studies | Krat.OS Software Solutions",
    description:
      "Real software with measurable business impact. High-performance SaaS, mobile apps, and smart automations.",
    url: "/work",
  },
};

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            name: "Work",
            item: "https://krat-os.dev/work",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Case Studies by Krat.OS Software Solutions",
        description: "Portfolio of delivered software applications and client results.",
        itemListElement: caseStudiesData.map((study, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "CreativeWork",
            name: study.title.replace("[PLACEHOLDER] ", ""),
            description: study.summary,
            url: `https://krat-os.dev/work/${study.slug}`,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full font-mono">
        {/* Header Eyebrow & Display Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-line bg-surface/80 text-xs uppercase tracking-mono text-fg-muted mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            <span>/02 — WORK // REPOSITORY_ARCHIVE</span>
          </div>

          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-fg leading-[1.1] mb-5 tracking-tight">
            <Decode text="Real systems. Measurable impact." />
          </h1>

          <p className="font-sans text-fg-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            We don&apos;t ship flashy prototypes that crumble under real load. We engineer robust software that drives bottom-line metrics and zero downtime.
          </p>

          {/* Availability Status Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-line bg-surface/90 text-[11px] text-ok">
            <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
            <span className="text-fg-muted uppercase tracking-mono">STATUS:</span>
            <span className="font-bold">{siteConfig.availability.chipText.toUpperCase()}</span>
          </div>
        </div>

        {/* Filterable Case Studies Grid with GSAP Flip */}
        <div className="mb-20">
          <WorkFilter initialStudies={caseStudiesData} />
        </div>

        {/* Bottom Conversion Band */}
        <div className="max-w-4xl mx-auto w-full">
          <Window
            title="project_intake.sh [ESTIMATE_OR_BOOK]"
            cornerBrackets
            className="p-6 sm:p-10 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-bg border border-line text-[11px] text-red-text">
                <span className="w-1.5 h-1.5 rounded-full bg-red" />
                <span>NEW PROJECT ARCHITECTURE</span>
              </div>

              <h2 className="font-bold text-2xl sm:text-3xl text-fg tracking-tight">
                Have a project ready for production?
              </h2>

              <p className="font-sans text-fg-muted text-sm sm:text-base leading-relaxed">
                Whether modernizing a legacy system or launching an entirely new product, our team delivers an actionable architectural plan within 48 hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <EstimatorButton size="lg" withArrow>
                  Estimate my project
                </EstimatorButton>
                <Link
                  href="/contact"
                  className="text-xs uppercase px-6 py-3.5 rounded-[2px] border border-line bg-surface hover:border-line-strong text-fg transition-colors"
                >
                  Contact our engineers
                </Link>
              </div>
            </div>
          </Window>
        </div>
      </div>
    </>
  );
}
