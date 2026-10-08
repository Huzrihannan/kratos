import React from "react";
import type { Metadata } from "next";
import {
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Sparkles,
  MapPin,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
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

      <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-5 border border-peach">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>{"// get in touch"}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
            Let&apos;s talk about what you want to build.
          </h1>

          <p className="font-sans text-ink-soft text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            You&apos;ll speak directly with our senior engineers—no commission salespeople or endless qualification loops.
          </p>
        </div>

        {/* 2-Column Split: Direct Channels vs. Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Fast Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Response Promise Card */}
            <div className="p-7 rounded-[32px] bg-peach/50 border-2 border-orange/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center text-ink shadow-sm">
                  <Clock className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-ink">
                    4-Hour Response Promise
                  </h2>
                  <span className="text-xs text-ink-soft">
                    During business hours (Mon–Fri)
                  </span>
                </div>
              </div>
              <p className="text-ink-soft text-sm leading-relaxed">
                We know how frustrating it is to submit a form into an agency void. When you contact us, an engineer reviews your requirements and responds with actionable next steps within 4 hours.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
              {/* WhatsApp Card */}
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-[28px] bg-peach/30 hover:bg-[#25D366]/15 border-2 border-peach/70 hover:border-[#25D366]/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-ink">
                      WhatsApp Quick Chat
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Fastest response for urgent questions
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink-soft group-hover:text-ink">
                  Chat Now →
                </span>
              </a>

              {/* Book Call Card */}
              <a
                href={siteConfig.contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-[28px] bg-peach/30 hover:bg-orange/20 border-2 border-peach/70 hover:border-orange/60 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange text-ink flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Calendar className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-ink">
                      Book a 15-Min Call
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Pick a slot on our engineer&apos;s calendar
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink-soft group-hover:text-ink">
                  Select Time →
                </span>
              </a>

              {/* Direct Email Card */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex items-center justify-between p-6 rounded-[28px] bg-peach/30 hover:bg-peach/60 border-2 border-peach/70 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream text-ink flex items-center justify-center border border-peach shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-ink">
                      Direct Email
                    </h3>
                    <p className="text-xs text-ink-soft">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink-soft group-hover:text-ink">
                  Send Email →
                </span>
              </a>
            </div>

            {/* Office / Location Pill */}
            <div className="flex items-center gap-3 p-5 rounded-[24px] bg-cream/70 border border-peach/60 text-ink-soft text-xs">
              <MapPin className="w-4 h-4 text-orange-deep shrink-0" />
              <span>{siteConfig.contact.location}</span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
