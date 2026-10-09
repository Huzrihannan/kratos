/**
 * Krat.OS Dream Theme — Unified Wind System (wind.ts)
 *
 * Single physics-based wind engine driving all environmental sway:
 * - Aggregates cursor velocity, scroll delta, and periodic ambient gusts (every 6-12s)
 * - Uses GSAP quickSetter for ultra-high-performance updates without GC allocations
 * - Strictly capped at 60 active registrants
 * - Pauses sway calculations for off-screen elements via IntersectionObserver
 * - Clean disposal and zero-cost when motion is off / tier is T0
 */

import gsap from 'gsap';

export interface SwayOptions {
  strength?: number;
  phase?: number;
  axis?: 'rotation' | 'skewX' | 'x';
  maxAngle?: number;
  transformOrigin?: string;
}

interface SwayRegistrant {
  id: number;
  el: HTMLElement | SVGElement;
  setter: (value: number | string) => void;
  strength: number;
  phase: number;
  axis: 'rotation' | 'skewX' | 'x';
  maxAngle: number;
  isVisible: boolean;
  observer?: IntersectionObserver;
}

const MAX_REGISTRANTS = 60;

class WindEngine {
  private active = false;
  private animId = 0;
  private registrants = new Map<number, SwayRegistrant>();
  private nextId = 1;

  // Physics state
  private cursorVelX = 0;
  private lastCursorX = 0;
  private lastCursorTime = 0;

  private scrollVelY = 0;
  private lastScrollY = 0;
  private lastScrollTime = 0;

  // Ambient gust state
  private gustIntensity = 0;
  private gustTarget = 0;
  private lastGustTime = 0;
  private nextGustInterval = 8000; // 8 seconds

