'use client';

/**
 * Krat.OS Dream Theme — Cloud Descent Transition (CloudDescent.tsx)
 *
 * A scrubbed scroll-driven transition between the Hero and Services sections.
 * Large cloud bank billows sweep upward past the viewer across ~1 viewport of scroll,
 * giving the sensation of descending from the high sky into the flower meadow.
 * Operates purely passively without wheel hijacking.
 */

import React, { useRef, useEffect, useState } from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export function CloudDescent({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOff } = useMotionLevel();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isOff || typeof window === 'undefined') return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Progress 0 when container top enters viewport bottom,
      // 1 when container bottom leaves viewport top
      const totalDist = windowH + rect.height;
      const currentDist = windowH - rect.top;
      const p = Math.max(0, Math.min(1, currentDist / totalDist));
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOff]);

  // Interpolated upward sweep translations
  const yOffsetLeft = (1 - scrollProgress) * 120 - 40; // %
  const yOffsetRight = (1 - scrollProgress) * 140 - 50;
  const yOffsetCenter = (1 - scrollProgress) * 110 - 30;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full h-[35vh] md:h-[45vh] pointer-events-none overflow-hidden select-none -my-16 z-10 ${className}`}
    >
      {/* Cloud Left Billow */}
      <div
        className="absolute w-[580px] h-[300px] left-[-10%] transition-transform duration-75 will-change-transform"
        style={{
          transform: isOff
            ? 'none'
            : `translateY(${yOffsetLeft}px) scale(${1 + scrollProgress * 0.25})`,
          opacity: 0.88,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: 'var(--cloud-tint, #FFFFFF)',
            maskImage: 'url(/textures/clouds/cloud-1.webp)',
            WebkitMaskImage: 'url(/textures/clouds/cloud-1.webp)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* Cloud Right Billow */}
      <div
        className="absolute w-[620px] h-[320px] right-[-12%] transition-transform duration-75 will-change-transform"
        style={{
          transform: isOff
            ? 'none'
            : `translateY(${yOffsetRight}px) scale(${1 + scrollProgress * 0.3})`,
          opacity: 0.92,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: 'var(--cloud-tint, #FFFFFF)',
            maskImage: 'url(/textures/clouds/cloud-6.webp)',
            WebkitMaskImage: 'url(/textures/clouds/cloud-6.webp)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* Center Rising Wisps */}
      <div
        className="absolute w-[500px] h-[250px] left-[32%] transition-transform duration-75 will-change-transform"
        style={{
          transform: isOff
            ? 'none'
            : `translateY(${yOffsetCenter}px) scale(${1 + scrollProgress * 0.2})`,
          opacity: 0.78,
          filter: 'blur(2px)',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: 'var(--cloud-tint, #FFFFFF)',
            maskImage: 'url(/textures/clouds/cloud-7.webp)',
            WebkitMaskImage: 'url(/textures/clouds/cloud-7.webp)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      </div>
    </div>
  );
}
