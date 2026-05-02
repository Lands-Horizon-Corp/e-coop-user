import { useLiveMonitoringStore } from '@ecoop/shared/store'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps } from '@ecoop/shared/types'
import { DotBigIcon, PlayIcon, StopIcon } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@ecoop/ui/core'

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
