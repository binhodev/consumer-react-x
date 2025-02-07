import {
    ConsumerReactClient,
    type ConsumerReactError,
} from "@consumer-react/core";
import { useEffect, useState } from "react";
import {
    ConsumerReactHooksOptions,
    ConsumerReactHooksResponse,
} from "../types";
import useLatest from "./uselatest";

export function useGet<T>(
    client: ConsumerReactClient,
    route: string,
    { schema, onSuccess, onError }: ConsumerReactHooksOptions<T>
): ConsumerReactHooksResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ConsumerReactError | null>(null);

    const onSuccessRef = useLatest(onSuccess);
    const onErrorRef = useLatest(onError);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const response = await client.get(route);
                if (!response || !response.data) {
                    throw new Error("Invalid format response.");
                }

                const parsedData = schema.parse(response.data);
                if (isMounted) {
                    setData(parsedData);
                    onSuccessRef.current && onSuccessRef.current(parsedData);
                }
            } catch (e) {
                if (isMounted) {
                    setError(e as ConsumerReactError);
                    onErrorRef.current &&
                        onErrorRef.current(e as ConsumerReactError);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [client, route, schema]);

    return { data, isLoading, error };
}
