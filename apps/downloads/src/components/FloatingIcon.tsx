import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingIconProps {
  icon: LucideIcon;
  position: {
    left: string;
    top: string;
  };
  animation: {
    duration: string;
    delay: string;
  };
  className?: string;
  ariaLabel?: string;
}

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

export const MemoizedFloatingIcon = React.memo(FloatingIcon);
