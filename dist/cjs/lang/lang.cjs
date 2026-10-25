var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lang/lang.js
var lang_exports = {};
__export(lang_exports, {
  filterHTMLTags: () => filterHTMLTags,
  getPropertySafely: () => getPropertySafely,
  getStringSafely: () => getStringSafely,
  isEmptyObject: () => isEmptyObject,
  isEmptyString: () => isEmptyString,
  isNull: () => isNull,
  isNullish: () => isNullish,
  isNumber: () => isNumber,
  isObject: () => isObject_default,
  isStringy: () => isStringy,
  isType: () => isType,
  isUndefined: () => isUndefined,
  isValidObject: () => isValidObject_default
});
module.exports = __toCommonJS(lang_exports);

// src/lang/filterHTMLTags.js
function filterHTMLTags(string) {
  return string.replace(/&lt;(?:.|\n)*?&gt;/gm, "").replace(/<(?:.|\n)*?>/gm, "");
}

// src/lang/getPropertySafely.js
function getPropertySafely(obj, propPath) {
  if (typeof obj === "object" && typeof propPath === "string" && obj !== null && Object.keys(obj).length && propPath.length) {
    const path = propPath.split(".");
    const len = path.length;
    let current = obj;
    for (let i = 0; i < len; i += 1) {
      if (current === null || current === void 0 || Number.isNaN(current)) {
        return i === len ? current : void 0;
      }
      if (Object.prototype.hasOwnProperty.call(current, path[i])) {
        current = current[path[i]];
      } else {
        return void 0;
      }
    }
    return current;
  }
  return void 0;
}

// src/lang/isNullish.js
function isNullish(thing) {
  const type = typeof thing;
  return type === "undefined" || type === "object" && thing === null || type === "number" && Number.isNaN(thing) || type === "string" && thing === "";
}

// src/lang/getStringSafely.js
function getStringSafely(thing) {
  const type = typeof thing;
  if (type === "string") return thing;
  if (isNullish(thing)) return null;
  if (type === "number" || type === "boolean") return String(thing);
  if (type === "object" && Object.prototype.hasOwnProperty.call(thing, "toString") && typeof thing.toString === "function") {
    try {
      return thing.toString();
    } catch {
      return null;
    }
  }
  if (type === "object" && !Object.prototype.hasOwnProperty.call(thing, "toString")) {
    try {
      return JSON.stringify(thing) ?? null;
    } catch {
      return null;
    }
  }
  return null;
}

// src/lang/isEmptyObject.js
function isEmptyObject(obj) {
  if (typeof obj !== "object" || isNullish(obj)) return true;
  return Object.keys(obj).length === 0;
}

// src/lang/isNull.js
function isNull(thing) {
  return typeof thing === "object" && thing === null;
}

// src/lang/isEmptyString.js
function isEmptyString(string) {
  const converted = getStringSafely(string);
  if (!isNull(converted)) {
    return converted === "";
  }
  return false;
}

// src/lang/isNumber.js
function isNumber(thing) {
  return Number.isFinite(thing);
}

// src/lang/isStringy.js
function isStringy(thing) {
  return getStringSafely(thing) !== null;
}

// src/lang/isType.js
function isType(expr, object) {
  return expr.test(Object.prototype.toString.call(object));
}

// src/lang/isUndefined.js
function isUndefined(thing) {
  return typeof thing === "undefined";
}

// src/lang/isObject.js
var isObject = (ele) => Object.prototype.toString.call(ele) === "[object Object]";
var isObject_default = isObject;

// src/lang/isValidObject.js
var isValidObject = (ele) => isObject_default(ele) && !isEmptyObject(ele);
var isValidObject_default = isValidObject;
