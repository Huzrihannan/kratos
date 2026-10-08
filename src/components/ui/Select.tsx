import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, className = "", id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1 text-left">
        {label && (
          <div className="flex items-center justify-between pl-1">
            <label
              htmlFor={selectId}
              className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted font-medium"
            >
              {label}
            </label>
            {hint && (
              <span className="font-mono text-[10px] text-fg-muted/60 tracking-wider">
                {hint}
              </span>
            )}
          </div>
        )}
        <div className="group relative w-full overflow-hidden rounded-[2px]">
          {/* Animated red caret bar on focus along left edge */}
          <span
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-red origin-top scale-y-0 peer-focus:scale-y-100 transition-transform duration-200 z-10 pointer-events-none"
            aria-hidden="true"
          />
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "peer w-full appearance-none px-4 py-2.5 pr-10 rounded-[2px] bg-surface text-fg font-sans text-sm sm:text-base border border-line-strong transition-colors duration-150 outline-none cursor-pointer",
              "hover:border-fg hover:bg-surface/90",
              "focus:border-red-text focus:bg-surface",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              error && "border-red-text focus:border-red",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface text-fg">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-fg-muted">
            <ChevronDown size={16} strokeWidth={2} />
          </div>
        </div>
        {error && (
          <span className="font-mono text-xs text-red-text pl-1 tracking-wider">
            ! {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
