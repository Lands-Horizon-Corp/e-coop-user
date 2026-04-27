import { ReactNode } from 'react'

import { useRouter, useSearch } from '@tanstack/react-router'

import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { useAuthMember } from '@e-coop-monorepo/shared/store'
import { IClassProps } from '@e-coop-monorepo/shared/types'
import PageContainer from '@e-coop-monorepo/ui/components/containers/page-container'
import {
    GraduationCapIcon,
    HandCoinsIcon,
    IdCardIcon,
    MapMarkedIcon,
    UserIcon,
    UserTagIcon,
    Users3Icon,
} from '@e-coop-monorepo/ui/components/icons'
import {
    ScrollArea,
    ScrollBar,
} from '@e-coop-monorepo/ui/components/ui/scroll-area'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@e-coop-monorepo/ui/components/ui/tabs'
import { IconType } from 'react-icons/lib'

import IdentityForm from '../components/forms/identity-form'
import AccountRelationship from '../components/settings-pages/account-relationship'
import MemberAddressContact from '../components/settings-pages/member-address-contact'
import MemberCredentials from '../components/settings-pages/member-credentials'
import MemberEducationalAttainmentSection from '../components/settings-pages/member-educational-attainment'
import FinancialManagement from '../components/settings-pages/member-financial-info'
import MemberGovernmentBenefitSection from '../components/settings-pages/member-government-benefits'
import { IMemberProfile } from '../member-profile.types'

// import { IMemberProfile, useGetMemberProfileById } from '../..'
// import MemberCloseAccountBanner from '../member-closed-account-banner'
// import MemberProfileMiniInfoCard, {
//     MemberProfileMiniInfoCardSkeleton,
// } from '../member-profile-mini-info-card'
// import MemberAccountRelationship from './settings-tab-pages/account-relationship'
// import MemberAddressContact from './settings-tab-pages/member-address-contact'
// import MemberEducationalAttainment from './settings-tab-pages/member-educational-attainment'
// import MemberFinancial from './settings-tab-pages/member-financial-info'
// import MemberGovernmentBenefits from './settings-tab-pages/member-government-benefits'
// import MemberProfilePersonalInfo from './settings-tab-pages/member-profile-personal-info'

// import MemberUserAccount from './settings-tab-pages/member-user-account'
// import MembershipInfo from './settings-tab-pages/membership-info'

const SettingsTabs: {
    value: string
    title: string
    Icon?: IconType
    Component: (
        props: IClassProps & {
            memberProfile: IMemberProfile
        }
    ) => ReactNode
}[] = [
    {
        value: 'identity',
        title: 'Identity / Personal Info',
        Icon: UserTagIcon,
        Component: (props) => (
            <div className="space-y-4">
                <div>
                    <p className="text-xl font-medium">
                        Member Profile Identity
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Update member your identity
                    </p>
                </div>
                <IdentityForm
                    defaultValues={props.memberProfile}
                    memberId={props.memberProfile.id}
                />
            </div>
        ),
        // Component: () => <></>,
    },
    {
        value: 'education',
        title: 'Education',
        Icon: GraduationCapIcon,
        Component: (props) => (
            <MemberEducationalAttainmentSection
                memberProfile={props.memberProfile}
            />
        ),
        // Component: () => <></>,
    },
    {
        value: 'government-benefits',
        title: 'Government Benefits / IDs',
        Icon: IdCardIcon,
        Component: (props) => (
            <MemberGovernmentBenefitSection
                memberProfile={props.memberProfile}
            />
        ),
        // Component: () => <></>,
    },
    {
        value: 'financial',
        title: 'Financial Info',
        Icon: HandCoinsIcon,
        // Component: (props) => <MemberFinancial {...props} />,
        Component: (props) => (
            <FinancialManagement memberProfile={props.memberProfile} />
        ),
    },
    {
        value: 'addresses-contacts',
        title: 'Addresses & Contacts',
        Icon: MapMarkedIcon,
        // Component: (props) => <MemberAddressContact {...props} />,
        Component: (props) => (
            <MemberAddressContact memberProfile={props.memberProfile} />
        ),
    },
    {
        value: 'account-relationships',
        title: 'Account Relationships',
        Icon: Users3Icon,
        // Component: (props) => <MemberAccountRelationship {...props} />,
        Component: (props) => (
            <AccountRelationship memberProfile={props.memberProfile} />
        ),
    },
    {
        value: 'credentials',
        title: 'Credentials',
        Icon: UserIcon,
        Component: (props) => <MemberCredentials {...props} />,
        // Component: () => <></>,
    },
]

type Props = IClassProps

const MemberProfileSettingsPage = ({ className }: Props) => {
    const router = useRouter()

    const { tab = 'identity' } = useSearch({
        from: '/(dashboard)/profile',
    }) as { tab?: string }

    const handleTabChange = (newTab: string) => {
        router.navigate({
            to: '.',
            search: {
                tab: newTab,
            },
        })
    }

    const { authMember } = useAuthMember()

    return (
        <PageContainer className={className}>
            <div className="w-full max-w-7xl flex-1 space-y-4">
                <Tabs
                    className="flex w-full min-h-screen flex-row gap-x-6"
                    onValueChange={(tab) => handleTabChange(tab)}
                    value={tab}
                >
                    <ScrollArea>
                        <TabsList className="border-bx mb-3 h-auto flex-col justify-start gap-x-2 gap-y-1 rounded-none sticky top-0 bg-transparent px-0 py-1 text-foreground">
                            {SettingsTabs.map((stngsTab) => (
                                <TabsTrigger
                                    className="dara-[state=active]:border relative w-full justify-start rounded-md from-primary/20 to-transparent text-muted-foreground after:absolute after:inset-y-0 after:left-0 after:w-0.5 after:content-[''] hover:text-foreground data-[state=active]:bg-secondary data-[state=active]:bg-gradient-to-r data-[state=active]:shadow-none data-[state=active]:after:bg-primary dark:bg-transparent"
                                    key={stngsTab.value}
                                    value={stngsTab.value}
                                >
                                    {stngsTab.Icon && (
                                        <stngsTab.Icon
                                            aria-hidden="true"
                                            className={cn(
                                                '-ms-0.5 me-1.5 opacity-60 duration-300',
                                                stngsTab.value === tab &&
                                                    'opacity-100'
                                            )}
                                            size={16}
                                        />
                                    )}
                                    {stngsTab.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                    <div className="tst flex-1 rounded-md p-0 text-start">
                        {authMember &&
                            SettingsTabs.map((tab) => (
                                <TabsContent
                                    asChild
                                    key={tab.value}
                                    value={tab.value}
                                >
                                    {tab.Component({
                                        memberProfile:
                                            authMember as unknown as IMemberProfile,
                                    })}
                                </TabsContent>
                            ))}
                    </div>
                </Tabs>
            </div>
        </PageContainer>
    )
}

export default MemberProfileSettingsPage
