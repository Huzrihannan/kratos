# KratOS website implementation design

Implements the locked root design spec, with the user's subsequent directions: orange/black/white brand, supplied SocialMedia.jpg reference, geometric hero artwork instead of photography, and one uninterrupted plan/design/build pass followed by corrections.

## Architecture
Astro static output, TypeScript, scoped components and shared CSS tokens. Deploy dist to Cloudflare Workers Static Assets. No CMS, account system, database or SSR is required. Locale-prefixed routes en/si/ta share one content schema and page components. Root redirects to English. Case studies have stable restaurant and poultry slugs.

## Design
Warm paper backgrounds, near-black type, orange brand highlight with darker accessible orange for controls. Manrope for English, Noto Sans Sinhala/Tamil for the corresponding language. Header uses the supplied raster logo in a CSS viewport until vector assets arrive. The hero combines large left-aligned type with an original angular SVG inspired by the brand mark. Project illustrations describe workflows and are explicitly labeled illustrations, never presented as real software or evidence. No fabricated client names, performance numbers, testimonials or team members.

## Pages
Home: hero, business categories, familiar problems, flexible modules, project previews, six-step process, support, FAQs and CTA.
Solutions: selectable module overview and industry use cases.
Case studies: two sector previews and detail pages with editorial placeholders for client-approved facts and screenshots.
How we work: discovery through support, six steps and FAQs.
About: working principles, local focus and delivery approach without invented biography.
Contact: contact channels driven by site config; quotation form validates and creates a local enquiry draft, copy/download controls, and WhatsApp handoff when configured. Clearly states no submission has occurred. No visitor data sent or persisted in this draft mode.
Privacy: truthful explanation of draft-form handling and self-hosted assets.
404: useful navigation.

## Release constraints
Translations are complete draft copy pending human review. Contact numbers/emails and client proof are not supplied and must not be invented. Preview pages carry noindex unless PUBLIC_SITE_APPROVED=true. Production deploy additionally requires configured contact details and editorial readiness. Keep the current demo untouched.

## Verification
Unit tests cover locale-preserving links, unknown routes, localized validation, malformed/oversized enquiry input, and WhatsApp URL encoding/configuration. Build/type check and generated route/link audit. Browser checks at desktop/mobile for navigation, language preservation, FAQ, module filters, enquiry preview/download, horizontal overflow, keyboard focus and reduced motion.
