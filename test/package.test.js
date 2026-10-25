import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const require = createRequire(import.meta.url);

test('built ESM exposes supported root and subpath exports', async () => {
	const root = await import('../dist/esm/index.js');
	const { default: Debug } = await import('../dist/esm/debug/debug.js');
	const { default: ajax } = await import('../dist/esm/json/ajax.js');

	assert.deepEqual(Object.keys(root).sort(), ['Debug', 'Disable', 'Json', 'Lang']);
	assert.equal(root.Debug, Debug);
	assert.equal(typeof ajax, 'function');
});

test('built CommonJS preserves root and direct default subpath shapes', () => {
	const root = require('../dist/cjs/index.cjs');
	const Debug = require('../dist/cjs/debug/debug.cjs');
	const ajax = require('../dist/cjs/json/ajax.cjs');

	assert.deepEqual(Object.keys(root).sort(), ['Debug', 'Disable', 'Json', 'Lang']);
	assert.equal(typeof root.Debug, 'function');
	assert.equal(typeof Debug, 'function');
	assert.equal(typeof ajax, 'function');
	assert.equal(new Debug({ debug: true, control: 'CJS' }).options.debug, true);
});
