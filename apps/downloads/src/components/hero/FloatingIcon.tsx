/**
 * FloatingIcon Component
 * Single Responsibility: Render a floating icon with animation
 * Benefits:
 * - Reusable across the app
 * - Easy to test
 * - Decoupled from hero section logic
 * - Performance: Can be memoized
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingIconProps {
  /**
   * The Lucide icon component to render
   */
  icon: LucideIcon;

  /**
   * Tailwind position classes
   * Example: { left: 'left-[18%]', top: 'top-[26%]' }
   */
  position: {
    left: string;
    top: string;
  };

  /**
   * Animation configuration
   */
  animation: {
    duration: string;
    delay: string;
  };

  /**
   * Icon styling classes
   * @default 'h-10 w-10 text-emerald-300'
   */
  className?: string;

  /**
   * Accessibility label
   */
  ariaLabel?: string;
}

/**
 * FloatingIcon component with proper accessibility
 * Decorative icons should have aria-hidden="true"
 * unless they provide semantic meaning
 */
export const FloatingIcon: React.FC<FloatingIconProps> = ({
  icon: Icon,
  position,
  animation,
  className = 'h-10 w-10 text-emerald-300',
  ariaLabel,
}) => {
  return (
    <div
      aria-label={ariaLabel}
      className={`absolute ${position.left} ${position.top}`}
      role={ariaLabel ? 'img' : undefined}
      style={{
        animation: `float ${animation.duration} ease-in-out infinite`,
        animationDelay: animation.delay,
      }}
      {...(ariaLabel ? {} : { 'aria-hidden': 'true' })}
    >
      <Icon className={className} />
    </div>
  );
};

FloatingIcon.displayName = 'FloatingIcon';

// Export memoized version for performance
export const MemoizedFloatingIcon = React.memo(FloatingIcon);
