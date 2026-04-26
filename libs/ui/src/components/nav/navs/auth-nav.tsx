import NavAuthGroup from '@e-coop-monorepo/ui'
import NavEcoopLogo from '@e-coop-monorepo/ui'
import NavThemeToggle from '@e-coop-monorepo/ui'
import NavContainer from '@e-coop-monorepo/ui'
import RootNav from '@e-coop-monorepo/ui'

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
