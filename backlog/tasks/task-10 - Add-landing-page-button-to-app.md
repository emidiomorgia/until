---
id: TASK-10
title: Add landing page app button and PWA installation prompt
status: Ready
assignee: []
created_date: '2026-08-10 21:32'
updated_date: '2026-08-10 21:47'
labels: []
milestone: m-0
dependencies: []
priority: high
type: feature
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a button in landing page in order to navigate into /app url inplace.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The landing page retains the existing Explore until control and the prepared Open app control, and the application provides one additional accessible install affordance as a banner or application-toolbar action when an installation path is available.
- [ ] #2 On an installable, not-installed Chrome/Chromium session on Windows, Linux, macOS, or Android, the install affordance is exposed after the browser install prompt event is detected; activating it from a user gesture invokes the standard browser installation dialog, and the manifest supplies the until name and branded icons used by that dialog.
- [ ] #3 On Safari/macOS/iPhone or another supported browser without the Chrome install-prompt event, the install affordance presents an accessible platform-specific Add to Home Screen/Add to Dock instruction flow instead of claiming to open a native Chrome dialog.
- [ ] #4 When the app is running in installed/standalone PWA mode, including supported iOS standalone mode, no install banner, install toolbar action, or fallback install instruction is visible.
- [ ] #5 The PWA manifest, launch metadata, and runtime registration required for the approved installability flow are available from the production frontend; the implementation does not promise offline deadline data, add authentication, call a backend API, or introduce persistence.
- [ ] #6 The install UI is keyboard- and touch-operable, has accessible names and states, can be dismissed where applicable, and does not create duplicate visible install affordances or horizontal overflow at supported desktop and mobile viewport sizes.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Focused frontend tests cover manifest and install metadata, Chrome install-event capture and user-gesture prompt invocation, Safari fallback rendering, dismissal and state handling, accessible install controls, and suppression in standalone mode.
- [ ] #2 Browser verification records Chrome checks for Windows, Linux, macOS, and Android targets and Safari checks for macOS/iPhone where available, including branded native-dialog handoff, fallback guidance, installed-mode suppression, keyboard/touch use, and responsive layout.
- [ ] #3 The task-scoped diff and dependency review confirm that any installer component is maintained and compatible with the existing React/shadcn frontend, or that the standards-based implementation is retained with the rationale recorded; no unrelated runtime, offline, analytics, credential, backend, or deployment behavior is introduced.
- [ ] #4 Production delivery verification confirms the manifest, icons, and PWA runtime assets are served at the expected URLs and do not break direct navigation to / or /app.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect the existing frontend entry point, landing page, application toolbar, assets, and React/Vite setup; preserve the existing Explore until and Open app controls and identify the current PWA gaps.
2. Add the web app manifest and branded install metadata required for the until PWA, using the existing application name and logo/icon assets; define the supported standalone launch behavior without promising offline data.
3. Add the minimum PWA runtime support required for the target browser installability flow, keeping service-worker behavior limited to the approved installable-app scope unless an additional offline requirement is explicitly approved.
4. Implement an install-state controller using feature detection: capture Chrome/Chromium beforeinstallprompt, expose one responsive install affordance as a banner or application-toolbar action, and invoke the saved native prompt only from the user activation.
5. Implement the Safari/macOS/iPhone fallback as an accessible, dismissible instruction UI for the platform Add to Home Screen/Add to Dock flow when no native install prompt API is available; do not claim to display a native Safari install dialog that the platform does not expose.
6. Detect installed/standalone execution across supported platforms, including display-mode standalone and the iOS standalone signal where available, and keep the install banner/toolbar action hidden while the app is running from the home screen or installed PWA.
7. Prefer standards-based browser APIs and evaluate a maintained, widely adopted installer component only if it adds compatibility without hiding platform limitations or duplicating the existing shadcn UI; record the selected approach and dependency decision in implementation evidence.
8. Add focused tests for manifest/link metadata, install-prompt event handling, user-gesture invocation, Safari fallback, installed-mode suppression, accessible labels, dismissal, and prevention of duplicate install affordances.
9. Run the frontend quality gate and browser verification on Chrome for Windows/Linux/macOS/Android targets plus Safari on macOS/iPhone where available; verify branding, native Chrome prompt handoff, fallback guidance, keyboard/touch access, dismissal, and no install UI in standalone mode.

Risks: browser installability criteria and prompt availability vary by platform and browser version; the implementation must feature-detect rather than promise a native prompt everywhere. A service worker or third-party installer library must not silently introduce offline caching, analytics, credentials, or unrelated runtime behavior.
<!-- SECTION:PLAN:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: Analyst
created: 2026-08-10 21:36
---
Cumulative refinement analysis (exchanges 1–2)

