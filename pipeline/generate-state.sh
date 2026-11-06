#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/overlay/runtime/env-loader.sh"
cd "$OVERLAY_ROOT"
state="${1:-}"
case "$state" in lab-004-baseline|lab-005-evidence-card) ;; *) echo 'Expected lab-004-baseline or lab-005-evidence-card' >&2; exit 2;; esac
[[ "$#" == 2 && "$2" == --dry-run ]] || { echo 'Usage: generate-state.sh <state> --dry-run (layout only)' >&2; exit 2; }
# Fixed output boundary for this first implementation. Reject arbitrary deletion targets.
expected_root="$OVERLAY_ROOT/generated"
[[ "${TRADERX_GENERATED_ROOT:-$expected_root}" == "$expected_root" ]] || { echo 'Output must be overlay-owned generated/' >&2; exit 2; }
[[ ! -L "$expected_root" ]] || { echo 'Refusing symlink output root' >&2; exit 2; }
mkdir -p "$expected_root"
mkdir "$expected_root/.overlay-lock" || { echo 'Generation already active; inspect before removing stale lock.' >&2; exit 1; }
trap 'rmdir "$expected_root/.overlay-lock"' EXIT
pin="$(python3 -c 'import json;print(json.load(open("portal/config.json"))["upstreamPin"])')"
[[ "$(git -C upstream/traderX rev-parse HEAD)" == "$pin" ]] || { echo 'Submodule pin mismatch' >&2; exit 1; }
[[ -z "$(git -C upstream/traderX status --porcelain)" ]] || { echo 'Upstream submodule must be clean' >&2; exit 1; }
# Upstream generation refreshes source docs. Isolate those writes from the submodule.
scratch="$(mktemp -d "$expected_root/source.XXXXXX")"
trap 'rm -rf "$scratch"; rmdir "$expected_root/.overlay-lock"' EXIT
git clone --quiet --shared "$OVERLAY_ROOT/upstream/traderX" "$scratch"
git -C "$scratch" checkout --quiet --detach "$pin"
# The local shared clone is only a transport optimization. Generated UI links
# must identify public upstream source, not the local filesystem clone path.
git -C "$scratch" remote set-url origin "$(git config -f .gitmodules --get submodule.upstream/traderX.url)"
export TRADERX_GENERATED_ROOT="$expected_root"
bash "$scratch/pipeline/generate-state.sh" 004-containerized-compose-runtime
if [[ "$state" == lab-005-evidence-card ]]; then
  bash "$OVERLAY_ROOT/overlay/transforms/apply-evidence-card.sh" "$expected_root/code/target-generated"
fi
printf '[ok] layout generated for %s; no services started; runtime unverified\n' "$state"
