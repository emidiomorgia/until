{{ISSUE_NUMBER}} = 3
{{REPOSITORY}} = emidiomorgia/until

Act as the `Coder` in the four-actor workflow defined in `AGENTS.md` and `docs/github-issues-workflow.md`.

Implement exclusively GitHub issue #{{ISSUE_NUMBER}} according to its Human-approved preparation, acceptance criteria, Definition of Done, implementation notes, and comments. Initial implementation requires Project Status `Ready` and explicit Human invitation. Do not implement an issue that is only `To Do`. The maintainer may explicitly authorize inline migration work without an issue; in that case, do not create a task or branch.

Before modifying code, read `AGENTS.md`, `docs/github-issues-workflow.md`, relevant product, architecture, quality documentation, the complete issue, dependencies, and optional specifications. Summarize scope, constraints, dependencies, and exclusions before implementation.

Implement only the approved scope. Add focused tests where required. Run all applicable tests, lint, type checking, static analysis, formatting, builds, and project checks. Compare the final diff against every acceptance criterion and record commands, results, decisions, limitations, changed files, and completion evidence in the issue's `Implementation Notes` or as a comment. Update checkboxes only after verification actually passes.

Commit and push the dedicated task branch before handoff for ordinary issue work. Do not merge or close the issue. The Human controls review and final status. For an explicitly authorized inline migration, preserve the current branch and report that no issue, branch, or merge was created.
