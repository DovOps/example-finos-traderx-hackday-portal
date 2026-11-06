# Hackday Lab foundation

Independent overlay; upstream is a pinned submodule, never a participant registry. One team forks the overlay once and uses normal feature branches. Demonstrated learning, including negative findings, is a successful outcome without any merge requirement.

Canonical inputs: catalog state metadata, state specs/plan/tasks/system contracts, learning guides, portal config and reviewed registry. Portal outputs are escaped HTML plus copied Markdown/JSON/schema for agents. No remote participant code runs during a build. Registration starts empty; Orbit/Nova are planned synthetic fixtures.

A registration is an exact repository SHA plus hackday/project.yaml. Version 1 registry entries are structurally validated locally. Remote revision resolution, participant manifest schema, bounded featured ingestion and consent verification must pass before accepting registrations. Until those gates exist, nonempty registry builds fail closed.

Status vocabulary: exploring (work underway), demonstrated (revision-linked demo evidence), reproducible (independent reproduction evidence), maintained (named owner and fresh review), archived (frozen evidence). A docs build grants none of these statuses.

See [gates](../../docs/planning/gates.md) and [system](system/contract.md).


## Portal implementation

Overlay-owned Docusaurus 3.10.1 with TraderX's navy/cyan documentation theme. Upstream logo assets, a separate Hackday Lab title and a muted blue official-documentation banner linking official documentation distinguish the event portal. Navigation includes Get started, States & learning, Specs, Challenges and Projects & teams.

The state explorer combines all state metadata from the pinned upstream catalog with Lab states. Its default view is the hackday path; visitors can select all references or Lab-only states and search by ID/title. Every detail page exposes lineage, ownership, pin, specification, guide and local verification status. Upstream implemented status is never promoted to locally verified.

Upstream guides and specs link to the pinned GitHub revision; separate links identify the latest official guide and moving generated branch. Participant ingestion remains disabled. No participant MDX or scripts enter the documentation build. Local guides and specs render as Markdown, with Mermaid and normal sidebar navigation. Raw Markdown/JSON/schema mirrors are under /source and indexed by /llms.txt.

Run npm ci in website, then the content checks and production build. Broken links fail the build. Portal identity belongs in portal/config.json and overlay config; the upstream submodule is unchanged.


The [reusable portal spec pack](../portal-template/spec.md) and [operator playbook](../../docs/operators/index.md) capture requirements and setup/coaching/review guidance for future events.
