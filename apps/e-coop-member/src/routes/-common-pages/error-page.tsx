import { ErrorComponentProps, useRouter } from '@tanstack/react-router'

import { allErrorMessageExtractor } from '@e-coop-monorepo/shared/helpers'
import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { IBaseProps } from '@e-coop-monorepo/shared/types'
import { FlickeringGrid } from '@e-coop-monorepo/ui/components/backgrounds/flickering-grid'
import {
    ArrowLeftIcon,
    BracketErrorIcon,
    RefreshIcon,
} from '@e-coop-monorepo/ui/components/icons'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'

interface Props extends IBaseProps, ErrorComponentProps {}

const ErrorPage = ({ className, error }: Props) => {
    const router = useRouter()

    const errorMessage = allErrorMessageExtractor({ error })

    return (
        <div
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-center gap-y-4 p-4',
                className
            )}
        >
            <FlickeringGrid
                flickerChance={0.05}
                gridGap={1}
                maxOpacity={0.5}
                squareSize={60}
            />
            <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-y-4">
                <BracketErrorIcon className="size-24 text-muted-foreground" />
                <p className="text-foreground">Something went wrong</p>
                <p className="text-muted-foreground">
                    {JSON.stringify(errorMessage)}
                </p>
                <div className="z-10 flex items-center gap-x-2">
                    <Button
                        // variant="secondary"
                        // hoverVariant="primary"
                        className="gap-x-2 rounded-full"
                        onClick={() => location.reload()}
                    >
                        <RefreshIcon />
                        Refresh
                    </Button>
                    <Button
                        // variant="secondary"
                        // hoverVariant="primary"
                        className="gap-x-2 rounded-full"
                        onClick={() => router.history.back()}
                    >
                        <ArrowLeftIcon />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
