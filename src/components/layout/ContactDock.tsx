'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Calendar, Mail, X, Send } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { useLayoutModal } from '@/lib/modal-context';
import { useTheme } from '@/themes/ThemeProvider';
import { trackEvent } from '@/lib/analytics';

export function ContactDock() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { isEstimatorOpen, isMobileNavOpen, isCommandPaletteOpen } = useLayoutModal();

  const isDream = theme === 'dream';

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Hide while any modal is open
  if (isEstimatorOpen || isMobileNavOpen || isCommandPaletteOpen) {
    return null;
  }

  const channels = [
    ...(siteConfig.contact.whatsappUrl
      ? [
          {
            id: 'whatsapp',
            label: 'Chat on WhatsApp',
            sublabel: 'Direct with founders',
            href: siteConfig.contact.whatsappUrl,
            icon: MessageCircle,
            external: true,
            onClick: () => trackEvent('whatsapp_click', { location: 'contact_dock' }),
          },
        ]
      : []),
    ...(siteConfig.contact.bookingUrl
      ? [
          {
            id: 'booking',
            label: 'Book a 15-min Call',
            sublabel: 'Direct with founders',
            href: siteConfig.contact.bookingUrl,
            icon: Calendar,
            external: false,
            onClick: () => trackEvent('booking_click', { location: 'contact_dock' }),
          },
        ]
      : []),
    {
      id: 'email',
      label: 'Email Engineering',
      sublabel: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: Mail,
      external: true,
      onClick: () => trackEvent('cta_click', { location: 'contact_dock', label: 'email' }),
    },
  ];

  // --- 1. DREAM THEME PAPER-PLANE CONTACT DOCK ---
  if (isDream) {
    return (
      <div
        ref={containerRef}
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none font-sans"
      >
        {/* Unfolded Paper Panel */}
        {isOpen && (
          <div
            className="mb-3 w-72 rounded-2xl border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-3 duration-200"
            role="dialog"
            aria-label="Direct Communication Channels"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--dream-ink,#2B2A52)]/10 text-xs">
              <span className="flex items-center gap-2 font-serif font-bold text-[var(--dream-ink,#2B2A52)]">
                <span className="w-2 h-2 rounded-full bg-[var(--dream-poppy,#FD142B)] animate-pulse" />
                <span>Get in Touch</span>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)] hover:bg-[var(--dream-paper-2,#FFF1DC)] transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Channels */}
            <div className="flex flex-col gap-2">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <Link
                    key={ch.id}
                    href={ch.href}
                    target={ch.external ? '_blank' : undefined}
                    rel={ch.external ? 'noopener noreferrer' : undefined}
                    onClick={() => {
                      ch.onClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-[var(--dream-ink,#2B2A52)]/10 bg-white/70 hover:bg-white hover:border-[var(--dream-ink,#2B2A52)]/20 text-[var(--dream-ink,#2B2A52)] transition-all shadow-xs group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={15} className="text-[var(--dream-poppy,#FD142B)]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-[var(--dream-ink,#2B2A52)] group-hover:text-[var(--dream-poppy-text,#C8102E)] transition-colors truncate">
                        {ch.label}
                      </span>
                      <span className="text-[10px] text-[var(--dream-ink-soft,#55537A)] truncate">
                        {ch.sublabel}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Paper-Plane Floating Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close contact menu' : 'Open contact channels'}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] shadow-xl hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dream-link,#3B3AA0)] group"
          data-cursor="click"
          title="Send a note / Direct channels"
        >
          <Send
            size={18}
            className={`text-[var(--dream-poppy,#FD142B)] transition-transform duration-300 ${
              isOpen ? 'rotate-90' : 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
            }`}
          />
        </button>
      </div>
    );
  }

  // --- 2. DARK & LIGHT THEMES TECHNICAL CONTACT DOCK ---
  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end select-none font-mono"
    >
      {/* Expanded Actions Panel */}
      {isOpen && (
        <div
          className="mb-2 w-72 border border-line-strong bg-surface text-fg shadow-2xl rounded-[2px] p-3 animate-in fade-in slide-in-from-bottom-2 duration-150"
          role="dialog"
          aria-label="Direct Communication Channels"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-line text-[10px] uppercase tracking-wider text-fg-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
              <span>DIRECT CHANNELS</span>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="hover:text-fg p-0.5"
              aria-label="Close"
            >
              <X size={12} />
            </button>
          </div>

          {/* Channel Rows */}
          <div className="flex flex-col gap-1.5">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <Link
                  key={ch.id}
                  href={ch.href}
                  target={ch.external ? '_blank' : undefined}
                  rel={ch.external ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    ch.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 border border-line bg-surface/50 hover:bg-surface hover:border-line-strong text-fg transition-colors rounded-[1px] group"
                >
                  <Icon size={16} className="text-red shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-fg group-hover:text-red-text transition-colors truncate">
                      {ch.label}
                    </span>
                    <span className="text-[10px] text-fg-muted truncate font-sans">
                      {ch.sublabel}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Dock Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items-center gap-2.5 px-3.5 py-2.5 min-h-[44px] min-w-[44px] border border-line-strong bg-surface hover:bg-surface/90 text-fg shadow-lg rounded-[2px] active:translate-y-[1px] transition-all text-xs uppercase tracking-wider"
        data-cursor="click"
      >
        <span className="h-2 w-2 rounded-full bg-ok animate-pulse" />
        <span className="font-semibold text-fg">CHAT</span>
        <span className="text-fg-muted text-[10px] hidden sm:inline">{`// ${channels.length} CHANNEL${channels.length === 1 ? '' : 'S'}`}</span>
      </button>
    </div>
  );
}

// Re-export as StickyCta for backward compatibility
export const StickyCta = ContactDock;
