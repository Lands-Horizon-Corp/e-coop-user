import React, { memo } from 'react';
import { STAT_CARDS } from '../../constants/heroSection';
import { MemoizedStatCard } from './StatCard';

/**
 * Helper to properly narrow STAT_CARDS for TypeScript
 * Workaround for union type inference limitation
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStatCards = () => STAT_CARDS as any[];

/**
 * Floating stat cards section
 * Displays metrics with animations
 * Extracted to separate file to isolate type inference issue
 */
export const FloatingStatsSection: React.FC = memo(() => {
  const statCards = getStatCards();
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {statCards.map((card: any) => (
        <MemoizedStatCard
          animation={card.animation}
          chartData={card.chart ?? []} // ← ADD ?? [] HERE
          icon={card.icon}
          id={card.id}
          key={card.id}
          position={card.position}
          stat={card.stat}
        />
      ))}
    </div>
  );
});

FloatingStatsSection.displayName = 'FloatingStatsSection';
