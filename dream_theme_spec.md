<USER_REQUEST>
# Krat.OS — Dream Theme Pack (theme #3)

A third theme for the site, switchable in the top nav next to Dark and Light. **Dream** is a storybook world of sky, clouds, meadow and flowers, built for people who are *not* technical: rich and complex on the outside, effortless on the inside. It comes with a redesigned logo.

Contents: 1 Decisions · 2 Concept · 3 Architecture · 4 Art direction and tokens · 5 Living Sky · 6 Meadow and life · 7 Logo · 8 Page spec · 9 Guardrails · 10 Before you start · 11 Prompts D0 to D14

---

## 1. Decisions I made for you (change any of them)

| Decision | Choice | Why |
|---|---|---|
| Theme name in the nav | **Dream** (next to Dark and Light) | Short, clear, non-technical |
| Core idea | **"Plant an idea. Watch it bloom."** The page is one landscape; scrolling is a gentle descent from sky to meadow to dusk | Gardening and weather are universal metaphors, no tech knowledge needed |
| Fonts | **Fraunces** (Soft axis) for headlines, **Figtree** for body | Warm, premium, very readable. No monospace, no tech feel |
| Signature red | Stays, as the **poppy** | Keeps brand continuity; red is still the single signal colour |
| Default theme | Still Dark (or Light if the visitor's system prefers it). Dream is never forced, but can be linked: `/?theme=dream` | Send non-technical prospects a Dream link in ads and emails |
| Content | Same words in all three themes. Only short decorative strings differ | Keeps SEO, translation and maintenance simple |
| Quality | Adaptive: top-tier on capable devices, gracefully simpler on weak ones | A dreamy site that stutters is not dreamy |

---

## 2. The concept: one landscape, one scroll

The visitor descends from a bright sky into a meadow and ends at dusk with fireflies. Every section is a place in that landscape, and every place explains the same business content in a friendly way.

| Section | Dream scene | What happens |
|---|---|---|
| Hero | **High sky** | Painterly clouds drift, sun glows with soft rays, birds and a hot-air balloon pass, a poppy-dotted hill waits below. The logo blooms. |
| Services | **The Garden** | Six services are six flowers that grow from seeds as you arrive. Hover or tap and bees and butterflies visit. |
| Process | **The Path** | A winding path through the meadow. A seed becomes a sprout, a plant, a bloom, a garden as you scroll. Sky moves from morning to afternoon. |
| Work | **Postcards on a line** | Case studies hang as postcards on a washing line that sways in the wind. Move your cursor and they flutter. |
| Proof | **Golden hour** | Warm light. Testimonials arrive as letters on paper planes. (Hidden until real data exists.) |
| Tech stack | **The seed shed** | Technologies are seed packets on a wall, each with a one-line plain-English explanation. |
| Principles | **Stepping stones** | Three or four mossy stones, each with a tiny living animation. |
| FAQ | **Dandelion wishes** | Each question is a dandelion. Open one and seeds drift away to reveal the answer. |
| Final CTA | **Make a wish** | A giant dandelion. Blow on it (tap, drag or hold) and the seeds fly. The real button is always there too. |
| Footer | **Dusk and night** | Stars, moon, fireflies and a cottage whose window glows when you are taking new projects. |

**Built for non-technical visitors, concretely:**
1. Plain language everywhere; an optional glossary tooltip for any jargon term.
2. Bigger text (18px base), bigger tap targets (48px), higher line height, no tiny uppercase labels.
3. Nothing auto-advances; no hover-only information (everything also works by tap and keyboard).
4. A visible **Calm** switch for motion, beside the theme control.
5. Each process step says what *you* will need to do, in one line.
6. The estimator gets plain-language hints under every option and becomes a garden that grows as you answer.

---

## 3. Architecture: three themes without tripling the code

The risk is building three websites. The rule that prevents it:

> **Never branch the accessible content by theme. Branch only the skin, the decorative scenes, and tiny decorative strings.**

Four layers:

| Layer | What it is | Loaded for |
|---|---|---|
| 1. Tokens | CSS variables per `data-theme` (colour, radii, fonts, shadows, easing, durations) | Everyone (tiny) |
| 2. Skins | CSS variants of existing components (Button, Window/Card, Input, Accordion, Section) | Everyone (tiny) |
| 3. Scenes and slots | Decorative, `aria-hidden` React components mounted in reserved **slots** (`ThemedSlot`) | Only the active theme, **code-split and lazy** |
| 4. Flair | Short decorative strings (eyebrows, captions) via `<Flair dark light dream />`, all three rendered, two hidden by CSS | Everyone (a few bytes) |

How this works in practice:
- **No flash:** a blocking inline script sets `data-theme` (from `?theme=`, then saved choice, then system preference for Dark or Light) before first paint. Layer 0 of Dream (a CSS sky gradient and hill silhouettes from tokens) paints instantly, so a returning Dream visitor never sees another theme first.
- **Same markup, no hydration mismatch:** the server renders the shared content skeleton once. Dream scenes mount after hydration into slots with reserved dimensions (no layout shift) and a CSS skeleton.
- **Flair rule:** at most 12 words, decoration only, never SEO-critical text. Headlines and paragraphs are identical across themes.
- **Dream never costs Dark and Light visitors anything:** dream JS, textures and fonts are not downloaded unless Dream is active. Dark and Light first-load JS may grow by at most 5 KB gzipped (the switcher).
- **Fonts:** Fraunces and Figtree are loaded with `next/font`, `preload: false`, size-adjusted fallbacks, so only Dream visitors fetch them.
- **Analytics:** add a `theme` property to existing events and a new `theme_change` event. Later you can see which theme converts best.
- **Mobile browser UI:** `<meta name="theme-color">` and `color-scheme` update per theme.

Folder sketch:

```
src/themes/
  registry.ts                 # ids, labels, icons, themeColor, colorScheme
  ThemedSlot.tsx  Flair.tsx  useThemeMotion.ts
  dream/
    world/    (WorldCanvas, shaders, SkyDriver, Wind, QualityGovernor)
    art/      (flowers, birds, butterflies, bees, balloon, cottage, tree, clouds)
    scenes/   (Hero, Garden, Path, Postcards, GoldenHour, SeedShed, Stones, DandelionFaq, WishCta, Footer)
    estimator/ (GardenBuilder)
    logo/     (DreamLogo, bloom timeline)
```

---

## 4. Art direction and design tokens

**Look:** storybook and painterly, but clean vector: layered flat shapes with two or three tonal steps, soft gradients only on large forms, no outlines, organic asymmetric curves, light from the sun's direction, one shared paper-grain texture to unify everything. All art is original: no stock, no copied characters, no imitation of a named artist or studio.

**Shapes:** pebbles, clouds and petals. Radii 20 to 40px, pill buttons, soft coloured shadows (never grey), paper cards with a faint deckled edge. Frosted glass only for the nav and dialogs (one layer, solid fallback).

**Palette (Dream):**

| Token | Value | Use |
|---|---|---|
| `paper` | `#FFFAF0` | Cards and text surfaces (day) |
| `paper-2` | `#FFF1DC` | Secondary surfaces |
| `ink` | `#2B2A52` | Body text and headings |
| `ink-soft` | `#55537A` | Secondary text |
| `link` | `#3B3AA0` | Links |
| `poppy` | `#FD142B` | **Brand red**: poppies, accents, shapes. Never small text |
| `poppy-text` | `#C8102E` | Red when it must be small text |
| `night-paper` | `#1B1E4B` | Cards at dusk and night |
| `cream` | `#FFF6E5` | Text on night surfaces |
| `cream-soft` | `#CFCBEA` | Secondary text on night surfaces |
| `grass-far / mid / near / deep` | `#A8D5A2 / #6FB07A / #3E8C5A / #2A6B48` | Meadow depth layers |
| `sage` | `#5E9B6A` | Stems (decoration only) |
| Flower accents | daisy yolk `#FFC83D`, sunflower `#FFB400`, lavender `#9B8CE0`, cherry `#FFB7D1` | Flowers |

**Measured contrast:** ink on paper 12.97, ink-soft on paper 6.95, link on paper 8.78, cream on night-paper 14.67, cream-soft on night-paper 10.03, poppy-text on paper 5.65, grass-deep on paper 6.13. Pure `poppy` on paper is only 3.80 (shapes and 24px+ display only), and `sage` is 3.17 (decoration only).

**Typography:** Fraunces (axes: opsz, SOFT 100, WONK 0 to 1, weight 500 to 700) for headlines up to about 8rem; Figtree for body (18px base, line height 1.65) and UI. Italic Fraunces for small handwritten-feeling notes. No monospace, no uppercase micro-labels.

**Motion personality (opposite of Dark):** slow, floaty, organic. Durations 700 to 1400ms, sine and quart easing, slight randomness in every loop, gentle overshoot allowed for blooms only. Dark is mechanical; Dream breathes.

**Voice (flair only):** warm, plain, nature words ("What we grow", "How it grows"). Anything clickable stays literal: "Estimate my project", not "Plant your idea".

---

## 5. The Living Sky

One shared state drives everything, so the world stays coherent.

**Keyframes** (gradient stops at 0%, 62% and 100% of viewport height; I checked text contrast across the hero text zone, 22 to 60% of height):

| State | Top | Mid | Horizon | Cloud tint | Text | Min contrast, plain | With 50% cloud overlay | With scrim |
|---|---|---|---|---|---|---|---|---|
| Dawn | `#8FA6E0` | `#F2B8CF` | `#FFE0B5` | `#FFE3E0` | ink | 6.32 | 8.49 | 9.47 |
| Day | `#6DB6F0` | `#B4DDF7` | `#FFF0D4` | `#FFFFFF` | ink | 7.19 | 9.96 | 10.67 |
| Golden hour | `#7FA6E6` | `#F6C79A` | `#FFD47A` | `#FFE8C4` | ink | 6.36 | 8.58 | 9.55 |
| Dusk | `#33346F` | `#7A4A8C` | `#FF9E6B` | `#E7A9C2` | cream | 6.25 | **3.19** | 6.03 |
| Night | `#0F1438` | `#252A66` | `#54478C` | `#8F94D0` | cream | 12.36 | 5.55 | 8.72 |

Two findings that shape the rules:
- **There is a dead zone.** Any background with relative luminance between about 0.17 and 0.29 fails 4.5:1 with both indigo ink and cream (best case 3.9). Mid-tone skies are the danger, so every keyframe above keeps the text zone clearly light or clearly dark.
- **Clouds can break dusk.** Light clouds over the dusk sky drop cream text to 3.19. A soft scrim behind headlines is mandatory at dusk (and recommended everywhere).

**Modes** (selected in a small "sky dial" in the theme popover and footer, saved):
- **Journey** (default): scroll position moves the sky from day to golden hour to dusk to night by the footer.
- **Live**: follows the visitor's local time, with a slow drift.
- **Fixed**: Dawn, Day, Golden, Dusk or Night.

**One driver, many consumers:** a `SkyDriver` interpolates keyframes in OKLab and writes CSS variables (`--sky-top`, `--sky-mid`, `--sky-horizon`, `--cloud-tint`, `--sun-x`, `--sun-y`, `--ambient`, `--star-alpha`, `--grass-tint`, `--hero-fg`) and shader uniforms. Updates only when values change, at most 30 times per second.

**Layers (each fails safely into the one below):**
0. CSS gradient sky and hill silhouettes (server-rendered, instant, always present, beautiful alone)
1. Sprite clouds and SVG hills with parallax (CSS transforms; cloud sprites are alpha masks tinted by `--cloud-tint`)
2. One fixed **WebGL "World"** canvas: sky, sun and moon with bloom, stars, two layers of fbm clouds with sun-lit edges, horizon haze, distant hills, instanced grass (see section 6)

---

## 6. Meadow, wind and living things

- **Wind system:** one shared wind value from cursor speed, scroll speed and slow ambient gusts. Registered elements (flowers, grass strips, postcards, washing line) sway through GSAP quick setters. At most 60 registered elements, only while visible.
- **Grass:** WebGL instanced blades in the World canvas (about 8,000 desktop, 2,500 phones) bending with wind and pushed away by the cursor. Fallback: three SVG strips with CSS sway. Final fallback: static.
- **Flower kit** (inline SVG, each under 6 KB, named parts for animation): Poppy, Daisy, Tulip, Sunflower, Dandelion (head and seed-puff), Cherry blossom branch, Clover, Lavender, wildflower mix. Each has seed, sprout and bloom timelines, idle sway and a hover reaction.
- **Service flowers:** Web = Daisy, Mobile = Tulip, E-commerce = Sunflower, AI and automation = Dandelion, UI/UX = Cherry blossom, Maintenance = Clover. **The Poppy is reserved for the brand and primary actions.**
- **Life:** butterflies by day (flee the cursor, land on hovered flowers), bees at noon, birds in V formations every 25 to 45 seconds, drifting petals, pollen motes, fireflies at dusk and night (slow glow, never flashing), a rare shooting star at night.
- **Cursor:** a soft glowing orb with a tiny pollen trail, turns into a mini poppy over buttons, click sends a small petal burst. Touch: petals ripple from the tap.
- **Particles:** one shared 2D canvas with sprite batching and one shared ticker. No separate animation loops anywhere.
- **Quality governor:** tiers T3 (WebGL clouds, WebGL grass, all life), T2 (WebGL clouds, SVG grass, reduced life), T1 (sprites and CSS only), T0 (static). Starts from a short benchmark and device hints, steps down if frame rate stays under about 40fps for two seconds, remembers the decision. Maps onto the existing motion levels: `off` is T0, `lite` is T1, `full` is T3 or T2.
- **Frame pacing:** the World renders at 30fps when idle, 60fps while scrolling or moving the pointer, 15fps after 20 seconds idle, nothing when the tab is hidden or the canvas is off-screen. Clouds render at about half resolution into an offscreen target for a soft look and low cost.

---

## 7. The Dream logo

I built a reference sketch from real Fraunces Soft and Figtree outlines (attached separately as the concept sheet and five SVGs). It is a starting point for the agent, not production artwork.

**Concept: "the original logo, in bloom."**
- The tall red **bar** becomes a **sprout** with two leaves and a bud with a red tip. It is the idea.
- The red **dot** becomes a **poppy** on a short stem with two leaves. It is the finished software.
- Both stand on the baseline, which acts as the ground. The tagline sits below it.
- Wordmark: "Krat.OS" in Fraunces, optical size 96, weight 620, Soft 100, Wonk 0. Tagline: "Software solutions" in Figtree weight 560, wide tracking, cap height about 19% of the wordmark's.

**Colours:** wordmark ink `#2B2A52` on paper and `#FFF6E5` at night; stem `#5E9B6A` (night `#74B882`); leaves `#7BB77F` (night `#93CF99`); bud `#3F7D55` (night `#4C9566`); poppy petals in layered reds from `#A80A1C` through `#FD142B` to `#FF4A5C`, centre `#2A1B2E` with a ring of stamens. **The red never changes.**

**Size ladder (important):** 120px and up full lockup; 48 to 120px sprout and poppy mark; 24 to 48px collapses to a flat red **bar and dot, which is the original logo**; favicon is the same bar and dot. The Dream logo and the Dark and Light logos are one family.

**Animation:** first view: stem grows, leaves unfurl, bud swells, poppy opens, a puff of pollen (about 1.6s). Afterwards: leaf and petal sway driven by the wind system, petals breathe 1 to 2%. Hover: the poppy opens slightly wider and releases one or two petals. Reduced motion: static, fully bloomed.

**Known sketch issues the agent must fix:** the poppy sits a little close to the "t"; kerning around the gap needs tuning; at small sizes the sprout can read as the letter "I" so the size ladder must switch early; poppy petal drawing can be richer (crinkle, translucency).

---

## 8. Page spec (Dream)

| Page | Dream treatment |
|---|---|
| `/` | The full descent described in section 2 |
| `/services` | Meadow of six flowers, sticky signpost index, plain "not sure what you need?" band |
| `/services/[slug]` | The service's flower large in the hero, "how it grows" path, technologies as seed packets, dandelion FAQ |
| `/work` | Postcards on a washing line; filtering lets the wind blow away non-matching cards. Empty state: one real sentence and a link to the estimator |
| `/work/[slug]` | Story chapters with gentle parallax, results as growth, next project as a balloon drifting in |
| `/about` | Story as a picture book of illustrated scenes; values as "seeds we plant"; team as polaroids in the garden (only with real people) |
| `/start` | Garden builder (see D10) |
| `/contact` | "Send us a letter": paper form; on submit it folds into an envelope and a paper plane flies away; success "Your letter is on its way" |
| 404 | A lost balloon drifting; button "Float back home" |
| Legal | Calm: soft background, no motion |

---

## 9. Guardrails (learned from the hero-background bug and the placeholder bug)

1. **Every fx layer fails safely.** Static CSS layer always present; WebGL fades in only after the first successful frame; any error, context loss or timeout fades it out. Tests force these failures.
2. **No placeholders, no invented facts.** The content rules from the audit apply to Dream (hide-when-missing, no `[PLACEHOLDER]`, no fake stats).
3. **SkyContrast test:** a Playwright test renders five sky states at three scroll positions, hides each text element, samples the pixels behind it and computes the worst-case contrast against its colour. Below 4.5:1 (3:1 for 24px+) fails the build. Axe cannot check gradients and canvases, so this test is the real check.
4. **Text lives on surfaces.** Body text sits on paper or night-paper cards. Only display headlines may sit on the sky, with a scrim, and they must pass SkyContrast.
5. **Performance budgets:** Dream lazy JS about 250 KB gzipped in total, hero images and textures about 400 KB, one WebGL context, one shared ticker, everything pauses off-screen. Targets: Dark and Light unchanged (Performance 90 or higher on mobile); Dream Performance 85 or higher on mobile with auto-tier, LCP under 2.5s, CLS under 0.05, INP under 200ms. I set Dream's bar lower on purpose: a world this rich cannot honestly promise 90 on every phone.
6. **Accessibility:** decorative scenes `aria-hidden`; no flashing above 3Hz; fireflies glow slower than 1Hz; gentle parallax only; Calm switch; forced-colors fallback; focus ring is a 3px indigo ring with a 2px paper inner ring so it works on any sky; hover content always has tap and keyboard equivalents.
7. **Art review gates:** after the sky, meadow and hero, the agent stops and waits for your approval before building the rest.
8. **Theme-aware rules:** the earlier brand rules (radius 4px maximum, no pills, mono type, mechanical motion) apply only to Dark and Light. Audits must check each theme against its own rules.

---

## 10. Before you start

- Branch `theme/dream` from the current main after the audit pass has merged. Tag the current state `pre-dream`.
- Put the logo concept files in `public/brand/source/dream/` (sheet and SVGs from me).
- Prepare, if you have them: a mood board of references you like (images you own), a real list of technologies, real case studies, and approved prices. The same content rules apply: blank means hidden.
- Decide whether a human illustrator will later replace any art (hero scene, flowers). The art kit is built so SVGs can be swapped (`art/index.ts` registry).

**Run order and checkpoints**

| Prompt | Mode | Checkpoint |
|---|---|---|
| D0 brief addendum | Fast | |
| D1 architecture and switcher | **Planning** | Dark and Light must look unchanged |
| D2 tokens and primitives | Fast | |
| D3 logo | Fast | **Approve the logo** |
| D4 sky and clouds | **Planning** | **Approve the sky states** |
| D5 meadow and life | **Planning** | **Approve the meadow** |
| D6 shell | Fast | |
| D7 hero | **Planning** | **Approve the hero before continuing** |
| D8, D9 home sections | **Planning** | |
| D10 estimator | **Planning** | |
| D11 inner pages | Fast | |
| D12 polish and performance | **Planning** | |
| D13 QA and release | Fast | |
| D14 stretch goals | Optional | |

---

## 11. THE PROMPTS

### D0 — Brief addendum: three themes, theme-aware rules

Append this to `PROJECT_BRIEF.md` and scope the old shape, type and motion rules to Dark and Light.

```
Read PROJECT_BRIEF.md. APPEND the section below, and edit the earlier hard rules so that "radius 4px maximum", "no pills", "mono headlines", "mechanical motion" and "no springs" apply ONLY under data-theme dark and light. Everything else in the brief (content rules, no placeholders, hide-when-missing, robustness, performance reporting, working style) still applies to all three themes.

THEMES
The site has three themes selectable in the top nav: dark (default, technical), light, and dream. All content, routes, API, analytics event names and env variables are unchanged. 

THE ONE ARCHITECTURE RULE
Never branch accessible content by theme. Themes differ only in (1) CSS tokens, (2) CSS skins of shared components, (3) decorative aria-hidden scenes mounted in reserved slots (ThemedSlot) and code-split per theme, and (4) short decorative strings via <Flair dark light dream /> (at most 12 words, never SEO-critical). Headlines and paragraphs are identical in every theme. Dream code, textures and fonts are never loaded unless Dream is active. Dark and Light first-load JS may grow by at most 5 KB gzipped.

DREAM DESIGN LANGUAGE ("Plant an idea. Watch it bloom.")
- Audience: non-technical visitors. Plain language, 18px base text, 48px tap targets, line height 1.65, no tiny uppercase labels, no terminal/OS/HUD metaphors, nothing auto-advances, no hover-only information.
- Look: storybook, painterly vector. Layered flat shapes with 2-3 tonal steps, soft gradients on large forms only, no outlines, organic asymmetric curves, light from the sun, one shared paper-grain texture. All art is original; no stock imagery, no copied characters, no imitation of a named artist or studio.
- Shapes: pebbles, clouds, petals. Radii 20-40px, pill buttons, soft COLOURED shadows. Frosted glass only for the nav and dialogs, with a solid fallback.
- Type: Fraunces (opsz, SOFT 100, WONK, weight 500-700) for headlines, Figtree for body and UI, italic Fraunces for small notes. No monospace.
- Palette tokens: paper #FFFAF0, paper-2 #FFF1DC, ink #2B2A52, ink-soft #55537A, link #3B3AA0, poppy #FD142B (brand red: shapes and display 24px+ only), poppy-text #C8102E (small red text), night-paper #1B1E4B, cream #FFF6E5, cream-soft #CFCBEA, grass-far #A8D5A2, grass-mid #6FB07A, grass-near #3E8C5A, grass-deep #2A6B48, sage #5E9B6A (decoration only), daisy yolk #FFC83D, sunflower #FFB400, lavender #9B8CE0, cherry #FFB7D1.
- Poppy rule: the poppy is the brand flower and the primary-action flower. Service flowers: Web = daisy, Mobile = tulip, E-commerce = sunflower, AI and automation = dandelion, UI/UX = cherry blossom, Maintenance = clover.
- Motion: slow, floaty, organic. 700-1400ms, sine and quart easing, slight randomness in loops, gentle overshoot only for blooms.
- Voice (flair only): warm, plain, nature words. Anything clickable stays literal ("Estimate my project").
- TEXT RULE: body text sits on paper or night-paper surfaces. Only display headlines (40px+) may sit directly on the sky, with a scrim, and they must pass the SkyContrast test (worst-case contrast of text against the pixels behind it, 4.5:1, or 3:1 at 24px+). Avoid backgrounds with relative luminance between 0.17 and 0.29 behind text.

LIVING SKY
One SkyDriver state (journey / live / fixed; dawn, day, golden, dusk, night keyframes interpolated in OKLab) drives CSS variables and shader uniforms. Layers fail safely: 0 CSS gradient and hills (server-rendered), 1 sprite clouds and SVG hills, 2 one fixed WebGL World canvas. Only ONE WebGL context exists at any time.

QUALITY
Governor tiers T3 / T2 / T1 / T0 mapped to motion levels full / lite / off, benchmarked, auto-downgrading, remembered. One shared animation ticker. World renders 30fps idle, 60fps active, 15fps after 20s idle, 0 when hidden. Dream targets: mobile Performance >= 85, LCP < 2.5s, CLS < 0.05, INP < 200ms; Dark and Light keep their existing targets. Calm switch always visible. No flashing above 3Hz.

WORKING STYLE
For Dream work: stop for owner approval after the logo, the sky, the meadow and the hero. Take screenshots at 360 and 1440 for every state you build and critique them against this brief before reporting.
```

### D1 — Theme architecture and the three-way switcher

```
Read PROJECT_BRIEF.md. Produce an implementation plan first, then build the theme architecture. DO NOT change how Dark and Light look.

1. REGISTRY: src/themes/registry.ts with ids (dark, light, dream), labels, icons (moon, sun, a cloud-with-flower), themeColor, colorScheme, short descriptions.
2. PROVIDER: three explicit themes. First visit: Dark or Light from prefers-color-scheme (Dream is never auto-selected). Support ?theme=dream|dark|light (validated). Persist to localStorage and a cookie (krat-theme, one year, SameSite=Lax). Sync across tabs. A blocking inline script sets data-theme, color-scheme and meta theme-color before first paint (no flash, no hydration warnings). Use or replace next-themes, whichever is cleaner; justify in the plan.
3. SWITCHER: desktop = a segmented radiogroup in the nav (Dark, Light, Dream) with icons, tooltips and arrow-key support; mobile menu = three preview cards with tiny scene thumbnails; also in the footer and the command palette ("Theme: Dream"). A small "new" dot on Dream until it has been tried once. When Dream is active the popover also shows a placeholder for the sky dial (built in D4) and the Calm toggle.
4. TOKENS: restructure src/styles/tokens.css into [data-theme="dark"], [data-theme="light"] and [data-theme="dream"] blocks. Move radii, fonts, shadows, easings and durations into per-theme tokens. Dream values are a stub for now (real ones in D2).
5. SLOTS AND FLAIR: build <ThemedSlot name dark light dream skeleton /> (mounts after hydration; dynamic import with ssr false for dream; reserves dimensions with an aspect-ratio box and a CSS skeleton so there is no layout shift) and <Flair dark light dream /> (server component rendering three spans, two hidden by CSS so only one is in the accessibility tree). Write scripts/check-flair.mjs: every Flair has all three strings, none longer than 12 words, none matching the forbidden-pattern list from the content guardrail.
6. TRANSITIONS: Dark/Light uses a circular reveal from the toggle (View Transitions API with a fallback). Anything to or from Dream uses a CLOUD WIPE: a bank of clouds sweeps across (CSS cloud shapes for now, final art later), the theme swaps underneath, the clouds clear (about 900ms). In motion level off: instant or a 150ms crossfade.
7. MOTION CONTEXT: make tokens theme-aware (useThemeMotion returns easings, durations and personality per theme).
8. ANALYTICS: add a theme property to existing events; new event theme_change with from, to and source (nav, menu, footer, palette, url).
9. BUNDLE GUARD: report first-load JS for / before and after in Dark and Light (limit +5 KB gzipped). Prove with a network trace that no Dream chunk, font or texture is requested unless Dream is active.
10. TESTS (Playwright): 3x3 switching, persistence across reload, URL param, cross-tab sync, keyboard operation, no flash (check data-theme at first paint), clean console, and visual regression showing Dark and Light unchanged except for the switcher.

ACCEPTANCE: the switcher works in nav, menu, footer and palette; Dark and Light pixel-identical to before apart from the switcher; the bundle limit holds; Dream shows a stub theme that already looks intentional (sky gradient and plain surfaces).
```

### D2 — Dream design language: tokens, type and primitives

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Build the Dream design language.

1. TOKENS: all Dream tokens from the brief (palette, radii 20-40px, coloured shadows, easings, durations), the paper-grain texture generated by a script (tiny tiled WebP, 4% opacity), focus ring (3px indigo ring plus 2px paper inner ring, visible on any sky), selection colour, link style (growing vine-like underline).
2. FONTS: Fraunces (opsz, SOFT, WONK, wght) and Figtree via next/font with preload false and size-adjusted fallbacks. Base 18px, line height 1.65, fluid type with clamp, headlines up to about 8rem.
3. SKINS for existing primitives under data-theme dream (same markup, CSS only unless a slot is needed): Button (soft pill; primary = ink fill with paper text and a poppy bloom icon that opens on hover; press = gentle sink and a tiny petal puff), secondary and text-link buttons; Tag (pebble); Card/Window (PaperCard with faint deckled edge; optional cloud variant with a bumpy top edge via SVG mask); Input, Textarea, Select (soft, label above, focus shows the ring and a tiny sprout in the corner); selectable option (SeedOption with an illustrated seed icon slot); Accordion basic skin; Section wrapper (flair eyebrow, no HUD marks); Dialog (paper sheet over a softly blurred sky); Toast (leaf-shaped); Tooltip and a <Jargon term> component with a plain-language definition from src/content/glossary.ts (real, accurate definitions only).
4. SCRIPT: scripts/contrast-report.mjs computes contrast for every text and UI colour pair in all three themes and fails the build below AA. Include the Dream pairs from the brief.
5. PREVIEW: /design-system/dream (noindex) showing every token and component, with a control to switch the five sky states (stub background gradients for now) and the Calm toggle.

ACCEPTANCE: every primitive has a Dream skin with hover, focus, active, disabled and error states; the contrast report passes; Dark and Light unchanged; Dream fonts load only when Dream is active; screenshots of /design-system/dream at 360 and 1440.
```

### D3 — The Dream logo

```
Read PROJECT_BRIEF.md. If public/brand/source/dream/ contains a concept sheet and SVGs, treat them as a reference sketch only and rebuild the logo cleanly.

CONCEPT: "the original logo, in bloom". The red bar becomes a sprout (curved stem, two leaves, a bud with a red tip). The red dot becomes a poppy on a short stem with two leaves. Both stand on the baseline (the ground). Wordmark "Krat.OS" in Fraunces (opsz 96, weight 620, SOFT 100, WONK 0), tagline "Software solutions" in Figtree (weight 560, wide tracking, cap height about 19% of the wordmark's), left-aligned under "Krat".

BUILD
1. Real SVG outlines (no live fonts), clean paths, grouped with named parts for animation: stem, leaf-l, leaf-r, bud, bud-tip, poppy-stem, poppy-leaf-l, poppy-leaf-r, petals-back, petals-front, centre, stamens. Fix the sketch's known issues: more air between the "t" and the poppy, tune kerning around the gap, richer petals (crinkle highlights, translucency), more convincing leaves.
2. Colours: ink #2B2A52 on paper, cream #FFF6E5 at night; stem #5E9B6A (night #74B882); leaves #7BB77F (night #93CF99); bud #3F7D55 (night #4C9566); poppy reds from #A80A1C through #FD142B to #FF4A5C, centre #2A1B2E with about 14 stamens. The red NEVER changes.
3. FILES in public/brand/dream/: logo-dream-day.svg, logo-dream-night.svg, mark-dream.svg, mark-dream-night.svg, mark-simple.svg (flat red rounded bar plus flat red dot, identical to the original brand mark), favicon set and app icons for Dream.
4. COMPONENTS: <Logo variant="auto"> picks the right file per theme; <DreamLogo> with the size ladder: 120px and up full lockup; 48-120px sprout and poppy mark (no tagline); 24-48px mark-simple; favicon mark-simple. role="img" and aria-label "Krat.OS".
5. ANIMATION (GSAP timeline, reused by the intro, nav and footer): bloom = stem grows (stroke draw), leaves unfurl with 120ms stagger, bud swells, poppy opens with gentle overshoot, pollen puff of 6 tiny dots, about 1.6s. Idle = leaf and petal sway driven by the wind system when it exists (until D5, a slow sine), petals breathe 1-2%. Hover = poppy opens a little wider and releases one or two petals. Motion level off = static, fully bloomed.
6. FAVICON SWAP: the favicon and apple-touch-icon follow the active theme (dark and light keep their current marks).
7. PREVIEW: /design-system/dream/logo showing the lockup on all five sky backgrounds, the size ladder, the animation with a replay button, and an overlay mode comparing against the supplied sketch.
8. Check legibility and contrast of the wordmark on paper and night-paper surfaces (the nav and footer use surfaces, not raw sky).

ACCEPTANCE: crisp at 24, 48, 120 and 800px; no reading as the letter "I" at any size (the size ladder switches early enough); the bloom plays once per session and never blocks anything; screenshots of every state. STOP and wait for owner approval of the logo.
```

### D4 — The Living Sky and clouds

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Build the sky system. Remember: every layer fails safely and only ONE WebGL context exists.

1. STATE: src/themes/dream/world/sky.ts with the five keyframes (dawn, day, golden, dusk, night; stops at 0%, 62%, 100%): dawn #8FA6E0 / #F2B8CF / #FFE0B5, day #6DB6F0 / #B4DDF7 / #FFF0D4, golden #7FA6E6 / #F6C79A / #FFD47A, dusk #33346F / #7A4A8C / #FF9E6B, night #0F1438 / #252A66 / #54478C; cloud tints #FFE3E0, #FFFFFF, #FFE8C4, #E7A9C2, #8F94D0; hero text colour ink for dawn, day, golden and cream for dusk and night. Also sun and moon position and intensity, star alpha, ambient light, grass tint. Interpolate in OKLab.
2. MODES: journey (scroll maps to day -> golden -> dusk -> night by the footer; the hero starts bright), live (visitor's local clock with slow drift, cyclic), fixed (any of the five). Persist the choice. Build the SKY DIAL popover in the theme control (modes plus five fixed states) and the Calm toggle.
3. SKYDRIVER: writes the CSS variables (--sky-top, --sky-mid, --sky-horizon, --cloud-tint, --sun-x, --sun-y, --ambient, --star-alpha, --grass-tint, --hero-fg) at most 30 times per second and only when changed; also feeds shader uniforms.
4. LAYER 0: CSS gradient plus server-rendered hill silhouettes from tokens. Beautiful on its own, works with JavaScript off.
5. LAYER 1: parallax sprite clouds. Write scripts/generate-clouds.mjs to create 8 soft alpha-mask cloud sprites at build time (noise-based, WebP or AVIF, each under 25 KB, committed). Render each cloud as a div with background var(--cloud-tint) and mask-image: the sprite, so clouds re-tint for free at dusk. Three depth layers with different speeds, a little blur on the far ones (static blur on composited layers, not animated blur). SVG hills in two or three depths with haze.
6. LAYER 2: WebGL World canvas (ogl), fixed and full-screen, pointer-events none: gradient from uniforms (matching Layer 0), sun and moon discs with bloom, stars with hash-based twinkle (slower than 1Hz), two layers of fbm clouds using a runtime noise texture, silver-lined edges lit from the sun, horizon haze, distant hills. Render the sky pass at about half resolution into an offscreen target and upscale. Frame pacing 30 / 60 / 15 / 0 fps as in the brief. Handle webglcontextlost and restore, ResizeObserver, Strict Mode double mount (destroy on unmount, one context only).
7. EXTRAS: god rays (CSS or shader radial blur) for day and golden hour, birds in V formations crossing every 25-45 seconds (they are decoration only), rare shooting star at night.
8. CLOUD DESCENT: a scrubbed moment between the hero and the next section where a cloud bank sweeps upward past the viewer (sprites plus shader density ramp, about one viewport of scroll, never hijacking the wheel).
9. QUALITY GOVERNOR (src/themes/dream/world/governor.ts): tiers T3 / T2 / T1 / T0, short benchmark on first run, auto-downgrade when frame rate stays under about 40fps for 2 seconds, remember the decision, expose useQuality(). Mapped to the motion levels in the brief.
10. SKYCONTRAST TEST: Playwright script that, for all five sky states and three scroll positions, hides each text element, samples the pixels behind it and computes worst-case contrast; fails the build below 4.5:1 (3:1 for 24px+ text). Add the dusk headline scrim (soft radial gradient behind headlines). Report the results table.
11. PREVIEW: /design-system/dream/sky with a time slider (0 to 1), mode buttons, a tier selector (T0-T3) and a toggle to force each fallback.

ACCEPTANCE: five sky states look beautiful with no WebGL (tier T1) and better with it; forced failures (getContext returns null, context lost, shader compile error) fall back cleanly with no console errors; idle CPU and GPU are low; 60fps in a desktop trace while scrolling; one WebGL context only; lazy chunks within budget (report sizes); SkyContrast passes. STOP and wait for owner approval of the sky states.
```

### D5 — Meadow, wind, flowers and living things

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Build the meadow and everything alive in it.

1. WIND SYSTEM (src/themes/dream/world/wind.ts): one wind value from cursor speed, scroll speed and slow ambient gusts every 6-12s. registerSway(el, { strength, phase, axis }) using GSAP quick setters; maximum 60 registrants; only while visible; clean disposal. The logo from D3 now sways from this system.
2. GRASS: instanced blades inside the single World canvas (about 8,000 on desktop, 2,500 on phones) with vertex-shader bending from wind noise, cursor repulsion, colour gradient from deep base to light tip tinted by --grass-tint. T2/T1 fallback: three SVG strips at different depths with CSS sway and animation-delay offsets. T0: static.
3. FLOWER KIT in src/themes/dream/art/: Poppy, Daisy, Tulip, Sunflower, Dandelion (head plus seed-puff state), CherryBlossomBranch, Clover, Lavender, WildflowerMix. Inline SVG components, each under 6 KB, consistent construction (named parts: stem, leaves, petals, centre), same light direction. Each exposes bloom (seed -> sprout -> bloom timeline), idle sway and a hover reaction. An art registry (art/index.ts) lets a designer's SVG replace any piece.
4. LIFE: Butterflies by day (4-6, Bezier flight paths with wing flap, flee the cursor, land on hovered flowers), bees at noon, falling petals (at most 25), pollen motes (at most 60, depth layered), fireflies at dusk and night (at most 40, slow glow under 1Hz, gentle attraction to the cursor). Which creatures appear follows the sky state.
5. CURSOR: soft glowing orb with a short pollen trail (desktop, full only); mini poppy over interactive elements; petal burst on click; on touch, petals ripple from the tap. Never blocks clicks; native cursor remains available via the Calm toggle.
6. PARTICLES: ONE shared 2D canvas with sprite batching, driven by the same single ticker as everything else. No other animation loops.
7. TIERS: define exactly what each tier T3 to T0 shows (counts, features) and make the governor switch them live without a reload.
8. PREVIEW: /design-system/dream/meadow showing each flower in seed, sprout, bloom, idle and hover states, the wind with a gust slider, the creatures by sky state, and a live frame-rate and tier readout.

ACCEPTANCE: 60fps desktop trace at T3; memory flat after 60 seconds of scrolling; creatures and particles pause off-screen; decorative elements are aria-hidden with pointer-events none (except real links); reduced motion shows static flowers. STOP and wait for owner approval of the meadow and flowers.
```

### D6 — Shell: nav, intro, footer, contact dock, transitions

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Build the Dream shell. Dark and Light shells stay as they are.

- NAV (Dream skin, same markup): floating pill-shaped paper bar with soft coloured shadow and frosted blur (solid fallback), the Dream logo, plain links (Services, Work, About, Contact), the primary button "Estimate my project", the three-way theme switcher, and the Calm toggle. Hide the command-palette hint and the numeric indexes in Dream (the palette still works by keyboard). Bar shrinks slightly on scroll.
- MOBILE MENU: a full-screen cloud sheet that slides down, large Fraunces links, theme preview cards, CTA at the bottom, focus trapped, Escape closes.
- DAWN INTRO: first time Dream is chosen in a session only. Dark indigo with stars, the sun rises, the sky warms to day, the logo blooms and flies to the nav (about 2.2s). Skippable with any key or click, skipped in lite and off. The content is already rendered and painted underneath; the intro must never delay LCP.
- FOOTER (dusk and night): stars, moon, fireflies, and a COTTAGE on a hill whose window glows when availability.enabled is true ("We're open for new projects" / "We're resting. Leave us a note." when false). The big wordmark with the poppy blooming on scroll-in. Link columns on night-paper cards (verify contrast). A soft local-time line using the time zone in site.ts. Calm and sound-on-off placeholders.
- CONTACT DOCK: a small paper-plane button bottom-right that unfolds into WhatsApp, Book a call and Email (hide anything without data). Hidden while the estimator is open.
- BACK TO TOP: a hot-air balloon that appears after two viewports of scroll and floats up.
- TRANSITIONS: the cloud wipe from D1 gets its final art and is also used for page transitions (700ms, skipped in lite and off). Handle focus, scroll restoration and back/forward correctly.

ACCEPTANCE: works at 360, 768, 1280, 1920; keyboard reaches everything; intro never blocks interaction or LCP; the footer passes SkyContrast at night; Dark and Light shells unchanged.
```

### D7 — The Hero (the signature moment)

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Build the Dream hero. It must feel like the first second of a film.

LAYERS (back to front): sky (state-driven, Layer 0 always present) -> sun with bloom and soft god rays -> stars (night) -> far shader clouds -> mid sprite clouds (parallax by pointer and scroll) -> blue-haze hills -> birds and a drifting hot-air balloon with a poppy emblem -> near clouds (large, blurred, fast) -> a poppy-dotted meadow hill in the foreground with the WebGL grass (plus a small cottage with the glowing window when available) -> pollen motes and petals -> content.

CONTENT (shared markup, Dream skin): the same headline "We build the software your business runs on." in Fraunces Soft 600, up to about 8rem. The word "runs" gets a hand-drawn vine underline that grows and ends with a tiny poppy blooming. Below it the shared subhead and the two shared buttons ("Estimate my project" with a poppy bloom icon, "See our work" as a text link with a sprouting underline). Beside or under it, a small cloud-shaped chip showing the availability state. Flair tagline (decorative): "Plant an idea. Watch it bloom."
- Reveal is CSS-only (soft clip-path and translate keyframes, no opacity-0 initial state, no JavaScript dependency) so the headline is the LCP element and paints immediately.
- A scrim behind the headline guarantees contrast in every sky state (SkyContrast must pass, including dusk).
- Floating "cloud cards" (decorative, aria-hidden) carry abstract sketches: an app screen, a chat bubble, a plant growing from a chart (no numbers, no claims). They tilt gently with the pointer.
- Wind from the pointer moves grass, flowers and clouds. Journey mode: the hero starts bright (day) and warms as you scroll.
- On scroll the CLOUD DESCENT plays into the next section.
- Mobile: simplified composition (fewer layers, no cloud cards), same quality of art.

ROBUSTNESS (from the earlier hero bug): Layer 0 and Layer 1 must look great alone; the WebGL layer fades in only after the first good frame; forced-failure tests prove the fallback; works with JavaScript off.

ACCEPTANCE: LCP under 2.5s and CLS under 0.05 on mobile in Dream; no horizontal scroll at 360; SkyContrast passes in all states; screenshots of all five sky states at 360 and 1440, in tiers T3, T1 and T0. STOP and wait for owner approval of the hero before continuing.
```

### D8 — Home sections A: Garden, Path, Postcards, Golden hour

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Build the Dream scenes for these sections. The content skeleton (headings, text, links) is the existing shared markup; you add the skin and the decorative scenes in slots. All copy follows the content rules (real copy, no placeholders, hide-when-missing).

1. THE GARDEN (services): a meadow strip with the six service flowers (Web = daisy, Mobile = tulip, E-commerce = sunflower, AI and automation = dandelion, UI/UX = cherry blossom, Maintenance = clover). Each service card is a paper card; its flower grows from seed to bloom when scrolled into view, sways in the wind, and on hover or tap invites a bee or butterfly and blooms wider. The whole card is the link (large tap target, visible focus).
2. THE PATH (process): a pinned, scrubbed scene (at most 250vh, never hijacking the wheel). A winding path through the meadow with five stations: Seed (Discover), Sprout (Design), Grow (Build), Bloom (Launch), Flourish (Support). A firefly or butterfly guides the eye along the path; a plant grows with scroll; the sky moves from morning toward afternoon. Each station is a wooden signpost with a paper note holding the shared step text, plus ONE new line "What you'll need to do" (real, generic, no promises, added to the shared content so all themes can use it). Mobile or lite: vertical stack with soft reveals, no pinning.
3. POSTCARDS (work): case studies as postcards pinned to a washing line between two trees that sways with the wind and the cursor. Hover or focus straightens and lifts a card; filtering lets the wind blow away non-matching cards (GSAP Flip). Drag-scroll on mobile. With no published case studies the section is hidden (content rules).
4. GOLDEN HOUR (proof): warm light, long soft shadows; testimonials as letters carried in by paper planes, stats as growth rings or simple signs with rolling numbers. Hidden entirely unless real data exists.

Every scene: aria-hidden decoration, pauses off-screen, has T0 to T3 versions, and the page keeps a path to the estimator at least every two screens.

ACCEPTANCE: no layout shift when scenes mount; every flower and card is reachable by keyboard; tiers T1 and T0 still look finished; SkyContrast passes for headings; screenshots at 360 and 1440 in each sky state the scene can appear in.
```

### D9 — Home sections B: Seed shed, Stepping stones, Dandelion FAQ, Wish CTA

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Build the remaining Dream scenes.

5. THE SEED SHED (stack): a wooden wall with a pegboard; each technology the company really uses (from the content input, never invented) is a seed packet with its own simple illustration. Hover, focus or tap flips a packet to show one sentence in plain English about what it does FOR THE CLIENT (for example, what the tool makes faster or more reliable). Write accurate, generic descriptions in src/content/stack.ts (shared across themes). Hide the section if no technologies are provided.
6. STEPPING STONES (principles): three or four mossy stones across a stream, each a paper card with a tiny living animation: "Talk to the people who build it" (two speech clouds trading words), "Fixed scope, no surprises" (a checklist whose ticks each bloom a tiny flower), "We stay after launch" (gentle rain keeping a plant green, a small rainbow). Only claims the owner has approved; otherwise use neutral, true statements about how the team works.
7. DANDELION FAQ: each question is a dandelion head. Activating one (button semantics, accordion pattern) lets seeds drift away and unrolls a cloud scroll with the answer. Include a first question "I'm not technical. Can I still work with you?" with an honest answer. FAQPage JSON-LD stays. Reduced motion: plain expand and collapse.
8. MAKE A WISH (final CTA): a giant dandelion. Tap, drag or hold to blow it and the seeds fly across the screen (small particle burst, shared canvas). The real "Estimate my project" button, Book a call and WhatsApp are always visible beside it; the seeds are a delight, never a gate. Headline stays the shared "Got an idea? Let's build it." and the sky is dusk with first stars.

ACCEPTANCE: every interactive piece has a normal button, keyboard and screen-reader path; nothing hover-only; scenes pause off-screen; the glossary tooltips work with real definitions; SkyContrast passes at dusk and night; screenshots at 360 and 1440.
```

### D10 — The estimator becomes a garden builder

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Re-skin and re-choreograph the Estimator for Dream. DO NOT change its logic, estimator-config.ts values, Zod schema, /api/lead, emails, rate limiting, Turnstile or analytics events. Presentation only.

- PLAIN LANGUAGE: add a hint field to every option in estimator-config.ts (a one-line plain-English explanation, for example what "a web app" means). Shared across themes; emphasised in Dream.
- LEFT: one question per screen in Fraunces, options as SeedOption cards with illustrated icons and the hint underneath, big tap targets, "Not sure? That's fine." always available. Next and Back always visible; Esc closes.
- RIGHT (or a bottom sheet on mobile): a living GARDEN PLOT that grows as the visitor answers. Project type plants the main flower (Website and Web app = daisy, Mobile = tulip, E-commerce = sunflower, AI = dandelion, Something else = wildflower mix), what you need adds companions (design = butterflies, development = a trellis, integrations = bees moving between flowers, hosting = a little greenhouse, maintenance = a watering can, not sure = a gentle question-mark cloud), timeline sets the sky (ASAP = bright sunrise and a breeze, 1-3 months = morning, 3-6 months = afternoon, just exploring = lazy clouds), budget changes the plot (small pot, window box, garden bed, meadow; never numbers). A polite live region announces the garden in words for screen readers.
- RESULT: "Your garden is ready". If showEstimate is true, the range and timeline roll in with soft rolling digits; otherwise the honest message about the estimate arriving by email. Buttons: Book a 15-min call, Chat on WhatsApp (only with data), confirmation that details were emailed. A small celebration of petals (shared canvas, none in lite and off).
- All steps work without the garden (T0, Calm, JavaScript disabled for the form fallback if it existed before).

ACCEPTANCE: the existing end-to-end test passes untouched; keyboard-only completion under 60 seconds; looks right at 360; analytics events unchanged apart from the added theme property (show the event log); reduced motion gives instant, calm transitions.
```

### D11 — Inner pages

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Build the Dream treatment of the inner pages (same content, new skin and scenes), following the page spec.

- /services: meadow of six flowers with a sticky signpost index and a plain "Not sure what you need?" band opening the estimator.
- /services/[slug]: that service's flower large in the hero, "how it grows" path with the steps for that service, technologies as seed packets (only real ones), dandelion FAQ, related postcards, final wish CTA. Keep metadata and Service JSON-LD.
- /work: postcards on the line, wind-driven filtering; with no case studies show the calm empty state with one real sentence and a CTA. /work/[slug]: story chapters with gentle parallax, results as growth (rolling numbers on paper signs), next project as a balloon drifting in.
- /about: story as a picture book of illustrated scenes, values as "seeds we plant" (real values only), team as polaroids in the garden (only real people and photos), working principles, CTA.
- /contact: "Send us a letter": a paper form built from real accessible inputs; on submit the letter folds into an envelope and a paper plane flies away; success "Your letter is on its way." Same /api/lead endpoint.
- 404: a lost balloon drifting in the clouds; button "Float back home".
- /privacy and /terms: calm; soft background, no motion.

ACCEPTANCE: every route builds, has unique metadata, passes axe and SkyContrast in Dream; Dark and Light unchanged; empty states look intentional; keyboard and reduced-motion paths work.
```

### D12 — Polish, performance and accessibility

```
Read PROJECT_BRIEF.md. Produce an implementation plan first. Quality pass. No new sections.

1. CONSISTENCY: one set of Dream easings, durations and sway amplitudes (src/themes/dream/motion.ts). Remove one-off animations, any mechanical motion that leaked in from Dark, and anything decorative that adds no meaning.
2. TIERS: verify T3, T2, T1 and T0 on every page with real emulation (CPU 4x and 6x throttling, Save-Data, reduced motion, small screens). The governor must step down and recover without a reload and without visual pops. Show screenshots of all tiers for the home page.
3. PERFORMANCE: profile with the browser tools. Long tasks over 50ms during scroll, WebGL context count (exactly 1), shared ticker (exactly 1 animation loop), memory growth after 60 seconds of scrolling, battery-friendly idle (15fps then pause). Lighthouse mobile for /, /services, /work, /start in Dream; targets Performance >= 85, others >= 95, LCP < 2.5s, CLS < 0.05, INP < 200ms; report Dark and Light too (must be unchanged). Report bundle sizes per route and per Dream chunk.
4. ACCESSIBILITY: axe on every route in Dream; full keyboard walkthrough; Calm toggle truly stops all non-essential motion; forced-colors fallback; focus ring visible on every sky state; screen-reader walkthrough of the hero, estimator, dandelion FAQ and wish CTA; vestibular check (no large zooms, no rapid camera moves); photosensitivity check (nothing above 3Hz).
5. ROBUSTNESS: forced-failure matrix (no WebGL, context lost, shader error, texture 404, font failure, JavaScript disabled, Save-Data) with a Playwright test each; every case must leave a finished-looking page and no console errors.
6. VISUAL REGRESSION: Playwright baselines for every route in all three themes at 360, 768 and 1440 with motion off; Dark and Light must match their pre-Dream baselines.

ACCEPTANCE: report with all of the above, zero critical axe violations, SkyContrast green, forced-failure matrix green, and a short screen recording of the main flows in Dream at desktop and mobile.
```

### D13 — Full QA across the theme matrix, and release

```
Read PROJECT_BRIEF.md. Act as QA and release engineer. Apply the full audit method used earlier (production build, real browser, root-cause fixes, AUDIT_REPORT.md with severities P0 to P3, before/after screenshots) to the whole THEME MATRIX.

1. Crawl every route in all three themes, at 360, 768, 1280 and 1920, in motion levels full, lite and off, and in the five Dream sky states. Capture console errors and warnings, failed requests, hydration warnings and the visible text.
2. Run the content guardrail (no placeholder, lorem, TODO, TBD, undefined, NaN, bracketed tokens, "#" links) against every theme, including Flair strings in all three variants.
3. Check each theme against ITS OWN rules in PROJECT_BRIEF.md: Dark and Light (radii, no pills, mono type, mechanical motion, red usage); Dream (paper surfaces for body text, poppy usage, fonts, shapes, no tech metaphors, text on sky only as scrimmed headlines).
4. Theme switching: every pair of themes, from every page, mid-scroll, mid-estimator (answers preserved), with the cloud wipe, with back/forward, with ?theme= links, in two tabs.
5. Functional: lead flow end to end from the Dream estimator and the Dream contact form (database row and both emails, with the theme recorded), palette actions, mobile menu, contact dock, 404.
6. SEO: crawlers without cookies see the default theme; canonical URLs unchanged; sitemap unchanged; OG images unchanged (default theme); no duplicated visible text from Flair beyond the allowed short strings.
7. Update PLACEHOLDERS.md and the README (themes, Flair rule, ThemedSlot, tiers, sky modes, how to replace art, how to add a theme).
8. Open a pull request from theme/dream with before/after screenshots and the Lighthouse tables. Do not merge.

ACCEPTANCE: green build and checks, zero P0 or P1 remaining, Dark and Light visually unchanged, AUDIT_REPORT.md section "Dream theme" complete.
```

### D14 — Optional stretch goals (pick any, one at a time)

```
Read PROJECT_BRIEF.md. Implement ONE of the following per run, as an opt-in enhancement that respects every tier, the Calm switch and the budgets. Plan first.

A. SEASONS: spring (cherry blossom drift), summer (fireflies and sunflowers), autumn (falling leaves), winter (snowfall and frost on the grass). Auto by date, overridable in the sky dial. Particles only through the shared canvas.
B. AMBIENT SOUND: off by default, never autoplays, a speaker toggle in the footer. Procedural wind from the Web Audio API (filtered noise) plus optional bird loops ONLY if the owner supplies licensed files. Fades in and out, remembers the choice, respects Calm for volume of detail.
C. POND: a small pond with lily pads and ripples on click (water ripple shader in the existing World pass or a 2D canvas), placed in the Stepping stones scene.
D. SHARE LINK: a /dream route returning 200 with a Dream-styled OG image, canonical to /, which sets the theme and continues to the home page. For ads and emails aimed at non-technical audiences. Track visits with the theme_change source "url".
E. EASTER EGGS: click the sun to make it set, tap the cottage window to see a cat, type "sudo hire krat.os" in the palette (a Dream flavour), a hidden four-leaf clover in the Garden. Never block content, never required.

ACCEPTANCE: the chosen goal works in all tiers, adds no more than 30 KB gzipped lazy JS (excluding owner-supplied audio), passes the accessibility checks, and has a Playwright test.
```

---

## 12. Tips

- **Run the checkpoints for real.** Art is subjective: approve the logo, the sky, the meadow and the hero before the agent builds the rest, and send screenshots back with specific feedback ("the clouds are too heavy at dusk").
- **If a state looks muddy,** ask for the SkyContrast results and the tier the governor chose before judging the art.
- **Swap art without rewriting code:** give a designer the flower and creature names in `art/index.ts`; each piece is an SVG with named parts.
- **Share Dream with the right people:** send `/?theme=dream` in outreach to non-technical prospects, and compare conversion by theme in your analytics after a few weeks.
- **Keep Dark and Light healthy:** every prompt above ends with them unchanged. If either changes, ask the agent to revert the shared change and scope it to Dream.

</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-10-09T01:11:33+05:30.

The user has uploaded 1 image(s):
- C:/Users/Huzrihannan/.gemini/antigravity/brain/8c8a445a-508d-4c85-8da3-01a094641f86/.user_uploaded/media_1791488491362_4ce1bcc2.png
You can embed this image in an artifact if you need the USER to review it.
</ADDITIONAL_METADATA>