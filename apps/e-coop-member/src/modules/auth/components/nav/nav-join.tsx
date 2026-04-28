import { Link } from '@tanstack/react-router'

import { useFakeStore } from '@e-coop-monorepo/shared/store'
import { FingerprintScanIcon } from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'

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
