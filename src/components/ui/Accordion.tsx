"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id?: string;
  question?: string;
  title?: string;
  answer?: string;
  content?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className = "" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("space-y-3.5 w-full", className)}>
      {items.map((item, index) => {
        const itemId = item.id || `accordion-item-${index}`;
        const isOpen = openId === itemId;
        const triggerId = `accordion-trigger-${itemId}`;
        const panelId = `accordion-panel-${itemId}`;

        return (
          <div
            key={itemId}
            className={cn(
              "rounded-[28px] border-2 transition-colors duration-200 overflow-hidden",
              isOpen
                ? "bg-peach/70 border-orange/40 shadow-sm"
                : "bg-peach/30 hover:bg-peach/50 border-peach/70"
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(itemId)}
                className="w-full text-left px-6 py-5 sm:px-7 sm:py-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep rounded-[28px]"
              >
                <span className="font-display font-semibold text-lg sm:text-xl text-ink leading-snug">
                  <span className="text-ink-soft font-semibold text-sm sm:text-base mr-2.5 font-mono">
                    0{index + 1}.
                  </span>
                  {item.question || item.title}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isOpen
                      ? "bg-orange text-ink"
                      : "bg-cream text-ink-soft hover:bg-white"
                  )}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                </motion.div>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 sm:px-7 sm:pb-7 text-ink-soft font-body text-base sm:text-lg leading-relaxed border-t border-orange/15 mt-1">
                    {item.answer || item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
