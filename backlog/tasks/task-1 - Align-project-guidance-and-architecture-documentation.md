---
id: TASK-1
title: Align project guidance and architecture documentation
status: Done
assignee:
  - '@Emidio'
created_date: '2026-08-09 21:29'
updated_date: '2026-08-09 21:33'
labels:
  - architecture documentation
dependencies: []
priority: high
type: docs
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Remove obsolete Rust, meterm, and Rust terminal UI references from .agents skills and backlog documentation. Update the project guidance to describe until as a TypeScript web SPA/PWA using HTML5, React, and shadcn for the frontend, Java with Quarkus or Spring Boot for the backend, and a monorepo that can evolve toward microservices.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 No Rust programming-language or Rust architecture references remain in the in-scope .agents and backlog documentation.
- [x] #2 No meterm references remain in the in-scope .agents and backlog documentation.
- [x] #3 No terminal UI in Rust references or architecture records/guidelines remain.
- [x] #4 The replacement guidance consistently identifies until as a TypeScript HTML5 React shadcn web SPA/PWA with a Java Quarkus or Spring Boot backend.
- [x] #5 The documentation states the repository is a monorepo and positions microservices as future evolution, not current implementation.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inventory all .agents skills and backlog documentation for Rust, meterm, terminal UI, and obsolete architecture guidance. 2. Update affected skill and documentation sources to describe until as a TypeScript HTML5 React shadcn SPA/PWA in a monorepo with a Java Quarkus or Spring Boot backend and future microservices. 3. Scan all in-scope files for forbidden legacy references and verify consistency. 4. Run relevant project checks and finalize TASK-1 with evidence.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Updated all affected backlog documentation and confirmed the reusable .agents skills contained no legacy stack references. Validation: rg -n -i 'rust|meterm|terminal|tui' .agents backlog/docs returned no matches; git diff --check passed; no application source or test files exist in the repository, so no runtime test suite was available.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Replaced obsolete project guidance with until's TypeScript HTML5 React shadcn SPA/PWA and Java Quarkus or Spring Boot backend direction. Updated product, architecture, ADR, quality, technology, glossary, persona, and current-state documentation to establish the monorepo and defer microservices as future evolution. Verified with a clean forbidden-reference scan and git diff --check.
<!-- SECTION:FINAL_SUMMARY:END -->
