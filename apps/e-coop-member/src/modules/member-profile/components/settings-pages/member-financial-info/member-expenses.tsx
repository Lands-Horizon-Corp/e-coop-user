import { forwardRef, useState } from 'react'

import type {
    IMemberExpense,
    IMemberProfile} from '@e-coop-monorepo/modules/member-profile';
import {
    useDeleteMemberProfileExpense,
} from '@e-coop-monorepo/modules/member-profile'
import { withToastCallbacks } from '@e-coop-monorepo/shared/helpers'
import { toReadableDate } from '@e-coop-monorepo/shared/helpers'
import { formatNumber } from '@e-coop-monorepo/shared/helpers'
import { useModalState } from '@e-coop-monorepo/shared/hooks'
import useConfirmModalStore from '@e-coop-monorepo/shared/store'
import {
    CalendarDotsIcon,
    MoneyIcon,
    PencilFillIcon,
    PlusIcon,
    TrashIcon,
    WoodSignsIcon,
} from '@e-coop-monorepo/ui/core'
import LoadingSpinner from '@e-coop-monorepo/ui/core'
import TextRenderer from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import { Separator } from '@e-coop-monorepo/ui/core'

import { MemberExpenseCreateUpdateFormModal } from '../../forms/member-expense-create-update-form'
import EmptyListIndicator from '../empty-list-indicator'

const MemberExpenseCard = ({ expense }: { expense: IMemberExpense }) => {
    const [edit, setEdit] = useState(false)
    const { onOpen } = useConfirmModalStore()
    const { mutate: deleteExpense, isPending: isDeleting } =
        useDeleteMemberProfileExpense({
            options: {
                ...withToastCallbacks({ textSuccess: 'Deleted' }),
            },
        })

    return (
        <div className="flex flex-col gap-y-1 rounded-xl border bg-background p-4">
            <MemberExpenseCreateUpdateFormModal
                description="Modify / Update this expense information."
                formProps={{
                    expenseId: expense.id,
                    memberProfileId: expense.member_profile_id,
                    defaultValues: expense,
                }}
                onOpenChange={setEdit}
                open={edit}
                title="Update Expense"
            />
            <div className="flex justify-between">
                <p className="font-bold">{expense.name}</p>
                <div className="flex items-center justify-end">
                    <Button
                        className="!size-fit px-1.5 py-1.5 text-muted-foreground/40"
                        disabled={isDeleting}
                        onClick={() => setEdit(true)}
                        size="icon"
                        variant="ghost"
                    >
                        <PencilFillIcon className="size-4" />
                    </Button>
                    <Button
                        className="!size-fit px-1.5 py-1.5 text-muted-foreground/40"
                        disabled={isDeleting}
                        hoverVariant="destructive"
                        onClick={() =>
                            onOpen({
                                title: 'Delete Expense',
                                description:
                                    'Are you sure to delete this expense?',
                                onConfirm: () =>
                                    deleteExpense({
                                        memberProfileId:
                                            expense.member_profile_id,
                                        expenseId: expense.id,
                                    }),
                            })
                        }
                        size="icon"
                        variant="ghost"
                    >
                        {isDeleting ? (
                            <LoadingSpinner />
                        ) : (
                            <TrashIcon className="size-4" />
                        )}
                    </Button>
                </div>
            </div>
            <Separator className="!my-2" />
            <div className="space-y-2 text-sm">
                <div>
                    <MoneyIcon className="mr-2 inline size-5 text-muted-foreground/70" />
                    <span className="font-semibold text-muted-foreground/70">
                        Amount:{' '}
                    </span>
                    {formatNumber(expense.amount)}
                </div>
                <div>
                    <CalendarDotsIcon className="mr-2 inline size-5 text-muted-foreground/70" />
                    <span className="font-semibold text-muted-foreground/70">
                        Date:
                    </span>{' '}
                    {expense.created_at
                        ? toReadableDate(expense.created_at)
                        : 'no date'}
                </div>
                <div className="!mt-5 space-y-2">
                    <p className="text-muted-foreground/70">Description</p>
                    {expense?.description ? (
                        <TextRenderer
                            content={expense.description ?? 'no description'}
                        />
                    ) : (
                        <p className="text-sm italic text-muted-foreground/60">
                            No Description{' '}
                            <WoodSignsIcon className="ml-1 inline" />
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

interface Props {
    memberProfile: IMemberProfile
}

const MemberExpenses = forwardRef<HTMLDivElement, Props>(
    ({ memberProfile }, ref) => {
        const modalState = useModalState(false)

        return (
            <div className="space-y-4" ref={ref}>
                <MemberExpenseCreateUpdateFormModal
                    description="Add new expense information."
                    formProps={{
                        memberProfileId: memberProfile.id,
                        defaultValues: {
                            member_profile_id: memberProfile.id,
                        },
                    }}
                    {...modalState}
                    title="Create Expense"
                />
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-medium">Expenses</p>
                        <p className="text-sm text-muted-foreground">
                            Update member's expense information
                        </p>
                    </div>
                    <Button
                        onClick={() => modalState.onOpenChange(true)}
                        size="sm"
                    >
                        Add Expense <PlusIcon className="ml-1" />
                    </Button>
                </div>

                <div className="space-y-4 p-4 bg-popover rounded-xl min-h-[500px]">
                    {memberProfile.member_expenses?.map((expense) => (
                        <MemberExpenseCard expense={expense} key={expense.id} />
                    ))}

                    {(!memberProfile.member_expenses ||
                        memberProfile.member_expenses.length === 0) && (
                        <EmptyListIndicator message="No expenses yet" />
                    )}
                </div>
            </div>
        )
    }
)

export default MemberExpenses
