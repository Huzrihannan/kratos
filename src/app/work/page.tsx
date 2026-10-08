import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { caseStudiesData } from "@/content/work";
import { WorkFilter } from "@/components/work/WorkFilter";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";
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
      "Real software with measurable business impact. High-converting SaaS, mobile apps, and smart automations.",
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
      <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-5 border border-peach">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>{"// our work"}</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
          Real software. Measurable impact.
        </h1>

        <p className="font-sans text-ink-soft text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
          We don&apos;t ship flashy mockups that crumble in production. We engineer software that drives actual bottom-line growth, faster workflows, and happier users.
        </p>

        {/* Availability Chip */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-butter/40 border border-butter/80 text-ink text-xs font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
          <span>{siteConfig.availability.chipText}</span>
        </div>
      </div>

      {/* Filterable Portfolio Grid */}
      <div className="mb-24">
        <WorkFilter initialStudies={caseStudiesData} />
      </div>

      {/* Bottom Conversion Band */}
      <section
        aria-label="Have a project in mind?"
        className="rounded-[36px] bg-peach/80 border-2 border-orange/40 p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto shadow-sm relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-4">
            Have a project in mind?
          </h2>
          <p className="text-ink-soft text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you are modernizing a legacy system or launching an entirely new product, our team is ready to give you a clear architectural roadmap.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <EstimatorButton size="lg" withArrow={true}>
              Estimate My Project
            </EstimatorButton>
            <Link
              href="/contact"
              className="px-6 py-4 rounded-full bg-cream text-ink font-semibold text-sm hover:bg-peach border border-peach transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
            >
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
