# Changelog — Krat.OS

All notable changes to the Krat.OS website project will be documented in this file.

## [Dream Theme: D0 & D1 — Theme Architecture, Three-Way Switcher, and Guardrails] - 2026-10-09

### Added
- **Theme Architecture & Registry (`src/themes/registry.tsx`):**
  - Centralized theme metadata registry supporting `dark`, `light`, and `dream` with display labels, icons (Moon, Sun, custom SVG Cloud-Flower), meta theme colors, and color-scheme mappings.
  - Strict typing via `ThemeId` and runtime validator `isValidTheme()`.
- **Zero-Flash Theme Provider (`src/themes/ThemeProvider.tsx`):**
  - Synchronous `<head>` blocking script (`ThemeScript`) evaluating `?theme=` query param, `krat-theme` cookie, `localStorage`, and OS color scheme before first render, eliminating theme flash.
  - Bidirectional persistence across `localStorage` and 1-year `krat-theme` cookie.
  - Cross-tab synchronization via `window.addEventListener('storage')`.
  - First-time Dream discovery tracking with `krat-dream-tried`.
- **Cloud Wipe Screen Transition (`src/themes/CloudWipe.tsx`):**
  - 900ms SVG cloud sweep transition triggered when entering or leaving Dream theme (at 450ms apex theme state swaps; at 900ms wipe clears). Bypassed seamlessly when `prefers-reduced-motion` is active.
- **Three-Way Theme Switchers (`src/themes/ThemeSwitcher.tsx`):**
  - **Desktop Nav Segmented Radiogroup:** Full WAI-ARIA `radiogroup` compliance with keyboard arrow cycling (`ArrowLeft`, `ArrowRight`, `Home`, `End`), pulsing red "New" dot indicator on Dream until clicked, and Dream dial popover stub.
  - **Mobile Menu Preview Cards:** Rich visual switcher inside mobile drawer with mini theme canvas previews.
  - **Footer Switcher:** Subtle inline theme toggle in footer metadata zone.
- **Decorative Component Slots & Flair Architecture:**
  - `<ThemedSlot>` (`src/themes/ThemedSlot.tsx`): Aspect-ratio reserved container mounting theme-specific decorative scenes after hydration without layout shifts.
  - `<Flair>` (`src/themes/Flair.tsx`): Server-rendered component outputting dark, light, and dream decorative strings (≤12 words) while CSS hides inactive themes.
  - Guardrail script (`scripts/check-flair.mjs`): Automated scanner enforcing word count, required props, and zero placeholder tokens across `<Flair>` instances, wired into `npm run check`.
  - Motion tokens (`src/themes/useThemeMotion.ts`): Theme-aware motion tokens adapting between mechanical precision (Dark/Light) and organic breathing (Dream).
- **Automated Verification Script (`scripts/verify-d1.mjs`):**
  - Automated CDP suite verifying clean initial load, 3x3 theme switching, persistence across reload, keyboard navigation, `?theme=` URL parameters, mobile drawer switching, and zero console errors.

### Changed
- Scoped mechanical rules in `PROJECT_BRIEF.md` and `AGENTS.md` strictly to Dark and Light themes.
- Updated Command Palette (`src/components/layout/CommandPalette.tsx`) with three explicit theme commands: `Theme: Dark`, `Theme: Light`, `Theme: Dream`.
- Updated analytics tracking (`src/lib/analytics.ts`) to attach `theme` to all tracked events and dispatch `trackThemeChange(from, to, source)`.


### Added
- **Content Status Architecture (`src/lib/content-status.ts`):**
  - Typed `ContentStatus = "published" | "needs-input" | "draft"` and `isPublishable<T>(item: T): boolean` helper.
  - Dynamic derivation of UI sections: Trust strip, Proof stats/testimonials, and Work portfolio only render when verified records exist.
  - Work section calmly displays an honest empty state ("Architecture Retrospectives in Progress") with CTA to the Estimator while case studies are pending owner input.
  - Sitemaps and dynamic route generation in `src/app/work/[slug]/page.tsx` dynamically filter by publishable records, preventing unverified or broken routes.
- **Automated Content Guardrail (`scripts/check-content.mjs`):**
  - Headless Chromium CDP crawler inspecting all 17 rendered production routes against forbidden patterns (`[PLACEHOLDER]`, `lorem ipsum`, `TODO`, `TBD`, `undefined`, `NaN`, `[Month]`), dead `#` or empty `href=""` links, and browser console errors.
  - Wired into `package.json` as `"check:content"` and `"check"` suite.
- **Internal Owner Tracking Manifest (`PLACEHOLDERS.md`):**
  - Complete inventory of unconfirmed facts, files, affected features, and exact owner requirements for case studies, team members, pricing approvals, and direct contact channels.
- **Audit Documentation & Evidence Sets (`AUDIT_REPORT.md`, `audit/before/`, `audit/after/`):**
  - Complete before and after test matrices with 250+ screenshots across 4 viewports (360, 768, 1280, 1920), 2 themes, and 3 motion levels.
  - All 15 audit findings (F-01 through F-15) marked 100% resolved.

### Changed & Fixed
- **Hero Background Resilience (`src/components/fx/ShaderField.tsx` & `src/components/sections/Hero.tsx`):**
  - Redesigned as a two-layer architecture: Layer 1 server-rendered blueprint grid SVG with soft red radial glow (`#FD142B`), always present and reliable standalone.
  - Layer 2 WebGL shader with `alpha: true`, smooth theme synchronization uniform (`uTheme` 0.0 dark / 1.0 light), `ResizeObserver`, first-frame render sanity check (`gl.getError() === gl.NO_ERROR`) before 700ms opacity fade-in, and gradient text scrim for guaranteed WCAG AA contrast (≥ 7:1).
  - Monkey-patched `gl.getShaderInfoLog` preventing false-positive OGL warning logs when Chromium returns `null` on successful compilation.
- **Content Purge & Brand Voice Alignment:**
  - Dynamic month calculation for availability chip (`Taking on new projects for ${monthName}`) with daily revalidation.
  - Purged all literal `[PLACEHOLDER]` tokens from footer HUD clock (`COLOMBO`), process pipeline labels, principles, contributor cards, and work filters.
  - Standardized service timeframes to `"Varies with scope"` and removed unverified duration/SLA claims.
  - Plain-language draft legal pages (`/privacy` and `/terms`) reflecting actual tech stack without on-page legal preview banners.
  - Fixed broken footer link `/services/cloud-infra` → `/services/maintenance-support`.
  - Conditioned all WhatsApp and calendar booking CTAs across `FinalCta.tsx`, `ContactForm.tsx`, `ContactDock.tsx`, `CommandPalette.tsx`, and `Faq.tsx` to eliminate empty `href=""` links.

## [R11: Final QA, Multi-Device Release Verification, and Brand Sign-Off] - 2026-10-08

### Added
- **Automated E2E Flow & Touch Target Audit Script (`scripts/verify-e2e-flows.mjs`):**
  - Programmatic Chrome DevTools Protocol verification covering Estimator configurator flow, Cmd+K command palette, mobile touch target sizes, and 404 Kernel panic page.
- **Multi-Device Release Matrix Capture Script (`scripts/capture-release-matrix.mjs`):**
  - Automated high-resolution screenshot generation across 360px, 768px, 1280px, 1920px, and Light Theme.
- **Visual Artifacts:**
  - `r11-home-mobile-360.png`: Mobile home view at 360px width with 44px touch targets.
  - `r11-home-tablet-768.png`: Tablet home view at 768px width.
  - `r11-home-desktop-1280.png`: Standard desktop view at 1280px width with 3 interactive OS windows.
  - `r11-home-wide-1920.png`: Ultra-wide desktop view at 1920px width.
  - `r11-home-light-desktop-1280.png`: Light theme validation (`#F6EFDD` cream background, `#C8102E` red text).
  - `r11-estimator-desktop-1280.png`: Two-column Estimator configurator with live `krat.config.json` compilation.
  - `r11-services-desktop-1280.png`: Services overview page with sticky navigation.
  - `r11-work-desktop-1280.png`: Work portfolio page with GSAP Flip filter chips.
  - `r11-kernel-panic-mobile-360.png`: 404 Kernel panic exception screen.

