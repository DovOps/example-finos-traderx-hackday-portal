#!/usr/bin/env bash
# Run generated Java test tasks in JDK 21; export the actual booking test report.
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/overlay/runtime/env-loader.sh"
cd "$OVERLAY_ROOT"
runtime="$OVERLAY_ROOT/generated/code/target-generated"
[[ -f "$runtime/trade-processor/src/test/java/finos/traderx/tradeprocessor/service/TradeCommitTest.java" ]] || {
  echo 'Generate the baseline or evidence-card example before running Java tests.' >&2
  exit 1
}
docker build --progress=plain -f pipeline/JavaTests.Dockerfile \
  --output "type=local,dest=$OVERLAY_ROOT/generated/java-test-results" "$runtime"
python3 - "$OVERLAY_ROOT/generated/java-test-results/trade-processor/test-results/test" <<'PY'
from pathlib import Path
import sys
import xml.etree.ElementTree as ET
reports = list(Path(sys.argv[1]).glob('TEST-*.xml'))
assert reports, 'Missing booking test report'
total = 0
for report in reports:
    suite = ET.parse(report).getroot()
    assert int(suite.get('failures', 0)) == 0 and int(suite.get('errors', 0)) == 0, 'Java tests failed'
    total += int(suite.get('tests', 0)) - int(suite.get('skipped', 0))
assert total > 0, 'No Java booking tests executed'
print(f'PASS: {total} executed booking tests. Other modules may report NO-SOURCE; inspect the log.')
PY
