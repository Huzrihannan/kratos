import React from "react";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
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
      <div className="w-full min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center py-6 sm:py-12 px-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-peach">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>{"// project estimator"}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-3">
            Estimate your project in 60 seconds.
          </h1>
          <p className="font-sans text-ink-soft text-base sm:text-lg">
            Transparent ballparks, realistic sprint timelines, and zero sales pressure.
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <EstimatorWizard isModal={false} />
        </div>
      </div>
    </>
  );
}
