import { toReadableDate } from '@e-coop-monorepo/shared/helpers'
import { TimePicker } from '@e-coop-monorepo/ui/core'
import { ClockIcon } from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@e-coop-monorepo/ui/core'

interface Props {
    date: Date
    onChange: (newDate: Date) => void
}

const DateTimeSetter = ({ date, onChange }: Props) => {
    return (
        <Popover modal>
            <PopoverTrigger>
                <Button className="w-full" variant="outline">
                    {toReadableDate(date, 'hh:mm a')}
                    <ClockIcon className="ml-auto" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit rounded-xl">
                <div className="grid gap-4">
                    <TimePicker date={date} onChange={onChange} />
                </div>
            </PopoverContent>
        </Popover>
    )
}

export { DateTimeSetter }
