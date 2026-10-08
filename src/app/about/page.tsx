import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Heart, Shield, Users } from "lucide-react";
import { aboutData } from "@/content/about";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us | Kratos Software Solutions",
  description:
    "Strong underneath. Friendly on top. Learn about our philosophy, engineering standards, and the team building joyful, high-performance software.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Kratos Software Solutions",
    description:
      "Software that feels like a friend, engineered like a tank. No jargon, no bloat, 100% code ownership.",
    url: "/about",
  },
};

export default function AboutPage() {
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
            item: "https://kratos.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: "https://kratos.dev/about",
          },
        ],
      },
      {
        "@type": "AboutPage",
        name: "About Kratos Software Solutions",
        description: aboutData.hero.subhead,
        mainEntity: {
          "@type": "Organization",
          name: "Kratos Software Solutions",
          slogan: siteConfig.positioning,
          url: "https://kratos.dev",
          foundingDate: "2024",
          knowsAbout: [
            "Web Applications",
            "Mobile App Development",
            "AI Workflow Automation",
            "Design Systems",
          ],
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

      <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-peach">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>{aboutData.hero.eyebrow}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
            {aboutData.hero.headline}
          </h1>

          <p className="font-sans text-ink-soft text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {aboutData.hero.subhead}
          </p>
        </header>

        {/* Section 1: The Philosophy — Strong Underneath, Friendly On Top */}
        <section aria-label="Brand Philosophy" className="mb-24">
          <div className="rounded-[36px] bg-peach/50 border-2 border-orange/40 p-8 sm:p-12 md:p-16">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-deep block mb-3">
                Our Manifesto
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-6">
                {aboutData.story.title}
              </h2>
              <div className="space-y-4 text-ink/90 text-base sm:text-lg leading-relaxed">
                {aboutData.story.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Visual Comparison Pill Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 pt-10 border-t border-peach/80">
              <div className="p-6 rounded-[28px] bg-cocoa text-cream">
                <div className="flex items-center gap-2.5 mb-3 text-orange">
                  <Shield className="w-5 h-5" />
                  <span className="font-display font-bold text-lg">
                    Strong Underneath
                  </span>
                </div>
                <p className="text-cream/80 text-sm leading-relaxed">
                  Strict TypeScript, zero runtime vulnerabilities, sub-second edge responses, automated CI/CD tests, and private GitHub codebases that you own 100%.
                </p>
              </div>

              <div className="p-6 rounded-[28px] bg-orange text-ink">
                <div className="flex items-center gap-2.5 mb-3 text-ink">
                  <Heart className="w-5 h-5 stroke-[2.5]" />
                  <span className="font-display font-bold text-lg">
                    Friendly On Top
                  </span>
                </div>
                <p className="text-ink/90 text-sm leading-relaxed">
                  Fat bubbly shapes, warm sunny palettes, clear plain-English communication, micro-squish interactions, and zero condescending tech talk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Working Principles */}
        <section aria-label="Working Principles" className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-3">
              How we work with you
            </h2>
            <p className="text-ink-soft text-base">
              Four commitments that govern every line of code and every client conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aboutData.principles.map((p) => (
              <div
                key={p.number}
                className="p-7 sm:p-8 rounded-[32px] bg-peach/40 border-2 border-peach/80 hover:border-orange/50 transition-colors"
              >
                <span className="font-display font-bold text-3xl text-orange mb-2 block">
                  {p.number}
                </span>
                <h3 className="font-display font-semibold text-xl text-ink mb-1">
                  {p.title}
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-deep block mb-3">
                  {p.tagline}
                </span>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: The Team */}
        <section aria-label="Our Team" className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-peach text-ink text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5 text-orange" />
              <span>Core Builders</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-3">
              The humans behind the screens
            </h2>
            <p className="text-ink-soft text-base">
              A tight-knit crew of senior product engineers and designers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.team.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-[32px] bg-peach/40 border border-peach/80 text-center flex flex-col items-center hover:bg-peach/60 transition-colors"
              >
                {/* Circular Portrait Mask */}
                <div
                  className="w-24 h-24 rounded-full border-4 border-cream flex items-center justify-center text-ink font-display font-bold text-2xl shadow-sm mb-4"
                  style={{ backgroundColor: member.avatarBg }}
                >
                  {member.name
                    .replace("[PLACEHOLDER] ", "")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <h3 className="font-display font-semibold text-lg text-ink mb-1">
                  {member.name.replace("[PLACEHOLDER] ", "")}
                </h3>
                <span className="text-xs font-bold text-orange-deep mb-3 block">
                  {member.role}
                </span>
                <p className="text-ink-soft text-xs leading-relaxed mb-4">
                  {member.bio}
                </p>
                <span className="mt-auto px-3 py-1 rounded-full bg-cream text-ink text-[11px] font-semibold border border-peach/60">
                  {member.specialty}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          aria-label="Start working together"
          className="rounded-[36px] bg-orange p-8 sm:p-12 text-center text-ink flex flex-col items-center shadow-md"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-4 max-w-xl">
            Let&apos;s build something delightful together.
          </h2>
          <p className="text-ink/80 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
            Ready to experience software development without the headache? Calculate your ballpark or drop us a note.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <EstimatorButton
              size="lg"
              variant="secondary"
              className="bg-cream hover:bg-cream/90 text-ink"
            >
              Estimate My Project
            </EstimatorButton>
            <Link
              href="/contact"
              className="px-6 py-4 rounded-full bg-ink text-cream font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Say Hello
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
