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

import { IGovernmentId } from '../../member-profile.types'

// Mock Government ID data
export const mockGovernmentIds: IGovernmentId[] = [
    {
        name: 'Passport',
        has_expiry_date: true,
        field_name: 'passport_number',
        has_number: true,
        regex: '^[A-Z0-9]{6,9}$',
    },
    {
        name: "Driver's License",
        has_expiry_date: true,
        field_name: 'drivers_license_number',
        has_number: true,
        regex: '^[A-Z0-9]{5,10}$',
    },
    {
        name: 'SSS ID',
        has_expiry_date: false,
        field_name: 'sss_number',
        has_number: true,
        regex: '^\\d{10}$',
    },
    {
        name: 'PhilHealth ID',
        has_expiry_date: false,
        field_name: 'philhealth_number',
        has_number: true,
        regex: '^\\d{12}$',
    },
    {
        name: 'TIN',
        has_expiry_date: false,
        field_name: 'tin_number',
        has_number: true,
        regex: '^\\d{9}$',
    },
]

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange'
> {
    value?: string
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    isoAlpha3: string
    onChange?: (selected: IGovernmentId | undefined) => void
}

const GovernmentIdCombobox = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            placeholder = 'Select Government ID...',
            onChange,
            ...other
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false)

        const data = mockGovernmentIds
        const isLoading = false // no async fetching

        return (
            <Popover modal onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        {...other}
                        aria-expanded={open}
                        className={cn('w-full justify-between px-3', className)}
                        disabled={disabled || isLoading}
                        ref={ref}
                        role="combobox"
                        variant="outline"
                    >
                        {value ? (
                            data.find((option) => option.name === value)?.name
                        ) : (
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
                            placeholder="Search Government ID..."
                        />
                        <CommandList className="ecoop-scroll">
                            <CommandEmpty>No Government ID found.</CommandEmpty>
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
                                {data.map((option) => (
                                    <CommandItem
                                        key={option.name}
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(option)
                                        }}
                                        value={option.name}
                                    >
                                        {option.name}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === option.name
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

GovernmentIdCombobox.displayName = 'GovernmentIdCombobox'

export default GovernmentIdCombobox
