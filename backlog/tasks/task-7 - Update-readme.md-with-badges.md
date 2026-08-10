---
id: TASK-7
title: Update readme.md with badges
status: In Review
assignee:
  - '@codex'
created_date: '2026-08-10 13:39'
updated_date: '2026-08-10 13:48'
labels: []
milestone: m-0
dependencies: []
priority: high
type: feature
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update Readme.md showing real badges with info taken from CI and CD pipelines. For example show the tests passed status, security, quality (if present), and deployed version. Add a table with services list (for now only frontend) and with a summary of test passed, version deployed and a small summary.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 README.md contains a working GitHub Actions status badge for the existing CI workflow .github/workflows/ci.yml, labeled for the CI frontend quality gate and linking to its workflow page.
- [x] #2 README.md contains a working GitHub Actions status badge for the existing CD workflow .github/workflows/cd.yml, labeled for frontend image publication and linking to its workflow page.
- [x] #3 README.md contains a deployed-version badge or equivalent live reference backed by the Docker Hub image emidio78/until-frontend and configured to show the latest semver x.y.z release tag, linked to the image's Docker Hub tags page.
- [x] #4 README.md contains a services table with exactly one current service row for frontend, including the public URL https://until.morgia.info, CI/CD status references, deployed-version reference, and a concise service summary.
- [x] #5 README.md does not add badges or claims for coverage, security scanning, SonarQube, or other analysis capabilities that are not configured in the repository.
- [x] #6 The README changes preserve the existing product, installation, usage, contribution, and license information without changing application or deployment behavior.
- [x] #7 All added badge images and links use stable, externally verifiable URLs for the repository workflows, Docker Hub image, or frontend service; no credentials or generated badge service is added to the repository.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Only README.md is modified; workflow files, application code, Dockerfile, deployment configuration, and unrelated documentation remain unchanged.
- [x] #2 The CI and CD badge URLs reference the existing workflow files and repository emidiomorgia/until.
- [x] #3 The deployed-version reference uses Docker Hub image emidio78/until-frontend and a semver-sorted version source rather than presenting the mutable latest tag as the release version.
- [x] #4 The services table and badge links are statically inspected for the exact frontend URL, workflow paths, Docker Hub image identity, and absence of unavailable coverage/security claims.
- [x] #5 Markdown formatting and the final diff pass git diff --check; link/badge availability is checked where network access permits and any limitation is recorded in the task.
- [x] #6 No automated application test changes are required because the increment is README-only; the existing frontend quality gate remains unaffected.
- [ ] #7 All proposed acceptance criteria and Definition of Done items remain unchecked, and TASK-7 remains To Do pending Human approval.
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect the current README structure, existing workflow names/paths, Docker Hub image identity, and public frontend URL to choose stable badge and link targets.

2. Add native GitHub Actions CI and CD workflow badges without changing workflow configuration.

3. Add a Docker Hub-backed semver deployed-version badge or equivalent live reference linked to the image tags page.

4. Add the single-row frontend services table with service URL, CI/CD status references, deployed version, and concise summary while preserving existing README content.

5. Statically inspect the resulting Markdown and exact external references, run git diff --check, and validate links/badges where network access permits.

6. Record verification evidence and any external badge/link availability limitations in TASK-7; keep the task in To Do for Human approval.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Coder implementation evidence: updated README.md only with CI and CD workflow badges, Docker Hub semver deployed-version badge for emidio78/until-frontend, and a one-row frontend services table linking https://until.morgia.info. No workflow, application, Dockerfile, deployment, or unrelated documentation files changed.

Verification evidence: static README inspection passed for ci.yml, cd.yml, Docker Hub image identity, semver sorting, public URL, one frontend row, and absence of coverage/security/SonarQube claims. git diff --check passed. HTTP HEAD checks returned 200 for the CI workflow page, CD workflow page, Docker Hub tags page, public frontend URL, and Shields Docker version badge. Docker Hub API returned semver tag 0.1.6 as the current highest release tag. No application test changes were required because this increment is README-only.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: @analyst
created: 2026-08-10 13:40
---
Analysis exchange 1 (Analyst)

