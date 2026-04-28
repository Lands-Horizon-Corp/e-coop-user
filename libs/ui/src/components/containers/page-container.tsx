import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type { IBaseProps } from '@e-coop-monorepo/shared/types'

type Props = IBaseProps

const PageContainer = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                'flex w-full max-w-full flex-col items-center px-4 pb-6 sm:px-4',
                className
            )}
        >
            {children}
        </div>
    )
}

export default PageContainer