  // Current computed scalar wind (-2.0 to +2.0)
  public currentWind = 0;
  public smoothedWind = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initListeners();
    }
  }

  private initListeners() {
    this.lastCursorTime = performance.now();
    this.lastScrollTime = performance.now();
    this.lastGustTime = performance.now();

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private onMouseMove = (e: MouseEvent) => {
    const now = performance.now();
    const dt = Math.max(now - this.lastCursorTime, 16);
    const dx = e.clientX - this.lastCursorX;

    // Filter extreme jumps
    if (Math.abs(dx) < 800) {
      const rawVel = (dx / dt) * 16; // px per standard frame
      this.cursorVelX += (rawVel * 0.08 - this.cursorVelX) * 0.5;
    }

    this.lastCursorX = e.clientX;
    this.lastCursorTime = now;
  };

  private onScroll = () => {
    const now = performance.now();
    const dt = Math.max(now - this.lastScrollTime, 16);
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const dy = scrollY - this.lastScrollY;

    if (Math.abs(dy) < 600) {
      const rawVel = (dy / dt) * 16;
      this.scrollVelY += (rawVel * 0.05 - this.scrollVelY) * 0.4;
    }

    this.lastScrollY = scrollY;
    this.lastScrollTime = now;
  };

  public triggerGust(strength = 1.0) {
    this.gustTarget = Math.max(this.gustTarget, strength);
  }

  public start() {
    if (this.active || typeof window === 'undefined') return;
    this.active = true;
    this.loop = this.loop.bind(this);
    this.animId = requestAnimationFrame(this.loop);
  }

  public stop() {
    this.active = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = 0;
    }
  }

  private loop = (time: number) => {
    if (!this.active) return;

    if (typeof document !== 'undefined' && document.hidden) {
      this.animId = requestAnimationFrame(this.loop);
      return;
    }

    // 1. Natural Ambient Gust Generator (every 6-12s)
    if (time - this.lastGustTime > this.nextGustInterval) {
      this.lastGustTime = time;
      this.nextGustInterval = 6000 + Math.random() * 6000;
      this.gustTarget = 0.6 + Math.random() * 0.8;
    }

    // Gust smooth approach and decay
    this.gustIntensity += (this.gustTarget - this.gustIntensity) * 0.04;
    this.gustTarget *= 0.985; // gradual dissipation

    // Smooth ambient background breeze
    const tSeconds = time * 0.001;
    const ambientSway =
      Math.sin(tSeconds * 0.9) * 0.25 +
      Math.sin(tSeconds * 0.35) * 0.45 +
      Math.sin(tSeconds * 1.8) * 0.1;

    // Decay input velocities
    this.cursorVelX *= 0.92;
    this.scrollVelY *= 0.90;

    // Combine into net wind vector
    const netWind =
      ambientSway +
      this.gustIntensity * 1.2 +
      (this.cursorVelX * 0.02) +
      (this.scrollVelY * 0.015);

    this.currentWind = netWind;
    this.smoothedWind += (netWind - this.smoothedWind) * 0.15;

    // 2. Drive registrants using GSAP quickSetters
    this.registrants.forEach((reg) => {
      if (!reg.isVisible) return;

      const elementPhase = Math.sin(tSeconds * 1.5 + reg.phase);
      const swayValue = (this.smoothedWind * reg.strength + elementPhase * 0.3) * reg.maxAngle;

      // Clamp within safety limits
      const clamped = Math.max(-reg.maxAngle * 1.8, Math.min(reg.maxAngle * 1.8, swayValue));
      reg.setter(clamped);
    });

    this.animId = requestAnimationFrame(this.loop);
  };

  /**
   * Register a DOM or SVG element for wind-driven sway.
   * Returns an unregister cleanup function.
   */
  public registerSway(
    el: HTMLElement | SVGElement,
    options: SwayOptions = {}
  ): () => void {
    if (typeof window === 'undefined' || !el) {
      return () => {};
    }

    // Enforce 60 registrant ceiling
    if (this.registrants.size >= MAX_REGISTRANTS) {
      console.warn(`[WindEngine] Max registrants (${MAX_REGISTRANTS}) reached. Skipping element.`);
      return () => {};
    }

    const {
      strength = 1.0,
      phase = Math.random() * Math.PI * 2,
      axis = 'rotation',
      maxAngle = 5.5,
      transformOrigin = 'bottom center',
    } = options;

    if (transformOrigin) {
      el.style.transformOrigin = transformOrigin;
    }

    const id = this.nextId++;
    const unit = axis === 'x' ? 'px' : 'deg';
    const setter = gsap.quickSetter(el, axis, unit) as (value: number | string) => void;

    let observer: IntersectionObserver | undefined;
    let isVisible = true;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            isVisible = entries[0].isIntersecting;
            const reg = this.registrants.get(id);
            if (reg) reg.isVisible = isVisible;
          }
        },
        { rootMargin: '50px' }
      );
      observer.observe(el);
    }

    const registrant: SwayRegistrant = {
      id,
      el,
      setter,
      strength,
      phase,
      axis,
      maxAngle,
      isVisible,
      observer,
    };

    this.registrants.set(id, registrant);

    // Auto-start loop when first registrant is added
    if (!this.active) {
      this.start();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      this.registrants.delete(id);
      // Reset transform
      try {
        setter(0);
      } catch {
        // element may have unmounted
      }
      if (this.registrants.size === 0) {
        this.stop();
      }
    };
  }

  public getRegistrantCount(): number {
    return this.registrants.size;
  }
}

export const windEngine = new WindEngine();

/**
 * Convenience function to register element sway.
 */
export function registerSway(
  el: HTMLElement | SVGElement,
  options?: SwayOptions
): () => void {
  return windEngine.registerSway(el, options);
}

/**
 * Hook to read wind dynamics in React.
 */
import { useEffect, useState } from 'react';

export function useWind() {
  const [wind, setWind] = useState(0);

  useEffect(() => {
    let animId = 0;
    const update = () => {
      setWind(windEngine.smoothedWind);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return {
    windSpeed: wind,
    registerSway,
    triggerGust: (s?: number) => windEngine.triggerGust(s),
  };
}
