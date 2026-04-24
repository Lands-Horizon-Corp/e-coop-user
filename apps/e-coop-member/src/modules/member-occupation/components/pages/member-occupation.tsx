import { useQueryClient } from '@tanstack/react-query'

import { useAuthUserWithOrgBranch } from '@e-coop-monorepo/modules/authentication/authgentication.store'
import { MemberOccupationCreateUpdateFormModal } from '@e-coop-monorepo/modules/member-occupation/components/member-occupation-create-update-form'
import MemberOccupationTable from '@e-coop-monorepo/modules/member-occupation/components/tables/member-occupation-table'
import { useModalState } from '@e-coop-monorepo/shared/hooks'
import { useSubscribe } from '@e-coop-monorepo/shared/hooks'
import PageContainer from '@e-coop-monorepo/ui/components/containers/page-container'

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
