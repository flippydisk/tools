import assert from 'node:assert/strict';
import { afterEach, describe, test } from 'node:test';
import Debug from '../src/debug/debug.js';

const originalConsole = globalThis.console;
const originalLocation = globalThis.location;

function installConsole() {
	const calls = Object.fromEntries(
		['log', 'info', 'warn', 'error', 'debug', 'table', 'trace']
			.map(type => [type, []]),
	);
	globalThis.console = Object.fromEntries(Object.entries(calls).map(([type, entries]) => [
		type,
		(...args) => entries.push(args),
	]));
	return calls;
}

function setSearch(search) {
	Object.defineProperty(globalThis, 'location', {
		configurable: true,
		value: { search },
	});
}

afterEach(() => {
	globalThis.console = originalConsole;
	if (originalLocation === undefined) delete globalThis.location;
	else Object.defineProperty(globalThis, 'location', { configurable: true, value: originalLocation });
});

describe('Debug', () => {
	test('is disabled by default and is safe without browser globals', () => {
		const calls = installConsole();
		delete globalThis.location;
		const debug = new Debug();

		assert.equal(debug.options.debug, false);
		assert.equal(debug.log('hidden'), false);
		assert.deepEqual(calls.log, []);
		assert.deepEqual(calls.error, []);
	});

	test('supports explicit server-side debugging and preserves prefixes and arguments', () => {
		const calls = installConsole();
		delete globalThis.location;
		const debug = new Debug({ debug: true, control: 'Server' });
		const object = { ready: true };

		assert.deepEqual(calls.info.shift(), ['Server:', 'Enabling File Debug mode for', 'Server']);
		assert.equal(debug.log('message', object, null, undefined), true);
		assert.deepEqual(calls.log[0], ['Server:', 'message', object, null, undefined]);
	});

	test('routes every console method, including trace', () => {
		const calls = installConsole();
		const debug = new Debug({ debug: true, control: 'Methods' });
		calls.info.length = 0;

		for (const type of ['log', 'info', 'warn', 'error', 'debug', 'table', 'trace']) {
			assert.equal(debug[type](type), true);
			assert.deepEqual(calls[type][0], ['Methods:', type]);
		}
	});

	test('activates one or all controls from repeated URL parameters', () => {
		const calls = installConsole();
		setSearch('?debug=First&debug=Second');
		const first = new Debug({ control: 'First' });
		const third = new Debug({ control: 'Third' });

		assert.equal(first.options.debug, true);
		assert.equal(third.options.debug, false);
		setSearch('?debug=All&debug=Third');
		const all = new Debug({ control: 'Third' });
		assert.equal(all.options.debug, true);
		assert.deepEqual(calls.info.at(-1), ['Third:', 'Enabling URL Debug mode for', 'All']);
	});

	test('preserves custom options and no-argument return values', () => {
		installConsole();
		setSearch('?inspect=Everything');
		const debug = new Debug({
			control: 'Custom',
			param: 'inspect',
			debugAll: 'Everything',
			urlMode: 'URL',
			fileMode: 'FILE',
			concatenator: ' >',
		});

		assert.equal(debug.options.debug, true);
		assert.equal(debug.log(), null);
		assert.equal(debug.log('visible'), true);
	});
});
