import React from "react";
import Link from "next/link";
import { Home, Sparkles } from "lucide-react";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex items-center justify-center">
      <div className="w-full text-center p-8 sm:p-14 rounded-[36px] bg-peach/40 border-2 border-peach/80 relative overflow-hidden shadow-sm">
        {/* Playful Melting Blobs SVG Graphic */}
        <div className="relative w-48 h-40 mx-auto mb-8 flex items-center justify-center">
          <svg
            viewBox="0 0 200 160"
            className="w-full h-full drop-shadow-sm select-none"
            aria-hidden="true"
          >
            {/* Background pooled puddle */}
            <path
              d="M 20 135 C 20 115, 60 110, 100 110 C 140 110, 180 115, 180 135 C 180 150, 140 155, 100 155 C 60 155, 20 150, 20 135 Z"
              fill="#FFD9B8"
            />
            {/* Melting dripping orange blob */}
            <path
              d="M 60 70 C 60 30, 140 30, 140 70 C 140 95, 155 110, 145 130 C 135 145, 115 135, 100 135 C 85 135, 65 145, 55 130 C 45 110, 60 95, 60 70 Z"
              fill="#FB9A5E"
            />
            {/* Dripping puddle droplet */}
            <circle cx="85" cy="142" r="7" fill="#F47B3A" />
            <circle cx="120" cy="144" r="5" fill="#FFC857" />

            {/* Cute surprised eye cutouts */}
            <circle cx="88" cy="72" r="5" fill="#2A1810" />
            <circle cx="112" cy="72" r="5" fill="#2A1810" />
            {/* Little smile */}
            <path
              d="M 94 85 Q 100 90 106 85"
              stroke="#2A1810"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Big 404 Display */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach/80 text-orange-deep text-xs font-bold uppercase tracking-[0.2em] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-4">
          Oops! This page melted away.
        </h1>

        <p className="font-sans text-ink-soft text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The link you clicked might be outdated or took a detour into a gooey puddle. Let&apos;s get you back to safe, solid ground.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-orange hover:bg-orange-deep text-ink font-bold text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
            <span>Back to Home</span>
          </Link>
          <EstimatorButton
            size="lg"
            variant="secondary"
            className="bg-cream hover:bg-peach text-ink border border-peach"
          >
            Estimate a Project
          </EstimatorButton>
        </div>
      </div>
    </div>
  );
}
