---
name: implement-task
description: Act as the Coder to implement one Human-approved prepared Backlog task. An optional SPEC may provide additional context. Use after the Human explicitly invites implementation of a task in Ready.
---

# Implement task

Use this skill as the Coder only for implementation of a single Human-approved task.

## Preconditions

1. Confirm that the Human explicitly invited implementation or continuation and that the Backlog task is in `Ready` for initial work or `In Progress` for requested rework.
2. Treat the Human's manual move to `Ready` as approval of the preparation fields for initial work; a Human-requested return to `In Progress` authorizes only the commented rework scope. No separate SPEC approval is required.
3. Read `AGENTS.md`, `backlog/docs/operating-model.md`, the required project documents that exist, any optional linked SPEC, the complete task fields, dependencies, and relevant code and tests.
4. For initial work, create and switch to the dedicated task branch, then move the task to `In Progress` before implementation. For rework, verify and continue on the existing dedicated task branch.

If any precondition is missing or ambiguous, stop and report it. Do not implement speculatively.

## Workflow

1. Define the smallest implementation scope that satisfies the prepared task and any optional linked SPEC.
2. Implement only that scope, preserving unrelated behavior and files.
3. Add or update focused tests for the specified behavior and relevant failure cases.
4. Run the project’s applicable tests, lint, static analysis, and formatting checks.
5. Compare the result with the prepared task, analysis decisions, and any optional SPEC; investigate every mismatch.
6. Record commands, results, decisions, and completion evidence in the Backlog task using the project’s Backlog.md workflow.
7. Check acceptance criteria and Definition of Done items only after concrete verification.
8. Apply the common Definition of Done in `backlog/docs/operating-model.md`; treat task-specific DoD items as additional requirements only.
9. Complete the `Final Summary` field as structured Markdown using the required format below. Include the executed shell command list and the modified file list.
10. Commit all task changes with a task-identifying commit message, push the dedicated working branch to the remote, verify that the push succeeded, then move the task to `In Review` and report completion to the Human. If commit or push fails, do not move the task to `In Review`. Do not move it to `Done` or merge any branch; the Human verifies the handoff, invites the independent Reviewer, and controls the final status and any later merge decision.

## Boundaries

- Do not change requirements, acceptance criteria, or an optional SPEC silently.
- Do not combine unrelated tasks or modify unrelated files.
- If implementation reveals an out-of-scope requirement or ambiguous task preparation, stop and request clarification or follow-up work.
- Do not self-approve the implementation or replace the independent review.
- Do not merge branches. After reporting completion, do not modify the task status or repository history.

## Final Summary requirements

Write the Backlog `Final Summary` field as structured Markdown. It must be concise, reviewable, and evidence-based. Use this format:

```markdown
## Summary

- <what changed and why>

## Modified files

- `<project-relative/path>` — <purpose of the change>

## Shell commands executed

- `<exact command>` — <result>

## Verification

- <check or acceptance criterion> — <pass/fail and relevant evidence>

## Decisions and limitations

- <important implementation decision, warning, or unresolved limitation>
```

Requirements:

- Preserve the exact shell commands that were actually executed, including working-directory context when it affects interpretation.
- List every task-scoped modified, added, deleted, or renamed file. Exclude unrelated worktree changes.
- Record command outcomes and relevant warnings without claiming checks that were not run.
- Keep the content in English Markdown, even when the Human communicates in another language.
- Do not replace the structured sections with a prose-only paragraph.
- Do not expect common Definition of Done items to be duplicated in the task checklist; verify them from `backlog/docs/operating-model.md`.

## Completion output

Report the task identifier, branch, commit, pushed remote branch, files changed, checks run and results, completion evidence recorded, unresolved limitations, and that the task is in `In Review` awaiting Human verification. Ensure the Backlog `Final Summary` contains the required structured Markdown, exact shell command list, and modified file list. Explicitly state that no merge was performed.