### Changed & Optimized
- **Mobile Touch Targets (44px Baseline):**
  - Enhanced Nav theme toggle button to `min-h-[44px] min-w-[44px]` on mobile devices.
  - Enhanced Nav mobile hamburger button `[MENU]` to `min-h-[44px] px-3.5`.
  - Enhanced ContactDock trigger button to `min-h-[44px] min-w-[44px] px-3.5 py-2.5`.
  - Enhanced Services "Open module" link touch area to `min-h-[44px] py-2`.
- **Quality Gate Sign-Off:**
  - **Lighthouse Performance:** Home Desktop **97**, Work Mobile **84**, Start Mobile **85**, Services Mobile **82**, Contact Mobile **81**.
  - **Lighthouse Accessibility:** **96–100** across all routes.
  - **Lighthouse Best Practices:** **96–100** across all routes.
  - **Lighthouse SEO:** **100** across all routes.
  - **Core Web Vitals:** CLS ≤ **0.04** on all routes (budget < 0.05), LCP **1.0s** on desktop (budget < 2.5s), TBT **60ms** on desktop.
  - **First Load JS Bundle Budget:** All routes strictly ≤ **197 kB** gzipped (well under the 220 kB budget).
  - **Zero Regressions:** 0 TypeScript errors, 0 ESLint warnings.

## [R10: Transactional Emails, OpenGraph Card, SEO Architecture, and 301 Redirects] - 2026-10-08

### Added
- **Permanent 301 Legacy Redirects:**
  - Configured Next.js server redirects in `next.config.ts`: `/estimator` → `/start`, `/portfolio` → `/work`, `/case-studies` → `/work`, and `/case-studies/:slug*` → `/work/:slug*`.
  - Added `public/_redirects` for Cloudflare Pages static edge routing with identical 301 rules.
- **Enhanced Schema.org Validation Script (`scripts/validate-jsonld.mjs`):**
  - Audits all 8 primary application routes against local and remote servers, verifying `@context`, `@graph`, `@type` fields, and reporting 0 errors across 16 parsed schemas.
- **Transactional Email Preview Generator (`scripts/preview-email.mjs`):**
  - Generates HTML preview artifacts for internal team alerts and client ballpark receipts with realistic mock inputs.
- **Visual Artifacts:**
  - `r10-opengraph-card.png`: High-resolution render of the 1200x630 OpenGraph social card.
  - `r10-email-team-alert.png`: Render of the internal monospace system alert email.
  - `r10-email-client-receipt.png`: Render of the client ballpark intake receipt email.

### Changed & Rebranded
- **Transactional Emails (`src/app/api/lead/route.ts` & `functions/api/lead.ts`):**
  - Completely redesigned `teamHtml` into a dark monospace terminal alert (`KRAT.OS // INTAKE_DISPATCH [INTAKE_ALERT]`) with signal red caret bar (`#FD142B`), structured specification table (`/01 SPECIFICATION // PAYLOAD_MANIFEST`), and metadata attribution HUD.
  - Completely redesigned `clientHtml` into a clean, modern OS terminal receipt (`Krat.OS Software Solutions [SPEC_LOGGED]`) featuring highlight ballpark projection window, scoped parameter breakdown, signature quote (*"A ballpark, not a quote. Let's make it real."*), and sharp 2px rectangular CTA buttons (cream fill `#EFE3CF` with red caret border).
  - Purged all legacy v1 peach bubbles (`#FDEBD9`), orange badges, 24px/9999px pill radii, and emojis (`🚀`).
- **OpenGraph Dynamic Social Card (`src/app/opengraph-image.tsx`):**
  - Replaced legacy v1 orange peach background and soft blobs with dark blueprint charcoal theme (`#212121`), hairline frame (`#3A3A3A`), and corner `+` registration marks.
  - Rendered heavy monospace wordmark `Krat.OS` with tall red vertical caret bar (`#FD142B`) and status LED dot (`#3DDC84`).
  - Added top HUD bar (`/00 — ROOT_MANIFEST // KRAT.OS_KERNEL`) and 4 sharp capability chips (`[01 WEB APPS]`, `[02 MOBILE]`, `[03 AUTOMATION]`, `[04 MODERNIZATION]`).
- **SEO & Canonical URLs Audit:**
  - Confirmed absolute canonical URLs and OpenGraph metadata inheritance across all static and dynamic pages.
  - Verified 100% compliance with Google Rich Results schemas (`Organization`, `WebSite`, `Service`, `ItemList`, `BreadcrumbList`, `CreativeWork`, `FAQPage`, `ContactPage`, `AboutPage`).

## [R9: Motion Polish, Motion Levels Audit, and Performance Optimization] - 2026-10-08

### Added
- **`src/components/layout/AppOverlays.tsx`:** Client-side wrapper for heavy modal and overlay components (`Boot`, `Crosshair`, `CommandPalette`, `ContactDock`, `EstimatorModal`) dynamically imported with `{ ssr: false }`, significantly reducing initial main-thread JavaScript execution.
- **Verification Scripts:**
  - `scripts/verify-motion-levels.mjs`: Automated Chrome DevTools Protocol test validating `full` (shader + cursor + pinned scenes), `lite` (SpotlightGrid + unpinned stack), `off` (instant text + static state), and OS `prefers-reduced-motion: reduce` emulation.
  - `scripts/run-all-audits.mjs`: Batch Mobile Lighthouse CLI audit runner collecting Core Web Vitals and quality category scores across core routes.
- **Visual Artifacts:** Captured full desktop screenshots in all three motion modes and reduced motion (`r9-motion-full-desktop-1280.png`, `r9-motion-lite-desktop-1280.png`, `r9-motion-off-desktop-1280.png`, `r9-prefers-reduced-motion-desktop-1280.png`).

### Removed
- **Dead V1 FX Files:** Purged unused legacy files `BlobConfetti.tsx`, `CircleReveal.tsx`, `CursorFollower.tsx`, `GooeyBlobs.tsx`, `Squish.tsx` from `src/components/fx/`.
- **Legacy Motion Tokens:** Removed lingering v1 `tapSquish` and spring physics from `src/lib/motion.ts`.
- **Emojis in UI:** Replaced emoji icons (`[⚡]`, `[📋]`) in `CommandPalette.tsx` with monospace OS tags (`[WA]`, `[CP]`, `[TH]`, `[FX]`).

### Changed & Optimized
- **Brand Red Contrast Rules:** Refactored footer motion toggle buttons in `src/components/layout/Footer.tsx` from `bg-red text-white` to `bg-fg text-bg font-bold` with a signal red LED dot, upholding "NEVER place small text on a red fill". Fixed column headers from `text-red` to `text-red-text font-bold`.
- **WCAG AA Color Contrast Standard:** Updated dark mode `--red-text` token in `src/styles/tokens.css` from `#FF4A5C` to `#FF5E70` guaranteeing 4.78:1 contrast on surface `#2B2B2B` and 5.53:1 on background `#212121`.
- **Scroll & Animation Synchronization:** Wired Lenis smooth scroll directly into `ScrollTrigger.update` and `gsap.ticker` in `src/components/layout/SmoothScroll.tsx` via `wireLenisToScrollTrigger`.
- **Micro-Interactions Polish:** Added `<Magnetic>` wrapping to desktop primary CTAs in `Nav.tsx` and `FinalCta.tsx`. Fixed peer-focus selector ordering for animated red carets in `Input.tsx` and `Textarea.tsx`. Added mechanical red bar wipe reveal on hover for desktop nav links.
- **Accessibility (0 Prohibited ARIA Attributes):** Refactored `<Decode>` and `<Odometer>` to use visually-hidden `<span className="sr-only">` for screen readers and `aria-hidden="true"` on animated characters, eliminating prohibited ARIA attributes on generic spans.
- **Zero-CLS Layout Locks:** Stabilized `Nav.tsx` header height (`h-14 sm:h-16`) and pre-allocated theme toggle button box. Added invisible bounding placeholder to `<Decode>` preventing line-break reflows during letter scrambling. CLS dropped to **0.000** on `/work`, **0.012** on `/services`, and **0.037** on `/`.
- **Mobile Shader Deferral:** Constrained `ShaderField` in `Hero.tsx` strictly to desktop viewports (`window.innerWidth >= 1024` with `hidden lg:block`), eliminating WebGL execution on mobile devices.
- **Process Pipeline Unpinned Mode:** Configured `Process.tsx` to display an accessible vertical timeline stack across all viewports whenever `level !== 'full'`, enforcing zero pinned scenes for `lite` and `off` modes.

