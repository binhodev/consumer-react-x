// src/client/consumer-client.ts
import axios from "axios";
var ConsumerReactClient = class {
  constructor(options) {
    this.options = options;
    this.client = axios.create({
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
export {
  ConsumerReactClient
};
//# sourceMappingURL=index.mjs.map