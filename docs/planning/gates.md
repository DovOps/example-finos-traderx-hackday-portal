# Evidence gates

Gate | Pass evidence | Current status
--- | --- | ---
G0 provenance | clean pinned submodule and linked issues | Implemented; checked locally
G1 content | schema, lineage, guide/spec/system coverage, local links, static build | Implemented; see validation commands
G2 generation | full 004 layout, post-copy transform twice, safe cwd, no startup | 004 generation passed; transform repeatability passed; full experiment pipeline pending
G3 runtime | clean checkout build/start/API and booking smoke/stop/cleanup logs | Build/start pending .NET image downloads; state-014 stopped with data retained
G4 registry | immutable remote refs, manifest schema, consent, evidence claims, bounded imports, negative tests | Structural schema only; registration disabled
G5 hosting | production + actual fork preview + AFDocs local/published | Pages artifact workflow configured; automatic deployment from main; production/fork previews and AFDocs not yet verified
G6 rehearsal | Orbit/Nova and newcomer observed end to end | Not run; repositories planned
G7 governance | organizer/admin/logo/domain/site ownership and archive policy | Pending organizer decisions

Generated branch publishing requires one snapshot commit relative to declared base, DCO and source/pin provenance. No generated branches are published by this prototype. Force pushes require explicit human authorization under repository instructions.

Keep build logs and runtime evidence separate. Never promote a status from a successful portal build.
