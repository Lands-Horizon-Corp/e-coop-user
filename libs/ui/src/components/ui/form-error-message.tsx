import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { IClassProps } from '@e-coop-monorepo/shared/types'

import { ErrorExclamationIcon } from '../icons/index'

interface Props extends IClassProps {
    errorMessage?: string
}

const FormErrorMessage = ({ className, errorMessage }: Props) => {
    if (!errorMessage || errorMessage === null) return null

    return (
        <span
            className={cn(
                'flex items-start gap-x-1.5 rounded-md border border-destructive/70 bg-destructive/50 p-2 py-2 text-sm text-destructive-foreground dark:bg-destructive/80 dark:text-destructive-foreground',
                className
            )}
        >
            <ErrorExclamationIcon className="my-0.5 size-4" />
            <p className="w-full">{errorMessage}</p>
        </span>
    )
}

export { FormErrorMessage }
