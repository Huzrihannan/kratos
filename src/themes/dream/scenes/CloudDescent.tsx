'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface CloudDescentProps {
  className?: string;
}

export function CloudDescent({ className = '' }: CloudDescentProps) {
  const leftCloudRef = useRef<SVGPathElement>(null);
  const rightCloudRef = useRef<SVGPathElement>(null);
  const centerCloudRef = useRef<SVGPathElement>(null);
  const { isOff } = useMotionLevel();

  useEffect(() => {
    if (isOff) return;

    const left = leftCloudRef.current;
    const right = rightCloudRef.current;
    const center = centerCloudRef.current;
    if (!left || !right || !center) return;

    const setLeftX = gsap.quickTo(left, 'x', { duration: 0.6, ease: 'power2.out' });
    const setRightX = gsap.quickTo(right, 'x', { duration: 0.6, ease: 'power2.out' });
    const setCenterY = gsap.quickTo(center, 'y', { duration: 0.7, ease: 'power2.out' });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(1.5, Math.max(0, scrollY / heroHeight));

      // Part clouds sideways as user scrolls down
      setLeftX(-progress * 140);
      setRightX(progress * 140);
      setCenterY(progress * 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOff]);

  return (
    <div
      className={`absolute bottom-0 inset-x-0 h-32 sm:h-44 pointer-events-none select-none z-20 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left cloud bank */}
        <path
          ref={leftCloudRef}
          d="M -100 180 L -100 80 Q 20 20 180 60 Q 320 20 450 70 Q 560 110 650 180 Z"
          fill="var(--cloud-tint, #FFFFFF)"
          fillOpacity="0.85"
        />

        {/* Right cloud bank */}
        <path
          ref={rightCloudRef}
          d="M 1540 180 L 1540 70 Q 1400 10 1260 50 Q 1120 20 980 80 Q 860 120 780 180 Z"
          fill="var(--cloud-tint, #FFFFFF)"
          fillOpacity="0.8"
        />

        {/* Low center wispy bridge */}
        <path
          ref={centerCloudRef}
          d="M 400 180 Q 550 120 720 135 Q 890 120 1040 180 Z"
          fill="var(--cloud-tint, #FFFFFF)"
          fillOpacity="0.65"
        />
      </svg>
    </div>
  );
}
