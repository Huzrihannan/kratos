"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Squish } from "@/components/fx/Squish";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  id?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  "aria-controls"?: string;
  tabIndex?: number;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      withArrow = true,
      isLoading = false,
      children,
      className = "",
      disabled = false,
      href,
      target,
      rel,
      external,
      type = "button",
      onClick,
      id,
      tabIndex,
      ...ariaProps
    },
    ref
  ) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center font-body font-semibold rounded-pill tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-50 text-center";

    const variantStyles = {
      primary:
        "bg-orange text-ink hover:bg-orange-deep shadow-subtle hover:shadow-glow",
      secondary:
        "bg-cocoa text-cream hover:bg-cocoa/90 shadow-subtle",
      ghost:
        "border-2 border-ink text-ink bg-transparent hover:bg-ink/5",
    };

    const sizeStyles = {
      sm: "text-sm px-4 py-2 gap-2 min-h-[40px]",
      md: "text-base px-6 py-3 gap-3 min-h-[48px]",
      lg: "text-lg px-8 py-4 gap-4 min-h-[54px]",
    };

    const arrowCircleSizes = {
      sm: "w-5 h-5",
      md: "w-7 h-7",
      lg: "w-8 h-8",
    };

    const arrowIconSizes = {
      sm: 12,
      md: 14,
      lg: 16,
    };

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>{children}</span>
            {withArrow && (
              <span
                className={cn(
                  "rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0",
                  arrowCircleSizes[size],
                  variant === "primary" && "bg-ink/10 text-ink",
                  variant === "secondary" && "bg-cream/15 text-cream",
                  variant === "ghost" && "bg-ink/10 text-ink"
                )}
                aria-hidden="true"
              >
                <ArrowRight size={arrowIconSizes[size]} strokeWidth={2.5} />
              </span>
            )}
          </>
        )}
      </>
    );

    const mergedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const isInteractive = !disabled && !isLoading;

    if (href) {
      const isExternal =
        external ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("https:");

      const linkElement = isExternal ? (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target || (isExternal ? "_blank" : undefined)}
          rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
          className={mergedClassName}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          id={id}
          tabIndex={tabIndex}
          {...ariaProps}
        >
          {content}
        </a>
      ) : (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={mergedClassName}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          id={id}
          tabIndex={tabIndex}
          {...ariaProps}
        >
          {content}
        </Link>
      );

      return isInteractive ? (
        <Squish className="inline-flex">{linkElement}</Squish>
      ) : (
        linkElement
      );
    }

    const buttonElement = (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || isLoading}
        className={mergedClassName}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        id={id}
        tabIndex={tabIndex}
        {...ariaProps}
      >
        {content}
      </button>
    );

    return isInteractive ? (
      <Squish className="inline-flex">{buttonElement}</Squish>
    ) : (
      buttonElement
    );
  }
);

Button.displayName = "Button";
