# Verification — 9 October 2026

## Automated
- Unit suite: 4 passing tests; routing fallback/page preservation, invalid WhatsApp config, encoded Unicode message, required/invalid/oversized enquiry input and Unicode normalization.
- Astro check: 0 errors, warnings or hints across 36 files.
- Static build: 29 HTML pages (27 localized content routes plus root and 404).
- Build audit: 27 language routes, 918 internal links and anchors, matching translation schemas, canonical targets and language-preserving navigation.
- npm audit: 0 vulnerabilities after scoped Sharp patch for Miniflare.
- Cloudflare Wrangler dry run: 82 static assets; configuration accepted; nothing published.

## Browser checks
- Desktop homepage and case-study index visually inspected at 1440px; mobile homepage at 390px.
- All 27 content routes checked at 390px: one H1, loaded logo images, no horizontal document overflow.
- English, Sinhala and Tamil homepages checked at 1440px with no horizontal document overflow.
- Tamil mobile typography visually inspected.
- Mobile menu opens; Escape closes it and restores focus.
- FAQ disclosure opens.
- Solution category filter shows the appropriate two relationship modules.
- Missing required fields produce English and Sinhala errors.
- Valid sample enquiry opens a review with no delivery claim and no unconfigured WhatsApp link.
- Editing preserves the form values.
- Download produces kratos-enquiry.txt containing the reviewed sample text; file verified locally.
- Language switch from English restaurant detail reaches the Tamil restaurant detail.
- No browser console errors observed during the checks.

## Independent review
Reviewer identified unsafe native GET fallback when JavaScript is unavailable. Fixed with initially disabled fieldset, enabled only after handlers attach, and method=dialog to prohibit network submission even if controls are re-enabled without the handler. Generated-output audit checks the fallback contract. No other substantive issue reported.

## Intentional release limitations
- Sinhala/Tamil translations remain drafts for the owner's review.
- Final logo exports, client photos/logos/screenshots and verified client facts are pending.
- Real phone, WhatsApp and email contacts are not supplied.
- Form is a local enquiry-draft workflow until the owner defines delivery integration.
- Production indexing is disabled by default; the live demo has not been altered.

## Business-first revision checks (9 October)
- Revised build/type/unit/link checks all passed. Visual change retains only the angular brand mark and uses text-led business examples.
- All 27 routes checked at 390px with no horizontal overflow or broken images and one H1 each.
- All three homepages checked at 360, 768, 1280, 1440 and 1920px; no horizontal overflow. Desktop header navigation fits in all three languages at 1440px.
- English desktop and mobile, plus Tamil desktop/mobile, visually reviewed.
- Mobile menu opens and Escape closes; FAQ expands; Business visibility filter leaves Reports & insights visible.
- Enquiry required errors, valid local draft review and edit action verified. No browser console errors observed.
- Read-only reviewer found no substantive regressions in the revised content, locale schema, contact fallbacks or form safeguards.
- Current GitHub demo inspected read-only at 9b8ecc4ce57575ec21d62f3270346f2279598dd7; no changes pushed or deployed.

## Software visual revision (10 October)

- Astro check: 39 files, zero errors, warnings or hints. Four unit tests passed.
- Static build: 29 pages. Audit passed for 27 localized routes, 948 local links/anchors and 87 image references with files, alternative text and intrinsic dimensions.
- Browser checks: initial and single-screen cue pins, three screen choices, keyboard activation, enlarged image, Close/Escape and focus return all passed. Mobile viewer fits at 390px.
- All 27 content routes fit at 390px with one H1. All three homepages fit at 360, 768 and 1440px.
- With JavaScript disabled, all three screenshots and explanations remain visible, inactive gallery controls stay hidden and the contact fieldset remains disabled.
- English desktop/mobile and Tamil mobile visually inspected. Website console recorded zero errors and warnings.
- Independent review caught pin initialization inside the selection handler and a misplaced BlueBirds annotation. Both corrected and the affected interactions checked again before completion.
- Captures saved in `output/playwright`: `visual-home-preview.png`, `visual-screen-explorer.png`, `visual-screen-mobile.png` and `visual-tamil-mobile.png`.
- Source projects were used as read-only references. Restaurant captures use an isolated in-memory fixture; BlueBirds captures are existing UI-preview images. See `visual-work-revision-2026-10-10.md` for provenance. Nothing pushed or deployed.
