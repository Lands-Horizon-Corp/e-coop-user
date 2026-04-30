import { Calendar } from '@e-coop-monorepo/ui/core'
import type { DateRange } from 'react-day-picker'

import type { CaptionLayout } from './date-time-picker'

type DateRangePickerProps = {
    value: DateRange | undefined
    modal?: boolean
    captionLayout?: CaptionLayout
    disabled?: boolean
    onChange: (range: DateRange | undefined) => void
}

const DateRangePicker = ({
    value,
    onChange,
    disabled,
    ...other
}: DateRangePickerProps) => {
    return (
        <Calendar
            {...other}
            disabled={disabled}
            mode="range"
            onSelect={onChange}
            required
            selected={value}
            showOutsideDays
        />
    )
}

export default DateRangePicker
