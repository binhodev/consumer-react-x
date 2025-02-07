"use client";

import { ConsumerReactClient } from "@consumer-react/core";
import { useGet } from "@consumer-react/next-hooks";
import { z } from "zod";

const client = new ConsumerReactClient({
    baseUrl: "https://jsonplaceholder.typicode.com",
});

const userSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        username: z.string(),
        email: z.string(),
    })
);

export const UserComponent = () => {
    const { data, isLoading, error } = useGet(client, "/users", {
        schema: userSchema,
        onSuccess() {
            console.log("getting users");
        },
    });

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            UserComponent
            <div>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    data?.map((user, i) => (
                        <div key={i}>
                            <p>Name: {user.name}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
