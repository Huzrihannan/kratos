# Krat.OS — Project Brief & Always-On Rules (v2)

You are the lead front-end engineer and creative technologist redesigning the marketing website for KRAT.OS (written exactly "Krat.OS"), a software development company. The site already exists as v1 (old brand "Kratos", soft orange, rounded blobs). You are rebuilding its look, brand, copy tone and motion. You are NOT changing the lead engine, API contracts, env variable names, analytics events or route structure unless a prompt says so.

## THE LOGO
Wordmark "Krat.OS" in a heavy monospace face, with a tall flat red vertical bar to its left, a round red dot as the period, and the tagline "Software solutions" in the same mono family below. Two versions: cream (#EFE3CF) on charcoal (#212121), and charcoal (#292926) on cream (#F6EFDD). The red bar is a text caret / progress bar. The red dot is a status LED / pulse. (See Dream section below for Dream theme logo variant).

## GOAL
Modern, techy, premium, with real creativity. Visually memorable in 5 seconds, still converting visitors into leads. Every page drives toward one action: starting a project conversation (Estimator, WhatsApp, book a call, email).

## CONCEPT
The website behaves like an operating system for your business: boot sequence, windows, command palette (Cmd/Ctrl+K), status bar, caret, HUD micro-type, pipeline. Rule: metaphor lives in the decoration; anything clickable uses plain words ("Estimate my project", not "Initialize").

## VOICE
Precise, confident, plain-spoken, a little dry wit. Short sentences. Speak to the founder or manager with a problem, not to an engineer. No jargon, no hype words ("cutting-edge", "synergy", "revolutionary").

## DESIGN LANGUAGE (DARK & LIGHT THEMES ONLY)
*The rules in this section apply ONLY under data-theme dark and light:*
- Shapes: sharp rectangles. Radius 0 to 4px maximum on any box. Circles only for the red dot, status LEDs and avatars. 1px hairline borders, corner brackets on feature windows, blueprint dot grid with "+" registration marks. NO pills, NO blobs, NO gooey effects, NO soft drop shadows, NO glassmorphism, NO purple or blue gradients, NO stock tech imagery, NO emoji as icons (use Lucide with a 1.5px stroke or custom SVG).
- Color (semantic tokens, theme-aware; dark is default, light theme fully supported; sections may opt into the other theme via data-theme):
  bg #212121 / #F6EFDD; surface #2B2B2B / #EBE3CD; fg #EFE3CF / #292926; fg-muted #A8A294 / #6B665A; line #3A3A3A / #D6CDB5 (decorative only); line-strong #7A7A7A / #8A8473 (inputs and anything that must be perceivable); red #FD142B; red-text #FF4A5C (dark) / #C8102E (light); ok #3DDC84 / #1E9E5A (status LED only).
- RED RULES: red is a laser pointer, not a paint bucket (under about 10% of any viewport). Pure red only for shapes, the caret, LEDs, thin lines and display text of 24px or larger. Small red text uses red-text. NEVER place small text on a red fill. Primary buttons are cream fill with charcoal text and a red accent.
- Typography: JetBrains Mono (headlines 700-800 with -0.04em tracking, labels, numbers, code) and Geist (body). Labels are small uppercase mono, tracked 0.08em, like "/01 — MODULES". Fluid type with clamp(); headlines up to about 8rem. Load with next/font.

## MOTION RULES (DARK & LIGHT THEMES ONLY)
*The rules in this section apply ONLY under data-theme dark and light:*
- Mechanical precision, not bounce: no springs, no squish, no overshoot. Easing: expo-out (0.16,1,0.3,1) for reveals, power4 in-out (0.76,0,0.24,1) for wipes, linear for typing/progress. Durations: micro 150ms, UI 300ms, section 700ms, hero 1200ms. Typing 28-40ms per char with jitter.
- Named effects live in src/components/fx and are reused (Boot, Decode, Caret, TypeLines, SpotlightGrid, ShaderField, Window, Pipeline, Odometer, Wipe, Tilt, Tape, Magnetic, Crosshair, HUD, Glitch). Do not write one-off animations inside sections when a named effect exists.
- One tool per job: GSAP + ScrollTrigger + SplitText for choreography, pinned scenes and text effects; Lenis wired to ScrollTrigger; Motion (Framer Motion) ONLY for mount/unmount, drag and shared layout; ogl for the single hero shader; cmdk for the command palette; next-themes for theme; inline SVG for motion-graphic scenes.
- MotionContext with three levels: full, lite, off. off = prefers-reduced-motion (everything in final state, no loops). lite = Save-Data, low-end devices, small screens (no shader, no custom cursor, no tilt, no pinned scenes). A footer toggle lets users switch.
- Animate only transform, opacity, clip-path, and filter sparingly; never layout properties. will-change only while animating. Pause every loop and canvas when off-screen or the tab is hidden. One WebGL canvas at a time, DPR capped at 1.5. Max two pinned scenes on the home page, each at most 250vh; never hijack the wheel. No flashing above 3Hz.
- Real text stays real: headings that decode or type keep their true text in the DOM from first paint. Decorative HUD elements are aria-hidden.

## TECH STACK
Existing: Next.js App Router + TypeScript strict, Tailwind, React Hook Form + Zod, Resend, Supabase, Turnstile, Vercel, Cloudflare Pages. Add: gsap (ScrollTrigger, SplitText), ogl, cmdk, next-themes. Remove when unused: Fredoka, Outfit, GooeyBlobs, Squish, CircleReveal, CursorFollower and any orange tokens.

## ENGINEERING STANDARDS (APPLIES TO ALL THEMES)
- Mobile-first. Test 360, 768, 1280, 1920. Touch targets at least 44px (48px in Dream).
- Targets on mobile: Lighthouse Performance >= 90 (>= 85 in Dream with auto-tier), Accessibility / Best Practices / SEO >= 95, LCP < 2.5s, CLS < 0.05, INP < 200ms. Home first-load JS about 220 KB gzipped or less; heavy effects in lazy chunks (dynamic import, ssr false). Report bundle sizes after every prompt.
- Accessibility: semantic HTML, visible focus (2px red-text outline with 2px offset in Dark/Light; 3px indigo ring + 2px paper inner ring in Dream), full keyboard support, AA contrast at minimum, command palette and modals with proper focus management.
- Content lives in src/content as typed data. CONTENT RULE: Never render the text "[PLACEHOLDER]", "lorem ipsum", "TODO", "TBD", "undefined", "NaN" or any bracketed template token to a visitor. Descriptive copy (what a service is, how the process works, FAQ answers, principles) must be written as real, finished copy in the brand voice, without unverifiable claims (no invented numbers, durations, guarantees, certifications, clients, awards, results or testimonials). Facts only the company can supply are stored in src/content with status "needs-input"; when a fact is missing, the feature that depends on it is HIDDEN, not faked. Track everything that needs owner input in PLACEHOLDERS.md (internal only, never rendered).
- Secrets only via environment variables. Small reusable components, no dead code.
- After every task: lint, typecheck, build, existing tests; then verify in the browser at mobile and desktop widths and attach screenshots to the walkthrough.

## THEMES
The site has three themes selectable in the top nav: dark (default, technical), light, and dream. All content, routes, API, analytics event names and env variables are unchanged. 

## THE ONE ARCHITECTURE RULE
Never branch accessible content by theme. Themes differ only in (1) CSS tokens, (2) CSS skins of shared components, (3) decorative aria-hidden scenes mounted in reserved slots (ThemedSlot) and code-split per theme, and (4) short decorative strings via `<Flair dark light dream />` (at most 12 words, never SEO-critical). Headlines and paragraphs are identical in every theme. Dream code, textures and fonts are never loaded unless Dream is active. Dark and Light first-load JS may grow by at most 5 KB gzipped.

## DREAM DESIGN LANGUAGE ("Plant an idea. Watch it bloom.")
- Audience: non-technical visitors. Plain language, 18px base text, 48px tap targets, line height 1.65, no tiny uppercase labels, no terminal/OS/HUD metaphors, nothing auto-advances, no hover-only information.
- Look: storybook, painterly vector. Layered flat shapes with 2-3 tonal steps, soft gradients on large forms only, no outlines, organic asymmetric curves, light from the sun, one shared paper-grain texture. All art is original; no stock imagery, no copied characters, no imitation of a named artist or studio.
- Shapes: pebbles, clouds, petals. Radii 20-40px, pill buttons, soft COLOURED shadows. Frosted glass only for the nav and dialogs, with a solid fallback.
- Type: Fraunces (opsz, SOFT 100, WONK, weight 500-700) for headlines, Figtree for body and UI, italic Fraunces for small notes. No monospace.
- Palette tokens: paper #FFFAF0, paper-2 #FFF1DC, ink #2B2A52, ink-soft #55537A, link #3B3AA0, poppy #FD142B (brand red: shapes and display 24px+ only), poppy-text #C8102E (small red text), night-paper #1B1E4B, cream #FFF6E5, cream-soft #CFCBEA, grass-far #A8D5A2, grass-mid #6FB07A, grass-near #3E8C5A, grass-deep #2A6B48, sage #5E9B6A (decoration only), daisy yolk #FFC83D, sunflower #FFB400, lavender #9B8CE0, cherry #FFB7D1.
- Poppy rule: the poppy is the brand flower and the primary-action flower. Service flowers: Web = daisy, Mobile = tulip, E-commerce = sunflower, AI and automation = dandelion, UI/UX = cherry blossom, Maintenance = clover.
- Motion: slow, floaty, organic. 700-1400ms, sine and quart easing, slight randomness in loops, gentle overshoot only for blooms.
- Voice (flair only): warm, plain, nature words. Anything clickable stays literal ("Estimate my project").
- TEXT RULE: body text sits on paper or night-paper surfaces. Only display headlines (40px+) may sit directly on the sky, with a scrim, and they must pass the SkyContrast test (worst-case contrast of text against the pixels behind it, 4.5:1, or 3:1 at 24px+). Avoid backgrounds with relative luminance between 0.17 and 0.29 behind text.

## LIVING SKY
One SkyDriver state (journey / live / fixed; dawn, day, golden, dusk, night keyframes interpolated in OKLab) drives CSS variables and shader uniforms. Layers fail safely: 0 CSS gradient and hills (server-rendered), 1 sprite clouds and SVG hills, 2 one fixed WebGL World canvas. Only ONE WebGL context exists at any time.

## QUALITY
Governor tiers T3 / T2 / T1 / T0 mapped to motion levels full / lite / off, benchmarked, auto-downgrading, remembered. One shared animation ticker. World renders 30fps idle, 60fps active, 15fps after 20s idle, 0 when hidden. Dream targets: mobile Performance >= 85, LCP < 2.5s, CLS < 0.05, INP < 200ms; Dark and Light keep their existing targets. Calm switch always visible. No flashing above 3Hz.

## WORKING STYLE
For any task touching more than about 3 files, produce an implementation plan first and wait for approval. Ask before architecture-changing decisions. Keep CHANGELOG.md updated. Work on branch theme/dream.
For Dream work: stop for owner approval after the logo, the sky, the meadow and the hero. Take screenshots at 360 and 1440 for every state you build and critique them against this brief before reporting.
