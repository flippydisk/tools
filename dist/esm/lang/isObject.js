/**
* @function isObject
* @description takes a JS type and checks if it is '[object Object]'
*
* @parent Lang
*
* @param {String|Array|Object|Number} ele any Javascript type
*
* @return {Boolean} true if ele '[object Object]' else it returns false
*/
const isObject = ele => Object.prototype.toString.call(ele) === '[object Object]';
export default isObject;
