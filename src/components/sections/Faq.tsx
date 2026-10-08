"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { faqsData } from "@/content/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";
import { useLayoutModal } from "@/lib/modal-context";

export function Faq() {
  const prefersReducedMotion = useReducedMotion();
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
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full select-none"
    >
      {/* Schema.org FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-peach"
        >
          <HelpCircle className="w-3.5 h-3.5 text-orange" />
          <span>common questions</span>
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.08 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight leading-[1.12]"
        >
          Clear answers.&nbsp;
          <br className="hidden sm:inline" />
          <span className="text-ink underline decoration-orange decoration-wavy underline-offset-4">Zero fine print.</span>
        </motion.h2>

        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.15 }}
          className="font-body text-ink-soft text-base sm:text-lg md:text-xl mt-4 leading-relaxed max-w-2xl mx-auto"
        >
          Everything you need to know about pricing, intellectual property, timelines,
          and how we work together.
        </motion.p>
      </div>

      {/* Accordion List */}
      <div className="mb-14">
        <Accordion items={faqsData} defaultOpenId="cost" />
      </div>

      {/* Secondary Objection CTA Card */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="p-8 sm:p-10 rounded-[36px] bg-peach/40 border-2 border-orange/20 text-center flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="text-left">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-ink mb-1">
            Have a question not listed here?
          </h3>
          <p className="font-body text-ink-soft text-sm sm:text-base">
            Reach out directly or test your project requirements in our estimator.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              openEstimator();
            }}
            withArrow
          >
            Open estimator
          </Button>

          <Button
            variant="ghost"
            size="md"
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            withArrow={false}
            className="border-ink/20 hover:border-ink"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Chat on WhatsApp</span>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
