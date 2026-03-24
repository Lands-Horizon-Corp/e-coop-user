import { IBranch } from '@/modules/branch'

interface BranchIndicatorProps {
    branch: IBranch
}

const BannerBranchIndicator = ({ branch }: BranchIndicatorProps) => {
    const BranchImage = branch.media.download_url

    return (
        <div>
            <div className="relative z-10 flex items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold text-banner-text">
                        {branch.name}
                    </h2>
                    <p className="text-banner-text-muted text-sm md:text-base">
                        {branch.description}
                    </p>
                    <a
                        className="inline-block text-banner-link hover:text-banner-text underline underline-offset-4 transition-colors text-sm md:text-base font-medium"
                        href="#"
                    ></a>
                </div>

                {/* Illustration */}
                <div className="hidden sm:block flex-shrink-0 w-28 md:w-36 lg:w-44 animate-float">
                    <img
                        alt="Hand holding a glowing star"
                        className="w-full h-auto animate-star-glow"
                        src={BranchImage}
                    />
                </div>
            </div>
        </div>
    )
}

export default BannerBranchIndicator
