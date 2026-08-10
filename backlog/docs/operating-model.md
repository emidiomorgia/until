# Project operating model

This repository uses a four-actor, task-driven workflow managed through Backlog.md. Backlog.md provides the planning model: tasks, milestones, and task statuses. The workflow does not use sprints or iterations. A separate SPEC document is optional; the prepared task is the operative specification.

## Common Definition of Done

Backlog.md does not provide a repository-wide Definition of Done in this project's configuration. The following common Definition of Done therefore applies procedurally to every task and is not repeated in individual task checklists:

- The work remains within the approved task scope, dependencies are resolved, and unrelated changes are excluded.
- The implementation or documentation is reviewed against the task, its acceptance criteria, relevant decisions, and applicable project constraints.
- Applicable automated checks, focused tests, and required manual or browser verification are executed and pass; unavailable checks are recorded as limitations.
- A final diff and the task-scoped modified-file list are inspected, and affected documentation or configuration is updated.
- The task records objective evidence, decisions, warnings, limitations, and the exact shell commands executed.
- The Backlog `Final Summary` is structured English Markdown with `Summary`, `Modified files`, `Shell commands executed`, `Verification`, and `Decisions and limitations` sections.
- For implementation tasks, the dedicated branch is committed and pushed before the Coder hands the task to `In Review`; the Human controls final review, `Done`, and merge.

Task-specific `Definition of Done` items must contain only additional checks, outcomes, or evidence unique to that task. Do not repeat these common requirements in every task. During review, the common Definition of Done is always applied even when it is absent from the task's own checklist.

## Actors

### Human

The Human owns product intent, task planning, approval gates, review decisions, and repository integration.

- Writes task titles and descriptions.
- Decides the planning order and assigns tasks to milestones.
- Creates tasks in `To Do`.
- Invites the Analyst, Coder, and Reviewer at the relevant stages.
- Approves implementation readiness by moving the prepared task to `Ready`.
- Verifies the Coder's result and decides whether to keep it in `In Review` for independent review, or returns it to `In Progress` with comments.
- After Reviewer feedback, moves the task to `Done` and merges the repository, or returns it to `In Progress` with comments and invites the Coder again.

### Analyst

The Analyst refines a Human-authored task after being explicitly invited.

- Reads the relevant product, architecture, quality, optional SPEC, and task context.
- Identifies ambiguities, missing dependencies, risks, and scope boundaries.
- Adds or updates `Acceptance Criteria`, task-specific `Definition of Done`, and `Implementation Plan` through the Backlog.md workflow. The common Definition of Done is implicit and must not be copied into the task.
- Reports the analysis to the Human.
- Does not modify the task title or description, implement code, approve implementation readiness, or move the task to `Ready`.
- Interviews the Human whenever business intent, scope, behavior, edge cases, or constraints are missing; records each refinement of the questions and answers in one cumulative analysis comment on the task.

### Coder

The Coder implements a task after the Human has approved its analysis.

- Starts initially only when the task is `Ready` and the Human explicitly invites implementation. If the Human returns the task to `In Progress` with comments, the Coder may continue on the existing task branch only after a new explicit invitation.
- Creates and switches to the dedicated task branch, then moves the task to `In Progress`.
- Implements only the approved task scope and any optional linked SPEC.
- Runs required checks and records implementation evidence in the task.
- Reports completion to the Human.
- Commits all task changes with a task-identifying commit message and pushes the dedicated working branch to the remote before moving the task to `In Review`.
- Moves the task to `In Review` only after the commit and push succeed and all implementation checks and task evidence are complete.
- Does not move the task to `Done` or merge branches; the Coder's handoff ends with the committed, pushed branch, and the Human controls review and any later merge decision.

### Reviewer

The Reviewer independently verifies the Coder's increment after the Human has accepted it for review.

- Starts only when the task is `In Review` and the Human explicitly invites review.
- Must be a different agent from the Coder for that increment.
- Compares the diff with the prepared task, any optional linked SPEC, acceptance criteria, Definition of Done, and project documentation.
- Runs only read-only inspections and verification commands.
- Adds the review result as a comment on the Backlog task.
- Does not modify code, tests, documentation, task fields, checklists, status, branches, commits, or repository history.
- Does not decide whether the task becomes `Done` or returns to `In Progress`.

## Status pipeline

```text
Human creates task          -> To Do
Human invites Analyst       -> To Do (analysis and interview)
Human reviews preparation  -> Ready
Human invites Coder        -> In Progress
Coder commits and pushes   -> In Review (awaiting Human verification)
Human requests Coder work  -> In Progress
Human invites Reviewer     -> In Review
Human accepts review       -> Done, then Human merges
Human rejects review       -> In Progress, then Human invites Coder
```

The Coder performs the implementation handoff transition to `In Review` after completing all checks and recording evidence. The Human verifies the handoff and explicitly invites the independent Reviewer. The Reviewer does not perform any status transition; the Human makes the final decision after reading the review comment.

## Approval semantics

The Analyst does not wait for a separate SPEC approval. Refinement enriches the task directly while it remains `To Do`. The Human's manual move to `Ready` is the authoritative approval of the prepared task for implementation; a separate SPEC is optional.

## Review comment

The Reviewer records findings in a Backlog.md task comment, ordered by severity. A review comment must identify the violated requirement, evidence, impact, and any required follow-up. The Human decides whether to move the task to `Done` or return it to `In Progress`.
