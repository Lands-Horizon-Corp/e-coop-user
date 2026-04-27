// this component sanitizes and display any content including html, text
import { sanitizeHtml } from '@e-coop-monorepo/shared/helpers'
import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { IClassProps } from '@e-coop-monorepo/shared/types'

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
