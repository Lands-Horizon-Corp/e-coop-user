import { useEffect } from 'react'

import { useGetBranchesByOrganizationId } from '@e-coop-monorepo/modules/branch'
import { CoopBackground } from '@e-coop-monorepo/modules/home'
import Themes from '@e-coop-monorepo/modules/settings'
import type { CustomThemeColors } from '@e-coop-monorepo/shared/providers/core-providers'
import { useTheme } from '@e-coop-monorepo/shared/providers/core-providers'
import { FlowingGrid } from '@e-coop-monorepo/ui/core'

import { OrganizationBanner } from '../components/organization-banner'
import { BranchList } from '../components/organization-branch-list'
import { OrganizationDetails } from '../components/organization-details/organization-details'
import { MediaCarousel } from '../components/organization-media-carousel'
import { useGetOrganizationById } from '../organization.service'

const org_id = import.meta.env.VITE_ORGANIZATION_ID

const Organization = () => {
    const { applyCustomThemeColors } = useTheme()
    const { data: Organization } = useGetOrganizationById({
        id: org_id,
    })

    const { data: Branches } = useGetBranchesByOrganizationId({
        organizationId: org_id,
    })

    useEffect(() => {
        const theme = [...Themes].find(
            (item) => item.name === Organization?.theme
        )
        if (theme) {
            applyCustomThemeColors(
                theme.colors as CustomThemeColors,
                theme.name
            )
        }
    }, [Organization])

    console.log('org', Organization, org_id)
    if (!Organization || !Branches) return
    return (
        <main className="min-h-screen mx-auto w-[80%]">
            {/* <FlowingGrid
                gridGap={1}
                // width={50}
                className=" w-full ml-[50%] h-full -translate-y-[30%] -translate-x-1/2  before:[''] before:absolute before:bg-primary before:rounded-full before:left-1/2  before:-translate-x-1/2 before:size-[700px] before:z-50 before:-top-[110%] before: before:blur-2xl"
                maxOpacity={0.7}
                squareSize={4}
            /> */}
            <CoopBackground />
            <CoopBackground opacity={0.3} variant="geometric" />
            <OrganizationBanner organization={Organization} />

            <MediaCarousel medias={Organization.organization_medias} />
            <BranchList branches={Branches} />
            <OrganizationDetails organization={Organization} />
        </main>
    )
}

export default Organization
