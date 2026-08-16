---
id: TASK-19
title: Open installed desktop PWA from in-scope browser links
status: In Review
assignee:
  - '@Emidio'
created_date: '2026-08-16 14:08'
updated_date: '2026-08-16 14:11'
labels:
  - frontend
  - pwa
dependencies: []
references:
  - 'https://khmyznikov.com/pwa-install/'
  - 'https://developer.chrome.com/docs/capabilities/pwa-navigation-management'
modified_files:
  - frontend/public/manifest.webmanifest
  - frontend/src/pwa.ts
  - frontend/src/pwa.test.ts
  - frontend/src/LandingPage.tsx
  - frontend/src/app.router.test.tsx
priority: high
type: bug
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Quando la PWA desktop è installata, un normale click browser verso /app deve essere catturato da Chrome e aprire la finestra PWA, come avviene nel demo pwa-install. Uniformare URL, scope e service worker al percorso directory /app/.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Da Chrome, dopo l'installazione della PWA e una nuova installazione con il manifest aggiornato, il link della landing apre la finestra PWA desktop invece di una tab browser.
- [x] #2 Il manifest, il link della landing e il service worker usano lo stesso scope directory /app/.
- [x] #3 I test verificano gli URL PWA con trailing slash e restano verdi insieme a build, typecheck e lint.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Uniformare manifest, metadata PWA, link landing e registrazione service worker a /app/. 2. Aggiornare i test dei metadati e del link. 3. Eseguire test, typecheck, lint e build; verificare che la configurazione pubblicata supporti il fallback SPA.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Analisi comparativa con il demo pwa-install: il demo usa start_url /pwa-install/ e service worker scope /pwa-install/; l'app usava /app senza slash finale.

Implementation completed: manifest id/start_url/scope, landing link, and service worker scope now consistently use /app/. Automated validation passed: npm test -- --run (8 files, 47 tests), npm run typecheck, npm run lint (3 pre-existing Fast Refresh warnings), npm run build, and git diff --check. The generated dist/manifest.webmanifest was inspected and contains id/start_url/scope /app/. AC1 still requires manual Chrome validation after uninstalling the previous PWA and reinstalling the updated manifest.
<!-- SECTION:NOTES:END -->
