---
id: TASK-6
title: Github Action for CI and CD
status: Done
assignee:
  - '@codex'
created_date: '2026-08-10 11:57'
updated_date: '2026-08-10 13:26'
labels: []
milestone: m-0
dependencies: []
references:
  - 'https://github.com/emidiomorgia/until/issues/7'
priority: high
type: feature
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
As the maintainer
I want to separate the ci/cd pipelines as github action
In order to have one ci github action to test and one cd github action to test and deploy as docker hub container. The CI pipeline will run only tests and code coverage, code quality, security checks (apply only what really exists), che CD pipeline will run tests and deploy.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A distinct CI GitHub Actions workflow exists with a role-identifying name and runs for pull requests targeting main.
- [x] #2 The CI workflow installs the existing frontend dependencies reproducibly and runs the repository's currently available frontend checks: npm ci, lint, typecheck, tests, and production build.
- [x] #3 The CI workflow introduces no new coverage, security, or other analysis tools; because no such configured tooling exists, coverage and security checks are explicitly recorded as future work rather than silently claimed as passing.
- [x] #4 The existing Docker publication workflow is renamed or otherwise clearly identified as the CD workflow, with no duplicate Docker publication workflow left behind.
- [x] #5 The CD workflow preserves TASK-4's release policy: it runs for pushed x.y.z tags, validates that the tagged commit is contained in the corresponding a.b.x release branch, and stops before publication when the pairing is invalid.
- [x] #6 Before Docker publication, the CD workflow repeats the existing frontend checks and successfully builds the frontend Docker image.
- [x] #7 After successful validation and Docker build, the CD workflow authenticates with the existing GitHub Actions Docker Hub secrets and publishes both the exact release tag and the latest tag using TASK-4's configured image identity.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Only the role-based CI/CD workflow files and narrowly necessary workflow metadata are changed; no application, backend, Dockerfile, Render, SSL, or unrelated files are modified.
- [x] #2 Both workflows use GitHub Actions secret references only; no credentials, tokens, or sensitive values are committed or printed.
- [x] #3 The CI workflow is statically inspected for pull-request targeting main, correct existing commands, and absence of undeclared coverage/security tooling.
- [x] #4 The CD workflow is statically inspected for its release-tag filter, matching release-branch guard, repeated quality checks, Docker build, secret-based login, and both image tags.
- [x] #5 The affected frontend quality gate passes locally with npm ci, npm run lint, npm run typecheck, npm test, and npm run build; unavailable remote GitHub Actions and Docker Hub publication behavior is recorded as environment-dependent.
- [ ] #6 All proposed acceptance criteria and DoD items remain unchecked, and TASK-6 remains To Do pending Human approval.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Reinspect TASK-4's existing CD workflow and frontend quality scripts; preserve the approved release branch/tag, Docker Hub secret, image, and dual-tag publication behavior.
2. Rename the existing deployment workflow to a clear CD role-based workflow name without creating a second publication path.
3. Add a separate CI role-based workflow triggered only by pull requests targeting main.
4. Configure CI to run npm ci, lint, typecheck, tests, and production build for the existing frontend workspace; do not add coverage or security tooling that is not already configured.
5. Configure CD to repeat the frontend checks, build the existing frontend Docker image, authenticate with repository secrets, and publish both the exact release tag and latest after the existing release-branch guard succeeds.
6. Validate workflow structure and secret references with static inspection, run the affected frontend quality gate, and document environment-dependent remote/Docker Hub verification.
7. Keep changes limited to workflow files and hand off the prepared task for Human review; implementation approval remains the Human's move to Ready.
<!-- SECTION:PLAN:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: Analyst
created: 2026-08-10 13:12
---
Analysis exchange 1 (Analyst)

Repository findings:
- TASK-6 is To Do; title and Human-authored description are unchanged.
- TASK-4 is Done and already contains frontend/Dockerfile plus .github/workflows/deploy-static-website.yml for tag-triggered Docker Hub publication.
- The current deploy workflow runs frontend lint, typecheck, tests, and build before publishing, but TASK-6 requests separate CI and CD workflows.
- The frontend currently exposes lint, typecheck, test, and build scripts. No coverage script or configured coverage provider is present in frontend/package.json.
- No repository-level security scanner or security workflow is currently documented or present. The project guidance says optional SonarQube is not required without shared configuration and credentials.
- TASK-5 is Done and covers the Render service; this refinement will keep TASK-6 focused on GitHub Actions and Docker Hub unless the Human explicitly changes scope.

Questions for Human:
1. Should TASK-6 replace/rework TASK-4's existing deploy workflow, or should it add a separate CI workflow while retaining TASK-4's deploy workflow as the CD workflow? If TASK-4 is to be reworked, should its existing workflow be renamed/replaced rather than creating duplicate Docker publish workflows?
2. What should trigger CI: pull requests and pushes to the default branch, pushes to all branches, or a specified branch set? Should CI run on workflow dispatch?
3. The current frontend has no coverage command or provider. Should TASK-6 add coverage tooling and publish a coverage report/artifact, and if so is a minimum threshold required, or should CI run only the existing test command and explicitly record coverage/security as unavailable?
4. For CD, should the already-refined TASK-4 contract be retained: only x.y.z tag pushes whose tagged commit is contained in the matching a.b.x release branch, using DOCKERHUB_USERNAME/DOCKERHUB_TOKEN and publishing the release tag? Should the current latest tag also be published, or must CD publish only the exact release tag?
5. Should the separate CD workflow repeat the frontend quality checks before Docker build/push, or may it rely on the CI workflow's result?
---

