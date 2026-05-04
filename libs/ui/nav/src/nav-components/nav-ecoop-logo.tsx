import { Link } from '@tanstack/react-router'

import { useGetOrganizationById } from '@ecoop/domains/iam'
import {ImageDisplay} from '@ecoop/ui/core'

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

export {NavEcoopLogo}
