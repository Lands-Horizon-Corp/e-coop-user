import type { ReactNode } from 'react'

import {
    Tooltip,
    TooltipContent,
    TooltipPortal,
    TooltipProvider,
    TooltipTrigger,
} from '@e-coop-monorepo/ui/core'

export interface IActionTooltipProps {
    tooltipContent: string | ReactNode
    children?: ReactNode
    delayDuration?: number
    side?: 'top' | 'right' | 'bottom' | 'left' | undefined
    align?: 'center' | 'end' | 'start' | undefined
}

const ActionTooltip = ({
    tooltipContent,
    children,
    side,
    align,
    delayDuration,
}: IActionTooltipProps) => {
    return (
        <TooltipProvider delay={delayDuration}>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipPortal>
                    <TooltipContent align={align} side={side}>
                        <p>{tooltipContent}</p>
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    )
}

export { ActionTooltip }
