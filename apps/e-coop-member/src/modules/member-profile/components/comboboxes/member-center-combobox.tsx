import * as React from 'react'

import { cn } from '@e-coop-monorepo/shared/helpers'
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
import { Check } from 'lucide-react'

// -----------------------------------------------------
// Interfaces & Mock Data
// -----------------------------------------------------
export interface IMemberCenter {
    id: string
    name: string
    description?: string
}

export const mockMemberCenters: IMemberCenter[] = [
    { id: 'center_1', name: 'Center 1', description: 'Main community center' },
    {
        id: 'center_2',
        name: 'Center 2',
        description: 'Secondary outreach center',
    },
    {
        id: 'center_3',
        name: 'Center 3',
        description: 'Downtown district center',
    },
    {
        id: 'center_4',
        name: 'Center 4',
        description: 'Uptown satellite center',
    },
]

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange' | 'value'
> {
    value?: IMemberCenter
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    onChange?: (selected: IMemberCenter | undefined) => void
}

const MemberCenterCombobox = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            placeholder = 'Select Center...',
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
                        {value ? (
                            mockMemberCenters.find((c) => c.id === value.id)
                                ?.name
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
                            placeholder="Search Center..."
                        />
                        <CommandList className="ecoop-scroll">
                            <CommandEmpty>No center found.</CommandEmpty>

                            <CommandGroup>
                                {undefinable && (
                                    <CommandItem
                                        className="justify-center text-muted-foreground"
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(undefined)
                                        }}
                                        value="none"
                                    >
                                        Select None
                                    </CommandItem>
                                )}

                                {mockMemberCenters.map((center) => (
                                    <CommandItem
                                        key={center.id}
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(center)
                                        }}
                                        value={center.name}
                                    >
                                        {center.name}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value?.id === center.id
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

MemberCenterCombobox.displayName = 'MemberCenterCombobox'
export default MemberCenterCombobox
