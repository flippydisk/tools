import isNullish from './isNullish.js';

/**
 * @function getStringSafely
 * @description A safer version of toString(). To avoid getting 'NaN' or other
 * non-real string values. It will coerce strings out of booleans,
 * numbers, objects with their own toString() function, and of course
 * strings.
 *
 * @parent Lang
 *
 * @param thing {Boolean|String|Object} thing to be converted to string.
 * @return {string|null} the coerced string, null if unable.
 */
export default function getStringSafely(thing) {
	const type = typeof thing;

	// it is already a string, return it.
	if (type === 'string') return thing;

	// if it is nullish, return null.
	if (isNullish(thing)) return null;

	// convert numbers and booleans to strings.
	if (type === 'number' || type === 'boolean') return String(thing);

	// it is an object with it's own toString implementation. Hopefully it is meaningful.
	if (
		type === 'object' &&
        Object.prototype.hasOwnProperty.call(thing, 'toString') &&
        typeof thing.toString === 'function'
	) {
		try {
			return thing.toString();
		} catch {
			return null;
		}
	}

	// it is an object without it's own toString implementation. Let's JSON.stringify() it
	if (
		type === 'object' &&
        !Object.prototype.hasOwnProperty.call(thing, 'toString')
	) {
		try {
			return JSON.stringify(thing) ?? null;
		} catch {
			return null;
		}
	}

	// no telling what it is, return null.
	return null;
}
