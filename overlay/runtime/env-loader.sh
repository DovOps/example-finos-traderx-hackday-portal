#!/usr/bin/env bash
# Source this loader; never alter the user's HOME or install tools implicitly.
if [[ "${HACKDAY_ENV_LOADED:-0}" == 1 ]]; then return 0; fi
OVERLAY_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
export OVERLAY_ROOT
for tool in git python3 node npm jq; do
  command -v "$tool" >/dev/null || { echo "Missing required tool: $tool" >&2; return 1; }
done
[[ "$(node --version)" == v24.0.1 ]] || { echo 'Generation requires Node v24.0.1; activate it explicitly.' >&2; return 1; }
[[ "$(jq --version)" == jq-1.8.1 ]] || { echo 'Generation requires jq 1.8.1.' >&2; return 1; }
[[ "$(python3 --version)" == 'Python 3.14.3' ]] || { echo 'Generation requires Python 3.14.3.' >&2; return 1; }
export PATH
export HACKDAY_ENV_LOADED=1
printf '[env] %s / %s / %s\n' "$(node --version)" "$(jq --version)" "$(python3 --version)"
