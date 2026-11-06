# Reusable hackday portal requirements

Status: design contract with a partial reference implementation. This pack specifies how to create another event portal from this repository; it does not certify the current prototype as event-ready.

Owner: the event operator and technical maintainer designated for each edition. Related backlog: roadmap #1, registry #3, portal #4, hosting #5, rehearsal #6 and governance #7 in this repository.

## Purpose and success criteria

An organizer can take a published starter revision, create an independently owned event overlay, configure identity, select tested starting states, guide teams through experiments, and publish reviewed project references. A participant can explain where their code belongs and how their project becomes visible without needing to merge implementation into the event repository.

The deliverable is both a human documentation portal and an agent-readable contract. Evidence must distinguish documentation quality, source generation, running-system behavior and participant reproduction.

## Actors and responsibilities

| Actor | Responsibilities |
| --- | --- |
| Event owner | Edition, organization, support policy, branding, consent and archive decisions |
| Technical operator | Starter release, upstream pin, runtime rehearsal, portal build/hosting and rollback |
| Registry reviewer | Revision/manifest review, evidence classification, attribution and consent checks |
| Team maintainer | Team fork, state definitions, project metadata, evidence and update requests |
| Participant or agent | Work within the team fork and agreed challenge; report actual observations |

One person may hold several roles, but event records must identify who can approve publication and who provides backup support.

## Repository and source requirements

- **SRC-01:** The event repository is an independent overlay. Canonical TraderX is a pinned submodule. Event-specific changes must not modify canonical upstream state packs.
- **SRC-02:** A new event records the starter repository/revision, upstream revision and branding-asset revision separately. An asset refresh does not silently update the runtime pin.
- **SRC-03:** Teams normally fork the event overlay once per team, then use normal feature branches and PRs inside that fork. A team can register a compatible independent public repository only after an operator confirms the same provenance and manifest contracts.
- **SRC-04:** Participant repositories are registry records, not submodules. Ordinary registration does not import or execute participant code.
- **SRC-05:** Durable changes belong in specs, catalog entries, transforms and guides. Generated output, caches, dependencies and credentials must not enter the starter snapshot.
- **SRC-06:** Every authored commit follows the repository's DCO rules. Read configured human identity; never invent an author. Generated snapshot publication is a separate operation with a one-snapshot-commit invariant relative to its declared base; no implicit force-push authorization.

## Portal identity and information architecture

- **UI-01:** Title, repository, edition, public URL, banner and upstream pin are explicit operator decisions. The implementation must document any remaining hardcoded identity rather than claiming one-file portability.
- **UI-02:** Use upstream TraderX theme conventions and attributed assets while visibly identifying the event overlay. Preserve the official-docs link, event identity and project ownership on relevant pages. Never imply organizer or FINOS approval from a successful build.
- **UI-03:** Provide Get started, team workflow, registration, states/learning, specs, challenges, projects and operator guidance. The operator guide must be reachable from the portal's normal navigation.
- **UI-04:** State pages expose owner, predecessor(s), upstream pin, guide, spec/plan/tasks/system artifacts, generated branch availability and local verification status. Upstream implemented status must not become a local runtime pass.
- **UI-05:** Render a linked state graph and state-to-artifact table. The graph supports branches and convergence; experiments need not form a single linear syllabus.
- **UI-06:** Serve HTML plus Markdown/JSON/schema mirrors and an agent index. Reuse canonical source documents instead of maintaining separate prose copies. Run strict build/link checks and check diagrams in light/dark and narrow/desktop layouts.

## Participant experience

- **TEAM-01:** Onboarding identifies the event repository, team fork, team remote, central overlay remote and nested upstream submodule. Include clone/init commands and collaboration expectations.
- **TEAM-02:** Start with a tested baseline, then one bounded experiment. Challenge metadata includes starting state, difficulty, scope, learning objectives, evidence, limitations and cleanup instructions.
- **TEAM-03:** Reserve globally unique team/project/state IDs. Any scaffold helper creates spec, plan, tasks, README, system artifacts, transform skeleton and guide without overwriting existing work. Until it exists, instructions must state the manual steps and generator limitations.
- **TEAM-04:** Provide copyable agent prompts for onboarding, experiment planning and registration preparation. Prompts must require inspection, preserve upstream, avoid fabricated evidence and stop before unauthorized publication.
- **TEAM-05:** Explain metadata commit order: write the manifest and guide, commit with DCO, push to the team fork, then obtain the full SHA. The manifest must not attempt to contain its own commit hash.
- **TEAM-06:** Exploring projects and negative findings are valid outcomes. Team hosting, implementation merges and upstream graduation are optional.

## Registration and review

