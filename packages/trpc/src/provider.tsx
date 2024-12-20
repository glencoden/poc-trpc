import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import React from 'react'
import { api } from './client.js'

const API_PORT = 5555

export const TRPCQueryClientProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [queryClient] = React.useState(() => new QueryClient())

    const [trpcClient] = React.useState(() =>
        api.createClient({
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === 'development' ||
                        (opts.direction === 'down' &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `http://localhost:${API_PORT}/trpc`,
                }),
            ],
        }),
    )

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider
                client={trpcClient}
                queryClient={
                    queryClient as unknown as Parameters<
                        typeof api.Provider
                    >[0]['queryClient']
                }
            >
                {children}
            </api.Provider>
        </QueryClientProvider>
    )
}
