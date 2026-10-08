"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface AccordionItemData {
  id?: string;
  question?: string;
  title?: string;
  answer?: string;
  content?: React.ReactNode;
}

export type AccordionItem = AccordionItemData;

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className = "" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);
  const { isOff } = useMotionLevel();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {items.map((item, index) => {
        const itemId = item.id || `accordion-item-${index}`;
        const isOpen = openId === itemId;
        const triggerId = `accordion-trigger-${itemId}`;
        const panelId = `accordion-panel-${itemId}`;

        // Technical index format: Q01, Q02...
        const indexStr = `Q${String(index + 1).padStart(2, "0")}`;
        const questionText = item.question || item.title || "";
        const answerContent = item.content || item.answer;

        return (
          <div
            key={itemId}
            className={cn(
              "rounded-[2px] border transition-colors duration-150 overflow-hidden select-none",
              isOpen
                ? "border-line-strong bg-surface"
                : "border-line bg-surface/40 hover:border-line-strong hover:bg-surface/70"
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(itemId)}
                className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-text"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="font-mono text-xs font-bold text-red-text shrink-0 tracking-wider">
                    {indexStr}
                  </span>
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.04em] font-medium text-fg truncate">
                    {questionText}
                  </span>
                </div>

                {/* Mechanical toggle indicator: + / - */}
                <span
                  className={cn(
                    "font-mono text-base font-bold shrink-0 w-5 h-5 flex items-center justify-center transition-colors",
                    isOpen ? "text-red-text" : "text-fg-muted"
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={isOff ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={isOff ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 border-t border-line/60">
                    <div className="font-sans text-sm sm:text-base text-fg-muted leading-relaxed flex items-start gap-2 pt-2">
                      {/* Blinking red caret indicator */}
                      <span
                        className="inline-block w-1.5 h-4 bg-red shrink-0 mt-1 animate-pulse"
                        aria-hidden="true"
                      />
                      <div className="flex-1">{answerContent}</div>
                    </div>
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
