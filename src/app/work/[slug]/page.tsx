import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Quote, MessageCircle } from "lucide-react";
import { caseStudiesData } from "@/content/work";
import { isPublishable } from "@/lib/content-status";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";
import { Decode } from "@/components/fx/Decode";
import { Odometer } from "@/components/fx/Odometer";
import { Window } from "@/components/ui/Window";
import { BeforeAfterSlider } from "@/components/work/BeforeAfterSlider";
import { siteConfig } from "@/content/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const publishable = caseStudiesData.filter(isPublishable);
  if (publishable.length === 0) {
    return [{ slug: "_empty" }];
  }
  return publishable.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.slug === slug && isPublishable(s));

  if (!study) {
    return {
      title: "Case Study Not Found | Krat.OS Software Solutions",
    };
  }

  return {
    title: `${study.title} | Case Study | Krat.OS`,
    description: study.summary,
    alternates: {
      canonical: `/work/${study.slug}`,
    },
    openGraph: {
      title: `${study.title} | Krat.OS Case Study`,
      description: study.summary,
      url: `/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.slug === slug && isPublishable(s));

  if (!study) {
    notFound();
  }

  const cleanTitle = study.title;
  const cleanClient = study.clientName;
  const nextStudy = caseStudiesData.find((s) => s.slug === study.nextSlug && isPublishable(s));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: cleanTitle,
        headline: cleanTitle,
        description: study.summary,
        creator: {
          "@type": "Organization",
          name: "Krat.OS Software Solutions",
          url: "https://krat-os.dev",
        },
        about: study.industry,
        url: `https://krat-os.dev/work/${study.slug}`,
      },
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
          {
            "@type": "ListItem",
            position: 3,
            name: cleanTitle,
            item: `https://krat-os.dev/work/${study.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full font-mono">
        {/* Navigation Back Bar */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-mono text-fg-muted hover:text-red-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[← ALL CASE STUDIES]</span>
          </Link>
        </div>

        {/* Hero Header */}
        <header className="mb-14 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted mb-5">
            <span className="px-2.5 py-1 rounded-[2px] bg-surface border border-line text-red-text font-bold">
              {study.industry.toUpperCase()}
            </span>
            <span>•</span>
            <span>CLIENT: {cleanClient}</span>
            <span>•</span>
            <span className="text-ok">VERIFIED CASE STUDY</span>
          </div>

          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-fg leading-[1.1] mb-5 tracking-tight">
            <Decode text={cleanTitle} />
          </h1>

          <p className="font-sans text-fg-muted text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
            {study.summary}
          </p>

          {/* Primary Business Outcome HUD Banner */}
          <Window
            title="primary_metric.hud [KEY_OUTCOME]"
            cornerBrackets
            className="p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-[11px] text-red-text font-bold uppercase tracking-mono block mb-1">
                  CORE PRODUCTION RESULT
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-fg tracking-tight">
                  <Odometer value={study.metricValue} />
                </div>
                <span className="font-sans text-xs text-fg-muted mt-1 block">
                  {study.metricLabel}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-[2px] bg-bg border border-line text-xs text-fg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Window>
        </header>

        {/* Technical Deep Dive: Challenge & Architecture */}
        <section aria-label="Technical narrative" className="mb-14 sm:mb-16 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Challenge Window */}
            <Window
              title="challenge_audit.log [BOTTLENECK]"
              className="p-6 h-full"
            >
              <span className="text-[10px] text-red-text font-bold uppercase tracking-mono block mb-2">
                {"// SYSTEM BOTTLENECK"}
              </span>
              <h2 className="text-xl font-bold text-fg mb-4">
                The Technical Bottleneck
              </h2>
              <p className="font-sans text-sm text-fg-muted leading-relaxed">
                {study.challenge}
              </p>
            </Window>

            {/* Approach Window */}
            <Window
              title="architecture_plan.md [STRATEGY]"
              className="p-6 h-full"
            >
              <span className="text-[10px] text-ok font-bold uppercase tracking-mono block mb-2">
                {"// ARCHITECTURAL INTERVENTION"}
              </span>
              <h2 className="text-xl font-bold text-fg mb-4">
                Our Engineering Strategy
              </h2>
              <p className="font-sans text-sm text-fg-muted leading-relaxed">
                {study.approach}
              </p>
            </Window>
          </div>

          {/* Solution Window */}
          <Window
            title="deployed_solution.spec [PRODUCTION]"
            cornerBrackets
            className="p-6 sm:p-8"
          >
            <span className="text-[10px] text-fg-muted uppercase tracking-mono block mb-2">
              {"// DEPLOYED PRODUCTION RUNTIME"}
            </span>
            <h2 className="text-2xl font-bold text-fg mb-4">
              Production Architecture & Implementation
            </h2>
            <p className="font-sans text-sm sm:text-base text-fg leading-relaxed">
              {study.solution}
            </p>
          </Window>
        </section>

        {/* Section: Before/After Wipe Slider */}
        <section aria-label="Architecture comparison slider" className="mb-14 sm:mb-16">
          <div className="mb-3 flex items-center justify-between text-xs text-fg-muted uppercase tracking-mono">
            <span>[ARCHITECTURE_DIFF]</span>
            <span>BEFORE VS. AFTER</span>
          </div>
          <BeforeAfterSlider />
        </section>

        {/* Section: Metric Results KPI Grid */}
        <section aria-label="Measured results" className="mb-14 sm:mb-16">
          <div className="mb-4 flex items-center justify-between text-xs text-fg-muted uppercase tracking-mono">
            <span>[MEASURED_IMPACT]</span>
            <span>3 AUDITED METRICS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {study.results.map((res, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[2px] border border-line bg-surface/90 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-fg-muted uppercase tracking-mono block mb-1">
                    METRIC_0{idx + 1}
                  </span>
                  <div className="text-3xl font-bold text-fg my-2">
                    <Odometer value={res.value} />
                  </div>
                  <h4 className="text-xs font-bold text-fg mb-1">
                    {res.label}
                  </h4>
                  <p className="font-sans text-[11px] text-fg-muted leading-relaxed">
                    {res.detail}
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-line/60 text-[10px] text-ok">
                  [AUDIT_VERIFIED]
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Key Deliverables Artifacts Window */}
        <section aria-label="Key deliverables" className="mb-14 sm:mb-16">
          <Window
            title="shipped_artifacts.log [REPOSITORY_MANIFEST]"
            className="p-6 sm:p-8"
          >
            <span className="text-[10px] text-fg-muted uppercase tracking-mono block mb-2">
              {"// REPOSITORY ARTIFACTS TRANSFERRED TO CLIENT"}
            </span>
            <h2 className="text-xl font-bold text-fg mb-5">
              Production Artifacts Shipped
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {study.keyDeliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-[2px] bg-bg/60 border border-line/70 text-fg"
                >
                  <span className="text-red-text font-bold shrink-0 mt-0.5">
                    [✓]
                  </span>
                  <span className="font-sans leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Window>
        </section>

        {/* Client Quote Window (if present) */}
        {study.clientQuote && (
          <section aria-label="Client testimony" className="mb-14 sm:mb-16">
            <Window
              title="client_verification.sig [VERIFIED_FEEDBACK]"
              cornerBrackets
              className="p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-red-text shrink-0 mt-1 opacity-70" />
                <div className="space-y-4">
                  <blockquote className="font-sans text-base sm:text-lg text-fg italic leading-relaxed">
                    &ldquo;{study.clientQuote.text}&rdquo;
                  </blockquote>
                  <div className="text-xs">
                    <span className="font-bold text-fg block">
                      {study.clientQuote.author}
                    </span>
                    <span className="text-fg-muted text-[11px]">
                      {study.clientQuote.title}
                    </span>
                  </div>
                </div>
              </div>
            </Window>
          </section>
        )}

        {/* Next Project Teaser */}
        {nextStudy && (
          <section aria-label="Next case study teaser" className="mb-14 sm:mb-16">
            <Link
              href={`/work/${nextStudy.slug}`}
              className="group block p-6 rounded-[2px] border border-line hover:border-line-strong bg-surface/90 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-fg-muted mb-2">
                <span>[NEXT_CASE_STUDY]</span>
                <span className="text-red-text group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  VIEW CASE STUDY <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-fg">
                {nextStudy.title}
              </h3>
              <p className="font-sans text-xs text-fg-muted mt-1">
                {nextStudy.summary}
              </p>
            </Link>
          </section>
        )}

        {/* Final Conversion CTA */}
        <section aria-label="Start your project">
          <Window
            title="start_conversation.sh [NEXT_ACTION]"
            cornerBrackets
            className="p-6 sm:p-10 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-bg border border-line text-[11px] text-ok">
                <span className="w-1.5 h-1.5 rounded-full bg-ok" />
                <span>SPRINTS READY TO ALLOCATE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
                Want similar results for your product?
              </h2>

              <p className="font-sans text-fg-muted text-sm sm:text-base leading-relaxed">
                Run our 60-second Estimator to calculate ballpark pricing, or reach out to our senior engineers on WhatsApp.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <EstimatorButton size="lg" withArrow>
                  Estimate my project
                </EstimatorButton>
                {siteConfig.contact.whatsappUrl ? (
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] border border-line bg-surface hover:border-line-strong text-fg transition-colors text-xs uppercase"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-ok" />
                    <span>Chat on WhatsApp</span>
                  </a>
                ) : null}
              </div>
            </div>
          </Window>
        </section>
      </div>
    </>
  );
}
