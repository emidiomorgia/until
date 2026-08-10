---
id: TASK-9
title: Serve the production React SPA with Nginx
status: Done
assignee:
  - '@Emidio Morgia'
created_date: '2026-08-10 20:59'
updated_date: '2026-08-10 21:29'
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
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the production frontend container runtime static server with Nginx and add the supporting configuration required to serve the Vite React SPA reliably in Docker. The published application must support direct navigation and refresh for client-side routes such as /app while continuing to serve hashed assets and the existing landing page. Keep the change limited to frontend container and deployment support; do not introduce application features, backend services, authentication, persistence, or API behavior.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The frontend Dockerfile uses a multi-stage build and serves the generated dist output from an Nginx runtime image.
- [x] #2 The Nginx configuration falls back to /index.html for client-side application routes such as /app and unknown SPA paths, while existing static files and assets are served directly.
- [x] #3 The production container listens on port 80 and does not install or run the Node serve package in the runtime stage.
- [x] #4 The published frontend preserves the existing landing page at / and React Router navigation to /app after direct navigation and browser refresh.
- [x] #5 The Nginx and Docker configuration remains limited to static frontend delivery and introduces no API proxy, backend call, authentication, persistence, service worker, or offline behavior.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 A Docker image build completes successfully and the container serves the built frontend on port 80.
- [x] #2 Container-level verification confirms /, /app, an unknown client-side path, and static asset requests return the expected responses.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Replace the Node-based runtime stage with an Nginx runtime image and copy the built dist output into the Nginx document root. 2. Add frontend/nginx.conf with static-file serving and SPA fallback to /index.html, without API proxying or other application behavior. 3. Build the frontend image and run container-level HTTP checks for /, /app, an unknown SPA path, and a hashed static asset. 4. Run the applicable frontend quality checks, inspect the final diff, record evidence, commit, push, and hand off in In Review.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implementation progress (2026-08-10): replaced the Node serve runtime with nginx:1.27-alpine, copied dist to /usr/share/nginx/html, and added frontend/nginx.conf with static-file serving plus /index.html SPA fallback. npm ci was attempted twice but could not remove locked native Node binaries (EPERM); npm install completed with 441 packages added/4 changed and 0 vulnerabilities, with cleanup warnings for the same locked binaries. npm run lint passed with two existing Fast Refresh warnings; npm run typecheck, npm test (2 files/5 tests), npm run build, and git diff --check passed. Docker verification is blocked because docker build -t until-frontend:task-9 . could not connect to the Docker Desktop Linux engine named pipe; container-level HTTP checks have not been executed. Task remains In Progress and no acceptance criteria or DoD items were checked.

Container verification (2026-08-10): docker build -t until-frontend:task-9 . completed successfully. docker run HTTP checks returned 200 text/html for /, /app, and /not-a-real-route, and 200 application/javascript for the generated hashed asset /assets/index-B1zv619d.js. nginx -t passed; runtime inspection confirmed node-absent, static-only files, and no proxy_pass. Frontend lint, typecheck, tests (2 files/5 tests), build, and git diff --check passed; lint retained two existing Fast Refresh warnings and Vite emitted its existing configLoader native warning.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: @Emidio Morgia
created: 2026-08-10 21:27
---
Coder handoff complete. Commit 2cb79a8 pushed as origin/task-9-nginx after all acceptance criteria, task-specific DoD checks, frontend quality checks, Docker build, and container HTTP verification passed. Awaiting Human verification and independent Reviewer invitation; no merge performed.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary

- Replaced the production Node static-server runtime with Nginx and added SPA-aware static delivery so direct navigation and refresh work for React routes while hashed assets remain directly served.

## Modified files

- `frontend/Dockerfile` — Uses a Node build stage and an Nginx 1.27 Alpine runtime stage on port 80.
- `frontend/nginx.conf` — Serves static files directly and falls back to `/index.html` for client-side routes.

## Shell commands executed

- `npm run lint` (working directory: `frontend`) — Passed; two existing Fast Refresh warnings.
- `npm run typecheck` (working directory: `frontend`) — Passed.
- `npm test` (working directory: `frontend`) — Passed; 2 files and 5 tests.
- `npm run build` (working directory: `frontend`) — Passed; generated `dist` with hashed CSS and JavaScript assets.
- `git diff --check` (repository root) — Passed.
- `docker build -t until-frontend:task-9 .` (working directory: `frontend`) — Passed.
- `$containerId = docker run -d --rm -p 18080:80 until-frontend:task-9; ...` (working directory: `frontend`) — Passed; HTTP checks returned 200 for `/`, `/app`, `/not-a-real-route`, and the hashed JavaScript asset.
- `docker run --rm --entrypoint nginx until-frontend:task-9 -t; docker run --rm --entrypoint sh until-frontend:task-9 -c "..."` (working directory: `frontend`) — Passed; Nginx syntax valid, Node absent, runtime static-only, and no `proxy_pass`.

## Verification

- AC1 — Pass: multi-stage Docker build completed and dist is copied into the Nginx document root.
- AC2 — Pass: Nginx syntax and HTTP checks confirm static serving plus SPA fallback.
- AC3 — Pass: image serves on port 80 and runtime contains no Node executable or serve package.
- AC4 — Pass: root, `/app`, and an unknown route return the built HTML document; React route tests pass.
- AC5 — Pass: configuration contains only static frontend delivery with no API proxy or application behavior.
- DoD1 — Pass: Docker image build and container serving verification completed successfully.
- DoD2 — Pass: container-level checks passed for root, `/app`, unknown SPA route, and hashed asset.
- Common Definition of Done — Pass: scope, diff, documentation/task evidence, automated checks, and task-scoped file list were reviewed.

## Decisions and limitations

- The initial Docker engine availability issue was resolved by starting Docker Desktop; no implementation limitation remains.
- Existing lint Fast Refresh warnings and the Vite configLoader warning remain unchanged and do not fail the checks.
<!-- SECTION:FINAL_SUMMARY:END -->
