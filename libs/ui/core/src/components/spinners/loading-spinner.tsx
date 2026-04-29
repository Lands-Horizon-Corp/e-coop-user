import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { IClassProps } from '@e-coop-monorepo/shared/types'
import { LoadingCircleIcon } from '@e-coop-monorepo/ui/core'

type Props = IClassProps

const LoadingSpinner = ({ className }: Props) => {
    return (
        <LoadingCircleIcon
            className={cn(
                'size-4 animate-spin [animation-duration:1s]',
                className
            )}
        />
    )
}

export { LoadingSpinner }
