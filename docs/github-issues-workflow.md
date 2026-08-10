# GitHub Issues workflow

GitHub Issues are the authoritative task system for this repository. GitHub Projects provide the workflow board; repository documentation, issue templates, and agent skills define the operating model.

## Task structure

Create implementation work from the `Implementation task` issue template. The issue body preserves the structured task format:

- `Description` — Human-owned intent and scope.
- `Acceptance Criteria` — measurable, unchecked requirements before implementation.
- `Definition of Done` — verification and handoff requirements.
- `Implementation Plan` — Analyst-owned preparation.
- `Dependencies` — blocking, parent, or related issues.
- `Implementation Notes` — Coder-owned evidence and limitations.
- `Final Summary` — Coder-owned handoff summary.

Analyst interviews and Reviewer reports are cumulative comments on the issue. Do not rewrite history to hide earlier decisions.

## Status mapping

Use the Project `Status` field for the five-stage workflow. Issue state is `open` until the Human accepts the increment, then `closed` for `Done`.

| Project status | Issue state | Meaning |
| --- | --- | --- |
| To Do | open | Human-authored task awaiting refinement |
| Ready | open | Human approved preparation for implementation |
| In Progress | open | Coder is implementing or addressing requested rework |
| In Review | open | Coder handoff is complete and Reviewer is invited |
| Done | closed | Human accepted the review and completed integration |

The Human owns status transitions and merge decisions. Agents may report the required transition, but must not self-approve or merge their own work.

## Cross-platform helper

Use `node tools/github-task.mjs` for issue body, issue comment, and open/close operations. It requires Node.js 18+ and `GITHUB_TOKEN` or `GH_TOKEN`; `GITHUB_REPOSITORY` can provide the repository name. The helper uses the GitHub REST API and does not depend on PowerShell or Bash.

Project field updates may use the GitHub UI, GitHub CLI, or the Projects GraphQL/API surface when the Project ID, item ID, Status field ID, and option ID are available.
