import React, { memo, useMemo } from 'react'

import { MemoizedFeatureCard } from '@e-coop-monorepo/ui/core'
import { Download, Shield } from 'lucide-react'

import {
    FEATURE_CARDS,
    FLOATING_ICONS,
    HERO_TEXT,
} from '../../constants/heroSection'
import { MemoizedFloatingIcon } from '../FloatingIcon'
import { FloatingStatsSection } from '../FloatingStatsSection'

/**
 * Badge component extracted for reusability
 * Displays a featured badge with icon and text
 */
const HeroBadge: React.FC = memo(() => (
    <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-5 py-2 backdrop-blur border border-emerald-500/20">
        <Shield aria-hidden="true" className="h-4 w-4 text-emerald-300" />
        <span className="text-xs font-bold tracking-widest text-emerald-200">
            {HERO_TEXT.badge.text}
        </span>
    </div>
))
HeroBadge.displayName = 'HeroBadge'

/**
 * CTA Button component extracted for reusability
 * Download button with icon
 */
interface CTAButtonProps {
    href: string
    label: string
}

const CTAButton: React.FC<CTAButtonProps> = memo(({ href, label }) => (
    <a
        aria-label={label}
        className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-gray-900 font-bold shadow-xl shadow-emerald-500/20 hover:scale-105 hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] hover:bg-gray-100 active:scale-95 transition-all duration-200"
        href={href}
    >
        <Download aria-hidden="true" className="h-5 w-5" />
        {label}
    </a>
))
CTAButton.displayName = 'CTAButton'

/**
 * Hero section title with gradient
 * Extracted for clarity and reusability
 */
const HeroTitle: React.FC = memo(() => (
    <h1 className="mt-10 text-5xl md:text-7xl font-extrabold leading-[1.05]">
        <span className="bg-linear-to-r from-teal-300 via-emerald-300 to-green-300 bg-clip-text text-transparent">
            {HERO_TEXT.title.gradient}
        </span>
        <span className="mt-10 text-3xl md:text-6xl block whitespace-pre-line">
            {HERO_TEXT.title.main}
        </span>
    </h1>
))
HeroTitle.displayName = 'HeroTitle'

/**
 * Hero description paragraph
 * Extracted for clarity and maintainability
 */
const HeroDescription: React.FC = memo(() => (
    <p className="mt-8 text-base md:text-lg text-teal-100/75 max-w-3xl mx-auto leading-relaxed">
        {HERO_TEXT.description}
    </p>
))
HeroDescription.displayName = 'HeroDescription'

/**
 * Features grid section
 * Uses memoized FeatureCard components for performance
 */
const FeaturesGrid: React.FC = memo(() => (
    <div
        aria-label="Key features"
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10"
        role="region"
    >
        {FEATURE_CARDS.map((feature) => (
            <MemoizedFeatureCard
                description={feature.description}
                hoverRotation={feature.hoverRotation}
                icon={feature.icon}
                id={feature.id}
                key={feature.id}
                title={feature.title}
            />
        ))}
    </div>
))
FeaturesGrid.displayName = 'FeaturesGrid'

/**
 * Floating decorative icons section
 * Uses memoized FloatingIcon components for performance
 */
const FloatingIconsSection: React.FC = memo(() => (
    <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        role="presentation"
    >
        {FLOATING_ICONS.map((iconConfig) => (
            <MemoizedFloatingIcon
                animation={iconConfig.animation}
                icon={iconConfig.Icon}
                key={iconConfig.id}
                position={iconConfig.position}
            />
        ))}
    </div>
))
FloatingIconsSection.displayName = 'FloatingIconsSection'

/**
 * HomeHero Component
 * Hero landing section with floating icons and stats
 * Efficiently composed from smaller, reusable components
 *
 * @component
 * @example
 * ```tsx
 * <HomeHero />
 * ```
 */
export const HomeHero: React.FC = memo((): React.ReactElement => {
    // Memoize complex calculations if any (for future optimization)
    const heroContent = useMemo(
        () => ({
            badge: HERO_TEXT.badge,
            title: HERO_TEXT.title,
            description: HERO_TEXT.description,
            cta: HERO_TEXT.cta,
        }),
        []
    )

    const element: React.ReactElement = (
        <section
            aria-label="Hero section"
            className="relative min-h-screen overflow-hidden"
            id="home"
        >
            {/* Floating decorative icons - no keyboard interaction */}
            <FloatingIconsSection />

            {/* Floating stat cards - no keyboard interaction */}
            <FloatingStatsSection />

            {/* Main content with proper z-index */}
            <div className="relative z-10 -mt-20">
                <div className="px-6 md:px-10 pt-32 pb-20">
                    <div className="mx-auto max-w-6xl text-center">
                        {/* Badge */}
                        <HeroBadge />

                        {/* Hero Title */}
                        <HeroTitle />

                        {/* Description */}
                        <HeroDescription />

                        {/* CTA Button */}
                        <div className="mt-10 flex justify-center">
                            <CTAButton
                                href={heroContent.cta.href}
                                label={heroContent.cta.text}
                            />
                        </div>

                        {/* Features Grid */}
                        <FeaturesGrid />
                    </div>
                </div>
            </div>
        </section>
    )

    return element
})

HomeHero.displayName = 'HomeHero'

// Export as default for backward compatibility
export default memo(HomeHero)
