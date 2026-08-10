# ADR-002: Evolve through focused boundary-oriented increments

- **Status:** Accepted
- **Date:** 2026-07-25

## Context

The repository is an early-stage TypeScript and Java monorepo. The deadline domain, integrations, backend framework, persistence, and deployment topology are not yet fully selected. Prematurely fixing a complete architecture would create assumptions before product requirements are refined.

## Decision

Evolve the architecture through small, prepared and Human-approved increments. When deadline behavior is introduced, keep integrations, domain behavior, the Java API, and the React SPA/PWA behind explicit boundaries appropriate to the selected design. Prefer modular monorepo boundaries before considering future microservices.

## Consequences

- Each architectural change is tied to a prepared Backlog task; significant decisions are recorded in an ADR. A separate SPEC is optional.
- Significant decisions are recorded as ADRs.
- The project avoids committing to an unneeded framework or integration too early.
- Some boundaries may remain provisional until product requirements are known.
