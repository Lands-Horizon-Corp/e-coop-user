import { cn } from '@ecoop/shared/tw-utils'
import type { IBaseProps } from '@ecoop/shared/types'

const RootNav = ({ className, children }: IBaseProps) => {
    return (
        <nav
            className={cn(
                'flex items-center justify-between gap-x-2 px-4 lg:px-16 fixed top-0 z-20 w-full backdrop-blur-2xl',
                className
            )}
        >
            {children}
        </nav>
    )
}

export {RootNav}
