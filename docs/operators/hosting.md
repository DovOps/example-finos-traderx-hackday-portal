# GitHub Pages hosting

The [spec portal workflow](https://github.com/DovOps/example-finos-traderx-hackday-portal/blob/main/.github/workflows/spec-portal.yml) validates and builds on pushes and PRs to `main`, and on manual runs. It uploads a `github-pages` artifact containing the deployable `dist/` tree. It does not run TraderX services or ingest participant code.

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
