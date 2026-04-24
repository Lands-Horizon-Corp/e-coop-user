import { useRouter } from '@tanstack/react-router'

import { useAuthStore } from '@e-coop-monorepo/modules/auth/authgentication.store'

import ImageDisplay from '@/components/image-display'
import { Button } from '@/components/ui/button'

const NavGetStarted = () => {
    const { navigate } = useRouter()
    const {
        currentAuth: { user, member_profile },
        authStatus,
    } = useAuthStore()

    if (!user || !member_profile || authStatus !== 'authorized') return null

    return (
        <Button
            className="scale-effects gap-x-2 cursor-pointer rounded-full px-2 bg-primary/70"
            onClick={() => {
                navigate({ to: '/dashboard' })
            }}
        >
            <ImageDisplay
                fallback={member_profile?.full_name.charAt(0) ?? '-'}
                fallbackClassName="bg-secondary text-secondary-foreground"
                src={member_profile?.media?.download_url ?? ''}
            />
            <span className="mr-2">My Dashboard</span>
        </Button>
    )
}

export default NavGetStarted
