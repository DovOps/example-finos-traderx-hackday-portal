# Your hackday, step by step

This is a local prototype. Baseline runtime and registration are not ready for participant use yet.

1. [Fork this overlay once per team](participating.md), clone with `--recurse-submodules`, and use feature branches for collaboration. Your code stays in your team fork; participant repositories are not submodules of the central Lab.
2. Prefer a **convergence state** (004/C0, 007/C1, 009/C2 or 012/C3), which combines exploration tracks into a shared demo/state. Choose another upstream state when your experiment needs something specific. State 004 is the provided example, not a required starting point. Read the selected state’s pinned guide, spec and tool requirements.
3. Follow [starting-state setup](participating.md#2-choose-your-starting-state). For the 004 example use `bash pipeline/generate-state.sh lab-004-baseline --dry-run`; for other states use the pinned upstream generator in an isolated working checkout.
4. Inspect the selected state's generated runtime guide. Build/start/smoke/stop remain required before declaring a working runtime. Tell operators about your service, resource and port requirements.
5. Define your experiment and success evidence. The evidence-card challenge is one option on 004; later-state projects do not need to complete it.
6. Keep durable edits in specs/transforms; regeneration replaces output. Record failed attempts as useful findings.
7. Demonstrate exact revision, commands, before/after observations and limitations.
8. [Submit an early registration request](registration.md) with your team repo, current SHA and project metadata—even while exploring. Published listings remain gated until validation is complete. Shared-overlay contribution and upstream graduation are separate, optional steps.

Do not delete shared Docker volumes to clean up. Use the generated stop guide for services owned by your experiment. Generated outputs are disposable only after preserving useful changes in source.
