import { cn } from '@/helpers'
import AnimateRevealEffect from '@/modules/home/components/animate-reveal-effect'

import { BuildingBranchIcon, MagnifyingGlassIcon } from '@e-coop-monorepo/ui/components/icons'
import ImageDisplay from '@e-coop-monorepo/ui/components/image-display'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import TruncatedText from '@e-coop-monorepo/ui/components/ui/truncated-text'

import { IOrganization } from '../organization.types'

interface OrganizationBannerProps {
    organization: IOrganization
}

export const OrganizationBanner = ({
    organization,
}: OrganizationBannerProps) => {
    const orgMediaCover =
        organization.cover_media?.download_url || '/placeholder-branch-bg.jpg'
    const orgLogo = organization.media?.download_url

    return (
        <section className="relative w-full flex flex-col items-center bg-transparent">
            {/* 1. The Masked Header (Transparent Background) */}
            <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
                <div
                    className="w-full h-full transition-transform duration-1000 hover:scale-105"
                    style={{
                        backgroundImage: `url(${orgMediaCover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        // Mask Logic: Only the image inside the scribble is visible
                        WebkitMaskImage: `url('/cover_scribble.webp')`,
                        maskImage: `url('/cover_scribble.webp')`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                    }}
                />

                {/* Floating Logo - Positioned to bridge the mask and content */}
                <div className="absolute -bottom-12 z-20">
                    <AnimateRevealEffect duration={1}>
                        <ImageDisplay
                            className="w-32 animate-bounce duration-5000 h-32 md:w-44 md:h-44 rounded-full border-4 border-background shadow-xl object-cover bg-white"
                            src={orgLogo}
                        />
                    </AnimateRevealEffect>
                </div>
            </div>

            {/* 2. Content Container (Located BELOW the mask) */}
            <div className="w-full -translate-y-8 max-w-4xl px-6 pt-20 pb-12 text-center flex flex-col items-center">
                <AnimateRevealEffect duration={0.5}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground mb-6">
                        <BuildingBranchIcon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {organization.is_private ? 'Private' : 'Local'}{' '}
                            Organization
                        </span>
                    </div>
                </AnimateRevealEffect>

                <AnimateRevealEffect duration={0.8}>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        {organization.name}
                    </h1>
                </AnimateRevealEffect>

                <div className="max-w-2xl">
                    <TruncatedText
                        maxLength={300}
                        className="text-muted-foreground text-lg leading-relaxed"
                        text={organization.description}
                    />
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Button
                        size="lg"
                        className="rounded-full px-10 font-bold h-12"
                    >
                        Join Organization
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-10 font-bold h-12"
                    >
                        Discover More
                        <MagnifyingGlassIcon className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
