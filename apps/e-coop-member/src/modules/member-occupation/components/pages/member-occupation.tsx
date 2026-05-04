import { useQueryClient } from '@tanstack/react-query'

import { useAuthUserWithOrgBranch } from '@ecoop/domains/iam'
import { MemberOccupationCreateUpdateFormModal } from '@ecoop/domains/member-crm'
import MemberOccupationTable from '@ecoop/domains/member-crm'
import { useModalState } from '@ecoop/shared/hooks'
import { useSubscribe } from '@ecoop/shared/hooks'
import PageContainer from '@ecoop/ui/core'

const MemberOccupationPage = () => {
    const createModal = useModalState()
    const {
        currentAuth: {
            user_organization: { branch_id },
        },
    } = useAuthUserWithOrgBranch()
    const queryClient = useQueryClient()

    useSubscribe(`member_occupation.created.branch.${branch_id}`, () => {
        queryClient.invalidateQueries({
            queryKey: ['member-occupation', 'paginated'],
        })
    })

    useSubscribe(`member_occupation.updated.branch.${branch_id}`, () => {
        queryClient.invalidateQueries({
            queryKey: ['member-occupation', 'paginated'],
        })
    })

    useSubscribe(`member_occupation.deleted.branch.${branch_id}`, () => {
        queryClient.invalidateQueries({
            queryKey: ['member-occupation', 'paginated'],
        })
    })

    return (
        <PageContainer>
            <MemberOccupationCreateUpdateFormModal {...createModal} />
            <MemberOccupationTable
                className="max-h-[90vh] min-h-[90vh] w-full"
                toolbarProps={{
                    createActionProps: {
                        onClick: () => createModal.onOpenChange(true),
                    },
                }}
            />
        </PageContainer>
    )
}

export default MemberOccupationPage
