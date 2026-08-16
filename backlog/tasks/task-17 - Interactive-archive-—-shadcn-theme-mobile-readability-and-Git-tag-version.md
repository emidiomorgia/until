---
id: TASK-17
title: 'Interactive archive — shadcn theme, mobile readability, and Git-tag version'
status: Done
assignee: []
created_date: '2026-08-13 22:27'
updated_date: '2026-08-16 20:59'
labels:
  - Sprint1
milestone: m-0
dependencies: []
references:
  - 'https://ui.shadcn.com/docs/theming'
modified_files:
  - .github/workflows/cd.yml
  - frontend/Dockerfile
  - frontend/components.json
  - frontend/src/index.css
  - frontend/src/components/app-sidebar.tsx
  - frontend/src/components/timer-list.tsx
  - frontend/src/app.router.test.tsx
type: task
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Historical archive of a completed Interactive execution requested by the Human. The execution covered three related frontend improvements on the dedicated branch feature/theme-refinement:

1. Change shadcn theme to Style=Luma, Base Color=Neutral, Theme=Emerald, Chart Color=Emerald.
2. Improve mobile Android readability while preserving desktop density.
3. Display the release version in the drawer from the Git release tag.

Interactive workflow was used instead of Backlog for active planning and implementation. The Human approved the shared understanding, approved the technical plans, authorized autonomous completion, and finally confirmed closure.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The shadcn configuration and CSS tokens reflect Luma, Neutral, Emerald, and Emerald chart settings.
- [x] #2 The mobile app uses larger readable typography without changing desktop typography or introducing horizontal overflow.
- [x] #3 The drawer displays the injected release tag and uses dev as the local/test fallback.
- [x] #4 Automated quality checks and browser verification pass with evidence recorded.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Chronological execution record

### Human request and approvals

- Human requested: change shadcn theme to Style=Luma, Base Color=Neutral, Theme=Emerald, Chart Color=Emerald.
- Agent ran `backlog instructions overview`, inspected repository guidance, frontend configuration, CSS tokens, and worktree status. Branch was `feature/theme-refinement`; unrelated changes were preserved.
- Agent presented shared understanding and acceptance criteria. Human confirmed.
- Agent proposed the theme plan. Human authorized completion through the end.

### Theme implementation

- Updated `frontend/components.json` from `base-nova` to `luma`; retained `baseColor: neutral` and CSS variables.
- Updated `frontend/src/index.css` with Emerald primary, sidebar, ring, and chart tokens for light and dark modes; changed root color/background to semantic tokens.
- Consulted official shadcn theming guidance: https://ui.shadcn.com/docs/theming
- Browser verification confirmed the app primary and chart tokens resolved to Emerald values.

### Mobile readability request and approvals

- Human reported that the Android mobile UI appeared smaller than traditional Android apps.
- Agent inspected typography classes and identified compact `text-xs`, `text-sm`, and approximately 11px label tokens.
- Agent presented a mobile-only plan. Human approved and authorized autonomous completion.

### Mobile implementation

- Added scoped mobile rules in `frontend/src/index.css` under `.app-shell`: `text-sm` becomes 16px/24px and `text-xs` becomes 14px/20px below 768px.
- Updated timer-card compact labels in `frontend/src/components/timer-list.tsx` to use the mobile-readable `text-xs` token and preserve the compact `md:text-[0.68rem]` desktop presentation.
- Browser verification at 394x852 confirmed 16px/14px text and no horizontal overflow. Verification at 1280x900 confirmed desktop values remained 14px/12px and no horizontal overflow.

### Release version request and approvals

- Human asked whether the drawer version came from the tag. Agent inspected `frontend/src/components/app-sidebar.tsx` and `.github/workflows/cd.yml` and confirmed the old `0.1` value was static; Git tags were only used for Docker image tags.
- Agent proposed build-time injection from the Git tag, with `dev` fallback locally. Human confirmed and authorized autonomous completion.

### Release version implementation

- Added `ARG APP_VERSION=dev` and `ENV VITE_APP_VERSION=$APP_VERSION` to `frontend/Dockerfile` before the Vite build.
- Added `APP_VERSION=${{ github.ref_name }}` to the Docker Buildx step in `.github/workflows/cd.yml`.
- Updated `frontend/src/components/app-sidebar.tsx` to show `Version {appVersion}`, using `import.meta.env.VITE_APP_VERSION || 'dev'`.
- Added `Version dev` assertion to `frontend/src/app.router.test.tsx`.
- Explicit build with `VITE_APP_VERSION=1.2.3` succeeded and the generated bundle contained `1.2.3`.

### Human closure

- Agent provided the final changelog, modified-file list, verification evidence, decisions, warnings, and limitations.
- Human confirmed closure.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary
Completed the Human-approved Interactive execution for the shadcn Emerald theme, mobile typography improvement, and release-tag version display. The release version is injected at Docker/Vite build time, while local and test builds use `dev`.

## Modified files
- `.github/workflows/cd.yml` — passes the Git release tag as `APP_VERSION` to Docker Buildx.
- `frontend/Dockerfile` — exposes `APP_VERSION` to Vite as `VITE_APP_VERSION`.
- `frontend/components.json` — sets shadcn style to `luma`, retaining Neutral base color.
- `frontend/src/index.css` — Emerald theme tokens and scoped mobile typography rules.
- `frontend/src/components/app-sidebar.tsx` — displays the injected version with a `dev` fallback.
- `frontend/src/components/timer-list.tsx` — improves mobile timer-card label sizes while preserving desktop sizing.
- `frontend/src/app.router.test.tsx` — verifies the local `Version dev` fallback.

## Shell commands executed
- `backlog instructions overview`
- `backlog instructions task-creation`
- `backlog instructions task-finalization`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `$env:VITE_APP_VERSION='1.2.3'; npm run build`
- `rg -o '1\\.2\\.3' dist/assets`
- `git diff --check`
- Browser/DOM verification at 394x852 and 1280x900 with viewport reset afterward.

## Verification
- Lint passed with only existing Fast Refresh warnings.
- Typecheck passed.
- All 8 test files and 43 tests passed.
- Production build passed; Vite emitted only existing `__dirname` and chunk-size warnings.
- Mobile computed typography was 16px for `text-sm` and 14px for `text-xs`; no horizontal overflow.
- Desktop computed typography remained 14px and 12px; no horizontal overflow.
- Build with version `1.2.3` produced a bundle containing `1.2.3`.
- `git diff --check` passed.

## Decisions and limitations
- Versioning is build-time and does not require runtime access to GitHub or Git metadata.
- Release tags remain constrained by the existing CD validation to `x.y.z`.
- No backend, runtime behavior, routing, or unrelated UI behavior was changed.
- Existing lint/Vite/chunk-size warnings remain non-blocking and unrelated to this increment.
<!-- SECTION:FINAL_SUMMARY:END -->
