import { useEffect } from 'react'

export function useAlertBeforeClosing(shouldAlert = true) {
    useEffect(() => {
        if (!shouldAlert) return

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault()
            return
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [shouldAlert])
}