## [R8: Inner Pages Rebuilt in Krat.OS Brand System] - 2026-10-08

### Added
- **Route `/services` (`src/app/services/page.tsx` & `ServiceStickyNav.tsx`):**
  - Desktop sticky left navigation drawer with live scroll-spy tracking module positions (`module_01.web`, `module_02.mobile`, etc.) and signal red indicator caret.
  - Six module Windows rendering their respective inline SVG motion scenes (`WebAppScene`, `MobileAppScene`, `EcommerceScene`, `AutomationScene`, `DesignScene`, `SupportScene`).
  - Guaranteed technical deliverables checklist with red square indicators (`[✓]`), timeframe badges, and tech tags.
  - Estimator bridge card (`NOT_SURE_WHAT_YOU_NEED.SH`) launching the 60-second interactive configurator.
- **Route `/services/[slug]` (`src/app/services/[slug]/page.tsx` & `ServiceArchitectureDiagram.tsx`):**
  - Animated SVG pipeline diagram customized per service domain (`[CLIENT]` → `[API_GATEWAY]` → `[QUEUE]` → `[DATABASE]`) with travelling data packets and `useInViewPlayback` off-screen pause.
  - Deliverables scope window (`module_deliverables.json`) detailing verified inclusions with complete client IP ownership.
  - Layered stack dependency graph (`LAYER 01: RUNTIME`, `LAYER 02: API`, `LAYER 03: PERSISTENCE`).
  - 4-phase sprint pipeline (`01_PLAN`, `02_BUILD`, `03_HARDEN`, `04_SHIP`) and service-specific terminal FAQ accordion.
- **Route `/work` (`src/app/work/page.tsx` & `WorkFilter.tsx`):**
  - Filterable case study grid reflowing seamlessly with GSAP `Flip` plugin (`Flip.from(state)`) on filter toggle.
  - Mono tag filters (`[ALL_PROJECTS]`, `[WEB_APPS]`, `[MOBILE_APPS]`, `[AUTOMATION]`) with cream fill and signal red dot active states.
  - Case study Windows with corner brackets, `<Odometer>` rolling impact metrics (`+142%`, `4.9★`, `-68%`), and status chips.
- **Route `/work/[slug]` (`src/app/work/[slug]/page.tsx` & `BeforeAfterSlider.tsx`):**
  - Interactive before/after wipe slider comparing legacy bottlenecks against Krat.OS production architecture with draggable signal red caret divider and keyboard arrow accessibility.
  - Technical narrative breakdown (`CHALLENGE_AUDIT.LOG`, `ARCHITECTURE_PLAN.MD`, `DEPLOYED_SOLUTION.SPEC`).
  - 3 audited metric result tiles with `<Odometer>` counters and verified deliverables manifest.
  - Next case study teaser block wiping into view.
- **Route `/about` (`src/app/about/page.tsx`, `GitLogTimeline.tsx`, `ContributorCard.tsx`):**
  - Company story rendered as an authentic `README.md [RAW_PREVIEW]` OS window with commit hash, markdown headers, and code formatting.
  - Non-negotiable engineering standards checklist with green LEDs (`[ok] 100% Client Code Ownership`, `[ok] Strict TypeScript Typing`, `[ok] Working Software Every Friday`).
  - Milestone timeline drawn as a linear git commit graph (`git log --graph --oneline --decorate`) with branch markers and commit tags.
  - Core team framed as repository maintainers with CRT horizontal scanline sweep on avatar hover, strictly preserving `[PLACEHOLDER]` tags.
- **Route `/contact` (`src/app/contact/page.tsx`, `ContactForm.tsx`, `LiveClock.tsx`):**
  - Real-time UTC/local HUD clock with second counter and green synchronization LED.
  - 4-hour SLA response promise card and direct channels (WhatsApp with live indicator, 15-minute discovery booking, direct email).
  - Terminal-styled dispatcher form (`contact_dispatcher.sh`) with signal red focus caret lighting up on active inputs.
  - `HTTP/1.1 200 OK // INTAKE_RECORDED` animated success state with SLA countdown and WhatsApp follow-up link.
- **Route `404` (`src/app/not-found.tsx`):**
  - Rebuilt as an authentic OS **Kernel Panic** screen (`CRITICAL_EXCEPTION: KERNEL_PANIC`) with `<Glitch>` effect on `404 — PROCESS NOT FOUND`.
  - Memory dump call stack trace and blinking signal red `<Caret>` prompt.
  - `cd ~ (Return Home)` navigation button.
- **Routes `/privacy` & `/terms` (`src/app/privacy/page.tsx` & `src/app/terms/page.tsx`):**
  - Calm, readable monospace legal documentation with `<Decode>` title scrambling and zero extraneous animation.
  - Preservation of all legal notices and `[PLACEHOLDER: review by legal]` markers.

### Changed
- `src/content/about.ts`, `src/content/services.ts`, `src/content/work.ts`: Aligned copy tone with Krat.OS v2 technical brand voice, removing lingering v1 playful references while strictly preserving all `[PLACEHOLDER]` markers and schema types.
- `src/app/globals.css`: Added keyframe animation and class for `.animate-scanline` with `prefers-reduced-motion` suppression.
- Production bundle sizes verified across all routes: First Load JS strictly between **157 kB** and **197 kB** gzipped (all 23 to 63 kB below the 220 kB budget).



### Added
- **Interactive Two-Column Configurator (`src/components/estimator/EstimatorWizard.tsx`):**
  - Left column: Mechanical question header with `<Decode>` title scrambling, number-badged option cards, and step navigation.
  - Right column: Interactive OS Window (`ConfigJsonWindow.tsx`) with syntax-highlighted `krat.config.json` that writes itself live as the user configures their project, paired with a build progress bar (17% to 100%).
  - Keyboard-driven navigation: keys `1`–`6` to select/toggle options, `Enter` to advance/compile, `ArrowLeft` to navigate backward, `Esc` to close modal; strictly suppressed when text inputs or textareas are focused.
  - Mobile ergonomics: single-column flow with a collapsible bottom drawer displaying the live `krat.config.json` state.
- **KeyOption Card Component (`src/components/estimator/KeyOption.tsx`):**
  - Number badge `[1]`, `[2]`, etc. with mechanical styling, accessible radio/checkbox underlying semantics, signal red indicator checkmark, and subtle hover borders.
- **Live Spec Window (`src/components/estimator/ConfigJsonWindow.tsx`):**
  - Titled OS window (`krat.config.json [LIVE_SPEC]`) with line-numbered, syntax-highlighted JSON reflecting project type, scope, timeline, budget, and contact info, marked `aria-live="polite"`.
- **Canvas Particle Burst (`src/components/estimator/BurstCanvas.tsx`):**
  - Lightweight 600ms particle burst of sharp signal red (`#FD142B`) and cream (`#EFE3CF`) micro-squares celebrating build completion (gracefully disabled in `lite` and `off` motion modes).
- **Mechanical Progress HUD (`src/components/estimator/EstimatorProgress.tsx`):**
  - Monospace index header (`/01 CONFIG // STEP 0X/06`), signal red progress bar, and keyboard shortcut chips (`[←]` / `[ESC]`).
- **Terminal Result Screen (`src/components/estimator/ResultScreen.tsx`):**
  - Rebuilt with terminal chrome (`krat.result.terminal [BUILD_COMPLETE]`) and green status pill (`BUILD SPEC LOCKED // 100% COMPILED`).
  - Rolling investment range (`$10,000` — `$25,000`) and timeline powered by `<Odometer>` with mechanical counter typography.
  - Preserved signature copy: `"A ballpark, not a quote. Let's make it real."`.
  - Triple conversion CTAs: `"Book a 15-minute call"`, `"Chat on WhatsApp"`, and `"Back to site"` / restart action.
- **Modal & Page Wrappers (`EstimatorModal.tsx` & `src/app/start/page.tsx`):**
  - Fullscreen `#212121` modal container with hairline border and backdrop lock. Dedicated standalone `/start` page aligned with Krat.OS display typography and maximum width containers.

