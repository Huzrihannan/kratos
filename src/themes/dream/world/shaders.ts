/**
 * Krat.OS Dream Theme — Living Sky GLSL Shaders (shaders.ts)
 *
 * Fullscreen procedural sky shader running on ogl.
 * Features:
 * - 3-stop vertical gradient matching Layer 0
 * - Atmospheric mie-scattering sun disc with soft bloom
 * - Crescent / luminous moon disc with night glow
 * - Hash-based twinkling star field (< 1Hz frequency for safety)
 * - Procedural FBM cloud billows with silver-lined edges lit toward the sun
 * - Horizon haze and distant ridge silhouette
 */

export const SKY_VERTEX_SHADER = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const SKY_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec3 uSkyTop;
uniform vec3 uSkyMid;
uniform vec3 uSkyHorizon;
uniform vec3 uCloudTint;
uniform vec2 uSunPos;
uniform float uSunIntensity;
uniform vec2 uMoonPos;
uniform float uMoonIntensity;
uniform float uStarAlpha;
uniform float uAmbient;
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

// Hash function for procedural stars
float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// 2D Noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// 4-octave Fractional Brownian Motion (FBM)
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < 4; ++i) {
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Correct aspect ratio for celestial geometry
  float aspect = uResolution.x / uResolution.y;
  vec2 aspectUv = vec2(vUv.x * aspect, vUv.y);
  vec2 sunAspectPos = vec2(uSunPos.x * aspect, 1.0 - uSunPos.y);
  vec2 moonAspectPos = vec2(uMoonPos.x * aspect, 1.0 - uMoonPos.y);

  // 1. Base Sky Gradient (Stops at 0%, 62%, 100%)
  // vUv.y goes 0 at bottom to 1 at top in OpenGL coordinates
  float y = 1.0 - vUv.y; // 0 at top, 1 at horizon
  vec3 skyColor;
  if (y < 0.62) {
    float t = y / 0.62;
    skyColor = mix(uSkyTop, uSkyMid, t);
  } else {
    float t = (y - 0.62) / 0.38;
    skyColor = mix(uSkyMid, uSkyHorizon, t);
  }

  // 2. Stars Field (Twinkles slower than 1Hz, visible when uStarAlpha > 0)
  if (uStarAlpha > 0.02 && vUv.y > 0.25) {
    vec2 starGrid = floor(vUv * vec2(160.0 * aspect, 160.0));
    float starVal = hash21(starGrid);
    if (starVal > 0.985) {
      // Star exists in this grid cell
      vec2 starFract = fract(vUv * vec2(160.0 * aspect, 160.0)) - 0.5;
      float starDist = length(starFract);
      // Twinkle with safe sine frequency (< 0.75 Hz)
      float twinkle = 0.5 + 0.5 * sin(uTime * 1.5 + starVal * 6.28);
      float starBrightness = smoothstep(0.35, 0.0, starDist) * starVal * twinkle;
      // Stars fade near horizon
      float horizonFade = smoothstep(0.25, 0.55, vUv.y);
      skyColor += vec3(0.95, 0.92, 1.0) * starBrightness * uStarAlpha * horizonFade;
    }
  }

  // 3. Sun with Atmospheric Bloom & Soft Disc
  if (uSunIntensity > 0.01) {
    float sunDist = length(aspectUv - sunAspectPos);
    // Core disc
    float sunDisc = smoothstep(0.045, 0.038, sunDist);
    // Corona / inner glow
    float sunGlow = exp(-sunDist * 7.5) * 0.85;
    // Wide atmospheric bloom
    float sunBloom = exp(-sunDist * 2.2) * 0.45;

    vec3 sunLight = mix(vec3(1.0, 0.96, 0.88), vec3(1.0, 0.75, 0.45), y);
    skyColor += sunLight * (sunDisc * 1.2 + sunGlow + sunBloom) * uSunIntensity;
  }

  // 4. Moon with Pearlescent Glow
  if (uMoonIntensity > 0.01) {
    float moonDist = length(aspectUv - moonAspectPos);
    // Moon disc
    float moonDisc = smoothstep(0.038, 0.034, moonDist);
    // Crescent shape mask
    float moonCut = smoothstep(0.032, 0.036, length(aspectUv - (moonAspectPos + vec2(0.012, 0.008))));
    float moonFinalDisc = moonDisc * moonCut;
    // Moon aura
    float moonGlow = exp(-moonDist * 6.0) * 0.5;

    vec3 moonColor = vec3(0.92, 0.95, 1.0);
    skyColor += moonColor * (moonFinalDisc * 1.3 + moonGlow) * uMoonIntensity;
  }

  // 5. Procedural Soft FBM Cloud Layer (Silver-lined edges)
  vec2 cloudUv = vec2(vUv.x * 2.0 + uTime * 0.015, (1.0 - vUv.y) * 1.5);
  float cloudNoise = fbm(cloudUv * 2.5);
  float cloudDensity = smoothstep(0.48, 0.72, cloudNoise);

  if (cloudDensity > 0.01 && vUv.y > 0.15) {
    // Silver lining: highlight when looking toward sun
    vec2 toSun = normalize(sunAspectPos - aspectUv);
    float sunFacing = max(0.0, dot(toSun, vec2(0.0, 1.0)));
    vec3 cloudLit = mix(uCloudTint, vec3(1.0, 0.98, 0.92), sunFacing * uSunIntensity * 0.6);
    // Blend clouds with sky
    float cloudAlpha = cloudDensity * 0.42 * smoothstep(0.15, 0.4, vUv.y);
    skyColor = mix(skyColor, cloudLit, cloudAlpha);
  }

  // 6. Horizon Haze Fog
  float horizonHaze = smoothstep(0.35, 0.0, vUv.y);
  skyColor = mix(skyColor, uSkyHorizon, horizonHaze * 0.45);

  gl_FragColor = vec4(skyColor, 1.0);
}
`;

// Simple upscale pass vertex & fragment shaders
export const UPSCALE_VERTEX_SHADER = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const UPSCALE_FRAGMENT_SHADER = /* glsl */ `
precision mediump float;
uniform sampler2D tMap;
varying vec2 vUv;
void main() {
  gl_FragColor = texture2D(tMap, vUv);
}
`;
