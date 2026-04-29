import NavAuthGroup from '../nav-components/nav-auth-group'
import NavEcoopLogo from '../nav-components/nav-ecoop-logo'
import NavThemeToggle from '../nav-components/nav-theme-toggle'
import NavContainer from '../nav-container'
import RootNav from '../root-nav'

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
