---
id: TASK-8
title: Aggiungere lo scheletro shadcn dell'app su /app
status: In Progress
assignee: []
created_date: '2026-08-10 15:08'
updated_date: '2026-08-10 20:37'
labels: []
milestone: m-0
dependencies: []
priority: high
type: feature
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Introdurre la prima integrazione di shadcn/ui nel frontend Vite. La funzionalità deve predisporre la route /app tramite React Router e visualizzare uno scheletro statico dell'area applicativa basato sul blocco ufficiale sidebar-16, inclusi gli header sticky. Il lavoro comprende la configurazione necessaria di Tailwind CSS e shadcn/ui nel progetto esistente. La landing page attuale deve continuare a essere disponibile e non sono inclusi dati reali, autenticazione, persistenza o flussi applicativi.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The existing `frontend` Vite TypeScript workspace is configured with Tailwind CSS and shadcn/ui using application-owned component files, and the project builds with those styles and components applied.
- [x] #2 React Router renders the existing landing page at `/` and for an unknown client-side path, while `/app` renders the static application-area shell.
- [x] #3 At `/app`, the shell follows the current official shadcn `sidebar-16` structural pattern: a sidebar, the block’s sticky header regions, and static main content are visible; neutral labels are used and the sidebar contains exactly one visible menu action named `List`.
- [x] #4 The `/app` sidebar provides the sidebar-16-style responsive mobile and tablet experience: it can be opened and closed using a visible control, the control is keyboard-operable with an accessible name, and the shell remains usable without horizontal page overflow at 375 px, 768 px, and a desktop viewport.
- [x] #5 All `/app` content and controls are static and non-functional: no API requests, authentication, persistence, real deadline data, working list flow, service worker, or offline behavior is introduced.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Task-scoped changes are limited to the existing `frontend` workspace and its necessary dependency lockfile updates; no backend or unrelated repository changes are introduced.
- [x] #2 Automated frontend tests verify route selection for `/`, `/app`, and an unknown path, plus the `/app` shell’s `List` navigation label and accessible responsive-sidebar control.
- [x] #3 The affected frontend workspace passes `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
- [x] #4 Browser verification records desktop, 768 px tablet, and 375 px mobile views of `/app`, confirming the sticky header regions, responsive sidebar interaction, keyboard operation, and no horizontal overflow.
- [x] #5 The implementation uses only static display content and does not add a backend call, credential, authentication, persistence, deadline workflow, service worker, or offline feature.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect the current Vite frontend dependencies, test setup, styles, and landing-page component so Tailwind CSS, shadcn/ui, and React Router can be introduced without changing landing-page content or adding backend scope.
2. Add the official Vite-compatible Tailwind CSS and shadcn/ui foundation, including the minimal application-owned shadcn components and supporting utilities needed by the current sidebar-16 block pattern.
3. Introduce route handling that renders the existing landing page at `/` and as the unknown-path fallback, and renders a separate static application shell at `/app`.
4. Compose the `/app` shell from the sidebar-16 structural pattern: sidebar, sticky header regions, neutral static main content, and exactly one visible `List` menu action; do not implement navigation destinations, data, authentication, persistence, or workflows.
5. Implement the block-style mobile and tablet sidebar behavior with a visible, labeled, keyboard-operable open/close control; preserve a usable desktop layout.
6. Add or update tests for the three route outcomes and the static shell’s required navigation label and responsive sidebar accessibility contract.
7. Run the required frontend quality gate and inspect `/app` at desktop, 768 px, and 375 px viewports for sticky-header visibility, responsive sidebar operation, keyboard access, and horizontal overflow; record evidence for review.

Risks: shadcn/ui versions and the sidebar-16 block can evolve, so implementation must use the compatible current official Vite setup and retain the specified structural/responsive behavior rather than copying unrelated example content. Router integration must not regress the existing landing page or accidentally turn the static `List` item into a data-driven feature.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implementation evidence (2026-08-10): frontend-only implementation adds the Vite-compatible Tailwind CSS/shadcn foundation, application-owned sidebar primitives, React Router routes, static /app shell, and focused route/accessibility tests. Quality gate passed in frontend: npm ci (445 packages, 0 vulnerabilities), npm run lint (pass; two shadcn Fast Refresh warnings), npm run typecheck (pass), npm test (2 files / 5 tests passed), npm run build (pass). Browser verification on http://localhost:5173/app at 375x800, 768x800, and 1440x900 confirmed List shell visibility, labeled sidebar control, keyboard Enter activation, and document scrollWidth not exceeding viewport width; sticky header regions were visible in the rendered shell. No API, authentication, persistence, deadline workflow, service worker, or offline behavior was added.

