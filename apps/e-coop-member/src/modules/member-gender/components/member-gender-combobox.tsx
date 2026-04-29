import * as React from 'react'

import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { TEntityId } from '@e-coop-monorepo/shared/types'
import { ChevronDownIcon } from '@e-coop-monorepo/ui/core'
import LoadingSpinner from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@e-coop-monorepo/ui/core'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@e-coop-monorepo/ui/core'
import { Check } from 'lucide-react'

import {
    TMemberGenderHookMode,
    useGetAllMemberGender,
} from '../member-gender.service'
import { IMemberGender } from '../member-gender.types'

// import {
//     IMemberGenderFormProps,
//     // MemberGenderCreateUpdateFormModal,
// } from './member-gender-create-update-form'

// export interface IMemberGenderComboboxCreateProps extends Pick<
//     IMemberGenderFormProps,
//     'defaultValues' | 'disabledFields' | 'hiddenFields'
// > {}

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange'
> {
    mode?: TMemberGenderHookMode
    value?: TEntityId
    disabled?: boolean
    className?: string
    placeholder?: string
    // memberGenderComboboxCreateProps?: IMemberGenderComboboxCreateProps
    onChange?: (selected: IMemberGender) => void
}

type FinalProps = Props &
    (
        | { mode?: Exclude<TMemberGenderHookMode, 'branch-id'> }
        | {
              mode?: Exclude<TMemberGenderHookMode, 'current'>
              branchId: TEntityId
          }
    )

const MemberGenderCombobox = React.forwardRef<
    HTMLButtonElement,
    FinalProps & { branchId?: TEntityId }
>(
    (
        {
            mode = 'current',
            branchId,
            value,
            className,
            disabled = false,
            // memberGenderComboboxCreateProps,
            placeholder = 'Select Member Gender...',
            onChange,
            ...other
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false)
        // const [createModal, setCreateModal] = React.useState(false)

        const { data, isLoading } = useGetAllMemberGender({
            mode,
            branchId,
            options: {
                enabled: !disabled,
            },
        })

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
                            data?.find((option) => option.id === value)?.name
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
                            placeholder="Search Member Gender..."
                        />
                        {isLoading ? (
                            <CommandEmpty>
                                <LoadingSpinner className="mr-2 inline-block" />{' '}
                                Loading...
                            </CommandEmpty>
                        ) : (
                            <CommandList className="ecoop-scroll">
                                <CommandEmpty>
                                    No Member Gender found.
                                </CommandEmpty>
                                {/* {memberGenderComboboxCreateProps && (
                                        <>
                                            <CommandGroup>
                                                <CommandItem
                                                    onClick={() => {}}
                                                    onSelect={() => {
                                                        setCreateModal(true)
                                                    }}
                                                >
                                                    <PlusIcon /> Create new
                                                    gender
                                                </CommandItem>
                                            </CommandGroup>
                                            <CommandSeparator />
                                        </>
                                    )} */}
                                <CommandGroup>
                                    {data?.map((option) => (
                                        <CommandItem
                                            key={option.id}
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
                                                    value === option.id
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        )
    }
)

MemberGenderCombobox.displayName = 'MemberGenderCombobox'

export default MemberGenderCombobox
