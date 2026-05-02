import { Link } from '@tanstack/react-router'

import { useFakeStore } from '@ecoop/shared/store'
import { FingerPrintIcon } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'

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
