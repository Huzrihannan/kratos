import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="font-body text-xs font-semibold tracking-wider uppercase text-ink-soft pl-3">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={cn(
            "w-full px-5 py-4 rounded-card bg-peach/50 text-ink placeholder:text-ink-soft/60 font-body text-base border-2 border-transparent transition-all duration-200 outline-none resize-y min-h-[120px]",
            "hover:bg-peach/70 hover:border-orange/30",
            "focus:bg-cream focus:border-orange focus:ring-3 focus:ring-orange-deep",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500/80 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-600 font-medium pl-3">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
