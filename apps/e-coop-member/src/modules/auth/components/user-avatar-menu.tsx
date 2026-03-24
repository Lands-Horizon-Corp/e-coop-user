import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import useConfirmModalStore from '@/store/confirm-modal-store'
import { HelpCircle, LogOut, Settings } from 'lucide-react'

import {
    BadgeCheckFillIcon,
    BadgeExclamationFillIcon,
    BadgeQuestionFillIcon,
    BoxesStackedIcon,
    HouseIcon,
} from '@/components/icons'
import ImageDisplay from '@/components/image-display'
import InfoTooltip from '@/components/tooltips/info-tooltip'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useSignOut } from '..'
import { useAuthStore } from '../authgentication.store'

const UserAvatarMenu = () => {
    const {
        currentAuth: { member_profile },
        resetAuth,
    } = useAuthStore()
    const { onOpen } = useConfirmModalStore()
    const router = useRouter()

    const { mutate: handleSignout } = useSignOut({
        options: {
            onSuccess: () => {
                router.navigate({ to: '/' })
                toast.success('Signed out')
                resetAuth()
            },
        },
    })

    if (!member_profile) return null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative rounded-full">
                    <ImageDisplay
                        className="size-8"
                        fallback={member_profile.first_name
                            .slice(0, 2)
                            .toUpperCase()}
                        src={member_profile.media?.download_url}
                    />
                    <span className="absolute -bottom-1 -right-1 drop-shadow">
                        <span className="relative block">
                            <span className="h-[40%] w-[40%] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 -z-10 bg-background absolute" />
                            {member_profile.status === 'verified' && (
                                <InfoTooltip content="Verified User">
                                    <BadgeCheckFillIcon className="size-3.5 text-primary z-10" />
                                </InfoTooltip>
                            )}{' '}
                            {member_profile.status === 'not allowed' && (
                                <InfoTooltip content="Not Allowed">
                                    <BadgeExclamationFillIcon className="size-3.5 text-destructive z-10" />
                                </InfoTooltip>
                            )}
                            {member_profile.status === 'pending' && (
                                <InfoTooltip content="Pending User">
                                    <BadgeQuestionFillIcon className="size-3.5 text-warning z-10" />
                                </InfoTooltip>
                            )}
                        </span>
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-56 p-2 rounded-xl shadow-dropdown bg-popover border border-border"
                sideOffset={8}
            >
                <div className="flex flex-col items-center justify-center px-2 gap-y-2 py-1.5 mb-1">
                    <div className="relative">
                        <ImageDisplay
                            className="size-16"
                            fallback={member_profile.first_name
                                .slice(0, 2)
                                .toUpperCase()}
                            src={member_profile.media?.download_url}
                        />
                        <span className="absolute bottom-1 right-1 text-primary drop-shadow">
                            <span className="relative block">
                                <span className="h-[40%] w-[40%] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 -z-10 bg-background absolute" />
                                {member_profile.status === 'verified' && (
                                    <InfoTooltip content="Verified User">
                                        <BadgeCheckFillIcon className="size-3.5 text-primary z-10" />
                                    </InfoTooltip>
                                )}{' '}
                                {member_profile.status === 'not allowed' && (
                                    <InfoTooltip content="Not Allowed">
                                        <BadgeExclamationFillIcon className="size-3.5 text-destructive z-10" />
                                    </InfoTooltip>
                                )}
                                {member_profile.status === 'pending' ||
                                    (member_profile.status === 'for review' && (
                                        <InfoTooltip content="Pending/For Review">
                                            <BadgeQuestionFillIcon className="size-3.5 text-warning z-10" />
                                        </InfoTooltip>
                                    ))}
                            </span>
                        </span>
                    </div>
                    <Badge className="text-xs px-3 py-1" variant="success">
                        Hi, {member_profile.first_name}!
                    </Badge>
                </div>

                <DropdownMenuItem
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer focus:bg-accent focus:text-accent-foreground"
                    onSelect={() => router.navigate({ to: '/' })}
                >
                    <HouseIcon className="size-4 text-muted-foreground" />
                    <span>Landing</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer focus:bg-accent focus:text-accent-foreground"
                    onSelect={() => router.navigate({ to: '/dashboard' })}
                >
                    <BoxesStackedIcon className="size-4 text-muted-foreground" />
                    <span>Home / Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer focus:bg-accent focus:text-accent-foreground"
                    onSelect={() => router.navigate({ to: '/profile' })}
                >
                    <Settings className="size-4 text-muted-foreground" />
                    <span>Profile Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer focus:bg-accent focus:text-accent-foreground">
                    <HelpCircle className="size-4 text-muted-foreground" />
                    <span>Help Center</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border/50" />

                <DropdownMenuItem
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer focus:bg-muted dark:focus:bg-destructive/70 dark:focus:text-destructive-foreground text-muted-foreground focus:text-muted-foreground"
                    onSelect={() => {
                        onOpen({
                            title: 'Sign Out',
                            description: 'Are you sure you want to sign out?',
                            onConfirm: () => handleSignout(),
                        })
                    }}
                >
                    <LogOut className="size-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatarMenu
