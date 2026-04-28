import { useLiveMonitoringStore } from '@e-coop-monorepo/shared/store'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { IClassProps } from '@e-coop-monorepo/shared/types'
import { DotBigIcon, PlayIcon, StopIcon } from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@e-coop-monorepo/ui'

interface LiveToggleProps extends IClassProps {
    size?: 'sm' | 'default' | 'lg' | 'xs'
}

const LiveToggle = ({ className, size = 'sm' }: LiveToggleProps) => {
    const { isLiveEnabled, toggleLive } = useLiveMonitoringStore()

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        className={cn(
                            'rounded-lg transition-all relative border duration-300 hover:scale-105',
                            className
                        )}
                        onClick={toggleLive}
                        size={size}
                        variant="outline"
                    >
                        {isLiveEnabled && (
                            <div className="absolute -right-1.5 -top-1.5">
                                <DotBigIcon className="absolute blur-sm" />
                                <DotBigIcon className="text-primary text-primar" />
                            </div>
                        )}
                        {isLiveEnabled ? (
                            <StopIcon className="size-4 transition-all duration-200" />
                        ) : (
                            <PlayIcon className="size-4 transition-all duration-200" />
                        )}
                        {isLiveEnabled ? 'Stop Live' : 'Live'}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        {isLiveEnabled
                            ? 'Stop monitoring - tables will no longer update in realtime'
                            : 'Start monitoring - all tables will be updated in realtime'}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default LiveToggle
