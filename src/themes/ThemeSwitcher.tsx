"use client";

import React, { useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { THEMES, THEME_IDS, ThemeId, ThemeIcon } from "./registry";
import { useCloudWipe } from "./CloudWipe";
import { useMotionLevel } from "@/lib/motion/MotionContext";

/**
 * 1. Desktop Nav Segmented Radiogroup
 */
export function ThemeSwitcherNav({ className = "" }: { className?: string }) {
  const { theme, setTheme, isDreamTried } = useTheme();
  const { triggerWipe } = useCloudWipe();
  const { level, setLevel } = useMotionLevel();
  const [showDreamOptions, setShowDreamOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (next: ThemeId) => {
    if (next === theme) {
      if (theme === "dream") {
        setShowDreamOptions((prev) => !prev);
      }
      return;
    }

    const isCrossDream = theme === "dream" || next === "dream";
    if (isCrossDream) {
      triggerWipe(() => {
        setTheme(next, "nav");
      });
    } else {
      setTheme(next, "nav");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentId: ThemeId) => {
    const currentIndex = THEME_IDS.indexOf(currentId);
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % THEME_IDS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + THEME_IDS.length) % THEME_IDS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = THEME_IDS.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextTheme = THEME_IDS[nextIndex];
    handleSelect(nextTheme);

    // Focus target element
    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[nextIndex]?.focus();
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div
        ref={containerRef}
        role="radiogroup"
        aria-label="Select website theme"
        className="flex items-center p-0.5 border border-line bg-surface rounded-[3px] text-xs font-mono select-none"
      >
        {THEME_IDS.map((id) => {
          const isSelected = theme === id;
          const meta = THEMES[id];
          const isDream = id === "dream";

          return (
            <button
              key={id}
              role="radio"
              type="button"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelect(id)}
              onKeyDown={(e) => handleKeyDown(e, id)}
              title={`${meta.label} theme — ${meta.shortDescription}`}
              data-theme-option={id}
              className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-text ${
                isSelected
                  ? "bg-bg text-fg font-semibold shadow-xs border border-line"
                  : "text-fg-muted hover:text-fg hover:bg-surface/50 border border-transparent"
              }`}
              data-cursor="click"
            >
              <ThemeIcon theme={id} className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline text-[11px] uppercase tracking-wide">
                {meta.label}
              </span>

              {/* Pulsing "New" dot for Dream theme */}
              {isDream && !isDreamTried && (
                <span
                  className="absolute -top-1 -right-1 flex h-2 w-2"
                  title="New theme available!"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Dream sky dial & calm placeholder popover when Dream is active */}
      {theme === "dream" && showDreamOptions && (
        <div
          role="dialog"
          aria-label="Dream environment controls"
          className="absolute top-full right-0 mt-2 p-3 w-64 bg-surface border border-line rounded-lg shadow-lg z-50 text-xs font-mono"
        >
          <div className="flex items-center justify-between pb-2 border-b border-line text-fg font-bold">
            <span>DREAM DIAL</span>
            <button
              type="button"
              onClick={() => setShowDreamOptions(false)}
              className="text-fg-muted hover:text-fg"
            >
              ✕
            </button>
          </div>
          <div className="py-2.5 space-y-2 text-fg-muted">
            <div className="flex justify-between items-center">
              <span>Sky Mode:</span>
              <span className="text-fg font-semibold">Journey (D4)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Calm Mode:</span>
              <button
                type="button"
                onClick={() => setLevel(level === "off" ? "full" : "off")}
                className={`px-2 py-0.5 border rounded text-[10px] ${
                  level === "off" ? "bg-red text-white border-red" : "border-line text-fg"
                }`}
              >
                {level === "off" ? "CALM ACTIVE" : "CALM OFF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 2. Mobile Menu Preview Cards Switcher
 */
export function ThemeSwitcherMobile({ onSelect }: { onSelect?: () => void }) {
  const { theme, setTheme } = useTheme();
  const { triggerWipe } = useCloudWipe();

  const handleSelect = (next: ThemeId) => {
    if (next === theme) {
      onSelect?.();
      return;
    }
    const isCrossDream = theme === "dream" || next === "dream";
    if (isCrossDream) {
      triggerWipe(() => {
        setTheme(next, "menu");
        onSelect?.();
      });
    } else {
      setTheme(next, "menu");
      onSelect?.();
    }
  };

  return (
    <div className="w-full space-y-2 py-2">
      <div className="text-[11px] font-mono uppercase tracking-widest text-fg-muted mb-2">
        {'// APPEARANCE & THEME'}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {THEME_IDS.map((id) => {
          const isSelected = theme === id;
          const meta = THEMES[id];

          return (
            <button
              key={id}
              type="button"
              data-theme-card={id}
              onClick={() => handleSelect(id)}
              className={`p-2.5 border rounded-sm flex flex-col items-center justify-between text-left transition-all ${
                isSelected
                  ? "border-red-text bg-surface shadow-sm ring-1 ring-red-text"
                  : "border-line bg-surface/50 hover:border-line-strong text-fg-muted hover:text-fg"
              }`}
            >
              {/* Mini Thumbnail */}
              <div
                className={`w-full h-10 mb-2 rounded-[2px] flex items-center justify-center border ${
                  id === "dark"
                    ? "bg-[#212121] border-[#3A3A3A] text-[#EFE3CF]"
                    : id === "light"
                    ? "bg-[#F6EFDD] border-[#D6CDB5] text-[#292926]"
                    : "bg-gradient-to-b from-[#6DB6F0] to-[#FFF0D4] border-[#B4DDF7] text-[#2B2A52]"
                }`}
              >
                <ThemeIcon theme={id} className="w-4 h-4" />
              </div>
              <div className="text-center w-full">
                <span
                  className={`block text-[11px] font-mono font-bold uppercase tracking-wider ${
                    isSelected ? "text-fg" : "text-fg-muted"
                  }`}
                >
                  {meta.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 3. Footer Inline Theme Switcher
 */
export function ThemeSwitcherFooter() {
  const { theme, setTheme } = useTheme();
  const { triggerWipe } = useCloudWipe();

  const handleSelect = (next: ThemeId) => {
    if (next === theme) return;
    const isCrossDream = theme === "dream" || next === "dream";
    if (isCrossDream) {
      triggerWipe(() => {
        setTheme(next, "footer");
      });
    } else {
      setTheme(next, "footer");
    }
  };

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-fg-muted">
      <span>THEME:</span>
      <div className="flex items-center border border-line bg-bg p-0.5 rounded-[2px]">
        {THEME_IDS.map((id) => {
          const isSelected = theme === id;
          return (
            <button
              key={id}
              type="button"
              data-theme-footer={id}
              onClick={() => handleSelect(id)}
              className={`px-2 py-0.5 uppercase tracking-wider text-[10px] transition-colors flex items-center gap-1 ${
                isSelected
                  ? "bg-fg text-bg font-bold rounded-[1px]"
                  : "text-fg-muted hover:text-fg"
              }`}
              data-cursor="click"
            >
              <ThemeIcon theme={id} className="w-3 h-3" />
              <span>{THEMES[id].label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
