import { TModelName } from '@e-coop-monorepo/modules/generated-report'
import { GeneratedReportCreateFormModal } from '@e-coop-monorepo/modules/generated-report'
import { TFinalFilter } from '@e-coop-monorepo/shared/contexts'
import { toReadableDate } from '@e-coop-monorepo/shared/helpers'
import { useModalState } from '@e-coop-monorepo/shared/hooks'
import { ReportsIcon } from '@e-coop-monorepo/ui/core'
import { LoadingSpinner } from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import {
    GenerateReportFilterContext,
    useDataGenerateReportFilter,
} from '@e-coop-monorepo/ui/core'
import { Table } from '@tanstack/react-table'
import { useHotkeys } from 'react-hotkeys-hook'

export interface IDataTableExportProps<TData> {
    table: Table<TData>
    disabled?: boolean
    isLoading?: boolean
    hbsDataPath?: string
    dataKey?: string

    filters: string
    url: string
    model?: TModelName
    dataTable?: TData
}

const DataTableExport = <TData,>({
    filters,
    url,
    model,
    disabled = false,
    isLoading = false,
    hbsDataPath,
    table,
}: IDataTableExportProps<TData>) => {
    const modalState = useModalState(false)

    const fieldName = table.getAllColumns()[1].id

    const defaultFilter: TFinalFilter = {
        field: fieldName || '',
        mode: 'contains',
        dataType: 'text',
        value: '',
    }
    const filterState = useDataGenerateReportFilter({
        defaultFilter: defaultFilter,
    })

    useHotkeys(
        'ctrl + G',
        (e) => {
            e.preventDefault()
            modalState.onOpenChange(true)
        },
        {
            keydown: true,
        }
    )

    return (
        <GenerateReportFilterContext.Provider value={filterState}>
            <>
                <GeneratedReportCreateFormModal
                    // open
                    formProps={{
                        disabledFields: ['url'],
                        reportPath: hbsDataPath,
                        table: table,
                        columns: table
                            .getAllColumns()
                            .map((col) => col.columnDef),
                        defaultValues: {
                            filter_search: filters,
                            name: `${model}'s-report-${toReadableDate(
                                new Date(),
                                'MM-dd-yyyy'
                            )}`.toLowerCase(),
                            description: `${model} ${new Date()}`,
                            url,
                            model,
                        },
                    }}
                    {...modalState}
                />
                <Button
                    className="gap-x-1 rounded-md"
                    disabled={disabled || isLoading}
                    onClick={() => {
                        modalState.onOpenChange(true)
                    }}
                    size="sm"
                    variant={'secondary'}
                >
                    <ReportsIcon className="mr-1 size-4" />
                    {isLoading ? <LoadingSpinner /> : 'Generate'}
                </Button>
            </>
        </GenerateReportFilterContext.Provider>
    )
}

export { DataTableExport }
