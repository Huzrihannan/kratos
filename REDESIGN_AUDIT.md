# Krat.OS v2 Redesign Audit (v1 -> v2 Migration Checklist)

Generated as part of **Prompt R1** on branch `redesign/krat-os-v2`.
This document catalogs all 68 active codebase files containing legacy v1 tokens, typography, branding, and shape/motion metaphors.

## 1. Summary Statistics

- **Total Audited Source Files:** 68
- **Files with Brand Name "Kratos" / "kratos":** 34 (Target: Replace with "Krat.OS")
- **Files with Legacy Fonts (Fredoka / Outfit):** 9 (Target: Replace with JetBrains Mono + Geist)
- **Files with Legacy Color Tokens:** 56 (Target: Map to semantic tokens: bg, surface, fg, fg-muted, line, line-strong, red, red-text, ok)
- **Files with Legacy Shapes / Motion (blobs, pills, springs):** 53 (Target: Migrate to sharp 0-4px radii, hairline borders, mechanical motion)

## 2. Prompt Mapping & Execution Strategy

| Prompt | Scope | Target Files |
|---|---|---|
| **R1** | Rebrand sweep: name, logo, tokens, fonts, theme | `site.ts`, metadata, JSON-LD, `tokens.css`, `tailwind.config.ts`, `layout.tsx`, `globals.css`, logo SVGs, theme provider, backward-compatibility token bridge |
| **R2** | Design system v2 & motion engine | `src/components/ui/*`, `src/lib/motion/*`, `src/app/design-system/*` |
| **R3** | Global shell | `Nav.tsx`, `Footer.tsx`, `StickyCta.tsx`, boot sequence, command palette, status bar |
| **R4** | The Hero (signature moment) | `src/components/sections/Hero.tsx`, shader field, terminal, live windows |
| **R5** | Home sections A | `Modules.tsx`, `Pipeline.tsx`, `Work.tsx`, `Proof.tsx` |
| **R6** | Home sections B | `StackMarquee.tsx`, `Principles.tsx`, `Faq.tsx`, `FinalCta.tsx` |
| **R7** | Estimator configurator | `src/components/estimator/*` |
| **R8** | Inner pages | `/services`, `/work`, `/about`, `/contact`, `/start`, `/privacy`, `/terms` |
| **R9** | Motion polish & levels | MotionContext (full / lite / off), performance audit, FPS profiling |
| **R10** | SEO, emails, identity | Email templates, meta tags, sitemap, 301 redirects, robots.txt |
| **R11** | QA & Release | End-to-end verification, Lighthouse >= 90 mobile, bundle size <= 220KB gzipped |

## 3. Detailed File Audit Table

