import { ReactNode } from 'react'

import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { IClassProps } from '@e-coop-monorepo/shared/types'
import { DataTableActiveFilters } from '@e-coop-monorepo/ui'
import { DataTableDeleteSelected } from '@e-coop-monorepo/ui'
import { type IDataTableDeleteSelectedProps } from '@e-coop-monorepo/ui'
import { DataTableExport } from '@e-coop-monorepo/ui'
import { type IDataTableExportProps } from '@e-coop-monorepo/ui'
import { DataTableOptionsMenu } from '@e-coop-monorepo/ui'
import { type IDataTableScrollableOptionProps } from '@e-coop-monorepo/ui'
import { Separator } from '@e-coop-monorepo/ui'
import { Table } from '@tanstack/react-table'
import { useHotkeys } from 'react-hotkeys-hook'

import RefreshButton, { IRefreshButtonProps } from '../buttons/refresh-button'
import DatatableColumnVisibility from './data-table-actions/data-table-column-visibility'
import DataTableCreateAction, {
    IDataTableCreateActionProps,
} from './data-table-actions/data-table-create-action'
import { IDataTableFilterLogicOptionProps } from './data-table-actions/data-table-options-menu/filter-logic-option'
import DataTableUnselect from './data-table-actions/data-table-unselect'
import DataTableGlobalSearch, {
    IGlobalSearchProps,
} from './data-table-filters/data-table-global-search'

export interface IDataTableToolbarProps<TData> extends IClassProps {
    table: Table<TData>
    refreshActionProps: IRefreshButtonProps
    globalSearchProps?: IGlobalSearchProps<TData>
    scrollableProps?: IDataTableScrollableOptionProps
    filterLogicProps?: IDataTableFilterLogicOptionProps
    exportActionProps?: Omit<IDataTableExportProps<TData>, 'table'>
    deleteActionProps?: Omit<IDataTableDeleteSelectedProps<TData>, 'table'>
    createActionProps?: IDataTableCreateActionProps
    otherActionRight?: ReactNode
    hideRefreshButton?: boolean
    hideDeleteButton?: boolean
    hideCreateButton?: boolean
    hideExportButton?: boolean
    otherActionLeft?: ReactNode
}

const DataTableToolbar = <TData,>({
    table,
    scrollableProps,
    hideCreateButton,
    hideDeleteButton,
    hideExportButton,
    hideRefreshButton,
    otherActionRight,
    filterLogicProps,
    globalSearchProps,
    deleteActionProps,
    exportActionProps,
    createActionProps,
    refreshActionProps,
    otherActionLeft,
}: IDataTableToolbarProps<TData>) => {
    useHotkeys(
        'shift + Enter',
        (e) => {
            e.preventDefault()
            if (createActionProps && !hideCreateButton) {
                createActionProps.onClick()
            }
        },
        {
            enableOnFormTags: true,
        },
        [createActionProps, hideCreateButton]
    )

    return (
        <div className="ecoop-scroll flex w-full max-w-full shrink-0 items-center justify-between gap-x-2 overflow-auto">
            <div className="flex items-center gap-x-1">
                {otherActionLeft}
                {globalSearchProps ? (
                    <>
                        <DataTableGlobalSearch {...globalSearchProps} />
                        <DataTableActiveFilters />
                    </>
                ) : null}
            </div>
            <div className="flex items-center gap-x-2">
                <div className="flex items-center">
                    <DataTableUnselect
                        className="rounded-none border first:rounded-l-md last:rounded-r-md"
                        table={table}
                    />
                    {deleteActionProps && !hideDeleteButton && (
                        <DataTableDeleteSelected
                            table={table}
                            {...{
                                ...deleteActionProps,
                                className: cn(
                                    'rounded-none border first:rounded-l-md last:rounded-r-md',
                                    deleteActionProps.className
                                ),
                            }}
                        />
                    )}
                    {!hideRefreshButton && (
                        <RefreshButton
                            {...{
                                ...refreshActionProps,
                                className: cn(
                                    'rounded-none border first:rounded-l-md last:rounded-r-md',
                                    refreshActionProps.className
                                ),
                            }}
                        />
                    )}
                    <DatatableColumnVisibility
                        className="rounded-none border first:rounded-l-md last:rounded-r-md"
                        table={table}
                    />
                    <DataTableOptionsMenu
                        className="rounded-none border first:rounded-l-md last:rounded-r-md"
                        filterLogicOption={filterLogicProps}
                        scrollOption={scrollableProps}
                        table={table}
                    />
                </div>

                {exportActionProps && !hideExportButton && (
                    <>
                        <Separator
                            className="h-full min-h-7"
                            orientation="vertical"
                        />
                        <DataTableExport table={table} {...exportActionProps} />
                    </>
                )}
                {createActionProps && !hideCreateButton && (
                    <DataTableCreateAction {...createActionProps} />
                )}
                {otherActionRight}
            </div>
        </div>
    )
}

export default DataTableToolbar