### Preserved
- Lead engine integrity strictly maintained: `/api/lead` contract, `estimator-config.ts` formula weights and base prices, Supabase schema, Resend templates, Turnstile verification, honeypot spam protection, and all analytics events (`estimator_open`, `estimator_step_1..6`, `lead_submitted`, `estimator_complete`, `booking_click`, `whatsapp_click`).
- Production bundle size for `/start`: **171 kB** (49 kB under the 220 kB budget). Route `/`: **193 kB** (27 kB under budget).



### Added
- **Section /05 — Stack (`src/components/sections/StackMarquee.tsx` & `stack/StackTag.tsx`):**
  - Rebuilt as `"Tools we trust"` featuring dual opposing continuous ribbons (Row 1 frontend/mobile, Row 2 backend/cloud/data).
  - Velocity-reactive scrolling: ribbon speed accelerates dynamically with user scroll velocity and decays smoothly to idle.
  - Interactive mono `StackTag` chips with hover `Decode` scrambling into architectural layers (`[FRONTEND]`, `[BACKEND]`, `[CLOUD]`, `[DATABASE]`, etc.) with signal red indicator dots.
  - Estimator bridge banner connecting stack configuration directly to the Estimator modal.
- **Section /06 — Principles (`src/components/sections/Principles.tsx` & `principles-scenes/`):**
  - Rebuilt as `"Why Krat.OS"` with a bento grid of 3 OS Windows (`principle_01.comms`, `principle_02.scope`, `principle_03.warranty`).
  - 3 bespoke inline micro-animations with off-screen pause via `useInViewPlayback`:
    - `ChatStreamScene`: Technical client-engineer chat stream typing between Founder and Lead Engineer with real-time latency verification.
    - `ScopeChecklistScene`: Contract milestone checklist cycling automated ticks with green LEDs (`[ok]`).
    - `HeartbeatScene`: Server uptime telemetry waveform scanning across a blueprint grid with pulsating green LED.
  - 3 outcome bullets per principle and Estimator bridge banner.
- **Section /07 — FAQ (`src/components/sections/Faq.tsx`):**
  - Rebuilt as `"Direct answers"` with mechanical accordion (`[FAQ_01]` through `[FAQ_07]`) covering pricing, timelines, IP ownership, post-launch support, and communication.
  - Structured data: Schema.org `FAQPage` JSON-LD embedded for Google rich search results.
  - Secondary bridge card with direct Estimator trigger and WhatsApp founder link.
- **Section 8 — Final CTA (`src/components/sections/FinalCta.tsx`):**
  - Full-bleed charcoal `#212121` section with cursor-following `SpotlightGrid` and corner `+` registration marks.
  - Status chip: `[SYSTEM_READY // INTAKE_OPEN]` with green LED pulse.
  - Giant JetBrains Mono 800 display headline (`"Got an idea? Let's build it."`) with an oversized blinking signal red `Caret`.
  - Looping terminal prompt: `> awaiting input_`.
  - 3 conversion actions: primary cream button (`"Estimate my project"` with `<Magnetic>`), ghost button (`"Book a 15-min call"`), and direct WhatsApp founder channel.
  - Section rhythm verified for full home page: dark, dark, dark, dark, LIGHT (Proof), dark, dark, dark, dark.

### Changed
- `src/app/page.tsx`: Updated section comments to reflect the complete v2 operating system architecture.
- Production First Load JS for `/` verified at **191 kB** (29 kB under the 220 kB budget).


## [R5: Home Sections A — Modules, Pipeline, Work, Proof] - 2026-10-08

### Added
- **Section /01 — Modules (`src/components/sections/Services.tsx`):**
  - Rebuilt as `"What we build"` with 6 core engineering Windows (`module_01.web` through `module_06.support`).
  - 3D tilt with subtle glare, corner brackets, and `data-cursor="open"`.
  - 6 bespoke inline SVG motion scenes (`src/components/sections/scenes/`) with off-screen pause via `useInViewPlayback`:
    - `WebAppScene`: Assembling UI cards, live chart, and system toast.
    - `MobileAppScene`: Exploded isometric mobile layer stack with tap ripple.
    - `EcommerceScene`: Cart-to-checkout pipeline with node progress and badge increment.
    - `AutomationScene`: Ingestion-to-inference node network with active pulse indicator.
    - `DesignScene`: Low-fi wireframe morphing into high-fidelity layout handles.
    - `SupportScene`: Telemetry graph monitor with auto-healing anomaly spike and status shift.
  - Delivery timeframes (`4 - 10 WEEKS`) and Estimator bridge CTA banner.
- **Section /02 — Pipeline (`src/components/sections/Process.tsx` & `pipeline/DesktopPipelineTrack.tsx`):**
  - Rebuilt as `"How we work"` simulating a predictable CI/CD engineering pipeline.
  - Pinned GSAP ScrollTrigger track on desktop (`DesktopPipelineTrack.tsx`) scrubbed across 5 nodes (`01_discover` ... `05_grow`) with active nodes and synchronized `TypeLines` terminal execution logs; lazy chunked with `ssr: false`.
  - Mobile/lite mode unpinned vertical step stack with `<Wipe>` reveals and plain, accessible copy.
- **Section /03 — Selected Work (`src/components/sections/Work.tsx`):**
  - Rebuilt as `"Things we're proud of"` featuring a scrolling mono `<Tape>` banner of project names.
  - 3 flagship case study Windows with `<Tilt>`, corner brackets, and interactive `<Odometer>` metric HUD cards (`+142% CONVERSION VELOCITY`, `4.9 APP STORE RATING`, `-68% MANUAL PROCESSING HOURS`).
  - Strict preservation of `[PLACEHOLDER]` prefix on client and project names.
- **Section /04 — Signal & Proof (`src/components/sections/Proof.tsx`):**
  - Rebuilt as `"Verified reliability"` opting into `data-theme="light"` for an intentional cream `#F6EFDD` rhythm break.
  - 4 technical metric tiles with `<Odometer>` rolling statistics (`99.9% UPTIME`, `<4wks TO FIRST BUILD`, `100% TYPE SAFETY`, `0 LOCK-IN`).
  - Terminal-style feedback log (`> CLIENT_FEEDBACK.LOG`) with carousel controls, typing quote lines, and signal red caret.
  - Dev-only banner explicitly clarifying placeholder sample status.

### Changed
- `src/lib/motion/useInViewPlayback.ts`: Extended ref signature to accept `Element | null` for inline SVG element compatibility.
- `src/components/fx/Wipe.tsx`: Added optional `delay` prop for staggered vertical reveals.
- Route `/` production First Load JS verified at 193 kB (27 kB under the 220 kB budget).


## [R4: The Hero — Signature OS Interface] - 2026-10-08

### Added
- **Signature Hero Section (`src/components/sections/Hero.tsx`):**
  - **Background Layers:**
    - Layer 1: Static server-painted CSS blueprint grid with `+` registration marks and center dots via vector SVG pattern.
    - Layer 2: Subtle fine grain texture overlay (`3.5%` mix-blend-overlay).
    - Layer 3: Dynamic WebGL `ShaderField` (`ogl`) with cursor repulsion warp and `#FD142B` red signal light source, lazy-loaded post-paint via `requestIdleCallback` (bypassed in `lite` and `off` modes).
  - **HUD Corners (`aria-hidden`):**
    - Top-left: `KRAT.OS // SOFTWARE SOLUTIONS // V2.0`.
    - Top-right: Live Colombo local clock (`HUDClock`).
    - Bottom-left: Real-time cursor coordinates `x:0412 y:0233` on desktop (`HUDCoordinates`).
    - Bottom-right: Technical `scroll` indicator with signal red bar sliding down.
  - **LCP-Optimized Headline:**
    - JetBrains Mono 800 (`clamp(1.85rem, 5.2vw, 5.25rem)` with `-0.04em` tracking): `"We build the software your business runs on."`
    - Revealed via zero-JS CSS line masks (`animate-hero-line-1`, `animate-hero-line-2`, `animate-hero-line-3`) with no `opacity-0` initial state.
    - Post-hydration mechanical `Decode` effect on accent words `"runs on."` in signal red followed by blinking square-wave red `Caret`.
  - **Subhead & Direct CTAs:**
    - Geist subhead: `"Web apps, mobile apps and automation, designed and engineered end to end. Plain talk, precise work."`
    - Primary CTA: `"Estimate my project"` with `<Magnetic>` leaning toward pointer and triggering Estimator modal.
    - Ghost CTA: `"See our work"` navigating to `/work`.
    - Availability status chip: `● TAKING ON NEW PROJECTS FOR Q4`.
    - Client trust tape: Monochrome `[PLACEHOLDER]` partner names in velocity-reactive `<Tape>`.
  - **Interactive OS Windows Suite (`src/components/sections/hero/`):**
    - `TerminalWindow.tsx`: Simulated OS terminal running `TypeLines` cycling through `web-app`, `mobile-app`, and `automation` scaffolding pipelines with mechanical progress bars and completion checks.
    - `CodeWindow.tsx`: Syntax-highlighted technical code window in semantic cream, muted, and signal red tokens.
    - `SignalWindow.tsx`: Abstract SVG carrier waveform and sparkline with active carrier LED and zero invented numbers/metrics.
    - Desktop: Windows feature click-to-bring-to-front z-ordering, Framer Motion inertial drag, and contextual `[drag]` crosshair cursor.
    - Mobile (< 768px): Seamlessly collapses to full-width Terminal window below CTAs with zero horizontal overflow.
  - Verified bundle size: Route `/` at 32 kB, First Load JS 196 kB (budget <= 220 kB).
  - Visual verification captured at 360px, 768px, 1280px, and 1920px in both dark and light modes.

