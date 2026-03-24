import { Link, useLocation } from '@tanstack/react-router'

import { FingerPrintIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

import { useAuthStore } from '../../authgentication.store'

const NavSignIn = () => {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const { authStatus } = useAuthStore()

    if (authStatus === 'authorized' || pathname === '/auth/sign-in') return null

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
