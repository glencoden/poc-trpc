import { createTRPCReact } from '@trpc/react-query'
import { TRPCRouter } from './router/index.js'

export const api = createTRPCReact<TRPCRouter>()
