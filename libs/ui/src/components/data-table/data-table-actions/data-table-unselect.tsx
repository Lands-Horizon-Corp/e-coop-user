import { Table } from '@tanstack/react-table'

import { DashSquareDottedIcon } from '@e-coop-monorepo/ui'
import ActionTooltip from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'

import { IClassProps } from '@e-coop-monorepo/shared/types'

export interface IDataTableDeleteSelectedProps<T> extends IClassProps {
    table: Table<T>
}

const DataTableUnselect = <T,>({
    table,
    className,
}: IDataTableDeleteSelectedProps<T>) => {
    const selectedRows = table
        .getSelectedRowModel()
        .flatRows.map((row) => row.original)

    if (selectedRows.length === 0) return null

    return (
        <ActionTooltip
            tooltipContent={`Unselect ${selectedRows.length} row(s)`}
        >
            <Button
                className={className}
                disabled={selectedRows.length === 0}
                onClick={() => table.resetRowSelection()}
                size="icon"
                variant="secondary"
            >
                <DashSquareDottedIcon />
            </Button>
        </ActionTooltip>
    )
}

export default DataTableUnselect
