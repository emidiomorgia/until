---
id: TASK-9
title: Serve the production React SPA with Nginx
status: Ready
assignee: []
created_date: '2026-08-10 20:59'
updated_date: '2026-08-10 21:10'
labels:
  - Sprint1
milestone: m-0
dependencies: []
references:
  - 'https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/'
  - 'https://hub.docker.com/_/nginx/'
modified_files:
  - frontend/Dockerfile
  - frontend/nginx.conf
priority: high
type: enhancement
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the production frontend container runtime static server with Nginx and add the supporting configuration required to serve the Vite React SPA reliably in Docker. The published application must support direct navigation and refresh for client-side routes such as /app while continuing to serve hashed assets and the existing landing page. Keep the change limited to frontend container and deployment support; do not introduce application features, backend services, authentication, persistence, or API behavior.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The frontend Dockerfile uses a multi-stage build and serves the generated dist output from an Nginx runtime image.
- [ ] #2 The Nginx configuration falls back to /index.html for client-side application routes such as /app and unknown SPA paths, while existing static files and assets are served directly.
- [ ] #3 The production container listens on port 80 and does not install or run the Node serve package in the runtime stage.
- [ ] #4 The published frontend preserves the existing landing page at / and React Router navigation to /app after direct navigation and browser refresh.
- [ ] #5 The Nginx and Docker configuration remains limited to static frontend delivery and introduces no API proxy, backend call, authentication, persistence, service worker, or offline behavior.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 A Docker image build completes successfully and the container serves the built frontend on port 80.
- [ ] #2 Container-level verification confirms /, /app, an unknown client-side path, and static asset requests return the expected responses.
<!-- DOD:END -->
