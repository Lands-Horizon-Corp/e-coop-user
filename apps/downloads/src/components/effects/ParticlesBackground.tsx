import { useCallback, useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    baseY: number
    radius: number
    vx: number
    vy: number
    opacity: number
    pulsePhase: number
    pulseSpeed: number
    color: string
}

interface Connection {
    x1: number
    y1: number
    x2: number
    y2: number
    opacity: number
}

export default function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const connectionsRef = useRef<Connection[]>([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const scrollOffsetRef = useRef(0)
    const targetScrollOffsetRef = useRef(0)
    const animationFrameIdRef = useRef<number | null>(null)
    const documentHeightRef = useRef(0)

    const getDocumentHeight = () => {
        return Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        )
    }

    const initParticles = useCallback((canvas: HTMLCanvasElement) => {
        const particles: Particle[] = []
        // Get full document height, not just viewport
        const docHeight = getDocumentHeight()
        documentHeightRef.current = docHeight

        // Calculate particle count based on document area, not just viewport
        const area = canvas.width * docHeight
        const particleCount = Math.min(100, Math.floor(area / 15000))

        const colors = [
            'rgba(52, 211, 153,', // emerald-400
            'rgba(45, 212, 191,', // teal-400
            'rgba(20, 184, 166,', // teal-500
            'rgba(16, 185, 129,', // emerald-500
            'rgba(255, 255, 255,', // white
        ]

        for (let i = 0; i < particleCount; i++) {
            const colorBase = colors[Math.floor(Math.random() * colors.length)]
            // Spread particles across entire document height
            const baseY = Math.random() * docHeight
            particles.push({
                x: Math.random() * canvas.width,
                y: baseY,
                baseY: baseY,
                radius: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.1,
                opacity: Math.random() * 0.4 + 0.2,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.012 + 0.006,
                color: colorBase,
            })
        }
        return particles
    }, [])

    const updateConnections = useCallback(
        (particles: Particle[], canvasHeight: number) => {
            const connections: Connection[] = []
            const connectionDistance = 120
            const maxConnections = 2
            const scrollOffset = scrollOffsetRef.current

            for (let i = 0; i < particles.length; i++) {
                let connectionCount = 0
                const p1 = particles[i]
                const p1DrawY = p1.y - scrollOffset

                // Only check connections for particles visible or near viewport
                if (
                    p1DrawY < -connectionDistance * 2 ||
                    p1DrawY > canvasHeight + connectionDistance * 2
                ) {
                    continue
                }

                for (let j = i + 1; j < particles.length; j++) {
                    if (connectionCount >= maxConnections) break

                    const p2 = particles[j]
                    const p2DrawY = p2.y - scrollOffset

                    if (
                        p2DrawY < -connectionDistance * 2 ||
                        p2DrawY > canvasHeight + connectionDistance * 2
                    ) {
                        continue
                    }

                    const dx = p1.x - p2.x
                    const dy = p1DrawY - p2DrawY
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const opacity =
                            (1 - distance / connectionDistance) * 0.15
                        connections.push({
                            x1: p1.x,
                            y1: p1DrawY,
                            x2: p2.x,
                            y2: p2DrawY,
                            opacity,
                        })
                        connectionCount++
                    }
                }
            }
            return connections
        },
        []
    )

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            // Re-init particles when resizing to cover new document height
            particlesRef.current = initParticles(canvas)
        }

        resize()
        window.addEventListener('resize', resize)

        // Also re-init when content changes (optional - checks every 2 seconds)
        const checkHeightInterval = setInterval(() => {
            const currentHeight = getDocumentHeight()
            if (Math.abs(currentHeight - documentHeightRef.current) > 100) {
                particlesRef.current = initParticles(canvas)
            }
        }, 2000)

        const onScroll = () => {
            targetScrollOffsetRef.current = window.scrollY
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', onMouseMove, { passive: true })

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const targetOffset = targetScrollOffsetRef.current
            scrollOffsetRef.current +=
                (targetOffset - scrollOffsetRef.current) * 0.08
            const scrollOffset = scrollOffsetRef.current

            const particles = particlesRef.current

            connectionsRef.current = updateConnections(particles, canvas.height)

            // Draw connections first (behind particles)
            connectionsRef.current.forEach((conn) => {
                ctx.beginPath()
                ctx.moveTo(conn.x1, conn.y1)
                ctx.lineTo(conn.x2, conn.y2)
                ctx.strokeStyle = `rgba(52, 211, 153, ${conn.opacity})`
                ctx.lineWidth = 0.5
                ctx.stroke()
            })

            // Update and draw particles
            particles.forEach((p) => {
                p.x += p.vx
                p.pulsePhase += p.pulseSpeed
                p.y = p.baseY + Math.sin(p.pulsePhase * 0.5) * 15

                if (p.x < -10) p.x = canvas.width + 10
                if (p.x > canvas.width + 10) p.x = -10

                const drawY = p.y - scrollOffset

                // Skip rendering if far outside viewport (optimization)
                if (drawY < -100 || drawY > canvas.height + 100) return

                // Mouse interaction - gentle repulsion
                const mouse = mouseRef.current
                const dx = p.x - mouse.x
                const dy = drawY - mouse.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 80 && dist > 0) {
                    const force = ((80 - dist) / 80) * 0.4
                    p.x += (dx / dist) * force
                }

                const pulseOpacity =
                    p.opacity * (0.7 + 0.3 * Math.sin(p.pulsePhase))
                const alpha = Math.max(0.05, Math.min(1, pulseOpacity))

                // Draw glow
                const gradient = ctx.createRadialGradient(
                    p.x,
                    drawY,
                    0,
                    p.x,
                    drawY,
                    p.radius * 5
                )
                gradient.addColorStop(0, `${p.color} ${alpha})`)
                gradient.addColorStop(0.4, `${p.color} ${alpha * 0.3})`)
                gradient.addColorStop(1, `${p.color} 0)`)

                ctx.beginPath()
                ctx.arc(p.x, drawY, p.radius * 5, 0, Math.PI * 2)
                ctx.fillStyle = gradient
                ctx.fill()

                // Draw core
                ctx.beginPath()
                ctx.arc(p.x, drawY, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = `${p.color} ${alpha + 0.2})`
                ctx.fill()
            })

            animationFrameIdRef.current = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current)
            }
            window.removeEventListener('resize', resize)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('mousemove', onMouseMove)
            clearInterval(checkHeightInterval)
        }
    }, [initParticles, updateConnections])

    return (
        <canvas
            className="fixed inset-0 z-[1] pointer-events-none"
            ref={canvasRef}
            style={{
                background: 'transparent',
                mixBlendMode: 'screen',
            }}
        />
    )
}
