import { useGetAllBranches } from '@ecoop/domains/iam/models'
import { useGetAllOrganizations, useGetAllOrganizationsExplore } from '@ecoop/domains/iam/models'

const useExploreData = () => {
    const {
        data: organizations = [],
        isPending: isLoadingOrgs,
        error: orgsError,
    } = useGetAllOrganizations()

    const {
        data: branches = [],
        isPending: isLoadingBranches,
        error: branchesError,
    } = useGetAllBranches()

    const { data: organizationRecently } = useGetAllOrganizationsExplore({
        mode: 'recently',
    })
    const { data: organizationFeatured } = useGetAllOrganizationsExplore({
        mode: 'featured',
    })

    const isLoading = isLoadingOrgs || isLoadingBranches
    const hasError = orgsError || branchesError

    return {
        organizations,
        branches,
        isLoading,
        hasError,
        organizationFeatured,
        organizationRecently,
    }
}

export default useExploreData
