/**
 * @function isNullish
 * @description More specific than falsy. '', 0, and -0 will evaluate
 * as false so that functions that want to validly return
 * these can do so, and be tested for problematic response.
 *
 * @parent Lang
 *
 * @param thing {Object} thing to be tested
 * @return {Boolean} will return true if thing is null, undefined, NaN.
 *                    Otherwise it will return false.
 */
export default function isNullish(thing) {
    const type = typeof thing;
    return (
        type === 'undefined' ||
        (type === 'object' && thing === null) ||
        (type === 'number' && isNaN(thing)) ||
        (type === 'string' && thing === '')
    );
}
