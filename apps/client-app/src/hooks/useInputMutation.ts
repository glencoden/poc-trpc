import { api } from '@repo/trpc/client'
import { useCallback, useMemo, useRef, useState } from 'react'
import type { z } from 'zod'

const MUTATION_DEBOUNCE_TIME = 1000

export const useInputMutation = ({
    inputId,
    schema,
}: Readonly<{ inputId: string; schema: z.ZodSchema }>) => {
    const [error, setError] = useState<string | null>(null)

    const utils = api.useUtils()

    const { mutate, isPending } = api.input.set.useMutation({
        onError: () => {
            alert('Input value could not be set')
        },
        onSettled: () => {
            utils.input.get.invalidate({ inputId })
        },
    })

    const debounceTimeoutId = useRef<ReturnType<typeof setTimeout>>(0)

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isPending) {
                return
            }

            // Optimistic update
            utils.input.get.setData({ inputId }, event.target.value)

            // Debounce the mutate call
            clearTimeout(debounceTimeoutId.current)

            debounceTimeoutId.current = setTimeout(() => {
                const parsedValue = schema.safeParse(event.target.value)

                if (parsedValue.success) {
                    setError(null)
                } else {
                    setError(
                        parsedValue.error.issues[0]?.message ?? 'Unknown error',
                    )
                }

                mutate({ inputId, value: event.target.value })
            }, MUTATION_DEBOUNCE_TIME)
        },
        [schema, utils, mutate, isPending],
    )

    return useMemo(
        () => ({ handleInputChange, isPending, error }),
        [error, isPending, handleInputChange],
    )
}
