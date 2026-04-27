import { ReloadIcon } from '@e-coop-monorepo/ui'
import {LoadingSpinner} from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'

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