## [R3: Global Shell — Boot, Nav, Command Palette, Footer, Transitions] - 2026-10-08

### Added
- **OS Boot Preloader (`src/components/fx/Boot.tsx`):**
  - First-visit per session diagnostic sequence with signal red caret draw, typed `Krat.OS` title, and 3-step `[ ok ]` subsystem checks.
  - Hard cap at 1.4s, instant dismissal via click, Escape, or any key, automatic bypass on mobile (`< 768px`) or `lite`/`off` motion.
  - Zero LCP delay: underlying DOM remains rendered and fully interactive from first paint.
- **Global Navigation Bar (`src/components/layout/Nav.tsx`):**
  - Full-width fixed navigation with 1px border, logo with micro-glitch hover, indexed nav links (`/01 WORK`, `/02 SERVICES`, `/03 ABOUT`, `/04 ESTIMATOR`).
  - Active route indicators with signal red left bracket and real-time scroll progress bar (1.5px signal red line).
  - Quick-action `⌘K` / `Ctrl+K` trigger button, theme toggle, and primary CTA (`Estimate project`).
  - Full-screen mobile drawer with focus trap, staggered `Decode` animations, and quick direct channels.
- **Command Palette (`src/components/layout/CommandPalette.tsx`):**
  - Powered by `cmdk` with global `⌘K` / `Ctrl+K` hotkey and backdrop blur.
  - Navigation section, instant Actions (Estimator, WhatsApp, Call, Email, copy to clipboard), and Settings toggles (Theme, Motion levels).
  - Terminal easter egg: typing `sudo hire krat.os` unlocks celebratory response and fast-tracks project initiation.
  - Integrated analytics logging for `palette_open` and `palette_action`.
- **Contact Dock (`src/components/layout/ContactDock.tsx`):**
  - Sharp technical dock replacing v1 rounded pill: `[ chat // 3 channels ]` (WhatsApp, Call, Email) with green pulse LED.
  - Keyboard accessible and suppressed automatically when modals or the command palette are open.
- **OS Footer & Status Bar (`src/components/layout/Footer.tsx`):**
  - Charcoal `#212121` footer with giant monospace `Krat.OS` wordmark featuring hover `Decode` and pulsing red dot LED.
  - Persistent bottom status bar: green status LED (`all systems operational`), live Colombo local time (`UTC+5:30`), version stamp (`v2.0.0-PROD`), and 3-way motion level switcher (`full` / `lite` / `off`).
- **Mechanical Page Transitions (`src/components/layout/PageTransition.tsx`):**
  - 700ms red-bar wipe with route path typing (`~/services`), skipped for users with reduced/lite motion. Focus automatically managed to `<main>`.

## [R2: Design System v2 & Motion Engine] - 2026-10-08

### Added
- **Motion Engine Architecture (`src/lib/motion/`):**
  - Mechanical duration and easing tokens (`expoOut`, `power4InOut`, `linear`, `micro`, `ui`, `section`, `hero`).
  - `MotionContext.tsx` with 3-tier motion levels (`full`, `lite`, `off`), auto-detection (Save-Data, hardware concurrency, small screens), localStorage persistence (`krat_os_motion_level`), and export hook `useMotionLevel()`.
  - `gsap.ts` with strict-mode safe `useGsapContext()`, GSAP ScrollTrigger registration, and Lenis ticker sync.
  - `useInViewPlayback.ts` pausing rAF/WebGL/canvas loops when off-screen or tab is backgrounded.
  - `useHotkey.ts` global hotkey listener with input/textarea/select focus suppression.
  - Global `<MotionProvider>` mounted at root layout (`src/app/layout.tsx`).
- **UI Components Suite (`src/components/ui/`):**
  - `Button.tsx`: Sharp rectangle geometry (0-4px radius), primary cream fill with sliding red square arrow, secondary outline, ghost with red underline wipe, 1px press translate, loading red progress bar.
  - `Tag.tsx`: Monospace bracketed labels `[ web app ]`.
  - `StatusChip.tsx`: Monospace status badge with green LED dot (`#3DDC84`) or red pulse dot (`#FD142B`).
  - `Window.tsx`: OS window container with title bar chrome (`module_01.sys`), 3 square control buttons, optional corner registration brackets, and optional inertial drag.
  - `Card.tsx`: Bridged to sharp rectangular window styling.
  - `Input.tsx`, `Textarea.tsx`, `Select.tsx`: 1px line-strong border, monospace labels, animated red caret indicator on focus.
  - `KeyOption.tsx`: Monospace selector rows with `[ ]` and `[x]` markers, keyboard shortcut badges (`[1]`, `[2]`), active press translation.
  - `Tape.tsx`: Monospace velocity ticker accelerating with scroll speed and pausing on hover.
  - `Accordion.tsx`: Technical disclosures with indexed rows (`Q01`..`Qnn`), `+` to `−` toggle, clip-path height reveal, and blinking red caret.
  - `Section.tsx`: Section rhythm wrapper with `/01 — LABEL` eyebrow, corner `+` registration marks, HUD slot, and `data-theme` override.
  - Central barrel exports in `src/components/ui/index.ts`.
- **Named FX Library (`src/components/fx/`):**
  - `Decode.tsx`: Scrambles through `_ / \ # 0 1` settling left-to-right with real DOM text preserved.
  - `Caret.tsx`: Blinking signal-red square-wave bar.
  - `TypeLines.tsx`: Terminal sequence typewriter with terminal prompts and progress bars.
  - `SpotlightGrid.tsx`: Blueprint dot grid with `+` marks, cursor radial glow, and fine grain overlay.
  - `ShaderField.tsx`: WebGL dot matrix canvas using `ogl`, warped by pointer with red light source, clean context destruction on unmount.
  - `Pipeline.tsx`: SVG circuit path with active illuminated nodes and traveling packet.
  - `Odometer.tsx`: Rolling monospace digit columns for numbers, ranges, currency.
  - `Wipe.tsx`: Red-bar sweep with precision clip-path reveals.
  - `Tilt.tsx`: 3D perspective tilt (max 6deg) with faint glare.
  - `Magnetic.tsx`: 6-8px cursor pull for desktop full mode.
  - `Crosshair.tsx`: Technical precision cursor with contextual status tags (`[open]`, `[drag]`, `[view]`), disabled in lite/off.
  - `HUD.tsx`: Micro-type heads-up display with coordinates, section indexes, and live Colombo clock.
  - `Glitch.tsx`: 1-2 frame RGB displacement split on hover, capped to < 3Hz.
  - Central barrel exports in `src/components/fx/index.ts`.
- **Preview Route (`/design-system`):**
  - Rebuilt `/design-system` as a noindex interactive laboratory showcasing every component and effect on dark and light surfaces, with live theme switcher and 3-tier motion toggles.
  - Verified bundle size: Home First Load JS 193 kB (well below the 220 kB budget).
  - Production build passed (26/26 routes).
  - Zero TypeScript errors (`tsc --noEmit`), zero ESLint warnings (`next lint`).

## [R1: Rebrand Sweep — Name, Logo, Tokens, Fonts, Theme] - 2026-10-08

