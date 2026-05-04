import { useLocation } from '@tanstack/react-router'

// import NavJoin from '@ecoop/modules/auth/components/nav/nav-join'
// import NavSignIn from '@ecoop/modules/auth/components/nav/nav-sign-in'
// import NavSignOut from '@ecoop/modules/auth/components/nav/nav-sign-out'

// import NavSignIn from '@ecoop/modules/authentication/components/nav/nav-sign-in'
// import NavSignOut from '@ecoop/modules/authentication/components/nav/nav-sign-out'
// import NavSignUp from '@ecoop/modules/authentication/components/nav/nav-sign-up'

import { NavGetStarted } from './nav-get-started'
import NavJoin from 'apps/e-coop-member/src/modules/auth/components/nav/nav-join'
import NavSignIn from 'apps/e-coop-member/src/modules/auth/components/nav/nav-sign-in'
import NavSignOut from 'apps/e-coop-member/src/modules/auth/components/nav/nav-sign-out'

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

export {NavAuthGroup}
