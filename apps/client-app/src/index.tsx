import { TRPCQueryClientProvider } from '@repo/trpc/provider'
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PageOne } from './pages/PageOne'
import { PageThree } from './pages/PageThree'
import { PageTwo } from './pages/PageTwo'

/**
 *
 * App component
 *
 */

const pageSlugs = ['pageOne', 'pageTwo', 'pageThree'] as const

type PageSlug = (typeof pageSlugs)[number]

const App: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<PageSlug>('pageOne')

    const prevPage = pageSlugs[pageSlugs.indexOf(selectedPage) - 1]
    const nextPage = pageSlugs[pageSlugs.indexOf(selectedPage) + 1]

    return (
        <main>
            <section className='page-container'>
                {(() => {
                    switch (selectedPage) {
                        case 'pageOne':
                            return <PageOne />
                        case 'pageTwo':
                            return <PageTwo />
                        case 'pageThree':
                            return <PageThree />
                    }
                })()}
            </section>

            <section className='page-navigation'>
                <button
                    onClick={() => setSelectedPage(prevPage!)}
                    disabled={!prevPage}
                >
                    Prev
                </button>
                <button
                    onClick={() => setSelectedPage(nextPage!)}
                    disabled={!nextPage}
                >
                    Next
                </button>
            </section>
        </main>
    )
}

/**
 *
 * React dom render
 *
 */

const rootElement = document.getElementById('root')

if (rootElement === null) {
    throw new Error('Root element not found')
}

const root = createRoot(rootElement)

root.render(
    <TRPCQueryClientProvider>
        <App />
    </TRPCQueryClientProvider>,
)
