"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { Window } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useLayoutModal } from "@/lib/modal-context";
import {
  ChatStreamScene,
  ScopeChecklistScene,
  HeartbeatScene,
} from "./principles-scenes";

export function Principles() {
  const { openEstimator } = useLayoutModal();

  const principlesData = [
    {
      id: "direct-engineers",
      windowTitle: "principle_01.comms",
      badge: "[NO_MIDDLEMEN]",
      title: "[PLACEHOLDER] Talk directly to the engineers building your code",
      shortSummary:
        "Zero account-manager telephone games. When you have a product question, you discuss architecture directly with senior engineers.",
      scene: <ChatStreamScene />,
      bullets: [
        "Dedicated shared Slack or Discord channel",
        "Weekly working demo videos and sprint check-ins",
        "Async updates that respect your calendar",
      ],
      colSpan: "lg:col-span-6",
    },
    {
      id: "fixed-scope",
      windowTitle: "principle_02.scope",
      badge: "[FIXED_MILESTONES]",
      title: "[PLACEHOLDER] Fixed milestones, zero surprise bills",
      shortSummary:
        "We scope projects down to concrete milestones before starting. What we quote is what you invest—guaranteed.",
      scene: <ScopeChecklistScene />,
      bullets: [
        "Transparent milestone payment schedule",
        "Free scope trade-offs during active sprints",
        "100% IP ownership and keys from day one",
      ],
      colSpan: "lg:col-span-6",
    },
    {
      id: "post-launch",
      windowTitle: "principle_03.warranty",
      badge: "[POST_LAUNCH_SLA]",
      title: "[PLACEHOLDER] We stay in your corner after launch",
      shortSummary:
        "Shipping is just day one. We include 30 days of complimentary bug warranty and offer flexible monthly engineering retainers.",
      scene: <HeartbeatScene />,
      bullets: [
        "30-day comprehensive bug warranty included with every build",
        "Proactive telemetry, edge cache, and uptime monitoring",
        "Direct on-call engineer access for critical production hotfixes",
      ],
      colSpan: "lg:col-span-12",
    },
  ];

  return (
    <Section
      id="why"
      eyebrow="/06 — PRINCIPLES"
      headline={
        <span>
          Why <span className="text-red-text">Krat.OS</span>
        </span>
      }
      description="The traditional agency model is full of bloated overhead, junior outsourcing, and surprise billing. Here is how our engineering team operates differently."
      hud={
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted/80">
          PRINCIPLES: 03_ENFORCED
        </span>
      }
    >
      {/* Bento Grid of 3 OS Windows */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-4 pb-12">
        {principlesData.map((item, idx) => (
          <div key={item.id} className={item.colSpan}>
            <Window
              title={item.windowTitle}
              statusText={item.badge}
              cornerBrackets={true}
              className="h-full flex flex-col justify-between border-line bg-surface/90 hover:border-line-strong transition-colors"
            >
              <div className="space-y-5">
                {/* Micro-animation scene container */}
                <div className="w-full">{item.scene}</div>

                {/* Title & Summary */}
                <div>
                  <h3 className="font-mono text-base sm:text-lg md:text-xl font-bold text-fg mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-fg-muted leading-relaxed">
                    {item.shortSummary}
                  </p>
                </div>

                {/* 3 Bullets with '+' icon */}
                <div className="space-y-2 pt-3 border-t border-line/50">
                  {item.bullets.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs font-mono text-fg-muted leading-snug"
                    >
                      <Plus className="h-3.5 w-3.5 text-red-text shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status footer inside window */}
              <div className="pt-4 mt-6 border-t border-line/50 flex items-center justify-between font-mono text-[11px] text-fg-muted">
                <span>SYSTEM_POLICY_0{idx + 1}</span>
                <span className="text-ok font-bold">[ACTIVE]</span>
              </div>
            </Window>
          </div>
        ))}
      </div>

      {/* Estimator Bridge Banner */}
      <div className="p-4 sm:p-5 border border-line bg-surface/50 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-ok shrink-0 shadow-[0_0_6px_var(--ok)]" />
          <span className="font-mono text-xs sm:text-sm text-fg-muted">
            Ready to plan your roadmap directly with senior engineers?
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            openEstimator();
          }}
          withArrow
          className="w-full sm:w-auto text-xs font-mono border-line hover:border-line-strong hover:bg-surface"
        >
          Open project estimator
        </Button>
      </div>
    </Section>
  );
}
