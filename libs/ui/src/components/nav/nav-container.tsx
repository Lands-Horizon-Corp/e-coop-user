import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { IBaseProps } from '@e-coop-monorepo/shared/types'

const NavContainer = ({ children, className }: IBaseProps) => {
    return (
        <div className={cn('flex items-center gap-x-2', className)}>
            {children}
        </div>
    )
}

export default NavContainer
