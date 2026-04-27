import { ReactNode } from 'react'

import { TFilterObject } from '@e-coop-monorepo/shared/contexts'
import { ColumnDef, Row } from '@tanstack/react-table'

import { IChildProps, IClassProps } from '@e-coop-monorepo/shared/types'

export interface TableProps<T> extends IClassProps {
    persistKey?: string[]
    defaultFilter?: TFilterObject
    defaultColumnSort?: string[]
    excludeColumnIds?: string[]
    tableColumns?: ColumnDef<T>[]
    RowContextComponent?: (rowProps: { row: Row<T> } & IChildProps) => ReactNode
    onRowClick?: (row: Row<T>) => void
    onDoubleClick?: (row: Row<T>) => void
    onSelectData?: (selectedData: T[]) => void
}
