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

export interface IMemberClassification {
    id: string
    name: string
    description?: string
}

export const mockMemberClassifications: IMemberClassification[] = [
    {
        id: 'regular',
        name: 'Regular Member',
        description: 'Active and verified member',
    },
    {
        id: 'associate',
        name: 'Associate Member',
        description: 'Partial membership privileges',
    },
    {
        id: 'affiliate',
        name: 'Affiliate Member',
        description: 'Partner or indirect member',
    },
    {
        id: 'probationary',
        name: 'Probationary Member',
        description: 'Under initial review period',
    },
]

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange' | 'value'
> {
    value?: IMemberClassification
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    onChange?: (selected: IMemberClassification | undefined) => void
}

const MemberClassificationCombobox = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            placeholder = 'Select Classification...',
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
                            mockMemberClassifications.find(
                                (c) => c.id === value.id
                            )?.name
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
                            placeholder="Search Classification..."
                        />
                        <CommandList className="ecoop-scroll">
                            <CommandEmpty>
                                No classification found.
                            </CommandEmpty>

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

                                {mockMemberClassifications.map(
                                    (classification) => (
                                        <CommandItem
                                            key={classification.id}
                                            onSelect={() => {
                                                setOpen(false)
                                                onChange?.(classification)
                                            }}
                                            value={classification.name}
                                        >
                                            {classification.name}
                                            <Check
                                                className={cn(
                                                    'ml-auto',
                                                    value?.id ===
                                                        classification.id
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                        </CommandItem>
                                    )
                                )}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    }
)

MemberClassificationCombobox.displayName = 'MemberClassificationCombobox'
export default MemberClassificationCombobox
