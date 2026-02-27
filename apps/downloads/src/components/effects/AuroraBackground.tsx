import { motion } from 'framer-motion'

export default function AuroraBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 0%, #0d3d3d 0%, #0F172A 30%, #0F172A 70%)',
                }}
            />

            {/* Aurora blob 1 - Emerald */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 100, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                className="absolute w-[800px] h-[800px] rounded-full aurora-blob"
                style={{
                    background:
                        'radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, rgba(52, 211, 153, 0.05) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                    top: '-20%',
                    left: '-10%',
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Aurora blob 2 - Teal */}
            <motion.div
                animate={{
                    x: [0, -80, 60, 0],
                    y: [0, 80, -40, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                className="absolute w-[600px] h-[600px] rounded-full aurora-blob-2"
                style={{
                    background:
                        'radial-gradient(circle, rgba(45, 212, 191, 0.12) 0%, rgba(45, 212, 191, 0.04) 40%, transparent 70%)',
                    filter: 'blur(50px)',
                    top: '10%',
                    right: '-5%',
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Aurora blob 3 - Cyan */}
            <motion.div
                animate={{
                    x: [0, 60, -80, 0],
                    y: [0, -60, 40, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                className="absolute w-[500px] h-[500px] rounded-full aurora-blob-3"
                style={{
                    background:
                        'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, rgba(20, 184, 166, 0.03) 40%, transparent 70%)',
                    filter: 'blur(45px)',
                    bottom: '20%',
                    left: '20%',
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(52, 211, 153, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52, 211, 153, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px',
                }}
            />

            {/* Vignette overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)',
                }}
            />
        </div>
    )
}
