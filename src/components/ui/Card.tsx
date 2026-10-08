"use client";

import React from "react";
import { cn } from "@/lib/utils";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "peach" | "cream" | "cocoa" | "surface";
  title?: string;
  portalImage?: string;
  portalAlt?: string;
  hoverEffect?: boolean;
  cornerBrackets?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "surface",
  title,
  portalImage,
  portalAlt = "",
  hoverEffect = true,
  cornerBrackets = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      data-variant={variant}
      className={cn(
        "group relative rounded-[2px] border border-line bg-surface p-5 sm:p-6 text-fg transition-all duration-200 select-auto",
        hoverEffect && "hover:border-line-strong hover:bg-surface/90",
        className
      )}
      {...props}
    >
      {/* Optional Corner Brackets */}
      {cornerBrackets && (
        <>
          <span
            className="absolute -top-[1px] -left-[1px] h-2 w-2 border-t-2 border-l-2 border-red-text pointer-events-none"
            aria-hidden="true"
          />
          <span
            className="absolute -top-[1px] -right-[1px] h-2 w-2 border-t-2 border-r-2 border-red-text pointer-events-none"
            aria-hidden="true"
          />
        </>
      )}

      {title && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-line text-xs font-mono uppercase tracking-[0.08em] text-fg-muted">
          <span>{title}</span>
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-[1px] bg-line-strong" />
            <span className="h-1.5 w-1.5 rounded-[1px] bg-line-strong" />
          </span>
        </div>
      )}

      {portalImage && (
        <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-[2px] border border-line bg-surface/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portalImage}
            alt={portalAlt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
        </div>
      )}

      {children}
    </div>
  );
};
