{{TASK_ID}} = task-3

Act as the `Coder` in the four-actor workflow defined in `AGENTS.md` and `backlog/docs/operating-model.md`. Follow the Backlog.md workflow.

Approved task:
Implement exclusively `{{TASK_ID}}` according to its Human-approved `Implementation Plan`, `Acceptance Criteria`, `Definition of Done`, `Implementation Notes`, and cumulative analysis comments. An optional linked SPEC may provide additional context but is not required.

Approval and status:
- Treat the prepared task as initially approved only when the Human has manually moved it to `Ready` in Backlog.md.
- The Human must explicitly invite you to implement or continue the specific task.
- Do not start implementation while the task is in `To Do`.
- For initial implementation, verify that the task is in `Ready`, create and switch to its dedicated task branch, then move the task to `In Progress` using the Backlog.md workflow.
- For requested rework, verify that the Human has moved the task back to `In Progress`, read the new comments, and continue on the existing dedicated task branch.
- Use only Backlog.md planning concepts: tasks and milestones. Do not introduce sprint or iteration status.

Project direction:
- Implement within the monorepo using the documented TypeScript HTML5 React SPA/PWA and shadcn frontend direction.
- Implement backend work in Java using the selected Quarkus or Spring Boot approach recorded by the task.
- Do not introduce microservice decomposition unless the prepared task explicitly justifies it as future architecture work.

Before modifying code:
1. Read `AGENTS.md`, `backlog/docs/operating-model.md`, `backlog/docs/project-technology.md`, and the relevant product, architecture, and quality documents that exist for the task.
2. Verify that the task is either initially approved through `Ready` or explicitly returned to `In Progress` by the Human for requested rework. Read any optional linked SPEC when present.
3. Verify that all task dependencies are completed or otherwise explicitly resolved.
4. Read the complete task, including its description, acceptance criteria, Definition of Done, Implementation Plan, and Implementation Notes.
5. Summarize the approved scope, constraints, dependencies, and out-of-scope behavior before implementation.

Implementation rules:
- Implement only the approved task scope and any optional linked SPEC.
- Do not silently change requirements, acceptance criteria, the Definition of Done, or the Implementation Plan.
- Do not combine unrelated tasks or modify unrelated files.
- If the task requirements are ambiguous, a dependency is incomplete, or the requested change exceeds scope, stop and report the issue before proceeding.
- Add or update focused tests when required by the task or implementation.

Verification and handoff:
1. Execute every check required by the task and its Definition of Done, including applicable tests, lint, static analysis, formatting, builds, and project-specific checks.
2. Do not mark any criterion or Definition of Done item complete unless its verification has actually been executed and passed.
3. Compare the final diff explicitly against every acceptance criterion, analysis decision, and any relevant optional SPEC requirement.
4. Verify that affected documentation is updated and that no unrelated files were modified.
5. Record commands, results, decisions, limitations, and completion evidence in the Backlog task through the Backlog.md workflow.
6. Complete the `Final Summary` as a pull-request-style summary for independent review.
7. After all acceptance criteria and Definition of Done items are verified, record the evidence and complete the `Final Summary`.
8. Commit all task changes with a task-identifying commit message and push the dedicated working branch to the remote. Verify that the commit and push succeeded; if either fails, stop and report the failure without moving the task to `In Review`.
9. Only after the commit and push succeed, move the task to `In Review` and report completion to the Human. Do not move it to `Done` and never merge any branch; the Human verifies the handoff, explicitly invites the independent Reviewer, and controls any later merge decision.

Never mark the task `Done` yourself. Do not hand off the task while a required check has not been executed, has failed, or lacks recorded verification evidence.
