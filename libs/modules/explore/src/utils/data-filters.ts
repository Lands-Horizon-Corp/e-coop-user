import type { IBranch } from '@e-coop-monorepo/modules/branch'
import type { IOrganization } from '@e-coop-monorepo/modules/organization'
import type { IOrganizationCategory } from '@e-coop-monorepo/modules/organization-category'

export const filterOrganizations = (
    organizations: IOrganization[],
    searchTerm: string,
    selectedCategory: string
) => {
    return organizations.filter((org) => {
        const matchesSearch =
            !searchTerm ||
            org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            org.description?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory =
            selectedCategory === 'all' ||
            org.organization_categories?.some((cat: IOrganizationCategory) => {
                return (
                    cat?.category.name.toLowerCase() ===
                    selectedCategory.toLowerCase()
                )
            })
        return matchesSearch && matchesCategory
    })
}

export const filterBranches = (
    branches: IBranch[],
    searchTerm: string,
    selectedLocation: string
) => {
    return branches.filter((branch) => {
        const matchesSearch =
            !searchTerm ||
            branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            branch.organization?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

        const matchesLocation =
            selectedLocation === 'all' ||
            branch.city
                .toLowerCase()
                .includes(selectedLocation.toLowerCase()) ||
            branch.province
                .toLowerCase()
                .includes(selectedLocation.toLowerCase())

        return matchesSearch && matchesLocation
    })
}
