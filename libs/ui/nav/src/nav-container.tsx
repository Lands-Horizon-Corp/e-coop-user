import { cn } from '@ecoop/shared/tw-utils'
import type { IBaseProps } from '@ecoop/shared/types'

const NavContainer = ({ children, className }: IBaseProps) => {
    return (
        <div className={cn('flex items-center gap-x-2', className)}>
            {children}
        </div>
    )
}

export default NavContainer