author: Analyst
created: 2026-08-10 13:15
---
Analysis exchange 2 (Human answers and Analyst resolution)

Human answers:
- TASK-6 adds the CI pipeline and maintains TASK-4's CD pipeline; both workflows are renamed according to their roles.
- CI runs when a pull request targets the main branch.
- No new coverage, security, or other tooling is introduced now; only capabilities already present in the repository are used. Missing capabilities remain future work.
- CD keeps its current behavior and publishes both the release tag and latest.
- CD repeats the frontend checks before Docker build and publication.

Decisions and assumptions:
- Rename the existing deployment workflow to a CD role-based name and add a separate CI role-based workflow; do not create duplicate Docker publication workflows.
- CI scope is the currently existing frontend quality gate: npm ci, lint, typecheck, tests, and production build. No coverage provider or security scanner currently exists, so neither is added or represented as a new required check in this increment.
- CD retains TASK-4's existing release-tag and matching-release-branch guard, Docker Hub secret contract, Docker build, and publication behavior, including both the exact release tag and latest tag.
- Since no backend module or backend quality scripts currently exist, this increment does not invent backend checks.
- Workflow filenames are implementation details; the intended externally verifiable result is one clearly identified CI workflow and one clearly identified CD workflow with no ambiguous duplicate deploy workflow.
- No application code, Dockerfile behavior, Render configuration, SSL setup, backend framework, or new security/coverage infrastructure is part of TASK-6.

Remaining assumptions for Human review:
- The existing CD image identity and secret names from TASK-4 remain authoritative unless the Human changes TASK-4 or this task before implementation.
- GitHub Actions workflow naming/file renaming will preserve the existing CD behavior and history as far as the implementation permits.
---

author: @codex
created: 2026-08-10 13:20
---
Coder implementation evidence: on branch task-6-github-action-ci-cd, added .github/workflows/ci.yml for pull requests targeting main with npm ci, lint, typecheck, tests, and build; renamed the publication workflow to .github/workflows/cd.yml and preserved the x.y.z tag filter, matching a.b.x ancestry guard, frontend checks, Docker build, DOCKERHUB_USERNAME/DOCKERHUB_TOKEN login, current image identity emidio78/until-frontend, and release/latest tags. Static workflow inspection passed; npm ci, lint, typecheck, npm test (1 file, 2 tests), npm run build, and git diff --check passed. actionlint/yamllint are unavailable and Docker Desktop Linux daemon is unavailable, so remote Actions parsing and Docker Hub/publication verification remain environment-dependent.
---

author: @reviewer
created: 2026-08-10 13:24
---
Review report — TASK-6

Findings: None.

Verification performed:
- Confirmed TASK-6 is In Review and implementation evidence is recorded.
- Read the complete prepared task, AGENTS.md, operating model, project technology guidance, product constraints/vision, quality attributes, architecture, and full diff against origin/main.
- Confirmed the diff is limited to the role-based workflow changes and Backlog task metadata: deploy-static-website.yml renamed to cd.yml and ci.yml added; no application, backend, Dockerfile, Render, SSL, or unrelated files changed.
- Static inspection passed for CI pull requests targeting main, npm ci/lint/typecheck/test/build commands, explicit future-work coverage/security note, CD x.y.z tag filtering, matching a.b.x ancestry guard, repeated frontend checks, Docker build/push action, secret-based Docker Hub login, current image identity, exact release plus latest tags, and removal of the old publication workflow.
- git diff --check origin/main...HEAD passed; working tree is clean and branch tracks origin/task-6-github-action-ci-cd.
- Reviewed the recorded local quality-gate evidence: npm ci, lint, typecheck, npm test (1 file, 2 tests), and production build passed. Docker Desktop Linux daemon and actionlint/yamllint were unavailable, as already recorded; these remain environment-dependent verification limits rather than implementation findings.

No blocking issues or out-of-scope behavior were identified. Task status remains controlled by the Human; no status decision or merge was performed.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Implemented TASK-6 on branch task-6-github-action-ci-cd. Added .github/workflows/ci.yml with pull-request-to-main frontend quality checks (npm ci, lint, typecheck, tests, production build), and replaced deploy-static-website.yml with role-identified .github/workflows/cd.yml while preserving TASK-4's x.y.z tag filter, a.b.x release-branch ancestry guard, Docker Hub secrets, current image emidio78/until-frontend, and release/latest tags. Static workflow inspection passed; local npm ci, lint, typecheck, npm test (1 file, 2 tests), npm run build, and git diff --check passed. actionlint/yamllint and the Docker Desktop Linux daemon were unavailable, so GitHub Actions parser and Docker Hub publication remain environment-dependent. Acceptance criteria 1-7 and DoD 1-5 are checked with evidence recorded; DoD 6 remains unchecked because its prepared-text condition (To Do/unapproved) no longer applies after Human approval and implementation. No application, backend, Dockerfile, Render, SSL, or unrelated files were changed; no merge performed.
<!-- SECTION:FINAL_SUMMARY:END -->
