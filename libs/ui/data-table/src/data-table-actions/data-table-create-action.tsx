import { cn } from '@ecoop/shared/tw-utils'
import { PlusIcon } from '@ecoop/ui/core'
import { LoadingSpinner } from '@ecoop/ui/core'
import type { ButtonProps } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import type { IconType } from 'react-icons/lib'

export interface IDataTableCreateActionProps extends Omit<
    ButtonProps,
    'onClick'
> {
    label?: string
    isHidden?: boolean
    isLoading?: boolean
    className?: string
    Icon?: IconType
    onClick: () => void
}

const DataTableCreateAction = ({
    Icon,
    disabled,
    isLoading,
    className,
    label = 'Create',
    onClick,
    ...other
}: IDataTableCreateActionProps) => {
    return (
        <Button
            className={cn('gap-x-1 rounded-md', className)}
            disabled={disabled || isLoading}
            onClick={onClick}
            size="sm"
            variant="default"
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : Icon ? (
                <Icon className="mr-1 size-4" />
            ) : (
                <PlusIcon className="mr-1 size-4" />
            )}
            {label}
        </Button>
    )
}

export default DataTableCreateAction
