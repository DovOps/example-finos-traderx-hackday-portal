const {test} = require('node:test');
const assert = require('node:assert/strict');
const location = require('../site-location.cjs');
test('local preview stays at root', () => assert.deepEqual(location({}), {url:'http://localhost:4173',baseUrl:'/'}));
test('Pages derives owner and repository path', () => assert.deepEqual(location({PORTAL_TARGET:'github-pages',GITHUB_REPOSITORY:'DovOps/example-finos-traderx-hackday-portal'}), {url:'https://dovops.github.io',baseUrl:'/example-finos-traderx-hackday-portal/'}));
test('account Pages uses root', () => assert.equal(location({PORTAL_TARGET:'github-pages',GITHUB_REPOSITORY:'DovOps/dovops.github.io'}).baseUrl,'/'));
test('explicit hosting overrides', () => assert.deepEqual(location({PORTAL_URL:'https://example.com',PORTAL_BASE_URL:'/event/'}),{url:'https://example.com',baseUrl:'/event/'}));
test('invalid path fails closed', () => assert.throws(()=>location({PORTAL_BASE_URL:'event'})));
