# Interactive Step Working Guide

A source-verified, native-text, fillable Twelve Step Working Guide workbook.

## Approved release

**Version:** 1.0  
**Approved:** October 10, 2026

The approved master workbook contains:

- 12 steps
- 243 PDF pages, including master cover and contents
- 460 live multiline reflection fields
- no field character limits
- native selectable/searchable text
- clickable master contents and step-level navigation
- source-fidelity corrections identified through a page-by-page audit

The GitHub Pages site documents the approved release, its workbook map, QA status, and artifact checksums. Generated binary release files are maintained separately from the source tree.

## Source fidelity

The earlier browser prototype used structured JavaScript data. During the final PDF build, a full audit found that some narrative in that dataset had been shortened or omitted. The final workbook was therefore rebuilt and verified against the original source pages rather than treating the browser dataset as authoritative.

The **approved v1.0 PDF is the canonical release**.

The previous browser prototype is retained under `archive/browser-prototype/` for development history only. It should not be treated as the canonical text source.

## Repository structure

- `index.html` - GitHub Pages release site
- `styles.css` - release-site design system
- `RELEASE_NOTES.md` - v1.0 release notes and QA summary
- `release/ARTIFACTS.md` - artifact names, counts, and SHA-256 checksums
- `release/MANIFEST.csv` - machine-readable release manifest
- `archive/browser-prototype/` - earlier local-first browser prototype

## Privacy

The fillable workbook is designed so responses remain in the PDF file the user saves. The GitHub Pages release site does not collect workbook responses.

## Planned next phase

An **expanded-answer archival export** is planned. It will take completed form responses and rebuild them as flowing native text so long answers can expand naturally across additional pages.

## Disclaimer

Independent digital workbook project. Not affiliated with or endorsed by Narcotics Anonymous World Services, Inc.
