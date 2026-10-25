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

// src/index.js
var index_exports = {};
__export(index_exports, {
  Debug: () => Debug,
  Disable: () => Disable,
  Json: () => json_exports,
  Lang: () => lang_exports
});
module.exports = __toCommonJS(index_exports);

// src/debug/debug.js
var Debug = class {
  /**
      * @function constructor
      * @description initializing Debug constructor
      * @parent Debug
      * @param options {Object} { debug, control, param, urlMode, fileMode, debugAll, concatenator }
      * See this.setOptions() for options{} properties and description.
      */
  constructor(options = {}) {
    this.options = this.setOptions(options);
    const config = this.config();
    const sortOptions = this.sort(config);
    this.info(sortOptions.mode, sortOptions.type);
  }
  /**
      * @function setOptions
      * @description Setup for all the debugging options
      * @param options {Object} {
      *     debug: Boolean,
      *     control: String,
      *     param: String,
      *     urlMode: String,
      *     fileMode: String,
      *     debugAll: String,
      *     concatenator: String
      * }
      * @parent Debug
      * @return {Object} The options object with instantiated overrides, or the defaults.
      */
  setOptions(options = {}) {
    return {
      debug: options.debug || false,
      control: options.control || "",
      param: options.param || "debug",
      urlMode: options.urlMode || "Enabling URL Debug mode for",
      fileMode: options.fileMode || "Enabling File Debug mode for",
      debugAll: options.debugAll || "All",
      concatenator: options.concatenator || ":"
    };
  }
  /**
      * @function config
      * @description Setup for all the URL vs. File based debugging options
      * @parent Debug
      * @return {Object} { all: Boolean, url: Boolean, local: Boolean }
      */
  config() {
    const hasControl = this.options.control !== "";
    const search = typeof globalThis.location?.search === "string" ? globalThis.location.search : "";
    const decodeSearch = new URLSearchParams(search);
    const findDebugs = decodeSearch.getAll(this.options.param);
    const isDebug = decodeSearch.has(this.options.param);
    const allInUrl = hasControl && isDebug && this.find(findDebugs, this.options.debugAll);
    const inUrl = hasControl && isDebug && this.find(findDebugs, this.options.control);
    return {
      all: !this.options.debug && allInUrl,
      url: !this.options.debug && inUrl && !allInUrl,
      local: this.options.debug && hasControl
    };
  }
  /**
      * @function sort
      * @description Parse all options and return the proper scenario for debugging
      * @param scenario {Object} { all, url, local } from this.config()
      * @parent Debug
      * @return {Object} { mode: Boolean, type: Boolean }
      */
  sort(scenario) {
    if (scenario.all || scenario.url || scenario.local) {
      this.options.debug = true;
    }
    if (scenario.all) {
      return { mode: this.options.urlMode, type: this.options.debugAll };
    }
    if (scenario.url) {
      return { mode: this.options.urlMode, type: this.options.control };
    }
    if (scenario.local) {
      return { mode: this.options.fileMode, type: this.options.control };
    }
    return { mode: this.options.fileMode, type: this.options.debugAll };
  }
  /**
      * @function find
      * @description Search all cases of dexter:debug in the search params and match them
      * with the control name.
      *
      * @param findDebugs {Array} List of debug params
      * @param param {String} Control name to search for
      * @parent Debug
      *
      * @return {Boolean} True or False if it's matched the param
      */
  find(findDebugs, param) {
    return findDebugs.some((v) => v === param);
  }
  /**
      * @function logFactory
      * @description Take a type and console out that type to this.printIt()
      * @param logType {String} log, warn, error, info, table, debug
      * @param ...log {Array} Implicit arguments cast from the logger functions
      * @parent Debug
      * @return {Function | null} Returns this.printIt
      */
  logFactory(logType) {
    return (...log) => log.length ? this.printIt(logType, log) : null;
  }
  /**
      * @function log
      * @description console.log output
      * @parent Debug
      * @return {Function} Returns this.logFactory with the type
      */
  log = this.logFactory("log");
  /**
      * @function warn
      * @description console.warn output
      * @parent Debug
      * @return {Function} Returns this.logFactory with the type
      */
  warn = this.logFactory("warn");
  /**
      * @function error
      * @description console.error output
      * @parent Debug
      * @return {Function} Returns this.logFactory with the type
      */
  error = this.logFactory("error");
  /**
      * @function info
      * @description console.info output
      * @parent Debug
      * @return {Function} Returns this.logFactory with the type
      */
  info = this.logFactory("info");
  /**
      * @function debug
      * @description console.debug output
      * @parent Debug
      * @return {Function} Returns this.logFactory with the type
      */
  debug = this.logFactory("debug");
  /**
      * @function table
      * @description console.table output
      * @parent Debug
      * @return {Function} Returns this.logFactory with the type
      */
  table = this.logFactory("table");
  /**
      * @function trace
      * @description console.trace output
      * @param log {Array | Object} Accepts any number of arguments of any type.
      * @parent Debug
      * @return {Function} Returns this.logFactory with the type
      */
  trace = this.logFactory("trace");
  /**
      * @function printIt
      * @description Prints the output to the console via the methods chosen
      * @param type {String} Type of logger to use
      * @param log {String | Array | Object} Accepts any number of arguments of any type.
      * @parent Debug
      * @return {Function} Executes console.log, etc. via .apply() with the options chosen
      */
  printIt(type, log) {
    if (type === void 0 || log === void 0 || !this.options.debug) return false;
    let logger;
    let output;
    switch (type) {
      case "error":
        logger = console.error;
        break;
      case "warn":
        logger = console.warn;
        break;
      case "log":
        logger = console.log;
        break;
      case "info":
        logger = console.info;
        break;
      case "debug":
        logger = console.debug;
        break;
      case "table":
        logger = console.table;
        break;
      case "trace":
        logger = console.trace;
        break;
      default:
        logger = console.log;
        break;
    }
    output = [`${this.options.control}${this.options.concatenator}`];
    log.forEach((val) => {
      output.push(val);
    });
    output = [].concat.apply(output);
    logger.apply(console, output);
    return true;
  }
};

