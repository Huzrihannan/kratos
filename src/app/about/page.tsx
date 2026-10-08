import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { aboutData } from "@/content/about";
import { isPublishable } from "@/lib/content-status";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";
import { Decode } from "@/components/fx/Decode";
import { Window } from "@/components/ui/Window";
import { GitLogTimeline } from "@/components/about/GitLogTimeline";
import { ContributorCard } from "@/components/about/ContributorCard";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us | Krat.OS Software Solutions",
  description:
    "Software that runs your business, engineered like a machine. Learn about our philosophy, engineering standards, and the team building high-performance systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Krat.OS Software Solutions",
    description:
      "Software engineered with mechanical precision. No jargon, no bloat, 100% code ownership.",
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
            item: "https://krat-os.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: "https://krat-os.dev/about",
          },
        ],
      },
      {
        "@type": "AboutPage",
        name: "About Krat.OS Software Solutions",
        description: aboutData.hero.subhead,
        mainEntity: {
          "@type": "Organization",
          name: "Krat.OS Software Solutions",
          slogan: siteConfig.positioning,
          url: "https://krat-os.dev",
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

      <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full font-mono">
        {/* Header Eyebrow & Display Headline */}
        <header className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-line bg-surface/80 text-xs uppercase tracking-mono text-fg-muted mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            <span>/03 — ABOUT // SYSTEM_PHILOSOPHY</span>
          </div>

          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-fg leading-[1.1] mb-5 tracking-tight">
            <Decode text={aboutData.hero.headline} />
          </h1>

          <p className="font-sans text-fg-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {aboutData.hero.subhead}
          </p>
        </header>

        {/* Section 1: The Story Typed as a README.md */}
        <section aria-label="Company Story" className="mb-16 sm:mb-20">
          <Window
            title="README.md [RAW_PREVIEW]"
            cornerBrackets
            headerRight={
              <div className="flex items-center gap-2 text-[10px] text-fg-muted">
                <span>COMMIT: 9d421b</span>
                <span>•</span>
                <span className="text-ok">BRANCH: MAIN</span>
              </div>
            }
            className="p-6 sm:p-10"
          >
            <div className="space-y-6">
              <div className="border-b border-line pb-4">
                <span className="text-[11px] text-red-text font-bold block mb-1">
                  # KRAT.OS SOFTWARE SOLUTIONS
                </span>
                <p className="font-sans text-sm text-fg-muted italic">
                  &gt; High-performance digital systems engineered with mechanical precision.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-fg mb-4">
                  ## {aboutData.story.title}
                </h2>
                <div className="space-y-4 font-sans text-sm sm:text-base text-fg/90 leading-relaxed">
                  {aboutData.story.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-line font-mono text-xs text-fg-muted flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span>LICENSE: MIT (CLIENT_OWNED)</span>
                  <span>•</span>
                  <span>DEPENDENCIES: ZERO_BLOAT</span>
                </div>
                <span className="text-ok">[ALL_CHECKS_PASSED]</span>
              </div>
            </div>
          </Window>
        </section>

        {/* Section 2: Core Values as an Engineering Checklist */}
        <section aria-label="Core Engineering Values" className="mb-16 sm:mb-20">
          <Window
            title="system_invariants.chk [CORE_VALUES]"
            className="p-6 sm:p-8"
          >
            <div className="mb-6">
              <span className="text-[11px] text-red-text uppercase tracking-mono block mb-1">
                {"// SYSTEM INVARIANTS"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-fg">
                Non-Negotiable Engineering Standards
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-[2px] bg-bg border border-line flex items-start gap-3">
                <span className="text-ok font-bold">[ok]</span>
                <div>
                  <h3 className="font-bold text-fg mb-1">100% Client Code Ownership</h3>
                  <p className="font-sans text-fg-muted leading-relaxed">
                    Every commit is pushed directly to your private GitHub organization. Zero proprietary runtime locks or hosting extortion.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-[2px] bg-bg border border-line flex items-start gap-3">
                <span className="text-ok font-bold">[ok]</span>
                <div>
                  <h3 className="font-bold text-fg mb-1">Strict TypeScript Typing</h3>
                  <p className="font-sans text-fg-muted leading-relaxed">
                    Zero sloppy type assertions or wildcard types. Complete type safety from the database schema up to the client UI.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-[2px] bg-bg border border-line flex items-start gap-3">
                <span className="text-ok font-bold">[ok]</span>
                <div>
                  <h3 className="font-bold text-fg mb-1">Working Software Every Friday</h3>
                  <p className="font-sans text-fg-muted leading-relaxed">
                    No three-month black box silences. You receive private staging preview links at the end of every week to test on real devices.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-[2px] bg-bg border border-line flex items-start gap-3">
                <span className="text-ok font-bold">[ok]</span>
                <div>
                  <h3 className="font-bold text-fg mb-1">Direct Senior Communication</h3>
                  <p className="font-sans text-fg-muted leading-relaxed">
                    You talk and collaborate directly with the senior engineers building your application. No agency account managers playing telephone.
                  </p>
                </div>
              </div>
            </div>
          </Window>
        </section>

        {/* Section 3: Git Log Timeline */}
        <section aria-label="Version Timeline" className="mb-16 sm:mb-20">
          <div className="mb-4 flex items-center justify-between text-xs text-fg-muted uppercase tracking-mono">
            <span>[VERSION_HISTORY]</span>
            <span>REPOSITORY COMMIT GRAPH</span>
          </div>
          <GitLogTimeline />
        </section>

        {/* Section 4: Team as Contributors (Rendered when team profiles are published) */}
        {aboutData.team.filter(isPublishable).length > 0 && (
          <section aria-label="Team Contributors" className="mb-16 sm:mb-20">
            <div className="mb-4 flex items-center justify-between text-xs text-fg-muted uppercase tracking-mono">
              <span>[CONTRIBUTORS]</span>
              <span>CORE REPOSITORY MAINTAINERS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutData.team.filter(isPublishable).map((member) => (
                <ContributorCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Working Principles */}
        <section aria-label="Working Principles" className="mb-16 sm:mb-20">
          <div className="mb-4 flex items-center justify-between text-xs text-fg-muted uppercase tracking-mono">
            <span>[OPERATING_PRINCIPLES]</span>
            <span>4 SPRINT PRINCIPLES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.principles.map((p) => (
              <Window
                key={p.number}
                title={`principle_0${p.number}.sh`}
                className="p-6"
              >
                <div className="flex items-center justify-between text-[11px] text-red-text mb-2">
                  <span>RULE // {p.number}</span>
                  <span className="text-fg-muted uppercase">{p.tagline}</span>
                </div>
                <h3 className="text-lg font-bold text-fg mb-2">
                  {p.title}
                </h3>
                <p className="font-sans text-xs text-fg-muted leading-relaxed">
                  {p.description}
                </p>
              </Window>
            ))}
          </div>
        </section>

        {/* Section 6: Final CTA */}
        <section aria-label="Start project">
          <Window
            title="start_collaboration.sh [INITIATE]"
            cornerBrackets
            className="p-6 sm:p-10 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-bg border border-line text-[11px] text-ok">
                <span className="w-1.5 h-1.5 rounded-full bg-ok" />
                <span>ACCEPTING NEW WORK</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
                Want to build your next system with us?
              </h2>

              <p className="font-sans text-fg-muted text-sm sm:text-base leading-relaxed">
                Configure your project requirements in 60 seconds or reach out to our team directly.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <EstimatorButton size="lg" withArrow>
                  Estimate my project
                </EstimatorButton>
                <Link
                  href="/contact"
                  className="text-xs uppercase px-6 py-3.5 rounded-[2px] border border-line bg-surface hover:border-line-strong text-fg transition-colors"
                >
                  Contact our engineers
                </Link>
              </div>
            </div>
          </Window>
        </section>
      </div>
    </>
  );
}
