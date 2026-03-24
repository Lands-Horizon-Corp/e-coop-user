import { useRouter } from '@tanstack/react-router'

import PageContainer from '@/components/containers/page-container'

import { LoanApplicationForm } from '../forms/loan-application-form'

const LoanApplicationPage = () => {
    const router = useRouter()
    return (
        <PageContainer>
            <LoanApplicationForm
                onSuccess={() =>
                    router.navigate({ to: '/loan-application-complete' })
                }
            />
        </PageContainer>
    )
}

export default LoanApplicationPage
