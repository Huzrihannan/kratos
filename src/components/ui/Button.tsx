"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    // Mechanical precision: 1px downward translation on press, no scaling or squish
    const baseStyles =
      "group relative inline-flex items-center justify-center font-mono font-medium uppercase tracking-[0.08em] rounded-[2px] border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-40 text-center overflow-hidden active:translate-y-[1px]";

    const variantStyles = {
      primary:
        "bg-[#EFE3CF] text-[#212121] border-[#EFE3CF] hover:bg-[#E5D7C0]",
      secondary:
        "bg-transparent text-fg border-line-strong hover:bg-surface hover:border-fg",
      ghost:
        "bg-transparent text-fg border-transparent hover:text-fg",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-2 min-h-[36px]",
      md: "text-xs sm:text-sm px-5 py-2.5 gap-3 min-h-[44px]",
      lg: "text-sm px-6 py-3.5 gap-4 min-h-[50px]",
    };

    const redSquareSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const arrowIconSizes = {
      sm: 11,
      md: 13,
      lg: 15,
    };

    const content = (
      <>
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>

        {withArrow && !isLoading && (
          <span
            className={cn(
              "relative z-10 flex items-center justify-center shrink-0 transition-transform duration-200",
              redSquareSizes[size],
              variant === "primary" &&
                "bg-red text-[#EFE3CF] rounded-[1px] group-hover:translate-x-0.5",
              variant === "secondary" &&
                "text-fg-muted group-hover:text-fg group-hover:translate-x-0.5",
              variant === "ghost" &&
                "text-red-text group-hover:translate-x-0.5"
            )}
            aria-hidden="true"
          >
            <ArrowRight
              size={arrowIconSizes[size]}
              strokeWidth={variant === "primary" ? 2.5 : 2}
            />
          </span>
        )}

        {/* Ghost underline wipe indicator */}
        {variant === "ghost" && (
          <span
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
            aria-hidden="true"
          />
        )}

        {/* Loading state: red progress bar along bottom edge */}
        {isLoading && (
          <span
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-red animate-pulse"
            aria-hidden="true"
          />
        )}
      </>
    );

    const mergedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href && !disabled) {
      const isExternal = external || target === "_blank";
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={isExternal ? "noopener noreferrer" : rel}
          className={mergedClassName}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          id={id}
          tabIndex={tabIndex}
          {...ariaProps}
        >
          {content}
        </Link>
      );
    }

    return (
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
  }
);

Button.displayName = "Button";
