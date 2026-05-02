import type { ReactNode } from 'react'

import { ActionSecurityModal } from '@ecoop/ui/modals'

export function ActionSecurityProvider({ children }: { children?: ReactNode }) {
    return (
        <>
            {children}
            <ActionSecurityModal />
        </>
    )
}
