# Local runtime rehearsal — 2026-11-05

This is one operator-run rehearsal on macOS/Apple Silicon with Docker Desktop, not independent newcomer reproduction or proof that every upstream state works. Dates use America/New_York; raw test timestamps use UTC.

## Sources and environment

- Fresh recursive clone of the public event repository into an ignored rehearsal directory.
- Baseline source: `9c7f826ecd629c22bf614f5232d5c738f7e17964`.
- Follow-up source-link fix and Java-test helper: `990097c8f3ec7baeaa7d85ba35c6ec9014d8023b`.
- Upstream pin: `56c458457e35f32215500a03a3c320c92801567a`.
- Generation: Node 24.0.1, Python 3.14.3, jq 1.8.1. Activate the documented versions before invoking the scripts.
- Docker Desktop, Docker 28.1.1 / Compose 2.35.1; JDK 21 supplied by the test/build image.
- Only Compose project `traderx-hackday-lab-004` was operated. Other projects were left alone.
- Package registries, Docker base-image tags and existing build caches were used. This was a clean source checkout, not an offline or cold-cache build.

## Baseline results

| Check | Observed result |
| --- | --- |
| Recursive clone and submodule pin | Pass; clean checkout at the revisions above |
| `bash pipeline/generate-state.sh lab-004-baseline --dry-run` | Pass; full layout and runtime harness, no Lab services started |
| Build and startup | Pass; ten running services and all upstream readiness endpoints |
| `bash pipeline/runtime.sh test` | Pass; ingress/UI, invalid ticker, database, people, accounts, positions, trade feed, processor, trade service, realtime account events and frontend contracts |
| Java test tasks | Pass; seven executed `TradeCommitTest` cases, no failures/errors/skips; other generated Java modules report test NO-SOURCE |
| Browser trade journey | Pass on `127.0.0.1:8080`; Big Corporate Fund (52355), META buys of 3 then 5, both Settled, final META position 8 |
| API explorer | HTTP success at `/api/docs/` |
| Stop/restart | Pass; same scoped project stopped and restarted; readiness and full smoke suite passed again |
| Restart data behavior | Demo tables reset as implemented upstream; META position disappeared and the seeded BAC position remained |

The seven booking tests cover sequential durable accumulation, independent notification-time reads, connection retirement, explicit rollback, commit constraint failure, JDBC commit failure, publication failure handling, multiple bookings within a transaction, and rejecting a direct nontransactional call. These are assertions executed by seven test cases, not seven separate services.

## Evidence-card generation

From a clean checkout at `990097c8f3ec7baeaa7d85ba35c6ec9014d8023b`, `bash pipeline/generate-state.sh lab-005-evidence-card --dry-run` generated the inherited 004 layout and applied the worksheet transform. No Lab services were running during generation.

A second application of `overlay/transforms/apply-evidence-card.sh` left all **390 generated files byte-identical**. The worksheet SHA-256 was `78d687ea0134a232362f8ec1118289a9af9b9ae640933e6dd9daea39ca350311`. This proves repeat application of this documentation transform, not determinism of every network-resolved dependency.

Generated `sourceBranchUrl` and `lineageLinkUrl` now begin with `https://github.com/finos/traderX/`; no local clone path remains in those links. These upstream branch links are moving references; the exact tested source/pin is recorded separately above.

The committed Java-test helper exported and checked the seven-test report successfully (BuildKit reused the already successful test layer).

The example then passed image build/start with ten services and all readiness endpoints, followed by the full inherited smoke suite. All ten Lab containers were stopped after testing and retained. The working checkout and canonical submodule remained clean.

Additional local logs: `clean-generate-005.log`, `clean-java-helper.log`, `clean-start-005.log`, `clean-smoke-005.log`, `clean-stop-005.log`; transform/provenance comparison: `generated/rehearsals/experiment-verification.json`.

## Findings and fixes

1. An earlier non-clean trial built images but failed startup with a missing database image. The clean source rehearsal successfully built and started all ten services; that earlier failure did not reproduce. Its cause is not established.
2. The temporary shared clone used for generation exposed a local filesystem origin in UI source links. The generator now resets that temporary clone's origin to the public upstream URL before generation. It does not change the canonical submodule.
3. Upstream `database/run.sh` executes a schema script containing DROP/CREATE statements on every startup. The wrapper's documentation now distinguishes retaining container files from retaining demo records and prints a restart notice.
4. A browser profile with prior localhost state displayed a stale 014 label even though the server metadata identified 004. A fresh `127.0.0.1` origin showed 004 correctly. Confirm `/assets/state-ui.json` and use a fresh origin/profile when switching generated states.
5. Image builds package services but do not execute booking tests. Use the committed `bash pipeline/test-java.sh` helper; its exported XML must contain executed, passing tests. NO-SOURCE output is not test coverage.

## Evidence locations

Raw logs and the screenshot are local, ignored artifacts under `generated/`; they are not publicly hosted evidence links:

- `generated/logs/clean-clone.log`
- `generated/logs/clean-generate-004.log`
- `generated/logs/clean-start-004.log`
- `generated/logs/clean-smoke-004.log`
- `generated/logs/clean-java-tests.log`
- `generated/logs/clean-stop-004.log`
- `generated/logs/clean-restart-004.log`
- `generated/logs/clean-smoke-restart-004.log`
- `generated/rehearsals/java-test-results/trade-processor/test-results/test/`
- `generated/rehearsals/baseline-trades.png`

## Remaining scope

General team-state scaffold/dispatch, generated snapshot publishing, independent newcomer reproduction and later convergence-state runtime rehearsal remain unverified. Registry ingestion and participant registration rehearsal are separate gates. A successful 004-derived example does not establish runtime support for all states.
