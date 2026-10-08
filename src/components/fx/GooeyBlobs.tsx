"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { useReducedMotion } from "framer-motion";

interface BlobData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  phase: number;
}

interface GooeyBlobsProps {
  blobCount?: number;
  speed?: number;
  cursorAttraction?: number;
  className?: string;
  interactive?: boolean;
}

const BRAND_COLORS = ["#FB9A5E", "#FFD9B8", "#FFC857", "#F47B3A"];

export const GooeyBlobs: React.FC<GooeyBlobsProps> = ({
  blobCount = 6,
  speed = 1,
  cursorAttraction = 0.05,
  className = "",
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filterId = useId().replace(/:/g, "-");
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Track cursor position relative to container
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    // Detect mobile touch devices to use ultra-fast GPU CSS blobs
    const mobileQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    setIsMobile(mobileQuery.matches);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pause when off-screen via IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize blobs
    const blobs: BlobData[] = Array.from({ length: blobCount }, (_, i) => {
      const radius = Math.min(width, height) * (0.15 + (i % 3) * 0.06);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2 * speed,
        vy: (Math.random() - 0.5) * 1.2 * speed,
        baseRadius: radius,
        color: BRAND_COLORS[i % BRAND_COLORS.length],
        phase: Math.random() * Math.PI * 2,
      };
    });

    let time = 0;

    const render = () => {
      time += 0.02 * speed;
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        // Natural pulsing radius
        const r = blob.baseRadius + Math.sin(time + blob.phase) * (blob.baseRadius * 0.15);

        // Cursor attraction if active
        if (interactive && cursorRef.current.active) {
          const dx = cursorRef.current.x - blob.x;
          const dy = cursorRef.current.y - blob.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 10 && dist < 450) {
            blob.vx += (dx / dist) * cursorAttraction;
            blob.vy += (dy / dist) * cursorAttraction;
          }
        }

        // Limit velocity
        const maxV = 2.5 * speed;
        blob.vx = Math.max(-maxV, Math.min(maxV, blob.vx * 0.98));
        blob.vy = Math.max(-maxV, Math.min(maxV, blob.vy * 0.98));

        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce gently inside canvas bounds
        if (blob.x - r < 0) {
          blob.x = r;
          blob.vx = Math.abs(blob.vx);
        } else if (blob.x + r > width) {
          blob.x = width - r;
          blob.vx = -Math.abs(blob.vx);
        }

        if (blob.y - r < 0) {
          blob.y = r;
          blob.vy = Math.abs(blob.vy);
        } else if (blob.y + r > height) {
          blob.y = height - r;
          blob.vy = -Math.abs(blob.vy);
        }

        // Draw blob circle onto canvas
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2);
        ctx.fillStyle = blob.color;
        ctx.fill();
      });

      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      cursorRef.current.active = false;
    };

    if (interactive) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [blobCount, speed, cursorAttraction, interactive, isVisible, shouldReduceMotion, isMobile]);

  if (shouldReduceMotion || isMobile) {
    // Highly optimized CSS blurred organic blobs for mobile touch & reduced motion
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange opacity-40 blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-peach opacity-60 blur-2xl" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-butter opacity-35 blur-xl animate-pulse" style={{ animationDuration: '8s' }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* SVG Gooey Metaball Filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={`gooey-filter-${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Render Canvas filtered by the SVG filter */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-70 transition-opacity duration-700"
        style={{ filter: `url(#gooey-filter-${filterId})` }}
      />
    </div>
  );
};
