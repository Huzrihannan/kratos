import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="font-body text-xs font-semibold tracking-wider uppercase text-ink-soft pl-3">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none px-5 py-3.5 pr-12 rounded-pill bg-peach/50 text-ink font-body text-base border-2 border-transparent transition-all duration-200 outline-none cursor-pointer",
              "hover:bg-peach/70 hover:border-orange/30",
              "focus:bg-cream focus:border-orange focus:ring-3 focus:ring-orange-deep",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500/80 focus:ring-red-500",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-cream text-ink">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-ink-soft">
            <ChevronDown size={18} strokeWidth={2.5} />
          </div>
        </div>
        {error && <span className="text-xs text-red-600 font-medium pl-3">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
