"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PaperCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "paper" | "paper-2" | "night" | "cloud";
  deckled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function PaperCard({
  variant = "paper",
  deckled = true,
  children,
  className = "",
  ...props
}: PaperCardProps) {
  const isCloud = variant === "cloud";
  const isNight = variant === "night";

  return (
    <div
      className={cn(
        "relative rounded-[28px] p-6 sm:p-8 transition-all duration-300 paper-grain",
        // Background and surface variants
        variant === "paper" && "bg-paper text-ink shadow-paper",
        variant === "paper-2" && "bg-paper-2 text-ink shadow-paper",
        variant === "night" && "bg-night-paper text-cream shadow-floating",
        isCloud && "bg-paper text-ink shadow-paper pt-8",
        // Faint deckled edge border styling
        deckled && !isNight && "border border-[rgba(43,42,82,0.12)] shadow-[0_8px_24px_-4px_rgba(43,42,82,0.08),inset_0_0_0_1px_rgba(255,255,255,0.7)]",
        deckled && isNight && "border border-[rgba(207,203,234,0.15)] shadow-[0_20px_40px_-8px_rgba(27,30,75,0.35),inset_0_0_0_1px_rgba(255,246,229,0.05)]",
        className
      )}
      {...props}
    >
      {/* Cloud Scallop Header for Cloud Variant */}
      {isCloud && (
        <div
          className="absolute -top-3 left-6 right-6 flex items-center justify-between pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 200 16"
            className="w-full h-4 fill-paper"
            preserveAspectRatio="none"
          >
            <path d="M0,16 Q25,0 50,16 Q75,0 100,16 Q125,0 150,16 Q175,0 200,16 L200,16 L0,16 Z" />
          </svg>
        </div>
      )}

      {children}
    </div>
  );
}
