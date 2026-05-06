// this component sanitizes and display any content including html, text
import { sanitizeHtml } from '@ecoop/shared/helpers/core-helpers'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps } from '@ecoop/shared/types'

interface Props extends IClassProps {
    expandedClassName?: string
    content: string
}

const TextRenderer = ({ className, content }: Props) => {
    return (
        <div
            className={cn('', className)}
            dangerouslySetInnerHTML={{
                __html: sanitizeHtml(content),
            }}
        />
    )
}

export default TextRenderer
