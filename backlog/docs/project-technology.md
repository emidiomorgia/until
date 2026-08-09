# Project technology instructions

This document contains technology-specific commands and tools for `until`. It is intentionally separate from the reusable agent workflow in `AGENTS.md`.

## Repository and stack

`until` is a monorepo. The current product is a TypeScript web SPA/PWA built with HTML5, React, and shadcn. Its backend is Java using either Quarkus or Spring Boot; the framework choice must be recorded in a prepared task before implementation. The repository may evolve toward independently deployable microservices later, but microservices are not a current implementation requirement.

- Frontend language: TypeScript
- Frontend: HTML5, React, shadcn, SPA/PWA delivery
- Backend language: Java
- Backend framework: Quarkus or Spring Boot, selected through task refinement
- Repository model: monorepo

## Required automated quality gate

The canonical CI definition is [`.github/workflows/quality.yml`](../../.github/workflows/quality.yml). Run the equivalent checks for every affected workspace:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

For the Java backend, run the build-tool commands defined by the selected framework module, for example `./mvnw verify` for a Maven-based Quarkus or Spring Boot service. All required checks must pass before the Coder reports completion to Human.

## Optional local SonarQube analysis

If the repository includes `sonar-project.properties`, SonarQube analysis is an additional local quality report and is not a substitute for the required quality gate.

With a local SonarQube server and the SonarScanner CLI installed:

```bash
sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.token="$SONAR_TOKEN"
```

Analysis configuration must cover the TypeScript frontend and Java backend modules. It is not a required CI dependency until a shared project and credentials are configured.
