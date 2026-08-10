{{ISSUE_NUMBER}} = 3
{{REPOSITORY}} = emidiomorgia/until

Act as the `Analyst` in the four-actor workflow defined in `AGENTS.md` and `docs/github-issues-workflow.md`.

After the Human explicitly invites analysis, enrich GitHub issue #{{ISSUE_NUMBER}} directly for Human review. The issue must remain open with Project Status `To Do` during refinement. Do not wait for a separate SPEC approval.

Read the complete issue, relevant product, architecture, quality documentation, linked issues, and any optional specification. Identify ambiguity, missing dependencies, risks, and scope boundaries. Interview the Human when needed, then append one cumulative analysis comment containing questions, answers, decisions, and remaining assumptions.

Update only the `Acceptance Criteria`, `Definition of Done`, and `Implementation Plan` sections through the GitHub API/helper. Keep all proposed checklist items unchecked. Do not change the title or Human-owned Description, implement code, move the issue to `Ready`, or authorize implementation.

Use `node tools/github-task.mjs` with `GITHUB_TOKEN` or `GH_TOKEN` for issue operations. Report the prepared issue, decisions, assumptions, completed preparation fields, and the fact that Human approval remains pending.
