# Baseline runtime rehearsal

The local lab uses Compose project `traderx-hackday-lab-004`. State 014's Kind node and Sail sidecar were explicitly stopped on 2026-11-05 to free ports; containers and data were retained. Unrelated AI Steel Thread containers remain running.

## Commands

From the overlay root, after generating the baseline:

```sh
bash pipeline/runtime.sh start
bash pipeline/runtime.sh status
bash pipeline/runtime.sh test
bash pipeline/runtime.sh stop
bash pipeline/runtime.sh restart
```

`start` builds and starts services. `restart` reuses images. `test` submits synthetic trades and changes the local demo database. `stop` retains containers and their files; it does not remove volumes or delete the database. **Restart resets the baseline demo tables:** the pinned upstream database startup runs `initialSchema.sql`, which drops/recreates them. Export any useful demo evidence before restarting; retained files do not imply retained trades. Do not regenerate while the runtime is active. The default upstream stop script uses Compose down; prefer this overlay wrapper when retaining demo data matters.

## Required evidence

1. Full build from the pinned generated sources, ten running services, all startup readiness checks.
2. Run Java regression tests separately: service Dockerfiles use `bootJar`, which packages without executing the test task. In particular, run trade-processor booking tests before claiming booking correctness.
3. UI, ingress, API explorer, account and reference-data routes.
4. Invalid ticker rejection, database connectivity, people/accounts/positions service checks.
5. Two successive trade bookings: settled trade records, accumulated positions and Socket.IO events. Realtime account updates through ingress after trade submission.
6. Baseline frontend UX contracts and a manual browser trade journey.
7. Stop and restart only the lab project, then recheck service readiness and confirm the documented demo-table reset.
8. Regenerate the experiment sequentially after stopping the runtime; repeat the transform and baseline capability checks.
9. Repeat from a clean clone before claiming independent reproducibility.

Build/start and smoke logs belong in ignored `generated/logs/`. Record the upstream pin, overlay revision/dirty state, tool versions, outcomes and any skipped checks. A passing startup alone does not pass this gate.

## Later gates

Registration needs immutable revision resolution, manifest and consent validation, negative cases and bounded documentation import. Portal needs navigation/schema/link checks, local and published AFDocs, an actual fork Deploy Preview and a newcomer walkthrough. Those are separate from this runtime gate.

## Current rehearsal status

The clean-checkout baseline and evidence-card example both passed local generation, build/start and the full inherited smoke suite. Seven booking regression tests passed separately. Baseline stop/restart and a browser two-trade journey passed; restart resets demo tables. The example transform was byte-identical on repeat application.

See [the dated evidence record](runtime-evidence-2026-11-05.md) for exact revisions, scope and remaining gates. All rehearsal services were stopped after testing; containers were retained. The portal remains a separate service.

Run `bash pipeline/test-java.sh` after generation for booking regression reports. Several generated modules contain no discoverable tests; only the executed booking cases are claimed as passing tests. The GHCR bundle's mutable `latest` tags were not used as evidence for this pinned source revision.
