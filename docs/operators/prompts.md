# Participant coaching prompts

Operators can share these prompts with teams using a coding assistant. Replace placeholders with event-specific values. A prompt is not proof that the requested work ran, and it does not override repository rules or publish anything automatically.

## Prompt 1 — Orient and plan

```text
We are participating in EVENT-NAME. Our team fork is TEAM-REPO,
the central overlay is EVENT-REPO, and our starting state is STATE-ID.

Read AGENTS.md, CONTRIBUTING.md, the participant guide, current evidence
gates, starting-state spec/plan/tasks/system contracts and learning guide.
Inspect the checkout, remotes, upstream pin and tools before proposing work.
Recommend a convergence state first (004/C0, 007/C1, 009/C2 or 012/C3).
These combine exploration tracks into a shared demo/state. Use another state
when a specific need warrants it; explain that choice. Any upstream state
is eligible; do not assume 004 or require earlier exercises.
Explain why STATE-ID fits, resolve it at the exact pin, and identify runtime
prerequisites and operator support needs. If it differs from the event pin,
record both. Use isolated upstream generation when Lab dispatch is unavailable.
Tell us what is implemented, unverified or missing.

Plan one bounded experiment for TEAM-ID. Explain the inherited capabilities,
expected delta, success evidence and cleanup. Use a team-qualified state ID.
Keep durable changes in our specs, catalog, transforms and learning guide.
Do not modify the upstream submodule or treat generated output as source.
Do not invent a scaffold command if the repository does not implement it.
Do not publish, push or register anything in this planning step.
```

## Prompt 2 — Prepare and commit metadata

```text
Prepare project metadata for PROJECT-ID in our team fork.
Read the current participant-manifest schema and registration guide first.
If the manifest schema is still a proposal, identify that limitation and
prepare a draft clearly marked for review; do not claim validation passed.

Create or update hackday/project.yaml and the project learning guide with
our actual title, question, owner, event, starting state, upstream pin,
experiment IDs, evidence links, limitations, next steps and attribution.
Use exploring unless stronger evidence is actually available. Do not invent
results or add personal profiles without consent. Keep the manifest's own
commit SHA out of the manifest; the central registry will pin it later.

Show the diff and run available local validation. For a requested commit,
read the configured human Git identity and follow AGENTS.md; stop if either
identity value is empty. Sign off with git commit -s and never invent identity.
Commit only our reviewed metadata and guide; exclude generated files,
credentials and unrelated edits. Do not push or open a registration request.
```

The prompt requests a local commit only after review. Operators should tell teams to inspect the result. If they only want a draft, remove the commit instruction. The participant then pushes the reviewed branch to their own fork and records the full SHA with `git rev-parse HEAD`; make sure that SHA is accessible remotely before registration.

## Prompt 3 — Prepare a registration request

```text
Prepare, but do not submit, our registration request for PROJECT-ID.
Use TEAM-REPO and PUSHED-COMMIT-SHA. Confirm that this is a full immutable SHA
and that the guide and hackday/project.yaml exist at that revision using
read-only inspection. Do not execute any downloaded participant code.

Summarize the starting state/pin, experiment states, question, evidence,
limitations, maintenance contact and consented attribution. Distinguish
an intake issue from a published listing. If publication gates are still
closed, prepare intake text only and list the outstanding requirements.

If registry publication is enabled, describe a metadata-only PR based on
the central event default branch; do not include implementation commits.
Do not add a participant submodule, alter other projects, change evidence
status without support, or open/push/merge a PR without our instruction.
```

## Prompt 4 — Capture a demonstration or negative finding

```text
Help document what we actually observed for PROJECT-ID at REVISION.
Separate commands run and their outputs from planned or inferred behavior.
Record environment, upstream pin, before/after behavior, inherited capability
checks, failures, limitations and cleanup outcome. Preserve useful negative
findings. Propose the next smallest investigation. Do not call the project
reproducible without an independent reproduction record.
```

[Team workflow](../participating.md) · [Registration guide](../registration.md) · [Operator playbook](index.md)
