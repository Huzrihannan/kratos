import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Layers,
  MessageCircle,
} from "lucide-react";
import { servicesData } from "@/content/services";
import { caseStudiesData } from "@/content/work";
import { Accordion } from "@/components/ui/Accordion";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";
import { Decode } from "@/components/fx/Decode";
import { Window } from "@/components/ui/Window";
import { ServiceArchitectureDiagram } from "@/components/services/ServiceArchitectureDiagram";
import { siteConfig } from "@/content/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Krat.OS Software Solutions",
    };
  }

  return {
    title: `${service.title} | Krat.OS Software Solutions`,
    description: service.shortPromise,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Krat.OS Software Solutions`,
      description: service.shortPromise,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedStudies = caseStudiesData.filter((cs) =>
    service.relatedWorkSlugs.includes(cs.id)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.detailSummary,
        provider: {
          "@type": "Organization",
          name: "Krat.OS Software Solutions",
          url: "https://krat-os.dev",
        },
        serviceType: service.title,
        termsOfService: "https://krat-os.dev/terms",
        url: `https://krat-os.dev/services/${service.slug}`,
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
            name: "Services",
            item: "https://krat-os.dev/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `https://krat-os.dev/services/${service.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const accordionItems = service.faqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full font-mono">
        {/* Navigation Back Bar */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-mono text-fg-muted hover:text-red-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[← ALL MODULES]</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-line bg-surface/80 text-xs uppercase tracking-mono text-fg-muted mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            <span>/01 — MODULE_SPEC // {service.slug.toUpperCase()}</span>
          </div>

          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-fg leading-[1.1] mb-5 tracking-tight">
            <Decode text={service.title} />
          </h1>

          <p className="font-sans text-fg-muted text-lg sm:text-xl leading-relaxed max-w-3xl mb-6">
            {service.shortPromise}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-surface border border-line text-fg">
              <Clock className="w-3.5 h-3.5 text-red-text" />
              <span>TIMEFRAME: {service.timeframe}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-surface border border-line text-fg">
              <Layers className="w-3.5 h-3.5 text-ok" />
              <span>STACK: {service.tags.length} TECHNOLOGIES</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-surface border border-line text-ok">
              <span className="w-1.5 h-1.5 rounded-full bg-ok" />
              <span>STATUS: PRODUCTION_READY</span>
            </span>
          </div>
        </header>

        {/* Section 1: Animated Architecture Diagram */}
        <section aria-label="Architecture Diagram" className="mb-14 sm:mb-16">
          <div className="mb-3 flex items-center justify-between text-xs text-fg-muted uppercase tracking-mono">
            <span>[SYSTEM_TOPOLOGY]</span>
            <span>PIPELINE_VIEW</span>
          </div>
          <ServiceArchitectureDiagram slug={service.slug} />
        </section>

        {/* Section 2: Two-Column Scope & Stack Dependency Graph */}
        <section aria-label="Deliverables and Stack" className="mb-14 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Deliverables Window (7 cols) */}
          <div className="lg:col-span-7">
            <Window
              title="module_deliverables.json [INCLUSIONS]"
              cornerBrackets
              className="p-5 sm:p-7"
            >
              <p className="font-sans text-xs text-fg-muted leading-relaxed mb-5">
                Every project milestone is packaged into reproducible repository artifacts with 100% IP ownership transferred to your team.
              </p>

              <ul className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-[2px] bg-bg/60 border border-line/70 text-xs text-fg"
                  >
                    <span className="text-red-text font-bold shrink-0 mt-0.5">
                      [✓]
                    </span>
                    <span className="font-sans leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Window>
          </div>

          {/* Stack Dependency Tree (5 cols) */}
          <div className="lg:col-span-5">
            <Window
              title="dependency_tree.lock [STACK]"
              className="p-5 sm:p-7 h-full flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-xs text-fg-muted uppercase tracking-mono block">
                  LAYER ARCHITECTURE:
                </span>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-[2px] bg-bg border border-line">
                    <div className="text-[10px] text-red-text font-bold mb-1">
                      LAYER 01 // INTERFACE & RUNTIME
                    </div>
                    <div className="text-fg font-bold">
                      {service.tags.slice(0, 2).join(" • ")}
                    </div>
                  </div>

                  <div className="p-3 rounded-[2px] bg-bg border border-line">
                    <div className="text-[10px] text-fg-muted font-bold mb-1">
                      LAYER 02 // LOGIC & EDGE API
                    </div>
                    <div className="text-fg font-bold">
                      {service.tags.slice(2, 4).join(" • ") || "Edge Functions • Zod"}
                    </div>
                  </div>

                  <div className="p-3 rounded-[2px] bg-bg border border-line">
                    <div className="text-[10px] text-ok font-bold mb-1">
                      LAYER 03 // PERSISTENCE & SEC
                    </div>
                    <div className="text-fg font-bold">
                      {service.tags.slice(4).join(" • ") || "PostgreSQL • Row Level Security"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-line text-[10px] text-fg-muted flex items-center justify-between">
                <span>LOCK_VERSION: STRICT</span>
                <span className="text-ok">0 VULNERABILITIES</span>
              </div>
            </Window>
          </div>
        </section>

        {/* Section 3: Mini Pipeline (Process Steps) */}
        <section aria-label="Process Pipeline" className="mb-14 sm:mb-16">
          <div className="mb-4 flex items-center justify-between text-xs text-fg-muted uppercase tracking-mono">
            <span>[PIPELINE_EXECUTION]</span>
            <span>4 SPRINT PHASES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[2px] border border-line bg-surface/80 flex flex-col justify-between h-44 hover:border-line-strong transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-fg-muted mb-2">
                    <span className="text-red-text font-bold">PHASE 0{idx + 1}</span>
                    <span>MILESTONE</span>
                  </div>
                  <h4 className="text-xs font-bold text-fg mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="font-sans text-[11px] text-fg-muted leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-line/60 flex items-center justify-between text-[10px] text-fg-muted">
                  <span>GATE: PASSED</span>
                  <span className="text-ok">[ok]</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Related Work Case Studies (if any) */}
        {relatedStudies.length > 0 && (
          <section aria-label="Related Case Studies" className="mb-14 sm:mb-16">
            <div className="mb-4 flex items-center justify-between text-xs text-fg-muted uppercase tracking-mono">
              <span>[VERIFIED_IMPLEMENTATION]</span>
              <span>CASE STUDIES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedStudies.map((cs) => (
                <Window
                  key={cs.id}
                  title={`case_study.${cs.slug}`}
                  cornerBrackets
                  className="p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between text-[10px] text-red-text mb-2">
                    <span>{cs.industry}</span>
                    <span>{cs.metricValue} {cs.metricLabel}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-fg mb-2">
                    {cs.title.replace("[PLACEHOLDER] ", "")}
                  </h3>

                  <p className="font-sans text-xs text-fg-muted leading-relaxed mb-4">
                    {cs.summary}
                  </p>

                  <div className="pt-3 border-t border-line flex items-center justify-between text-xs">
                    <span className="text-[10px] text-fg-muted">CLIENT: {cs.clientName}</span>
                    <Link
                      href={`/work/${cs.slug}`}
                      className="inline-flex items-center gap-1.5 text-fg hover:text-red-text transition-colors font-bold uppercase tracking-wider"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Window>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Service FAQ */}
        <section aria-label="Frequently Asked Questions" className="mb-14 sm:mb-16">
          <Window
            title="module_faq.terminal [DIRECT_ANSWERS]"
            className="p-6 sm:p-8"
          >
            <div className="mb-6">
              <span className="text-[11px] text-red-text uppercase tracking-mono block mb-1">
                {"// ARCHITECTURAL QUESTIONS"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-fg">
                Frequently asked regarding {service.title}
              </h2>
            </div>

            <Accordion items={accordionItems} />
          </Window>
        </section>

        {/* Section 6: Final CTA */}
        <section aria-label="Configure this module">
          <Window
            title="deploy_dispatch.sh [INITIALIZE_PROJECT]"
            cornerBrackets
            className="p-6 sm:p-10 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-bg border border-line text-[11px] text-ok">
                <span className="w-1.5 h-1.5 rounded-full bg-ok" />
                <span>SPRINT INTAKE OPEN</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
                Ready to engineer your {service.title}?
              </h2>

              <p className="font-sans text-fg-muted text-sm sm:text-base leading-relaxed">
                Configure your requirements in our 60-second Estimator to lock in scope, ballpark pricing, and reserve our next development sprint.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <EstimatorButton size="lg" withArrow>
                  Estimate this module
                </EstimatorButton>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] border border-line bg-surface hover:border-line-strong text-fg transition-colors text-xs uppercase"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-ok" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </Window>
        </section>
      </div>
    </>
  );
}
