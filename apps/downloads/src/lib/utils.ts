import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(' ')
}
