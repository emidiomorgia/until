# ADR-001: Use TypeScript and Java as implementation languages

- **Status:** Accepted
- **Date:** 2026-07-25

## Context

The project needs a maintainable browser application and backend that can be developed together in a monorepo. The frontend requires a typed language suited to React and PWA delivery, while the backend requires a typed server-side language with mature web frameworks.

## Decision

Use TypeScript for the HTML5 React SPA/PWA and Java for the backend. The backend framework will be Quarkus or Spring Boot, selected by a subsequent prepared task. Keep the initial system modular in the monorepo; defer microservice decomposition until justified by product and operational needs.

## Consequences

- Frontend tooling provides type checking, linting, testing, and production PWA builds.
- Java provides a strongly typed backend ecosystem with established testing and observability options.
- Contributors must have access to the configured Node.js package manager and supported JDK.
- The Quarkus or Spring Boot choice, API contracts, persistence, and external integrations will be selected separately through prepared tasks and ADRs when needed.
