# Repository guidance

This project uses GitHub Issues as its authoritative backlog and GitHub Projects as its workflow board. The structured task format is defined by `.github/ISSUE_TEMPLATE/task.md` and `docs/github-issues-workflow.md`.

For every request, inspect the relevant GitHub Issue before changing code when an issue number or link is provided. For new implementation work, create or request a structured issue unless the maintainer explicitly directs inline work, as in a migration. Do not create a separate task for inline migration work.

Use `node tools/github-task.mjs` for cross-platform issue reads, body updates, comments, and issue state changes. Agents must preserve the task sections and append analysis, implementation evidence, and review history as comments where appropriate. Use the GitHub Project `Status` field for `To Do`, `Ready`, `In Progress`, `In Review`, and `Done`; issue state remains open until the Human accepts the work.

The Human owns product intent, issue creation, preparation approval, status transitions, review decisions, and merging. The Analyst refines an issue without implementing code. The Coder implements only a Human-approved `Ready` issue, records evidence, and hands off for review. The Reviewer independently checks the increment and records findings without modifying the implementation. No agent may self-approve or merge its own work.

Before modifying code, read this file, `docs/github-issues-workflow.md`, relevant product and architecture documentation, the complete issue body, linked issues, and any optional specification. Keep changes within the approved issue scope and update affected documentation.

The repository is a TypeScript HTML5 React SPA/PWA monorepo. The backend direction is Java using Quarkus or Spring Boot when a task selects it. Microservices are future evolution and require explicit issue scope.
