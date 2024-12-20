import { createTRPCReact } from '@trpc/react-query'
import { TRPCRouter } from './router'

export const api = createTRPCReact<TRPCRouter>()
