---
id: TASK-4
title: Create Github Action for deploy static website
status: In Review
assignee: []
created_date: '2026-08-10 08:49'
updated_date: '2026-08-10 09:12'
labels: []
milestone: m-0
dependencies: []
references:
  - 'https://github.com/emidiomorgia/until/issues/1'
priority: high
type: feature
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
As the maintainer
I want to create Github Action that builds a docker container in docker hub
In order to run the container from docker

create the dockerfile in frontend folder using an image of nodejs for static serving the application
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A multi-stage frontend/Dockerfile exists with a Node.js build stage that reproducibly installs the frontend dependencies and produces the production static build, and a Node.js runtime stage that serves only the generated static assets.
- [x] #2 A GitHub Actions workflow exists for deployment and is triggered by pushed tags matching the x.y.z release-tag form; it does not publish for ordinary branch pushes, pull requests, manual dispatches, or non-matching tags.
- [x] #3 Before publishing, the workflow verifies that the tagged commit belongs to the corresponding a.b.x release branch derived from the tag; for example, tag 0.1.1 publishes only when commit 0.1.1 is contained in branch 0.1.x, and an invalid pairing stops without publishing.
- [x] #4 When the trigger, branch guard, frontend build, and Docker build succeed, the workflow authenticates using repository secrets DOCKERHUB_USERNAME and DOCKERHUB_TOKEN and pushes Docker Hub image emidiomorgia/until with the exact release tag, such as emidiomorgia/until:0.1.1.
- [ ] #5 The resulting container serves the current frontend static landing page through the Node.js runtime on the documented container port; client-side route history fallback, backend/API behavior, service-worker/offline behavior, Render configuration, and SSL setup are not introduced.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 All changed files are limited to the task-scoped frontend Dockerfile, deployment workflow, and any narrowly scoped validation/documentation needed to verify them; no application feature or backend framework changes are included.
- [x] #2 The Dockerfile uses reproducible dependency installation, does not copy frontend development dependencies or repository secrets into the runtime image, and excludes unnecessary source files from the final runtime stage.
- [x] #3 The workflow uses GitHub Actions secret references for Docker Hub authentication, does not contain credentials, and publishes only after successful frontend and Docker build steps.
- [x] #4 Automated checks pass for the affected frontend workspace: npm ci, lint, typecheck, tests, and production build.
- [ ] #5 Workflow syntax/static validation and a local Docker build/run smoke test pass where Docker is available; otherwise the unavailable remote Docker/GitHub Actions verification is explicitly recorded for Human review.
- [ ] #6 The task remains To Do with all acceptance criteria and Definition of Done items unchecked until the Human moves it to Ready.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect the existing frontend package scripts and build output contract, then define the Docker build context and runtime port without changing application behavior.
2. Add frontend/Dockerfile as a multi-stage Node.js build: install reproducibly from the frontend lockfile, run the production build, and copy only the generated static assets into a Node.js static-serving runtime stage.
3. Add the deploy-only GitHub Actions workflow under .github/workflows/ with a pushed-tag trigger for semantic tags in x.y.z form.
4. Implement a workflow guard that derives the expected release branch a.b.x from the tag, checks the tagged commit against that branch, and stops before login/build/push when the relationship is invalid.
5. Authenticate to Docker Hub with repository secrets DOCKERHUB_USERNAME and DOCKERHUB_TOKEN, build emidiomorgia/until, and publish the exact release tag name only after the frontend build and Docker build succeed.
6. Add workflow/Docker validation that proves secret values are not embedded, the workflow cannot publish from an invalid branch/tag pairing, and the Docker image contains the built landing page served by the Node.js runtime.
7. Run the affected frontend quality gate and repository-level static checks; perform a local Docker build/run smoke test where Docker is available, and record any environment limitation for Human review.

Risks: GitHub tag push events do not include a reliable source-branch field, so branch membership must be verified explicitly; Docker Hub credentials and publishing require configured repository secrets and remote Actions execution; the Docker runtime/server choice must remain compatible with the static Vite output and TASK-5's later Render configuration.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Coder scope confirmation: task-3 is Done and no explicit task dependencies are listed. Proceeding on dedicated branch with only frontend/Dockerfile and .github/workflows deployment workflow; no application, backend, Render, SSL, routing fallback, service-worker, or offline changes.

Implementation evidence: added frontend/Dockerfile with Node 22 Alpine build/runtime stages, npm ci from package-lock.json, production build, pinned serve@14.2.4 runtime, static dist-only copy, and port 4173. Added frontend/.dockerignore to exclude dependencies, build output, metadata, logs, and local files from the build context. Added .github/workflows/deploy-static-website.yml with push tag glob, exact x.y.z validation, tagged-commit ancestry check against derived a.b.x branch before frontend build, Docker build, login, or push, and Docker Hub secret references publishing emidiomorgia/until:. Quality gate passed: npm ci, npm run lint, npm run typecheck, npm test (1 file, 2 tests), npm run build. Static workflow/Docker checks passed. Docker smoke test unavailable because Docker Desktop Linux daemon was not running; actionlint/yamllint are unavailable in the environment.

