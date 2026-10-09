'use client';

/**
 * Krat.OS Dream Theme — Meadow Life Master Orchestrator (MeadowLife.tsx)
 *
 * Diurnal lifecycle management for all creatures and atmospheric particles:
 * - Day/Golden: Butterflies, Bees, Petals, Pollen
 * - Dusk/Night: Fireflies, Night Pollen
 * - Governed by Quality Tier (T3/T2/T1/T0) and MotionContext
 */

import React from 'react';
import { LifeCanvas } from './LifeCanvas';
import { Butterflies } from './Butterflies';
import { Bees } from './Bees';

export function MeadowLife({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-meadow="living-creatures"
      className={`fixed inset-0 pointer-events-none -z-15 select-none overflow-hidden ${className}`}
    >
      <LifeCanvas />
      <Butterflies />
      <Bees />
    </div>
  );
}
