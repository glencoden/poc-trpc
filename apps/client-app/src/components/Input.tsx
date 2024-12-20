import { api } from '@repo/trpc/client'
import React, { useRef } from 'react'

const MUTATION_DEBOUNCE_TIME = 1000

export const Input: React.FC<Readonly<{ inputId: string }>> = ({ inputId }) => {
    // Get value from the API
    const { data, isLoading } = api.example.get.useQuery({ inputId })

    // Set value to the API
    const utils = api.useUtils()

    const { mutate: setInputValue, isPending } = api.example.set.useMutation({
        onError: () => {
            alert('Input value could not be set')
        },
        onSettled: () => {
            utils.example.get.invalidate({ inputId })
        },
    })

    const debounceTimeoutId = useRef<ReturnType<typeof setTimeout>>(0)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isPending) {
            return
        }

        // Optimistic update
        utils.example.get.setData({ inputId }, event.target.value)

        // Debounce the setInputValue call
        clearTimeout(debounceTimeoutId.current)
        debounceTimeoutId.current = setTimeout(() => {
            setInputValue({ inputId, value: event.target.value })
        }, MUTATION_DEBOUNCE_TIME)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (data === undefined) {
        return <div>Nothing here...</div>
    }

    return (
        <input
            type='text'
            style={{ opacity: isPending ? '0.5' : 1 }}
            value={data ?? ''}
            onChange={handleInputChange}
        />
    )
}
