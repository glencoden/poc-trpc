import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'
import { api } from './services/api'

// A new context is created for each request, which means we can:
//
// 1. Get the current express req and res objects here - { req, res }: trpcExpress.CreateExpressContextOptions
export const createContext = async () => {
    // 2. Add a database client and and the latest auth session here
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
