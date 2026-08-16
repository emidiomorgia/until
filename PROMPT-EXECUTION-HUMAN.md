# Interactive execution mode

This prompt is an explicit Human-selected exception to the default Backlog.md task
lifecycle. It may be used instead of the Analyst/Coder/Reviewer workflow only when the
Human supplies these execution instructions. The agent must not infer that this mode is
active from an ordinary request or from its own commentary; the confirmations below are
mandatory before any implementation action.

Use this prompt to execute a request in `Interactive` mode. This mode is a simpler, Human-led workflow and does not use Backlog.md to plan or manage the work while it is in progress. Do not exchange the roles of Analyst, Coder, or Reviewer: one agent collaborates directly with the Human from clarification through implementation and handoff.

## Operating rules

- The Human creates and checks out the dedicated feature branch before inviting execution. Do not create, rename, or switch branches unless the Human explicitly asks you to.
- Work only in the repository and scope explicitly agreed with the Human. Preserve unrelated worktree changes.
- Continue to follow all project technical, architectural, quality, security, and documentation guidance, including `AGENTS.md`, `backlog/docs/operating-model.md`, `backlog/docs/project-technology.md`, and all relevant product, architecture, and quality documents. In particular, apply the project's common Definition of Done and the applicable technology quality gates, even though Backlog.md is not used as the active task-management workflow.
- Do not silently broaden the request, alter an agreed objective, skip a required check, or invent a project convention. Stop and ask the Human when a decision materially affects scope, behavior, architecture, security, data, or compatibility.
- Explain decisions in the Human's language unless the Human requests otherwise. Cite project documents, official technical documentation, and other sources actually consulted when they support a decision. Do not claim to have consulted a source that was not read.

## Workflow

### 1. Understand and interview

Read the repository guidance and inspect the relevant code, tests, configuration, and documentation.

If anything important is unclear, conduct a focused interview before proposing implementation. Ask only the questions needed to resolve product intent, scope, expected behavior, edge cases, constraints, dependencies, risks, or acceptance expectations. Keep track of the Human's answers as part of the execution record.

If the request is sufficiently clear, state that no interview questions are blocking progress and continue.

### 2. Confirm the request

Write a concise but complete shared-understanding summary containing:

- the problem and intended outcome;
- the agreed scope and explicit out-of-scope behavior;
- functional behavior, edge cases, and affected users or interfaces;
- technical and architectural constraints;
- dependencies, risks, assumptions, and open decisions;
- proposed acceptance tests and task-specific Definition of Done items.

Ask the Human to approve or correct this summary. Do not plan or implement until the Human confirms that the request and objectives are understood and shared.

### 3. Propose the execution plan

After confirmation, inspect the implementation points and propose a detailed, ordered plan. For every step, identify the files or modules involved, the intended change, dependencies, verification, and rollback or risk considerations where useful. Include code snippets, pseudocode, diagrams, commands, or links to authoritative sources when they make the plan easier to validate.

The plan must respect the existing monorepo architecture: TypeScript HTML5 React SPA/PWA and shadcn conventions for frontend work; Java with the repository's selected Quarkus or Spring Boot approach for backend work; no new microservice decomposition unless explicitly agreed as part of the request.

Ask the Human to approve or modify the complete plan. Do not implement before explicit approval.

### 4. Implement incrementally

Execute the approved plan one step at a time. Before each step:

1. explain the objective and expected result;
2. identify the files that will be affected;
3. show the relevant code snippet, pseudocode, command, or configuration that will be created or changed;
4. state the verification to be performed and cite any source that informed the step;
5. ask the Human for confirmation or modification.

After confirmation, make only that step's changes, run its focused checks, and report the result, including warnings or limitations. Then present the next step. If implementation reveals a requirement conflict, unexpected dependency, failed check, or scope change, pause and ask the Human before proceeding.

Use the repository's existing patterns and update focused tests and affected documentation as required. Before completion, run all applicable project quality checks, including the canonical checks from `backlog/docs/project-technology.md` for affected workspaces and any relevant manual or browser verification.

### 5. Close the work

When implementation and verification are complete, present a final changelog summary containing:

- what changed and why;
- the task-scoped modified, added, deleted, or renamed files;
- acceptance tests and Definition of Done evidence;
- exact commands executed and their results;
- important decisions, sources, warnings, limitations, and follow-up items.

Ask the Human to confirm the summary and closure. Do not claim completion while a required check is missing, failed, or lacks evidence.

## Backlog archival record

After the Human confirms closure, create one Backlog.md task solely as an immutable historical record of the completed interactive execution. Do not use it to manage the workflow retrospectively and do not swap into an Analyst, Coder, or Reviewer role.

Create or update the record only through the Backlog.md CLI; never edit task markdown files directly. The record must include the complete execution history, from the original request and interview questions/answers through the shared-understanding summary, acceptance tests, task-specific Definition of Done, approved plan, step-by-step implementation comments, code and source references, verification evidence, decisions, limitations, and final changelog. Preserve the chronological order and distinguish Human approvals, requested changes, agent actions, and command results.

Set the task immediately to the project's terminal executed status (`Done`, or the exact equivalent configured by the repository). Do not create additional planning, refinement, implementation, or review tasks. Report the task identifier and the final record location to the Human.

## Final response format

Use a concise structured Markdown handoff:

```markdown
## Changelog

- <what changed and why>

## Files

- `<project-relative/path>` — <purpose>

## Verification

- `<check or acceptance test>` — <result and evidence>

## Decisions and limitations

- <decision, source, warning, limitation, or None>

## Backlog archive

- Task: `<identifier>`
- Status: `Done`
- Record: `<location>`
```
