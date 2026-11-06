# Operator playbook: run a hackday with this portal

This guide is for the people setting up the event, coaching teams and reviewing their work. Use the [reusable portal specification](../../specs/portal-template/spec.md) as the build contract and the [acceptance matrix](../../specs/portal-template/acceptance.md) as your release checklist.

**Current mode: local prototype and registration intake only.** The starter is not yet published; runtime, remote registration validation and hosting gates remain incomplete. Do not announce a participant-ready starter or automatic project publication until the corresponding checks pass. See [current gates](../planning/gates.md).

## Who does what?

| Role | Before the event | During and after |
| --- | --- | --- |
| Event owner | Confirm edition, organization, branding, support and consent policy | Handle escalation, freeze and archive decisions |
| Technical operator + backup | Publish tested starter, pin upstream, build/deploy docs and rehearse runtime | Diagnose setup problems; maintain stable baseline and rollback |
| Registry reviewer | Prepare request/PR review and evidence rules | Review exact revisions, consent, attribution and updates |
| Team maintainer | Create one team fork and coordinate access | Own team metadata, demos and continuation work |

Name these people and a support channel in your event record. Do not put private contact details on the public portal without consent.

## Set up the event site

1. **Choose a published starter revision.** Record its repository, tag and SHA. This working tree must first be reviewed and published before a different operator can reproduce it. Create the new event repository using your organization's approved template/copy process; do not assume GitHub's “Use this template” setting is enabled.
2. **Keep the overlay boundary.** Preserve LICENSE, NOTICE, CONTRIBUTING, AGENTS, `.gitmodules` and the pinned upstream gitlink. Copy tracked source, not generated output, caches, local settings or credentials. Initialize the submodule and verify its SHA.
3. **Configure the edition.** Update `portal/config.json` (title, repository, edition, upstream pin) and `website/docusaurus.config.js` (welcome banner, navigation, official links and public URL). Use `npm --prefix website run build:pages` for repository-path GitHub Pages builds. Use `PORTAL_URL` for the origin and `PORTAL_BASE_URL` for a leading/trailing-slash path when overriding hosting. Today the banner is defined in the Docusaurus config; the older `portal/config.json` banner field is not authoritative.
4. **Audit identity beyond configuration.** Review hardcoded repository links in participant docs, README, notices, issue templates and operator examples. Use `rg -n 'DovOps|Prototype / 2026|example-finos-traderx-hackday-portal' docs specs portal .github website/src website/docusaurus.config.js`. Replace event-specific references deliberately; retain upstream source attribution and asset provenance. One-file event portability is a planned improvement, not a present guarantee.
5. **Welcome any upstream starting state.** Recommend convergence states first: 004/C0, 007/C1, 009/C2 and 012/C3 combine exploration tracks into integrated demos/states. Help teams choose the appropriate checkpoint for their needs and resources; use another state for a specific capability. Do not require teams to complete 004 first. Publish which states have rehearsed runtime support and which are exploratory; that support matrix is not a registration allowlist. For each team record starting state + full upstream SHA, required tools/services/resources, port or namespace allocation, support contact and verification evidence. Help later-state teams use their pinned upstream generator in an isolated checkout while general Lab dispatch is pending. Keep the submodule SHA, portal pin and Lab catalog pins consistent; test any pin change before promotion. Logo provenance is independent of the runtime pin.
6. **Start with an empty event registry.** Do not carry prior participants, consent records or unreviewed claims into a new edition. Preserve a previous event archive separately when authorized.
7. **Build and inspect.** Run the commands below; check operator and participant journeys, graph labels, raw sources and the official-docs link on narrow and desktop layouts.
8. **Choose hosting ownership.** Record site/team/domain ownership and backup access. GitHub Pages is configured through the build/artifact workflow. Follow [Pages setup](hosting.md) to enable the optional deployment job. PRs build artifacts; hosted PR previews are not implemented. A docs preview is not a live TraderX deployment.

### Local verification commands

Run from a clone of the new event repository:

```sh
git submodule update --init --recursive
git -C upstream/traderX rev-parse HEAD
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
npm --prefix website ci
.venv/bin/python scripts/lab.py check
.venv/bin/python -m unittest discover -s tests
.venv/bin/python scripts/lab.py build
npm --prefix website run serve
```

The default portal port is 4173. Check for an existing preview before starting another. Consult [tooling](../tooling.md) for generation-specific version checks; a working portal toolchain does not prove the runtime toolchain is ready.

## Rehearse before inviting participants

- Follow [runtime rehearsal](../planning/runtime-rehearsal.md) on an isolated project/port allocation. Record build, startup, API, booking, realtime and stop/restart outcomes. Service image builds do not replace Java regression tests.
- Ask a newcomer to follow [team setup](../participating.md) without private instructions. Observe the first successful baseline and one small change; capture where they get stuck.
- Prepare one clearly synthetic registration exercise with exact revisions. Do not label planned Orbit/Nova repositories as existing fixtures.
- Before enabling publication, pass manifest/ref/evidence/consent checks and test a real fork PR preview. The current empty-registry guard must remain until this work is implemented.
- Record local/published AFDocs results when available. These checks and a human walkthrough assess different things.
- Freeze a known-good starting revision and keep its rollback instructions accessible. Avoid moving the starting pin during the event unless a documented fix requires it.

## Brief teams at kickoff

Give every team five concrete links: event repository, [team workflow](../participating.md), challenge/starting state, [registration guide](../registration.md), and the event support channel. Explain this in plain language:

> Fork the event overlay once per team. Work in your fork on feature branches. Keep specs and transforms as source, and leave the upstream submodule unchanged. Commit your project metadata and learning guide, push them, then give us the exact SHA. We review a reference to your work; your implementation stays in your repository. You can register while exploring. A useful finding does not require a merge or a team-hosted site.

Use the [participant prompts](prompts.md) to help teams plan and prepare metadata. They are copyable coaching prompts, not implemented automation commands. Do not tell teams to run a nonexistent scaffold or registration CLI.

## Review registrations and updates

The [review checklist](review.md) covers intake, publication and corrections. During intake-only operation, acknowledge requests and identify missing information without promising an automatic card. Once publishing is implemented, review a metadata-only PR based on the central default branch, inspect its preview, and accept only the exact validated revision.

If a team changes its branch later, request a new SHA and review. Do not silently track the branch. Keep evidence claims conservative: exploring, demonstrated and reproducible mean different things.

## Close the event

Record accepted project revisions and outcomes, including negative findings. Freeze the event edition and source/pin provenance; distinguish it from continuing team development. Confirm licensing and consent for anything preserved centrally. Assign a maintenance or archive owner, explain how profiles can be corrected or removed, and link to follow-up work. Upstream graduation remains optional and uses upstream's own contribution gates.

## Event record to keep in the repository

Record the edition, event repository, starter SHA, upstream SHA, branding provenance, tested baseline/challenges, portal URL, operator/backup, registry reviewer, support channel, intake/publication mode, gate evidence links, freeze date and maintenance owner. Never include credentials. A record of intended publication mode is not a switch that enables ingestion.

[Detailed requirements](../../specs/portal-template/spec.md) · [Implementation backlog](../../specs/portal-template/tasks.md) · [Acceptance evidence](../../specs/portal-template/acceptance.md)