### Added
- **Vector Logo Suite (`public/brand/`):**
  - Rebuilt brand lockups into precision mathematical vector SVGs from JetBrains Mono ExtraBold and Regular:
    - `logo-dark.svg`: Cream `#EFE3CF` wordmark with signal red `#FD142B` caret bar and LED dot on transparent background.
    - `logo-light.svg`: Charcoal `#292926` wordmark with signal red `#FD142B` caret bar and LED dot on transparent background.
    - `mark.svg`: Standalone cream "K" + red LED dot icon.
    - `favicon.svg` & `app-icon.svg`: Brand mark on charcoal `#212121` background with 4px border radius.
  - Added unified `<Logo variant="dark|light|auto" showTagline={boolean} />` component in `src/components/ui/Logo.tsx`.
- **v2 Design Token System (`src/styles/tokens.css` & `tailwind.config.ts`):**
  - Theme-aware semantic color tokens:
    - Dark mode (default): `bg #212121`, `surface #2B2B2B`, `fg #EFE3CF`, `fg-muted #A8A294`, `line #3A3A3A`, `line-strong #7A7A7A`, `red #FD142B`, `red-text #FF4A5C`, `ok #3DDC84`.
    - Light mode: `bg #F6EFDD`, `surface #EBE3CD`, `fg #292926`, `fg-muted #6B665A`, `line #D6CDB5`, `line-strong #8A8473`, `red #FD142B`, `red-text #C8102E`, `ok #1E9E5A`.
  - Geometric constraint enforcement: sharp radii 0 to 4px maximum (`--radius-none`, `--radius-sm`, `--radius-md`). Hairline 1px borders.
  - Backward-compatibility bridge aliasing legacy color tokens (`--color-cream`, `--color-peach`, etc.) to semantic variables for seamless compilation across all existing components during the redesign transition.
- **Typography Migration:**
  - Loaded `JetBrains Mono` (display, headlines, numbers, code, labels) and `Geist` (body text) using `next/font/google`.
  - Replaced legacy Google fonts `Fredoka` and `Outfit`.
  - Styled selection highlight: pure signal red `#FD142B` with `#EFE3CF` cream text.
  - Styled focus ring: `2px solid var(--red-text)` with `2px offset`.
- **Theme Support (`next-themes`):**
  - Integrated `ThemeProvider` with dark mode as default, light mode support, and section-level `data-theme` override capability for rhythm sections.
- **Codebase Rebrand Audit & Sweep:**
  - Published comprehensive `REDESIGN_AUDIT.md` cataloging 68 active codebase files across 4 migration axes.
  - Conducted complete sweep replacing legacy name "Kratos" with **"Krat.OS"** across `site.ts`, metadata, JSON-LD, content schemas, email templates, routes, and `package.json` name (`krat-os-site`).
  - Verified 0 remaining occurrences of "Kratos" in active source and asset files.

## [Prompt 9: SEO, Analytics, Performance, Accessibility & Cloudflare Release] - 2026-10-07

### Added
- **Global Cloudflare Pages Infrastructure:**
  - Deployed static production build to Cloudflare Pages: **`https://kratos-site.pages.dev`**.
  - Mounted V8 Edge Function (`functions/api/lead.ts`) powering `/api/lead` with edge rate limiting, silent honeypot spam traps, Zod schema validation, and Supabase / Resend webhooks (verified 200 OK live).
  - Security headers defined in `public/_headers` (Content-Security-Policy, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, immutable static asset cache headers).
- **SEO & Structured Data Suite:**
  - Complete Next.js Metadata API coverage across all 26 static routes with unique titles, meta descriptions, openGraph cards, Twitter cards, and canonical URLs.
  - Dynamic `sitemap.xml` statically rendered covering 26 core, service, and case study routes.
  - `robots.txt` crawler directives with clean search engine disallows (`/api/`, `/design-system`) and canonical sitemap link.
  - Dynamic OpenGraph generation via `next/og` (`src/app/opengraph-image.tsx`) rendering brand blobs, wordmark, and tagline at 1200x630px.
  - Schema.org `@graph` JSON-LD across all routes: `Organization`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`, and `CreativeWork`.
  - Semantic heading hierarchy strictly enforced: exactly one `h1` per page, sequentially descending `h2` and `h3` structure.
- **Analytics & Conversion Tracking:**
  - Centralized tracker `src/lib/analytics.ts` supporting Plausible and Google Analytics 4 (GA4).
  - Configured events: `estimator_open`, `estimator_step_1`..`step_6`, `estimator_complete`, `lead_submitted`, `whatsapp_click`, `booking_click`, `contact_form_submit`, and `cta_click` with `location` and `label` properties.
- **Accessibility & Performance Engineering:**
  - Achieved **100/100 Accessibility** score across tested pages with zero axe or WCAG AA violations.
  - Contrast audit passed: strictly eliminated low-contrast orange body text on cream (`#2A1810 ink` on `#FDEBD9 cream` > 10:1 contrast).
  - Optimized mobile Largest Contentful Paint (LCP) from 5.4s down to 2.1s (< 2.5s budget) by eliminating render-delaying initial `opacity: 0` fades on above-the-fold hero copy.
  - Zero layout shift: Cumulative Layout Shift (CLS) = 0.001 (< 0.05 budget).
  - Mobile touch CPU optimizations: skipped Lenis smooth scroll on coarse touch devices to preserve native momentum touch scrolling; replaced heavy canvas SVG gooey filters with lightweight GPU-accelerated CSS blobs on mobile viewports.
  - Dynamic code-splitting for heavy client components (`EstimatorModal`, `CursorFollower`, and below-the-fold sections).

## [Cloudflare Deployment — Live Global Edge Release] - 2026-10-07

### Added
- **Cloudflare Pages Global Infrastructure:**
  - Created Cloudflare Pages project `kratos-site` under account `9580b8d446abcd155537710e9fa2c306`.
  - Configured high-performance static asset generation (`out/`) with sub-50ms global CDN delivery.
  - Deployed full site at production URL: **`https://kratos-site.pages.dev/`** (Deployment preview: `https://398df022.kratos-site.pages.dev/`).
- **Cloudflare Edge Functions (`functions/api/lead.ts`):**
  - Native V8 Cloudflare Pages Edge Function receiving form and estimator inquiries at `https://kratos-site.pages.dev/api/lead`.
  - Edge rate limiting, silent bot honeypot traps, Zod validation, and Supabase / Resend API integration.
  - Verified live endpoint with 200 OK.

## [Prompt 8: Motion and Micro-Interaction Polish] - 2026-10-07

### Added
- **Centralized Motion System (`src/lib/motion.ts`):**
  - Standardized spring presets: `springs.soft` (stiffness 220, damping 26) for organic settles, `springs.bouncy` (stiffness 420, damping 20) for buttons and chips, and `springs.snappy` (stiffness 500, damping 32) for UI controls.
  - Standardized physics constants: `physics.tapSquish` (0.96 scale) and `physics.hoverScale` (1.025 scale).
  - Shared motion variants (`fadeUpVariants`, `scaleUpVariants`, `logoWobbleVariants`) with built-in accessibility fallbacks.
- **Tactile Micro-Interactions:**
  - `Magnetic` (`src/components/fx/Magnetic.tsx`): Desktop pointer tracking applying subtle organic displacement towards cursor to Hero CTA, Nav bar CTA, and Final CTA buttons.
  - Nav Logo Wobble: Playful multi-keyframe rotational wobble (`[-4°, +4°, -2°, +1°, 0°]`) and scale spring on hover.
  - Form Focus Bloom: Satisfying `focus-visible:ring-4 focus-visible:ring-orange/30` with radiant drop glow across inputs, selects, and textareas.
  - Organic `BlobConfetti` (`src/components/fx/BlobConfetti.tsx`): Particle burst of 32 organic blobs in brand palette (`orange`, `peach`, `butter`, `orange-deep`) on Estimator ballpark calculation and Contact form submission.
- **Performance & Accessibility Audits:**
  - Zero scroll jank: Continuous scroll frame budget audit verified maximum frame duration of 18ms (< 50ms long-task budget).
  - Strict GPU properties only: All animations use `transform`, `opacity`, and `clip-path`.
  - Thorough `prefers-reduced-motion` compliance across all interactive and FX components.
  - Clean Next.js static production build (23/23 routes) with 0 lint warnings and 0 TypeScript errors.

