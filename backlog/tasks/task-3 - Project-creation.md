---
id: TASK-3
title: Project creation
status: In Progress
assignee: []
created_date: '2026-08-09 21:50'
updated_date: '2026-08-09 22:20'
labels:
  - Sprint1
milestone: m-0
dependencies: []
type: feature
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a new folder "frontend" and create a new typescript react shadcn project with a landing page for "until" project using a copy of the image logo taken from github project docs folder. Use the icon for website using the icon file smaller and create all the versions of the same image icon for using with pwa save on home screen feature (not implemented now).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A `frontend` workspace exists as a Vite TypeScript React project and can be installed and run using the repository-approved npm workflow.
- [x] #2 The landing page renders the copied until logo and a concise abstract section describing the product.
- [x] #3 The landing page renders three clearly distinguishable static mockup views: an existing-deadlines list, a new-deadline creation view, and an existing-deadline detail view.
- [x] #4 The detail mockup visibly includes a deadline name, start date, end date, progress, and remaining value.
- [x] #5 The copied website icon and standard manifest icon assets are present at 192x192 and 512x512, derived from `docs/img/icon.png`; no service worker, install prompt, offline behavior, or functional PWA is required.
- [x] #6 The landing page is usable as a static responsive page on desktop and mobile viewport widths, with meaningful image alternative text and a logical heading structure.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 All task-scoped frontend, asset, and styling changes are contained within the new `frontend` workspace; no backend or unrelated repository files are modified.
- [x] #2 The implementation uses the Vite TypeScript React direction and the project-approved npm scripts and dependency lockfile are consistent.
- [x] #3 Automated validation passes for the affected workspace: `npm ci`, lint, typecheck, tests, and production build.
- [x] #4 The copied logo/icon assets and generated 192x192 and 512x512 icon files are checked for correct paths, dimensions, and browser-loadable formats.
- [x] #5 The static landing page and mockup content are reviewed at desktop and mobile viewport widths, including basic keyboard and text alternative checks.
- [ ] #6 The task remains in `To Do` with all preparation checklist items unchecked; no implementation approval or implementation work is recorded.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create the `frontend` Vite TypeScript React workspace using npm and configure the shadcn-compatible frontend conventions without introducing backend dependencies.
2. Copy `docs/img/logo.png` and `docs/img/icon.png` into frontend-owned public/static asset locations; create the 192x192 and 512x512 icon variants and wire the website icon references without adding PWA runtime behavior.
3. Build the static until landing page with semantic structure, logo, concise abstract, responsive layout, and three non-functional deadline mockup panels.
4. Populate the mockups with representative static content, ensuring the detail view exposes name, start, end, progress, and remaining values and the creation view/list view are visibly distinguishable.
5. Add or configure frontend tests and quality scripts needed to validate rendering and the static asset/page contract.
6. Run the affected-workspace npm install, lint, typecheck, test, and production build checks; inspect the page and assets at desktop and mobile viewport widths.
7. Record validation evidence and any deviations for Human review; leave the task in `To Do` with all acceptance criteria and Definition of Done items unchecked.

Risks: exact branding copy is unspecified, so keep copy concise and local; generated icon output must retain the source icon’s visual identity; avoid accidentally adding a manifest, service worker, API calls, or interactive deadline behavior outside this task.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implementation evidence: created frontend Vite React TypeScript workspace with npm lockfile and scripts for lint, typecheck, test, and build. Added static responsive landing page with semantic hero, abstract, list/create/detail deadline mockups, and required detail values. Copied docs/img/logo.png and docs/img/icon.png to frontend/public/assets; generated browser-loadable PNG icons at 192x192 and 512x512. Asset validation: icon.png 1254x1254, icon-192.png 192x192, icon-512.png 512x512, logo.png 1536x1024. Browser review: desktop DOM contained all approved sections and values; 390x844 mobile viewport rendered all images complete with scrollWidth 375 (no horizontal overflow); keyboard Tab moved from See the preview to Explore until. Quality gate: npm ci dependency install completed with a Windows cleanup warning for a locked generated node_modules binary; after clean npm install, npm run lint passed, npm run typecheck passed, npm test passed (1 file, 2 tests), npm run build passed. No backend, API, manifest, service worker, install prompt, offline behavior, or functional deadline behavior added.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: Analyst
created: 2026-08-09 21:54
---
Analysis exchange 1 (Analyst)

