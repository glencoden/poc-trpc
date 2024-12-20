import * as trpcExpress from '@trpc/server/adapters/express'
import { createContext } from './index'
import { trpcRouter } from './router'

export const trpcExpressAdapter = trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext,
})
