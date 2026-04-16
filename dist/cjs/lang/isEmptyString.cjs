const isNull = require("./isNull.cjs");
const getStringSafely = require("./getStringSafely.cjs");

/**
 * @function isEmptyString
 * @description Checks to see if a string provided is empty or not.
 *
 * @parent Lang
 *
 * @param string {String} string to be tested
 * @return {Boolean} will return true if thing is null, undefined, NaN.
 *                    Otherwise it will return false.
 */
function isEmptyString(string) {
    if (!isNull(getStringSafely(string))) {
        return getStringSafely(string) === '';
    }
    return false;
}

module.exports = isEmptyString;
module.exports.default = isEmptyString;
