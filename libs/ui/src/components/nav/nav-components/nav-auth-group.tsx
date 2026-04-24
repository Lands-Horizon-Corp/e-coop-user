import { useLocation } from '@tanstack/react-router'

import NavJoin from '@e-coop-monorepo/modules/auth/components/nav/nav-join'
import NavSignIn from '@e-coop-monorepo/modules/auth/components/nav/nav-sign-in'
import NavSignOut from '@e-coop-monorepo/modules/auth/components/nav/nav-sign-out'

// import NavSignIn from '@e-coop-monorepo/modules/authentication/components/nav/nav-sign-in'
// import NavSignOut from '@e-coop-monorepo/modules/authentication/components/nav/nav-sign-out'
// import NavSignUp from '@e-coop-monorepo/modules/authentication/components/nav/nav-sign-up'

import NavGetStarted from './nav-get-started'

const NavAuthGroup = () => {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })

    return (
        <>
            {pathname !== '/auth/sign-up' && <NavJoin />}
            {pathname !== '/auth/sign-in' && <NavSignIn />}
            {['/', '/about', '/contact', '/terms'].includes(pathname) && (
                <NavGetStarted />
            )}
            <NavSignOut />
        </>
    )
}

export default NavAuthGroup
