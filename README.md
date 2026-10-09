# Step Working Guide

Responsive, local-first digital working-guide prototype.

## Current scope

- Step One implemented in the original reading/question sequence
- Native responsive text rather than scanned pages
- Each reflection question is followed immediately by its own writing field
- Autosave to local browser storage
- Hide/show responses
- Step progress indicator
- Print / Save as PDF support
- Hidden source-page metadata retained for QA

## Files

- `index.html` — app shell
- `styles.css` — locked journal-style design system
- `app.js` — rendering, autosave, privacy, progress, print behavior
- `data/step-1.js` — ordered Step One content model

The interface is intentionally organized by content flow rather than PDF page breaks.
