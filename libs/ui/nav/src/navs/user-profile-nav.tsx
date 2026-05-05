import { cn } from '@ecoop/shared/tw-utils'
import NavProfileMenu from '@ecoop/domains/iam/models'
import type { IClassProps } from '@ecoop/shared/types'
import {AppSidebarToggle} from '@ecoop/ui/app-sidebar'

import {NavEcoopLogo} from '../nav-components/nav-ecoop-logo'
import {NavContainer} from '../nav-container'
import {RootNav} from '../root-nav'
import { NavThemeToggle } from '../nav-components'

const UserProfileNav = ({ className }: IClassProps) => {
    return (
        <RootNav
            className={cn(
                'pointer-events-none fixed w-full bg-popover/70 backdrop-blur-sm',
                className
            )}
        >
            <NavContainer className="pointer-events-auto min-w-[10%]">
                <AppSidebarToggle />
                <NavEcoopLogo />
            </NavContainer>
            <NavContainer />
            <NavContainer className="pointer-events-auto">
                <NavProfileMenu />
                <NavThemeToggle />
            </NavContainer>
        </RootNav>
    )
}

export {UserProfileNav}
