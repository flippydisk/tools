/**
 * @function isNull
 * @description Checks to see if the provided item is null or not
 *
 * @parent Lang
 *
 * @param {Object} thing item to be tested
 * @return {Boolean} will return true if thing is a valid object. Otherwise it will return false.
 */
export default function isNull(thing) {
    return typeof thing === 'object' && thing === null;
}
