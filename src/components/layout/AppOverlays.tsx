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

export function AppOverlays() {
  return (
    <>
      <DreamSkyWorld />
      <Boot />
      <Crosshair />
      <CommandPalette />
      <ContactDock />
      <EstimatorModal />
    </>
  );
}

