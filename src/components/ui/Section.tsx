import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  index?: string;
  eyebrow?: string; // Formatted as "/01 — LABEL"
  headline?: React.ReactNode;
  description?: React.ReactNode;
  hud?: React.ReactNode; // Optional HUD slot in upper right
  registrationMarks?: boolean; // Renders 4 corner '+' registration marks
  dataTheme?: "dark" | "light"; // Rhythm section local palette override
  align?: "left" | "center";
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  index,
  eyebrow,
  headline,
  description,
  hud,
  registrationMarks = true,
  dataTheme,
  align = "left",
  children,
  className = "",
  ...props
}) => {
  const formattedEyebrow = index
    ? eyebrow
      ? `/${index} — ${eyebrow}`
      : `/${index}`
    : eyebrow;
  return (
    <section
      data-theme={dataTheme}
      className={cn(
        "relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 bg-bg text-fg border-b border-line transition-colors duration-200 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="relative max-w-7xl mx-auto flex flex-col">
        {/* 4 Corner Registration Marks '+' */}
        {registrationMarks && (
          <>
            <span
              className="absolute -top-3 -left-3 font-mono text-xs text-line-strong select-none pointer-events-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute -top-3 -right-3 font-mono text-xs text-line-strong select-none pointer-events-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute -bottom-3 -left-3 font-mono text-xs text-line-strong select-none pointer-events-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute -bottom-3 -right-3 font-mono text-xs text-line-strong select-none pointer-events-none"
              aria-hidden="true"
            >
              +
            </span>
          </>
        )}

        {/* Section Header */}
        {(eyebrow || headline || description || hud) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-line pb-8">
            <div
              className={cn(
                "flex flex-col max-w-3xl",
                align === "center" && "mx-auto text-center items-center"
              )}
            >
              {formattedEyebrow && (
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-red-text mb-2.5 inline-block">
                  {formattedEyebrow}
                </span>
              )}

              {headline && (
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.04em] text-fg leading-tight">
                  {headline}
                </h2>
              )}

              {description && (
                <div className="font-sans text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed mt-3 max-w-2xl">
                  {description}
                </div>
              )}
            </div>

            {/* Optional HUD slot */}
            {hud && <div className="shrink-0 self-start md:self-end">{hud}</div>}
          </div>
        )}

        {/* Section Body */}
        <div className="relative w-full">{children}</div>
      </div>
    </section>
  );
};
