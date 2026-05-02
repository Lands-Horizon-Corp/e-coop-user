'use client'

import type React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@ecoop/shared/tw-utils'

interface FlowingGridProps extends React.HTMLAttributes<HTMLDivElement> {
    squareSize?: number
    gridGap?: number
    /** The Tailwind CSS variable name (e.g., '--primary' or '--accent') */
    colorVar?: string
    maxOpacity?: number
    minFlowSpeed?: number
    maxFlowSpeed?: number
}

export const FlowingGrid: React.FC<FlowingGridProps> = ({
    squareSize = 4,
    gridGap = 6,
    colorVar = '--primary', // Defaults to your primary OKLCH color
    className,
    maxOpacity = 0.8,
    minFlowSpeed = 0.2,
    maxFlowSpeed = 0.1,
    ...props
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
    const [resolvedColor, setResolvedColor] = useState('0, 255, 65') // Fallback RGB

    // 1. Dynamically extract the RGB values from Tailwind's CSS variables
    useEffect(() => {
        const updateColor = () => {
            if (typeof window === 'undefined') return

            // Create a temporary element to resolve OKLCH/Theme colors to RGB
            const temp = document.createElement('div')
            temp.style.color = `var(${colorVar})`
            document.body.appendChild(temp)

            const computedColor = getComputedStyle(temp).color // returns "rgb(r, g, b)"
            document.body.removeChild(temp)

            // Extract just the numbers "r, g, b"
            const rgbValues = computedColor.match(/\d+/g)?.join(', ')
            if (rgbValues) setResolvedColor(rgbValues)
        }

        updateColor()

        // Listen for theme changes if you have a class-based dark mode switcher
        const observer = new MutationObserver(updateColor)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })

        return () => observer.disconnect()
    }, [colorVar])

    const rgbaPrefix = useMemo(() => `rgba(${resolvedColor},`, [resolvedColor])

    const setupCanvas = useCallback(
        (canvas: HTMLCanvasElement, width: number, height: number) => {
            const dpr = window.devicePixelRatio || 1
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            const cols = Math.floor(width / (squareSize + gridGap))
            const rows = Math.floor(height / (squareSize + gridGap))

            const squares = new Float32Array(cols * rows)
            for (let i = 0; i < squares.length; i++) {
                squares[i] = Math.random()
            }

            const columnFlowData = new Float32Array(cols * 3)
            for (let i = 0; i < cols; i++) {
                columnFlowData[i * 3] = Math.random() < 0.85 ? 1 : 0
                columnFlowData[i * 3 + 1] =
                    minFlowSpeed + Math.random() * (maxFlowSpeed - minFlowSpeed)
                columnFlowData[i * 3 + 2] = Math.random()
            }

            return { cols, rows, squares, dpr, columnFlowData }
        },
        [squareSize, gridGap, minFlowSpeed, maxFlowSpeed]
    )

    const drawGrid = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number,
            params: any,
            time: number
        ) => {
            const { cols, rows, squares, dpr, columnFlowData } = params
            ctx.clearRect(0, 0, width, height)
            const trailLength = 0.8

            for (let i = 0; i < cols; i++) {
                const shouldFlow = columnFlowData[i * 3] === 1
                const flowSpeed = columnFlowData[i * 3 + 1]
                const timeOffset = columnFlowData[i * 3 + 2]

                for (let j = 0; j < rows; j++) {
                    const staticNoise = squares[i * rows + j]
                    const normalizedRow = j / rows
                    const baseOpacity =
                        staticNoise * 0.15 * (1 - normalizedRow * 0.7)
                    const wavePosition = ((time + timeOffset) * flowSpeed) % 1

                    let distanceFromWave = normalizedRow - wavePosition
                    if (distanceFromWave < 0) distanceFromWave += 1

                    let flowOpacity = 0
                    if (distanceFromWave < trailLength) {
                        flowOpacity = Math.pow(
                            1 - distanceFromWave / trailLength,
                            2
                        )
                    }

                    const topBrightness = 1 - normalizedRow * 0.8
                    const dynamicOpacity = shouldFlow
                        ? topBrightness * flowOpacity * staticNoise * maxOpacity
                        : 0
                    const finalOpacity = Math.max(baseOpacity, dynamicOpacity)

                    // Using the prefix generated from our dynamic Tailwind color
                    ctx.fillStyle = `${rgbaPrefix}${finalOpacity})`
                    ctx.fillRect(
                        i * (squareSize + gridGap) * dpr,
                        j * (squareSize + gridGap) * dpr,
                        squareSize * dpr,
                        squareSize * dpr
                    )
                }
            }
        },
        [rgbaPrefix, squareSize, gridGap, maxOpacity]
    )

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let gridParams: any

        const updateCanvasSize = () => {
            const newWidth = container.clientWidth
            const newHeight = container.clientHeight
            setCanvasSize({ width: newWidth, height: newHeight })
            gridParams = setupCanvas(canvas, newWidth, newHeight)
        }

        updateCanvasSize()
        const resizeObserver = new ResizeObserver(updateCanvasSize)
        resizeObserver.observe(container)

        const animate = (time: number) => {
            if (!isInView) return
            drawGrid(ctx, canvas.width, canvas.height, gridParams, time / 1000)
            animationFrameId = requestAnimationFrame(animate)
        }

        if (isInView) animationFrameId = requestAnimationFrame(animate)

        const intersectionObserver = new IntersectionObserver(([entry]) =>
            setIsInView(entry.isIntersecting)
        )
        intersectionObserver.observe(canvas)

        return () => {
            cancelAnimationFrame(animationFrameId)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
        }
    }, [setupCanvas, drawGrid, isInView])

    return (
        <div
            className={cn(
                'fixed top-0 inset-x-0 -z-10 h-[50vh] w-full pointer-events-none select-none',
                'opacity-60 dark:opacity-100',
                'mask-[linear-gradient(to_bottom,black_10%,transparent_90%)]',
                className
            )}
            ref={containerRef}
            {...props}
        >
            <canvas
                ref={canvasRef}
                style={{ width: canvasSize.width, height: canvasSize.height }}
            />
        </div>
    )
}
