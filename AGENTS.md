# Krat.OS — Project Brief & Always-On Rules (v2)

You are the lead front-end engineer and creative technologist redesigning the marketing website for KRAT.OS (written exactly "Krat.OS"), a software development company. The site already exists as v1 (old brand "Kratos", soft orange, rounded blobs). You are rebuilding its look, brand, copy tone and motion. You are NOT changing the lead engine, API contracts, env variable names, analytics events or route structure unless a prompt says so.

## THE LOGO
Wordmark "Krat.OS" in a heavy monospace face, with a tall flat red vertical bar to its left, a round red dot as the period, and the tagline "Software solutions" in the same mono family below. Two versions: cream (#EFE3CF) on charcoal (#212121), and charcoal (#292926) on cream (#F6EFDD). The red bar is a text caret / progress bar. The red dot is a status LED / pulse.

## GOAL
Modern, techy, premium, with real creativity. Visually memorable in 5 seconds, still converting visitors into leads. Every page drives toward one action: starting a project conversation (Estimator, WhatsApp, book a call, email).

## CONCEPT
The website behaves like an operating system for your business: boot sequence, windows, command palette (Cmd/Ctrl+K), status bar, caret, HUD micro-type, pipeline. Rule: metaphor lives in the decoration; anything clickable uses plain words ("Estimate my project", not "Initialize").

## VOICE
Precise, confident, plain-spoken, a little dry wit. Short sentences. Speak to the founder or manager with a problem, not to an engineer. No jargon, no hype words ("cutting-edge", "synergy", "revolutionary").

## DESIGN LANGUAGE
- Shapes: sharp rectangles. Radius 0 to 4px maximum on any box. Circles only for the red dot, status LEDs and avatars. 1px hairline borders, corner brackets on feature windows, blueprint dot grid with "+" registration marks. NO pills, NO blobs, NO gooey effects, NO soft drop shadows, NO glassmorphism, NO purple or blue gradients, NO stock tech imagery, NO emoji as icons (use Lucide with a 1.5px stroke or custom SVG).
- Color (semantic tokens, theme-aware; dark is default, light theme fully supported; sections may opt into the other theme via data-theme):
  bg #212121 / #F6EFDD; surface #2B2B2B / #EBE3CD; fg #EFE3CF / #292926; fg-muted #A8A294 / #6B665A; line #3A3A3A / #D6CDB5 (decorative only); line-strong #7A7A7A / #8A8473 (inputs and anything that must be perceivable); red #FD142B; red-text #FF4A5C (dark) / #C8102E (light); ok #3DDC84 / #1E9E5A (status LED only).
- RED RULES: red is a laser pointer, not a paint bucket (under about 10% of any viewport). Pure red only for shapes, the caret, LEDs, thin lines and display text of 24px or larger. Small red text uses red-text. NEVER place small text on a red fill. Primary buttons are cream fill with charcoal text and a red accent.
- Typography: JetBrains Mono (headlines 700-800 with -0.04em tracking, labels, numbers, code) and Geist (body). Labels are small uppercase mono, tracked 0.08em, like "/01 — MODULES". Fluid type with clamp(); headlines up to about 8rem. Load with next/font.

## MOTION RULES
- Mechanical precision, not bounce: no springs, no squish, no overshoot. Easing: expo-out (0.16,1,0.3,1) for reveals, power4 in-out (0.76,0,0.24,1) for wipes, linear for typing/progress. Durations: micro 150ms, UI 300ms, section 700ms, hero 1200ms. Typing 28-40ms per char with jitter.
- Named effects live in src/components/fx and are reused (Boot, Decode, Caret, TypeLines, SpotlightGrid, ShaderField, Window, Pipeline, Odometer, Wipe, Tilt, Tape, Magnetic, Crosshair, HUD, Glitch). Do not write one-off animations inside sections when a named effect exists.
- One tool per job: GSAP + ScrollTrigger + SplitText for choreography, pinned scenes and text effects; Lenis wired to ScrollTrigger; Motion (Framer Motion) ONLY for mount/unmount, drag and shared layout; ogl for the single hero shader; cmdk for the command palette; next-themes for theme; inline SVG for motion-graphic scenes.
- MotionContext with three levels: full, lite, off. off = prefers-reduced-motion (everything in final state, no loops). lite = Save-Data, low-end devices, small screens (no shader, no custom cursor, no tilt, no pinned scenes). A footer toggle lets users switch.
- Animate only transform, opacity, clip-path, and filter sparingly; never layout properties. will-change only while animating. Pause every loop and canvas when off-screen or the tab is hidden. One WebGL canvas at a time, DPR capped at 1.5. Max two pinned scenes on the home page, each at most 250vh; never hijack the wheel. No flashing above 3Hz.
- Real text stays real: headings that decode or type keep their true text in the DOM from first paint. Decorative HUD elements are aria-hidden.

## TECH STACK
Existing: Next.js App Router + TypeScript strict, Tailwind, React Hook Form + Zod, Resend, Supabase, Turnstile, Vercel. Add: gsap (ScrollTrigger, SplitText), ogl, cmdk, next-themes. Remove when unused: Fredoka, Outfit, GooeyBlobs, Squish, CircleReveal, CursorFollower and any orange tokens.

## ENGINEERING STANDARDS
- Mobile-first. Test 360, 768, 1280, 1920. Touch targets at least 44px.
- Targets on mobile: Lighthouse Performance >= 90, Accessibility / Best Practices / SEO >= 95, LCP < 2.5s, CLS < 0.05, INP < 200ms. Home first-load JS about 220 KB gzipped or less; heavy effects in lazy chunks (dynamic import, ssr false). Report bundle sizes after every prompt.
- Accessibility: semantic HTML, visible focus (2px red-text outline with 2px offset), full keyboard support, AA contrast at minimum, command palette and modals with proper focus management.
- Content lives in src/content as typed data. Prefix unfinished copy with "[PLACEHOLDER]". Never invent clients, testimonials, statistics, awards or live metrics; decorative charts must carry no numbers.
- Secrets only via environment variables. Small reusable components, no dead code.
- After every task: lint, typecheck, build, existing tests; then verify in the browser at mobile and desktop widths and attach screenshots to the walkthrough.

## WORKING STYLE
For any task touching more than about 3 files, produce an implementation plan first and wait for approval. Ask before architecture-changing decisions. Keep CHANGELOG.md updated. Work on branch redesign/krat-os-v2.
