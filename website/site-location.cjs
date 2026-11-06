const config = require('../portal/config.json');

function siteLocation(env = process.env) {
  const pages = env.PORTAL_TARGET === 'github-pages';
  const repository = env.GITHUB_REPOSITORY || new URL(config.repository).pathname.slice(1);
  const [owner, name] = repository.split('/');
  if (!owner || !name || repository.split('/').length !== 2) throw Error('Expected owner/repository');
  const url = env.PORTAL_URL || (pages ? `https://${owner.toLowerCase()}.github.io` : 'http://localhost:4173');
  const baseUrl = env.PORTAL_BASE_URL || (pages && name.toLowerCase() !== `${owner.toLowerCase()}.github.io` ? `/${name}/` : '/');
  if (!/^\/(?:[A-Za-z0-9_.-]+\/)*$/.test(baseUrl)) throw Error('PORTAL_BASE_URL must have leading and trailing slashes');
  if (new URL(url).pathname !== '/') throw Error('PORTAL_URL must be an origin; put the path in PORTAL_BASE_URL');
  return {url, baseUrl};
}
module.exports = siteLocation;
