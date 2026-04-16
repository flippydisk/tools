/**
 * @function isUndefined
 * @parent Lang
 * @description Checks to see if the provided item is undefined or not
 *
 * @param thing {Array|String|Object} item to be tested for its existence
 * @return {Boolean} will return true if thing is null, undefined, NaN. Otherwise it will return null.
 */
export default function isUndefined(thing) {
    return typeof thing === 'undefined';
}
