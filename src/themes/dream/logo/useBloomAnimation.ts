'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { registerSway } from '../world/wind';

export interface UseBloomAnimationOptions {
  animated?: boolean;
  interactive?: boolean;
  forcePlay?: boolean;
  onBloomComplete?: () => void;
}

export function useBloomAnimation(
  svgRef: React.RefObject<SVGSVGElement | null>,
  options: UseBloomAnimationOptions = {}
) {
  const { animated = true, interactive = true, forcePlay = false, onBloomComplete } = options;
  const { isOff } = useMotionLevel();
  const [isBlooming, setIsBlooming] = useState(false);
  const idleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const unregisterSwayRef = useRef<(() => void)[]>([]);

  // Idle Sway Timeline & Wind registration
  const startIdle = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || isOff || !animated) return;

    // Clean any prior sway registrants
    unregisterSwayRef.current.forEach((unreg) => unreg());
    unregisterSwayRef.current = [];

    const ctx = gsap.context(() => {
      const leafL = svg.querySelector<SVGElement>('#leaf-l');
      const leafR = svg.querySelector<SVGElement>('#leaf-r');
      const bud = svg.querySelector<SVGElement>('#bud');
      const poppyHead = svg.querySelector<SVGElement>('#poppy-head');

      // 1. Unified Wind System registration
      if (poppyHead) {
        unregisterSwayRef.current.push(
          registerSway(poppyHead, { strength: 0.9, maxAngle: 3.5, transformOrigin: 'center bottom' })
        );
      }
      if (leafL) {
        unregisterSwayRef.current.push(
          registerSway(leafL, { strength: 1.3, phase: 0.8, maxAngle: 4.5, transformOrigin: 'right bottom' })
        );
      }
      if (leafR) {
        unregisterSwayRef.current.push(
          registerSway(leafR, { strength: 1.2, phase: 1.4, maxAngle: 4.5, transformOrigin: 'left bottom' })
        );
      }
      if (bud) {
        unregisterSwayRef.current.push(
          registerSway(bud, { strength: 1.0, phase: 0.4, maxAngle: 3.0, transformOrigin: 'center bottom' })
        );
      }

      // 2. Gentle organic breath (1-2% scale breathing)
      const idle = gsap.timeline({ repeat: -1, yoyo: true });
      idleTimelineRef.current = idle;

      if (poppyHead) {
        idle.to(poppyHead, {
          scale: 1.02,
          duration: 2.8,
          ease: 'sine.inOut',
        }, 0);
      }
    }, svg);

    return () => {
      ctx.revert();
      unregisterSwayRef.current.forEach((unreg) => unreg());
      unregisterSwayRef.current = [];
    };
  }, [animated, isOff, svgRef]);

  const runBloom = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Motion off or reduced-motion: set directly to final bloom state
    if (isOff || !animated) {
      gsap.set(svg.querySelectorAll('#stem, #poppy-stem'), { strokeDashoffset: 0 });
      gsap.set(
        svg.querySelectorAll(
          '#leaf-l, #leaf-r, #bud, #bud-tip, #poppy-leaf-l, #poppy-leaf-r, #poppy-head, #dream-wordmark, #dream-tagline'
        ),
        { scale: 1, opacity: 1 }
      );
      gsap.set(svg.querySelectorAll('.pollen-dot, .falling-petal'), { opacity: 0 });
      setIsBlooming(false);
      onBloomComplete?.();
      return;
    }

    setIsBlooming(true);

    const ctx = gsap.context(() => {
      // 1. Elements selection
      const stem = svg.querySelector('#stem');
      const leafL = svg.querySelector('#leaf-l');
      const leafR = svg.querySelector('#leaf-r');
      const bud = svg.querySelector('#bud');
      const budTip = svg.querySelector('#bud-tip');
      const poppyStem = svg.querySelector('#poppy-stem');
      const poppyLeafL = svg.querySelector('#poppy-leaf-l');
      const poppyLeafR = svg.querySelector('#poppy-leaf-r');
      const poppyHead = svg.querySelector('#poppy-head');
      const pollenDots = svg.querySelectorAll('.pollen-dot');
      const wordmark = svg.querySelector('#dream-wordmark');
      const tagline = svg.querySelector('#dream-tagline');

      // Measure path lengths for stroke draw
      const stemLength = stem instanceof SVGGeometryElement ? stem.getTotalLength() : 60;
      const poppyStemLength = poppyStem instanceof SVGGeometryElement ? poppyStem.getTotalLength() : 25;

      // Initial state
      gsap.set(stem, { strokeDasharray: stemLength, strokeDashoffset: stemLength });
      gsap.set(poppyStem, { strokeDasharray: poppyStemLength, strokeDashoffset: poppyStemLength });
      gsap.set([leafL, leafR, bud, budTip], { scale: 0, opacity: 0, transformOrigin: 'center bottom' });
      gsap.set([poppyLeafL, poppyLeafR], { scale: 0, opacity: 0 });
      gsap.set(poppyHead, { scale: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set(pollenDots, { scale: 0, opacity: 0 });
      if (wordmark) gsap.set(wordmark, { opacity: 0, y: 3 });
      if (tagline) gsap.set(tagline, { opacity: 0, y: 2 });

      // Stop previous idle timeline
      if (idleTimelineRef.current) idleTimelineRef.current.kill();

      // Master Timeline (1.6s total)
      const tl = gsap.timeline({
        onComplete: () => {
          setIsBlooming(false);
          try {
            sessionStorage.setItem('krat_dream_bloom_seen', 'true');
          } catch {
            // private window fallback
          }
          onBloomComplete?.();
          startIdle();
        },
      });
      mainTimelineRef.current = tl;

      // Step 1: Sprout stem grows (0.0s -> 0.55s)
      tl.to(stem, {
        strokeDashoffset: 0,
        duration: 0.55,
        ease: 'power2.out',
      }, 0);

      // Step 2: Leaves unfurl with 120ms stagger
      tl.to(leafL, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'back.out(1.8)',
      }, 0.22);

      tl.to(leafR, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'back.out(1.8)',
      }, 0.34); // exactly 120ms stagger

      // Step 3: Bud swells and red tip emerges
      tl.to(bud, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, 0.45);

      tl.to(budTip, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      }, 0.52);

      // Step 4: Poppy stem rises from baseline (0.35s -> 0.75s)
      tl.to(poppyStem, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.35);

      // Step 5: Poppy baseline leaves
      tl.to([poppyLeafL, poppyLeafR], {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        stagger: 0.08,
        ease: 'back.out(1.6)',
      }, 0.5);

      // Step 6: Poppy head opens with gentle overshoot (0.65s -> 1.25s)
      tl.to(poppyHead, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.6)',
      }, 0.65);

      // Step 7: Pollen puff (6 tiny dots burst radially and drift away)
      if (pollenDots.length > 0) {
        tl.to(pollenDots, {
          scale: 1.2,
          opacity: 0.9,
          duration: 0.25,
          ease: 'power2.out',
        }, 1.05)
        .to(pollenDots, {
          opacity: 0,
          scale: 0.3,
          duration: 0.45,
          ease: 'power1.in',
        }, 1.25);
      }

      // Step 8: Wordmark & Tagline reveal
      if (wordmark) {
        tl.to(wordmark, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, 0.4);
      }
      if (tagline) {
        tl.to(tagline, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        }, 0.65);
      }
    }, svg);

    return () => ctx.revert();
  }, [animated, isOff, onBloomComplete, startIdle, svgRef]);

  // Initial mount trigger
  useEffect(() => {
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem('krat_dream_bloom_seen') === 'true';
    } catch {
      // ignore
    }

    if (forcePlay || !hasSeen) {
      runBloom();
    } else {
      // Already seen: skip bloom, go straight to idle
      const svg = svgRef.current;
      if (svg) {
        gsap.set(svg.querySelectorAll('#stem, #poppy-stem'), { strokeDashoffset: 0 });
        gsap.set(
          svg.querySelectorAll(
            '#leaf-l, #leaf-r, #bud, #bud-tip, #poppy-leaf-l, #poppy-leaf-r, #poppy-head, #dream-wordmark, #dream-tagline'
          ),
          { scale: 1, opacity: 1 }
        );
        gsap.set(svg.querySelectorAll('.pollen-dot, .falling-petal'), { opacity: 0 });
      }
      startIdle();
    }

    return () => {
      mainTimelineRef.current?.kill();
      idleTimelineRef.current?.kill();
      unregisterSwayRef.current.forEach((unreg) => unreg());
      unregisterSwayRef.current = [];
    };
  }, [forcePlay, runBloom, startIdle, svgRef]);

  // Interactive Hover Reaction (poppy expands slightly & sheds 1-2 floating petals)
  const handleMouseEnter = useCallback(() => {
    if (!interactive || isOff || !animated) return;
    const svg = svgRef.current;
    if (!svg) return;

    const poppyHead = svg.querySelector('#poppy-head');
    const fallingPetals = svg.querySelectorAll('.falling-petal');

    if (poppyHead) {
      gsap.to(poppyHead, {
        scale: 1.08,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (fallingPetals.length > 0) {
      gsap.fromTo(
        fallingPetals,
        { opacity: 1, y: 0, x: 0, scale: 0.9, rotation: 0 },
        {
          opacity: 0,
          y: 18,
          x: (i) => (i % 2 === 0 ? -12 : 14),
          rotation: (i) => (i % 2 === 0 ? -35 : 40),
          scale: 0.4,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power1.out',
        }
      );
    }
  }, [animated, interactive, isOff, svgRef]);

  const handleMouseLeave = useCallback(() => {
    if (!interactive || isOff || !animated) return;
    const svg = svgRef.current;
    if (!svg) return;

    const poppyHead = svg.querySelector('#poppy-head');
    if (poppyHead) {
      gsap.to(poppyHead, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    }
  }, [animated, interactive, isOff, svgRef]);

  return {
    replay: runBloom,
    isBlooming,
    bindHover: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
