import { Link, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useSignOut } from '@e-coop-monorepo/modules/auth'
// import { useModalState } from '@e-coop-monorepo/shared/hooks'
import { useAuthUser } from '@e-coop-monorepo/modules/auth/authgentication.store'
import useConfirmModalStore from '@e-coop-monorepo/shared/store'

import {
    ChevronsUpDownIcon,
    FingerprintOffIcon,
    SettingsIcon,
} from '@/components/icons'
import ImageDisplay from '@/components/image-display'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

const AppSidebarUser = () => {
    const router = useRouter()
    // const apiKeyGenModal = useModalState()
    const { onOpen } = useConfirmModalStore()

    const {
        currentAuth: { user },
        resetAuth,
    } = useAuthUser()

    const { mutate: handleSignout } = useSignOut({
        options: {
            onSuccess: () => {
                router.navigate({ to: '/auth/sign-in' as string })
                toast.success('Signed Out')
                resetAuth()
            },
        },
    })

    if (!user) return null

    return (
        <>
            {/* <APIKeyGenModal
                descriptionClassName="hidden"
                titleClassName="hidden"
                {...apiKeyGenModal}
            /> */}
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="!py-6">
                                <ImageDisplay
                                    className="size-5 rounded-[4rem] duration-150 ease-in-out"
                                    src={user.media?.download_url ?? ''}
                                />
                                <div className="grid [[data-side=left][data-state=collapsed]_&]:hidden flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {`${user.first_name} ${user.middle_name} ${user.last_name}`}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                                <ChevronsUpDownIcon className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" side="right">
                            <DropdownMenuItem>
                                <Link to="/profile">
                                    <SettingsIcon className="inline mr-2 size-4 duration-150 ease-in-out" />
                                    <span>Manage Profile</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    onOpen({
                                        title: 'Sign Out',
                                        description:
                                            'Are you sure you want to sign out?',
                                        onConfirm: () => handleSignout(),
                                    })
                                }
                            >
                                <FingerprintOffIcon className="mr-2 size-4 duration-150 ease-in-out" />
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </>
    )
}

export default AppSidebarUser
