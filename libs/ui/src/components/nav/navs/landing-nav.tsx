import { ReactNode, useState } from 'react'

import { Link, useLocation } from '@tanstack/react-router'

import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { CalculatorIcon } from '@e-coop-monorepo/ui'
import NavAuthGroup from '@e-coop-monorepo/ui'
import NavEcoopLogo from '@e-coop-monorepo/ui'
import NavThemeToggle from '@e-coop-monorepo/ui'
import NavContainer from '@e-coop-monorepo/ui'
import RootNav from '@e-coop-monorepo/ui'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@e-coop-monorepo/ui'
import { HiBars3 } from 'react-icons/hi2'

type NavLink = {
    name: string
    path: string
    icon?: ReactNode
}

const navLinks: NavLink[] = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'About',
        path: '/about',
    },
    {
        name: 'Contact',
        path: '/contact-us',
    },

    {
        name: 'Terms',
        path: '/terms',
    },
    {
        name: 'Calculator',
        path: '/calculator',
        icon: <CalculatorIcon />,
    },
]

const LandingNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathName = useLocation({
        select: (location) => location.pathname,
    })

    const handleLinkClick = () => {
        setIsOpen(false)
    }

    return (
        <RootNav>
            <NavEcoopLogo />

            {/* Desktop Navigation */}
            {/* <NavContainer>
                {navLinks.map((link, index) => {
                    const isCurrentTab = pathName === link.path
                    const isExternalLink = link.path?.charAt(0) !== '/'

                    return (
                        <div
                            className="relative flex space-x-1 w-fit"
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
                            <div
                                className={cn(
                                    'absolute opacity-0 duration-500 -bottom-2 hidden h-[5px] w-0 !ml-0 rounded-full bg-primary sm:block',
                                    isCurrentTab && 'opacity-100 w-[20px]'
                                )}
                            ></div>
                        </div>
                    )
                })}
            </NavContainer> */}

            {/* Mobile Navigation */}
            <div className="sm:hidden">
                <Sheet onOpenChange={setIsOpen} open={isOpen}>
                    <SheetTrigger asChild>
                        <button
                            aria-label="Open mobile menu"
                            className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <HiBars3 className="w-6 h-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        className="w-[300px] sm:w-[400px]"
                        side="right"
                    >
                        <SheetHeader>
                            <SheetTitle>Navigation</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 mt-6">
                            {navLinks.map((link, index) => {
                                const isCurrentTab = pathName === link.path
                                const isExternalLink =
                                    link.path?.charAt(0) !== '/'

                                return (
                                    <div key={index}>
                                        {isExternalLink ? (
                                            <a
                                                className={cn(
                                                    'flex items-center gap-x-3 p-3  font-medium transition-colors hover:bg-muted',
                                                    isCurrentTab &&
                                                        'bg-primary/10 text-primary font-bold'
                                                )}
                                                href={link.path}
                                                onClick={handleLinkClick}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                {link.icon && (
                                                    <div className="self-center">
                                                        {link.icon}
                                                    </div>
                                                )}
                                                {link.name}
                                            </a>
                                        ) : (
                                            <SheetClose asChild>
                                                <Link
                                                    className={cn(
                                                        'flex items-center gap-x-3 p-3 font-medium transition-colors hover:bg-muted',
                                                        isCurrentTab &&
                                                            'bg-primary/10 text-primary font-bold'
                                                    )}
                                                    onClick={handleLinkClick}
                                                    to={link.path}
                                                >
                                                    {link.icon && (
                                                        <div className="self-center">
                                                            {link.icon}
                                                        </div>
                                                    )}
                                                    {link.name}
                                                </Link>
                                            </SheetClose>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Auth and Theme */}
            <NavContainer>
                <NavAuthGroup />
                <NavThemeToggle />
            </NavContainer>
        </RootNav>
    )
}

export default LandingNav
