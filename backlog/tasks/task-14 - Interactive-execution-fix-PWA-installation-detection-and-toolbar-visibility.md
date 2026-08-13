---
id: TASK-14
title: 'Interactive execution: fix PWA installation detection and toolbar visibility'
status: Done
assignee: []
created_date: '2026-08-13 20:48'
updated_date: '2026-08-13 20:48'
labels:
  - frontend pwa interactive
dependencies: []
modified_files:
  - frontend/public/manifest.webmanifest
  - frontend/src/pwa.ts
  - frontend/src/pwa.test.ts
  - frontend/src/components/pwa-install-provider.tsx
  - frontend/src/components/pwa-install-provider.test.tsx
  - frontend/src/components/pwa-install-context.ts
  - frontend/src/components/InstallPrompt.test.tsx
  - frontend/src/AppShell.tsx
  - frontend/src/app.router.test.tsx
  - frontend/src/setupTests.ts
type: bug
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Historical record of the Human-led Interactive execution. Original request: after installing the PWA, uninstalling it without removing localStorage should make the web version propose setup again; PWA launch detection should use a URL query parameter. Follow-up requirement: the toolbar install icon must follow the same availability signal as the banner. Human confirmed the shared understanding, approved the execution plan, reported the remaining toolbar issue, and confirmed closure. Scope included the React PWA manifest, install provider, install prompt, toolbar, tests, and migration of legacy prompt storage. Out of scope: backend changes, data deletion, reliable cross-browser uninstall detection where the platform exposes no API.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The PWA manifest launches with /app?source=pwa and PWA launch detection recognizes that query parameter.
- [x] #2 A normal web visit ignores legacy persistent installation flags and does not lose saved application data.
- [x] #3 Standalone launches and supported related-app detection suppress installation actions.
- [x] #4 The toolbar icon is shown only when the browser reports installation availability and is hidden after installation.
- [x] #5 Dismissal and legacy library prompt state do not permanently block a later web setup prompt.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Interview and shared understanding: the persistent until-pwa-installed localStorage flag was identified as the root cause; Human approved replacing it with URL launch detection plus standalone detection. Implementation plan: update manifest and pwa helper; remove persistent installed-state logic; migrate legacy pwa-hide-install and local dismissal state; add related-app best-effort detection; expose installation availability through context and align AppShell toolbar visibility; update focused tests; run frontend quality gate. Implementation history: changed manifest start_url to /app?source=pwa; added isPwaLaunch; removed until-pwa-installed persistence; migrated dismiss state to sessionStorage and cleared old pwa-hide-install/local dismissal keys; added getInstalledRelatedApps best-effort detection; added isInstallAvailable context state driven by pwa-install-available-event and pwa-install-success-event; updated toolbar condition and tests. Decisions: browser APIs cannot reliably report PWA installation or uninstall status on every platform; iOS does not provide beforeinstallprompt and may show manual Add to Home Screen instructions. Human later requested toolbar alignment with banner; implemented and reverified. Commands: backlog instructions overview; backlog search "PWA install" --plain; npm ci; npm run lint; npm run typecheck; npm test; npm run build; git diff --check. Results: npm ci completed with 0 vulnerabilities; 36 tests passed; typecheck passed; build passed; lint passed with two pre-existing Fast Refresh warnings; diff check passed.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary
Updated PWA launch detection and install UI so persistent localStorage state no longer falsely identifies a web visit as installed, while the toolbar uses the same browser availability signal as the automatic prompt.

## Modified files
- frontend/public/manifest.webmanifest
- frontend/src/pwa.ts
- frontend/src/pwa.test.ts
- frontend/src/components/pwa-install-provider.tsx
- frontend/src/components/pwa-install-provider.test.tsx
- frontend/src/components/pwa-install-context.ts
- frontend/src/components/InstallPrompt.test.tsx
- frontend/src/AppShell.tsx
- frontend/src/app.router.test.tsx
- frontend/src/setupTests.ts

## Shell commands executed
- npm ci
- npm run lint
- npm run typecheck
- npm test
- npm run build
- git diff --check

## Verification
- 36 Vitest tests passed.
- TypeScript typecheck passed.
- Production build passed.
- Oxlint passed with two pre-existing Fast Refresh warnings.
- git diff --check passed.

## Decisions and limitations
- PWA launch context uses /app?source=pwa, standalone detection, and best-effort getInstalledRelatedApps().
- iOS/Safari does not expose beforeinstallprompt and may not report related installed apps; manual installation instructions remain platform-dependent.
- No user timer or application data is deleted.
<!-- SECTION:FINAL_SUMMARY:END -->
