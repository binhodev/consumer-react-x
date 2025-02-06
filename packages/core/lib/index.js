"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ConsumerReactClient: () => ConsumerReactClient
});
module.exports = __toCommonJS(index_exports);

// src/client/consumer-client.ts
var import_axios = __toESM(require("axios"));
var ConsumerReactClient = class {
  constructor(options) {
    this.options = options;
    this.client = import_axios.default.create({
      baseURL: options.baseUrl,
      timeout: options.timeout || 5e3
    });
    if (options.plugins) {
      this.plugins = options.plugins;
    }
    this.client.interceptors.request.use(
      async (config) => {
        if (options.interceptors?.beforeRequest) {
          config = await options.interceptors.beforeRequest(config);
        }
        for (const plugin of this.plugins) {
          if (plugin.beforeRequest) {
            config = await plugin.beforeRequest(config);
          }
        }
        return config;
      }
    );
    this.client.interceptors.response.use(
      async (response) => {
        if (options.interceptors?.afterResponse) {
          response = await options.interceptors.afterResponse(
            response
          );
        }
        for (const plugin of this.plugins) {
          if (plugin.afterResponse) {
            response = await plugin.afterResponse(response);
          }
        }
        return response;
      },
      async (error) => {
        const consumerError = {
          ...error,
          message: error.message,
          status: error.response?.status,
          code: error.code,
          data: error.response?.data,
          originalError: error
        };
        return Promise.reject(consumerError);
      }
    );
  }
  client;
  plugins = [];
  /**
   * get<T>
   */
  async get(route, config) {
    return await this.client.get(route, config);
  }
  /**
   * post<T>
   */
  post(route, data, config) {
    return this.client.post(route, data, config);
  }
  /**
   * put<T>
   */
  put(route, data, config) {
    return this.client.put(route, data, config);
  }
  /**
   * patch<T>
   */
  patch(route, data, config) {
    return this.client.patch(route, data, config);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConsumerReactClient
});
//# sourceMappingURL=index.js.map