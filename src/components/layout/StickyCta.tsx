"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, Calendar, Mail, ChevronUp, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { useLayoutModal } from "@/lib/modal-context";
import { Squish } from "@/components/fx/Squish";

export function StickyCta() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isEstimatorOpen, isMobileNavOpen } = useLayoutModal();

  // Close on Escape or click outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Hidden when Estimator modal or mobile navigation is open
  if (isEstimatorOpen || isMobileNavOpen) {
    return null;
  }

  const options = [
    {
      label: "Chat on WhatsApp",
      description: siteConfig.contact.whatsappNumber,
      href: siteConfig.contact.whatsappUrl,
      icon: MessageCircle,
      external: true,
      color: "bg-[#25D366]/15 text-[#128C7E]",
    },
    {
      label: "Book a 15-min call",
      description: "Pick a time on calendar",
      href: siteConfig.contact.bookingUrl,
      icon: Calendar,
      external: true,
      color: "bg-orange/15 text-orange-deep",
    },
    {
      label: "Send an email",
      description: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: Mail,
      external: false,
      color: "bg-ink/10 text-ink",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="sticky-cta-menu"
            role="menu"
            aria-label="Direct contact options"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, y: 12 }
            }
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 24,
            }}
            className="mb-3 w-72 rounded-[28px] bg-peach/95 backdrop-blur-md p-2.5 shadow-blob border-2 border-orange/20"
          >
            <div className="px-3 pt-2 pb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                Start a conversation
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-ink-soft hover:bg-cream hover:text-ink min-w-[28px] min-h-[28px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep"
                aria-label="Close contact options"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            <div className="space-y-1">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <Squish key={opt.label}>
                    <Link
                      href={opt.href}
                      target={opt.external ? "_blank" : undefined}
                      rel={opt.external ? "noopener noreferrer" : undefined}
                      role="menuitem"
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-full hover:bg-cream/90 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep"
                      onClick={() => setIsOpen(false)}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${opt.color} group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-ink leading-tight">
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-ink-soft truncate max-w-[170px]">
                          {opt.description}
                        </span>
                      </div>
                    </Link>
                  </Squish>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main trigger pill */}
      <Squish>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls="sticky-cta-menu"
          className="group flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-orange hover:bg-orange-deep text-ink font-semibold shadow-pill hover:shadow-blob transition-all duration-200 min-h-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-deep"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-butter opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-butter" />
          </span>

          <span className="text-sm font-bold tracking-tight">
            Chat on WhatsApp
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-5 h-5 rounded-full bg-ink/10 flex items-center justify-center"
          >
            <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </motion.div>
        </button>
      </Squish>
    </div>
  );
}
