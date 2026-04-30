import type { MouseEvent, ReactElement} from 'react';
import type React from 'react';
import { cloneElement } from 'react'

import type { IMedia } from '@e-coop-monorepo/modules/media'
import { useImagePreview } from '@e-coop-monorepo/shared/store'
import { cn } from '@e-coop-monorepo/shared/tw-utils'

type WithClickWrapperProps<T extends HTMLElement> = {
    media?: IMedia
    shouldStopPropagate?: boolean
    children: ReactElement<{
        className?: string
        onClick?: (event: React.MouseEvent<T, MouseEvent>) => void
    }>
    onWrapperClick?: (event: React.MouseEvent<T, MouseEvent>) => void
}

const PreviewMediaWrapper = <T extends HTMLElement = HTMLButtonElement>({
    media,
    children,
    shouldStopPropagate = true,
    onWrapperClick,
}: WithClickWrapperProps<T>) => {
    const { onOpen } = useImagePreview()

    if (media === undefined) return children

    const originalOnClick = children.props.onClick

    const handleClick = (event: React.MouseEvent<T, MouseEvent>) => {
        if (onWrapperClick) onWrapperClick(event)
        else onOpen({ Images: [media] })

        if (shouldStopPropagate) event.stopPropagation()

        if (originalOnClick) originalOnClick(event)
    }

    return cloneElement(children, {
        onClick: handleClick,
        className: cn(children.props.className, 'cursor-pointer'),
    })
}

export default PreviewMediaWrapper
