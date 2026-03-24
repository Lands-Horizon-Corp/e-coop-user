import { useGetBranchesByOrganizationId } from '@/modules/branch'
import { CoopBackground } from '@/modules/home/components/coop-bg'
import { Building2 } from 'lucide-react'

import { OrganizationBanner } from '../components/organization-banner'
import { BranchList } from '../components/organization-branch-list'
import { OrganizationDetails } from '../components/organization-details/organization-details'
import { MediaCarousel } from '../components/organization-media-carousel'
import { useGetOrganizationById } from '../organization.service'

const org_id = import.meta.env.VITE_ORGANIZATION_ID

const Organization = () => {
    const { data: Organization } = useGetOrganizationById({
        id: org_id,
    })

    const { data: Branches } = useGetBranchesByOrganizationId({
        organizationId: org_id,
    })

    if (!Organization || !Branches) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <div className="flex flex-col items-center justify-center text-center max-w-md">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
                        <Building2 className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">
                        No organization yet
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        There's no organization yet, contact your management
                        first.
                    </p>
                </div>
            </div>
        )
    }

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