Correction: workflow image tag expression is `${{ env.IMAGE_NAME }}:${{ github.ref_name }}` and publishes the exact release tag.

Handoff evidence: commit d022de3 created on task-4-github-action-deploy-static-website and pushed successfully to origin/task-4-github-action-deploy-static-website. Awaiting Human verification; Docker daemon/actionlint limitations remain explicitly recorded.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: Analyst
created: 2026-08-10 08:54
---
Analysis exchange 1 (Analyst)\n\nRepository findings:\n- TASK-4 is To Do and its Human-authored title and description are unchanged.\n- The frontend workspace from TASK-3 exists and provides the static Vite build output that this deployment task would package.\n- The repository architecture permits deployment changes through a focused prepared task, while secrets must not be committed.\n- TASK-5 is a separate To Do task for the Render service; this refinement keeps TASK-4 focused on building and publishing the Docker image.\n\nQuestions for Human:\n1. What exact Docker Hub repository should the workflow publish to (for example, Docker Hub username and image name), and which tag policy is required (for example, latest on the default branch plus immutable Git SHA or release tags)?\n2. Which GitHub Actions trigger(s) should publish the image: pushes to the default branch, version tags, pull requests, manual dispatch, or a specific combination?\n3. Which GitHub Actions secrets/variables should be the supported authentication contract for Docker Hub, and should the workflow use Docker Hub username plus access token stored as repository secrets? No credentials will be committed.\n4. Should the frontend Docker image serve the built SPA with a Node.js static server and provide history-fallback routing for future client-side routes, or is serving the generated files at the root path sufficient for this static landing page?\n5. Is a multi-stage image expected (Node.js build stage plus Node.js runtime stage), or should the Dockerfile use the existing frontend build output and only a Node.js runtime image?\n\nCurrent assumptions pending answers:\n- The Dockerfile will live at frontend/Dockerfile and the workflow will build from the repository root using frontend as the application context.\n- The workflow will build the frontend before building the image, publish only after successful build/validation, and use GitHub Actions-supported Docker build/push actions.\n- Docker Hub and GitHub credentials remain external secrets; no Render configuration, SSL setup, or deployment service changes are included because those belong to TASK-5.\n- No backend framework decision or ADR is required for this frontend delivery increment.\n\nRemaining decision: the image identity, trigger/tag policy, credential names, and SPA serving/build strategy are required before measurable acceptance criteria and an implementation plan can be finalized.
---

author: Analyst
created: 2026-08-10 09:03
---
Analysis exchange 2 (Human answers and Analyst resolution)

Human answers:
- The image tag must use the release tag name.
- This is a deploy pipeline, not the general CI pipeline. It must run only when a tag matching x.y.z is pushed to a release branch matching a.b.x; example: tag 0.1.1 pushed from branch 0.1.x.
- Docker Hub credentials will be stored as repository GitHub Actions secrets.
- SPA history-fallback routing is not required for now because the current frontend is a static landing page.
- Use a multi-stage Dockerfile with a Node.js build stage and a Node.js runtime stage.

Decisions and assumptions:
- Publish to Docker Hub image emidiomorgia/until, inferred from the repository owner and project name (https://github.com/emidiomorgia/until); the Human can revise this image identity before implementation if needed.
- Use repository secrets named DOCKERHUB_USERNAME and DOCKERHUB_TOKEN as the prepared authentication contract; the values must never be committed or printed.
- Trigger on pushed tags matching *.*.*, then verify that the tagged commit is contained in the corresponding release branch a.b.x (for example, 0.1.1 must resolve to branch 0.1.x) before publishing. Tags that do not satisfy both conditions must not publish.
- The Docker image will build the existing frontend with the repository's npm workflow, serve the generated static files through a Node.js runtime image, and expose the runtime port through the container configuration. Exact port and static-server package remain implementation details unless required by the runtime platform.
- TASK-4 includes the frontend Dockerfile and GitHub Actions publish workflow only. Render service, SSL, and external deployment configuration remain in TASK-5.
- No backend framework choice, API, service worker, offline behavior, or client-side route fallback is required.

Remaining assumptions for Human review:
- The Docker Hub repository name and secret names are conventional assumptions based on the repository identity and can be changed before implementation.
- The workflow must validate branch membership because a tag push event identifies the tagged commit but does not itself provide a trusted source-branch field.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Implemented TASK-4 on branch task-4-github-action-deploy-static-website. Added a multi-stage Node 22 Alpine frontend image with reproducible npm ci build, pinned Node static runtime on port 4173, and a focused Docker build context. Added a tag-only GitHub Actions deployment that validates exact x.y.z tags and tagged-commit ancestry in the derived a.b.x release branch before frontend verification, Docker build, Docker Hub login, and push to emidiomorgia/until:<release-tag>. Verified npm ci, lint, typecheck, tests (2 passing), production build, git diff --check, and static workflow/Docker contract checks. Docker build/run smoke testing could not run because the Docker Desktop Linux daemon was unavailable; actionlint/yamllint were also unavailable and are recorded for Human review. No unrelated application or backend files changed; no merge performed.
<!-- SECTION:FINAL_SUMMARY:END -->
