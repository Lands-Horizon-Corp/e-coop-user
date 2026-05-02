import type { TColumnDataTypes, TFinalFilter } from '@ecoop/shared/contexts'
import { filterModeMap } from '@ecoop/shared/contexts'
import type { IColumnReportFilter } from '@ecoop/shared/helpers'
import { DateRangePicker } from '@ecoop/ui/core'
import { TrashIcon } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import { DebouncedInput } from '@ecoop/ui/core'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@ecoop/ui/core'
import type { DateRange } from 'react-day-picker'

interface FilterRuleProps {
    filter: TFinalFilter
    columns: IColumnReportFilter[]
    onRemove: () => void
    onUpdate: (updatedFilter: TFinalFilter) => void
    onAddRule?: () => void
    isLast?: boolean
}

export function FilterRule({
    filter,
    columns,
    onRemove,
    onUpdate,
}: FilterRuleProps) {
    const modes =
        filterModeMap[
            filter.dataType as Exclude<TColumnDataTypes, 'boolean'>
        ] || []

    const requiresValue =
        filter.mode !== 'isempty' && filter.mode !== 'isnotempty'

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <div className="flex  items-center gap-2">
                <Select
                    onValueChange={(value) => {
                        if (!value) return

                        const column = columns.find((c) => c.field === value)
                        if (column) {
                            onUpdate({
                                ...filter,
                                field: value,
                                dataType: column.dataType,
                            })
                        }
                    }}
                    value={filter.field}
                >
                    <SelectTrigger className="flex-1 min-w-[150px] max-w-[150px]">
                        <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                        {columns.map((col) => (
                            <SelectItem key={col.field} value={col.field}>
                                {col.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value) => {
                        onUpdate({
                            ...filter,
                            mode: value as TFinalFilter['mode'],
                            value: undefined,
                        })
                    }}
                    value={filter.mode}
                >
                    <SelectTrigger className="flex-1 min-w-[140px] max-w-[140px]">
                        <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                        {modes.map((mode) => (
                            <SelectItem key={mode.value} value={mode.value}>
                                {mode.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {requiresValue && (
                    <>
                        {filter.dataType === 'date' &&
                        filter.mode === 'range' ? (
                            <DateRangePicker
                                className="flex-1 w-fit"
                                onChange={(range) => {
                                    onUpdate({
                                        ...filter,
                                        value: range,
                                    })
                                }}
                                value={
                                    filter.value &&
                                    typeof filter.value === 'object'
                                        ? (filter.value as DateRange)
                                        : undefined
                                }
                            />
                        ) : filter.dataType === 'date' ? (
                            <DebouncedInput
                                className="flex-1 min-w-[150px] max-w-[150px]"
                                onChange={(e) => {
                                    onUpdate({
                                        ...filter,
                                        value: e ? new Date(e) : undefined,
                                    })
                                }}
                                placeholder="Value"
                                type="date"
                                value={
                                    filter.value instanceof Date
                                        ? filter.value
                                              .toISOString()
                                              .split('T')[0]
                                        : (filter.value as string) || ''
                                }
                            />
                        ) : (
                            <>
                                <DebouncedInput
                                    className="flex-1 max-w-[150px] min-w-[150px]"
                                    debounceTime={200}
                                    onChange={(e) => {
                                        onUpdate({
                                            ...filter,
                                            value:
                                                filter.dataType === 'number'
                                                    ? parseFloat(e)
                                                    : e,
                                        })
                                    }}
                                    placeholder="Value"
                                    type={
                                        filter.dataType === 'number'
                                            ? 'number'
                                            : 'text'
                                    }
                                    value={(filter.value as string) || ''}
                                />

                                {filter.mode === 'range' &&
                                    filter.dataType === 'number' && (
                                        <DebouncedInput
                                            className="flex-1 min-w-[150px] max-w-[150px]"
                                            debounceTime={200}
                                            onChange={(e) => {
                                                onUpdate({
                                                    ...filter,
                                                    value: {
                                                        from: (
                                                            filter.value as {
                                                                from?:
                                                                    | string
                                                                    | number
                                                            }
                                                        )?.from,
                                                        to: e,
                                                    },
                                                })
                                            }}
                                            placeholder="To"
                                            type="number"
                                            value={
                                                (
                                                    filter.value as {
                                                        to?: string | number
                                                    }
                                                )?.to || ''
                                            }
                                        />
                                    )}
                            </>
                        )}
                    </>
                )}
            </div>

            <div className="flex items-center gap-1 ml-auto">
                <Button
                    className="text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                        e.preventDefault()
                        onRemove?.()
                    }}
                    size="xs"
                    variant="ghost"
                >
                    <TrashIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