- **REG-01:** Intake requests can collect work in progress. Clearly distinguish an issue/request from an accepted portal listing.
- **REG-02:** A central entry identifies project ID, supported public repository URL, immutable full SHA, `hackday/project.yaml` and publication level. IDs are unique and updates are reviewed. A branch name or moving tag is insufficient.
- **REG-03:** The versioned manifest must cover project/team identity, title/summary, edition, ownership, repository, starting state and upstream pin, experiment states, guide/demo/evidence references, limitations, next steps, content licensing/attribution and optional consented contributor details. The authoritative schema is required before automated acceptance; the current YAML example is illustrative only.
- **REG-04:** Resolve the exact public revision and validate the manifest without running repository scripts, package installation, hooks or MDX. Bound downloads and paths; reject traversal, unsupported hosts, missing files, duplicate IDs and unsupported status claims.
- **REG-05:** A registration PR contains central metadata only, based on the central default branch. It must not inadvertently bring the team's implementation history into the event overlay.
- **REG-06:** The intended accepted result is a project card/detail page linked bidirectionally to its experiment states and exact revision. Display evidence provenance and limitations. Registered link-out projects do not require a hosted runtime or team website.
- **REG-07:** Featured snapshots require an additional bounded, reviewed import of approved documentation/images with license and provenance. Missing/deleted sources must not erase a preserved snapshot. Ordinary registration and featured preservation are distinct.
- **REG-08:** New team commits do not silently change accepted evidence. Review a new SHA for updates; preserve frozen event editions. Support correction, consent withdrawal and archive requests.

## Evidence and operational requirements

| Requirement | Contract |
| --- | --- |
| EVD-01 | Exploring means described work; demonstrated requires revision-linked demo evidence; reproducible requires an independent reproduction record |
| EVD-02 | Maintained/archived reflect owner and lifecycle, not automatic progression from docs success |
| OPS-01 | Portal build/preview is separate from runtime build/start/smoke/stop; neither substitutes for the other |
| OPS-02 | Generation is sequential, output is overlay-owned, transforms run after layout copy and are idempotent, and dry-run prepares full layout without services |
| OPS-03 | One shared tool/env policy documents versions and activation; scripts anchor cwd safely and do not replace the user's HOME |
| OPS-04 | Hosting identifies production owner, preview approval behavior, domain, budget and backup operator; generated-state branches do not publish the portal |
| OPS-05 | Public-fork previews must be rehearsed without sensitive build credentials or participant execution |
| OPS-06 | Record local and published AFDocs results, link checks and a newcomer walkthrough before declaring event readiness |
| OPS-07 | Keep a tested rollback revision and archive plan; freeze accepted project revisions after the event |

## Starting-state choice

- **STATE-CHOICE-01:** Invite teams to start from any upstream state at a declared full SHA; 004 is an example path, never an eligibility gate. Recommend convergence states by default, using upstream `isConvergence` / `convergenceLevel` metadata, and keep all states available through an explicit filter. Explain that convergence combines exploration tracks into an integrated demo/state; a specific exploration state can be preferable for a particular need.
- **STATE-CHOICE-02:** Resolve lineage by repository, revision and state ID. For a team pin different from the event pin, display both and link to revision-correct sources. Never invent ancestry through the 004 Lab baseline.
- **STATE-CHOICE-03:** Separate registration eligibility from event runtime support. Record prerequisites, resources, isolation allocation, operator support and verification evidence for each chosen starting point.
- **STATE-CHOICE-04:** Explain current dispatch limits and the isolated pinned-upstream generation workflow. Arbitrary team-state generation and remote lineage validation must pass their own implementation gates before being advertised as automated.

## Current implementation boundary

Implemented in the starter: GitHub Pages subpath build/artifact workflow with automatic deployment from main, Docusaurus portal, state references, two Lab state contracts, raw-source mirrors, upstream logo provenance, participant/operator documentation, intake-link preparation, structural registry schema/tests, baseline layout generation and a repeatable documentation transform.

Not established by this pack: full baseline/runtime reproduction, general team-state scaffold/dispatch, final participant-manifest schema, remote registration validation, actual project-page ingestion, featured importer, production deployment and hosted fork previews, AFDocs results and an observed newcomer rehearsal. Registry publication remains disabled. Consult [current gates](../../docs/planning/gates.md), which may evolve after this document.

## Acceptance

Use the [acceptance matrix](acceptance.md). Every pass records the source revision, environment, command or observed journey, result and limitations. Do not mark a release ready when a required gate is merely documented.

[Operator playbook](../../docs/operators/index.md) · [Implementation plan](plan.md) · [Tasks](tasks.md) · [System contract](system/contract.md)
