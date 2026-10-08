"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Squish } from "@/components/fx/Squish";
import { useLayoutModal } from "@/lib/modal-context";

export function Footer() {
  const { openEstimator } = useLayoutModal();
  const prefersReducedMotion = useReducedMotion();
  const kratosLetters = ["k", "r", "a", "t", "o", "s"];

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4 stroke-[2.2]" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4 stroke-[2.2]" />;
      case "x":
      case "twitter":
        return <Twitter className="w-4 h-4 stroke-[2.2]" />;
      default:
        return <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />;
    }
  };

  return (
    <footer className="relative bg-cocoa text-cream pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-8 px-6 sm:px-10 lg:px-16 rounded-t-[40px] sm:rounded-t-[56px] overflow-hidden">
      {/* Background soft ambient blobs */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-peach/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid: Brand Pitch & Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-cream/15">
          {/* Brand Info & Pitch (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange rounded-full"
              aria-label="Kratos home"
            >
              <div className="relative h-10 w-32">
                <Image
                  src="/brand/logo-cream.svg"
                  alt="Kratos"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <div>
              <Pill
                variant="availability"
                className="bg-cocoa-light border-orange/20 text-cream"
              >
                {siteConfig.availability.chipText}
              </Pill>
            </div>

            <p className="text-base sm:text-lg text-cream/80 max-w-md font-body leading-relaxed">
              {siteConfig.shortPitch}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                href={siteConfig.cta.estimator.href}
                onClick={(e) => {
                  e.preventDefault();
                  openEstimator();
                }}
                withArrow
              >
                {siteConfig.cta.estimator.label}
              </Button>

              <Button
                variant="ghost"
                size="md"
                href={siteConfig.contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream border-cream/30 hover:bg-cream/10"
              >
                Book a call
              </Button>
            </div>
          </div>

          {/* Nav Columns (7 cols on lg) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {siteConfig.footerColumns.map((col) => (
              <div key={col.title} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-butter font-body">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Squish>
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 text-sm text-cream/75 hover:text-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-lg py-0.5"
                        >
                          <span>{link.label}</span>
                          {link.external && (
                            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2] opacity-70" />
                          )}
                        </Link>
                      </Squish>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Row: Contact & Socials & Legal */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-cream/70 border-b border-cream/15">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 hover:text-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded"
            >
              <Mail className="w-4 h-4 stroke-[2.2] text-butter" />
              <span>{siteConfig.contact.email}</span>
            </a>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.2] text-butter" />
              <span>WhatsApp: {siteConfig.contact.whatsappNumber}</span>
            </a>
            <div className="inline-flex items-center gap-2 text-cream/50">
              <MapPin className="w-4 h-4 stroke-[2.2]" />
              <span>{siteConfig.contact.location}</span>
            </div>
          </div>

          {/* Social Icon Pills */}
          <div className="flex items-center gap-2.5">
            {siteConfig.socialLinks.map((item) => (
              <Squish key={item.platform}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full bg-cream/10 hover:bg-orange hover:text-ink text-cream flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange"
                >
                  {getSocialIcon(item.platform)}
                </a>
              </Squish>
            ))}
          </div>
        </div>

        {/* Sub-bar: Legal & Copyright */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Strong underneath.
            Friendly on top.
          </div>

          <div className="flex items-center gap-6">
            {siteConfig.legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* GIANT Wordmark "kratos" with Individual Bouncing Letters */}
        <div
          className="pt-6 sm:pt-10 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div
            className="flex justify-between items-baseline font-display font-bold text-orange text-[20vw] leading-[0.72] tracking-tighter cursor-default"
            aria-hidden="true"
          >
            {kratosLetters.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                tabIndex={-1}
                className="inline-block transition-colors duration-200 hover:text-orange-deep select-none"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -24,
                        scale: 1.12,
                        rotate: index % 2 === 0 ? -4 : 4,
                        transition: {
                          type: "spring" as const,
                          stiffness: 450,
                          damping: 12,
                        },
                      }
                }
                whileTap={prefersReducedMotion ? {} : { scale: 0.92, y: 0 }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Sub-tagline widely spaced lowercase Outfit */}
          <div className="text-center pt-3 pb-2">
            <span className="font-body text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.35em] sm:tracking-[0.45em] lowercase text-cream/35">
              {siteConfig.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
