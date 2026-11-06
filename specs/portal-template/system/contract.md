# Portal-template system contract

## Sources and trust boundaries

1. The event repository owns reviewed docs, specs, catalog, registry and website code.
2. The upstream submodule supplies a fixed TraderX source/catalog revision. Logo provenance may name a different reviewed upstream revision.
3. The portal builder compiles reviewed local Markdown and catalog data to static output. Generated content and website static staging are disposable outputs.
4. Team repositories are external sources. Intake links collect references only. Future ingestion treats a manifest as data, not an execution grant.
5. Hosting publishes the built documentation site. Runtime infrastructure has independent ownership, ports, credentials and validation.

The present builder rejects nonempty registries. No operator playbook step authorizes disabling that guard without implementing and verifying the acceptance requirements.

## Ownership of artifacts

| Artifact | Authoritative owner | Review boundary |
| --- | --- | --- |
| Event title, edition, banner and support policy | Event operator | Event source PR |
| Upstream pin and baseline selection | Technical maintainer | Regeneration and runtime evidence |
| Team spec/transform/guide | Team fork | Team implementation PR |
| Project manifest | Team fork | Pinned manifest validation and human review |
| Central registration entry | Central Lab | Metadata-only registry PR |
| Evidence status and preserved snapshot | Registry reviewers | Evidence, consent, license and revision review |
| Generated code branch | Source-generation pipeline | Snapshot provenance and separate publishing policy |

## Event provenance record

For each edition, record starter repository/ref/SHA, event repository, selected upstream SHA, asset provenance revision, baseline states, portal URL, operator/backup, registry reviewer, support channel, registration mode, validation evidence locations, freeze date and maintenance/archive owner. Store the record in the event repository, excluding credentials and unconsented personal details.

Registration mode is an operational declaration: `intake-only` until publication gates pass, then `reviewed-publication`. The current code does not expose a mode switch; recording the latter does not enable ingestion.

## Data invariants

Project/state IDs remain unique; parent references resolve; local verification is distinct from upstream maturity; accepted source revisions are immutable; event snapshots are frozen; personal details have recorded consent; source licenses and attribution are retained. Missing external sources produce an explicit availability status rather than fabricated content.

## Navigation and discovery

Operator playbook → participant guides/prompts → registration process → specs/acceptance. State → learning guide → system contract and back. Agent readers can discover the same documents through Markdown mirrors and llms.txt. Current raw mirrors retain repository-relative links; use the index for navigation outside that source tree.

[Requirements](../spec.md) · [Operator playbook](../../../docs/operators/index.md)
