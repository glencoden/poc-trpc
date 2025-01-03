import { TRPCQueryClientProvider } from '@repo/trpc/provider'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Link, useRoute } from 'wouter'
import { Consumer } from './components/Consumer'
import { PageTransition } from './components/PageTransition'
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
    const [match, params] = useRoute('/:pageSlug')

    if (!match) {
        return (
            <main>
                <Link href={`/pageOne`}>Go to page one</Link>
            </main>
        )
    }

    const currentPageSlug = params.pageSlug as PageSlug

    const prevPage = match && pageSlugs[pageSlugs.indexOf(currentPageSlug) - 1]
    const nextPage = match && pageSlugs[pageSlugs.indexOf(currentPageSlug) + 1]

    return (
        <main>
            <Consumer inputId='cool-developer-name' />

            <PageTransition
                pageSlugs={pageSlugs}
                activePageSlug={currentPageSlug}
            >
                {(() => {
                    switch (currentPageSlug) {
                        case 'pageOne':
                            return <PageOne />
                        case 'pageTwo':
                            return <PageTwo />
                        case 'pageThree':
                            return <PageThree />
                    }
                })()}
            </PageTransition>

            <nav className='page-navigation'>
                <Link
                    href={`/${prevPage ?? currentPageSlug}`}
                    style={prevPage ? {} : { opacity: 0.5, cursor: 'default' }}
                >
                    Prev
                </Link>
                <Link
                    href={`/${nextPage ?? currentPageSlug}`}
                    style={nextPage ? {} : { opacity: 0.5, cursor: 'default' }}
                >
                    Next
                </Link>
            </nav>
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