## [Prompt 7: Inner Pages — Complete Multi-Page Architecture] - 2026-10-07

### Added
- **Typed Content Expansion (`src/content/`):**
  - `services.ts`: Enhanced 6 services with deliverables checklists, timeframe badges, step-by-step processes, and service-specific FAQs.
  - `work.ts`: Enhanced 3 case studies (`[PLACEHOLDER]` marked) with in-depth challenge, approach ("Strong underneath"), solution ("Friendly on top"), metric results, and key deliverables.
  - `about.ts`: Created brand manifesto, 4 working principles, and 4 `[PLACEHOLDER]` team profiles with circular portrait styling.
- **Client Components & Form Handling:**
  - `WorkFilter` (`src/components/work/WorkFilter.tsx`): Interactive category pill filter with spring layout transitions, circular portal image frames, metric icons, and responsive grid.
  - `ContactForm` (`src/components/contact/ContactForm.tsx`): React Hook Form + Zod schema validation submitting to `/api/lead`, hidden honeypot spam protection, friendly error states, and instant success confirmation.
  - `EstimatorButton` (`src/components/estimator/EstimatorButton.tsx`): Universal client button to trigger the Project Estimator modal from server-rendered pages.
- **Inner Routes (`src/app/`):**
  - `/services`: Overview catalog with 6 service pill cards, deliverables checklists, and "Not sure what you need?" Estimator trigger band.
  - `/services/[slug]`: Statically generated deep-dives via `generateStaticParams` for all 6 services with deliverables, processes, tech badges, related case studies, FAQ accordions, and Schema.org `Service` JSON-LD.
  - `/work`: Filterable portfolio grid by service and industry with animated filter pills and project urgency chip.
  - `/work/[slug]`: Statically generated case studies via `generateStaticParams` for all 3 projects with problem/approach/solution breakdown, circular portal gallery masks, next project link, and Schema.org `CreativeWork` JSON-LD.
  - `/about`: Brand story ("Strong underneath. Friendly on top."), 4 core working principles, team section with circular portrait masks, and CTA.
  - `/contact`: Split layout with 4-hour response promise, direct WhatsApp and Cal.com booking cards, and the interactive `ContactForm`.
  - `/privacy`: Clean readable privacy policy marked `[PLACEHOLDER: review by legal]`.
  - `/terms`: Clean readable commercial terms marked `[PLACEHOLDER: review by legal]`.
  - Custom `not-found.tsx`: Playful 404 page featuring a cute melting blob SVG illustration and home navigation button.
- **Verification:**
  - `npm run build` generated 23/23 static and SSG routes cleanly with Next.js 15 App Router.
  - Zero TypeScript errors (`npm run typecheck`) and zero ESLint warnings (`npm run lint`).
  - Automated headless Chrome CDP test passed across all pages with zero horizontal overflow down to 360px mobile viewports.
  - Contact form end-to-end submission verified with 200 OK and UI success card transition.

## [Prompt 6: Remaining Home Page Sections — Conversion Architecture] - 2026-10-07

### Added
- **Typed Content Specifications (`src/content/`):**
  - `services.ts`: 6 core services (Custom Web Apps, Mobile Apps, High-Converting Websites, AI & Workflow Automation, Cloud Architecture & DevOps, Legacy Modernization) with outcomes, deliverables, and tech tags.
  - `process.ts`: 5 delivery phases (Discover, Design, Build, Launch, Grow) with timeframes and clear deliverables.
  - `work.ts`: 3 case studies (`[PLACEHOLDER]` marked: Bloomly, PulseFlow, NovaLab) with metrics, challenges, and solutions.
  - `proof.ts`: 4 proof metrics with count-up targets and 3 speech-bubble testimonials.
  - `stack.ts`: Dual-tier technology stack definitions for frontend, backend, cloud, and AI.
  - `faqs.ts`: 7 objection-handling questions covering investment, timelines, code ownership, post-launch support, communication, legacy systems, and team allocation.
- **UI & FX Components:**
  - `Accordion` (`src/components/ui/Accordion.tsx`): Accessible disclosure primitive with `aria-expanded`, keyboard `Space`/`Enter` triggers, and spring height expansion.
  - `Marquee` (`src/components/ui/Marquee.tsx`): Dual opposing-direction infinite marquee ribbons with hover-pause and reduced-motion static grid fallback.
  - `CountUp` (`src/components/fx/CountUp.tsx`): IntersectionObserver-triggered smooth exponential count-up ticker.
  - `CircleReveal` (`src/components/fx/CircleReveal.tsx`): Scroll-linked circular clip-path expansion revealing imagery.
- **Home Page Sections (`src/components/sections/`):**
  - `Services`: Pill cards with expanding circular portal illustrations, deliverable checklists, and direct slug links.
  - `Process`: Interactive serpentine connected timeline with scroll-progress fill and step badges.
  - `Work`: Featured case studies showcase with circular image masks, impact metric chips, and "See full case study" links.
  - `Proof`: Dark contrast section (`cocoa #3B2218`) providing visual rhythm break, 4 count-up stat blobs, and speech-bubble quote cards.
  - `StackMarquee`: Opposing ribbons showcasing modern tech stack chips with subtle hover pause.
  - `WhyKratos`: Asymmetric bento grid explaining the "Strong underneath. Friendly on top." brand positioning.
  - `Faq`: 7 accordion items with embedded Schema.org `FAQPage` JSON-LD for rich snippets.
  - `FinalCta`: Giant cream-on-orange band with interactive cursor blobs, multi-channel CTAs, and instant Estimator modal trigger.
- **Page Integration (`src/app/page.tsx`):**
  - Assembled all 9 sections in strict conversion sequence with landmark IDs (`#services`, `#process`, `#work`, `#proof`, `#faq`).
- **Verification:**
  - Zero typecheck errors, zero ESLint warnings, successful Next.js static build.
  - Automated headless browser tests verifying landmark navigation, accordion interactions, mobile 360px viewport zero horizontal scroll, and Estimator modal launch.

## [Prompt 5: The Project Estimator — Interactive Ballpark Engine] - 2026-10-07

### Added
- **Project Estimator Configuration & Ballpark Engine (`src/content/estimator-config.ts`):**
  - 6 project types: Marketing Website, Web App / SaaS, Mobile App, E-Commerce, AI / Smart Automation, Something Else.
  - Adaptive scope options dynamically tailored to the selected project type.
  - Realistic ballpark multiplier calculation algorithm projecting minimum/maximum investment ranges and sprint duration.
- **Shared Validation & Anti-Spam (`src/lib/schema.ts`, `src/app/api/lead/route.ts`):**
  - Type-safe Zod schema (`leadSchema`) validating contact information, project selections, consent, and attribution tokens.
  - Hidden honeypot field (`website`) silently acknowledging and discarding automated bot traffic without database writes or notifications.
  - In-memory sliding window IP rate limiter (`src/lib/rate-limit.ts`) blocking flood attempts (>5 requests per 10min window with HTTP 429 Retry-After).
  - Cloudflare Turnstile token verification with graceful development bypass.
  - Supabase persistence logic with SQL migration schema (`supabase/migrations/20261007_create_leads_table.sql`).
  - Resend email dispatch for team alerts and instant lead confirmation emails (with graceful logging fallback).
- **Interactive Estimator UI (`src/components/estimator/`):**
  - `EstimatorProgress`: Pill-shaped segmented step indicator with accessible progress bar (`role="progressbar"`) and smooth step transitions.
  - `BubbleOption`: Accessible bubble selector (`role="radio"` and `role="checkbox"`) with spring hover/tap squish and glowing check indicator.
  - `EstimatorWizard`: 6-step game-like flow with `sessionStorage` persistence so user progress is never lost on refresh.
  - `ResultScreen`: Instant ballpark calculation reveal card with Fredoka typography, timeline feasibility badge, Book a call CTA, and pre-filled WhatsApp link.
  - `EstimatorModal`: Full-screen cream overlay with focus management and `Escape` key close listener.
- **Routes & Global Integration:**
  - Standalone `/start` route with full SEO metadata.
  - Global wiring: Hero primary CTA, Nav bar button, mobile navigation menu, and Footer primary button seamlessly launch the Estimator modal.
