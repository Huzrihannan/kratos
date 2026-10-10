'use client';

import React, { useEffect } from 'react';
import { MessageSquare, Mail, RotateCcw, Clock } from 'lucide-react';
import { BallparkCalculation, estimatorConfig } from '@/content/estimator-config';
import { siteConfig } from '@/content/site';
import { Odometer } from '@/components/fx/Odometer';
import { PetalCelebration } from './PetalCelebration';
import { Poppy } from '../art/flowers/Poppy';
import { trackEvent } from '@/lib/analytics';

export interface GardenResultScreenProps {
  calculation: BallparkCalculation;
  leadName: string;
  leadEmail: string;
  projectTypeName: string;
  onRestart: () => void;
  onClose?: () => void;
}

export function GardenResultScreen({
  calculation,
  leadName,
  leadEmail,
  projectTypeName,
  onRestart,
}: GardenResultScreenProps) {
  useEffect(() => {
    trackEvent('estimator_complete', {
      projectType: projectTypeName,
      estimateMin: calculation.estimateMin,
      estimateMax: calculation.estimateMax,
      theme: 'dream',
    });
  }, [calculation, projectTypeName]);

  const hasWhatsapp = Boolean(siteConfig.contact.whatsappNumber && siteConfig.contact.whatsappNumber.trim());
  const hasBooking = Boolean(siteConfig.contact.bookingUrl && siteConfig.contact.bookingUrl.trim());

  const whatsappMessage = encodeURIComponent(
    `Hi Krat.OS! I just designed a garden estimate for a ${projectTypeName} project. My name is ${leadName}. Let's chat!`
  );
  const whatsappUrl = hasWhatsapp
    ? `https://wa.me/${siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`
    : '';

  return (
    <div
      data-testid="dream-garden-result-screen"
      className="relative w-full max-w-2xl mx-auto flex flex-col items-center select-none py-4 px-2"
    >
      {/* Gentle celebratory petal shower */}
      <PetalCelebration />

      <div className="w-full rounded-[36px] bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-6 sm:p-8 shadow-[0_12px_36px_rgba(43,42,82,0.08)] flex flex-col items-center text-center space-y-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] border border-[#E8DEC7] text-xs font-serif italic text-[var(--dream-ink-soft,#55537A)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84] shadow-2xs" />
          <span>Garden Plotted & Confirmed</span>
        </div>

        {/* Personalized Greeting */}
        <div className="space-y-2">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[var(--dream-ink,#2B2A52)] leading-tight">
            Your garden is ready, {leadName}!
          </h2>
          <p className="font-sans text-sm sm:text-base text-[var(--dream-ink-soft,#55537A)] max-w-md mx-auto leading-relaxed">
            We have gathered your choices for a <strong>{projectTypeName}</strong>. Here is your initial roadmap:
          </p>
        </div>

        {/* Estimate Details */}
        {estimatorConfig.showEstimate ? (
          <div className="w-full p-6 sm:p-8 rounded-[28px] bg-[var(--dream-paper-2,#FFF1DC)]/60 border border-[var(--dream-paper-2,#FFF1DC)] space-y-3">
            <span className="font-serif italic text-xs text-[var(--dream-grass-deep,#2A6B48)] font-semibold uppercase tracking-wider">
              Projected Investment Range
            </span>

            <div className="font-serif text-3xl sm:text-5xl text-[var(--dream-ink,#2B2A52)] font-bold flex items-baseline justify-center gap-2 sm:gap-3 flex-wrap">
              <Odometer
                value={calculation.estimateMin.toLocaleString()}
                prefix="$"
                className="text-[var(--dream-ink,#2B2A52)]"
              />
              <span className="text-[var(--dream-ink-soft,#55537A)] font-normal">—</span>
              <Odometer
                value={calculation.estimateMax.toLocaleString()}
                prefix="$"
                className="text-[var(--dream-ink,#2B2A52)]"
              />
            </div>

            <div className="flex items-center justify-center gap-2 pt-3 border-t border-[var(--dream-paper-2,#FFF1DC)] font-sans text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)]">
              <Clock className="w-4 h-4 text-[var(--dream-link,#3B3AA0)] shrink-0" />
              <span>
                Estimated timeline: <strong className="text-[var(--dream-ink,#2B2A52)] font-semibold">{calculation.formattedTimeline}</strong>
              </span>
            </div>
          </div>
        ) : (
          /* Honest message when prices are awaiting owner approval */
          <div className="w-full p-6 sm:p-7 rounded-[28px] bg-[var(--dream-paper-2,#FFF1DC)]/70 border border-[#EAE0CA] space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mx-auto shadow-2xs">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[var(--dream-ink,#2B2A52)]">
              Detailed Scope On Its Way
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed max-w-sm mx-auto">
              Your customized scope summary and roadmap have been dispatched to{' '}
              <strong className="text-[var(--dream-ink,#2B2A52)] font-semibold">{leadEmail}</strong>. We review every specification manually to guarantee realistic milestone pricing.
            </p>
          </div>
        )}

        {/* Conversion Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {hasBooking && (
            <a
              href={siteConfig.contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full px-6 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] hover:bg-[#3B3A68] transition-all shadow-xs focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--dream-link,#3B3AA0)]"
            >
              <Poppy state="bloom" size={16} />
              <span>Book a 15-min call</span>
            </a>
          )}

          {hasWhatsapp && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full px-6 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all shadow-xs focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#25D366]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          )}

          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:w-auto rounded-full px-5 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)] hover:bg-[var(--dream-paper-2,#FFF1DC)] transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--dream-link,#3B3AA0)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Plant another garden</span>
          </button>
        </div>
      </div>
    </div>
  );
}
