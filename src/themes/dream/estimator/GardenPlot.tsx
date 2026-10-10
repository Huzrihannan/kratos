'use client';

import React, { useMemo } from 'react';
import { Daisy } from '../art/flowers/Daisy';
import { Tulip } from '../art/flowers/Tulip';
import { Sunflower } from '../art/flowers/Sunflower';
import { Dandelion } from '../art/flowers/Dandelion';
import { WildflowerMix } from '../art/flowers/WildflowerMix';
import { VisitingCreature } from '../scenes/VisitingCreature';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface GardenPlotProps {
  projectType: string;
  needs: string[];
  timeline: string;
  budget: string;
  className?: string;
}

export function GardenPlot({
  projectType,
  needs,
  timeline,
  budget,
  className = '',
}: GardenPlotProps) {
  const { isOff } = useMotionLevel();

  // Flower metadata & component
  const flowerInfo = useMemo(() => {
    switch (projectType) {
      case 'website':
      case 'webapp':
        return {
          name: 'Daisy',
          component: <Daisy size={88} state="bloom" windStrength={isOff ? 0 : 0.8} />,
        };
      case 'mobile':
        return {
          name: 'Tulip',
          component: <Tulip size={88} state="bloom" windStrength={isOff ? 0 : 0.8} />,
        };
      case 'ecommerce':
        return {
          name: 'Sunflower',
          component: <Sunflower size={92} state="bloom" windStrength={isOff ? 0 : 0.8} />,
        };
      case 'ai_automation':
        return {
          name: 'Dandelion',
          component: <Dandelion size={84} state="bloom" windStrength={isOff ? 0 : 0.8} />,
        };
      case 'custom':
      default:
        return {
          name: 'Wildflower Mix',
          component: <WildflowerMix state="bloom" />,
        };
    }
  }, [projectType, isOff]);

  // Sky environment styling
  const skyInfo = useMemo(() => {
    switch (timeline) {
      case 'asap':
        return {
          name: 'Sunrise glow with fresh breeze',
          bgClass: 'bg-gradient-to-b from-[#F2B8CF]/40 via-[#FDE4CF]/30 to-[#FFFAF0]',
          sunColor: '#FFB7D1',
          hasRays: true,
        };
      case '3_6_months':
        return {
          name: 'Warm golden afternoon sky',
          bgClass: 'bg-gradient-to-b from-[#F6C79A]/45 via-[#FDE4CF]/35 to-[#FFFAF0]',
          sunColor: '#FFC83D',
          hasRays: true,
        };
      case 'exploring':
        return {
          name: 'Gentle sky with lazy drifting clouds',
          bgClass: 'bg-gradient-to-b from-[#D8E6F8]/50 via-[#EAE5F8]/30 to-[#FFFAF0]',
          sunColor: '#E2E8F0',
          hasRays: false,
        };
      case '1_3_months':
      default:
        return {
          name: 'Crisp morning blue sky',
          bgClass: 'bg-gradient-to-b from-[#B4DDF7]/50 via-[#E0F2FE]/30 to-[#FFFAF0]',
          sunColor: '#FFD43F',
          hasRays: false,
        };
    }
  }, [timeline]);

  // Container / Plot styling
  const containerInfo = useMemo(() => {
    switch (budget) {
      case '5k_10k':
        return {
          name: 'Terracotta flowerpot',
          type: 'pot',
        };
      case '10k_25k':
        return {
          name: 'Cedar wooden window box',
          type: 'box',
        };
      case '25k_50k':
        return {
          name: 'Carved stone garden planter',
          type: 'stone',
        };
      case '50k_plus':
        return {
          name: 'Lush open meadow plot',
          type: 'meadow',
        };
      case 'not_sure':
      default:
        return {
          name: 'Sprouting nursery pot with garden spade',
          type: 'seedling',
        };
    }
  }, [budget]);

  // Companions active status
  const hasButterflies = needs.includes('design');
  const hasTrellis = needs.includes('dev');
  const hasBees = needs.includes('integrations') || needs.includes('cms');
  const hasGreenhouse = needs.includes('devops');
  const hasWateringCan = needs.includes('maintenance');
  const hasQuestionCloud = needs.includes('consulting');

  // Accessible live announcement
  const liveDescription = useMemo(() => {
    const companionsList: string[] = [];
    if (hasButterflies) companionsList.push('fluttering butterflies');
    if (hasTrellis) companionsList.push('a wooden garden trellis');
    if (hasBees) companionsList.push('honey bees');
    if (hasGreenhouse) companionsList.push('a miniature greenhouse');
    if (hasWateringCan) companionsList.push('a watering can');
    if (hasQuestionCloud) companionsList.push('a gentle discovery cloud');

    const companionsText =
      companionsList.length > 0
        ? ` surrounded by ${companionsList.join(', ')}`
        : '';

    return `Your garden currently features a blooming ${flowerInfo.name} planted in a ${containerInfo.name} under ${skyInfo.name}${companionsText}.`;
  }, [
    flowerInfo.name,
    containerInfo.name,
    skyInfo.name,
    hasButterflies,
    hasTrellis,
    hasBees,
    hasGreenhouse,
    hasWateringCan,
    hasQuestionCloud,
  ]);

  return (
    <div
      data-testid="dream-garden-plot"
      className={`relative w-full rounded-[32px] overflow-hidden border border-[var(--dream-paper-2,#FFF1DC)] shadow-[0_8px_24px_rgba(43,42,82,0.06)] flex flex-col justify-between ${skyInfo.bgClass} ${className}`}
      style={{ minHeight: '380px' }}
    >
      {/* Screen reader polite live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveDescription}
      </div>

      {/* SKY BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft Sun disk */}
        <div
          className={`absolute top-6 right-8 w-16 h-16 rounded-full blur-md opacity-70 transition-colors duration-700`}
          style={{ backgroundColor: skyInfo.sunColor }}
        />

        {/* Soft Sun rays if sunrise/golden hour */}
        {skyInfo.hasRays && !isOff && (
          <div className="absolute -top-12 right-0 w-48 h-48 opacity-25">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="5"
                  stroke={skyInfo.sunColor}
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
            </svg>
          </div>
        )}

        {/* Drifting Sky Clouds */}
        <div className="absolute top-10 left-6 opacity-40">
          <svg width="64" height="24" viewBox="0 0 64 24" fill="#FFFFFF">
            <path d="M 12 20 Q 8 20 6 16 Q 4 10 12 10 Q 14 4 24 4 Q 34 4 36 10 Q 44 10 44 16 Q 44 20 40 20 Z" />
          </svg>
        </div>

        {/* Discovery Question Cloud if consulting selected */}
        {hasQuestionCloud && (
          <div
            data-testid="garden-companion-cloud"
            className="absolute top-6 left-12 flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-2xs border border-[var(--dream-paper-2,#FFF1DC)] animate-pulse"
          >
            <span className="text-xs">☁️</span>
            <span className="font-serif italic text-[11px] text-[var(--dream-ink,#2B2A52)] font-semibold">
              Scope Discovery
            </span>
          </div>
        )}

        {/* Butterflies if UI/UX Design selected */}
        {hasButterflies && (
          <div data-testid="garden-companion-butterflies" className="absolute top-20 left-10 z-20">
            <VisitingCreature type="butterfly" active={true} />
          </div>
        )}

        {/* Honey bees if Integrations/CMS selected */}
        {hasBees && (
          <div data-testid="garden-companion-bees" className="absolute top-28 right-12 z-20">
            <VisitingCreature type="bee" active={true} />
          </div>
        )}
      </div>

      {/* TOP STATUS BAR */}
      <div className="relative z-10 px-5 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3DDC84] shadow-2xs" />
          <span className="font-serif italic text-xs font-semibold text-[var(--dream-ink,#2B2A52)]">
            Garden In Bloom
          </span>
        </div>
        <span className="font-sans text-[11px] text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper,#FFFAF0)]/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[var(--dream-paper-2,#FFF1DC)]">
          {flowerInfo.name}
        </span>
      </div>

      {/* CENTER GARDEN STAGE: TRELLIS + FLOWER + GREENHOUSE + WATERING CAN */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-12">
        {/* Trellis behind flower if development is active */}
        {hasTrellis && (
          <div
            data-testid="garden-companion-trellis"
            className="absolute bottom-20 w-32 h-44 z-0 pointer-events-none opacity-85"
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 140" className="w-full h-full text-[#A06A3B]/60" stroke="currentColor" fill="none" strokeWidth="2.5">
              {/* Outer wooden frame */}
              <rect x="10" y="5" width="80" height="130" rx="4" strokeWidth="3" />
              {/* Criss-cross lattice */}
              <line x1="10" y1="25" x2="90" y2="105" />
              <line x1="10" y1="65" x2="70" y2="135" />
              <line x1="30" y1="5" x2="90" y2="65" />
              <line x1="90" y1="25" x2="10" y2="105" />
              <line x1="90" y1="65" x2="30" y2="135" />
              <line x1="70" y1="5" x2="10" y2="65" />
            </svg>
          </div>
        )}

        {/* Miniature Greenhouse Cloche if devops is active */}
        {hasGreenhouse && (
          <div
            data-testid="garden-companion-greenhouse"
            className="absolute bottom-16 left-6 z-20 pointer-events-none"
            aria-hidden="true"
          >
            <svg viewBox="0 0 60 70" className="w-12 h-14 drop-shadow-xs" fill="none">
              <path
                d="M 10 65 L 10 30 Q 30 10 50 30 L 50 65 Z"
                fill="#B4DDF7"
                fillOpacity="0.4"
                stroke="#5B9BD5"
                strokeWidth="2"
              />
              <line x1="30" y1="18" x2="30" y2="65" stroke="#5B9BD5" strokeWidth="1.5" />
              <line x1="10" y1="45" x2="50" y2="45" stroke="#5B9BD5" strokeWidth="1.5" />
              <circle cx="30" cy="12" r="3" fill="#5B9BD5" />
            </svg>
          </div>
        )}

        {/* Watering Can if maintenance is active */}
        {hasWateringCan && (
          <div
            data-testid="garden-companion-watering-can"
            className="absolute bottom-16 right-6 z-20 pointer-events-none"
            aria-hidden="true"
          >
            <svg viewBox="0 0 64 54" className="w-14 h-12 drop-shadow-xs" fill="none">
              {/* Can body */}
              <path d="M 22 20 L 46 20 L 44 48 L 24 48 Z" fill="#6FB07A" stroke="#2A6B48" strokeWidth="2" />
              {/* Spout */}
              <path d="M 22 28 L 8 16" stroke="#2A6B48" strokeWidth="3" strokeLinecap="round" />
              <circle cx="7" cy="15" r="4" fill="#2A6B48" />
              {/* Handle */}
              <path d="M 46 24 Q 58 34 44 44" stroke="#2A6B48" strokeWidth="3" fill="none" />
              {/* Water droplet */}
              <circle cx="5" cy="24" r="1.5" fill="#5B9BD5" className={isOff ? '' : 'animate-bounce'} />
            </svg>
          </div>
        )}

        {/* PRIMARY FLOWER */}
        <div data-testid="garden-primary-flower" className="relative z-10 -mb-6">
          {flowerInfo.component}
        </div>

        {/* PLANTER / CONTAINER BASED ON BUDGET */}
        <div data-testid="garden-container" className="relative z-20 w-48 flex justify-center">
          {containerInfo.type === 'pot' && (
            /* Terracotta Pot ($5k-$10k) */
            <svg viewBox="0 0 160 80" className="w-40 h-20 drop-shadow-md">
              <polygon points="25,18 135,18 120,78 40,78" fill="#D97736" stroke="#B85D22" strokeWidth="2" />
              <rect x="20" y="8" width="120" height="12" rx="4" fill="#E08344" stroke="#B85D22" strokeWidth="2" />
              <ellipse cx="80" cy="12" rx="55" ry="4" fill="#B85D22" opacity="0.4" />
            </svg>
          )}

          {containerInfo.type === 'box' && (
            /* Wooden Window Box ($10k-$25k) */
            <svg viewBox="0 0 180 80" className="w-44 h-20 drop-shadow-md">
              <rect x="15" y="16" width="150" height="60" rx="4" fill="#A06A3B" stroke="#7A4D24" strokeWidth="2" />
              <line x1="15" y1="36" x2="165" y2="36" stroke="#7A4D24" strokeWidth="2" />
              <line x1="15" y1="56" x2="165" y2="56" stroke="#7A4D24" strokeWidth="2" />
              <rect x="10" y="8" width="160" height="10" rx="3" fill="#B87D4A" stroke="#7A4D24" strokeWidth="2" />
            </svg>
          )}

          {containerInfo.type === 'stone' && (
            /* Stone Planter ($25k-$50k) */
            <svg viewBox="0 0 180 80" className="w-44 h-20 drop-shadow-md">
              <polygon points="15,20 165,20 150,78 30,78" fill="#8A8A9E" stroke="#5E5E72" strokeWidth="2" />
              <rect x="10" y="10" width="160" height="12" rx="3" fill="#A2A2B5" stroke="#5E5E72" strokeWidth="2" />
              {/* Moss patches */}
              <ellipse cx="40" cy="22" rx="12" ry="4" fill="#6FB07A" />
              <ellipse cx="130" cy="24" rx="16" ry="5" fill="#6FB07A" />
            </svg>
          )}

          {containerInfo.type === 'meadow' && (
            /* Open Meadow Plot ($50k+) */
            <svg viewBox="0 0 200 80" className="w-48 h-20 drop-shadow-md">
              <path d="M 10 50 Q 100 15 190 50 L 180 78 L 20 78 Z" fill="#6FB07A" stroke="#3E8C5A" strokeWidth="2" />
              <ellipse cx="100" cy="50" rx="80" ry="12" fill="#3E8C5A" opacity="0.6" />
              {/* Grass blades */}
              <path d="M 40 45 L 35 30 L 45 42" stroke="#2A6B48" strokeWidth="2" fill="none" />
              <path d="M 90 40 L 95 24 L 102 38" stroke="#2A6B48" strokeWidth="2" fill="none" />
              <path d="M 150 44 L 155 28 L 162 42" stroke="#2A6B48" strokeWidth="2" fill="none" />
            </svg>
          )}

          {containerInfo.type === 'seedling' && (
            /* Seedling Pot (Not sure) */
            <svg viewBox="0 0 160 80" className="w-40 h-20 drop-shadow-md">
              <polygon points="35,22 125,22 115,76 45,76" fill="#8C6239" stroke="#603813" strokeWidth="2" />
              <rect x="30" y="14" width="100" height="10" rx="3" fill="#A07248" stroke="#603813" strokeWidth="2" />
              {/* Garden trowel leaning */}
              <line x1="120" y1="10" x2="145" y2="60" stroke="#7A7A7A" strokeWidth="3" strokeLinecap="round" />
              <polygon points="112,6 124,14 116,22 104,14" fill="#D6CDB5" />
            </svg>
          )}
        </div>
      </div>

      {/* BOTTOM SUMMARY FOOTER */}
      <div className="relative z-10 px-5 py-3 bg-[var(--dream-paper,#FFFAF0)]/90 backdrop-blur-xs border-t border-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-between text-xs font-sans text-[var(--dream-ink-soft,#55537A)]">
        <span className="truncate max-w-[200px]">{containerInfo.name}</span>
        <span className="font-serif italic font-semibold text-[var(--dream-grass-deep,#2A6B48)] shrink-0">
          {skyInfo.name.split(' ')[0]} Pace
        </span>
      </div>
    </div>
  );
}
