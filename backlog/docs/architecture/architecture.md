# Architecture

## Current baseline

`until` is an early-stage monorepo for a deadline-management web application. The target client is a TypeScript HTML5 React SPA/PWA using shadcn components. The target backend is Java using Quarkus or Spring Boot, with the final framework selected through a prepared task. Detailed domain, integration, persistence, and deployment boundaries remain intentionally incremental.

## Target direction

Architecture decisions will be introduced incrementally through prepared Backlog tasks and ADRs when significant. An optional SPEC may provide additional context. Each increment should keep the React presentation, backend API, deadline domain, integrations, and persistence separable enough to test independently where the selected design requires it. The monorepo should leave room for future microservices without prematurely splitting the current system.

## Current component responsibilities

- **React SPA/PWA:** planned web client, composed from HTML5, React, TypeScript, and shadcn.
- **Backend API:** planned Java application; Quarkus or Spring Boot requires explicit task refinement.
- **Integration adapters:** planned; external-service selection requires explicit task refinement and, when significant, an ADR.
- **Deadline domain model:** planned; deadline and progress semantics require glossary and SPEC decisions.
- **Persistence:** optional and planned; storage requirements require a task-specific decision.
- **Future service boundaries:** may be introduced as microservices after the modular monorepo baseline is validated.

## Architectural rules

- Do not introduce a framework, provider, persistence layer, or background service without explicit task refinement and Human approval; record significant decisions as ADRs.
- Record significant architectural choices as ADRs.
- Keep platform-specific behavior behind explicit boundaries when it is introduced.
- Keep frontend and backend contracts explicit and versionable within the monorepo.
- Prefer modular boundaries before independently deployable microservices; future decomposition must be justified by a prepared task.
- Validate architectural changes against the quality attributes document.

## Related diagrams

- [System context](context.mmd)
- [Container view](container.mmd)
- [ADR-001: Language](adr/ADR-001-language.md)
- [ADR-002: Architecture style](adr/ADR-002-architecture-style.md)