Rework evidence (2026-08-10): replaced the sidebar placeholder mark with the application asset /assets/icon.png sourced from docs/img/icon.png, capitalized the sidebar brand to Until, and changed the toolbar title to Until. Focused browser verification at http://localhost:5173/app confirmed header title Until, sidebar image source /assets/icon.png, and no horizontal overflow. npm run lint, npm run typecheck, npm test (2 files / 5 tests), and npm run build all passed; existing non-blocking shadcn Fast Refresh and Vite __dirname warnings remain.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: Analyst
created: 2026-08-10 15:10
---
Analysis exchange 1 (Analyst — questions pending)

Repository findings:
- TASK-8 is `To Do`; its title and Human-authored description remain unchanged.
- The completed TASK-3 established the Vite + npm React frontend and explicitly deferred the shadcn application integration to this iteration.
- The task is frontend-only; no Java backend framework decision, API, authentication, persistence, deadline data, or PWA offline behavior is required.
- The applicable quality gate is `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` in the affected frontend workspace.

Questions for Human:
1. Should the existing landing page remain at `/` and be the fallback for unknown client-side paths, while `/app` alone renders the application shell? Or should unknown paths show a dedicated not-found view?
2. Should this task reproduce the official `sidebar-16` block's visible placeholder navigation/content exactly (with any needed branding substitutions), or may it use product-neutral static labels while retaining its layout, sidebar behavior, and sticky headers?
3. For the responsive sidebar, should it follow the block's mobile off-canvas/toggle interaction, or is a desktop-only static sidebar sufficient for this skeleton?

Remaining assumptions pending answers:
- Install the official shadcn/ui and Tailwind CSS setup compatible with the existing Vite TypeScript frontend, then add only the primitives required by sidebar-16.
- Keep all displayed app content static and non-functional; no data model, service call, authentication, persistence, or new PWA behavior is implied.
- Preserve accessibility and responsive behavior, including keyboard-operable controls if the mobile sidebar is included.
---

author: Analyst
created: 2026-08-10 15:13
---
Cumulative refinement analysis (exchanges 1–2)

Repository findings:
- TASK-8 remains `To Do`; its Human-authored title and description are unchanged.
- TASK-3 established the Vite + npm React frontend and deferred the shadcn application integration to this task.
- This is a frontend-only increment. No Java backend decision, API, real data, authentication, persistence, deadline flows, service worker, or offline behavior is required.
- The applicable frontend quality gate is `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.

Questions and Human answers:
1. Landing-page route and fallback: retain the existing landing page at `/`; use it as the fallback for unknown client-side paths. No dedicated not-found view is in scope.
2. sidebar-16 content: retain the official block's layout, sidebar behavior, and sticky headers, but use neutral menu content. The only menu action for this increment is `List`.
3. Responsive behavior: provide the mobile and tablet UI, including the responsive sidebar interaction rather than a desktop-only static sidebar.

Decisions:
- Configure Tailwind CSS and shadcn/ui for the existing Vite TypeScript frontend, adding only the application-owned shadcn primitives required for this skeleton.
- Configure React Router so `/` and fallback paths retain the landing page, while `/app` renders the static application shell.
- The `/app` shell uses a responsive sidebar consistent with sidebar-16 and sticky header regions; `List` is visible and its controls/navigation are non-functional static UI.
- Validate the responsive shell at mobile (375 px) and tablet (768 px) viewport widths, as well as desktop.

Remaining assumptions for Human review:
- “Based on sidebar-16” means follow its current official structural and responsive pattern, while neutral labels replace its example product content; no pixel-identical reproduction, additional menu items, or working list route is required.
- The current landing-page visual content remains unchanged except for router integration necessary to serve it at `/` and as the fallback.
- No backend framework choice or ADR is required because no backend architecture is introduced.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Applied the requested branding rework to TASK-8: the sidebar now uses the Until icon asset and the toolbar title is Until. Verified with focused browser DOM inspection plus npm run lint, npm run typecheck, npm test, and npm run build. Ready for Human verification.
<!-- SECTION:FINAL_SUMMARY:END -->
