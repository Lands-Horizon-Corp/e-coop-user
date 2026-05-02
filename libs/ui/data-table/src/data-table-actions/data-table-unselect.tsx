import type { IClassProps } from '@ecoop/shared/types'
import { DashSquareDottedIcon } from '@ecoop/ui/core'
import { ActionTooltip } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import type { Table } from '@tanstack/react-table'

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
