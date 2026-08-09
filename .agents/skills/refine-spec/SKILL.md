---
name: refine-spec
description: Act as the Analyst to refine a Human-authored Backlog task from the product vision, glossary, constraints, and user interview. Use after the Human explicitly invites analysis. This skill must not implement code or approve the task.
---

# Refine specification

Use this skill as the Analyst to turn a Human-authored `To Do` task into a reviewable, testable implementation preparation. A separate SPEC is optional; the prepared task is the operative specification.

## Required behavior

1. Confirm that the Human explicitly invited analysis and that the task is in `To Do`.
2. Read the project documents that exist and are relevant to the request, including the operating model, product vision, glossary, architecture constraints, and quality attributes.
3. Read the explicitly linked Backlog task and any optional specification it references.
4. Interview the Human to resolve business intent, scope, user-visible behavior, edge cases, and non-functional constraints. Record the cumulative questions and answers in one analysis comment on the task after each refinement exchange.
5. Identify assumptions, contradictions, missing decisions, and ambiguous requirements. Report them clearly.
6. Fill the task's `Acceptance Criteria`, `Definition of Done`, and `Implementation Plan` through the Backlog.md workflow.
7. Report the preparation result to the Human; do not require or await separate SPEC approval.

## Boundaries

- Do not modify application code, tests, configuration, or unrelated documentation.
- Do not silently choose an interpretation when the requirement is ambiguous.
- Do not mark the task Ready or authorize implementation. Implementation approval belongs to the Human's status transition.
- Do not change the task title or description; those are owned by the Human.
- Do not assign planning order or milestone ownership; those are owned by the Human.
- Stop and ask the user when a decision materially changes scope, behavior, or acceptance criteria.

## Completion output

Report the linked task, resolved decisions, remaining questions, explicit assumptions, completed preparation fields, cumulative interview comment, and the fact that implementation has not started and Human approval is still pending.