Repository findings:
- TASK-10 is `To Do`; its Human-authored title and description remain unchanged.
- TASK-8 established the `/app` React Router route and static application shell; TASK-9 established SPA fallback delivery in the production Nginx container.
- The landing page currently contains an `Explore until` control that must remain, and the frontend already uses React Router.
- This is a frontend-only navigation increment. No backend framework decision, API, authentication, persistence, deadline data, service integration, PWA offline behavior, or new architectural decision is required.

Questions and Human answers:
1. Should the new control replace the existing landing-page `Explore until` control? Answer: No; add a new button in addition to it.
2. What visible label should the new control use? Answer: `Open app`.
3. Does “inplace” mean same-tab client-side navigation to `/app`, without opening a new tab or window? Answer: Yes.

Decisions:
- Preserve the existing landing-page control and add a separate visible control labeled `Open app`.
- `Open app` navigates in the same browser tab to the existing `/app` route through the React client-side router.
- Verify mouse and keyboard activation, route outcome, and preservation of the existing landing page control.
- Keep scope limited to the frontend landing-page navigation and its focused tests; no backend or architectural framework choice is involved.

Remaining assumptions for Human review:
- The existing landing-page visual style and placement conventions determine the exact styling and placement of the additional control; no new product copy or visual redesign is implied.
- “Button” means a native, accessible navigation control with the visible accessible name `Open app`; it must not open a new browsing context.
- The `/app` destination and its static shell are supplied by TASK-8 and are not expanded by TASK-10.
---

author: Analyst
created: 2026-08-10 21:45
---
Cumulative refinement analysis (exchanges 1–3)

Repository findings:
- TASK-10 is To Do; its original Human-authored description remains unchanged. The Human explicitly requested that the new PWA installation feature be merged into this task and that its title be adjusted.
- TASK-8 established the React Router /app shell and TASK-9 established SPA fallback delivery through Nginx.
- The frontend is a TypeScript React SPA/PWA foundation with existing branded icon assets, but the current package and source inventory does not yet establish the complete install prompt, manifest, and service-worker flow.
- No backend framework, API, authentication, persistence, deadline data, or microservice decision is required for this frontend capability.

Questions and Human answers:
1. Should this feature be a separate task or merged into TASK-10? Answer: Merge it into TASK-10.
2. Should TASK-10 title be adjusted? Answer: Yes.
3. Should Safari/macOS/iPhone receive an alternative installation flow? Answer: Yes.
4. When the app is not installed, should the UI expose a banner or toolbar install action that opens Chrome standard prompt, with branded logo and name, and use existing widely adopted installer components where possible? Answer: Yes; use a banner or toolbar action, invoke the standard Chrome dialog on activation, and use a compatible alternative on Safari.

External platform findings:
- Chrome documents beforeinstallprompt as the feature-detection point for an installable web app; the event is saved and its prompt method is called from a user gesture.
- Chrome native UI uses the web app manifest branding, including the app name and icons, rather than allowing the page to replace the browser dialog with arbitrary markup.
- WebKit documents Home Screen web apps and Add to Home Screen behavior on iOS/iPadOS; Safari does not provide the same Chrome beforeinstallprompt flow, so the fallback must guide the user through the platform menu action.
- Installed-mode detection must cover the manifest display mode through matchMedia(display-mode: standalone) and the iOS standalone signal where available.

Decisions:
- Rename TASK-10 to Add landing page app button and PWA installation prompt.
- Preserve the existing landing-page Explore until control and the previously prepared Open app navigation control.
- Add a single responsive install affordance, either a banner or application-toolbar action, only when the browser reports an available installation path and the app is not already installed or standalone.
- On Chrome/Chromium, use the standard beforeinstallprompt event and invoke the saved event only after the user activates the install affordance; the browser supplies the native dialog and manifest branding.
- On Safari/macOS/iPhone and browsers without beforeinstallprompt, show an accessible alternative instruction flow for Add to Home Screen/Add to Dock rather than pretending to provide a native prompt.
- Use feature detection and standards-based APIs first. A maintained installer component may be adopted only if it is compatible with the existing React/shadcn frontend and does not add unrelated behavior.
- PWA installability is in scope; offline data and offline deadline behavior are not implied.

Remaining assumptions for Human review:
- The manifest app name is until, and the existing branded icon assets are the source for install branding unless implementation verification identifies a platform-specific size or format gap.
- If the app is not installed means the install affordance is suppressed in standalone or PWA execution and shown only when a native prompt event or supported platform fallback can be offered; browsers that expose neither path show no misleading install control.
- The Safari fallback is a guided UI, not a polyfill that can open a nonexistent native Safari install dialog.
- The exact choice between a banner and toolbar placement remains an implementation/UI decision, constrained to one visible, accessible affordance and no duplicate prompts.

Sources consulted:
- Chrome for Developers: https://developer.chrome.com/blog/a2hs-updates/
- Chrome for Developers: https://developer.chrome.com/docs/lighthouse/pwa/installable-manifest
- WebKit: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
- WebKit: https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
---
<!-- COMMENTS:END -->