Repository findings:
- The task is `To Do`; title and Human-authored description are unchanged.
- `docs/img/logo.png` and `docs/img/icon.png` exist and are the apparent source assets.
- The project requires a TypeScript HTML5 React SPA/PWA using shadcn, with automated lint, typecheck, test, and build checks.
- No frontend workspace, package manager, scaffold, landing-page copy, browser support matrix, or PWA icon-size policy is currently documented.

Questions for Human:
1. Should the frontend use Vite with npm, or another explicitly preferred React/TypeScript scaffold and package manager?
2. What must the landing page visibly contain beyond the `until` identity/logo (for example, a heading/tagline and a weather-product placeholder), and should copy be hard-coded in this task?
3. Should the implementation copy `docs/img/logo.png` as the full logo and `docs/img/icon.png` as the small icon, preserving source formats, and generate the standard PWA manifest icons at 192x192 and 512x512 plus maskable variants? If a different icon set or sizes are required, please specify them.
4. Should this task include only the frontend scaffold and static landing page, with no backend, weather API, service worker/offline behavior, or install prompt beyond static PWA metadata/icons?

Current assumptions pending answers:
- Use the existing repository PNG assets without redesigning them.
- Keep the page static and responsive; no weather behavior or backend integration is implied by the description.
- Do not select Quarkus versus Spring Boot because this task does not require backend implementation.

Remaining decision: answers to the four questions above are needed before measurable acceptance criteria and an implementation plan can be finalized.
---

author: Analyst
created: 2026-08-09 22:00
---
Analysis exchange 2 (Human answers and Analyst resolution)

Human answers:
- Use Vite for the frontend scaffold.
- The landing page must show the until logo, an abstract, and static visual mockups representing: the existing-deadlines list; creation of a new deadline; and detail for an existing deadline with name, start, end, progress, and remaining.
- Copy the repository image assets and provide standard PWA manifest icon sizes at 192x192 and 512x512.
- This increment is a static landing page only: no backend, weather/API behavior, service worker, offline behavior, install prompt, or functional PWA is included.

Decisions and assumptions:
- Use npm because the project technology document defines npm-based quality-gate commands (`npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`).
- Use the existing `docs/img/logo.png` for the full logo and `docs/img/icon.png` for the website icon and generated 192x192/512x512 icon assets; preserve the source imagery rather than redesigning it.
- The three deadline views are non-functional, representative static mockups rendered by the frontend; no deadline data model or interaction is introduced.
- The abstract copy may be concise implementation copy describing until as a deadline/progress-tracking product; exact marketing copy is not separately supplied.
- No backend framework decision or ADR is required for this frontend-only increment.

Remaining assumptions for Human review:
- The standard icon files are assets only; adding a manifest, service worker, install prompt, or offline behavior would expand the explicitly excluded scope.
- Supported-browser performance thresholds and exact visual branding copy are not specified; validation will cover responsive layout, accessibility basics, and the repository quality gate.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Implemented TASK-3 on the dedicated task-3-project-creation branch. Added a Vite TypeScript React frontend workspace with npm lockfile, quality scripts, copied until logo/icon assets, 192px and 512px PNG icon variants, and a responsive static landing page. The page includes the abstract, deadline list/create/detail mockups, and detail values for name, dates, progress, and remaining time. Verified with asset dimension/format inspection, desktop DOM review, 390px mobile review without horizontal overflow, keyboard focus review, npm ci/install, lint, typecheck, 2 passing tests, and production build. No backend, API, manifest, service worker, install prompt, offline behavior, or functional deadline interactions were added. DoD item #6 remains unchecked because it conflicts with the approved implementation workflow and current In Progress status.
<!-- SECTION:FINAL_SUMMARY:END -->
