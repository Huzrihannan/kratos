"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { useLayoutModal } from "@/lib/modal-context";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Squish } from "@/components/fx/Squish";
import { Magnetic } from "@/components/fx/Magnetic";

export function Nav() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { isMobileNavOpen, setMobileNavOpen, openEstimator } = useLayoutModal();
  const [isScrolled, setIsScrolled] = useState(false);

  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll state for floating detached pill bar
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  // Focus trap & Escape key handler for mobile overlay menu
  useEffect(() => {
    if (!isMobileNavOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the close button or first element upon opening
    const timeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileNavOpen(false);
        hamburgerButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        if (!mobileMenuRef.current) return;
        const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileNavOpen, setMobileNavOpen]);

  const handleCloseMenu = useCallback(() => {
    setMobileNavOpen(false);
    hamburgerButtonRef.current?.focus();
  }, [setMobileNavOpen]);

  return (
    <>
      {/* Top Floating Pill Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-300 pointer-events-none px-3 sm:px-6 ${
          isScrolled ? "pt-2 sm:pt-4" : "pt-3 sm:pt-6"
        }`}
      >
        <motion.nav
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -20, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 26,
          }}
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full transition-all duration-300 rounded-full bg-peach/90 backdrop-blur-md border border-peach/70 shadow-pill flex items-center justify-between ${
            isScrolled
              ? "max-w-5xl py-2 px-3 sm:px-4"
              : "max-w-6xl py-2.5 px-3.5 sm:px-6"
          }`}
        >
          {/* Logo Left */}
          <Link
            href="/"
            className="flex items-center gap-2 group rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-deep"
            aria-label="Kratos Software Solutions home"
          >
            <motion.div
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      rotate: [0, -4, 4, -2, 1, 0],
                      scale: 1.05,
                      transition: { duration: 0.45, ease: "easeInOut" },
                    }
              }
              className="relative h-9 w-28 sm:h-10 sm:w-32 origin-left cursor-pointer"
            >
              <Image
                src="/brand/logo.svg"
                alt="Kratos"
                fill
                priority
                className="object-contain object-left"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav Links Center / Right */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Squish key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep ${
                      isActive
                        ? "text-ink font-semibold bg-cream shadow-sm"
                        : "text-ink-soft hover:text-ink hover:bg-cream/60"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange" />
                    )}
                  </Link>
                </Squish>
              );
            })}
          </div>

          {/* Right Action: CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Magnetic strength={0.2}>
                <Button
                  variant="primary"
                  size={isScrolled ? "sm" : "md"}
                  href={siteConfig.cta.estimator.href}
                  onClick={(e) => {
                    e.preventDefault();
                    openEstimator();
                  }}
                  withArrow
                >
                  {siteConfig.cta.estimator.label}
                </Button>
              </Magnetic>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="md:hidden">
              <button
                ref={hamburgerButtonRef}
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMobileNavOpen}
                aria-controls="mobile-navigation-menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-cream hover:bg-white text-ink transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-deep"
              >
                <Menu className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </motion.nav>
      </header>

      {/* Full-Screen Cream Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            id="mobile-navigation-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96 }
            }
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 28,
            }}
            className="fixed inset-0 z-50 bg-cream flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto"
          >
            {/* Top Bar: Logo & Close Button */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={handleCloseMenu}
                className="relative h-10 w-32 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-deep rounded-full"
                aria-label="Kratos home"
              >
                <Image
                  src="/brand/logo.svg"
                  alt="Kratos"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleCloseMenu}
                aria-label="Close navigation menu"
                className="min-w-[48px] min-h-[48px] rounded-full bg-peach hover:bg-orange text-ink flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-deep"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Giant Staggered Fredoka Links */}
            <nav className="my-auto py-8 space-y-3">
              {siteConfig.navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: -20, y: 20 }
                    }
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 24,
                      delay: prefersReducedMotion ? 0 : 0.05 + idx * 0.07,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleCloseMenu}
                      className={`group flex items-center justify-between py-2 text-4xl sm:text-5xl font-display font-bold tracking-tight transition-all rounded-2xl px-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-deep ${
                        isActive
                          ? "text-orange-deep translate-x-2"
                          : "text-ink hover:text-orange-deep hover:translate-x-2"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-orange">
                        <ArrowUpRight className="w-8 h-8 stroke-[3]" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Design System preview link */}
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -20, y: 20 }
                }
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 24,
                  delay: prefersReducedMotion ? 0 : 0.05 + siteConfig.navLinks.length * 0.07,
                }}
              >
                <Link
                  href="/design-system"
                  onClick={handleCloseMenu}
                  className="inline-block py-2 text-xl font-display font-medium text-ink-soft hover:text-ink px-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep"
                >
                  Design System Catalog →
                </Link>
              </motion.div>
            </nav>

            {/* Bottom Actions & Availability */}
            <motion.div
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
                delay: prefersReducedMotion ? 0 : 0.35,
              }}
              className="space-y-4 pt-4 border-t border-peach"
            >
              <div className="flex items-center justify-between">
                <Pill variant="availability">
                  {siteConfig.availability.chipText}
                </Pill>
              </div>

              <Button
                variant="primary"
                size="lg"
                href={siteConfig.cta.estimator.href}
                className="w-full justify-center text-lg min-h-[54px]"
                withArrow
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu();
                  openEstimator();
                }}
              >
                {siteConfig.cta.estimator.label}
              </Button>

              <div className="flex items-center justify-between text-xs text-ink-soft px-1">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-ink underline decoration-orange underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep rounded"
                >
                  {siteConfig.contact.email}
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink underline decoration-orange underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep rounded"
                >
                  WhatsApp: {siteConfig.contact.whatsappNumber}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
