import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

interface ConsumerReactClientOptions {
    baseUrl: string;
    timeout?: number;
    plugins?: ConsumerReactPlugin[];
    interceptors?: {
        beforeRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
        afterResponse?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    };
}
interface ConsumerReactError extends Error {
    status?: number;
    code?: string;
    data?: any;
    originalError?: any;
}
interface ConsumerReactPlugin {
    name: string;
    beforeRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    afterResponse?: (config: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    onError?(error: ConsumerReactError): ConsumerReactError | Promise<ConsumerReactError>;
}

declare class ConsumerReactClient {
    private options;
    private client;
    private plugins;
    constructor(options: ConsumerReactClientOptions);
    /**
     * get<T>
     */
    get<T>(route: string, config?: InternalAxiosRequestConfig): Promise<axios.AxiosResponse<T, any>>;
    /**
     * post<T>
     */
    post<T>(route: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
    /**
     * put<T>
     */
    put<T>(route: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
    /**
     * patch<T>
     */
    patch<T>(route: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
}

export { ConsumerReactClient, type ConsumerReactClientOptions, type ConsumerReactError, type ConsumerReactPlugin };
