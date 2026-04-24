import { cn } from '@e-coop-monorepo/shared/helpers'
import { IClassProps } from '@e-coop-monorepo/shared/types'

import { LoadingCircleIcon } from '@/components/icons'

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

export default LoadingSpinner
