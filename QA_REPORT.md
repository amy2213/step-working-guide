# QA Report - Interactive Step Working Guide v1.0

**Audit date:** October 10, 2026

## Functional regression found

The October 10 repository refresh accidentally replaced the interactive GitHub Pages workbook with a static release-information page. The archived prototype still contained the old interactive code, but the deployed root page no longer rendered reflection inputs at all.

That was a real regression. The root GitHub Pages site has been restored as an interactive workbook, while release information now lives on a separate `release.html` page.

## Canonical web-data rebuild and fidelity audit

The definitive v1.0 PDFs are the authority for the active browser workbook. Steps with known condensation or omissions use PDF-derived replacement data. Previously transcribed data is reused only where it passed a direct fidelity comparison after known source corrections were applied.

Final verified totals:

- 12 steps
- 86 section headings
- 460 reflections
- 934 active browser content blocks

The PDF-derived reference extraction contains 938 blocks. The four-block difference is only paragraph-boundary joining in Steps 2, 4, and 7. It does not remove or rewrite narrative.

Every step was compared against the definitive PDF-derived reference. For **all 12 steps**:

- reflection-question sequence and text match exactly after punctuation normalization
- section-heading sequence and text match exactly
- complete concatenated narrative text matches exactly after whitespace and typographic-punctuation normalization

This final comparison also caught and corrected remaining web-data differences in Steps 1, 5, and 8 before the final deployment.

## Browser QA

The actual GitHub Pages deployment artifact was downloaded after a successful Pages build and tested in headless Chromium.

Verified:

- all 12 step tabs render
- every step has the expected reflection count: 68, 47, 39, 84, 28, 22, 20, 17, 28, 53, 28, 26
- every step has the expected section count: 9, 8, 6, 16, 7, 5, 5, 5, 7, 6, 7, 5
- every visible response field has a unique stable ID
- entering an answer updates progress immediately
- answers survive step-to-step navigation
- hide/show responses works
- answer export produces the expected JSON payload and values
- clearing a step removes its saved answers
- importing a response backup restores answers
- 390px mobile layout renders Step Four with all 84 reflections
- no horizontal overflow at 390px
- no JavaScript page errors in desktop or mobile test passes
- no console errors in desktop or mobile test passes

The storage layer also has an in-memory fallback if browser `localStorage` is unavailable, so the workbook remains usable even when persistent storage is blocked. Persistent autosave requires browser storage to be available, as expected.

## Complete PDF structural QA

The approved complete PDF was independently re-audited:

- 243 pages
- 460 AcroForm fields
- 460 widget annotations
- 460 unique field names
- all 460 fields multiline
- no `/MaxLen` character restrictions
- 0 out-of-bounds widgets
- 98 link annotations, with no link annotation missing a destination/action
- 99 outline/bookmark entries
- 0 blank pages
- 0 page image objects
- PDF preflight opens cleanly and reports no warnings

### Form-value stress test

Every one of the 460 fields was populated with a unique QA value and the result was saved and reopened. All 460 values were present after reopen with zero mismatches. Three representative fields were also given 6,000-character responses.

Representative filled pages were rendered successfully with both PDFium and Poppler. Form-widget highlighting differs by renderer, but field geometry and stored values remained intact.

This confirms that the master PDF's AcroForm data layer is structurally intact. Viewer-specific behavior can still differ, especially in Apple Files/Preview versus Adobe-compatible viewers.

## Result

The reproducible functional defect was the GitHub Pages regression. It has been corrected. The restored browser workbook was then source-compared against the approved PDFs, function-tested on desktop and mobile layouts, and deployed through a successful GitHub Pages build.
