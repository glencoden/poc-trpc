import { api } from '@repo/trpc/client'
import React from 'react'

export const Consumer: React.FC<Readonly<{ inputId: string }>> = ({
    inputId,
}) => {
    const { data, isLoading } = api.example.get.useQuery({ inputId })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (data === undefined) {
        return <div>Nothing here...</div>
    }

    return <p>Some other place in the app: {data}</p>
}
