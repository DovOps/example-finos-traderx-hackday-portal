---
id: lab-005-evidence-card
status: locally-verified
---
# Add a reproducibility evidence card

Purpose: capture reproducible evidence without changing trading behavior.

Predecessor: lab-004-baseline.

## Objectives

Explain the upstream pin, generated output boundary and evidence required to claim reproducibility.

## Walkthrough

1. Read the [specification](../../specs/lab-005-evidence-card/spec.md).
2. Run `bash pipeline/generate-state.sh lab-005-evidence-card --dry-run`. This creates layout; it does not start services.
3. Inspect generated files, then follow the generated runtime guide when the baseline build gate is ready.
4. Record command, revision, environment, outcome and limitations.

## Assessment

Can a teammate reproduce the observation from the recorded revision? A successful docs build alone is insufficient.

## Coaching

Ask your agent to explain each generated change before applying it. Hint 1: find the source spec. Hint 2: compare the transform output before and after a second application. Misconception: a generated edit persists through regeneration; capture it in an overlay transform first.

## Limitations and provenance

Generation, transform repeatability and inherited runtime smoke checks passed locally; see [results and limitations](../planning/runtime-evidence-2026-11-05.md). This is not an independent newcomer reproduction. [System contract](../../specs/lab-005-evidence-card/system/contract.md).
