import React from "react";
import type { Metadata } from "next";
import {
  MessageCircle,
  Calendar,
  Clock,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { LiveClock } from "@/components/contact/LiveClock";
import { Decode } from "@/components/fx/Decode";
import { Window } from "@/components/ui/Window";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Start a Project | Krat.OS Software Solutions",
  description:
    "Start a conversation with our engineering team. Guaranteed response within 4 business hours. Direct WhatsApp, 15-minute discovery call, or project inquiry form.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Krat.OS Software Solutions",
    description:
      "Get in touch with Krat.OS. No salespeople, no delays. Talk directly with senior engineers.",
    url: "/contact",
  },
};

export default function ContactPage() {
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
            name: "Contact Us",
            item: "https://krat-os.dev/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        name: "Contact Krat.OS Software Solutions",
        description: "Get in touch with Krat.OS via form, WhatsApp, or discovery call.",
        mainEntity: {
          "@type": "Organization",
          name: "Krat.OS Software Solutions",
          email: siteConfig.contact.email,
          telephone: siteConfig.contact.phone,
          url: "https://krat-os.dev",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full font-mono">
        {/* Header Eyebrow & Headline with Live Clock */}
        <header className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-line bg-surface/80 text-xs uppercase tracking-mono text-fg-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-red" />
              <span>/04 — CONTACT // INTAKE_DISPATCH</span>
            </div>
            <LiveClock />
          </div>

          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-fg leading-[1.1] mb-5 tracking-tight">
            <Decode text="Direct access to our senior engineers." />
          </h1>

          <p className="font-sans text-fg-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            No commission sales reps or qualification loops. Talk directly with the engineers designing and building your systems.
          </p>
        </header>

        {/* 2-Column Split: Direct Fast Channels vs. Terminal Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Fast Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* SLA Response Promise Window */}
            <Window
              title="sla_commitment.log [RESPONSE_PROTOCOL]"
              cornerBrackets
              className="p-5 sm:p-6"
            >
              <div className="flex items-center gap-2 text-ok text-[11px] font-bold mb-2">
                <Clock className="w-4 h-4 text-ok" />
                <span>DIRECT RESPONSE COMMITMENT // MON-FRI</span>
              </div>
              <p className="font-sans text-xs text-fg-muted leading-relaxed">
                When you submit a project inquiry, a senior systems engineer reviews your technical requirements and responds directly with concrete next steps.
              </p>
            </Window>

            {/* Fast Channel Cards */}
            <div className="space-y-3">
              {/* WhatsApp Card (Rendered only if configured) */}
              {siteConfig.contact.whatsappNumber && siteConfig.contact.whatsappUrl && (
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-[2px] border border-line hover:border-line-strong bg-surface/90 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[2px] border border-line bg-bg flex items-center justify-center text-ok">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-fg">
                        WhatsApp Quick Channel
                      </h3>
                      <p className="font-sans text-[11px] text-fg-muted">
                        Fastest response for quick scope checks
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-red-text font-bold uppercase flex items-center gap-1">
                    <span>Chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              )}

              {/* Book Call Card (Rendered only if configured) */}
              {siteConfig.contact.bookingUrl && (
                <a
                  href={siteConfig.contact.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-[2px] border border-line hover:border-line-strong bg-surface/90 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[2px] border border-line bg-bg flex items-center justify-center text-red-text">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-fg">
                        Book a 15-Minute Call
                      </h3>
                      <p className="font-sans text-[11px] text-fg-muted">
                        Direct engineering discovery session
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-fg font-bold uppercase flex items-center gap-1 group-hover:text-red-text transition-colors">
                    <span>Schedule</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              )}

              {/* Direct Email Card */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex items-center justify-between p-4 rounded-[2px] border border-line hover:border-line-strong bg-surface/90 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[2px] border border-line bg-bg flex items-center justify-center text-fg">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-fg">
                      Direct Engineering Email
                    </h3>
                    <p className="font-sans text-[11px] text-fg-muted">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-fg font-bold uppercase flex items-center gap-1 group-hover:text-red-text transition-colors">
                  <span>Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Terminal Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
