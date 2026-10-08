'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Decode } from '@/components/fx/Decode';
import { HUDClock } from '@/components/fx/HUD';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useLayoutModal } from '@/lib/modal-context';

import { caseStudiesData } from '@/content/work';
import { isPublishable } from '@/lib/content-status';

export function Footer() {
  const { openEstimator } = useLayoutModal();
  const { level, setLevel } = useMotionLevel();
  const [wordmarkHoverKey, setWordmarkHoverKey] = useState(0);
  const hasPublishedWork = caseStudiesData.some(isPublishable);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-3.5 h-3.5" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5" />;
      case 'x':
      case 'twitter':
        return <Twitter className="w-3.5 h-3.5" />;
      default:
        return <ArrowUpRight className="w-3.5 h-3.5" />;
    }
  };

  return (
    <footer
      data-theme="dark"
      className="relative w-full border-t border-line bg-bg text-fg select-none transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 flex flex-col gap-16">
        {/* Top Grid: Identity, Pitch, Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-line">
          {/* Identity & Pitch (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <Logo variant="dark" />
            <p className="font-sans text-sm text-fg-muted max-w-sm leading-relaxed mt-2">
              {siteConfig.shortPitch ||
                'High-performance software systems engineered with mathematical precision, strict TypeScript, and zero bloat.'}
            </p>
            <div className="pt-2">
              <Button variant="primary" size="sm" onClick={openEstimator}>
                Estimate my project
              </Button>
            </div>
          </div>

          {/* Nav Links Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3 font-mono text-xs">
            <span className="text-[10px] text-red-text uppercase tracking-widest font-bold">
              /01 — NAVIGATION
            </span>
            <ul className="space-y-2 text-fg-muted">
              <li>
                <Link href="/" className="hover:text-fg transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-fg transition-colors">
                  Services
                </Link>
              </li>
              {hasPublishedWork && (
                <li>
                  <Link href="/work" className="hover:text-fg transition-colors">
                    Case Studies
                  </Link>
                </li>
              )}
              <li>
                <Link href="/about" className="hover:text-fg transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-fg transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <span className="text-[10px] text-red-text uppercase tracking-widest font-bold">
              /02 — ARCHITECTURE
            </span>
            <ul className="space-y-2 text-fg-muted">
              <li>
                <Link href="/services/web-apps" className="hover:text-fg transition-colors">
                  Full-Stack Web Platforms
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-apps" className="hover:text-fg transition-colors">
                  Cross-Platform Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services/ai-automation" className="hover:text-fg transition-colors">
                  Autonomous AI Workflows
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance-support" className="hover:text-fg transition-colors">
                  System Maintenance &amp; Evolution
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3 font-mono text-xs">
            <span className="text-[10px] text-red-text uppercase tracking-widest font-bold">
              /03 — CONNECT
            </span>
            <ul className="space-y-2 text-fg-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-fg transition-colors flex items-center gap-1.5"
                >
                  <Mail size={12} className="text-red-text" />
                  <span>Email Team</span>
                </a>
              </li>
              {siteConfig.socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-fg transition-colors flex items-center gap-1.5"
                  >
                    {getSocialIcon(s.platform)}
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant Monospace Display Wordmark (Hover triggers letter-by-letter Decode) */}
        <div
          className="relative w-full flex items-center justify-between border-b border-line pb-8 cursor-pointer group"
          onMouseEnter={() => setWordmarkHoverKey((k) => k + 1)}
        >
          <div className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tight text-fg flex items-baseline">
            <Decode key={`krat-${wordmarkHoverKey}`} text="Krat" speed={30} />
            <span className="inline-block h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-red animate-pulse mx-1 sm:mx-2 self-center" />
            <Decode key={`os-${wordmarkHoverKey}`} text="OS" speed={30} />
          </div>
          <span className="font-mono text-xs text-fg-muted uppercase tracking-widest hidden md:inline">
            {'// SOFTWARE SOLUTIONS'}
          </span>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-fg-muted">
          <div>
            &copy; {new Date().getFullYear()} Krat.OS. All engineering rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-fg transition-colors">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-fg transition-colors">
              TERMS
            </Link>
            <Link href="/design-system" className="hover:text-fg transition-colors">
              SYSTEM LAB
            </Link>
          </div>
        </div>
      </div>

      {/* OS Status Bar (Bottom Hairline) */}
      <div className="border-t border-line bg-surface/90 py-2.5 px-4 font-mono text-[11px] text-fg-muted">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Status LED & Health */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
            <span className="text-fg font-semibold uppercase tracking-wider">ALL SYSTEMS OPERATIONAL</span>
            <span className="hidden sm:inline">{'// LATENCY < 20MS'}</span>
          </div>

          {/* Center: Live Colombo Clock */}
          <div className="flex items-center gap-4">
            <HUDClock timeZone="Asia/Colombo" label="COLOMBO" />
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">KERNEL: V2.0</span>
          </div>

          {/* Right: Motion Toggle */}
          <div className="flex items-center gap-2">
            <span>MOTION:</span>
            <div className="flex items-center border border-line bg-bg p-0.5">
              {(['full', 'lite', 'off'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setLevel(m)}
                  className={`px-2 py-0.5 uppercase tracking-wider text-[10px] transition-colors flex items-center gap-1 ${
                    level === m ? 'bg-fg text-bg font-bold' : 'text-fg-muted hover:text-fg'
                  }`}
                  data-cursor="click"
                >
                  {level === m && <span className="w-1.5 h-1.5 rounded-full bg-red inline-block" aria-hidden="true" />}
                  <span>{m}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
