'use client';

/**
 * Krat.OS Dream Theme — Flower Bloom & Sway Hook (useFlowerBloom.ts)
 *
 * Powers GSAP timelines for seed -> sprout -> bloom,
 * registers environmental sway with the unified Wind Engine,
 * and handles interactive hover/tap responses.
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { registerSway } from '../../world/wind';
import { FlowerState } from './types';

export interface UseFlowerBloomOptions {
  state?: FlowerState;
  interactive?: boolean;
  windStrength?: number;
  onBloomComplete?: () => void;
}

export function useFlowerBloom(
  svgRef: React.RefObject<SVGSVGElement | null>,
  options: UseFlowerBloomOptions = {}
) {
  const {
    state = 'bloom',
    interactive = true,
    windStrength = 1.0,
    onBloomComplete,
  } = options;

  const { isOff } = useMotionLevel();
  const [isHovered, setIsHovered] = useState(false);
  const unregisterSwayRef = useRef<(() => void)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Apply state transitions
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clean previous sway
    unregisterSwayRef.current.forEach((unreg) => unreg());
    unregisterSwayRef.current = [];
    timelineRef.current?.kill();

    const stem = svg.querySelector<SVGElement>('#stem');
    const leafL = svg.querySelector<SVGElement>('#leaf-l');
    const leafR = svg.querySelector<SVGElement>('#leaf-r');
    const head = svg.querySelector<SVGElement>('#head, #petals');
    const seed = svg.querySelector<SVGElement>('#seed');
    const pollenDots = svg.querySelectorAll<SVGElement>('.flower-pollen');

    const stemLength = stem instanceof SVGGeometryElement ? stem.getTotalLength() : 80;
    const leaves = [leafL, leafR].filter((el): el is SVGElement => Boolean(el));
    const allParts = [stem, leafL, leafR, head].filter((el): el is SVGElement => Boolean(el));

    // Static reduced-motion
    if (isOff) {
      if (state === 'seed') {
        if (allParts.length > 0) gsap.set(allParts, { opacity: 0, scale: 0 });
        if (seed) gsap.set(seed, { opacity: 1, scale: 1 });
      } else if (state === 'sprout') {
        if (seed) gsap.set(seed, { opacity: 0 });
        if (stem) gsap.set(stem, { strokeDashoffset: stemLength * 0.4, opacity: 1 });
        if (leaves.length > 0) gsap.set(leaves, { scale: 0.6, opacity: 1 });
        if (head) gsap.set(head, { opacity: 0, scale: 0 });
      } else {
        if (seed) gsap.set(seed, { opacity: 0 });
        if (stem) gsap.set(stem, { strokeDashoffset: 0, opacity: 1 });
        if (leaves.length > 0) gsap.set(leaves, { scale: 1, opacity: 1 });
        if (head) gsap.set(head, { scale: 1, opacity: 1 });
      }
      return;
    }

    // State 1: SEED
    if (state === 'seed') {
      const tl = gsap.timeline();
      timelineRef.current = tl;

      const hideParts = [head, leafL, leafR].filter((el): el is SVGElement => Boolean(el));
      if (hideParts.length > 0) {
        tl.to(hideParts, { scale: 0, opacity: 0, duration: 0.3 });
      }
      if (stem) {
        tl.to(stem, { strokeDashoffset: stemLength, duration: 0.4 }, 0);
      }
      if (seed) {
        tl.to(seed, { scale: 1, opacity: 1, duration: 0.3 }, 0.2);
      }
      return;
    }

    // State 2: SPROUT
    if (state === 'sprout') {
      const tl = gsap.timeline();
      timelineRef.current = tl;

      if (seed) tl.to(seed, { scale: 0, opacity: 0, duration: 0.2 });
      if (stem) {
        tl.fromTo(
          stem,
          { strokeDasharray: stemLength, strokeDashoffset: stemLength },
          { strokeDashoffset: stemLength * 0.45, duration: 0.7, ease: 'power2.out' },
          0.1
        );
      }
      if (leaves.length > 0) {
        tl.fromTo(
          leaves,
          { scale: 0, opacity: 0, transformOrigin: 'bottom center' },
          { scale: 0.55, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
          0.3
        );
      }
      if (head) tl.to(head, { scale: 0, opacity: 0, duration: 0.2 }, 0);
      return;
    }

    // State 3: BLOOM
    const tl = gsap.timeline({
      onComplete: () => {
        onBloomComplete?.();
        // Wire wind sway upon full bloom
        if (head) {
          unregisterSwayRef.current.push(
            registerSway(head, {
              strength: 1.1 * windStrength,
              phase: Math.random() * Math.PI,
              maxAngle: 4.5,
              transformOrigin: 'bottom center',
            })
          );
        }
        if (leafL) {
          unregisterSwayRef.current.push(
            registerSway(leafL, {
              strength: 0.8 * windStrength,
              phase: 0.5,
              maxAngle: 3.5,
              transformOrigin: 'right bottom',
            })
          );
        }
        if (leafR) {
          unregisterSwayRef.current.push(
            registerSway(leafR, {
              strength: 0.8 * windStrength,
              phase: 1.2,
              maxAngle: 3.5,
              transformOrigin: 'left bottom',
            })
          );
        }
      },
    });
    timelineRef.current = tl;

    // Seed dissolves, stem shoots up, leaves unfurl, head blooms with overshoot
    if (seed) tl.to(seed, { scale: 0, opacity: 0, duration: 0.2 });
    if (stem) {
      tl.fromTo(
        stem,
        { strokeDasharray: stemLength, strokeDashoffset: stemLength },
        { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' },
        0
      );
    }
    if (leaves.length > 0) {
      tl.fromTo(
        leaves,
        { scale: 0, opacity: 0, transformOrigin: 'bottom center' },
        { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.6)' },
        0.3
      );
    }
    if (head) {
      tl.fromTo(
        head,
        { scale: 0, opacity: 0, transformOrigin: 'bottom center' },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
        0.5
      );
    }

    if (pollenDots.length > 0) {
      tl.fromTo(
        pollenDots,
        { scale: 0, opacity: 0, y: 0 },
        {
          scale: 1,
          opacity: 0.8,
          y: -10,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power1.out',
        },
        0.9
      ).to(pollenDots, { opacity: 0, y: -20, duration: 0.5 }, 1.2);
    }

    return () => {
      tl.kill();
      unregisterSwayRef.current.forEach((unreg) => unreg());
      unregisterSwayRef.current = [];
    };
  }, [state, isOff, windStrength, onBloomComplete, svgRef]);

  // Interactive Hover Reaction
  const handleMouseEnter = useCallback(() => {
    if (!interactive || isOff) return;
    setIsHovered(true);
    const svg = svgRef.current;
    if (!svg) return;

    const head = svg.querySelector<SVGElement>('#head, #petals');
    if (head) {
      gsap.to(head, {
        scale: 1.08,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    const pollenDots = svg.querySelectorAll<SVGElement>('.flower-pollen');
    if (pollenDots.length > 0) {
      gsap.fromTo(
        pollenDots,
        { opacity: 0.9, y: 0, scale: 0.8 },
        {
          opacity: 0,
          y: -18,
          scale: 0.3,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power1.out',
        }
      );
    }
  }, [interactive, isOff, svgRef]);

  const handleMouseLeave = useCallback(() => {
    if (!interactive || isOff) return;
    setIsHovered(false);
    const svg = svgRef.current;
    if (!svg) return;

    const head = svg.querySelector<SVGElement>('#head, #petals');
    if (head) {
      gsap.to(head, {
        scale: 1.0,
        duration: 0.5,
        ease: 'sine.inOut',
      });
    }
  }, [interactive, isOff, svgRef]);

  return {
    isHovered,
    bindHover: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
