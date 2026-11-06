# TraderX Hackday Lab

Independent proof of concept for a proposed FINOS hackday; not an official FINOS service. Built from the finos-hack template, with TraderX attribution. Organizer handover remains pending.

Start with [the participant guide](docs/get-started.md), [team fork workflow](docs/participating.md), [registration and updates](docs/registration.md), [learning paths](docs/learning/index.md), [evidence gates](docs/planning/gates.md) and [published roadmap](https://github.com/DovOps/example-finos-traderx-hackday-portal/issues/1).

## Run another hackday

Use the [operator playbook](docs/operators/index.md), [coaching prompts](docs/operators/prompts.md) and [registration review checklist](docs/operators/review.md). The [reusable portal spec pack](specs/portal-template/spec.md) records detailed requirements, implementation phases, tasks, system boundaries and acceptance evidence for a future event template.

## Local portal

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python scripts/lab.py check
.venv/bin/python -m unittest discover -s tests
npm --prefix website ci
.venv/bin/python scripts/lab.py build
npm --prefix website run serve
```

The Docusaurus portal presents pinned upstream state references alongside Lab specs, learning guides, challenges and the participant registry. It reuses TraderX’s navy/cyan documentation theme with a Hackday Lab label and a link to the official documentation.

The portal is a documentation prototype, not a hosted TraderX runtime. Registry starts empty. Synthetic participant repositories and runtime rehearsal remain planned. GitHub Pages artifact builds are configured; successful builds on `main` deploy automatically.

## GitHub Pages

The [spec portal workflow](.github/workflows/spec-portal.yml) validates and builds on pushes and PRs to `main`, and on manual runs. It uploads a `github-pages` artifact containing the deployable `dist/` tree. It does not run TraderX services or ingest participant code.

Expected site: https://dovops.github.io/example-finos-traderx-hackday-portal/

To enable hosting:

1. In repository **Settings → Pages**, select **GitHub Actions** as the source.
2. Run **Build spec portal** on `main` from the Actions tab. Subsequent pushes to `main` deploy automatically; PRs only build.

The deployment job uses the `github-pages` environment. Apply any desired environment protection to `main`. Successful builds on `main` deploy automatically. No repository variable is required; pull requests never deploy.

```sh
npm --prefix website run build:pages
python3 scripts/check-site.py dist --base-url /example-finos-traderx-hackday-portal/
```

`build:pages` derives the origin and base path from `GITHUB_REPOSITORY` in Actions, or `portal/config.json` locally. For this repo it uses `https://dovops.github.io` and `/example-finos-traderx-hackday-portal/`. `PORTAL_URL` and `PORTAL_BASE_URL` support explicit overrides. Ordinary `npm --prefix website run build` keeps the local `/` preview. Both commands replace `dist/`; rebuild locally before serving a root-path preview.

See [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Docusaurus URL configuration](https://docusaurus.io/docs/api/docusaurus-config#baseUrl).

## Overlay

Upstream TraderX is pinned in `upstream/traderX`; event changes live here. See [tooling](docs/tooling.md) and [specification](specs/lab-foundation/spec.md). Generated outputs are ignored and never the source of durable changes. See the [runtime rehearsal](docs/planning/runtime-rehearsal.md) for start/test/stop commands and required evidence.

## Contributing and license

Follow [AGENTS.md](AGENTS.md) and [CONTRIBUTING.md](CONTRIBUTING.md). Every commit requires a DCO sign-off matching the configured human author.

Copyright 2026 FINOS. Distributed under [Apache 2.0](LICENSE). Preserve [NOTICE](NOTICE) and upstream attribution. SPDX-License-Identifier: Apache-2.0.
