import type { IClassProps } from '@e-coop-monorepo/shared/types'

export interface IDropAreaProps extends IClassProps {
    isDraggingAbove?: boolean
    dropText?: string
}
