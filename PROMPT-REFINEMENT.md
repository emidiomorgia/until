{{TASK_ID}} = task-3
{{TASK_PATH}} = /backlog/tasks/
{{ARCHITECTURE_PATH}} = /backlog/docs/architecture/

Act as the `Analyst` in the four-actor workflow defined in `AGENTS.md` and `backlog/docs/operating-model.md`. Follow the Backlog.md workflow.

Objective:
After the Human explicitly invites analysis, enrich `{{TASK_ID}}` directly for Human review. The task must remain in `To Do` during refinement. Do not wait for or require a separate SPEC approval.

Context:
- `AGENTS.md`
- `{{TASK_PATH}}`
- `{{ARCHITECTURE_PATH}}`
- `backlog/docs/operating-model.md`
- `backlog/docs/project-technology.md`
- Relevant product constraints, vision, glossary, and quality attributes

Project direction:
- `until` is a monorepo with a TypeScript HTML5 React SPA/PWA using shadcn.
- The backend is Java using Quarkus or Spring Boot; select the framework through task refinement when implementation requires it.
- Microservices are future evolution, not a foundation-phase requirement.

Task ownership:
- The human provides and maintains the task title and description.
- The Human owns the planning order and milestone assignment.
- Treat the task description as the requested scope and source of intent.
- Do not rewrite, expand, or silently reinterpret the task title or description.

Refinement workflow:
1. Read the relevant project documentation, including the current technology direction, the task, its dependencies, any optional linked SPEC, and the relevant architecture documentation.
2. Identify ambiguities, contradictions, missing dependencies, and decisions that would prevent implementation.
3. If requirements are ambiguous or materially incomplete, interview the Human with focused questions. After each exchange, maintain one cumulative analysis comment on the task containing the questions, answers, decisions, and remaining assumptions. Continue refinement once the answers are available.
4. Compile task-specific `Acceptance Criteria` with measurable, externally verifiable outcomes.
5. Compile the applicable `Definition of Done` items with concrete verification requirements.
6. Compile an ordered `Implementation Plan` covering the intended changes, tests, validation checks, and relevant risks.
7. Record these three fields through the Backlog.md CLI, following the repository workflow.

Constraints:
- Do not modify application code, tests, configuration, or unrelated documentation.
- Do not modify the task title or description.
- Do not expand the Human-authored scope.
- Do not move the task to `Ready` or authorize implementation.
- Treat the Human's manual move of the prepared task to `Ready` as the implementation approval signal; there is no separate SPEC approval action.
- Do not mark checklist items as complete during refinement; all proposed items must remain unchecked.
- If an architectural decision is required, report it for human resolution instead of making it silently.

Finish when:
The task contains a precise, task-specific `Acceptance Criteria`, `Definition of Done`, and `Implementation Plan`, with cumulative interview analysis recorded in task comments when needed. Implementation must not have started, the task must remain `To Do`, and Human approval must still be pending.
