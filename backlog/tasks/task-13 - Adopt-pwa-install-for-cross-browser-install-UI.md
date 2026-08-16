---
id: TASK-13
title: Adopt pwa-install for cross-browser install UI
status: Done
assignee: []
created_date: '2026-08-13 16:07'
updated_date: '2026-08-16 20:58'
labels:
  - Sprint1
milestone: m-0
dependencies: []
references:
  - 'https://github.com/khmyznikov/pwa-install'
  - >-
    https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
  - 'https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/'
documentation:
  - PROMPT-EXECUTION-HUMAN.md
  - backlog/docs/operating-model.md
  - backlog/docs/project-technology.md
modified_files:
  - frontend/package.json
  - frontend/package-lock.json
  - frontend/tsconfig.app.json
  - frontend/index.html
  - frontend/src/App.css
  - frontend/src/AppShell.tsx
  - frontend/src/app.router.test.tsx
  - frontend/src/components/InstallPrompt.tsx
  - frontend/src/components/InstallPrompt.test.tsx
  - frontend/src/components/pwa-install-context.ts
  - frontend/src/components/pwa-install-provider.tsx
  - frontend/src/components/pwa-install-provider.test.tsx
  - frontend/src/setupTests.ts
type: feature
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Original request

The Human requested replacing the existing PWA setup banner with `@khmyznikov/pwa-install` to provide the most uniform feasible experience across mobile, desktop, and tablet, including Chromium browsers and Safari, with guided Home Screen and Add to Dock flows for iOS, iPadOS, and macOS.

## Agreed scope

- Replace manual browser detection, direct `beforeinstallprompt` handling, and handwritten Apple fallback instructions with the library Web Component.
- Keep automatic prompting limited to `/app`.
- Keep the toolbar installation action available after dismissal.
- Suppress installation UI when installed or running standalone.
- Preserve the existing manifest and service-worker registration.
- Add Apple install metadata needed by the guided experience.

## Out of scope

Offline feature expansion, push notifications, store packaging, backend work, and timer behavior changes.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Opening `/app` requests the `pwa-install` dialog while the landing page does not.
- [x] #2 Chromium users receive the library installation flow and can invoke it again from the toolbar.
- [x] #3 iOS and iPadOS users receive localized Add to Home Screen guidance from the library.
- [x] #4 Safari on supported macOS receives localized Add to Dock guidance from the library.
- [x] #5 Dismissal persists across reloads while the toolbar installation action remains available.
- [x] #6 Installed or standalone sessions do not show installation actions.
- [x] #7 Automated tests cover routing, opening, dismissal, toolbar reopening, success state, and standalone behavior.
- [x] #8 The canonical frontend quality gate passes.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Desktop and 390x844 mobile dialog layouts are verified in a real browser.
- [x] #2 No manual user-agent detection or handwritten installation fallback UI remains.
- [x] #3 The added dependency set reports no known npm audit vulnerabilities.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Add `@khmyznikov/pwa-install`, its Lit peers, and browser/manifest type packages; configure TypeScript.
2. Wrap the Web Component behind the existing React PWA provider and context.
3. Replace the custom banner and toolbar fallback with library-driven dialog opening; remove obsolete CSS and add `apple-touch-icon`.
4. Replace user-agent and direct prompt tests with tests of the library adapter contract.
5. Run the canonical frontend quality gate, inspect the final diff, and verify desktop/mobile behavior in a real browser.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Chronological interactive execution record

