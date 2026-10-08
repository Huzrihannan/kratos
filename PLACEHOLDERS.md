# Krat.OS — Owner Inputs & Needs-Input Tracker

> **INTERNAL USE ONLY — NEVER RENDERED TO VISITORS**  
> This file catalogs all facts that only the company owner can supply.  
> In accordance with the binding **CONTENT RULE**, features depending on missing facts are **HIDDEN**, not faked with placeholder data or invented numbers.

---

| Item | File | Dependent Feature Hidden / Adjusted | Exact Information Required from Owner | Current Status |
|---|---|---|---|---|
| **Client Logos / "Trusted by" Strip** | `src/content/site.ts` / `src/components/sections/Hero.tsx` | Hero Trust Strip scrolling tape is **HIDDEN** | 4–8 verified client company names or SVG logos with explicit permission to feature on marketing site. | `needs-input` |
| **Audited Performance Metrics & Testimonials** | `src/content/proof.ts` | Home page Signal / Proof section (`Proof.tsx`) is **HIDDEN** (replaced with honest engineering principles band) | Actual production uptime stats, average delivery timeframes, genuine client feedback quotes, client full names, job titles, and company names. | `needs-input` |
| **Published Case Studies** | `src/content/work.ts` | Home page Work section is **HIDDEN**; Nav "Work" link is **HIDDEN**; Footer "Case Studies" link is **HIDDEN**; `/work/[slug]` routes not generated; `/work` displays calm empty state with CTA to Estimator. | At least one fully approved case study with verified problem, solution, architecture diagram, metrics, and client consent. | `needs-input` |
| **Team Profiles & Avatars** | `src/content/about.ts` | `/about` Contributors / Core Maintainers grid is **HIDDEN** (page displays story, invariants, git log, and operating principles only) | Real founder/engineer names, roles, bios, and verified avatar image assets or GitHub handles. | `needs-input` |
| **Approved Estimator Price Bands** | `src/content/estimator-config.ts` | On-screen dollar estimate in estimator results modal is **SUPPRESSED** (`showEstimate: false`); lead capture form submits inquiry and displays confirmation that quote will be delivered by email. | Approved minimum and maximum price bands per architecture tier and approved multiplier coefficients. | `needs-input` |
| **WhatsApp Business Number** | `src/content/site.ts` | "Chat on WhatsApp" quick channels in Contact and CTAs are **HIDDEN** if phone number is blank or unconfigured. | Verified company WhatsApp number in international E.164 format (e.g., `+1...`). | `needs-input` |
| **Discovery Call Booking Link** | `src/content/site.ts` | "Book a 15-min call" scheduling buttons are **HIDDEN** if URL is blank. | Verified Cal.com or Calendly scheduling link (e.g., `https://cal.com/krat-os/discovery`). | `needs-input` |
| **Primary Location / Timezone** | `src/content/site.ts` | HUD clock and footer status bar displays city code. | Confirmation of corporate headquarters / primary operating timezone (currently default: `Asia/Colombo`). | `needs-input` |
| **Legal Counsel Review** | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Plain-language draft policies are live without placeholder disclaimers. | Formal review and sign-off by accredited corporate legal counsel prior to enterprise customer onboarding. | `needs-input` |

---

## How to Publish Features
When owner inputs are provided:
1. Update the corresponding content file in `src/content/`.
2. Change the item's status from `"needs-input"` to `"published"`.
3. The application uses `isPublishable(item)` helpers; once an item is marked `"published"`, its UI section, nav links, and dynamic routes will automatically appear across the site.
