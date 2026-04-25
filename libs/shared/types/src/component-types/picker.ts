import { ReactNode } from 'react'

export interface IModalState {
    open: boolean
    onOpenChange: (value: boolean | ((prev: boolean) => boolean)) => void
    openModal: () => void
    close: () => void
    toggle: () => void
}

export interface IPickerBaseProps<T = unknown> {
    value?: T
    onSelect?: (selected: T) => void

    disabled?: boolean
    placeholder?: string
    triggerClassName?: string
    modalState?: IModalState

    customComponent?: ReactNode
    triggerVariant?:
        | 'ghost'
        | 'secondary'
        | 'outline'
        | 'link'
        | 'nostyle'
        | 'default'
        | 'destructive'
        | null
        | undefined

    allowShortcutHotKey?: boolean
    shortcutHotKey?: string
}
