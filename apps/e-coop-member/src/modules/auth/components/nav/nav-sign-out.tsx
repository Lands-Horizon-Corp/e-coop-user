import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

// import { useAuthStore } from '@e-coop-monorepo/modules/authentication/authgentication.store'
import useConfirmModalStore from '@e-coop-monorepo/shared/store'
import { useFakeStore } from '@e-coop-monorepo/shared/store'
import { FingerprintOffIcon } from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'

import { useSignOut } from '../../auth.service'

const NavSignOut = () => {
    const router = useRouter()
    const { onOpen } = useConfirmModalStore()
    const { mutate: handleSignout } = useSignOut({
        options: {
            onSuccess: () => {
                router.navigate({ to: '/auth/sign-in' as string })
                toast.success('Signed out')
            },
        },
    })

    const { authMember } = useFakeStore()

    if (!authMember) return null

    return (
        <Button
            className="scale-effects rounded-full cursor-pointer"
            // disabled={isSigningOut}
            onClick={() =>
                onOpen({
                    title: 'Sign Out',
                    description: 'Are you sure you want to sign out?',
                    onConfirm: () => handleSignout(),
                })
            }
            variant="outline"
        >
            <FingerprintOffIcon /> Sign-Out
        </Button>
    )
}

export default NavSignOut
