import { Link } from '@tanstack/react-router'

import { useGetOrganizationById } from '@/modules/organization'

import ImageDisplay from '@/components/image-display'

const organizationId = import.meta.env.VITE_ORGANIZATION_ID

const NavEcoopLogo = () => {
    const { data: Organization } = useGetOrganizationById({
        id: organizationId,
    })

    return (
        <Link to={Organization?.media?.download_url}>
            <ImageDisplay src={Organization?.media?.download_url} />
        </Link>
    )
}

export default NavEcoopLogo
