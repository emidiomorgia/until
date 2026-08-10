---
id: TASK-11
title: Avviare l'app installata su /app
status: Done
assignee:
  - '@Emidio'
created_date: '2026-08-10 22:08'
updated_date: '2026-08-10 22:12'
labels:
  - Sprint1
dependencies: []
modified_files:
  - frontend/public/manifest.webmanifest
  - frontend/src/pwa.ts
  - frontend/src/pwa.test.ts
priority: high
type: bug
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
L'app installabile avvia la landing page perché il manifest PWA usa / come start_url. L'app installata deve aprire direttamente il percorso /app, che contiene l'application shell.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Il manifest PWA dichiara /app come start_url.
- [x] #2 L'installazione avviata dalla landing page apre direttamente l'application shell su /app.
- [x] #3 I test automatici coprono il percorso di avvio PWA e restano verdi.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Impostare start_url del manifest PWA su /app. 2. Aggiornare i test del manifest per verificare il percorso di avvio. 3. Eseguire test e controlli frontend.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Aggiornati manifest e metadati PWA per usare /app come percorso di avvio; aggiunta asserzione automatica sullo start_url.

Verifica: npm test -- --run (4 file, 9 test passati), npm run build (riuscito; dist/manifest.webmanifest start_url=/app), npm run lint (riuscito con 2 warning preesistenti Fast Refresh).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Corretto l'avvio PWA impostando start_url su /app nel manifest e nei metadati condivisi; il percorso /app è coperto dal test router. Verificati test Vitest, build Vite e lint frontend.
<!-- SECTION:FINAL_SUMMARY:END -->
