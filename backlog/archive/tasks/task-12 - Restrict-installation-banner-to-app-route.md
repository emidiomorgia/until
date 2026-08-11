---
id: TASK-12
title: Restrict installation banner to /app route
status: To Do
assignee: []
created_date: '2026-08-11 08:52'
updated_date: '2026-08-11 08:52'
labels:
  - frontend pwa routing
dependencies: []
references:
  - frontend/src/app.router.tsx
  - frontend/src/components/InstallPrompt.tsx
  - 'https://reactrouter.com/start/declarative/routing'
  - 'https://developer.chrome.com/blog/app-install-banners-native/'
modified_files:
  - frontend/src/app.router.tsx
  - frontend/src/app.router.test.tsx
  - frontend/src/components/InstallPrompt.tsx
  - frontend/src/components/InstallPrompt.test.tsx
priority: medium
type: enhancement
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Limit the existing PWA installation banner to the application route so that it is visible only at /app. Preserve the existing installation behavior, platform guidance, standalone suppression, and landing-page experience.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 At /app, the existing install banner remains available under the same browser/platform conditions as today.
- [ ] #2 At /, unknown routes, and any non-/app route, no install banner or install guidance is rendered.
- [ ] #3 The change does not duplicate the banner, alter native install-prompt behavior, or change standalone-mode suppression.
- [ ] #4 Focused routing and install-prompt tests cover /app visibility and non-/app suppression.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Browser verification confirms the banner visibility boundary at /app and its absence at the landing page and fallback route.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Keep the existing InstallPrompt component and browser/platform state logic unchanged; inspect its current mount point and route test seams.
2. Move the install-banner mount from the global AppRouter shell into the exact /app route element, using a small route-local composition component so / and the unknown-route landing fallback cannot render it.
3. Preserve the existing AppShell UI, manifest/service-worker behavior, native beforeinstallprompt handoff, platform guidance, dismissal, and standalone suppression without adding dependencies or changing PWA scope.
4. Add focused tests that verify the install UI is available on /app under an available fallback/install condition and absent on / and an unknown route; retain existing InstallPrompt behavior tests.
5. Run frontend lint, typecheck, focused/full tests, build, and diff checks; perform a browser preview check at /app, /, and an unknown path for the visibility boundary and no horizontal overflow.
<!-- SECTION:PLAN:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: Analyst
created: 2026-08-11 08:52
---
Analyst refinement (2026-08-11): Repository inspection shows InstallPrompt is currently mounted globally inside AppRouter, above AppRoutes, so it is eligible on the landing page and unknown-route fallback. Proposed scope is an exact-route mount under /app only. The existing InstallPrompt logic, manifest, service worker, native beforeinstallprompt handoff, platform guidance, dismissal, and standalone suppression remain unchanged. No interview question is required for the stated exact /app requirement; explicit assumption: /app means the current exact route, not future nested /app/* routes. If nested app routes are later introduced, route-local layout scope can be extended in a separate task. Sources: React Router route matching and nested composition documentation (https://reactrouter.com/start/declarative/routing; https://reactrouter.com/api/components/Route) and Chrome install prompt guidance (https://developer.chrome.com/blog/app-install-banners-native/). Implementation has not started; Human approval is pending.
---
<!-- COMMENTS:END -->
