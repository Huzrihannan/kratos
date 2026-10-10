# KratOS website

Responsive Astro website for KratOS Software Solutions. English, Sinhala and Tamil share the same layouts and complete draft content. The user-provided design specification remains the design authority, with the later orange brand reference and geometric hero direction incorporated.

## Run locally

Use Node.js 22.12+ (tested with Node 24.13) and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321/en/. Other languages use `/si/` and `/ta/`. The root opens English.

```sh
npm test
npm run check
npm run build
npm run audit:build
npm run preview
```

## Included

- Homepage, Solutions, Case Studies, How We Work, About and Contact.
- Restaurant and BlueBirds retail/wholesale detail pages with real application screenshots using demonstration data.
- Privacy page, 404, canonical URLs, alternate language links, sitemap and robots endpoint.
- Responsive menu with Escape handling, language switching that preserves the page, module filters, accessible FAQ disclosures, sticky mobile contact action.
- Local enquiry validation, review, edit, copy and UTF-8 text download; WhatsApp handoff once a real number is configured.
- Self-hosted Manrope, Noto Sans Sinhala and Noto Sans Tamil; reduced-motion support.
- Single angular brand mark, screenshot annotations, accessible screen selector and enlarged image viewer.

## Business configuration

Copy `.env.example` to `.env` and supply real public business contact values. Never put secrets in variables prefixed `PUBLIC_`.

| Variable | Value |
| --- | --- |
| `PUBLIC_WHATSAPP_NUMBER` | Full international number, e.g. country code followed by the business number; no leading domestic zero |
| `PUBLIC_PHONE` | Public phone contact |
| `PUBLIC_EMAIL` | Public email address |
| `PUBLIC_SITE_APPROVED` | Keep `false` for previews; set `true` only after editorial and translation review |

Build-time values require a rebuild. With no WhatsApp number, WhatsApp-labelled CTAs intentionally lead to Contact, whose unavailable details are explicit. No fake number, email or destination is present.

## Form delivery status

The current form is deliberately **draft only**. It sends no network submission and stores no enquiry in localStorage or a database. Controls start disabled and activate after the local script attaches. The HTML form uses `method="dialog"` as an additional no-network fallback.

Copy and download are local user actions. If configured, the WhatsApp button opens a message for the visitor to review and send themselves. It does not claim delivery. Reloading loses the draft. The actual quotation workflow is pending the owner's proposal; adding a Worker/webhook/email service is a separate integration, with corresponding server validation, abuse controls and updated privacy copy.

## Content and assets to review

- `src/content/en.ts`: English source copy.
- `src/content/si.ts`, `src/content/ta.ts`: fully populated translation drafts requiring the owner's manual language review.
- `src/styles/global.css`: shared palette, typography, spacing and responsive rules.
- `src/styles/visual-work.css`: screenshot presentation, service cues and connected process stages.
- `src/components/Artwork.astro`: retained angular KratOS mark.
- `src/components/ScreenExplorer.astro`: software screen selection, annotations and enlargement.
- `src/components/Logo.astro`: displays the supplied reference JPEG unchanged through a CSS viewport. Replace with the final tightly framed SVG, then remove the raster viewport CSS.
- `public/images/brand-reference.jpg`: unchanged copy of the supplied SocialMedia.jpg. Also used temporarily for social sharing.

Still needed before production: final primary/square logos, client-approved case-study photos and logos, approved client names/results, verified contact details, reviewed translations and final form delivery workflow. Screens from the supplied software projects are now included with demonstration-data labels. They show interface functionality and do not claim client deployment or business results. No invented testimonials or team profiles have been added.

Suggested assets: primary logo SVG; square SVG/512px PNG; project covers 2000×1500; client logos SVG or ≥800px transparent PNG; screenshots at native resolution (ideally ≥1920px wide); social image 1200×630. No hero photo is needed.

## Cloudflare hosting

`wrangler.jsonc` serves `dist` using Workers Static Assets. A server-rendering adapter is unnecessary for these generated pages. No deployment or DNS changes have been made to the existing demo.

For a reviewed release, set the public build variables in Cloudflare Workers Builds and connect the source repository. Build command: `npm run build`; deploy command: `npx wrangler deploy`. Alternatively run `npm run deploy` from an authenticated local environment. Use a preview hostname until the owner approves replacing the demo. Connect `kratos.website` as the custom domain when ready.

`npx wrangler deploy --dry-run` verifies the local deployment configuration without publishing. The build defaults to noindex/disallow while under review. `_headers` provides basic browser security headers.

## Dependency notes

TypeScript is held to major 6 because the installed Astro checker does not yet support TypeScript 7. A scoped override lifts Miniflare's pinned `sharp` from 0.35.4 to its patched 0.35.5 release. Recheck whether this override is still needed when updating Wrangler.

## Design records

- `docs/superpowers/specs/2026-10-08-site-design.md`
- `docs/superpowers/plans/2026-10-08-site.md`

The workspace began as a separate Astro rebuild. It is now connected to `Huzrihannan/kratos` on the `kratos-visual-rebuild` branch, based on the existing default branch `master`. Publishing this branch does not replace the demo or change the default branch.

## Latest design revision

The 10 October revision pairs the opening message with the restaurant dashboard, adds a guided selector for restaurant orders, BlueBirds sales and reports, uses actual screens on project cards, and explains the process in three connected phases. See [visual revision and screenshot provenance](docs/visual-work-revision-2026-10-10.md) and [verification](docs/verification.md). It retains the 9 October business-first direction and single angular brand mark. Existing case-study URLs are retained for future client-approved material. The supplied GitHub repository is the current Next.js demo; this workspace remains the Astro rebuild. No remote deployment or replacement of its backend has taken place.
