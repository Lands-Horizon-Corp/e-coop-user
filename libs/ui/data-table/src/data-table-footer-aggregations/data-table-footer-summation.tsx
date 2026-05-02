import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { formatNumber } from '@ecoop/shared/helpers'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps } from '@ecoop/shared/types'
import type { Column, Header, Table } from '@tanstack/react-table'

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
