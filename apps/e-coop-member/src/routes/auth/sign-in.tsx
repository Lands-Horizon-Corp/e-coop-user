import { createFileRoute, useRouter } from '@tanstack/react-router'

import COOKIE_ICON from '@/assets/cookie-icon.svg'
import LoginForm from '@/modules/auth/components/forms/login-form'

import PageContainer from '@e-coop-monorepo/ui/components/containers/page-container'
import ImageDisplay from '@e-coop-monorepo/ui/components/image-display'

export const Route = createFileRoute('/auth/sign-in')({
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()

    return (
        <PageContainer className="relative py-8">
            <div className="absolute inset-0 -z-10 -mt-16 h-screen w-full bg-radial-[ellipse_at_100%_0%] from-primary/50 via-background/0 to-background/0 to-100%" />
            <div className="absolute inset-0 -z-10 h-screen w-full bg-radial-[ellipse_at_0%_50%] from-primary/20 via-background/0 to-background/0 to-100%" />
            <div className="max-w-md w-full z-10 flex flex-col gap-y-4 p-6 bg-card rounded-xl">
                <div className="flex flex-col items-center space-y-2">
                    <ImageDisplay className="size-12" src={COOKIE_ICON} />
                    <h1 className="text-xl font-semibold">
                        Welcome back dear Member!
                    </h1>
                    <div className="space-y-2 max-w-sm">
                        <p className="text-muted-foreground text-sm text-center">
                            Please enter your details to login.
                        </p>
                    </div>
                </div>
                <LoginForm
                    className="bg-transparent px-4"
                    onSuccess={() =>
                        router.navigate({ to: '/dashboard' as string })
                    }
                />
            </div>
        </PageContainer>
    )
}
