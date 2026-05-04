import type { ReactNode } from 'react'

import type { DragEndEvent } from '@dnd-kit/core'
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { arrayMove } from '@dnd-kit/sortable'
import { cn } from '@ecoop/shared/tw-utils'
import type { IChildProps, IClassProps } from '@ecoop/shared/types'
import type { Row, Table as TableInstance } from '@tanstack/react-table'

import { Table } from '@ecoop/ui/core'
import DataTableBody from './data-table-body'
import DataTableFooter from './data-table-footer'
import DataTableHeader from './data-table-header'

interface ITableProps<TData> extends IClassProps {
    table: TableInstance<TData>
    rowClassName?: string
    isScrollable?: boolean
    isStaticWidth?: boolean
    isStickyHeader?: boolean
    isStickyFooter?: boolean
    onRowClick?: (
        row: Row<TData>,
        e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
    ) => void
    onDoubleClick?: (
        row: Row<TData>,
        e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
    ) => void
    setColumnOrder?: React.Dispatch<React.SetStateAction<string[]>>
    RowContextComponent?: (
        rowProps: { row: Row<TData> } & IChildProps
    ) => ReactNode
}

const DataTable = <TData,>({
    table,
    className,
    rowClassName,
    isScrollable,
    isStickyHeader,
    isStickyFooter,
    isStaticWidth = false,
    onDoubleClick,
    setColumnOrder,
    onRowClick,
    RowContextComponent,
}: ITableProps<TData>) => {
    const handleDragEnd = (event: DragEndEvent) => {
        if (!setColumnOrder) return

        const { active, over } = event

        if (active && over && active.id !== over.id) {
            setColumnOrder((columnOrder) => {
                const oldIndex = columnOrder.indexOf(active.id as string)
                const newIndex = columnOrder.indexOf(over.id as string)
                return arrayMove(columnOrder, oldIndex, newIndex)
            })
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div
                className={cn(
                    'ecoop-scroll bg-popover ring-offset-0 shadow dark:bg-secondary/10 rounded-lg -z-0',
                    className,
                    !isScrollable ? 'h-fit max-h-none min-h-fit' : 'h-full grow'
                )}
            >
                <Table
                    className="table-fixed border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none"
                    style={
                        isStaticWidth
                            ? {
                                  width: table.getTotalSize(),
                              }
                            : {}
                    }
                >
                    <DataTableHeader
                        columnOrder={table.getState().columnOrder}
                        headerGroups={table.getHeaderGroups()}
                        isStickyHeader={isStickyHeader}
                    />
                    <DataTableBody
                        colCount={table.getVisibleLeafColumns().length}
                        onDoubleClick={onDoubleClick}
                        onRowClick={onRowClick}
                        rowClassName={rowClassName}
                        RowContextComponent={RowContextComponent}
                        rows={table.getRowModel().rows}
                    />
                    <DataTableFooter
                        isStickyFooter={isStickyFooter && isScrollable}
                        table={table}
                    />
                </Table>
            </div>
        </DndContext>
    )
}

export { DataTable }
