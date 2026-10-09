"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Window } from "@/components/ui/Window";
import { Tilt } from "@/components/fx/Tilt";
import { Button } from "@/components/ui/Button";
import { Decode } from "@/components/fx/Decode";
import { servicesData } from "@/content/services";
import dynamic from "next/dynamic";
import { useLayoutModal } from "@/lib/modal-context";

const WebAppScene = dynamic(
  () => import("./scenes/WebAppScene").then((m) => m.WebAppScene),
  { ssr: false }
);
const MobileAppScene = dynamic(
  () => import("./scenes/MobileAppScene").then((m) => m.MobileAppScene),
  { ssr: false }
);
const EcommerceScene = dynamic(
  () => import("./scenes/EcommerceScene").then((m) => m.EcommerceScene),
  { ssr: false }
);
const AutomationScene = dynamic(
  () => import("./scenes/AutomationScene").then((m) => m.AutomationScene),
  { ssr: false }
);
const DesignScene = dynamic(
  () => import("./scenes/DesignScene").then((m) => m.DesignScene),
  { ssr: false }
);
const SupportScene = dynamic(
  () => import("./scenes/SupportScene").then((m) => m.SupportScene),
  { ssr: false }
);

import { useTheme } from "@/themes/ThemeProvider";
import { ServiceFlowerCard } from "@/themes/dream/scenes/ServiceFlowerCard";
import { Poppy } from "@/themes/dream/art/flowers/Poppy";

const MODULE_TITLES: Record<string, string> = {
  "web-apps": "module_01.web",
  "mobile-apps": "module_02.mobile",
  "ecommerce": "module_03.ecommerce",
  "ai-automation": "module_04.automation",
  "ui-ux-design": "module_05.design",
  "maintenance-support": "module_06.support",
};

export function Services() {
  const { theme } = useTheme();
  const { openEstimator } = useLayoutModal();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isDream = theme === "dream";

  const renderScene = (id: string, isHovered: boolean) => {
    switch (id) {
      case "web-apps":
        return <WebAppScene isHovered={isHovered} />;
      case "mobile-apps":
        return <MobileAppScene isHovered={isHovered} />;
      case "ecommerce":
        return <EcommerceScene isHovered={isHovered} />;
      case "ai-automation":
        return <AutomationScene isHovered={isHovered} />;
      case "ui-ux-design":
        return <DesignScene isHovered={isHovered} />;
      case "maintenance-support":
        return <SupportScene isHovered={isHovered} />;
      default:
        return <WebAppScene isHovered={isHovered} />;
    }
  };

  return (
    <Section
      id="services"
      eyebrow={isDream ? "The Garden" : "/01 — MODULES"}
      headline={
        isDream ? (
          <span className="font-serif font-semibold text-[var(--dream-ink,#2B2A52)]">
            What we build
          </span>
        ) : (
          <span>
            What we <Decode text="build" speed={40} delay={200} />
          </span>
        )
      }
      description="Six core engineering modules. Modular architecture, strict TypeScript, zero technical debt. Built to deploy fast and stay maintainable for years."
      hud={
        isDream ? (
          <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)]">
            Six flowers in bloom
          </span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted/80">
            CATALOG: 06_ACTIVE
          </span>
        )
      }
    >
      {/* 6 Modules Grid (3 columns on desktop, 1 on mobile) */}
      {isDream ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4 pb-12">
          {servicesData.map((service, index) => (
            <ServiceFlowerCard key={service.id} service={service} index={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4 pb-12">
          {servicesData.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const moduleTitle = MODULE_TITLES[service.id] || `module_0${index + 1}.sys`;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="h-full"
              >
                <Tilt maxTilt={4} glare={true} className="h-full">
                  <Window
                    title={moduleTitle}
                    statusText={`[0${index + 1}]`}
                    cornerBrackets={true}
                    className="h-full flex flex-col justify-between border-line bg-surface/90 hover:border-line-strong transition-colors"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Inline SVG Motion Scene */}
                      <div className="w-full bg-bg/50 border border-line/60 rounded-[2px] p-2 overflow-hidden">
                        {renderScene(service.id, isHovered)}
                      </div>

                      {/* Title & One-Line Promise */}
                      <div>
                        <h3 className="font-mono text-base sm:text-lg font-bold text-fg mb-1.5 flex items-center gap-2">
                          <span>{service.title}</span>
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-fg-muted leading-relaxed">
                          {service.shortPromise}
                        </p>
                      </div>

                      {/* 3 Outcomes marked with '+' lines */}
                      <div className="space-y-1.5 pt-2 border-t border-line/50">
                        {service.outcomes.map((outcome, oIdx) => (
                          <div
                            key={oIdx}
                            className="flex items-start gap-2 text-[11px] sm:text-xs font-mono text-fg-muted leading-snug"
                          >
                            <Plus className="h-3 w-3 text-red-text shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Open Module Action Link */}
                    <div className="pt-6 mt-4 border-t border-line/50 flex items-center justify-between">
                      <Link
                        href={`/services/${service.slug}`}
                        data-cursor="open"
                        className="group/link inline-flex items-center gap-2 py-2 min-h-[44px] font-mono text-xs uppercase tracking-wider text-fg font-semibold hover:text-red-text transition-colors"
                      >
                        <span>Open module</span>
                        <ArrowRight className="h-3.5 w-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>

                      <span className="font-mono text-[10px] text-fg-muted/60 uppercase tracking-widest">
                        {service.timeframe}
                      </span>
                    </div>
                  </Window>
                </Tilt>
              </div>
            );
          })}
        </div>
      )}

      {/* Estimator Bridge Banner */}
      {isDream ? (
        <div className="w-full rounded-[32px] border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_12px_32px_rgba(43,42,82,0.06)]">
          <div className="space-y-1.5 max-w-2xl">
            <div className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
              <span>Planted with care</span>
            </div>
            <div className="font-serif text-lg sm:text-xl font-bold text-[var(--dream-ink,#2B2A52)]">
              Need a tailored garden planned for your business?
            </div>
            <p className="font-sans text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed">
              Explore capabilities, scope, and target timelines in under two minutes with our interactive planner.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={openEstimator}
            className="shrink-0 rounded-full px-6 py-2.5 text-xs font-semibold shadow-sm flex items-center gap-2 bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] hover:bg-[#38376B] transition-all"
          >
            <Poppy state="bloom" size={16} />
            <span>Estimate my project</span>
          </Button>
        </div>
      ) : (
        <div className="w-full border border-line bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-mono text-xs uppercase tracking-wider text-red-text font-semibold">
              [ ESTIMATION_ENGINE ]
            </div>
            <div className="font-mono text-sm sm:text-base font-bold text-fg">
              Need a tailored architecture for your specific business requirements?
            </div>
            <p className="font-sans text-xs sm:text-sm text-fg-muted">
              Configure your technical modules, scope, and target timeframe in under 2 minutes.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={openEstimator}
            className="shrink-0"
          >
            Configure project
          </Button>
        </div>
      )}
    </Section>
  );
}
