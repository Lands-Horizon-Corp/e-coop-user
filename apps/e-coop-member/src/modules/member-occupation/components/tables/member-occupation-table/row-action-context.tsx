import type { ReactNode } from 'react'

import { useDeleteById } from '@ecoop/modules/member-occupation'
import type { IMemberOccupation } from '@ecoop/modules/member-occupation'
import useConfirmModalStore from '@ecoop/shared/store'
import RowActionsGroup from '@ecoop/ui/core'
import DataTableRowContext from '@ecoop/ui/core'
import { useTableRowActionStore } from '@ecoop/ui/core'
import type { Row } from '@tanstack/react-table'

import { MemberOccupationCreateUpdateFormModal } from '../../member-occupation-create-update-form'
import type { IMemberOccupationTableActionComponentProp } from './columns'

export type MemberOccupationActionType = 'edit' | 'delete'

export type MemberOccupationActionExtra = Record<string, never>

interface UseMemberOccupationActionsProps {
    row: Row<IMemberOccupation>
    onDeleteSuccess?: () => void
}

const useMemberOccupationActions = ({
    row,
    onDeleteSuccess,
}: UseMemberOccupationActionsProps) => {
    const memberOccupation = row.original
    const { open } = useTableRowActionStore<
        IMemberOccupation,
        MemberOccupationActionType,
        MemberOccupationActionExtra
    >()

    const { onOpen } = useConfirmModalStore()

    const {
        isPending: isDeletingMemberOccupation,
        mutate: deleteMemberOccupation,
    } = useDeleteById({
        options: {
            onSuccess: onDeleteSuccess,
        },
    })

    const handleEdit = () => {
        open('edit', {
            id: memberOccupation.id,
            defaultValues: memberOccupation,
        })
    }

    const handleDelete = () => {
        onOpen({
            title: 'Delete Member Occupation',
            description:
                'Are you sure you want to delete this member occupation?',
            onConfirm: () => deleteMemberOccupation(memberOccupation.id),
        })
    }

    return {
        memberOccupation,
        isDeletingMemberOccupation,
        handleEdit,
        handleDelete,
    }
}

interface IMemberOccupationTableActionProps extends IMemberOccupationTableActionComponentProp {
    onMemberOccupationUpdate?: () => void
    onDeleteSuccess?: () => void
}

export const MemberOccupationAction = ({
    row,
    onDeleteSuccess,
}: IMemberOccupationTableActionProps) => {
    const { isDeletingMemberOccupation, handleEdit, handleDelete } =
        useMemberOccupationActions({ row, onDeleteSuccess })

    return (
        <>
            <div onClick={(e) => e.stopPropagation()}></div>
            <RowActionsGroup
                canSelect
                onDelete={{
                    text: 'Delete',
                    isAllowed: !isDeletingMemberOccupation,
                    onClick: handleDelete,
                }}
                onEdit={{
                    text: 'Edit',
                    isAllowed: true,
                    onClick: handleEdit,
                }}
                otherActions={<>{/* Additional actions can be added here */}</>}
                row={row}
            />
        </>
    )
}

interface IMemberOccupationRowContextProps extends IMemberOccupationTableActionComponentProp {
    children?: ReactNode
    onDeleteSuccess?: () => void
}

export const MemberOccupationRowContext = ({
    row,
    children,
    onDeleteSuccess,
}: IMemberOccupationRowContextProps) => {
    const { isDeletingMemberOccupation, handleEdit, handleDelete } =
        useMemberOccupationActions({ row, onDeleteSuccess })

    return (
        <DataTableRowContext
            onDelete={{
                text: 'Delete',
                isAllowed: !isDeletingMemberOccupation,
                onClick: handleDelete,
            }}
            onEdit={{
                text: 'Edit',
                isAllowed: true,
                onClick: handleEdit,
            }}
            row={row}
        >
            {children}
        </DataTableRowContext>
    )
}

export const MemberOccupationTableActionManager = () => {
    const { state, close } = useTableRowActionStore<
        IMemberOccupation,
        MemberOccupationActionType,
        MemberOccupationActionExtra
    >()

    if (!state || !state.defaultValues) return null

    const memberOccupation = state.defaultValues

    return (
        <>
            {state.action === 'edit' && (
                <MemberOccupationCreateUpdateFormModal
                    description="Modify/Update this member occupation..."
                    formProps={{
                        memberOccupationId: memberOccupation.id,
                        defaultValues: memberOccupation,
                        onSuccess: close,
                    }}
                    onOpenChange={close}
                    open={state.isOpen}
                    title="Update Member Occupation"
                />
            )}
        </>
    )
}

export default MemberOccupationAction
