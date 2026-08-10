# Project operating model

This repository uses a four-actor, task-driven workflow managed through GitHub Issues and GitHub Projects. Issues provide the task specification and comments; the Project provides status and planning views. A separate SPEC document is optional; the prepared issue is the operative specification.

## Actors

### Human

The Human owns product intent, planning, approval gates, review decisions, status transitions, and repository integration.

- Writes issue titles and Human-owned descriptions.
- Decides planning order and assigns issues to milestones or Project views.
- Creates issues with Project Status `To Do`.
- Invites the Analyst, Coder, and Reviewer at the relevant stages.
- Approves implementation readiness by moving the issue to Project Status `Ready`.
- After Reviewer feedback, closes accepted issues as `Done` and merges, or returns them to `In Progress` with comments.

### Analyst

The Analyst refines a Human-authored issue after explicit invitation.

- Reads relevant product, architecture, quality, optional SPEC, and issue context.
- Identifies ambiguities, missing dependencies, risks, and scope boundaries.
- Adds or updates `Acceptance Criteria`, `Definition of Done`, and `Implementation Plan` in the issue body.
- Records interview questions, answers, decisions, and assumptions in cumulative issue comments.
- Does not change the title or Human-owned description, implement code, approve readiness, or move the issue to `Ready`.

### Coder

The Coder implements an issue after Human approval.

- Starts initially only when the issue is `Ready` and the Human explicitly invites implementation.
- Creates a dedicated task branch for ordinary issue work, then moves the issue to `In Progress`.
- Implements only the approved issue scope and optional linked SPEC.
- Runs required checks and records evidence in the issue.
- Commits and pushes before handing off with Project Status `In Review`.
- Does not close issues or merge branches.

### Reviewer

The Reviewer independently verifies the Coder's increment.

- Starts only when the issue is `In Review` and the Human explicitly invites review.
- Must be a different agent from the Coder for that increment.
- Compares the diff with the issue, optional SPEC, acceptance criteria, Definition of Done, and project documentation.
- Runs read-only verification and adds findings as an issue comment.
- Does not modify implementation, issue fields, checklists, status, branches, commits, or repository history.

## Status pipeline

```text
Human creates issue        -> To Do
Human invites Analyst      -> To Do (analysis and interview)
Human reviews preparation  -> Ready
Human invites Coder        -> In Progress
Coder commits and pushes   -> In Review (awaiting Human verification)
Human requests Coder work -> In Progress
Human invites Reviewer     -> In Review
Human accepts review      -> Done/closed, then Human merges
Human rejects review      -> In Progress, then Human invites Coder
```

The Project `Status` field represents the five workflow states. Issue state remains open until the Human accepts the increment; `Done` closes the issue.

## Approval semantics

The Analyst does not wait for separate SPEC approval. Refinement enriches the issue while it remains `To Do`. The Human's move to Project Status `Ready` is the authoritative implementation approval.

## Review comment

The Reviewer records findings in an issue comment, ordered by severity. Each finding identifies the violated requirement, evidence, impact, and required follow-up. The Human decides whether to close the issue as `Done` or return it to `In Progress`.
