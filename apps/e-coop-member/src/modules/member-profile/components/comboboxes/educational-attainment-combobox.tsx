import * as React from 'react'

import { cn } from '@/helpers/tw-utils'
import { Check } from 'lucide-react'

import { ChevronDownIcon } from '@e-coop-monorepo/ui/components/icons'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@e-coop-monorepo/ui/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@e-coop-monorepo/ui/components/ui/popover'

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange'
> {
    value?: (typeof EDUCATIONAL_ATTAINMENT)[number]
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    onChange?: (
        selected: (typeof EDUCATIONAL_ATTAINMENT)[number] | undefined
    ) => void
}

export const EDUCATIONAL_ATTAINMENT = [
    'elementary (incomplete)',
    'elementary graduate',
    'high school (incomplete)',
    'high school graduate',
    'senior high school (incomplete)',
    'senior high school graduate',
    'vocational / technical',
    'college (incomplete)',
    'college graduate',
    "master's (incomplete)",
    "master's graduate",
    'doctorate (incomplete)',
    'doctorate graduate',
    'others',
] as const

const EducationalAttainmentCombobox = React.forwardRef<
    HTMLButtonElement,
    Props
>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            placeholder = 'Select Educational Attainment...',
            onChange,
            ...other
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false)

        return (
            <Popover modal onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        {...other}
                        aria-expanded={open}
                        className={cn('w-full justify-between px-3', className)}
                        disabled={disabled}
                        ref={ref}
                        role="combobox"
                        variant="outline"
                    >
                        {value ?? (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                        <ChevronDownIcon className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput
                            className="h-9"
                            placeholder="Search Educational Attainment..."
                        />
                        <CommandList className="ecoop-scroll">
                            <CommandEmpty>No options found.</CommandEmpty>
                            <CommandGroup>
                                {undefinable && (
                                    <CommandItem
                                        className="justify-center text-muted-foreground"
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(undefined)
                                        }}
                                        value={undefined}
                                    >
                                        Select None
                                    </CommandItem>
                                )}
                                {EDUCATIONAL_ATTAINMENT.map((option) => (
                                    <CommandItem
                                        key={option}
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(option)
                                        }}
                                        value={option}
                                    >
                                        {option}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === option
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    }
)

EducationalAttainmentCombobox.displayName = 'EducationalAttainmentCombobox'

export default EducationalAttainmentCombobox
