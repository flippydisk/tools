const getStringSafely = require("./getStringSafely.cjs");

/**
 * @function isStringy
 * @description Using the same rules as getStringSafely returns true if a string can be safely coerced, false if not.
 *
 * @parent Lang
 *
 * @param thing {String|Object} thing to be tested.
 * @return {Boolean} true if it can be safely coerced into a string. false if not.
 */
function isStringy(thing) {
    return getStringSafely(thing) !== null;
}

module.exports = isStringy;
module.exports.default = isStringy;
