import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { Button } from '@e-coop-monorepo/ui/core'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@e-coop-monorepo/ui/core'
import { format } from 'date-fns'

import { CalendarIcon } from '../icons/index'
import type { CaptionLayout} from './date-time-picker';
import { DateTimePicker } from './date-time-picker'

type InputDatePickerProps = {
    id?: string
    fromYear?: number
    toYear?: number
    className?: string
    value: Date | undefined
    captionLayout?: CaptionLayout
    disabled?: (date: Date) => boolean
    onChange: (date: Date | undefined) => void
}

const InputDatePicker = ({
    id,
    value,
    onChange,
    disabled,
    fromYear = 1900,
    toYear = new Date().getFullYear(),
    ...other
}: InputDatePickerProps) => {
    return (
        <Popover modal>
            <PopoverTrigger>
                <Button
                    className={cn(
                        'w-full pl-3 text-left font-normal',
                        !value && 'text-muted-foreground'
                    )}
                    id={id}
                    variant={'outline'}
                >
                    {value ? format(value, 'PPP') : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="w-auto rounded-2xl bg-popover/85 p-0 backdrop-blur"
            >
                <DateTimePicker
                    {...other}
                    disabled={disabled}
                    fromYear={fromYear}
                    onChange={onChange}
                    toYear={toYear}
                    value={value}
                />
            </PopoverContent>
        </Popover>
    )
}

export default InputDatePicker
