'use client';

import React, { useEffect, useState } from 'react';

export interface HUDClockProps {
  timeZone?: string;
  label?: string;
  className?: string;
}

export function HUDClock({
  timeZone = 'Asia/Colombo',
  label = 'CMB',
  className = '',
}: HUDClockProps) {
  const [time, setTime] = useState<string>('--:--:--');

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTime(formatted);
      } catch {
        setTime(new Date().toTimeString().slice(0, 8));
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-muted ${className}`}
      aria-hidden="true"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
      <span>{label}</span>
      <span className="text-fg">{time}</span>
    </span>
  );
}

export interface HUDCoordinatesProps {
  className?: string;
  prefix?: string;
}

export function HUDCoordinates({
  className = '',
  prefix = 'LOC',
}: HUDCoordinatesProps) {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-fg-muted ${className}`}
      aria-hidden="true"
    >
      <span>[{prefix}]</span>
      <span className="text-fg">
        X:{String(coords.x).padStart(4, '0')} Y:{String(coords.y).padStart(4, '0')}
      </span>
    </span>
  );
}

export interface HUDProps {
  index?: string;
  label?: string;
  showClock?: boolean;
  showCoordinates?: boolean;
  timeZone?: string;
  className?: string;
  children?: React.ReactNode;
}

export function HUD({
  index,
  label,
  showClock = false,
  showCoordinates = false,
  timeZone = 'Asia/Colombo',
  className = '',
  children,
}: HUDProps) {
  return (
    <div
      className={`flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-fg-muted select-none ${className}`}
      aria-hidden="true"
    >
      {index && (
        <span className="text-red font-medium">/{index}</span>
      )}
      {label && (
        <span>{'//'} {label}</span>
      )}
      {showCoordinates && <HUDCoordinates />}
      {showClock && <HUDClock timeZone={timeZone} />}
      {children}
    </div>
  );
}
