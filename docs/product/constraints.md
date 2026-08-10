# Product constraints

## Current constraints

- The frontend is a TypeScript HTML5 React SPA/PWA using shadcn.
- The backend is Java using Quarkus or Spring Boot; the framework must be selected through task refinement.
- The repository is a monorepo. Microservices are a possible future evolution, not a current constraint.
- Work is managed through GitHub Issues and GitHub Projects.
- The operating pipeline has four actors: Human, Analyst, Coder, and Reviewer.
- Implementation requires a prepared Issue manually approved by the Human through Project Status `Ready`; a separate SPEC is optional.
- One task is implemented at a time on a dedicated branch or worktree.
- A separate agent performs the final increment review.
- Human controls task status transitions after Analyst preparation, Coder implementation, and Reviewer feedback.

## Quality constraints

- Changes must include appropriate automated verification.
- User-visible behavior must be documented in the task preparation fields; an optional SPEC may provide additional context.
- The implementation must not introduce unrelated file changes.
- External service assumptions, credentials, quotas, and failure behavior must be specified before implementation.

## Decision rule

When a proposed change conflicts with a constraint, record the conflict and obtain an explicit Human decision through the task refinement interview before implementation.
