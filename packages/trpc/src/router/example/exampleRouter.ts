import { z } from 'zod'
import { publicProcedure } from '../../index'

export const exampleRouter = {
    get: publicProcedure
        .input(z.object({ inputId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.api.getInputValue(input.inputId)
        }),

    set: publicProcedure
        .input(z.object({ inputId: z.string(), value: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.api.setInputValue(input.inputId, input.value)
        }),
}
