
<!-- BACKLOG.MD GUIDELINES START -->
<!-- backlog.md-instructions-version: 1.50.0 -->
<CRITICAL_INSTRUCTION>

## Backlog.md Workflow

This project uses Backlog.md for task and project management.

**For every user request in this project, run `backlog instructions overview` before answering or taking action.**

Use the overview to decide whether to search, read, create, or update Backlog tasks.

### Workflow authority and execution gate

The default workflow is the Backlog.md workflow described in
[backlog/docs/operating-model.md](backlog/docs/operating-model.md): implementation may
start only from a prepared task in `Ready` after the Human explicitly invites the Coder.
Do not create a task directly in `In Progress`, do not infer an implementation invitation
from a feature request or from the agent's own commentary, and do not modify code before
that gate has been satisfied.

`PROMPT-EXECUTION-HUMAN.md` is an explicit exception. When the Human provides execution
instructions through that prompt, its Interactive workflow takes precedence over the
Backlog task lifecycle while the work is in progress. The exception does not remove its
confirmation gates: obtain explicit Human confirmation of the shared understanding, the
complete plan, and each implementation step before acting. An ordinary chat request is
not confirmation for the Interactive workflow. After the Human confirms closure, create
only the required terminal Backlog archival record described by that prompt.

Apply the common Definition of Done in [backlog/docs/operating-model.md](backlog/docs/operating-model.md#common-definition-of-done) to every task. Individual task `Definition of Done` fields must contain only task-specific additions and must not repeat the common checks.

Before task lifecycle actions, read the matching detailed guide:
- `backlog instructions task-creation` before creating or splitting tasks
- `backlog instructions task-execution` before planning, changing status or assignee, adding a plan or implementation notes, or implementing task work
- `backlog instructions task-finalization` before checking acceptance criteria, writing final summaries, or moving tasks to terminal statuses

Use `backlog <command> --help` before running unfamiliar commands. Help shows options, fields, and examples.

Do not edit Backlog task, draft, document, decision, or milestone markdown files directly. Use the `backlog` CLI so metadata, relationships, and history stay consistent.

</CRITICAL_INSTRUCTION>
<!-- BACKLOG.MD GUIDELINES END -->
