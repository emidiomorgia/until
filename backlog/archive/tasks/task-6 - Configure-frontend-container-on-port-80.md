---
id: TASK-6
title: Configure frontend container on port 80
status: Ready
assignee: []
created_date: '2026-08-10 10:22'
labels:
  - frontend docker
dependencies: []
references:
  - frontend/Dockerfile
  - .github/workflows/deploy-static-website.yml
priority: medium
type: task
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Allinea il runtime Docker del frontend alla porta HTTP 80, sostituendo l'attuale porta 4173 esposta e usata dal comando serve. Il cambio deve mantenere invariati build e pubblicazione dell'immagine e rendere esplicito il nuovo endpoint del container.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Il Dockerfile del frontend espone la porta 80.
- [ ] #2 Il server statico nel container ascolta su 0.0.0.0:80.
- [ ] #3 L'immagine continua a completare build e avvio del frontend senza errori.
- [ ] #4 Le verifiche del frontend (lint, typecheck, test e build) restano verdi.
<!-- AC:END -->
