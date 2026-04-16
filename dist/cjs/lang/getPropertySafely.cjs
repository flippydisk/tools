/**
 * @function getPropertySafely
 * @description Safe way to get a nested property. It can be used to safely retrieve
 * a nested property from an object without having to do all the checks (e.g. if an
 * object is undefined and you're trying to get `obj.property.nested.property` it will
 * throw an error).
 *
 * @parent Lang
 *
 * @param {Object} obj Object to retrieve nested property from
 * @param {String} propPath Path to the property to be retrieved
 *
 * @return {String|Array|Object|Function|undefined} Returns the value of the property or undefined
 *
 * @api getPropertySafely({a: {b: 'c'}}, 'a.b') -> 'c'
 * getPropertySafely({a: {b: 'c'}}, 'a') -> {b: 'c'}
 * getPropertySafely({a: {b: 'c'}}, 'd.b') -> undefined
 */
function getPropertySafely(obj, propPath) {
    if (
        typeof obj === 'object' &&
        typeof propPath === 'string' &&
        obj !== null &&
        Object.keys(obj).length &&
        propPath.length
    ) {
        const path = propPath.split('.');
        const len = path.length;
        let current = obj;

        for (let i = 0; i < len; i += 1) {
            if ((current === null || current === undefined || Number.isNaN(current))) {
                return i === len ? current : undefined;
            }

            if (Object.prototype.hasOwnProperty.call(current, path[i])) {
                current = current[path[i]];
            } else {
                return undefined;
            }
        }

        return current;
    }
    return undefined;
}

module.exports = getPropertySafely;
module.exports.default = getPropertySafely;
