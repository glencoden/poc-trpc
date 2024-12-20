import { trpcExpressAdapter } from '@repo/trpc/adapter'
import cors from 'cors'
import express from 'express'

const API_PORT = 5555

const app = express()

app.use(cors())

app.use('/trpc', trpcExpressAdapter)

app.get('/health', (_req, res) => {
    res.send('Hello from the API server.')
})

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}.`))
