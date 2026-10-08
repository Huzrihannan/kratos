import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  Clock,
  Sparkles,
  Layers,
  ArrowLeft,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { servicesData } from "@/content/services";
import { caseStudiesData } from "@/content/work";
import { Accordion } from "@/components/ui/Accordion";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";
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
      title: "Service Not Found | Kratos Software Solutions",
    };
  }

  return {
    title: `${service.title} | Kratos Software Solutions`,
    description: service.shortPromise,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Kratos Software Solutions`,
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
          name: "Kratos Software Solutions",
          url: "https://kratos.dev",
        },
        serviceType: service.title,
        termsOfService: "https://kratos.dev/terms",
        url: `https://kratos.dev/services/${service.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://kratos.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://kratos.dev/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `https://kratos.dev/services/${service.slug}`,
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

      <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft hover:text-orange-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Services</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-peach">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>{"// service deep-dive"}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6 max-w-4xl">
            {service.title}
          </h1>

          <p className="font-sans text-ink-soft text-xl sm:text-2xl leading-relaxed max-w-3xl mb-8">
            {service.shortPromise}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-peach text-ink font-bold text-sm border border-peach/80">
              <Clock className="w-4 h-4 text-orange-deep" />
              Typical timeframe: {service.timeframe}
            </span>
            <EstimatorButton size="md" withArrow={true}>
              Estimate This Service
            </EstimatorButton>
          </div>
        </header>

        {/* Section 1: What's Included / Deliverables */}
        <section aria-label="What's included" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-ink">
              <Layers className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink">
              What is included in every build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-6 rounded-[28px] bg-peach/40 border border-peach/80 hover:bg-peach/60 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-orange/40 text-ink flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <p className="text-ink font-medium text-base leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Typical Process & Steps */}
        <section aria-label="Process and workflow" className="mb-20">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-8">
            How we take this from idea to production
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-[28px] bg-peach/30 border border-peach/70 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-display font-bold text-3xl text-orange mb-3 block">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-ink-soft text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Technologies Used */}
        <section aria-label="Technologies" className="mb-20">
          <div className="p-8 sm:p-10 rounded-[32px] bg-peach/40 border border-peach/80">
            <h2 className="font-display font-semibold text-2xl text-ink mb-3">
              Technologies & Standards
            </h2>
            <p className="text-ink-soft text-base mb-6 max-w-2xl">
              We never use heavy, outdated toolchains or fragile plugins. Every build is built on modern, battle-tested foundations:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-cream text-ink font-semibold text-sm border border-peach shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section aria-label="Related case studies" className="mb-20">
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-6">
              Relevant case studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedStudies.map((study) => (
                <div
                  key={study.id}
                  className="rounded-[32px] bg-peach/40 border-2 border-peach/80 p-7 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-cream text-ink text-xs font-bold uppercase tracking-wider mb-3">
                      {study.industry}
                    </span>
                    <h3 className="font-display font-semibold text-xl text-ink mb-2">
                      {study.title.replace("[PLACEHOLDER] ", "")}
                    </h3>
                    <p className="text-ink-soft text-sm leading-relaxed mb-6">
                      {study.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-peach/70">
                    <span className="font-display font-bold text-xl text-ink">
                      {study.metricValue}{" "}
                      <span className="text-xs font-normal text-ink-soft">
                        {study.metricLabel}
                      </span>
                    </span>
                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-deep hover:underline"
                    >
                      <span>Read Story</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Service Specific FAQs */}
        <section aria-label="Service FAQs" className="mb-20">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-6">
            Frequently asked questions about {service.title}
          </h2>
          <Accordion items={accordionItems} />
        </section>

        {/* Section 6: Final CTA */}
        <section
          aria-label="Ready to start?"
          className="rounded-[36px] bg-orange p-8 sm:p-12 md:p-14 text-center text-ink flex flex-col items-center shadow-md"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-4 max-w-2xl">
            Ready to build your {service.title}?
          </h2>
          <p className="text-ink/80 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            Get an instant ballpark estimate in 60 seconds, or schedule a 15-minute technical discovery call with our engineering team.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <EstimatorButton
              size="lg"
              variant="secondary"
              className="bg-cream hover:bg-cream/90 text-ink"
            >
              Estimate This Project
            </EstimatorButton>
            <a
              href={siteConfig.contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-ink text-cream font-bold text-sm hover:opacity-90 transition-opacity"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 15-min Discovery</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
