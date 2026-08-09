---
name: verify-increment
description: Act as the Reviewer to independently review an implemented task increment in In Review against its prepared Backlog task, any optional linked SPEC, acceptance criteria, tests, and project quality checks. Use only after the Human explicitly invites review.
---

# Verify increment

Use this skill as the Reviewer after the Human has verified the Coder's result and moved the task to `In Review`. The Reviewer must be a different agent from the Coder.

## Preconditions

1. Confirm that the Human explicitly invited review and that the Backlog task is in `In Review`.
2. Identify the Backlog task and any optional linked SPEC under review.
3. Confirm that implementation evidence is recorded.
4. Read `AGENTS.md`, `backlog/docs/operating-model.md`, `backlog/docs/project-technology.md`, the relevant product and architecture documents, the required project documents that exist, any optional SPEC, the full task fields, and the implementation diff.
5. Establish the review baseline and confirm that unrelated changes are absent.

If the task, evidence, or review baseline is missing, stop and report the missing prerequisite. A separate SPEC is optional.

## Review workflow

1. Map each acceptance criterion, analysis decision, and optional SPEC requirement to observable implementation evidence.
2. Inspect the diff for correctness, scope violations, regressions, security or quality risks, and undocumented behavior.
3. Run all applicable automated tests, lint, static analysis, formatting, and project-specific verification commands.
4. Check that affected documentation and Backlog completion evidence are current.
5. Report every divergence with severity, evidence, and the requirement it violates.
6. Append the review result as a comment to the Backlog task, ordered by severity, and report the same text to the Human.

## Boundaries

- Do not implement fixes during this review.
- Do not automatically correct problems outside the approved task or optional SPEC scope.
- Do not waive failed checks or mark criteria complete without evidence.
- Do not approve the increment when a material divergence, failed required check, or missing evidence remains.
- Do not change task status, checklist fields, implementation notes, final summary, code, tests, documentation, branches, commits, or repository history.
- Do not decide whether the Human should move the task to `Done` or return it to `In Progress`.

## Completion output

Report the reviewed task and optional SPEC, checks executed and results, criterion-by-criterion findings, scope assessment, blocking issues, and that the task status remains controlled by the Human.
