/**
 * @function isNumber
 * @description Checks to see if the provided item is a valid number or not
 *
 * @parent Lang
 *
 * @param thing {Array|String|Object} item to be tested for its value as a number
 * @return {Boolean} will return true if thing is a valid number. Otherwise it will return false.
 */
export default function isNumber(thing) {
    return typeof thing === 'number' && !isNaN(thing);
}
