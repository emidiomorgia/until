---
id: TASK-2
title: Align agent prompts with current project directives
status: Done
assignee:
  - '@Emidio'
created_date: '2026-08-09 21:37'
updated_date: '2026-08-10 13:02'
labels:
  - documentation architecture
milestone: m-0
dependencies: []
priority: medium
type: docs
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review and update the Analyst, Coder, and Reviewer skill prompts so they explicitly follow the current until documentation and contain no obsolete technology or interface references.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 All three agent prompts contain no Rust, terminal, TUI, or meterm references.
- [x] #2 Each prompt directs the agent to consult the current operating model and relevant until project/product/technology/architecture documentation.
- [x] #3 The prompts are consistent with the TypeScript HTML5 React shadcn SPA/PWA, Java Quarkus or Spring Boot backend, monorepo, and future-microservices direction.
- [x] #4 Agent lifecycle boundaries remain consistent with the documented Human, Analyst, Coder, and Reviewer workflow.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Add explicit current-stack and documentation-reading directives to all three skills. 2. Preserve the documented lifecycle boundaries and role-specific prohibitions. 3. Scan the skills and project documentation for forbidden legacy references and verify consistency.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Validation: all three skill files explicitly reference the operating model and project technology guidance; all three include the current TypeScript HTML5 React shadcn SPA/PWA, Java Quarkus or Spring Boot, monorepo, and future-microservices direction. rg scans found no Rust, terminal, TUI, or meterm references in .agents or backlog/docs. git diff --check passed; no runtime test suite applies to these Markdown-only changes.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Aligned refine-spec, implement-task, and verify-increment with until's current documentation and stack directives. Added explicit project context and required documentation reads while preserving role boundaries and approval gates. Verified all forbidden-reference scans and formatting checks pass.
<!-- SECTION:FINAL_SUMMARY:END -->
