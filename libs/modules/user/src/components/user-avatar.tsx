import { cn } from '@ecoop/shared/tw-utils'
import type { IBaseProps } from '@ecoop/shared/types'
import { Avatar, AvatarFallback, AvatarImage } from '@ecoop/ui/core'

interface Props extends IBaseProps {
    src: string
    fallback?: string
    avatarClassname?: string
    fallbackClassName?: string
}

const UserAvatar = ({
    src,
    children,
    className,
    fallback = '-',
    avatarClassname,
    fallbackClassName,
}: Props) => {
    if (fallback.length === 0 || fallback.length > 2)
        throw new Error(
            'User avatar fallback must atleast contain & not exceed 2 characters'
        )

    return (
        <Avatar className={cn('size-6', className)}>
            <AvatarImage
                className={cn('object-cover', avatarClassname)}
                src={src}
            />
            <AvatarFallback className={fallbackClassName}>
                {fallback}
            </AvatarFallback>
            {children}
        </Avatar>
    )
}

export { UserAvatar }
