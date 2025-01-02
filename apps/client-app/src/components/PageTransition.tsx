import { AnimatePresence, motion } from 'motion/react'
import React, { useRef, useState, type ReactNode, type RefObject } from 'react'

const transitionVariants = {
    enter: (isBackwardsNavigationRef: RefObject<boolean>) => ({
        x: isBackwardsNavigationRef.current ? '-100%' : '100%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (isBackwardsNavigationRef: RefObject<boolean>) => ({
        x: isBackwardsNavigationRef.current ? '100%' : '-100%',
        opacity: 0,
    }),
}

export const PageTransition = <T extends string>({
    children,
    pageSlugs,
    activePageSlug,
}: {
    children: ReactNode
    pageSlugs: Readonly<T[]>
    activePageSlug: T
}): React.ReactElement => {
    // The active page slug here could well be the pathname extracted from some router!
    const [prevActivePageSlug, setPrevActivePageSlug] =
        useState<T>(activePageSlug)

    const isBackwardsNavigationRef = useRef(false)

    if (activePageSlug !== prevActivePageSlug) {
        const currentIndex = pageSlugs.findIndex((pageSlug) =>
            activePageSlug.endsWith(pageSlug),
        )
        const prevIndex = pageSlugs.findIndex((pageSlug) =>
            prevActivePageSlug.endsWith(pageSlug),
        )

        isBackwardsNavigationRef.current = currentIndex < prevIndex

        setPrevActivePageSlug(activePageSlug)
    }

    return (
        <AnimatePresence initial={false} mode='popLayout'>
            <motion.div
                key={activePageSlug}
                custom={isBackwardsNavigationRef}
                variants={transitionVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                    duration: 0.25,
                    ease: 'easeOut',
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