| File | Brand Name | Fonts | Color Tokens | Shapes / Motion | Primary Prompt Action |
|---|:---:|:---:|---|---|---|
| `AGENTS.md` | `kratos` | `fredoka`, `outfit` | `cream`, `orange` | `blob`, `pill`, `spring` | R2 UI components |
| `PROJECT_BRIEF.md` | `kratos` | `fredoka`, `outfit` | `cream`, `orange` | `blob`, `pill`, `spring` | R2 UI components |
| `functions/api/lead.ts` | `kratos` | - | `ink` | - | R2 UI components |
| `package.json` | `kratos` | - | - | - | **R1 (Immediate)** |
| `src/app/about/page.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa` | `pill`, `rounded-full` | R8 Inner Pages |
| `src/app/api/lead/route.ts` | `kratos` | - | `ink` | - | R2 UI components |
| `src/app/contact/page.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `pill`, `rounded-full` | R8 Inner Pages |
| `src/app/design-system/layout.tsx` | `kratos` | - | - | - | **R1 (Immediate)** |
| `src/app/design-system/page.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa`, `butter` | `blob`, `pill`, `rounded-full`, `spring` | R2 UI components |
| `src/app/globals.css` | - | `outfit` | `cream`, `orange`, `ink` | - | **R1 (Immediate)** |
| `src/app/layout.tsx` | `kratos` | `fredoka`, `outfit` | `cream`, `orange`, `orange-deep`, `ink` | `pill`, `rounded-full` | **R1 (Immediate)** |
| `src/app/not-found.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `blob`, `rounded-full` | R2 UI components |
| `src/app/opengraph-image.tsx` | `kratos` | - | `cream`, `peach`, `butter` | `blob`, `pill` | R2 UI components |
| `src/app/page.tsx` | `kratos` | - | `cream`, `orange`, `ink`, `cocoa` | `blob`, `pill` | R2 UI components |
| `src/app/privacy/page.tsx` | `kratos` | - | `peach`, `orange`, `orange-deep`, `ink`, `butter` | `rounded-full` | R8 Inner Pages |
| `src/app/robots.ts` | `kratos` | - | - | - | R2 UI components |
| `src/app/services/[slug]/page.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `rounded-full` | R8 Inner Pages |
| `src/app/services/page.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `butter` | `blob`, `pill`, `rounded-full` | R8 Inner Pages |
| `src/app/sitemap.ts` | `kratos` | - | - | - | R2 UI components |
| `src/app/start/page.tsx` | `kratos` | - | `peach`, `orange`, `ink` | `rounded-full` | R8 Inner Pages |
| `src/app/terms/page.tsx` | `kratos` | - | `peach`, `orange`, `orange-deep`, `ink`, `butter` | `rounded-full` | R8 Inner Pages |
| `src/app/work/[slug]/page.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa`, `butter` | `rounded-full` | R8 Inner Pages |
| `src/app/work/page.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `butter` | `rounded-full` | R8 Inner Pages |
| `src/components/contact/ContactForm.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `blob`, `rounded-full` | R8 Inner Pages |
| `src/components/estimator/EstimatorModal.tsx` | - | - | `cream` | `spring` | R7 Estimator |
| `src/components/estimator/EstimatorProgress.tsx` | - | - | `peach`, `orange`, `orange-deep`, `ink` | `pill`, `rounded-full` | R7 Estimator |
| `src/components/estimator/EstimatorWizard.tsx` | `kratos` | - | `orange`, `orange-deep`, `ink` | `spring` | R7 Estimator |
| `src/components/estimator/ResultScreen.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `butter` | `blob`, `rounded-full`, `spring` | R7 Estimator |
| `src/components/fx/BlobConfetti.tsx` | - | - | `peach`, `orange`, `cocoa`, `butter` | `blob`, `spring` | R2 / R4 FX Components |
| `src/components/fx/CursorFollower.tsx` | - | - | - | `rounded-full`, `spring` | R2 / R4 FX Components |
| `src/components/fx/GooeyBlobs.tsx` | - | - | `peach`, `orange`, `butter` | `blob`, `rounded-full` | R2 / R4 FX Components |
| `src/components/fx/Magnetic.tsx` | - | - | - | `spring` | R2 / R4 FX Components |
| `src/components/fx/Squish.tsx` | - | - | - | `spring` | R2 / R4 FX Components |
| `src/components/layout/Footer.tsx` | `kratos` | `outfit` | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa`, `butter` | `blob`, `pill`, `rounded-full`, `spring` | R3 Shell |
| `src/components/layout/Nav.tsx` | `kratos` | `fredoka` | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `pill`, `rounded-full`, `spring` | R3 Shell |
| `src/components/layout/PageTransition.tsx` | - | - | `peach`, `orange` | `pill`, `rounded-full` | R3 Shell |
| `src/components/layout/StickyCta.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `butter` | `blob`, `pill`, `rounded-full`, `spring` | R3 Shell |
| `src/components/sections/Faq.tsx` | - | - | `peach`, `orange`, `ink` | `rounded-full`, `spring` | R2 UI components |
| `src/components/sections/FinalCta.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa`, `butter` | `blob`, `pill`, `rounded-full`, `spring` | R2 UI components |
| `src/components/sections/Hero.tsx` | - | `fredoka`, `outfit` | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa`, `butter` | `blob`, `pill`, `rounded-full`, `spring` | R4 Hero |
| `src/components/sections/Process.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `pill`, `rounded-full`, `spring` | R2 UI components |
| `src/components/sections/Proof.tsx` | - | - | `cream`, `peach`, `orange`, `ink`, `cocoa`, `butter` | `blob`, `rounded-full`, `spring` | R2 UI components |
| `src/components/sections/Services.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `pill`, `rounded-full`, `spring` | R2 UI components |
| `src/components/sections/StackMarquee.tsx` | - | - | `peach`, `orange`, `orange-deep`, `ink` | `rounded-full`, `spring` | R2 UI components |
| `src/components/sections/WhyKratos.tsx` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `butter` | `rounded-full`, `spring` | R2 UI components |
| `src/components/sections/Work.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa`, `butter` | `rounded-full`, `spring` | R2 UI components |
| `src/components/ui/Accordion.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `rounded-full`, `spring` | R2 Design System |
| `src/components/ui/BubbleOption.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `rounded-full`, `spring` | R7 Estimator |
| `src/components/ui/Button.tsx` | - | - | `cream`, `orange`, `orange-deep`, `ink`, `cocoa` | `pill`, `rounded-full` | R2 Design System |
| `src/components/ui/Card.tsx` | - | - | `cream`, `peach`, `orange`, `ink`, `cocoa` | `spring` | R2 Design System |
| `src/components/ui/Input.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `pill` | R2 Design System |
| `src/components/ui/Marquee.tsx` | - | - | `cream`, `ink` | - | R2 Design System |
| `src/components/ui/Pill.tsx` | - | - | `cream`, `peach`, `orange`, `ink`, `cocoa`, `butter` | `pill`, `rounded-full` | R2 Design System |
| `src/components/ui/Section.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa` | - | R2 Design System |
| `src/components/ui/Select.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | `pill` | R2 Design System |
| `src/components/ui/Textarea.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink` | - | R2 Design System |
| `src/components/work/WorkFilter.tsx` | - | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `butter` | `blob`, `pill`, `rounded-full`, `spring` | R8 Inner Pages |
| `src/content/about.ts` | `kratos` | - | - | - | R8 Inner Pages |
| `src/content/proof.ts` | `kratos` | - | `peach`, `orange`, `butter` | - | R5/R6/R8 Content Data |
| `src/content/services.ts` | - | - | - | `blob` | R8 Inner Pages |
| `src/content/site.ts` | `kratos` | - | `ink` | - | **R1 (Immediate)** |
| `src/content/stack.ts` | - | - | - | `spring` | R5/R6/R8 Content Data |
| `src/content/work.ts` | `kratos` | `fredoka` | `peach`, `orange`, `butter` | `pill` | R8 Inner Pages |
| `src/lib/motion.ts` | `kratos` | - | - | `blob`, `spring` | R2 UI components |
| `src/lib/schema.ts` | - | - | `ink` | - | R2 UI components |
| `src/lib/utm.ts` | `kratos` | - | - | - | R2 UI components |
| `src/styles/tokens.css` | `kratos` | - | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa`, `butter` | `blob`, `pill` | **R1 (Immediate)** |
| `tailwind.config.ts` | - | `fredoka`, `outfit` | `cream`, `peach`, `orange`, `orange-deep`, `ink`, `cocoa`, `butter` | `pill` | **R1 (Immediate)** |
