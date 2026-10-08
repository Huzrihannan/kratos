import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  headline?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  variant?: "cream" | "peach" | "cocoa";
  align?: "left" | "center";
}

export const Section: React.FC<SectionProps> = ({
  eyebrow,
  headline,
  description,
  children,
  variant = "cream",
  align = "center",
  className = "",
  ...props
}) => {
  const variantStyles = {
    cream: "bg-cream text-ink",
    peach: "bg-peach/40 text-ink",
    cocoa: "bg-cocoa text-cream",
  };

  const alignStyles = {
    center: "text-center items-center",
    left: "text-left items-start",
  };

  return (
    <section
      className={cn("w-full py-16 md:py-28 px-6 md:px-12", variantStyles[variant], className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {(eyebrow || headline || description) && (
          <div className={cn("flex flex-col mb-12 md:mb-16 max-w-3xl", alignStyles[align], align === "center" && "mx-auto")}>
            {eyebrow && (
              <span className="font-body text-xs font-semibold tracking-tagline uppercase text-orange-deep mb-3 inline-block">
                {eyebrow}
              </span>
            )}
            {headline && (
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4">
                {headline}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "font-body text-base md:text-lg leading-relaxed",
                  variant === "cocoa" ? "text-peach/80" : "text-ink-soft"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
