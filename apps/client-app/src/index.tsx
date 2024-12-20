import { TRPCQueryClientProvider } from '@repo/trpc/provider'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Consumer } from './components/Consumer'
import { Input } from './components/Input'
import './index.css'

const INPUT_ID = 'asdf1234'

const rootElement = document.getElementById('root')

if (rootElement === null) {
    throw new Error('Root element not found')
}

const root = createRoot(rootElement)

const App: React.FC = () => {
    return (
        <main>
            <Input inputId={INPUT_ID} />
            <Consumer inputId={INPUT_ID} />
        </main>
    )
}

root.render(
    <TRPCQueryClientProvider>
        <App />
    </TRPCQueryClientProvider>,
)
