// import { useCallback } from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import {
    CheckFillIcon,
    InfoFillCircleIcon,
    NotAllowedIcon,
    WarningFillIcon,
} from '@e-coop-monorepo/ui/components/icons'
import ConfirmModal from '@e-coop-monorepo/ui/components/modals/confirm-modal'
import LoadingSpinner from '@e-coop-monorepo/ui/components/spinners/loading-spinner'

// import { AxiosError } from 'axios'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'

// import { NATS_PASS, NATS_USER } from '@e-coop-monorepo/shared/constants'
// import { IAuthContext, useAuthContext } from '@e-coop-monorepo/modules/authentication'
// import { useAuthStore } from '@e-coop-monorepo/modules/authentication/authgentication.store'
// import UserProfileInactivityPrompter from '@e-coop-monorepo/modules/user-profile/components/user-profile-inactivity-prompter'
// import { ActionSecurityProvider } from '@e-coop-monorepo/shared/providers'
// import ConnectionProvider from '@e-coop-monorepo/shared/providers'

// import CookieConsent from '@e-coop-monorepo/ui/components/cookie-consent'
// import {
//     CheckFillIcon,
//     InfoFillCircleIcon,
//     NotAllowedIcon,
//     WarningFillIcon,
// } from '@e-coop-monorepo/ui/components/icons'
// import ImagePreviewModal from '@e-coop-monorepo/ui/components/image-preview/image-preview-modal'
// import ConfirmModal from '@e-coop-monorepo/ui/components/modals/confirm-modal'
// import InfoModal from '@e-coop-monorepo/ui/components/modals/info-modal'
// import LoadingSpinner from '@e-coop-monorepo/ui/components/spinners/loading-spinner'
// import { Toaster } from '@e-coop-monorepo/ui/components/ui/sonner'

// import { useNatsConnect } from '@e-coop-monorepo/shared/hooks'
// import { useQeueryHookCallback } from '@e-coop-monorepo/shared/hooks'

// import ErrorPage from './-common-pages/error-page'
// import NotFoundPage from './-common-pages/not-found-page'

export const Route = createRootRoute({
    component: RootLayout,
    // errorComponent: ErrorPage,
    // notFoundComponent: NotFoundPage,
})

function RootLayout() {
    // const { setAuthStatus, setCurrentAuth, resetAuth } = useAuthStore()

    // const { error, isError, data, isSuccess } = useAuthContext({
    //     options: {
    //         refetchOnWindowFocus: false,
    //         retry: 0,
    //     },
    // })

    // const handleSuccess = useCallback(
    //     (authorizationContext: IAuthContext) => {
    //         setCurrentAuth(authorizationContext)
    //         setAuthStatus('authorized')
    //     },
    //     [setAuthStatus, setCurrentAuth]
    // )

    // const handleError = useCallback(
    //     (rawError: Error) => {
    //         if (rawError instanceof AxiosError && rawError.status === 401) {
    //             resetAuth()
    //             setAuthStatus('unauthorized')
    //             return null
    //         }
    //         if (rawError instanceof AxiosError && rawError.status === 500) {
    //             setAuthStatus('error')
    //             return null
    //         }
    //         setAuthStatus('error')
    //     },
    //     [resetAuth, setAuthStatus]
    // )

    // useQeueryHookCallback({
    //     data,
    //     error,
    //     isError,
    //     isSuccess,
    //     onSuccess: handleSuccess,
    //     onError: handleError,
    // })

    // useNatsConnect({ user: NATS_USER, pass: NATS_PASS })

    return (
        <div className="relative">
            {/* <DndProvider backend={HTML5Backend}> */}
            <Toaster
                className="z-[9999] toaster group"
                closeButton
                icons={{
                    success: (
                        <span className="bg-green-300/20 rounded-full animate-pulse flex items-center justify-center p-1">
                            <CheckFillIcon className="text-green-400 size-4 inline" />
                        </span>
                    ),

                    info: (
                        <span className="bg-blue-300/20 rounded-full animate-pulse flex items-center justify-center p-1">
                            <InfoFillCircleIcon className="text-blue-400 size-4 inline" />
                        </span>
                    ),
                    loading: <LoadingSpinner />,
                    error: (
                        <span className="bg-rose-300/20 rounded-full animate-pulse flex items-center justify-center p-1">
                            <NotAllowedIcon className="text-rose-400 size-4 inline" />
                        </span>
                    ),

                    warning: (
                        <span className="bg-[#e8915f]/20 rounded-full animate-pulse flex items-center justify-center p-1">
                            <WarningFillIcon className="text-[#e8915f] size-4 inline" />
                        </span>
                    ),
                }}
                richColors
                theme="system"
                toastOptions={{
                    classNames: {
                        icon: 'flex items-center !mr-2 justify-center',

                        success:
                            '!p-4 !rounded-xl !border-t-0 !border-x-0 !border-b-1 ' +
                            '!bg-green-50 dark:!bg-gradient-to-tr ' +
                            '!border-b-green-500 !border-green-600 ' +
                            'dark:!from-green-500/20 dark:!to-background ' +
                            '!text-foreground',

                        info:
                            '!p-4 !rounded-xl !border-t-0 !border-x-0 !border-b-1 ' +
                            '!bg-blue-50 dark:!bg-gradient-to-tr ' +
                            '!border-b-blue-500 !border-blue-600 ' +
                            'dark:!from-blue-500/20 dark:!to-background ' +
                            '!text-foreground',

                        loading:
                            '!p-4 !rounded-xl !border-t-0 !border-x-0 !border-b-1 ' +
                            '!bg-primary/10 dark:!bg-gradient-to-tr ' +
                            '!border-b-primary !border-primary ' +
                            'dark:!from-primary/40 dark:!to-background ' +
                            '!text-foreground',

                        error:
                            '!p-4 !rounded-xl !border-t-0 !border-x-0 !border-b-1 ' +
                            '!bg-rose-50 dark:!bg-gradient-to-tr ' +
                            '!border-b-rose-400 !border-rose-400 ' +
                            'dark:!from-rose-400/20 dark:!to-background ' +
                            '!text-foreground',

                        warning:
                            '!p-4 !rounded-xl !border-t-0 !border-x-0 !border-b-1 ' +
                            '!bg-[#e8915f]/10 dark:!bg-gradient-to-tr ' +
                            '!border-b-[#e8915f] !border-[#e8915f] ' +
                            'dark:!from-[#e8915f]/20 dark:!to-popover ' +
                            '!text-foreground',
                    },
                }}
            />
            <Outlet />
            <ConfirmModal />
            {/* <ConnectionProvider /> */}
            {/* <CookieConsent />
                <ImagePreviewModal />
                <InfoModal />
                <UserProfileInactivityPrompter />
                <ActionSecurityProvider /> */}
            {/* </DndProvider> */}
        </div>
    )
}
