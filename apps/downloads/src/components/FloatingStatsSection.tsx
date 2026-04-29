import React, { memo } from 'react'

import { MemoizedStatCard } from '@e-coop-monorepo/ui/core'

import { STAT_CARDS } from '../constants/heroSection'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStatCards = () => STAT_CARDS as any[]

export const FloatingStatsSection: React.FC = memo(() => {
    const statCards = getStatCards()
    return (
        <div className="pointer-events-none absolute inset-0">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {statCards.map((card: any) => (
                <MemoizedStatCard
                    animation={card.animation}
                    chartData={card.chart ?? []}
                    icon={card.icon}
                    id={card.id}
                    key={card.id}
                    position={card.position}
                    stat={card.stat}
                />
            ))}
        </div>
    )
})

FloatingStatsSection.displayName = 'FloatingStatsSection'
