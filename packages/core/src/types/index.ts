import { InternalAxiosRequestConfig, AxiosResponse } from "axios";

export interface ConsumerReactClientOptions {
    baseUrl: string;
    timeout?: number;
    plugins?: ConsumerReactPlugin[];
    interceptors?: {
        beforeRequest?: (
            config: InternalAxiosRequestConfig
        ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
        afterResponse?: (
            response: AxiosResponse
        ) => AxiosResponse | Promise<AxiosResponse>;
    };
}

export interface ConsumerReactError extends Error {
    status?: number;
    code?: string;
    data?: any;
    originalError?: any;
}

export interface ConsumerReactPlugin {
    name: string;
    beforeRequest?: (
        config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    afterResponse?: (
        config: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onError?(
        error: ConsumerReactError
    ): ConsumerReactError | Promise<ConsumerReactError>;
}
