/**
 * @function isEmptyObject
 * @parent Lang
 * @description Checks if an object is empty.
 * @param {Object} obj - The object to check for properties.
 * @return {Boolean} True if the object doesn't have any own properties. Otherwise it returns false.
 */
import isNullish from './isNullish.js';

 
export default function isEmptyObject(obj) {
	if (typeof obj !== 'object' || isNullish(obj)) return true;
	return Object.keys(obj).length === 0;
}
