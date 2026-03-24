import { Navigate, useSearch } from '@tanstack/react-router'

import { IBaseProps } from '@/types'

import { useAuthStore } from '../authgentication.store'

interface IGuestGuardProps extends Omit<IBaseProps, 'className'> {
    allowAuthenticatedUser?: false
}

const GuestGuard = ({
    allowAuthenticatedUser = false,
    children,
}: IGuestGuardProps) => {
    const { cbUrl } = useSearch({ strict: false }) as { cbUrl?: string }
    const {
        currentAuth: { member_profile },
    } = useAuthStore()

    if (!allowAuthenticatedUser && member_profile) {
        return (
            <div className="flex h-[100vh] flex-col items-center justify-center text-center">
                <div className="flex items-center gap-x-4 rounded-xl bg-popover p-4">
                    <p className="">Redirecting...</p>
                    {cbUrl ? (
                        <Navigate to={cbUrl as string} />
                    ) : (
                        <Navigate to="/dashboard" />
                    )}
                </div>
            </div>
        )
    }

    return <>{children}</>
}

export default GuestGuard
