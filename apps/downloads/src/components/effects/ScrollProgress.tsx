import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #34d399, #2dd4bf, #14b8a6)',
                boxShadow: '0 0 10px rgba(52, 211, 153, 0.5)',
            }}
        />
    )
}
