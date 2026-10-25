import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import Disable from '../src/disable/disable.js';

const originalLocation = globalThis.location;

afterEach(() => {
	if (originalLocation === undefined) delete globalThis.location;
	else Object.defineProperty(globalThis, 'location', { configurable: true, value: originalLocation });
});

test('Disable is safe in Node and honors explicit configuration', () => {
	delete globalThis.location;
	assert.equal(new Disable({ control: 'Feature' }).isDisabled(), false);
	assert.equal(new Disable({ disable: true, control: 'Feature' }).isDisabled(), true);
});

test('Disable reads repeated URL parameters', () => {
	Object.defineProperty(globalThis, 'location', {
		configurable: true,
		value: { search: '?disable=One&disable=Two' },
	});

	assert.equal(new Disable({ control: 'Two' }).isDisabled(), true);
	assert.equal(new Disable({ control: 'Three' }).isDisabled(), false);
});
