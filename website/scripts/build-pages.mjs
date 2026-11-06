import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const result = spawnSync('npm', ['run', 'build'], {
  cwd: fileURLToPath(new URL('..', import.meta.url)),
  env: {...process.env, PORTAL_TARGET: 'github-pages'},
  stdio: 'inherit',
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
