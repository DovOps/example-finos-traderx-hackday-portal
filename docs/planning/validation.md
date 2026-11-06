# Initial local validation — 2026-11-05

Source branch: codex/hackday-lab-foundation (local working tree; no source commit published).
Upstream: 56c458457e35f32215500a03a3c320c92801567a.

Passed:

- `python scripts/lab.py check`: registry schema, unique IDs, lineage, state artifact coverage and local Markdown links.
- `python -m unittest discover -s tests`: five tests covering empty registry, duplicate IDs, mutable refs, unsafe paths/URLs, unsupported claims and registration failing closed.
- `python scripts/lab.py build`: HTML plus Markdown/JSON/schema mirrors and llms.txt.
- `bash pipeline/generate-state.sh lab-004-baseline --dry-run`: complete upstream 004 layout and runtime harness generated; no services started. Original submodule remains clean.
- Evidence-card transform applied twice to completed layout; both SHA-256 hashes: `78d687ea0134a232362f8ec1118289a9af9b9ae640933e6dd9daea39ca350311`.
- Browser: homepage rendered and participant-guide navigation reached rendered HTML.

Full generation log: ignored local `generated/logs/baseline-generation.log`. This is local evidence, not an independent reproduction claim.

Not verified: full experiment generation entrypoint, clean-checkout reproduction, runtime build/start/smoke/stop, published snapshots, mobile browser layout, AFDocs and Netlify. Existing `traderx-state-014-control-plane` owns host port 8080; do not stop it to test this overlay. Implement isolated project naming/ports before runtime rehearsal.

No participant repositories created; no projects registered; no public portal deployed.
