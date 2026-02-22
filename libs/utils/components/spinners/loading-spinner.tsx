import { cn } from '@/helpers/tw-utils'

import { LoadingCircleIcon } from '@/components/icons'

import { IClassProps } from '@/types'

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
