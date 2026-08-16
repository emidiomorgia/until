---
id: TASK-12
title: Persist PWA banner dismissal and add toolbar install action
status: Done
assignee: []
created_date: '2026-08-13 15:09'
updated_date: '2026-08-16 20:58'
labels:
  - Sprint1
milestone: m-0
dependencies: []
references:
  - backlog/docs/operating-model.md
  - backlog/docs/project-technology.md
modified_files:
  - frontend/src/App.css
  - frontend/src/AppShell.tsx
  - frontend/src/app.router.test.tsx
  - frontend/src/app.router.tsx
  - frontend/src/components/InstallPrompt.test.tsx
  - frontend/src/components/InstallPrompt.tsx
  - frontend/src/components/pwa-install-context.ts
  - frontend/src/components/pwa-install-provider.test.tsx
  - frontend/src/components/pwa-install-provider.tsx
priority: medium
type: enhancement
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Historical archive for the completed Interactive-mode enhancement requested by the Human.

Original request: show the PWA setup banner only on the exact `/app` route when the app is not running in PWA/standalone mode and the user has not dismissed it; persist dismissal so the banner never returns; add an install icon button to the application toolbar whenever the app is not running standalone, including after banner dismissal.

Scope was limited to the React frontend PWA installation UI, shared browser-install state, focused tests, styling, and verification. Backend, manifest, service worker behavior, unrelated routes, commit, and push were out of scope.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The installation banner appears only on the exact `/app` route when the app is not running standalone and the user has not dismissed it.
- [x] #2 Dismissing the banner persists across remounts and reloads so it is not shown again.
- [x] #3 An accessible toolbar install icon remains visible whenever the app is not running standalone, including after banner dismissal.
- [x] #4 Banner and toolbar installation actions are both hidden in standalone mode.
- [x] #5 The native installation prompt is used when available and accessible manual instructions are shown otherwise.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Centralize standalone detection, `beforeinstallprompt`, `appinstalled`, service-worker registration, and the install action in a shared React provider.
2. Persist banner dismissal in `localStorage` and restrict banner rendering to the exact `/app` route.
3. Add an accessible icon-only install action to the application toolbar, independent from banner dismissal, with manual browser instructions as fallback.
4. Update focused provider, banner, router, standalone, persistence, and toolbar tests plus responsive styling.
5. Run the canonical frontend quality gate, inspect the final diff, and verify desktop and mobile behavior in a real browser.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Chronological execution record

1. Human requested the PWA banner and toolbar-install behavior in Italian and specified Interactive execution mode.
2. Agent inspected `AGENTS.md`, `backlog/docs/operating-model.md`, `backlog/docs/project-technology.md`, branch state, PWA code, toolbar code, styles, and tests. Branch `feature/install-prompt` was already active and the worktree was clean. No interview questions blocked progress.
3. Agent proposed a shared-understanding summary covering exact `/app` routing, persistent banner dismissal, toolbar independence, standalone suppression, native prompt behavior, fallback instructions, scope boundaries, browser limitations, acceptance tests, and Definition of Done evidence.
4. Human approved proceeding on the existing feature branch.
5. Agent proposed the detailed five-step execution plan. Human approved it with `procedi`, then authorized completing subsequent steps without per-step confirmation.
6. Agent added the PWA install context/provider, moved browser event handling into it, persisted banner dismissal, added the toolbar icon and manual fallback instructions, and expanded tests.
7. Focused verification initially found one test-isolation failure because a standalone test did not restore `window.matchMedia`; agent corrected test cleanup. The implementation itself was not implicated.
8. Focused tests then passed: 3 files and 16 tests. Typecheck passed. Lint passed with only existing shadcn Fast Refresh warnings.
9. Agent separated the context/hook from the provider to avoid introducing a new Fast Refresh warning, and added explicit standalone toolbar coverage.
10. Canonical verification passed: `npm ci` installed 445 packages with 0 vulnerabilities; lint exited 0 with two pre-existing shadcn warnings; typecheck exited 0; all 7 test files and 29 tests passed; production build completed successfully.
11. Browser verification through the project-approved browser workflow confirmed the banner on `/app`, persistent dismissal across reload, continued toolbar install visibility after dismissal, correct desktop and 390x844 mobile layout, and no browser console errors. The native installation confirmation was not accepted during testing to avoid installing the app in the user's browser.
12. Final diff inspection found only task-scoped frontend and test files; `git diff --check` exited 0. No commit or push was performed.
13. Human reviewed the final changelog and explicitly confirmed closure with `confermo`.

## Technical decisions

- Browser install state is shared through React context so the banner and toolbar consume one source of truth.
- Dismissal uses the dedicated `until-pwa-install-banner-dismissed` localStorage key and affects only the banner.
- Installation status is inferred from `(display-mode: standalone)`, Apple `navigator.standalone`, media-query changes, and `appinstalled`, because browsers expose no universal API for detecting an installed PWA opened in a normal tab.
- When `beforeinstallprompt` is unavailable, the toolbar opens accessible manual installation guidance.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary

Implemented persistent PWA banner dismissal and an independent toolbar installation action so users can suppress the `/app` banner permanently while retaining an installation entry point whenever the app is not running standalone.

## Modified files

- `frontend/src/App.css`
- `frontend/src/AppShell.tsx`
- `frontend/src/app.router.test.tsx`
- `frontend/src/app.router.tsx`
- `frontend/src/components/InstallPrompt.test.tsx`
- `frontend/src/components/InstallPrompt.tsx`
- `frontend/src/components/pwa-install-context.ts`
- `frontend/src/components/pwa-install-provider.test.tsx`
- `frontend/src/components/pwa-install-provider.tsx`

## Shell commands executed

- `backlog instructions overview`
- `git status --short --branch`
- Repository inspections with `Get-Content`, `rg`, and `rg --files`
- `npm test -- --run src/components/pwa-install-provider.test.tsx src/components/InstallPrompt.test.tsx src/app.router.test.tsx`
- `npm run typecheck`
- `npm run lint`
- `npm ci`
- `npm test`
- `npm run build`
- `npm run dev -- --host 127.0.0.1`
- `git status --short`
- `git diff --stat`
- `git diff --check`

## Verification

- Focused test suite: 16/16 passed after correcting test isolation.
- Full test suite: 7/7 files and 29/29 tests passed.
- TypeScript typecheck: passed.
- Production build: passed.
- Lint: exited 0; only two pre-existing Fast Refresh warnings remain in shadcn `button.tsx` and `sidebar.tsx`.
- Dependency audit from `npm ci`: 0 vulnerabilities.
- Browser desktop: dismissal persisted after reload and toolbar action remained visible.
- Browser mobile at 390x844: toolbar and content layout rendered correctly.
- Browser console: no errors.
- `git diff --check`: passed.

## Decisions and limitations

- Standalone detection uses the browser signals available to web applications; an installed PWA opened as a regular tab cannot be detected universally.
- Native installation was not completed during manual verification to avoid changing the user's browser installation state; invocation behavior is covered by automated tests.
- No backend, manifest, or service-worker behavior was changed.
- No commit or push was requested or performed.
<!-- SECTION:FINAL_SUMMARY:END -->
