/**
 * Animation Configuration Constants
 * Centralized animation definitions for consistency across the app
 * Follows DRY principle and improves maintainability
 */

export const ANIMATION_DURATIONS = {
    SHORT: 0.15,
    DEFAULT: 0.3,
    MEDIUM: 0.5,
    LONG: 1,
} as const

export const ANIMATION_DELAYS = {
    NONE: 0,
    MINIMAL: 0.1,
    SMALL: 0.5,
    MEDIUM: 1,
} as const

/**
 * Floating animation configuration
 * Used for decorative elements that need subtle movement
 */
export const FLOATING_ANIMATIONS = [
    {
        id: 'float-1',
        duration: '6s',
        delay: '0s',
    },
    {
        id: 'float-2',
        duration: '7s',
        delay: '1s',
    },
    {
        id: 'float-3',
        duration: '8s',
        delay: '2s',
    },
    {
        id: 'float-4',
        duration: '5.5s',
        delay: '1.5s',
    },
    {
        id: 'float-5',
        duration: '6.5s',
        delay: '0.5s',
    },
] as const

/**
 * Stat card floating animations
 * Separated from main floating icons for clarity
 */
export const STAT_CARD_ANIMATIONS = {
    PRIMARY: {
        duration: '5s',
        delay: '0s',
    },
    SECONDARY: {
        duration: '6s',
        delay: '1s',
    },
} as const

/**
 * Hover animation states
 * Used for interactive elements like feature cards
 */
export const HOVER_ANIMATIONS = {
    SCALE_UP: { scale: 1.05 },
    TRANSLATE_UP: { y: -8 },
    SCALE_HOVER: { scale: 1.02, rotate: 2 },
} as const

/**
 * Transition timing
 * Standard transitions for consistency
 */
export const TRANSITIONS = {
    FAST: 'duration-150',
    DEFAULT: 'duration-300',
    SLOW: 'duration-500',
} as const
