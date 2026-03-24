import { forwardRef } from 'react'

import { withToastCallbacks } from '@/helpers/callback-helper'
import { toReadableDate } from '@/helpers/date-utils'
import { formatNumber } from '@/helpers/number-utils'
import {
    IMemberIncome,
    IMemberProfile,
    useDeleteMemberProfileIncome,
} from '@/modules/member-profile'
import useConfirmModalStore from '@/store/confirm-modal-store'

import {
    CalendarDotsIcon,
    MoneyIcon,
    PencilFillIcon,
    PlusIcon,
    TrashIcon,
} from '@/components/icons'
import ImageDisplay from '@/components/image-display'
import LoadingSpinner from '@/components/spinners/loading-spinner'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { useModalState } from '@/hooks/use-modal-state'

import { MemberIncomeCreateUpdateFormModal } from '../../forms/member-income-create-update-form'
import EmptyListIndicator from '../empty-list-indicator'

const MemberIncomeCard = ({ income }: { income: IMemberIncome }) => {
    const modalState = useModalState()
    const { onOpen } = useConfirmModalStore()

    const { mutate: deleteIncome, isPending: isDeleting } =
        useDeleteMemberProfileIncome({
            options: {
                ...withToastCallbacks(),
            },
        })

    return (
        <div className="flex flex-col gap-y-1 rounded-xl border bg-background p-4">
            <MemberIncomeCreateUpdateFormModal
                description="Modify / Update this income information."
                formProps={{
                    incomeId: income.id,
                    memberProfileId: income.member_profile_id,
                    defaultValues: income,
                }}
                {...modalState}
                title="Update Income"
            />
            <div className="flex justify-between">
                <p className="font-bold">{income.name}</p>
                <div className="flex items-center justify-end">
                    <Button
                        className="!size-fit px-1.5 py-1.5 text-muted-foreground/40"
                        disabled={isDeleting}
                        onClick={() => modalState.onOpenChange(true)}
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
                                title: 'Delete Income',
                                description:
                                    'Are you sure to delete this income?',
                                onConfirm: () =>
                                    deleteIncome({
                                        memberProfileId:
                                            income.member_profile_id,
                                        incomeId: income.id,
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

            <ImageDisplay
                className="mb-4 h-[150px] w-full rounded-lg"
                src={income.media_url}
            />

            <div className="space-y-2 text-sm">
                <div>
                    <MoneyIcon className="mr-2 inline size-5 text-muted-foreground/70" />
                    <span className="font-semibold text-muted-foreground/70">
                        Amount:{' '}
                    </span>
                    {formatNumber(income.amount)}
                </div>

                <div>
                    <CalendarDotsIcon className="mr-2 inline size-5 text-muted-foreground/70" />
                    <span className="font-semibold text-muted-foreground/70">
                        Release Date:
                    </span>{' '}
                    {income.release_date
                        ? toReadableDate(income.release_date)
                        : 'no release date'}
                </div>
            </div>
        </div>
    )
}

interface Props {
    memberProfile: IMemberProfile
}

const MemberIncome = forwardRef<HTMLDivElement, Props>(
    ({ memberProfile }, ref) => {
        const createModal = useModalState()

        return (
            <div className="space-y-4" ref={ref}>
                <MemberIncomeCreateUpdateFormModal
                    description="Add new income information."
                    formProps={{
                        memberProfileId: memberProfile.id,
                        defaultValues: {},
                    }}
                    {...createModal}
                    title="Create Income"
                />

                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-medium">Income</p>
                        <p className="text-sm text-muted-foreground">
                            Update member's income information
                        </p>
                    </div>

                    <Button
                        onClick={() => createModal.onOpenChange(true)}
                        size="sm"
                    >
                        Add Income <PlusIcon className="ml-1" />
                    </Button>
                </div>

                <div className="space-y-4 p-4 bg-popover rounded-xl min-h-[500px]">
                    <div className="grid grid-cols-3 gap-4">
                        {memberProfile.member_incomes?.map((income) => (
                            <MemberIncomeCard income={income} key={income.id} />
                        ))}

                        {(!memberProfile.member_incomes ||
                            memberProfile.member_incomes.length === 0) && (
                            <EmptyListIndicator
                                className="col-span-3"
                                message="No income yet"
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
)

export default MemberIncome
