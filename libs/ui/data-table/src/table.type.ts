import type { ReactNode } from 'react'

import type { TFilterObject } from '@ecoop/shared/contexts'
import type { IChildProps, IClassProps } from '@ecoop/shared/types'
import type { ColumnDef, Row } from '@tanstack/react-table'

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
