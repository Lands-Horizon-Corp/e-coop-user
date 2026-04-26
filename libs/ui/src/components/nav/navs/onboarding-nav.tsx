import { cn } from '@/helpers'
import NavProfileMenu from '@e-coop-monorepo/modules/user-profile'

import { IClassProps } from '@e-coop-monorepo/shared/types'

import NavEcoopLogo from '../nav-components/nav-ecoop-logo'
import NavThemeToggle from '../nav-components/nav-theme-toggle'
import NavContainer from '../nav-container'
import RootNav from '../root-nav'

const OnboardingNav = ({ className }: IClassProps) => {
    return (
        <RootNav
            className={cn(
                'pointer-events-none fixed w-full backdrop-blur-2xl',
                className
            )}
        >
            <NavEcoopLogo className="pointer-events-auto" />
            <NavContainer />
            <NavContainer className="pointer-events-auto">
                <NavProfileMenu />
                <NavThemeToggle />
            </NavContainer>
        </RootNav>
    )
}

export default OnboardingNav
