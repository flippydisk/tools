import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import * as Lang from '../src/lang/lang.js';

describe('Lang', () => {
	test('retains the complete utility namespace', () => {
		assert.deepEqual(Object.keys(Lang).sort(), [
			'filterHTMLTags', 'getPropertySafely', 'getStringSafely', 'isEmptyObject',
			'isEmptyString', 'isNull', 'isNullish', 'isNumber', 'isObject',
			'isStringy', 'isType', 'isUndefined', 'isValidObject',
		].sort());
	});

	test('strips markup without claiming to sanitize HTML', () => {
		assert.equal(Lang.filterHTMLTags('<p>Hello</p> &lt;b&gt;world&lt;/b&gt;'), 'Hello world');
	});

	test('gets own nested properties safely', () => {
		const value = { one: { two: { three: null } } };
		assert.equal(Lang.getPropertySafely(value, 'one.two.three'), null);
		assert.equal(Lang.getPropertySafely(value, 'one.missing.value'), undefined);
		assert.equal(Lang.getPropertySafely(value, '__proto__.value'), undefined);
		assert.equal(Lang.getPropertySafely(null, 'one'), undefined);
	});

	test('preserves string coercion behavior', () => {
		assert.equal(Lang.getStringSafely(''), '');
		assert.equal(Lang.getStringSafely(1), '1');
		assert.equal(Lang.getStringSafely(false), 'false');
		assert.equal(Lang.getStringSafely({ one: 'thing' }), '{"one":"thing"}');
		const circular = {};
		circular.self = circular;
		assert.equal(Lang.getStringSafely(circular), null);
		assert.equal(Lang.getStringSafely(undefined), null);
		assert.equal(Lang.getStringSafely(() => true), null);
	});

	test('preserves predicate distinctions', () => {
		assert.equal(Lang.isEmptyObject({}), true);
		assert.equal(Lang.isEmptyObject([]), true);
		assert.equal(Lang.isEmptyObject({ value: false }), false);
		assert.equal(Lang.isEmptyString(''), true);
		assert.equal(Lang.isEmptyString(null), false);
		assert.equal(Lang.isNull(null), true);
		assert.equal(Lang.isNullish(''), true);
		assert.equal(Lang.isNullish(0), false);
		assert.equal(Lang.isNumber(Number.NaN), false);
		assert.equal(Lang.isNumber(Infinity), false);
		assert.equal(Lang.isNumber(0), true);
		assert.equal(Lang.isObject({}), true);
		assert.equal(Lang.isObject([]), false);
		assert.equal(Lang.isStringy([]), true);
		assert.equal(Lang.isType(/Date/, new Date()), true);
		assert.equal(Lang.isUndefined(undefined), true);
		assert.equal(Lang.isValidObject({ value: true }), true);
	});
});
