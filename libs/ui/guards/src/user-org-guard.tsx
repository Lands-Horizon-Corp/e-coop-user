import { useEffect } from 'react'

import { Navigate } from '@tanstack/react-router'

import { useAuthUser } from '@ecoop/modules/authentication'
import {
    useSendHeartbeatOffline,
    useSendHeartbeatOnline,
} from '@ecoop/modules/heartbeat'
import type { IChildProps } from '@ecoop/shared/types'

// interface Props extends IChildProps {}

const UserOrgGuard = ({ children }: IChildProps) => {
    const sendOnline = useSendHeartbeatOnline()
    const sendOffline = useSendHeartbeatOffline()

    const {
        currentAuth: { user_organization },
    } = useAuthUser()

    useEffect(() => {
        // Only start heartbeat if user_organization exists
        if (!user_organization) return

        // Send online heartbeat on mount and every 5s
        const sendHeartbeat = () => sendOnline.mutate()
        sendHeartbeat()

        // Mark offline on tab close
        const handleUnload = () => sendOffline.mutate()
        window.addEventListener('beforeunload', handleUnload)

        return () => {
            window.removeEventListener('beforeunload', handleUnload)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!user_organization) {
        // toast.error('No organization found. Please complete onboarding.')
        return <Navigate to={'/onboarding' as string} />
    }

    return children
}

export default UserOrgGuard
