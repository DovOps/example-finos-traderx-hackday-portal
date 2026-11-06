# Operator registration review checklist

Use this checklist as a human review contract. Remote manifest validation, accepted project rendering and previews are not yet implemented here. Do not substitute this checklist for those missing gates or disable the build guard to accept entries.

## Intake: safe to collect before publication is enabled

- Identify the stable project/team ID, question and maintenance contact.
- Confirm the request links to the intended public team repository and pushed full SHA.
- Accept any upstream starting state, including later states. Resolve its ID in the catalog at the declared full upstream SHA; collect experiment IDs and pinned guide/spec links. Do not require 004 ancestry. No hosted team website is required.
- If the team pin differs from the event pin, retain both and require revision-correct links. Record tools, services, resources and support needs separately from registration eligibility; unverified projects can remain exploring.
- Record whether the manifest is a draft or validated against an authoritative versioned schema.
- Keep unfinished work as exploring. Ask for evidence and limitations rather than polished claims.
- Include only consented personal information. A public GitHub profile is not consent to display it here.
- Explain what happens next and which publication gates remain unavailable.

## Publication: after the required capabilities exist

| Check | Reviewer action | Reject or defer when |
| --- | --- | --- |
| Source | Resolve supported public repository and exact commit | Mutable ref, missing/deleted revision or unsupported fetch target |
| Manifest | Validate version, required fields and bounded paths at that revision | Invalid schema, traversal, missing files or excessive content |
| Identity/lineage | Resolve unique project/state IDs and starting pin | Duplicate IDs, unknown parents or inconsistent provenance |
| Evidence | Inspect revision-linked demo/reproduction records | Claim exceeds evidence or revision is ambiguous |
| Consent/license | Confirm displayed profiles, attribution and import rights | Consent missing or content license unclear |
| PR scope | Diff central registry metadata against current central base | Implementation commits, unrelated changes or participant submodule |
| Preview | Verify links, project/state relationships and honest status text | Broken links, false runtime claims or preview unavailable |
| Acceptance | Record reviewer, revision and outcome | Required technical or human checks have not passed |

No review step requires executing participant scripts or MDX in the portal build. Featured documentation/image imports need their own bounded import and preservation checks. A passing docs build is not a runtime test.

## Updates, failures and corrections

For an update, compare old/new accepted SHAs and evidence, then use another reviewed registry PR. Preserve frozen event records. If the external source becomes unavailable, mark availability honestly; retain previously approved preserved content when appropriate. Correct or remove consented profiles when requested, and document the handling without republishing private information.

Escalate unresolved source, consent, licensing or status questions to the named event owner. Keep the entry pending instead of inventing missing values. Implementation contribution and upstream graduation remain separate reviews.

[Operator playbook](index.md) · [Participant registration guide](../registration.md) · [Acceptance matrix](../../specs/portal-template/acceptance.md)
