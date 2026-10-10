# Interactive Step Working Guide

A source-verified digital working guide for all Twelve Steps, available as both a fillable PDF workbook and a responsive browser workbook.

## Current release

**Version 1.0 - approved October 10, 2026**

- 12 complete steps
- 86 major sections
- 460 reflection questions
- 243-page complete interactive PDF
- 460 live multiline PDF fields with no character limit
- native searchable/selectable PDF text
- responsive browser workbook with local autosave
- response export/import for browser backups
- hide/show response privacy control
- print / Save as PDF support

## GitHub Pages workbook

The main GitHub Pages URL is the working browser edition:

`https://amy2213.github.io/step-working-guide/`

The web workbook was rebuilt after a narrative-fidelity audit against the approved v1.0 PDFs. Steps that had any condensed or omitted narrative use PDF-derived replacement data. Previously transcribed blocks are reused only for steps that passed the source-fidelity audit, with the known source corrections applied before rendering. The earlier browser prototype remains under `archive/browser-prototype/` for development history.

### Browser response storage

Responses are saved to browser `localStorage` on the current device. They are not sent to a server by this project. Use **Export answers** to create a JSON backup and **Import answers** to restore one.

## Repository layout

- `index.html` - active interactive workbook
- `styles.css` - responsive workbook and release-page design
- `app.js` - rendering, autosave, progress, privacy, export/import, step navigation
- `data/step-*.js` - source-verified PDF-derived step data and canonical step fragments
- `data/bootstrap.js` - assembles and validates all 12 active steps at runtime
- `release.html` - v1.0 release information
- `RELEASE_NOTES.md` - release history
- `QA_REPORT.md` - current PDF and browser QA results
- `release/ARTIFACTS.md` - artifact manifest and checksums
- `release/MANIFEST.csv` - release metadata
- `archive/browser-prototype/` - superseded pre-audit browser prototype

## Canonical-source rule

The approved v1.0 PDFs are the canonical release. The browser dataset is generated from those definitive PDFs so that the web edition cannot silently reintroduce condensed narrative from the older JavaScript prototype.

## Planned work

- expanded-answer archival PDF export, where long responses are re-typeset into flowing pages
- optional Step Four inventory companion workbook

## Disclaimer

This is an independent digital workbook project. It is not affiliated with or endorsed by Narcotics Anonymous World Services, Inc.