1. Human supplied the Interactive execution workflow and later clarified the objective: adopt `pwa-install` for cross-browser installation UI.
2. Agent inspected project guidance, current PWA provider, banner, toolbar, tests, manifest, and the official library documentation. No blocking interview questions remained after identifying `@khmyznikov/pwa-install` as the intended package.
3. Agent proposed shared understanding, scope, edge cases, acceptance tests, and task-specific completion items.
4. Human approved the shared understanding with “si”.
5. Agent proposed the five-step implementation plan covering dependencies, provider integration, UI replacement, tests, and quality gates.
6. Human approved the plan, then explicitly confirmed execution of all steps.
7. Agent installed `@khmyznikov/pwa-install@^0.6.4`, Lit peers, and published browser/manifest type packages. Audit reported zero vulnerabilities.
8. Agent implemented a React adapter that keeps the Web Component mounted globally, opens it automatically only on `/app`, allows forced toolbar reopening, records dismissal, tracks installed/standalone state, and retains service-worker registration.
9. Agent removed manual user-agent detection, direct `beforeinstallprompt` code, generic fallback instructions, and obsolete banner CSS; added `apple-touch-icon` metadata.
10. Agent updated unit and router tests to mock and verify the public Web Component contract instead of its Shadow DOM.
11. Focused verification passed: 3 test files and 22 tests.
12. The first workspace `npm ci` failed because external Node processes held native Rolldown/Tailwind binaries open on Windows (`EPERM`). No source or lockfile defect was found. A non-destructive `npm install` restored the workspace, after which lint, typecheck, all tests, and build passed.
13. Agent reran the entire canonical gate in an isolated temporary copy using the same source and lockfile. `npm ci`, lint, typecheck, 34 tests, and production build all passed; audit found zero vulnerabilities.
14. Agent used the browser integration for real Chrome verification. Landing-to-app navigation opened the localized dialog; desktop showed the Chromium installation action; closing and reloading kept the dialog hidden; the toolbar reopened it; a 390x844 viewport rendered the responsive bottom sheet with Italian Add to Home Screen instructions; console error list was empty.
15. Agent inspected the final diff and modified-file list. `git diff --check` passed.
16. Agent presented the final changelog, evidence, warnings, and limitations.
17. Human confirmed closure with “confermo”.

## Sources consulted

- https://github.com/khmyznikov/pwa-install
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
- https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
- `backlog/docs/operating-model.md`
- `backlog/docs/project-technology.md`
- Product and architecture guidance under `backlog/docs/`
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary

Replaced the custom PWA installation banner and browser heuristics with `@khmyznikov/pwa-install`. The library now supplies localized Chromium installation UI and guided iOS/iPadOS/macOS Home Screen or Dock instructions. Automatic prompting remains limited to `/app`; dismissal persists; the toolbar can reopen the dialog; installed and standalone sessions suppress install actions.

## Modified files

- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/tsconfig.app.json`
- `frontend/index.html`
- `frontend/src/App.css`
- `frontend/src/AppShell.tsx`
- `frontend/src/app.router.test.tsx`
- `frontend/src/components/InstallPrompt.tsx`
- `frontend/src/components/InstallPrompt.test.tsx`
- `frontend/src/components/pwa-install-context.ts`
- `frontend/src/components/pwa-install-provider.tsx`
- `frontend/src/components/pwa-install-provider.test.tsx`
- `frontend/src/setupTests.ts`

## Shell commands executed

- `npm install @khmyznikov/pwa-install@^0.6.4 lit@^3.3.3 @lit/react@^1.0.8`
- `npm install --save-dev @types/dom-chromium-installation-events@^101.0.4 @types/web-app-manifest@^1.0.9`
- `npm run typecheck`
- `npm test -- --run src/components/pwa-install-provider.test.tsx src/components/InstallPrompt.test.tsx src/app.router.test.tsx`
- `npm ci`
- `npm run lint`
- `npm test`
- `npm run build`
- `git diff --check`
- Local Vite server and browser-driven desktop/mobile verification commands.

## Verification

- Clean isolated `npm ci`: passed; 456 packages audited; zero vulnerabilities.
- Lint: passed with two pre-existing shadcn Fast Refresh warnings.
- Typecheck: passed.
- Tests: 7 files and 34 tests passed.
- Production build: passed; 2057 modules transformed.
- Browser desktop: localized install dialog rendered and toolbar reopening worked.
- Browser mobile at 390x844: responsive bottom sheet and Italian Add to Home Screen guidance rendered.
- Persistence: dismissed dialog remained hidden after reload.
- Browser console: no errors.
- Final diff check: passed.

## Decisions and limitations

- Apple platforms do not expose a Chromium-equivalent programmatic install prompt; the library provides guided instructions, while the user completes Add to Home Screen or Add to Dock manually.
- The actual PWA was not installed during browser verification to avoid changing the Human’s browser state.
- Existing Vite warnings remain for `__dirname` native config loading and a JavaScript chunk above 500 kB.
- The initial workspace `npm ci` was blocked by native binaries held open by external Node processes; the same command passed in a clean temporary copy, proving lockfile reproducibility.
- No commit or push was performed during this Interactive execution.
<!-- SECTION:FINAL_SUMMARY:END -->
