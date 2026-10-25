import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import ajax from '../src/json/ajax.js';

const originalFetch = globalThis.fetch;

afterEach(() => {
	globalThis.fetch = originalFetch;
});

test('ajax parses JSON, forwards options, and supports callbacks', async () => {
	const controller = new AbortController();
	let received;
	globalThis.fetch = async (endpoint, options) => {
		received = { endpoint, options };
		return new Response('{"answer":42}', {
			headers: { 'content-type': 'application/json' },
		});
	};

	const result = await ajax('/data', data => data.answer, {
		headers: { accept: 'application/json' },
		signal: controller.signal,
	});

	assert.equal(result, 42);
	assert.equal(received.endpoint, '/data');
	assert.equal(received.options.signal, controller.signal);
});

test('ajax handles text and empty responses', async () => {
	globalThis.fetch = async () => new Response('plain text', {
		headers: { 'content-type': 'text/plain' },
	});
	assert.equal(await ajax('/text'), 'plain text');

	globalThis.fetch = async () => new Response(null, { status: 204 });
	assert.equal(await ajax('/empty'), null);
});

test('ajax rejects HTTP failures with response details', async () => {
	globalThis.fetch = async () => new Response('{"reason":"missing"}', {
		status: 404,
		statusText: 'Not Found',
		headers: { 'content-type': 'application/json' },
	});

	await assert.rejects(ajax('/missing'), error => {
		assert.equal(error.name, 'HTTPError');
		assert.equal(error.status, 404);
		assert.deepEqual(error.data, { reason: 'missing' });
		return true;
	});
});

test('ajax preserves network, JSON parsing, and abort failures', async () => {
	const networkError = new Error('offline');
	globalThis.fetch = async () => { throw networkError; };
	await assert.rejects(ajax('/network'), error => error === networkError);

	globalThis.fetch = async () => new Response('{bad', {
		headers: { 'content-type': 'application/json' },
	});
	await assert.rejects(ajax('/malformed'), SyntaxError);
});

test('ajax validates its public arguments', async () => {
	await assert.rejects(ajax(), /requires an endpoint/);
	await assert.rejects(ajax('/data', 'invalid'), /callback must be a function/);

	globalThis.fetch = undefined;
	await assert.rejects(ajax('/data'), /global Fetch implementation/);
});
