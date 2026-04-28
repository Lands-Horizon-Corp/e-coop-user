import { useMemo } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import qs from 'query-string'

import {
    MemberOccupationAPI,
    useGetPaginated,
} from '@e-coop-monorepo/modules/member-occupation'
import { IMemberOccupation } from '@e-coop-monorepo/modules/member-occupation'
import FilterContext from '@e-coop-monorepo/shared/contexts'
import useDatableFilterState from '@e-coop-monorepo/shared/hooks'
import { usePagination } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import DataTable from '@e-coop-monorepo/ui'
import DataTablePagination from '@e-coop-monorepo/ui'
import DataTableToolbar, { IDataTableToolbarProps } from '@e-coop-monorepo/ui'
import { TableRowActionStoreProvider } from '@e-coop-monorepo/ui'
import { TableProps } from '@e-coop-monorepo/ui'
import { useDataTableSorting } from '@e-coop-monorepo/ui'
import useDataTableState, { useResolvedColumnOrder } from '@e-coop-monorepo/ui'
import {
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import memberOccupationColumns, {
    IMemberOccupationTableColumnProps,
    memberOccupationGlobalSearchTargets,
} from './columns'
import MemberOccupationAction, {
    MemberOccupationRowContext,
    MemberOccupationTableActionManager,
} from './row-action-context'

export interface MemberOccupationTableProps
    extends TableProps<IMemberOccupation>, IMemberOccupationTableColumnProps {
    toolbarProps?: Omit<
        IDataTableToolbarProps<IMemberOccupation>,
        | 'table'
        | 'refreshActionProps'
        | 'globalSearchProps'
        | 'scrollableProps'
        | 'filterLogicProps'
        | 'exportActionProps'
        | 'deleteActionProps'
    >
}

const MemberOccupationTable = ({
    persistKey = ['member-occupation'],
    className,
    toolbarProps,
    defaultFilter,
    onSelectData,
    onRowClick,
    onDoubleClick = (row) => {
        row.toggleSelected()
    },
    actionComponent = MemberOccupationAction,
    RowContextComponent = MemberOccupationRowContext,
}: MemberOccupationTableProps) => {
    const queryClient = useQueryClient()
    const { pagination, setPagination } = usePagination()
    const { sortingStateBase64, tableSorting, setTableSorting } =
        useDataTableSorting()

    const columns = useMemo(
        () => memberOccupationColumns({ actionComponent }),
        [actionComponent]
    )

    const { resolvedColumnOrder, resolvedColumnVisibility, finalKeys } =
        useResolvedColumnOrder({
            columns,
            persistKey,
        })

    const {
        getRowIdFn,
        columnOrder,
        setColumnOrder,
        isScrollable,
        setIsScrollable,
        columnVisibility,
        setColumnVisibility,
        rowSelectionState,
        createHandleRowSelectionChange,
    } = useDataTableState<IMemberOccupation>({
        key: finalKeys,
        defaultColumnOrder: resolvedColumnOrder,
        defaultColumnVisibility: resolvedColumnVisibility,
        onSelectData,
    })

    const filterState = useDatableFilterState({
        defaultFilter,
        onFilterChange: () => setPagination({ ...pagination, pageIndex: 0 }),
    })

    const {
        isPending,
        isRefetching,
        data: { data = [], totalPage = 1, pageSize = 10, totalSize = 0 } = {},
        refetch,
    } = useGetPaginated({
        query: {
            ...pagination,
            sort: sortingStateBase64,
            filter: filterState.finalFilterPayloadBase64,
        },
    })

    const handleRowSelectionChange = createHandleRowSelectionChange(data)

    const table = useReactTable({
        columns,
        data,
        initialState: {
            columnPinning: { left: ['select'] },
        },
        state: {
            sorting: tableSorting,
            pagination,
            columnOrder,
            rowSelection: rowSelectionState.rowSelection,
            columnVisibility,
        },
        rowCount: pageSize,
        manualSorting: true,
        pageCount: totalPage,
        enableMultiSort: false,
        manualFiltering: true,
        manualPagination: true,
        columnResizeMode: 'onChange',
        getRowId: getRowIdFn,
        onSortingChange: setTableSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        onColumnOrderChange: setColumnOrder,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: handleRowSelectionChange,
    })

    const exportfilter = qs.stringify(
        {
            ...pagination,
            sort: sortingStateBase64,
            filter: filterState.finalFilterPayloadBase64,
        },
        { skipNull: true }
    )
    return (
        <FilterContext.Provider value={filterState}>
            <TableRowActionStoreProvider>
                <div
                    className={cn(
                        'flex h-full flex-col gap-y-2',
                        className,
                        !isScrollable && 'h-fit !max-h-none'
                    )}
                >
                    <DataTableToolbar
                        deleteActionProps={{
                            onDeleteSuccess: () =>
                                queryClient.invalidateQueries({
                                    queryKey: [
                                        'member-occupation',
                                        'paginated',
                                    ],
                                }),
                            onDelete: (selectedData) =>
                                MemberOccupationAPI.deleteMany({
                                    ids: selectedData.map((item) => item.id),
                                }),
                        }}
                        exportActionProps={{
                            isLoading: isPending,
                            filters: exportfilter,
                            model: 'MemberOccupation',
                            url: 'api/v1/member-occupation/search',
                        }}
                        filterLogicProps={{
                            filterLogic: filterState.filterLogic,
                            setFilterLogic: filterState.setFilterLogic,
                        }}
                        globalSearchProps={{
                            defaultMode: 'contains',
                            targets: memberOccupationGlobalSearchTargets,
                        }}
                        refreshActionProps={{
                            onClick: () => refetch(),
                            isLoading: isPending || isRefetching,
                        }}
                        scrollableProps={{ isScrollable, setIsScrollable }}
                        table={table}
                        {...toolbarProps}
                    />
                    <DataTable
                        className="mb-2"
                        isScrollable={isScrollable}
                        isStickyFooter
                        isStickyHeader
                        onDoubleClick={onDoubleClick}
                        onRowClick={onRowClick}
                        RowContextComponent={RowContextComponent}
                        setColumnOrder={setColumnOrder}
                        table={table}
                    />
                    <DataTablePagination table={table} totalSize={totalSize} />
                    <MemberOccupationTableActionManager />
                </div>
            </TableRowActionStoreProvider>
        </FilterContext.Provider>
    )
}

export default MemberOccupationTable
