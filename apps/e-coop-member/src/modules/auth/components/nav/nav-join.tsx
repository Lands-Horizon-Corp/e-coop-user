import { Link } from '@tanstack/react-router'

import { useFakeStore } from '@ecoop/shared/store'
import { FingerprintScanIcon } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'

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
