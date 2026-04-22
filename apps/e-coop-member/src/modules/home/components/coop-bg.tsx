import { cn } from '@/lib/utils'

type BackgroundVariant =
    | 'circles'
    | 'hexagons'
    | 'network'
    | 'waves'
    | 'geometric'
    | 'minimal'

interface CoopBackgroundProps {
    variant?: BackgroundVariant
    className?: string
    opacity?: number
}

export function CoopBackground({
    variant = 'circles',
    className,
    opacity = 0.4,
}: CoopBackgroundProps) {
    const opacityValue = Math.max(0, Math.min(1, opacity))

    // Note: We use CSS variables so the colors respond to Light/Dark mode automatically
    const variants = {
        circles: (
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="grad-circles"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{
                                stopColor: 'var(--primary)',
                                stopOpacity: opacityValue,
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor: 'var(--chart-2)',
                                stopOpacity: opacityValue * 0.5,
                            }}
                        />
                    </linearGradient>
                </defs>
                <circle cx="10%" cy="20%" fill="url(#grad-circles)" r="250" />
                <circle
                    cx="30%"
                    cy="50%"
                    fill="url(#grad-circles)"
                    opacity="0.6"
                    r="200"
                />
                <circle
                    cx="70%"
                    cy="30%"
                    fill="url(#grad-circles)"
                    opacity="0.4"
                    r="300"
                />
                <circle
                    cx="85%"
                    cy="70%"
                    fill="url(#grad-circles)"
                    opacity="0.7"
                    r="180"
                />
                <circle
                    cx="50%"
                    cy="80%"
                    fill="url(#grad-circles)"
                    opacity="0.5"
                    r="220"
                />
            </svg>
        ),

        hexagons: (
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="grad-hex"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{
                                stopColor: 'var(--primary)',
                                stopOpacity: opacityValue,
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor: 'var(--accent)',
                                stopOpacity: opacityValue * 0.6,
                            }}
                        />
                    </linearGradient>
                    <pattern
                        height="86.6"
                        id="hexPattern"
                        patternUnits="userSpaceOnUse"
                        width="100"
                        x="0"
                        y="0"
                    >
                        <path
                            d="M25 0 L75 0 L100 43.3 L75 86.6 L25 86.6 L0 43.3 Z"
                            fill="none"
                            stroke="url(#grad-hex)"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect
                    fill="url(#hexPattern)"
                    height="100%"
                    opacity={opacityValue}
                    width="100%"
                />
                <path
                    d="M150 100 L250 100 L300 186.6 L250 273.2 L150 273.2 L100 186.6 Z"
                    fill="url(#grad-hex)"
                    opacity={opacityValue * 0.8}
                />
                <path
                    d="M700 300 L800 300 L850 386.6 L800 473.2 L700 473.2 L650 386.6 Z"
                    fill="url(#grad-hex)"
                    opacity={opacityValue * 0.6}
                />
            </svg>
        ),

        network: (
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="grad-network"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{
                                stopColor: 'var(--primary)',
                                stopOpacity: opacityValue,
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor: 'var(--chart-4)',
                                stopOpacity: opacityValue,
                            }}
                        />
                    </linearGradient>
                </defs>
                <g stroke="url(#grad-network)" strokeWidth="2">
                    <line
                        opacity={opacityValue * 0.5}
                        x1="15%"
                        x2="45%"
                        y1="20%"
                        y2="35%"
                    />
                    <line
                        opacity={opacityValue * 0.5}
                        x1="45%"
                        x2="75%"
                        y1="35%"
                        y2="25%"
                    />
                    <line
                        opacity={opacityValue * 0.5}
                        x1="75%"
                        x2="85%"
                        y1="25%"
                        y2="60%"
                    />
                    <line
                        opacity={opacityValue * 0.5}
                        x1="85%"
                        x2="55%"
                        y1="60%"
                        y2="75%"
                    />
                    <line
                        opacity={opacityValue * 0.5}
                        x1="55%"
                        x2="25%"
                        y1="75%"
                        y2="65%"
                    />
                    <line
                        opacity={opacityValue * 0.5}
                        x1="25%"
                        x2="15%"
                        y1="65%"
                        y2="20%"
                    />
                </g>
                <circle
                    cx="15%"
                    cy="20%"
                    fill="var(--primary)"
                    r="8"
                    opacity={opacityValue}
                />
                <circle
                    cx="45%"
                    cy="35%"
                    fill="var(--primary)"
                    r="10"
                    opacity={opacityValue}
                />
                <circle
                    cx="75%"
                    cy="25%"
                    fill="var(--primary)"
                    r="8"
                    opacity={opacityValue}
                />
                <circle
                    cx="85%"
                    cy="60%"
                    fill="var(--primary)"
                    r="6"
                    opacity={opacityValue}
                />
                <circle
                    cx="55%"
                    cy="75%"
                    fill="var(--primary)"
                    r="9"
                    opacity={opacityValue}
                />
                <circle
                    cx="25%"
                    cy="65%"
                    fill="var(--primary)"
                    r="7"
                    opacity={opacityValue}
                />
            </svg>
        ),

        waves: (
            <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="grad-waves"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{
                                stopColor: 'var(--primary)',
                                stopOpacity: opacityValue,
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor: 'var(--chart-3)',
                                stopOpacity: opacityValue * 0.3,
                            }}
                        />
                    </linearGradient>
                </defs>
                <path
                    d="M0,7 Q25,4 50,7 T100,7 L100,100 L0,100 Z"
                    fill="url(#grad-waves)"
                />
                <path
                    d="M0,10 Q20,6 40,10 T100,10 L100,100 L0,100 Z"
                    fill="url(#grad-waves)"
                    opacity={opacityValue * 0.6}
                />
                <path
                    d="M0,15 Q30,9 60,15 T100,15 L100,100 L0,100 Z"
                    fill="url(#grad-waves)"
                    opacity={opacityValue * 0.4}
                />
            </svg>
        ),

        geometric: (
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="grad-geo"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{
                                stopColor: 'var(--primary)',
                                stopOpacity: opacityValue,
                            }}
                        />
                        <stop
                            offset="50%"
                            style={{
                                stopColor: 'var(--chart-2)',
                                stopOpacity: opacityValue * 0.7,
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor: 'var(--primary)',
                                stopOpacity: opacityValue * 0.4,
                            }}
                        />
                    </linearGradient>
                </defs>
                <polygon
                    fill="url(#grad-geo)"
                    opacity={opacityValue * 0.6}
                    points="100,50 200,200 0,200"
                />
                <polygon
                    fill="url(#grad-geo)"
                    opacity={opacityValue * 0.5}
                    points="800,100 950,300 650,300"
                />
                <rect
                    fill="url(#grad-geo)"
                    height="150"
                    opacity={opacityValue * 0.4}
                    transform="rotate(45 375 225)"
                    width="150"
                    x="300"
                    y="150"
                />
                <circle
                    cx="85%"
                    cy="15%"
                    fill="url(#grad-geo)"
                    opacity={opacityValue * 0.3}
                    r="120"
                />
            </svg>
        ),

        minimal: (
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient id="grad-orb1">
                        <stop
                            offset="0%"
                            style={{
                                stopColor: 'var(--primary)',
                                stopOpacity: opacityValue,
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor: 'var(--primary)',
                                stopOpacity: 0,
                            }}
                        />
                    </radialGradient>
                    <radialGradient id="grad-orb2">
                        <stop
                            offset="0%"
                            style={{
                                stopColor: 'var(--secondary)',
                                stopOpacity: opacityValue * 0.8,
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor: 'var(--secondary)',
                                stopOpacity: 0,
                            }}
                        />
                    </radialGradient>
                </defs>
                <ellipse
                    cx="20%"
                    cy="30%"
                    fill="url(#grad-orb1)"
                    rx="400"
                    ry="300"
                />
                <ellipse
                    cx="80%"
                    cy="70%"
                    fill="url(#grad-orb2)"
                    rx="500"
                    ry="350"
                />
            </svg>
        ),
    }

    return (
        <div
            className={cn(
                'absolute inset-0 overflow-hidden pointer-events-none -z-10',
                className
            )}
        >
            {variants[variant]}
        </div>
    )
}
