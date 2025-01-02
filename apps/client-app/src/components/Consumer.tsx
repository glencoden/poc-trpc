import { api } from '@repo/trpc/client'
import React from 'react'

export const Consumer: React.FC<Readonly<{ inputId: string }>> = ({
    inputId,
}) => {
    const { data, isLoading } = api.input.get.useQuery({ inputId })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (data === undefined) {
        return <div>Nothing here...</div>
    }

    return <p>I'M ANOTHER COMPONENT: {data}</p>
}
