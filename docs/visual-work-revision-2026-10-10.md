# Visual explanation through our own software

The visitor should be able to see how KratOS handles a business task without reading every paragraph. Keep the warm paper, black/orange brand and the single angular mark; add meaningful visual evidence from the supplied projects.

## Changes

1. Pair the opening message with the actual restaurant dashboard.
2. Replace the home page's long service list with three recognizable needs and a screen selector: restaurant checkout, retail/wholesale checkout, and business reports. Each screen has three concise cues explaining what to notice. Visitors can enlarge a screen, with keyboard and Escape support.
3. Give each project a real screenshot and a short feature summary. Detail pages show the corresponding screens and how they support the workflow.
4. Summarize the working process with three connected phases; keep the full six-step explanation on How We Work.
5. Keep all explanatory copy available in English, Sinhala and Tamil; draft translations remain subject to owner review.

The user's one-run implementation instruction remains in effect. This is a revision of existing pages and components, with no deployment or submission workflow changes.

## Screenshot provenance

- Restaurant: source copied read-only from `C:/Side projects/Royal restaurant ERP #1/ERP/renderer/src` into ignored `output/restaurant-capture`. Actual `AdminApp`, `Dashboard` and `CashierApp` components render against an isolated in-memory fixture. Screenshots use demonstration menu items, sales and orders; no production database, printer or customer records are connected. The capture header identifies demonstration data. The design-prototype PNGs are not presented as application screenshots.
- BlueBirds: `C:/Side projects/BBR.ExpensesHarness/BBR.ExpensesHarness.csproj` points to `C:/Side projects/Blue-Birds-cloud`. Existing UI captures from its `artifacts/ui-preview` folder show the actual desktop UI with test records. `pos-864x864.png` and `reports-646x604.png` are copied unchanged. These figures are sample data, not client results.
- Screens in `public/images/work` are source PNGs. Browser screenshot capture does not alter the source projects.

## Verification

Run Astro check, the existing validation tests, build and localized route/asset checks. Check screen switching, keyboard use, enlarge/close/Escape and focus return. Check no-JavaScript visibility, mobile/desktop wrapping in all three languages, missing images, and the existing enquiry workflow. Save a screenshot of the resulting site.

Completed: zero Astro diagnostics, four passing tests, 29 generated pages, 948 audited links/anchors and 87 valid image references. Browser checks passed for all 27 localized routes at 390px, all three homepages at 360/768/1440px, initial and single-screen annotations, screen selection, mobile/desktop viewer controls, Escape/focus return and no-JavaScript fallback. The website console had no errors or warnings. Independent review findings were corrected and rechecked. Detailed results are in `verification.md`.
