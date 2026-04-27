import { ReactNode, useMemo } from 'react'

import { formatNumber } from '@e-coop-monorepo/shared/helpers'
import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { Column, Header, Table } from '@tanstack/react-table'

import { IClassProps } from '@e-coop-monorepo/shared/types'

interface DataTableFooterSummationProps<TData, TValue> extends IClassProps {
    totalLabel?: string | ReactNode
    table: Table<TData>
    column: Column<TData, TValue>
    header: Header<TData, TValue>
}

const DataTableFooterSummation = <TData, TValue>({
    table,
    column,
    className,
    totalLabel = 'Total',
}: DataTableFooterSummationProps<TData, TValue>) => {
    const sum = useMemo(() => {
        const rows = table.getCoreRowModel().rows

        return rows.reduce((total, row) => {
            const value = row.getValue<TValue>(column.id)
            return total + (typeof value === 'number' ? value : 0)
        }, 0)
    }, [table, column.id])

    return (
        <div>
            <span className="text-muted-foreground">{totalLabel} : </span>
            <span className={cn('font-medium', className)}>
                {formatNumber(sum)}
            </span>
        </div>
    )
}

export default DataTableFooterSummation
