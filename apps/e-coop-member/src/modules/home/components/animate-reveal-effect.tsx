import React, { useRef } from 'react'

import { motion, useInView } from 'framer-motion'

type Props = {
    children: React.ReactNode
    duration?: number
    delay?: number
}

const AnimateRevealEffect = ({
    children,
    duration = 0.3,
    delay = 0.1,
}: Props) => {
    const itemref = useRef(null)
    const isInViewItem = useInView(itemref)
    return (
        <motion.div
            animate={isInViewItem ? 'visible' : 'hidden'}
            initial="hidden"
            ref={itemref}
            transition={{ duration, delay }}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            {children}
        </motion.div>
    )
}

export default AnimateRevealEffect
