import type { ReactNode } from 'react'

import { Link, useLocation } from '@tanstack/react-router'

import UserAvatarMenu from '@ecoop/modules/auth/components/user-avatar-menu'
import { cn } from '@ecoop/shared/tw-utils'
// import PageBreadCrumb from '@ecoop/ui/core'
// import AppSidebarToggle from '@ecoop/ui/core'
// import { Button } from '@ecoop/ui/core'

import type { IClassProps } from '@ecoop/shared/types'
// import { useAuthStore } from '@ecoop/modules/authentication/authgentication.store'
// import GeneratedReportsButton from '@ecoop/modules/generated-report/components/generated-reports/generated-reports-button'
// import { NotificationNav } from '@ecoop/modules/notification/components/notification'
// import TransactionBatchNavButton from '@ecoop/modules/transaction-batch/components/batch-nav-button'
// import NavProfileMenu from '@ecoop/modules/user-profile/components/nav/nav-profile-menu'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

import {NavThemeToggle} from '../nav-components/nav-theme-toggle'
import {NavContainer} from '@ecoop/ui/nav'
import {RootNav} from '@ecoop/ui/nav'

type NavLink = {
    name: string
    path: string
    icon?: ReactNode
}

const navLinks: NavLink[] = [
    {
        name: 'Home',
        path: '/dashboard',
    },
    {
        name: 'Profile',
        path: '/profile',
    },
]

const UserNav = ({ className }: { homeUrl?: `/${string}` } & IClassProps) => {
    // const {
    //     currentAuth: { user, user_organization },
    // } = useAuthStore()

    // const [isOpen, setIsOpen] = useState(true)
    const pathName = useLocation({
        select: (location) => location.pathname,
    })

    return (
        <RootNav
            className={cn(
                'pointer-events-none relative justify-between lg:px-48',
                className
            )}
        >
            <NavContainer>
                {navLinks.map((link, index) => {
                    const isCurrentTab = pathName === link.path
                    const isExternalLink = link.path?.charAt(0) !== '/'

                    return (
                        <div
                            className="relative flex space-x-1 pointer-events-auto w-fit"
                            key={index}
                        >
                            {isExternalLink ? (
                                <a
                                    className={cn(
                                        'scale-effects nav-links hidden items-center gap-x-2 font-normal sm:flex',
                                        isCurrentTab && 'font-bold'
                                    )}
                                    href={link.path}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {link.name}
                                    <div className="self-center">
                                        {link.icon}
                                    </div>
                                </a>
                            ) : (
                                <Link
                                    className={cn(
                                        'scale-effects nav-links hidden items-center gap-x-2 font-normal sm:flex',
                                        isCurrentTab && 'font-bold'
                                    )}
                                    to={link.path}
                                >
                                    {link.name}
                                    <div className="self-center">
                                        {link.icon}
                                    </div>
                                </Link>
                            )}
                            {/* Desktop active indicator */}
                            <div
                                className={cn(
                                    'absolute opacity-0 duration-500 -bottom-2 hidden h-[5px] w-0 !ml-0 rounded-full bg-primary sm:block',
                                    isCurrentTab && 'opacity-100 w-[20px]'
                                )}
                            ></div>
                        </div>
                    )
                })}
            </NavContainer>

            <NavContainer className="pointer-events-auto">
                <div className="flex gap-x-2 items-center">
                    <NavThemeToggle />
                    <UserAvatarMenu />
                </div>
            </NavContainer>
        </RootNav>
    )
}

export {UserNav}
