import { ReloadIcon } from '@ecoop/ui/core'
import { LoadingSpinner } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'

export interface IRefreshButtonProps {
    isLoading?: boolean
    onClick: () => void
    className?: string
}

const RefreshButton = ({
    isLoading,
    onClick,
    className,
}: IRefreshButtonProps) => {
    return (
        <Button
            className={className}
            disabled={isLoading}
            onClick={onClick}
            size="icon"
            variant="secondary"
        >
            {isLoading ? <LoadingSpinner /> : <ReloadIcon />}
        </Button>
    )
}

export default RefreshButton
