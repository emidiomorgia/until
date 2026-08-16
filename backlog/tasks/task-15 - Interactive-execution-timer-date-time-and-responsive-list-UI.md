---
id: TASK-15
title: 'Interactive execution: timer date-time and responsive list UI'
status: Done
assignee: []
created_date: '2026-08-13 21:49'
updated_date: '2026-08-16 20:59'
labels:
  - Sprint1
milestone: m-0
dependencies: []
modified_files:
  - frontend/src/components/date-time-picker.tsx
  - frontend/src/components/ui/calendar.tsx
  - frontend/src/components/ui/popover.tsx
  - frontend/src/components/add-timer-page.tsx
  - frontend/src/components/timer-list.tsx
  - frontend/src/components/timer-list.test.ts
  - frontend/src/components/timer-list-page.tsx
  - frontend/src/components/app-sidebar.tsx
  - frontend/src/AppShell.tsx
  - frontend/src/app.router.test.tsx
  - frontend/package.json
  - frontend/package-lock.json
type: task
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Historical archive of the Human-led Interactive execution on branch feature/datetime-picker.

Original request: replace native datetime-local controls in the timer creation form with shadcn date-time pickers showing a calendar and time selection.

Approved scope and subsequent Human-approved refinements:
- Use shadcn Calendar + Popover with a local 24-hour time input for Start and End.
- Preserve required-field validation, End-after-Start validation, local-to-ISO persistence, and responsive accessibility.
- Format timer list date-times numerically according to the client locale (Intl.DateTimeFormat, including en-US and it-IT conventions).
- On mobile, use a compact two-row timer card: title/status plus start/end on the first row; elapsed percentage, progress bar, and remaining time on the second.
- On desktop, use one row ordered as title/status, remaining time, elapsed/progress, start date-time, end date-time.
- Keep the intermediate responsive range on the compact layout by starting the one-row desktop layout at lg.
- Remove the expansion panel because it contained no additional information.
- Replace the drawer subtitle with the official slogan “Make time count.”.
- Rename the sidebar timer navigation item and toolbar title to “Timer list” with a list icon.
- Move Add timer from the global application toolbar into the Timer list toolbar; leave the global toolbar for general actions.

Out of scope: backend, storage model changes, new services, timer-list business logic, commits, pushes, or merges.

Execution history:
1. Read project Backlog overview and repository technology/operating guidance; confirmed branch feature/datetime-picker and preserved unrelated worktree state.
2. Inspected AddTimerPage, TimerList, AppShell, AppSidebar, existing tests, shadcn configuration, and dependencies.
3. Consulted official shadcn date-picker/calendar documentation. Installed official Calendar and Popover components through the shadcn CLI, adding date-fns and react-day-picker.
4. Implemented reusable DateTimePicker and integrated it into AddTimerPage. Updated integration tests to exercise calendar visibility, date selection, time selection, validation, ISO persistence, and absence of datetime-local.
5. Fixed real-browser time input handling by using the input event after browser verification exposed that synthetic change handling did not update the controlled state.
6. Added locale-aware numeric timer date formatting and explicit en-US/it-IT formatter tests.
7. Iteratively refined mobile and desktop timer-card layouts, including responsive lg breakpoint, spacing, controlled desktop columns, and removal of expansion interaction.
8. Updated drawer slogan, navigation label/icon, toolbar title, and moved Add timer into the Timer list toolbar.
9. Human confirmed closure.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Timer creation uses shadcn calendar and time controls instead of native datetime-local inputs.
- [x] #2 Timer list date-times use numeric client-locale formatting.
- [x] #3 Timer cards provide responsive mobile and desktop layouts without redundant expansion content.
- [x] #4 General and Timer list toolbar actions are separated, with descriptive navigation naming.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Human approvals: initial shared understanding approved; Human authorized proceeding without additional confirmations; subsequent UI refinements were requested and implemented; final closure explicitly confirmed.

Important decisions:
- Official shadcn Calendar + Popover composition was used.
- Date/time values remain local Date objects in the form and are serialized to ISO on save.
- Timer list formatting uses Intl.DateTimeFormat with the client locale and numeric date/time parts.
- Compact layout is used below lg to avoid controls collapsing in the intermediate responsive range.
- Expansion was removed because it duplicated list information.

Verification evidence:
- npm ci completed with 0 vulnerabilities.
- npm run lint passed; only Fast Refresh warnings remain in existing/shared component export patterns and the exported formatter.
- npm run typecheck passed.
- npm test passed: 39 tests in 8 files.
- npm run build passed; only existing Vite native config and chunk-size warnings remain.
- git diff --check passed.
- Browser verification confirmed Calendar visibility, local time updates, timer save, no browser console errors, and no horizontal overflow at 375px.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary
Implemented and refined the Human-approved timer creation and timer-list UI changes: shadcn date-time pickers, locale-aware numeric date-times, responsive mobile/desktop timer cards, removal of redundant expansion, drawer slogan, Timer list navigation naming/icon, and contextual Add timer placement.

## Modified files
- frontend/src/components/date-time-picker.tsx
- frontend/src/components/ui/calendar.tsx
- frontend/src/components/ui/popover.tsx
- frontend/src/components/add-timer-page.tsx
- frontend/src/components/timer-list.tsx
- frontend/src/components/timer-list.test.ts
- frontend/src/components/timer-list-page.tsx
- frontend/src/components/app-sidebar.tsx
- frontend/src/AppShell.tsx
- frontend/src/app.router.test.tsx
- frontend/package.json
- frontend/package-lock.json

## Shell commands executed
backlog instructions overview; backlog instructions task-creation; backlog instructions task-finalization; npx shadcn add calendar popover -y; npm ci; npm run lint; npm run typecheck; npm test; npm run build; git diff --check; browser-based local verification.

## Verification
39 tests passed across 8 files; typecheck passed; build passed; browser verification covered picker interaction, save flow, responsive mobile layout, and console errors.

## Decisions and limitations
No backend or data-model changes. Existing lint warnings and Vite build warnings remain documented above. No commit, push, or merge was performed.
<!-- SECTION:FINAL_SUMMARY:END -->
