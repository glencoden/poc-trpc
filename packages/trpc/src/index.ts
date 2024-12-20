import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'
import { api } from './services/api.js'

// We can get the express req and res objects here - { req, res }: trpcExpress.CreateExpressContextOptions
export const createContext = async () => {
    // We can add a database client and an auth session here
    return { api }
}

type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        }
    },
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure
