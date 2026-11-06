#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/runtime/env-loader.sh"
[[ "$#" == 1 && -d "$1" && ! -L "$1/HACKDAY-EVIDENCE.md" ]] || { echo 'Expected existing generated target directory and regular output' >&2; exit 2; }
cat > "$1/HACKDAY-EVIDENCE.md" <<'EOF'
# Experiment evidence

Status: exploring. This worksheet is not proof of runtime success.

- Overlay revision:
- Upstream pin:
- Starting state: 004-containerized-compose-runtime
- Experiment state: lab-005-evidence-card
- Environment and exact commands:
- Expected behavior:
- Observed behavior and evidence links:
- Inherited capability checks:
- Negative findings and limitations:
- Reproduction reviewer and date (with consent):
- Cleanup outcome:
EOF
