"use client";

import React, { useRef, useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Decode } from "@/components/fx/Decode";
import { stackRowOne, stackRowTwo } from "@/content/stack";
import { StackTag } from "./stack/StackTag";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useLayoutModal } from "@/lib/modal-context";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/themes/ThemeProvider";
import { SeedShedScene } from "@/themes/dream/scenes/SeedShedScene";

export function StackMarquee() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlaying = useInViewPlayback(containerRef);
  const { isOff } = useMotionLevel();
  const { openEstimator } = useLayoutModal();

  const isDream = theme === "dream";

  const [velocityFactor, setVelocityFactor] = useState(1);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  // Velocity boost reacting to scroll speed
  useEffect(() => {
    if (isOff || typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;

    function handleScroll() {
      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastScrollY.current);
      const deltaTime = Math.max(now - lastScrollTime.current, 16);

      const velocity = deltaY / deltaTime; // px/ms
      const factor = Math.min(1 + velocity * 1.8, 3.2);
      setVelocityFactor(factor);

      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVelocityFactor(1);
      }, 180);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isOff]);

  const baseSpeedRow1 = 36;
  const baseSpeedRow2 = 40;
  const durationRow1 = `${Math.max(baseSpeedRow1 / velocityFactor, 8)}s`;
  const durationRow2 = `${Math.max(baseSpeedRow2 / velocityFactor, 9)}s`;

  return (
    <Section
      id="stack"
      eyebrow={isDream ? "The Seed Shed" : "/05 — STACK"}
      headline={
        isDream ? (
          <span className="font-serif font-semibold text-[var(--dream-ink,#2B2A52)]">
            Tools we trust
          </span>
        ) : (
          <span>
            Tools we <Decode text="trust" speed={40} delay={200} />
          </span>
        )
      }
      description={
        isDream
          ? "Every technology we plant is chosen for stability, speed, and long-term care. Tap or hover a seed packet to see what it does for your product."
          : "Proven technical foundations with strict type safety, zero legacy bloat, and long-term production stability. Hover any tool to inspect its architecture layer."
      }
      hud={
        isDream ? (
          <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)]">
            Twenty seeds in the potting shed
          </span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted/80">
            CORE_STACK: 20_NODES
          </span>
        )
      }
      className="overflow-hidden"
    >
      {isDream ? (
        <SeedShedScene />
      ) : (
        <div ref={containerRef} className="space-y-6 pt-4 pb-12 select-none">
          {/* ROW 1: Frontend & Mobile (Moving Left) */}
          <div className="relative w-full overflow-hidden py-1">
            <div
              className={cn(
                "flex w-max shrink-0 items-center gap-4 will-change-transform",
                isPlaying && !isOff && "animate-marquee-left",
                "hover:[animation-play-state:paused]"
              )}
              style={{
                animationDuration: isOff ? "0s" : durationRow1,
              }}
            >
              {stackRowOne.map((item) => (
                <StackTag
                  key={`r1-1-${item.name}`}
                  name={item.name}
                  category={item.category}
                  tag={item.tag}
                />
              ))}
              {stackRowOne.map((item) => (
                <StackTag
                  key={`r1-2-${item.name}`}
                  name={item.name}
                  category={item.category}
                  tag={item.tag}
                />
              ))}
              {stackRowOne.map((item) => (
                <StackTag
                  key={`r1-3-${item.name}`}
                  name={item.name}
                  category={item.category}
                  tag={item.tag}
                />
              ))}
            </div>
          </div>

          {/* ROW 2: Backend, Cloud & Database (Moving Right) */}
          <div className="relative w-full overflow-hidden py-1">
            <div
              className={cn(
                "flex w-max shrink-0 items-center gap-4 will-change-transform",
                isPlaying && !isOff && "animate-marquee-right",
                "hover:[animation-play-state:paused]"
              )}
              style={{
                animationDuration: isOff ? "0s" : durationRow2,
              }}
            >
              {stackRowTwo.map((item) => (
                <StackTag
                  key={`r2-1-${item.name}`}
                  name={item.name}
                  category={item.category}
                  tag={item.tag}
                />
              ))}
              {stackRowTwo.map((item) => (
                <StackTag
                  key={`r2-2-${item.name}`}
                  name={item.name}
                  category={item.category}
                  tag={item.tag}
                />
              ))}
              {stackRowTwo.map((item) => (
                <StackTag
                  key={`r2-3-${item.name}`}
                  name={item.name}
                  category={item.category}
                  tag={item.tag}
                />
              ))}
            </div>
          </div>

          {/* Estimator Bridge Banner */}
          <div className="mt-10 p-4 sm:p-5 border border-line bg-surface/50 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-ok shrink-0 shadow-[0_0_6px_var(--ok)]" />
              <span className="font-mono text-xs sm:text-sm text-fg-muted">
                Have existing infrastructure or specific stack constraints?
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
              Configure stack requirements
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
