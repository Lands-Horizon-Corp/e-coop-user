import { cn } from '@ecoop/shared/tw-utils'
import NavProfileMenu from '@ecoop/domains/iam'
import type { IClassProps } from '@ecoop/shared/types'

import {NavEcoopLogo} from '../nav-components/nav-ecoop-logo'
import {NavThemeToggle} from '../nav-components/nav-theme-toggle'
import {NavContainer} from '../nav-container'
import {RootNav} from '../root-nav'

const OnboardingNav = ({ className }: IClassProps) => {
    return (
        <RootNav
            className={cn(
                'pointer-events-none fixed w-full backdrop-blur-2xl',
                className
            )}
        >
            <div className="pointer-events-auto">
                <NavEcoopLogo />
            </div>
            <NavContainer />
            <NavContainer className="pointer-events-auto">
                <NavProfileMenu />
                <NavThemeToggle />
            </NavContainer>
        </RootNav>
    )
}

export {OnboardingNav}
