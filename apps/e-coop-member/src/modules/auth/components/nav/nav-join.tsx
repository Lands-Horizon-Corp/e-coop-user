import { Link, useLocation } from '@tanstack/react-router'

import { FingerprintScanIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

import { useAuthStore } from '../../authgentication.store'

const NavJoin = () => {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const { authStatus } = useAuthStore()

    if (authStatus !== 'unauthorized' || pathname === '/auth/join') return null

    return (
        <Link to="/auth/join">
            <Button
                className="scale-effects cursor-pointer rounded-full"
                variant="outline"
            >
                <FingerprintScanIcon className="inline mr-1" />
                Sign-Up
            </Button>
        </Link>
    )
}

export default NavJoin
