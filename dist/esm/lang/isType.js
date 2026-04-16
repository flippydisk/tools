/**
 * @function isType
 * @description Checks to see if the provided item is a valid type match
 *
 * @parent Lang
 *
 * @param expr {String} a String version of the 'type' you're looking to check for a match
 * @param object {String|Array|Function|Object} the item you're checking against
 * @return {Boolean} will return true if thing is a valid match. Otherwise it will return false.
 */
export default function isType(expr, object) {
    return expr.test(Object.prototype.toString.call(object));
}
