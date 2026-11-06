#!/usr/bin/env bash
# Operate only this overlay's Compose project. Stop retains files; upstream startup resets demo tables.
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/overlay/runtime/env-loader.sh"
cd "$OVERLAY_ROOT"
[[ "$#" == 1 ]] || { echo 'Usage: runtime.sh start|restart|test|status|stop' >&2; exit 2; }
export TRADERX_GENERATED_ROOT="$OVERLAY_ROOT/generated"
export COMPOSE_PROJECT_NAME=traderx-hackday-lab-004
runtime="$TRADERX_GENERATED_ROOT/code/target-generated"
compose="$runtime/containerized-compose/docker-compose.yml"
[[ -f "$compose" ]] || { echo 'Generate lab-004-baseline first.' >&2; exit 1; }
case "$1" in
  start) bash "$runtime/scripts/start-state-004-containerized-generated.sh" ;;
  restart) echo '[notice] Restart runs upstream schema setup and resets demo trades/positions.'; bash "$runtime/scripts/start-state-004-containerized-generated.sh" --skip-build ;;
  test) bash "$runtime/scripts/test-state-004-containerized.sh" ;;
  status) docker compose -f "$compose" --project-name "$COMPOSE_PROJECT_NAME" ps -a ;;
  stop) docker compose -f "$compose" --project-name "$COMPOSE_PROJECT_NAME" stop ;;
  *) echo 'Usage: runtime.sh start|restart|test|status|stop' >&2; exit 2 ;;
esac
