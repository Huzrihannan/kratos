"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { Decode } from "@/components/fx/Decode";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { faqsData } from "@/content/faqs";
import { siteConfig } from "@/content/site";
import { useLayoutModal } from "@/lib/modal-context";
import { MessageSquare } from "lucide-react";

export function Faq() {
  const { openEstimator } = useLayoutModal();

  // Structured Data Schema.org FAQPage for Google SEO rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Section
      id="faq"
      eyebrow="/07 — FAQ"
      headline={
        <span>
          Direct <Decode text="answers" speed={40} delay={200} />
        </span>
      }
      description="Seven upfront answers to the most common questions about pricing, timelines, intellectual property, and communication. Zero fine print."
      hud={
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted/80">
          FAQ_COUNT: 07_VERIFIED
        </span>
      }
    >
      {/* Schema.org FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Accordion Component */}
      <div className="max-w-4xl mx-auto pt-2 pb-12">
        <Accordion items={faqsData} defaultOpenId="cost" />
      </div>

      {/* Secondary Bridge Card */}
      <div className="p-6 sm:p-8 border border-line bg-surface/60 rounded-[2px] max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-1">
          <h3 className="font-mono text-base sm:text-lg font-bold text-fg">
            Have a question not listed here?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-fg-muted">
            Configure your technical scope in our interactive estimator or talk directly with our engineering founders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
          <Button
            variant="primary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              openEstimator();
            }}
            withArrow
            className="w-full sm:w-auto font-mono text-xs uppercase"
          >
            Estimate my project
          </Button>

          {siteConfig.contact.whatsappUrl ? (
            <Button
              variant="ghost"
              size="md"
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              withArrow={false}
              className="w-full sm:w-auto font-mono text-xs uppercase border-line hover:border-line-strong"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-2 text-ok" />
              <span>Chat on WhatsApp</span>
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
