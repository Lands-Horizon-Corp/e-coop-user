import type { ReactNode } from 'react'

import {ActionSecurityModal} from '@e-coop-monorepo/ui'

export function ActionSecurityProvider({ children }: { children?: ReactNode }) {
    return (
        <>
            {children}
            <ActionSecurityModal />
        </>
    )
}
