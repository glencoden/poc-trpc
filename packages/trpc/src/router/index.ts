import type { inferReactQueryProcedureOptions } from '@trpc/react-query'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { createTRPCRouter } from '../index.js'
import { exampleRouter } from './example/exampleRouter.js'

export type TRPCRouter = typeof trpcRouter
export type ReactQueryOptions = inferReactQueryProcedureOptions<TRPCRouter>
export type RouterInputs = inferRouterInputs<TRPCRouter>
export type RouterOutputs = inferRouterOutputs<TRPCRouter>

export const trpcRouter = createTRPCRouter({
    example: exampleRouter,
})