// src/lang/isNull.js
function isNull(thing) {
  return typeof thing === "object" && thing === null;
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

// src/lang/isEmptyString.js
function isEmptyString(string) {
  const converted = getStringSafely(string);
  if (!isNull(converted)) {
    return converted === "";
  }
  return false;
}

// src/disable/disable.js
var debug = new Debug({ debug: false, control: "Disable" });
var Disable = class {
  param = "disable";
  urlMode = "Enabling URL Disable mode for";
  fileMode = "Enabling File Disable mode for";
  concatenator = ":";
  /**
      * @function constructor
      * @description initializing Disable constructor
      * @parent Disable
      * @param properties.disable {Boolean} Default file-based trigger for turning this on or off on instantiation
      * @param properties.control {String} Name given to this calling script so it can be used as a URL param
      */
  constructor(properties = {}) {
    const hasControl = !isEmptyString(properties.control);
    const isDisabledOnLoad = properties.disable !== void 0 && typeof properties.disable === "boolean" ? properties.disable : false;
    const search = typeof globalThis.location?.search === "string" ? globalThis.location.search : "";
    const decodeSearch = new URLSearchParams(search);
    this.disabled = isDisabledOnLoad;
    this.control = hasControl ? properties.control : "";
    const findDisabled = decodeSearch.getAll(this.param);
    const isDisabled = decodeSearch.has(this.param);
    const inUrl = hasControl && isDisabled && this.find(findDisabled, properties.control);
    this.setStatus(properties, inUrl, hasControl);
  }
  /**
      * @function find
      * @description Search all cases of dexter:disable in the search params and match them with the control name.
      * @param findDisabled {Array} List of disabled params
      * @param param {String} Control name to search for
      * @parent Disable
      * @return {Boolean} True or False if it's matched the param
      */
  find(findDisabled, param) {
    debug.log("find:", "Looking for", param, "in", findDisabled);
    return findDisabled.some((v) => v === param);
  }
  /**
      * @function setStatus
      * @description Checks the conditions to which we should disable the feature
      * @param properties {Object} List of disabled params
      * @param inUrl {Boolean} If this.param was found in the URL
      * @param hasControl {Boolean} if properties.control was properly set
      * @parent Disable
      * @return {Boolean} True or False if we're disabling the feature
      */
  setStatus(properties, inUrl, hasControl) {
    if (this.disabled) {
      debug.info(this.fileMode, properties.control);
      return true;
    }
    if (!properties.disable && inUrl) {
      this.disabled = true;
      debug.info(this.urlMode, properties.control);
      return true;
    }
    if (properties.disable && hasControl) {
      this.disabled = true;
      debug.info(this.fileMode, properties.control);
      return true;
    }
    return false;
  }
  /**
      * @function isDisabled
      * @description Returns a Boolean value for calling scripts to take action to disable a script or setting
      * @parent Disable
      * @return {Boolean} Returns this.options.disabled
      */
  isDisabled() {
    debug.log("isDisabled:", this.disabled);
    return this.disabled;
  }
};

// src/json/json.js
var json_exports = {};
__export(json_exports, {
  ajax: () => ajax
});

// src/json/ajax.js
async function ajax(endpoint, cb, options = {}) {
  if (endpoint === void 0 || endpoint === null || endpoint === "") {
    throw new TypeError("ajax requires an endpoint");
  }
  if (cb !== void 0 && typeof cb !== "function") {
    throw new TypeError(`ajax callback must be a function or undefined; received ${typeof cb}`);
  }
  if (typeof globalThis.fetch !== "function") {
    throw new TypeError("ajax requires a global Fetch implementation");
  }
  const response = await globalThis.fetch(endpoint, options);
  const text = response.status === 204 ? "" : await response.text();
  let data = null;
  if (text !== "") {
    const contentType = response.headers.get("content-type") ?? "";
    data = contentType.includes("json") ? JSON.parse(text) : text;
  }
  if (!response.ok) {
    const error = new Error(`${response.status}: ${response.statusText || "HTTP request failed"}`);
    error.name = "HTTPError";
    error.status = response.status;
    error.statusText = response.statusText;
    error.url = response.url;
    error.response = response;
    error.data = data;
    throw error;
  }
  return cb ? cb(data) : data;
}

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

// src/lang/isEmptyObject.js
function isEmptyObject(obj) {
  if (typeof obj !== "object" || isNullish(obj)) return true;
  return Object.keys(obj).length === 0;
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