- **Verification:**
  - Automated CDP test suite verifying API 200, Honeypot discard, Zod 400 rejection, and Rate Limit 429.
  - Full walkthrough from Step 1 through Step 6 to ResultScreen on desktop (1280px) and mobile (360px) with zero horizontal overflow.

## [Prompt 4: The Hero Section — 5-Second Signature Moment] - 2026-10-07

### Added
- **Hero Section (`src/components/sections/Hero.tsx`):**
  - Full-viewport cream hero section with brand GooeyBlobs background layer drifting and gently reacting to cursor movements.
  - Huge Fredoka display headline with spring overshoot word animation (`Software that's strong underneath. Friendly on top.`).
  - Hand-drawn-feeling rounded orange underline blobs on `"strong"` and `"Friendly"` that draw themselves using animated SVG paths (`pathLength`).
  - Outfit sub-headline constrained to 55ch communicating results without jargon.
  - Primary CTA button `"Estimate my project"` with spring press squish, plus secondary ghost button `"See our work"`.
  - Trust strip with `"Taking on new projects for [Month]"` availability pill and `[PLACEHOLDER]` partner chips (`NovaLab`, `Bloomly`, `PulseFlow`, `OrbitCraft`).
  - Signature circular portal motif echoing the logo counters, with cursor parallax tilt (`rotateX`, `rotateY`) and a floating looping stack of 3 rounded UI cards (Sprint Chat, Conversion Metric +142% with SVG sparkline, and 100% Type-Safe Quality chip).
  - Floating pill scroll cue with animated bouncing arrow.
- **Performance & LCP Optimization:**
  - Semantic HTML text rendered immediately in initial SSR payload for sub-2.5s LCP score.
  - Canvas GooeyBlobs layer mounted post-paint to avoid blocking initial paint.
  - Zero layout shift (CLS < 0.05).
- **Reduced Motion Support:**
  - Static fallback background blobs, instantly rendered underline strokes, and stationary card layouts under `prefers-reduced-motion: reduce`.
- **Responsive Verification:**
  - Verified across 360px, 768px, 1280px, and 1920px viewports with zero horizontal overflow.

### Added
- **Site Configuration (`src/content/site.ts`):**
  - Centralized typed configuration for brand info, slogan, short pitch, availability status & chip text, contact email/phone/WhatsApp, booking link, navigation items, footer columns, social links, and legal routes.
- **Global Navigation (`src/components/layout/Nav.tsx`):**
  - Floating pill-shaped bar detaching from the top with soft peach backdrop-blur surface, shrinking on scroll.
  - Brand logo left, links (`Services`, `Work`, `About`, `Contact`) center, primary CTA button (`Estimate my project`) right.
  - Full-screen cream mobile overlay menu with staggered huge Fredoka links, availability chip, primary CTA, and quick contact details.
  - Accessible focus trap on mobile modal with `Escape` key close handler returning focus to the hamburger trigger.
- **Sticky CTA (`src/components/layout/StickyCta.tsx`):**
  - Floating bottom-right pill with pulsing butter dot indicator and "Chat on WhatsApp" default label.
  - Expands on hover or keyboard click into three direct options: WhatsApp (+1234567890), Book a 15-min call (Cal.com), and Send an email (hello@kratos.dev).
  - Automatically hidden when full-screen modals or the Estimator are active via `useLayoutModal()`.
- **Global Footer (`src/components/layout/Footer.tsx`):**
  - Cocoa background (`#3B2218`) with large rounded-t transition (`rounded-t-[40px] md:rounded-t-[56px]`).
  - Short brand pitch, availability chip, primary CTA and ghost booking button.
  - Solutions, company, and reach-out navigation columns.
  - Middle row with email, WhatsApp, global remote location, and pill social buttons (GitHub, LinkedIn, X/Twitter).
  - GIANT wordmark "kratos" spanning full viewport width at the bottom, with individually bouncing spring letters on hover/touch and widely spaced lowercase tagline.
- **Page Transitions (`src/components/layout/PageTransition.tsx`):**
  - Fast pill-shaped orange mask sweep between Next.js routes (< 550ms), automatically bypassed when `prefers-reduced-motion` is active.
- **Layout Context (`src/lib/modal-context.tsx`):**
  - State provider for mobile navigation and estimator modal visibility.
- **Polymorphic Button Support (`src/components/ui/Button.tsx`):**
  - Clean `href` support for Next.js internal routes and external links with zero TypeScript drag-event collisions.
- **Accessibility:**
  - Accessible skip link ("Skip to main content") at the root layout.
  - Tested keyboard tab flow across all controls with 0 phantom stops.
  - Verified across 360, 768, 1280, and 1920 viewports.

### Added
- **UI Primitives:**
  - `Button`: Primary, secondary, and ghost variants in full pill shape with spring press squish (`scale 0.96`), circular arrow badge, loading, and disabled states.
  - `Pill` & `Chip`: Status tags, availability chip with pulsing butter dot indicator.
  - `Card`: Large radii (min 28px) with optional circular "portal" image cutout revealing on hover.
  - `Input`: Pill-shaped input with custom focus bloom (`focus-visible:ring-3 focus-visible:ring-orange-deep`).
  - `Textarea`: Rounded-card textarea with soft focus ring.
  - `Select`: Pill-shaped select with custom chevron indicator.
  - `BubbleOption`: Accessible tactile selector for Project Estimator with keyboard navigation (`Space`/`Enter`), ARIA semantics, and squish physics.
  - `Marquee`: Seamless infinite text/chip marquee, pausable on hover, automatically disabled under `prefers-reduced-motion`.
  - `Accordion`: Accessible accordion with smooth spring height animation and keyboard support.
  - `Section`: Reusable section wrapper establishing consistent vertical rhythm, wide-tracked eyebrow label, and headline slot.
- **FX Primitives:**
  - `fx/Squish`: Reusable motion wrapper adding spring press squish (`scale 0.96`) to any child.
  - `fx/GooeyBlobs`: 60fps canvas + SVG `feColorMatrix` gooey metaball layer in brand orange/peach/butter, pausing via `IntersectionObserver` when offscreen, with static fallback under reduced motion.
  - `fx/CircleReveal`: Scroll-triggered circular clip-path reveal for images and sections.
  - `fx/CursorFollower`: Smooth desktop spring dot follower expanding over interactive elements (disabled on touch).
- **Preview Route:** Created `/design-system` with `noindex` metadata showcasing every component in all its states on both cream and cocoa surfaces.

## [Prompt 1: Scaffold, Tokens, and Logo] - 2026-10-07

### Added
- **Project Scaffolding:** Initialized Next.js 15 App Router with TypeScript strict mode, Tailwind CSS, Framer Motion, Lenis, React Hook Form, Zod, and Lucide React.
- **Architectural Hierarchy:** Structured folders per brief: `src/components/{ui,fx,sections,estimator,layout}`, `src/content`, `src/lib`, `src/styles`, and `public/brand`.
- **Environment Template:** Added `.env.example` with Resend, Supabase, Cloudflare Turnstile, and site configuration variables.
- **Brand Asset Pipeline:**
  - Placed master raster logo at `public/brand/logo.png`.
  - Vectorized SVG wordmark at `public/brand/logo.svg`.
  - Created monochrome variants: `public/brand/logo-ink.svg` and `public/brand/logo-cream.svg`.
  - Created app icon squircle `public/brand/app-icon.svg` and favicon set (`public/brand/favicon.svg`, `src/app/icon.svg`, `src/app/apple-icon.svg`).
- **Design Tokens:**
  - Implemented `src/styles/tokens.css` with full palette (`cream`, `peach`, `orange`, `orange-deep`, `ink`, `ink-soft`, `cocoa`, `butter`), large border radii (`card: 28px`, `bubble: 40px`, `pill: 9999px`), gentle shadows, and fluid typography clamps.
  - Mapped tokens into `tailwind.config.ts`.
- **Global Typography & Baseline:** Loaded Google fonts `Fredoka` (600, 700) and `Outfit` (400, 500, 600, 700) via `next/font`.
- **Smooth Scroll:** Built `src/components/layout/SmoothScroll.tsx` with Lenis, automatically disabled when `prefers-reduced-motion` is detected.
- **Verification Page:** Built `src/app/page.tsx` testing the logo at 800px and 40px, monochrome variants, and design token swatches.
