# QA Report - Interactive Step Working Guide v1.0

**Audit date:** October 10, 2026

## Functional regression found

The October 10 repository refresh accidentally replaced the interactive GitHub Pages workbook with a static release-information page. The archived prototype still contained the old interactive code, but the deployed root page no longer rendered reflection inputs at all.

That was a real regression. The active site has been rebuilt as an interactive workbook instead of merely documenting the workbook.

## Canonical web-data rebuild

The active browser dataset was rebuilt under the definitive v1.0 PDFs as the authority. Steps with known condensation or omissions use PDF-derived canonical replacement data. Previously transcribed data is reused only for Steps 2, 3, 4, and 7, which passed the narrative-fidelity audit after the known source corrections were applied.

Verified totals:

- 12 steps
- 86 section headings
- 460 reflections
- 938 ordered content blocks

Steps 10, 11, and 12 were additionally compared to the saved source-first canonical audit. Their section sequences, reflection text, and normalized narrative text matched exactly.

## Browser QA

Automated Chromium checks performed on the rebuilt app:

- all 12 step tabs render
- Step One renders 68 reflections and 9 sections
- Step Four renders 84 reflections on a 390px mobile viewport
- Step Twelve renders 26 reflections and 5 sections
- entering an answer updates progress immediately
- answers survive step navigation
- hide/show responses works
- answer export produces the expected JSON payload
- clearing a step removes its saved answers
- importing a response backup restores answers
- mobile layout has no horizontal overflow at 390px
- no JavaScript page errors in desktop or mobile test passes

The storage layer now also has an in-memory fallback if browser localStorage is unavailable, so the workbook remains usable even when persistent storage is blocked.

## Complete PDF structural QA

The approved complete PDF was re-audited separately:

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

This confirms that the master PDF's AcroForm data layer is structurally intact. Viewer-specific behavior can still differ, especially in Apple Files/Preview versus Adobe-compatible viewers, so any remaining device-specific PDF symptom should be documented with the viewer and exact action that fails.

## Result

The reproducible functional defect was the GitHub Pages regression, not missing workbook data. The active web workbook has been rebuilt under the approved PDFs as the canonical authority and subjected to functional desktop/mobile QA before redeployment.
