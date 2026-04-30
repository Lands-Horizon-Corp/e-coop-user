import React from 'react'

import type { LucideIcon } from 'lucide-react'

interface StatData {
    number: string
    label: string
    detail: string
    change?: string
    changeDetail?: string
}

interface StatCardProps {
    id: string
    stat: StatData
    icon: LucideIcon
    animation: {
        duration: string
        delay: string
    }
    position: string
    chartData?: number[]
    className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
    id,
    stat,
    icon: Icon,
    animation,
    position,
    chartData,
    className = '',
}) => {
    return (
        <div
            className={`absolute ${position} hidden lg:block hover:z-20 ${className}`}
            data-testid={`stat-card-${id}`}
            style={{
                animation: `float ${animation.duration} ease-in-out infinite`,
                animationDelay: animation.delay,
            }}
        >
            <article
                aria-label={`${stat.label} statistics`}
                className="w-52 rounded-2xl bg-black/30 backdrop-blur-xl shadow-2xl border border-white/10 hover:border-emerald-500/30 hover:bg-black/40 transition-all duration-300"
            >
                <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div
                                className="text-3xl font-extrabold text-white"
                                role="status"
                            >
                                {stat.number}
                            </div>

                            <div className="mt-3 text-xs font-semibold text-emerald-200">
                                {stat.label}
                            </div>
                            <div className="text-xs text-teal-200/60">
                                {stat.detail}
                            </div>
                        </div>

                        <div className="h-11 w-11 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                            <Icon
                                aria-hidden="true"
                                className="h-5 w-5 text-emerald-300"
                            />
                        </div>
                    </div>

                    {stat.change && (
                        <div className="mt-4 text-xs font-semibold text-emerald-300">
                            {stat.change}
                            {stat.changeDetail && (
                                <span className="ml-1 text-teal-200/50 font-medium">
                                    {stat.changeDetail}
                                </span>
                            )}
                        </div>
                    )}

                    {chartData && chartData.length > 0 && (
                        <div className="mt-4 flex items-end gap-1 h-8">
                            {chartData.map((height, idx) => (
                                <div
                                    aria-label={`Bar ${idx + 1}: ${height}%`}
                                    className="flex-1 rounded-t bg-emerald-400/50"
                                    key={`bar-${idx}`}
                                    role="img"
                                    style={{ height: `${height}%` }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </div>
    )
}

StatCard.displayName = 'StatCard'

export const MemoizedStatCard = React.memo(StatCard)
