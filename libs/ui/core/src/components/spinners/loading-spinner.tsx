import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps } from '@ecoop/shared/types'
import { LoadingCircleIcon } from '@ecoop/ui/core'

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
