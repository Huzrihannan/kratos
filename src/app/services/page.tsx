import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  ShoppingBag,
  Cpu,
  Palette,
  ShieldCheck,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/content/services";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";

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
      "Web apps, mobile apps, and pragmatic AI automations built strong underneath, friendly on top.",
    url: "/services",
  },
};

export default function ServicesPage() {
  const getServiceIcon = (iconName: ServiceItem["iconName"]) => {
    const iconClass = "w-6 h-6 stroke-[2.2] text-ink";
    switch (iconName) {
      case "Globe":
        return <Globe className={iconClass} />;
      case "Smartphone":
        return <Smartphone className={iconClass} />;
      case "ShoppingBag":
        return <ShoppingBag className={iconClass} />;
      case "Cpu":
        return <Cpu className={iconClass} />;
      case "Palette":
        return <Palette className={iconClass} />;
      case "ShieldCheck":
        return <ShieldCheck className={iconClass} />;
    }
  };

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

      <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Breadcrumb & Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-5 border border-peach">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>{"// what we build"}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
            Software built with purpose, delivered without drama.
          </h1>

          <p className="font-sans text-ink-soft text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            From zero-latency SaaS platforms to playful mobile experiences, we pair rock-solid technical architectures with joyful interfaces.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {servicesData.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col justify-between rounded-[32px] bg-peach/40 hover:bg-peach/70 border-2 border-peach/80 hover:border-orange/60 p-7 sm:p-9 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                {/* Top strip with Icon & Timeframe */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream text-ink text-xs font-bold uppercase tracking-wider border border-peach/60">
                    <Clock className="w-3 h-3 text-orange" />
                    {service.timeframe}
                  </span>
                </div>

                {/* Title & Promise */}
                <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-3 group-hover:text-orange-deep transition-colors">
                  {service.title}
                </h2>
                <p className="text-ink-soft text-base leading-relaxed mb-6">
                  {service.shortPromise}
                </p>

                {/* Outcomes Checklist */}
                <ul className="space-y-3 mb-8">
                  {service.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-ink/90 font-medium leading-snug">
                      <span className="w-5 h-5 rounded-full bg-orange/30 text-ink-soft flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-ink stroke-[2.5]" />
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-cream text-ink-soft text-xs font-semibold border border-peach/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-5 border-t border-peach/80 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="font-display font-semibold text-base text-ink group-hover:text-orange-deep inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep rounded-full px-1"
                >
                  <span>Explore {service.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <div className="w-9 h-9 rounded-full bg-cream text-ink flex items-center justify-center border border-peach group-hover:bg-orange transition-colors">
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* "Not sure what you need?" Band */}
        <section
          aria-label="Need guidance?"
          className="relative rounded-[36px] bg-peach/80 border-2 border-orange/40 p-8 sm:p-12 md:p-16 overflow-hidden text-center max-w-4xl mx-auto shadow-sm"
        >
          {/* Decorative Background Blob Accents */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-orange/20 filter blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-butter/30 filter blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-orange flex items-center justify-center text-ink mb-6 shadow-sm">
              <HelpCircle className="w-7 h-7 stroke-[2.5]" />
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-4">
              Not sure which service fits your project?
            </h2>

            <p className="text-ink-soft text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Answer 5 quick, bubble-picker questions in our interactive Project Estimator. You will get an instant ballpark investment range and a recommended scope in 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <EstimatorButton size="lg" withArrow={true}>
                Try Project Estimator
              </EstimatorButton>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full bg-cream text-ink font-semibold text-sm hover:bg-peach border border-peach transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
              >
                Or message us directly
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
