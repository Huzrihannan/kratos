'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Feather, VolumeX, Mail, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { useLayoutModal } from '@/lib/modal-context';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { Button } from '@/components/ui/Button';
import { Cottage } from './Cottage';
import { Poppy } from '@/themes/dream/art/flowers/Poppy';
import { ThemeSwitcherFooter } from '@/themes/ThemeSwitcher';

import { caseStudiesData } from '@/content/work';
import { isPublishable } from '@/lib/content-status';

const hasPublishedWork = caseStudiesData.some(isPublishable);

export function DreamFooter() {
  const { openEstimator } = useLayoutModal();
  const { level, setLevel } = useMotionLevel();
  const [localTime, setLocalTime] = useState('');
  const [isWordmarkInView, setIsWordmarkInView] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const isAvailable = siteConfig.availability.status === 'available';

  // Live soft local time for Colombo, Sri Lanka (Asia/Colombo)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Colombo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        setLocalTime(timeStr);
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver for wordmark poppy bloom on scroll
  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWordmarkInView(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      data-theme="dream"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#1B1E4B] via-[#121435] to-[#0A0C22] text-[#FFF6E5] select-none pt-20 pb-12 transition-colors duration-300"
    >
      {/* 1. Starlit Night Backdrop with Twinkling Stars & Crescent Moon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Crescent Moon */}
        <div className="absolute top-12 right-12 sm:right-24 opacity-80">
          <svg className="w-12 h-12 fill-[#FFF1DC] drop-shadow-[0_0_12px_rgba(255,241,220,0.6)]" viewBox="0 0 100 100">
            <path d="M50 10 A40 40 0 1 0 90 50 A32 32 0 1 1 50 10 Z" />
          </svg>
        </div>

        {/* Twinkling Stars */}
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: i % 4 === 0 ? '3px' : '2px',
              height: i % 4 === 0 ? '3px' : '2px',
              top: `${(i * 13) % 65 + 5}%`,
              left: `${(i * 29) % 92 + 4}%`,
              opacity: 0.2 + ((i % 5) * 0.16),
              animationDelay: `${(i % 7) * 250}ms`,
            }}
          />
        ))}

        {/* Fireflies / Ambient Bioluminescent Motes */}
        {[...Array(12)].map((_, i) => (
          <span
            key={`ff-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[#FFD47A] blur-[1px] animate-float opacity-60"
            style={{
              top: `${50 + ((i * 17) % 45)}%`,
              left: `${(i * 23) % 90 + 5}%`,
              animationDuration: `${4 + (i % 4)}s`,
              animationDelay: `${i * 300}ms`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 z-10">
        {/* 2. Cozy Cottage on Hill with Availability-Reactive Glowing Window */}
        <div className="flex flex-col items-center justify-center pt-4">
          <Cottage isAvailable={isAvailable} />
        </div>

        {/* 3. Night-Paper Cards: Identity & Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Identity & Pitch Card (5 cols on lg) */}
          <div className="lg:col-span-5 p-7 rounded-3xl bg-[#1B1E4B]/85 border border-[#54478C]/40 shadow-xl backdrop-blur-xs flex flex-col items-start justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl font-bold text-[#FFF6E5]">Krat.OS</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FD142B] animate-pulse" />
              </div>
              <p className="font-sans text-sm text-[#CFCBEA] leading-relaxed max-w-sm">
                {siteConfig.shortPitch ||
                  'We build web applications, mobile platforms, and automated workflow engines for teams who want dependable results.'}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full">
              <Button
                variant="primary"
                size="sm"
                className="rounded-full shadow-md text-xs px-5"
                onClick={openEstimator}
              >
                Estimate my project
              </Button>
              <Link
                href="/contact"
                className="text-xs font-serif text-[#CFCBEA] hover:text-[#FFF6E5] underline decoration-[var(--dream-poppy,#FD142B)] underline-offset-4 transition-colors"
              >
                Start a conversation &rarr;
              </Link>
            </div>
          </div>

          {/* Nav Links Column (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-[#1B1E4B]/75 border border-[#54478C]/35 shadow-lg backdrop-blur-xs flex flex-col gap-4">
            <span className="text-xs font-serif uppercase tracking-widest text-[#FFD47A] font-bold">
              Explore
            </span>
            <ul className="space-y-2.5 text-xs text-[#CFCBEA]">
              <li>
                <Link href="/" className="hover:text-[#FFF6E5] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#FFF6E5] transition-colors">
                  Services
                </Link>
              </li>
              {hasPublishedWork && (
                <li>
                  <Link href="/work" className="hover:text-[#FFF6E5] transition-colors">
                    Case Studies
                  </Link>
                </li>
              )}
              <li>
                <Link href="/about" className="hover:text-[#FFF6E5] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFF6E5] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities Column (3 cols) */}
          <div className="lg:col-span-3 p-6 rounded-3xl bg-[#1B1E4B]/75 border border-[#54478C]/35 shadow-lg backdrop-blur-xs flex flex-col gap-4">
            <span className="text-xs font-serif uppercase tracking-widest text-[#FFD47A] font-bold">
              What We Grow
            </span>
            <ul className="space-y-2.5 text-xs text-[#CFCBEA]">
              <li>
                <Link href="/services#web-apps" className="hover:text-[#FFF6E5] transition-colors">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link href="/services#mobile-apps" className="hover:text-[#FFF6E5] transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services#ai-automation" className="hover:text-[#FFF6E5] transition-colors">
                  AI &amp; Automation
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance-support" className="hover:text-[#FFF6E5] transition-colors">
                  System Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-[#1B1E4B]/75 border border-[#54478C]/35 shadow-lg backdrop-blur-xs flex flex-col gap-4">
            <span className="text-xs font-serif uppercase tracking-widest text-[#FFD47A] font-bold">
              Connect
            </span>
            <ul className="space-y-2.5 text-xs text-[#CFCBEA]">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#FFF6E5] transition-colors flex items-center gap-1.5"
                >
                  <Mail size={12} className="text-[#FD142B]" />
                  <span>Email Team</span>
                </a>
              </li>
              {siteConfig.socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FFF6E5] transition-colors flex items-center gap-1.5"
                  >
                    {getSocialIcon(s.platform)}
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. Giant Monospace/Fraunces Wordmark with Signature Poppy Blooming on Scroll */}
        <div
          ref={wordmarkRef}
          className="relative w-full flex flex-col sm:flex-row items-center justify-between border-b border-[#54478C]/35 pb-10 gap-6"
        >
          <div className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#FFF6E5] flex items-baseline">
            <span>Krat</span>
            {/* Signature Blooming Poppy Period */}
            <div className="mx-1 sm:mx-3 inline-flex items-center justify-center">
              <Poppy
                size={isWordmarkInView ? 52 : 36}
                state={isWordmarkInView ? 'bloom' : 'sprout'}
                className="transition-all duration-700 hover:scale-110"
              />
            </div>
            <span>OS</span>
          </div>

          <span className="font-serif italic text-sm sm:text-base text-[#CFCBEA] tracking-wider text-center sm:text-right">
            Plant an idea. Watch it bloom.
          </span>
        </div>

        {/* 5. Legal, Local Time & Dream Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#CFCBEA]">
          {/* Left: Copyright */}
          <div>
            &copy; {new Date().getFullYear()} Krat.OS. Crafted with care.
          </div>

          {/* Center: Soft Local Time */}
          <div className="flex items-center gap-2 font-serif text-[#FFF6E5]">
            <span className="w-2 h-2 rounded-full bg-[#FFD47A] animate-pulse" />
            <span>Colombo, Sri Lanka &bull; {localTime || 'Live Clock'}</span>
          </div>

          {/* Right: Calm Switch, Sound Placeholder, Theme Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Calm Mode Button */}
            <button
              type="button"
              onClick={() => setLevel(level === 'off' ? 'full' : 'off')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-xs ${
                level === 'off'
                  ? 'bg-[var(--dream-poppy,#FD142B)] text-white'
                  : 'bg-[#1B1E4B] border border-[#54478C]/50 text-[#FFF6E5] hover:bg-[#54478C]/20'
              }`}
              title="Calm Motion: gentler animations and zero WebGL shaders"
            >
              <Feather className="w-3.5 h-3.5" />
              <span>{level === 'off' ? 'Calm On' : 'Calm Off'}</span>
            </button>

            {/* Ambient Sound Placeholder */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B1E4B] border border-[#54478C]/50 text-[#CFCBEA] hover:text-[#FFF6E5] hover:bg-[#54478C]/20 transition-all"
              title="Ambient sound: Soft garden wind & chimes"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>{soundEnabled ? 'Sound: On' : 'Sound: Off'}</span>
            </button>

            {/* Theme Switcher in Footer */}
            <ThemeSwitcherFooter />
          </div>
        </div>
      </div>
    </footer>
  );
}
