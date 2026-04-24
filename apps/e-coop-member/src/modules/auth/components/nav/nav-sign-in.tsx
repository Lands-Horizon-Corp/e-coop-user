import { Link } from '@tanstack/react-router'

import { useFakeStore } from '@e-coop-monorepo/shared/store'
import { FingerPrintIcon } from '@e-coop-monorepo/ui/components/icons'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'

const NavSignIn = () => {
    const { authMember } = useFakeStore()

    if (authMember) return null

    return (
        <Button asChild className="scale-effects rounded-full cursor-pointer">
            <Link to={'/auth/sign-in' as string}>
                <FingerPrintIcon className="inline mr-1" />
                Sign-In
            </Link>
        </Button>
    )
}

export default NavSignIn
