---
id: TASK-16
title: 'Interactive execution: timer edit and delete actions'
status: Done
assignee: []
created_date: '2026-08-13 22:07'
updated_date: '2026-08-13 22:08'
labels:
  - interactive
  - frontend
dependencies: []
modified_files:
  - frontend/src/services/timer-storage.service.ts
  - frontend/src/services/timer-storage.service.test.ts
  - frontend/src/hooks/use-timer-list.ts
  - frontend/src/components/add-timer-page.tsx
  - frontend/src/components/timer-list.tsx
  - frontend/src/app.router.tsx
  - frontend/src/app.router.test.tsx
type: task
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Historical archive of the Human-led Interactive execution on branch feature/edit-delete-timer.

Original request: aggiungere le funzionalità di modifica timer e elimina timer. Su desktop e tablet usare un menu a comparsa attivato da un pulsante con tre puntini a destra della lista; il menu consente modifica tramite form di dettaglio con Salva e Annulla e richiede conferma prima dell'eliminazione. Su mobile phone usare due azioni nella card.

Human-approved assumptions and scope:
- Breakpoint md (768 px) distingue mobile phone da tablet/desktop.
- La modifica usa la rotta dedicata /app/timers/:id/edit e il form esistente precompilato.
- L'eliminazione usa un dialog accessibile con Annulla ed Elimina.
- Le etichette restano in inglese per coerenza con l'interfaccia esistente.
- Restano fuori scope avvio, pausa, conteggio e nuove funzionalità backend.

Shared understanding was presented to the Human and explicitly approved; the Human then authorized autonomous execution.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Users can edit an existing timer from the responsive action controls, with the form prepopulated and Save/Cancel actions.
- [x] #2 Desktop and tablet timer rows expose Edit and Delete through a three-dot popover on the right.
- [x] #3 Mobile phone timer cards expose direct Edit and Delete actions.
- [x] #4 Deleting a timer requires explicit confirmation and removes only the selected timer from persisted storage.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Execution history:
1. Read backlog instructions overview and repository AGENTS.md, operating-model.md, and project-technology.md; confirmed branch feature/edit-delete-timer and preserved unrelated worktree state.
2. Inspected TimerStorageService, AddTimerPage, TimerList, router, shadcn Popover/Button primitives, existing tests, and frontend quality scripts.
3. Implemented TimerStorageService.update and remove, including validation, error handling, persistence, and a same-tab until-timers-changed event.
4. Updated useTimerList to refresh saved timers after storage mutations while preserving live elapsed/remaining time updates.
5. Refactored the add form into a shared add/edit form, added prepopulation from the selected timer, Save and Cancel behavior, and route /app/timers/:id/edit.
6. Added desktop/tablet Popover actions with three-dot trigger; added direct Edit/Delete actions on mobile cards.
7. Added an accessible confirmation dialog before deletion and surfaced storage errors.
8. Added service and router integration tests for update, remove, edit prepopulation/save, and delete confirmation.
9. Human-approved final changelog and explicitly requested task closure.

Important decisions:
- The existing shadcn Popover composition is reused for tablet/desktop actions.
- Deletion is intentionally confirmed in-app rather than through a browser-native confirm dialog.
- Responsive visibility is implemented with md utilities: direct actions below md, three-dot menu at md and above.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary
Implemented timer editing and deletion in the approved Interactive scope. Added storage update/remove operations, a prefilled edit form with Save/Cancel, desktop/tablet three-dot action menus, mobile card actions, and an accessible deletion confirmation dialog.

## Modified files
- frontend/src/services/timer-storage.service.ts
- frontend/src/services/timer-storage.service.test.ts
- frontend/src/hooks/use-timer-list.ts
- frontend/src/components/add-timer-page.tsx
- frontend/src/components/timer-list.tsx
- frontend/src/app.router.tsx
- frontend/src/app.router.test.tsx

## Shell commands executed
- backlog instructions overview
- backlog instructions task-creation
- backlog instructions task-finalization
- backlog search "modifica timer elimina timer" --plain
- backlog task list --search "timer" --limit 20 --plain
- backlog task view TASK-15 --plain
- npm run typecheck
- npm run lint
- npm test
- npm run build
- git diff --check
- browser-based local verification at desktop, 768 px tablet, and 375 px mobile viewports

## Verification
- 43 tests passed across 8 files.
- npm run typecheck passed.
- npm run lint passed with existing Fast Refresh export warnings only.
- npm run build passed with existing Vite config and chunk-size warnings only.
- git diff --check passed.
- Browser verification confirmed desktop/tablet action menu, mobile direct actions, edit form prepopulation, and responsive visibility at 768 px and 375 px.
- Deletion confirmation and successful removal were covered by automated integration tests.

## Decisions and limitations
- No backend, API, timer execution, or data-model changes were added.
- No commit, push, or merge was performed.
- Existing lint and Vite warnings remain documented; they do not fail the quality gate.
<!-- SECTION:FINAL_SUMMARY:END -->
