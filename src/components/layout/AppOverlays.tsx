'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const EstimatorModal = dynamic(
  () => import('@/components/estimator/EstimatorModal').then((mod) => mod.EstimatorModal),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import('@/components/layout/CommandPalette').then((mod) => mod.CommandPalette),
  { ssr: false }
);

const Boot = dynamic(
  () => import('@/components/fx/Boot').then((mod) => mod.Boot),
  { ssr: false }
);

const Crosshair = dynamic(
  () => import('@/components/fx/Crosshair').then((mod) => mod.Crosshair),
  { ssr: false }
);

const ContactDock = dynamic(
  () => import('@/components/layout/ContactDock').then((mod) => mod.ContactDock),
  { ssr: false }
);

const DreamSkyWorld = dynamic(
  () => import('@/themes/dream/world/DreamSkyWorld').then((mod) => mod.DreamSkyWorld),
  { ssr: false }
);

const DreamCursor = dynamic(
  () => import('@/themes/dream/art/cursor/DreamCursor').then((mod) => mod.DreamCursor),
  { ssr: false }
);

const DawnIntro = dynamic(
  () => import('@/themes/dream/scenes/DawnIntro').then((mod) => mod.DawnIntro),
  { ssr: false }
);

const DreamBackToTop = dynamic(
  () => import('@/themes/dream/scenes/DreamBackToTop').then((mod) => mod.DreamBackToTop),
  { ssr: false }
);

export function AppOverlays() {
  return (
    <>
      <DreamSkyWorld />
      <DreamCursor />
      <DawnIntro />
      <DreamBackToTop />
      <Boot />
      <Crosshair />
      <CommandPalette />
      <ContactDock />
      <EstimatorModal />
    </>
  );
}
