import { IOrganization, useGetOrganizationById } from '@/modules/organization'

const organizationId = import.meta.env.VITE_ORGANIZATION_ID

export const useGetOrganization = (): IOrganization | null => {
    const { data: Organization, error } = useGetOrganizationById({
        id: organizationId,
    })
    if (error) {
        console.error(error.message)
    }
    if (!Organization) return null

    return {
        ...Organization,
    }
}
