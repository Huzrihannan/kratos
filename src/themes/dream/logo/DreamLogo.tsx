'use client';

import React, { useRef } from 'react';
import { KRAT_PATH, OS_PATH, TAGLINE_PATH } from './logoPaths';
import { useBloomAnimation } from './useBloomAnimation';

export type DreamLogoLadder = 'full' | 'mark' | 'simple';

export interface DreamLogoProps {
  /**
   * Primary dimension in pixels (scales proportionally).
   * Default is 36.
   */
  size?: number;
  /**
   * Explicit size ladder level override.
   * - "full": Full lockup (Sprout + "Krat" + Poppy + "OS" + Tagline) (>=120px)
   * - "mark": Sprout & Poppy only on baseline, no typography (48-120px)
   * - "simple": Collapses to flat red rounded bar + dot (24-48px and favicon)
   */
  ladderLevel?: DreamLogoLadder;
  /**
   * Color scheme: "day" (ink on paper), "night" (cream on dark), or "auto" (theme-aware).
   */
  colorScheme?: 'day' | 'night' | 'auto';
  /**
   * Whether to include the "Software solutions" tagline in the full lockup.
   */
  showTagline?: boolean;
  /**
   * Whether to run the GSAP bloom and idle sway animations.
   */
  animated?: boolean;
  /**
   * Whether to react to hover interactions (petal shed, bloom swell).
   */
  interactive?: boolean;
  /**
   * Force replay of the bloom timeline regardless of session state.
   */
  forcePlay?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Callback fired when bloom completes.
   */
  onBloomComplete?: () => void;
}

