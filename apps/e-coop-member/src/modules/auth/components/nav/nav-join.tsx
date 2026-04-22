import { Link } from '@tanstack/react-router'

import { useFakeStore } from '@/store/fake-store'

import { FingerprintScanIcon } from '@e-coop-monorepo/ui/components/icons'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'

const NavJoin = () => {
    const { authMember } = useFakeStore()

    if (authMember) return null

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