Repository findings:
- TASK-7 is To Do and has no existing Acceptance Criteria, Definition of Done, Implementation Plan, dependencies, or linked SPEC.
- The repository currently has active CI workflow `CI - Frontend quality gate` and CD workflow `CD - Publish frontend image`.
- The CI workflow does not provide coverage or security analysis; the task description says to show those only if present.
- The CD workflow publishes the frontend Docker image with release and latest tags; TASK-5 provides the Render deployment context but does not define a README version source.

Questions for Human:
1. Which deployment source should the README's deployed-version badge/table use: the Docker Hub release/latest image from CD, the Render service from TASK-5, or a GitHub release/tag? If more than one exists, which is authoritative?
2. For CI, should README show one workflow-status badge for the frontend quality gate, and should CD have its own workflow-status badge? Should the table show the latest successful test/build status, or only link to the workflow?
3. No coverage, security scanner, or SonarQube check is configured. Should README omit those badges entirely, or show explicit `not configured`/future-work entries? The default recommendation is to omit non-existent badges and document their absence in the task.
4. For the services table, should the current scope contain exactly one row (`frontend`), with columns for service, deployment target/URL, CI status, deployed version, and summary? Please provide the production URL if it should be linked.
5. Should the README badges use only native GitHub Actions badge URLs and repository links, with no Docker Hub/Render API calls or generated badge infrastructure?

Current assumptions pending Human answers:
- The implementation remains README-only; no workflow, application, deployment, or badge-service changes are implied.
- Any badge must resolve to an existing repository/workflow or documented deployment source and must not claim unavailable coverage/security quality.
- The frontend is the only service row for this increment; backend rows remain future work.
---

author: @analyst
created: 2026-08-10 13:43
---
Analysis exchange 2 (Analyst)

Human answers:
- The deployed version source is the latest semver tag matching x.y.z that was pushed and published to Docker Hub.
- README should show both CI and CD workflow badges.
- Coverage and security badges are omitted for now because no configured providers exist.
- The public frontend URL is https://until.morgia.info.
- The services table contains exactly one current row: frontend.

Decisions and resolved scope:
- Use the existing CI workflow `.github/workflows/ci.yml` and CD workflow `.github/workflows/cd.yml` as the badge sources.
- Use the configured Docker Hub image `emidio78/until-frontend` as the deployed-version source; the README must show a semver release version, not claim coverage/security results that do not exist.
- Add a frontend service row with its public URL, CI/CD status references, deployed version reference, and a short service summary.
- Keep the implementation limited to `README.md`; do not modify workflows, application code, deployment configuration, or add badge infrastructure.

Remaining assumptions:
- The deployed-version badge may use a maintained external badge endpoint backed by Docker Hub, linked to the Docker Hub tags page, because Markdown cannot directly query Docker Hub without such an endpoint.
- The README will describe the frontend as the only currently implemented service; backend entries remain future work.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Implemented TASK-7 on branch task-7-readme-badges. Updated README.md only with live CI and CD workflow badges, a semver-sorted Docker Hub deployed-version badge for emidio78/until-frontend, and a single frontend services table linking https://until.morgia.info. Preserved the existing README content and made no workflow or application changes. Static reference checks and git diff --check passed; HTTP checks returned 200 for the workflow pages, Docker Hub tags page, public site, and Shields badge; Docker Hub API identified 0.1.6 as the current highest semver tag. Acceptance criteria 1-7 and DoD 1-6 are checked with evidence recorded; DoD 7 remains unchecked because its prepared-text condition conflicts with the approved implementation status. No merge performed.
<!-- SECTION:FINAL_SUMMARY:END -->
