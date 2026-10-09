'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/content/services';
import { Daisy } from '../art/flowers/Daisy';
import { Tulip } from '../art/flowers/Tulip';
import { Sunflower } from '../art/flowers/Sunflower';
import { Dandelion } from '../art/flowers/Dandelion';
import { CherryBlossom } from '../art/flowers/CherryBlossom';
import { Clover } from '../art/flowers/Clover';
import { VisitingCreature } from './VisitingCreature';
import { registerSway } from '../world/wind';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface ServiceFlowerCardProps {
  service: ServiceItem;
  index: number;
}

export function ServiceFlowerCard({ service, index }: ServiceFlowerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const { isOff } = useMotionLevel();

  // Scroll visibility for bloom
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Connect flower stem to wind engine
  useEffect(() => {
    const el = flowerRef.current;
    if (!el || isOff) return;

    const cleanup = registerSway(el, {
      strength: 0.85 + (index % 3) * 0.2,
      maxAngle: 6,
      transformOrigin: 'bottom center',
    });

    return cleanup;
  }, [index, isOff]);

  const renderFlower = () => {
    const bloomState = inView ? (isHovered ? 'bloom' : 'bloom') : 'sprout';
    const size = 64;

    switch (service.id) {
      case 'web-apps':
        return <Daisy state={bloomState} size={size} />;
      case 'mobile-apps':
        return <Tulip state={bloomState} size={size} />;
      case 'ecommerce':
        return <Sunflower state={bloomState} size={size} />;
      case 'ai-automation':
        return <Dandelion state={bloomState} size={size} />;
      case 'ui-ux-design':
        return <CherryBlossom state={bloomState} size={size} />;
      case 'maintenance-support':
        return <Clover state={bloomState} size={size} />;
      default:
        return <Daisy state={bloomState} size={size} />;
    }
  };

  const creatureType = index % 2 === 0 ? 'bee' : 'butterfly';

  return (
    <Link
      ref={cardRef}
      href={`/services/${service.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-testid={`dream-service-card-${service.id}`}
      className="group relative flex flex-col justify-between h-full rounded-[32px] bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-6 sm:p-7 shadow-[0_8px_24px_rgba(43,42,82,0.06)] hover:shadow-[0_20px_44px_rgba(43,42,82,0.12)] hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--dream-link,#3B3AA0)] focus-visible:ring-offset-2 overflow-hidden"
    >
      {/* Soft sunny glow backdrop */}
      <div
        className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(255,200,61,0.14)_0%,transparent_70%)] pointer-events-none rounded-tr-[32px]"
        aria-hidden="true"
      />

      {/* 1. Header with Blooming Flower & Visiting Creature */}
      <div className="relative flex items-center justify-between pb-5 border-b border-[var(--dream-paper-2,#FFF1DC)]">
        <div className="relative">
          <div
            ref={flowerRef}
            className={`transition-transform duration-500 ease-out ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          >
            {renderFlower()}
          </div>

          {/* Visiting Bee or Butterfly on Hover/Focus */}
          <VisitingCreature
            type={creatureType}
            active={isHovered}
            className="top-0 -right-6"
          />
        </div>

        {/* Index Flower Pill */}
        <span className="font-serif italic text-xs font-medium text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper-2,#FFF1DC)] px-3 py-1 rounded-full shadow-2xs">
          Bed 0{index + 1}
        </span>
      </div>

      {/* 2. Title & Plain Promise */}
      <div className="py-5 flex-1">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--dream-ink,#2B2A52)] group-hover:text-[var(--dream-link,#3B3AA0)] transition-colors mb-2 leading-snug">
          {service.title}
        </h3>
        <p className="font-sans text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed mb-4">
          {service.shortPromise}
        </p>

        {/* Deliverables / Outcomes */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {service.outcomes.map((outcome, oIdx) => (
            <span
              key={oIdx}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper-2,#FFF1DC)]/60 px-2.5 py-1 rounded-full border border-[var(--dream-paper-2,#FFF1DC)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6FB07A]" />
              <span>{outcome}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. Action Footer */}
      <div className="pt-4 border-t border-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-between text-xs font-semibold text-[var(--dream-link,#3B3AA0)] group-hover:text-[var(--dream-ink,#2B2A52)] transition-colors">
        <span className="inline-flex items-center gap-1.5">
          <span>See what we grow</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </span>
        <span className="text-[11px] font-sans font-normal text-[var(--dream-ink-soft,#55537A)]">
          {service.timeframe}
        </span>
      </div>
    </Link>
  );
}
