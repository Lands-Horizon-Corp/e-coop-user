import AnimateRevealEffect from '@e-coop-monorepo/modules/home/components/animate-reveal-effect'
import { CoopBackground } from '@e-coop-monorepo/modules/home/components/coop-bg'
import { IOrganizationMedia } from '@e-coop-monorepo/modules/organization-media'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@e-coop-monorepo/ui/core'
import { Images } from 'lucide-react'

interface MediaCarouselProps {
    medias: IOrganizationMedia[]
}

export const MediaCarousel = ({ medias }: MediaCarouselProps) => {
    if (!medias || medias.length === 0) {
        return null
    }

    return (
        <section className="w-full flex items-center justify-center px-5 py-16 md:py-24 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute  inset-0 gradient-mesh opacity-30" />
            <div className="container px-4 md:px-6 relative">
                {/* Section header */}
                <div className="mb-12 text-center">
                    <AnimateRevealEffect duration={0.8}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4 animate-fade-up">
                            <Images className="w-4 h-4" />
                            <span className="text-sm font-medium">Gallery</span>
                        </div>
                    </AnimateRevealEffect>
                    <AnimateRevealEffect duration={1.2}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground animate-fade-up delay-100">
                            Explore Our{' '}
                            <span className="text-gradient">Workspace</span>
                        </h2>
                    </AnimateRevealEffect>
                    <AnimateRevealEffect duration={1.6}>
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-up delay-200">
                            Take a peek inside our creative environment where
                            innovation meets collaboration
                        </p>
                    </AnimateRevealEffect>
                </div>

                <Carousel
                    className="w-full"
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4 md:-ml-6">
                        {medias.map((mediaItem, index) => (
                            <CarouselItem
                                className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                                key={mediaItem.id}
                            >
                                <div
                                    className="group relative overflow-hidden rounded-2xl shadow-card hover-lift animate-scale-up"
                                    style={{
                                        animationDelay: `${300 + index * 100}ms`,
                                    }}
                                >
                                    {/* Image container */}
                                    <div className="aspect-4/3 relative overflow-hidden">
                                        {mediaItem.media && (
                                            <>
                                                <img
                                                    alt={mediaItem.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    src={
                                                        mediaItem.media
                                                            .download_url
                                                    }
                                                />

                                                {/* Overlay gradient */}
                                                <div className="absolute inset-0 bg-linear-to-t from-background via-secondary/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                                {/* Shimmer effect */}
                                                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* Content overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                    <h3 className="font-display font-semibold dark:text-primary text-lg">
                                                        {mediaItem.name}
                                                    </h3>
                                                    {mediaItem.description && (
                                                        <p className="dark:text-primary text-sm mt-1 line-clamp-2">
                                                            {
                                                                mediaItem.description
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Bottom gradient bar */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 gradient-hero scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation buttons */}
                    <CarouselPrevious
                        className="hidden md:flex -left-7 w-12 h-12 border-border shadow-card hover:shadow-card-hover hover:bg-accent hover:text-accent-foreground transition-all"
                        variant={'secondary'}
                    />
                    <CarouselNext
                        className="hidden md:flex -right-7 w-12 h-12 bg-card border-border shadow-card hover:shadow-card-hover hover:bg-accent hover:text-accent-foreground transition-all"
                        variant={'secondary'}
                    />
                </Carousel>

                {/* Carousel indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {medias.slice(0, 5).map((_, index) => (
                        <div
                            className="w-2 h-2 rounded-full bg-muted-foreground/30 transition-all duration-300 hover:bg-primary hover:scale-125"
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
