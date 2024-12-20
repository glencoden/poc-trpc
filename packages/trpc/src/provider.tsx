import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import React from 'react'
import { api } from './client'

export const TRPCQueryClientProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [queryClient] = React.useState(() => new QueryClient())

    const [trpcClient] = React.useState(() =>
        api.createClient({
            links: [
                loggerLink({
                    enabled: (opts) => {
                        return (
                            process.env.NODE_ENV === 'development' ||
                            (opts.direction === 'down' &&
                                opts.result instanceof Error)
                        )
                    },
                }),
                httpBatchLink({
                    url:
                        window.location.origin.replace('3000', '5555') +
                        '/trpc',
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
