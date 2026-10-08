import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Smile,
  Check,
  Quote,
} from "lucide-react";
import { caseStudiesData } from "@/content/work";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    return {
      title: "Case Study Not Found | Krat.OS Software Solutions",
    };
  }

  const cleanTitle = study.title.replace("[PLACEHOLDER] ", "");

  return {
    title: `${cleanTitle} | Case Study | Krat.OS`,
    description: study.summary,
    alternates: {
      canonical: `/work/${study.slug}`,
    },
    openGraph: {
      title: `${cleanTitle} | Krat.OS Case Study`,
      description: study.summary,
      url: `/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const cleanTitle = study.title.replace("[PLACEHOLDER] ", "");
  const cleanClient = study.clientName.replace("[PLACEHOLDER] ", "");

  const nextStudy = caseStudiesData.find((s) => s.slug === study.nextSlug);

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

      <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft hover:text-orange-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Case Studies</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="mb-14 sm:mb-20">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="px-3.5 py-1 rounded-full bg-peach text-ink-soft text-xs font-bold uppercase tracking-wider border border-peach/80">
              {study.industry}
            </span>
            <span className="text-ink-soft text-xs font-bold uppercase tracking-wider">
              Client: {cleanClient}
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
            {cleanTitle}
          </h1>

          <p className="font-sans text-ink-soft text-xl sm:text-2xl leading-relaxed max-w-3xl mb-8">
            {study.summary}
          </p>

          {/* Big Impact Metric Banner */}
          <div className="p-8 sm:p-10 rounded-[32px] bg-peach/50 border-2 border-orange/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-deep block mb-1">
                Primary Business Outcome
              </span>
              <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink">
                {study.metricValue}
              </div>
              <span className="text-ink-soft text-sm sm:text-base font-medium">
                {study.metricLabel}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-cream text-ink text-xs font-semibold border border-peach"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* The Challenge */}
        <section aria-label="The Challenge" className="mb-16">
          <div className="flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-peach/70 text-ink-soft text-xs font-bold uppercase tracking-wider mb-4 w-fit">
            <span>01 // The Bottleneck</span>
          </div>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-4">
            The Challenge
          </h2>
          <p className="text-ink text-lg leading-relaxed bg-cream/60 p-6 sm:p-8 rounded-[28px] border border-peach/60">
            {study.challenge}
          </p>
        </section>

        {/* Dual Core: Strong Underneath & Friendly On Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Strong Underneath */}
          <section className="p-7 sm:p-8 rounded-[32px] bg-peach/40 border-2 border-peach/80">
            <div className="w-12 h-12 rounded-2xl bg-cocoa text-cream flex items-center justify-center mb-5 shadow-sm">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-ink mb-3">
              Strong Underneath
            </h3>
            <p className="text-ink-soft text-base leading-relaxed">
              {study.approach}
            </p>
          </section>

          {/* Friendly On Top */}
          <section className="p-7 sm:p-8 rounded-[32px] bg-peach/60 border-2 border-orange/40">
            <div className="w-12 h-12 rounded-2xl bg-orange text-ink flex items-center justify-center mb-5 shadow-sm">
              <Smile className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-ink mb-3">
              Friendly On Top
            </h3>
            <p className="text-ink-soft text-base leading-relaxed">
              {study.solution}
            </p>
          </section>
        </div>

        {/* Circular / Rounded Portal Visual Gallery */}
        <section aria-label="Visual showcase" className="mb-16">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-6">
            Architecture & Visual Elements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {study.results.map((res, idx) => (
              <div
                key={idx}
                className="rounded-[32px] bg-peach/30 border border-peach/70 p-6 flex flex-col justify-between text-center items-center hover:bg-peach/50 transition-colors"
              >
                {/* Circular Portal Frame */}
                <div className="w-24 h-24 rounded-full bg-cream border-3 border-orange/50 flex items-center justify-center shadow-sm mb-4">
                  <span className="font-display font-bold text-2xl text-ink">
                    {res.value}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-base text-ink mb-1">
                    {res.label}
                  </h4>
                  <p className="text-ink-soft text-xs leading-relaxed">
                    {res.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Deliverables */}
        <section aria-label="Key deliverables" className="mb-16">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-6">
            Key Deliverables Handed Over
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {study.keyDeliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-5 rounded-[24px] bg-peach/40 border border-peach/70"
              >
                <div className="w-5 h-5 rounded-full bg-orange/40 text-ink flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-ink font-medium text-sm leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Client Quote (if present) */}
        {study.clientQuote && (
          <section aria-label="Client feedback" className="mb-20">
            <div className="p-8 sm:p-10 rounded-[36px] bg-cocoa text-cream relative overflow-hidden shadow-sm">
              <Quote className="w-12 h-12 text-orange/40 mb-4" />
              <blockquote className="font-display text-xl sm:text-2xl text-cream/95 leading-relaxed mb-6">
                &ldquo;{study.clientQuote.text.replace("[PLACEHOLDER] ", "")}&rdquo;
              </blockquote>
              <div>
                <cite className="not-italic font-bold text-butter block text-base">
                  {study.clientQuote.author.replace("[PLACEHOLDER] ", "")}
                </cite>
                <span className="text-cream/60 text-xs">
                  {study.clientQuote.title}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Next Project Link Strip */}
        {nextStudy && (
          <div className="mb-20 p-6 rounded-[28px] bg-peach/40 border border-peach/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                Next Project
              </span>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-ink">
                {nextStudy.title.replace("[PLACEHOLDER] ", "")}
              </h3>
            </div>
            <Link
              href={`/work/${nextStudy.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream hover:bg-orange text-ink font-bold text-xs uppercase tracking-wider border border-peach transition-colors shadow-2xs"
            >
              <span>View Next Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Final CTA */}
        <section
          aria-label="Build something similar"
          className="rounded-[36px] bg-orange p-8 sm:p-12 text-center text-ink flex flex-col items-center shadow-md"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-4 max-w-xl">
            Want similar results for your business?
          </h2>
          <p className="text-ink/80 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
            Let us estimate your build or review your current technical bottlenecks with zero obligation.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <EstimatorButton
              size="lg"
              variant="secondary"
              className="bg-cream hover:bg-cream/90 text-ink"
            >
              Estimate Similar Project
            </EstimatorButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-ink text-cream font-bold text-sm hover:opacity-90 transition-opacity"
            >
              <span>Talk to an Engineer</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
