import { useCallback } from 'react'

import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { useQeueryHookCallback } from '@/hooks/use-query-hook-cb'

import { IAuthContext } from '../auth-types'
import { useAuthContext } from '../auth.service'
import { useAuthStore } from '../authgentication.store'

// Jervx Note: This serves as entry loader for user auth
// I made this as Headless component but this can be converted to a custom hook.

const AuthLoader = () => {
    const { setAuthStatus, setCurrentAuth, resetAuth } = useAuthStore()

    const { error, isError, data, isSuccess } = useAuthContext({
        options: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    })

    const handleSuccess = useCallback(
        (authorizationContext: IAuthContext) => {
            // ONLY HERE FOR MEMBER PORTAL
            if (!authorizationContext.member_profile) {
                toast.error('Your dont have member profile set')
                setCurrentAuth({})
                setAuthStatus('unauthorized')
                return
            }

            setCurrentAuth(authorizationContext)
            setAuthStatus('authorized')
        },
        [setAuthStatus, setCurrentAuth]
    )

    const handleError = useCallback(
        (rawError: Error) => {
            if (rawError instanceof AxiosError && rawError.status === 401) {
                resetAuth()
                setAuthStatus('unauthorized')
                return null
            }
            if (rawError instanceof AxiosError && rawError.status === 500) {
                setAuthStatus('error')
                return null
            }
            setAuthStatus('error')
        },
        [resetAuth, setAuthStatus]
    )

    useQeueryHookCallback({
        data,
        error,
        isError,
        isSuccess,
        onSuccess: handleSuccess,
        onError: handleError,
    })

    return null
}

export default AuthLoader
