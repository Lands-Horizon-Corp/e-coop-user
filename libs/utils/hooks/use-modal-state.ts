import { useState } from 'react'

export const useModalState = (defaultState = false) => {
    const [open, onOpenChange] = useState(defaultState)

    return { open, onOpenChange }
}
