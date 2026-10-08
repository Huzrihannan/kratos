import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { servicesData, ServiceItem } from "@/content/services";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";
import { Decode } from "@/components/fx/Decode";
import { Window } from "@/components/ui/Window";
import { ServiceStickyNav } from "@/components/services/ServiceStickyNav";
import {
  WebAppScene,
  MobileAppScene,
  EcommerceScene,
  AutomationScene,
  DesignScene,
  SupportScene,
} from "@/components/sections/scenes";

export const metadata: Metadata = {
  title: "Services & Capabilities | Krat.OS Software Solutions",
  description:
    "Explore our core engineering capabilities: Web Apps & SaaS, Cross-Platform Mobile Apps, Headless E-Commerce, AI Workflows, and Custom Design Systems.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Capabilities | Krat.OS Software Solutions",
    description:
      "Web apps, mobile apps, and pragmatic AI automations built strong underneath, fast on top.",
    url: "/services",
  },
};

function getSceneForService(illustration: ServiceItem["illustration"]) {
  switch (illustration) {
    case "webapp":
      return <WebAppScene isHovered={false} />;
    case "mobile":
      return <MobileAppScene isHovered={false} />;
    case "ecommerce":
      return <EcommerceScene isHovered={false} />;
    case "ai":
      return <AutomationScene isHovered={false} />;
    case "design":
      return <DesignScene isHovered={false} />;
    case "maintenance":
      return <SupportScene isHovered={false} />;
  }
}

export default function ServicesPage() {
  const navModules = servicesData.map((s, idx) => ({
    id: s.slug,
    slug: s.slug,
    index: `0${idx + 1}`,
    title: s.title.split(" (")[0].replace(" & ", " / "),
  }));

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
            name: "Services",
            item: "https://krat-os.dev/services",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Services by Krat.OS Software Solutions",
        description: "Core software engineering and product design capabilities.",
        itemListElement: servicesData.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.shortPromise,
            url: `https://krat-os.dev/services/${s.slug}`,
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

      <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Eyebrow & Display Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-line bg-surface/80 font-mono text-xs uppercase tracking-mono text-fg-muted mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            <span>/01 — MODULES // ARCHITECTURE & CAPABILITIES</span>
          </div>

          <h1 className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl text-fg leading-[1.1] mb-5 tracking-tight">
            <Decode text="Engineering without compromise." />
          </h1>

          <p className="font-sans text-fg-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From zero-latency SaaS platforms to offline-first mobile apps, we pair rigorous engineering discipline with clean, intuitive interfaces.
          </p>
        </div>

        {/* Main Content Layout: Sticky Left Index on Desktop + Modules Stream */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Desktop Sticky Index */}
          <ServiceStickyNav modules={navModules} />

          {/* Modules Stream */}
          <div className="flex-1 w-full space-y-12">
            {servicesData.map((service, idx) => {
              const moduleWindowNum = `module_0${idx + 1}.${service.illustration}`;

              return (
                <section
                  key={service.id}
                  id={service.slug}
                  aria-label={service.title}
                  className="scroll-mt-32"
                >
                  <Window
                    title={moduleWindowNum}
                    cornerBrackets
                    headerRight={
                      <span className="font-mono text-[10px] text-fg-muted flex items-center gap-1">
                        <Clock className="w-3 h-3 text-red-text" />
                        <span>{service.timeframe}</span>
                      </span>
                    }
                    className="p-0 overflow-hidden"
                  >
                    <div className="p-5 sm:p-7 space-y-6">
                      {/* Top Row: Scene Visual & Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        {/* Scene Visual Container */}
                        <div className="md:col-span-5 rounded-[2px] border border-line bg-bg p-3 flex items-center justify-center overflow-hidden">
                          {getSceneForService(service.illustration)}
                        </div>

                        {/* Title & Promise */}
                        <div className="md:col-span-7 space-y-3">
                          <div className="flex items-center gap-2 font-mono text-[11px] text-red-text">
                            <span>INDEX // 0{idx + 1}</span>
                            <span>•</span>
                            <span>PRODUCTION SPEC</span>
                          </div>

                          <h2 className="font-mono font-bold text-2xl sm:text-3xl text-fg tracking-tight">
                            {service.title}
                          </h2>

                          <p className="font-sans text-fg-muted text-sm sm:text-base leading-relaxed">
                            {service.shortPromise}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-[2px] bg-bg border border-line text-fg-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Outcomes Checklist */}
                      <div className="pt-5 border-t border-line">
                        <span className="font-mono text-[11px] uppercase tracking-mono text-fg-muted block mb-3">
                          Guaranteed Technical Deliverables:
                        </span>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {service.outcomes.map((outcome, oIdx) => (
                            <li
                              key={oIdx}
                              className="flex items-start gap-2.5 text-xs text-fg leading-relaxed p-2.5 rounded-[2px] bg-bg/50 border border-line/60"
                            >
                              <span className="text-red-text shrink-0 font-mono font-bold mt-0.5">
                                [✓]
                              </span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer Link to Module Deep Dive */}
                      <div className="pt-4 border-t border-line flex items-center justify-between font-mono text-xs">
                        <span className="text-fg-muted text-[11px]">
                          STATUS: READY_FOR_DEPLOYMENT
                        </span>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-fg hover:text-red-text transition-colors font-bold uppercase tracking-wider"
                        >
                          <span>Explore Architecture Spec</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </Window>
                </section>
              );
            })}
          </div>
        </div>

        {/* "Not sure what you need?" Bridge Band Opening Estimator */}
        <div className="mt-20 pt-8 border-t border-line max-w-4xl mx-auto w-full">
          <Window
            title="krat.estimator.bridge [CONFIGURATOR_LAUNCH]"
            cornerBrackets
            className="p-6 sm:p-10 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-bg border border-line font-mono text-[11px] text-red-text">
                <span className="w-1.5 h-1.5 rounded-full bg-red" />
                <span>SPECIFICATION ASSISTANT</span>
              </div>

              <h2 className="font-mono font-bold text-2xl sm:text-3xl text-fg tracking-tight">
                Not sure which architecture fits your scope?
              </h2>

              <p className="font-sans text-fg-muted text-sm sm:text-base leading-relaxed">
                Run our 60-second interactive configurator. Select your project goals to generate realistic ballpark pricing, milestone pacing, and a live JSON specification.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <EstimatorButton size="lg" withArrow>
                  Estimate my project
                </EstimatorButton>
                <Link
                  href="/contact"
                  className="font-mono text-xs uppercase px-6 py-3.5 rounded-[2px] border border-line bg-surface hover:border-line-strong text-fg transition-colors"
                >
                  Talk directly with an engineer
                </Link>
              </div>
            </div>
          </Window>
        </div>
      </div>
    </>
  );
}
