import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { IClassProps } from '@e-coop-monorepo/shared/types'
import { LoadingCircleIcon } from '@e-coop-monorepo/ui'

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
