import NavAuthGroup from '@e-coop-monorepo/ui/core'
import NavEcoopLogo from '@e-coop-monorepo/ui/core'
import NavThemeToggle from '@e-coop-monorepo/ui/core'
import NavContainer from '@e-coop-monorepo/ui/core'
import RootNav from '@e-coop-monorepo/ui/core'

const AuthNav = () => {
    return (
        <RootNav className="pointer-events-none sticky top-0 w-full">
            <NavEcoopLogo />
            <NavContainer />
            <NavContainer className="pointer-events-auto">
                <NavAuthGroup />
                <NavThemeToggle />
            </NavContainer>
        </RootNav>
    )
}

export default AuthNav
