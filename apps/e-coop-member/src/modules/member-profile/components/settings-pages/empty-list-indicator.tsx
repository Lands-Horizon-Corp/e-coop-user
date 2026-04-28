import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { IClassProps } from '@e-coop-monorepo/shared/types'
import { GhostIcon } from '@e-coop-monorepo/ui'

interface Props extends IClassProps {
    message?: string
}

const EmptyListIndicator = ({ message, className }: Props) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-y-2 py-8',
                className
            )}
        >
            <GhostIcon className="size-6 text-muted-foreground" />
            <span className="text-sm italic text-muted-foreground/30">
                {message ?? ' no record found yet '}
            </span>
        </div>
    )
}

export default EmptyListIndicator