export function DreamLogo({
  size = 36,
  ladderLevel,
  colorScheme = 'auto',
  showTagline = true,
  animated = true,
  interactive = true,
  forcePlay = false,
  className = '',
  onBloomComplete,
}: DreamLogoProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Derive rendered width to accurately apply size ladder
  const aspect = showTagline ? 302 / 96 : 302 / 74;
  const renderedWidth = Math.round(size * aspect);

  // Derive size ladder level if not explicitly provided
  const resolvedLadder: DreamLogoLadder =
    ladderLevel ??
    (renderedWidth >= 100 || size >= 24
      ? 'full'
      : size >= 18
      ? 'mark'
      : 'simple');

  // Wire GSAP bloom & sway animation
  const { bindHover } = useBloomAnimation(svgRef, {
    animated: animated && resolvedLadder !== 'simple',
    interactive: interactive && resolvedLadder !== 'simple',
    forcePlay,
    onBloomComplete,
  });

  // Color mappings
  const isNight = colorScheme === 'night';
  const textFill = isNight
    ? '#FFF6E5'
    : colorScheme === 'day'
    ? '#2B2A52'
    : 'var(--ink, #2B2A52)';

  const taglineFill = isNight
    ? '#CFCBEA'
    : colorScheme === 'day'
    ? '#55537A'
    : 'var(--ink-soft, #55537A)';

  const stemStroke = isNight ? '#74B882' : '#5E9B6A';
  const leafFill = isNight ? '#93CF99' : '#7BB77F';
  const budFill = isNight ? '#4C9566' : '#3F7D55';

  // --- RENDER 1: SIMPLE MARK (Flat red bar + dot) ---
  if (resolvedLadder === 'simple') {
    return (
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        role="img"
        aria-label="Krat.OS"
        className={`inline-block select-none overflow-visible ${className}`}
      >
        <rect x="18" y="10" width="7" height="44" rx="2" fill="#FD142B" />
        <circle cx="42" cy="48" r="5.5" fill="#FD142B" />
      </svg>
    );
  }

  // --- RENDER 2: SPROUT & POPPY MARK (48-120px) ---
  if (resolvedLadder === 'mark') {
    const markAspect = 88 / 74;
    const width = Math.round(size * markAspect);

    return (
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 88 74"
        width={width}
        height={size}
        role="img"
        aria-label="Krat.OS"
        className={`inline-block select-none overflow-visible ${className}`}
        {...(interactive ? bindHover : {})}
      >
        {/* Sprout at x=22 */}
        <g id="dream-sprout">
          <path
            id="stem"
            d="M 21.5 68 C 21.5 54, 19.5 40, 21.5 28 C 22.2 23.5, 23.5 19, 23.8 15"
            fill="none"
            stroke={stemStroke}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="leaf-l"
            d="M 20.5 47 C 14.5 45.5, 10 39.5, 9.2 36 C 8.5 39.8, 12.5 48.5, 20.8 50.2 Z"
            fill={leafFill}
            style={{ transformOrigin: '20.5px 47px' }}
          />
          <path
            id="leaf-r"
            d="M 22.2 34 C 27.5 31.5, 31.8 25.5, 33 22 C 32.5 26.2, 28.5 34.5, 22.8 37 Z"
            fill={leafFill}
            style={{ transformOrigin: '22.2px 34px' }}
          />
          <path
            id="bud"
            d="M 21.2 17.5 C 19.8 15, 20.5 10.5, 23.8 8.5 C 27 10.5, 27.8 15, 26.4 17.5 C 25 19.5, 22.5 19.5, 21.2 17.5 Z"
            fill={budFill}
            style={{ transformOrigin: '23.8px 14px' }}
          />
          <path
            id="bud-tip"
            d="M 22.6 11 C 22 9.5, 23.5 6.8, 23.8 6.2 C 24.2 6.8, 25.6 9.5, 25 11 C 24.5 12, 23.1 12, 22.6 11 Z"
            fill="#FD142B"
            style={{ transformOrigin: '23.8px 9px' }}
          />
        </g>

        {/* Poppy at x=64 */}
        <g id="dream-poppy">
          <path
            id="poppy-stem"
            d="M 64 68 C 63.5 61, 64.5 55, 64 48"
            fill="none"
            stroke={stemStroke}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            id="poppy-leaf-l"
            d="M 63 67 C 58 66, 54 62.5, 52.5 60.5 C 53.5 64, 58 68, 63.5 68 Z"
            fill={leafFill}
            style={{ transformOrigin: '63px 67px' }}
          />
          <path
            id="poppy-leaf-r"
            d="M 65 66.5 C 69.5 65.5, 73.5 61.5, 75 59.5 C 74 63.5, 70 67.5, 64.5 67.5 Z"
            fill={leafFill}
            style={{ transformOrigin: '65px 66.5px' }}
          />
          <g id="poppy-head" style={{ transformOrigin: '64px 48px' }}>
            <g id="petals-back">
              <path d="M 55.5 46 C 54 38, 74 38, 72.5 46 C 67 49, 61 49, 55.5 46 Z" fill="#A80A1C" />
              <path d="M 62 40 C 53 40, 53 54, 62 55 C 61 50, 61 45, 62 40 Z" fill="#990818" />
              <path d="M 66 40 C 75 40, 75 54, 66 55 C 67 50, 67 45, 66 40 Z" fill="#990818" />
              <path d="M 56.5 50 C 55 57.5, 73 57.5, 71.5 50 C 67 47, 61 47, 56.5 50 Z" fill="#A80A1C" />
            </g>
            <g id="petals-front">
              <path
                d="M 57 47 C 56 39.5, 61 37.5, 64 37.2 C 67 37.5, 72 39.5, 71 47 C 67.5 49.5, 60.5 49.5, 57 47 Z"
                fill="#FD142B"
              />
              <path
                d="M 59.5 41 C 62 39.2, 66 39.2, 68.5 41"
                stroke="#FF4A5C"
                strokeWidth="0.9"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
              <path
                d="M 56 49 C 55 56, 61 59, 64 59.2 C 67 59, 73 56, 72 49 C 68 47, 60 47, 56 49 Z"
                fill="#FD142B"
              />
              <path
                d="M 59 56 C 62 57.6, 66 57.6, 69 56"
                stroke="#FF4A5C"
                strokeWidth="0.9"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
              <path
                d="M 63 41 C 56 40.5, 53 46, 53 50 C 53 54, 57 55.5, 63 54.5 C 62 49, 62 46, 63 41 Z"
                fill="#E01126"
              />
              <path
                d="M 65 41 C 72 40.5, 75 46, 75 50 C 75 54, 71 55.5, 65 54.5 C 66 49, 66 46, 65 41 Z"
                fill="#E01126"
              />
            </g>
            <circle id="centre" cx="64" cy="48" r="3.4" fill="#2A1B2E" />
            <path
              d="M 62.2 48 L 65.8 48 M 64 46.2 L 64 49.8 M 62.8 46.8 L 65.2 49.2 M 62.8 49.2 L 65.2 46.8"
              stroke="#422C47"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
            {/* 14 Stamens */}
            <g id="stamens">
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i * 2 * Math.PI) / 14;
                const sx = (64 + Math.cos(angle) * 5.6).toFixed(2);
                const sy = (48 + Math.sin(angle) * 5.6).toFixed(2);
                return <circle key={i} cx={sx} cy={sy} r="0.75" fill="#FFD47A" />;
              })}
            </g>
          </g>

          {/* Interactive Pollen Dots */}
          <g className="pollen-group">
            {[-12, -7, -2, 5, 9, 13].map((offX, i) => (
              <circle
                key={i}
                className="pollen-dot"
                cx={64 + offX}
                cy={48 - (i % 2 === 0 ? 8 : 12)}
                r="1.2"
                fill="#FFD47A"
                opacity="0"
              />
            ))}
          </g>

          {/* Interactive Falling Petals on Hover */}
          <g className="falling-petals-group">
            <path
              className="falling-petal"
              d="M 63 49 C 61 52, 60 55, 62 57 C 64 57, 65 53, 63 49 Z"
              fill="#FD142B"
              opacity="0"
            />
            <path
              className="falling-petal"
              d="M 65 49 C 67 52, 68 55, 66 57 C 64 57, 63 53, 65 49 Z"
              fill="#E01126"
              opacity="0"
            />
          </g>
        </g>
      </svg>
    );
  }

  // --- RENDER 3: FULL LOCKUP (>=120px) ---
  const viewBox = showTagline ? '0 0 302 96' : '0 0 302 74';
  const width = renderedWidth;

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={size}
      role="img"
      aria-label="Krat.OS — Software solutions"
      className={`inline-block select-none overflow-visible ${className}`}
      {...(interactive ? bindHover : {})}
    >
      {/* 1. Sprout (at x=22 on baseline y=68) */}
      <g id="dream-sprout">
        <path
          id="stem"
          d="M 21.5 68 C 21.5 54, 19.5 40, 21.5 28 C 22.2 23.5, 23.5 19, 23.8 15"
          fill="none"
          stroke={stemStroke}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="leaf-l"
          d="M 20.5 47 C 14.5 45.5, 10 39.5, 9.2 36 C 8.5 39.8, 12.5 48.5, 20.8 50.2 Z"
          fill={leafFill}
          style={{ transformOrigin: '20.5px 47px' }}
        />
        <path
          id="leaf-r"
          d="M 22.2 34 C 27.5 31.5, 31.8 25.5, 33 22 C 32.5 26.2, 28.5 34.5, 22.8 37 Z"
          fill={leafFill}
          style={{ transformOrigin: '22.2px 34px' }}
        />
        <path
          id="bud"
          d="M 21.2 17.5 C 19.8 15, 20.5 10.5, 23.8 8.5 C 27 10.5, 27.8 15, 26.4 17.5 C 25 19.5, 22.5 19.5, 21.2 17.5 Z"
          fill={budFill}
          style={{ transformOrigin: '23.8px 14px' }}
        />
        <path
          id="bud-tip"
          d="M 22.6 11 C 22 9.5, 23.5 6.8, 23.8 6.2 C 24.2 6.8, 25.6 9.5, 25 11 C 24.5 12, 23.1 12, 22.6 11 Z"
          fill="#FD142B"
          style={{ transformOrigin: '23.8px 9px' }}
        />
      </g>

      {/* 2. Wordmark "Krat" and "OS" in Fraunces */}
      <g id="dream-wordmark" fill={textFill} className="transition-colors duration-200">
        <path id="wordmark-krat" d={KRAT_PATH} />
        <path id="wordmark-os" d={OS_PATH} />
      </g>

      {/* 3. Poppy (centered at x=186 on baseline y=68) */}
      <g id="dream-poppy">
        <path
          id="poppy-stem"
          d="M 186 68 C 185.5 61, 186.5 55, 186 48"
          fill="none"
          stroke={stemStroke}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          id="poppy-leaf-l"
          d="M 185 67 C 180 66, 176 62.5, 174.5 60.5 C 175.5 64, 180 68, 185.5 68 Z"
          fill={leafFill}
          style={{ transformOrigin: '185px 67px' }}
        />
        <path
          id="poppy-leaf-r"
          d="M 187 66.5 C 191.5 65.5, 195.5 61.5, 197 59.5 C 196 63.5, 192 67.5, 186.5 67.5 Z"
          fill={leafFill}
          style={{ transformOrigin: '187px 66.5px' }}
        />
        <g id="poppy-head" style={{ transformOrigin: '186px 48px' }}>
          <g id="petals-back">
            <path d="M 177.5 46 C 176 38, 196 38, 194.5 46 C 189 49, 183 49, 177.5 46 Z" fill="#A80A1C" />
            <path d="M 184 40 C 175 40, 175 54, 184 55 C 183 50, 183 45, 184 40 Z" fill="#990818" />
            <path d="M 188 40 C 197 40, 197 54, 188 55 C 189 50, 189 45, 188 40 Z" fill="#990818" />
            <path d="M 178.5 50 C 177 57.5, 195 57.5, 193.5 50 C 189 47, 183 47, 178.5 50 Z" fill="#A80A1C" />
          </g>
          <g id="petals-front">
            <path
              d="M 179 47 C 178 39.5, 183 37.5, 186 37.2 C 189 37.5, 194 39.5, 193 47 C 189.5 49.5, 182.5 49.5, 179 47 Z"
              fill="#FD142B"
            />
            <path
              d="M 181.5 41 C 184 39.2, 188 39.2, 190.5 41"
              stroke="#FF4A5C"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 178 49 C 177 56, 183 59, 186 59.2 C 189 59, 195 56, 194 49 C 190 47, 182 47, 178 49 Z"
              fill="#FD142B"
            />
            <path
              d="M 181 56 C 184 57.6, 188 57.6, 191 56"
              stroke="#FF4A5C"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 185 41 C 178 40.5, 175 46, 175 50 C 175 54, 179 55.5, 185 54.5 C 184 49, 184 46, 185 41 Z"
              fill="#E01126"
            />
            <path
              d="M 187 41 C 194 40.5, 197 46, 197 50 C 197 54, 193 55.5, 187 54.5 C 188 49, 188 46, 187 41 Z"
              fill="#E01126"
            />
          </g>
          <circle id="centre" cx="186" cy="48" r="3.4" fill="#2A1B2E" />
          <path
            d="M 184.2 48 L 187.8 48 M 186 46.2 L 186 49.8 M 184.8 46.8 L 187.2 49.2 M 184.8 49.2 L 187.2 46.8"
            stroke="#422C47"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          {/* 14 Stamens */}
          <g id="stamens">
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i * 2 * Math.PI) / 14;
              const sx = (186 + Math.cos(angle) * 5.6).toFixed(2);
              const sy = (48 + Math.sin(angle) * 5.6).toFixed(2);
              return <circle key={i} cx={sx} cy={sy} r="0.75" fill="#FFD47A" />;
            })}
          </g>
        </g>

        {/* Interactive Pollen Puff Dots */}
        <g className="pollen-group">
          {[-14, -8, -3, 4, 10, 15].map((offX, i) => (
            <circle
              key={i}
              className="pollen-dot"
              cx={186 + offX}
              cy={48 - (i % 2 === 0 ? 9 : 14)}
              r="1.2"
              fill="#FFD47A"
              opacity="0"
            />
          ))}
        </g>

        {/* Interactive Falling Petals on Hover */}
        <g className="falling-petals-group">
          <path
            className="falling-petal"
            d="M 185 49 C 183 52, 182 55, 184 57 C 186 57, 187 53, 185 49 Z"
            fill="#FD142B"
            opacity="0"
          />
          <path
            className="falling-petal"
            d="M 187 49 C 189 52, 190 55, 188 57 C 186 57, 185 53, 187 49 Z"
            fill="#E01126"
            opacity="0"
          />
        </g>
      </g>

      {/* 4. Tagline "Software solutions" in Figtree */}
      {showTagline && (
        <g id="dream-tagline" fill={taglineFill} className="transition-colors duration-200">
          <path d={TAGLINE_PATH} />
        </g>
      )}
    </svg>
  );
}

export default DreamLogo;
