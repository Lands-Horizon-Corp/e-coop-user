import type { ReactNode } from 'react'

import { Navigate, useRouter } from '@tanstack/react-router'

import { useAuthStore } from '@ecoop/modules/authentication'
import type { IUserBase, TUserType } from '@ecoop/modules/user'
import { UserAvatar } from '@ecoop/modules/user'
import type { IBaseProps } from '@ecoop/shared/types'
import { BadgeExclamationFillIcon } from '@ecoop/ui/core'
import { LoadingSpinner } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'

interface Props extends IBaseProps {
    allowNoUserType?: boolean
    allowedUserTypes?: TUserType[]
}

const UserTypeGuard = ({
    children,
    allowedUserTypes = [],
    allowNoUserType = false,
}: Props) => {
    const router = useRouter()
    const { currentAuth, authStatus } = useAuthStore()

    if (authStatus === 'loading')
        return (
            <div className="relative flex h-screen w-full items-center justify-center">
                <LoadingSpinner />
            </div>
        )

    if (authStatus === 'unauthorized' || !currentAuth.user)
        return <Navigate to={'/auth/sign-in' as string} />

    if (authStatus === 'error' && !currentAuth.user)
        return (
            <div className="relative flex h-screen w-full items-center justify-center">
                <p>
                    Sorry, There&apos;s an unexpected problem, try refreshing
                    the page.
                </p>
            </div>
        )

    if (currentAuth.user.type === 'ban') {
        return (
            <BannerContainer>
                <AccountInfoContent
                    currentUser={currentAuth.user}
                    infoDescription="It looks like your account has been banned. If you think this is a mistake, please talk your cooperative admin/staff for assistance."
                    infoTitle="Not Allowed"
                />
                <Button
                    className="rounded-full"
                    onClick={() => router.history.back()}
                >
                    Go Back
                </Button>
            </BannerContainer>
        )
    }

    if (
        (allowNoUserType && !currentAuth.user.type) ||
        !allowedUserTypes.includes(
            currentAuth.user.type ?? ('' as unknown as TUserType)
        )
    ) {
        return (
            <BannerContainer>
                <AccountInfoContent
                    currentUser={currentAuth.user}
                    infoDescription="It looks like your account is not allowed on this page."
                    infoTitle="Not Allowed"
                />
                <Button
                    className="rounded-full"
                    onClick={() => router.history.back()}
                >
                    Go Back
                </Button>
            </BannerContainer>
        )
    }

    return children
}

const BannerContainer = ({ children }: { children?: ReactNode }) => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-y-4">
            {children}
        </div>
    )
}

const AccountInfoContent = ({
    infoTitle,
    infoDescription,
    currentUser,
}: {
    infoTitle: string
    infoDescription: string
    currentUser: IUserBase
}) => {
    return (
        <>
            <UserAvatar
                className="size-36 border-4 text-2xl font-medium"
                fallback={currentUser.user_name.charAt(0) ?? '-'}
                src={currentUser.media?.download_url ?? ''}
            />
            {currentUser.type === 'ban' && (
                <BadgeExclamationFillIcon className="size-8 text-rose-400" />
            )}
            <p className="text-xl font-medium">{infoTitle}</p>
            <p className="max-w-xl text-center text-foreground/80">
                {infoDescription}
            </p>
        </>
    )
}

export default UserTypeGuard
