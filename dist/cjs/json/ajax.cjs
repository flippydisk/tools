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

// src/json/ajax.js
var ajax_exports = {};
__export(ajax_exports, {
  default: () => ajax
});
module.exports = __toCommonJS(ajax_exports);
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

module.exports = module.exports.default;
module.exports.default = module.exports;
