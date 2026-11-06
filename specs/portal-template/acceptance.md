# Portal-template acceptance matrix

For each check record: date, operator, starter/event/upstream SHAs, environment/tool versions, command or observed steps, artifact/log link, outcome and limitations. Use pass / fail / not run; do not use a prose plan as pass evidence.

| Gate | Required check | Requirements | Evidence |
| --- | --- | --- | --- |
| A1 Source | Clean clone with submodules; exact starter/upstream/assets provenance; DCO and attribution retained | SRC-01–06 | Clone transcript, pins, source review |
| A2 Identity | New event identity everywhere; official-vs-event links clear; no previous team data exposed | UI-01–02 | Config audit and desktop/mobile screenshots |
| A3 Portal | Strict build, internal links/assets, graph/table, state provenance and guide/system navigation | UI-03–06 | Build output, link crawl, browser journey |
| A4 Baseline | Generate/build/start/smoke/booking/realtime/stop/restart on isolated runtime; full dry-run starts no services | OPS-01–03 | Runtime logs and before/after service inventory |
| A5 Team | Newcomer forks once, branches, authors a bounded change, commits metadata and obtains pushed SHA | TEAM-01–06 | Observed walkthrough and team revision |
| A6 Registry | Accept valid exact revision; reject malformed manifest, mutable ref, duplicate IDs, traversal, missing source, false evidence and unconsented profiles | REG-01–06 | Positive/negative fixtures and review record |
| A7 Update | Reviewed new SHA changes listing; moving team branch does not; frozen edition stays fixed | REG-07–08 | Update PR and snapshot comparison |
| A8 Hosting | Real fork preview and production deploy, no sensitive preview credentials, generated branches excluded, rollback proven | OPS-04–05 | Deployment URLs, configuration and rollback record |
| A9 Learning | Local/published AFDocs plus human newcomer assessment; evidence badges reflect actual observations | EVD-01–02, OPS-06 | Score output and walkthrough findings |
| A10 Event lifecycle | Named operator/backup, support, consent correction process, freeze/archive and maintenance owner | OPS-07 | Event record and handover checklist |

## Release decisions

A local design preview may be shared with explicit limitations after A2/A3. An intake-only event can collect interest and requests without claiming project listings or a ready runtime. A participant-ready event needs the relevant baseline and team checks. Reviewed-publication mode additionally needs A6–A8. A preserved showcase needs the featured-import and lifecycle checks. Record any consciously excluded optional capability instead of implying a universal pass.

This matrix defines required future evidence; it does not retroactively mark the current prototype as having passed.
