import { ReactNode, useRef } from 'react'

import { Navigate, useLocation } from '@tanstack/react-router'

import { useFakeStore } from '@/store/fake-store'

// adjust path

interface Props {
    children: ReactNode
    pageType?: 'AUTHENTICATED' | 'PUBLIC'
}

const AuthGuard = ({ children, pageType = 'AUTHENTICATED' }: Props) => {
    const { pathname } = useLocation()

    const { authMember } = useFakeStore()

    // Store original route for redirecting after login
    const callbackRef = useRef<string | null>(null)

    if (callbackRef.current === null && !pathname.startsWith('/auth')) {
        callbackRef.current = pathname
    }

    const callbackUrl = callbackRef.current || '/'

    if (pageType === 'AUTHENTICATED') {
        if (!authMember) {
            return (
                <Navigate
                    ignoreBlocker
                    search={{ cbUrl: callbackUrl }}
                    to="/auth/sign-in"
                />
            )
        }
    }

    // === 2️⃣ PUBLIC ROUTE — ALWAYS SHOW ===
    return children
}

export default AuthGuard
