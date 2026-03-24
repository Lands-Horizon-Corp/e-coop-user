import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { Resolver, useForm } from 'react-hook-form'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import VerifyFaceRecognitionSection from '@/modules/kyc/components/registration-form/verify-face-recognize-section'
import { IKYCSelfieRequest } from '@/modules/kyc/kyc.types'
import { KYCVerifySelfieSchema } from '@/modules/kyc/kyc.validation'
import { TEntityId } from '@/types/common'

export const Route = createFileRoute('/(testing)/verify-face-recognize-page')({
    component: RouteComponent,
})

async function hashString(text: string): Promise<string> {
    const buffer = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', buffer)
    const array = Array.from(new Uint8Array(digest))
    return array.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function RouteComponent() {
    const [password, setPassword] = useState('')
    const [unlock, setUnlock] = useState(false)
    const EXPECTED_HASH =
        '35a233bc68b89db85be40135cfe3878aa8ee582f5dcb1b8a5ec023b85fce876d'

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const hashedPassword = await hashString(password)
        if (hashedPassword === EXPECTED_HASH) {
            setUnlock(true)
        } else {
            alert('Incorrect password')
        }
    }

    if (unlock) {
        return <TestingVerifyFace />
    }
    if (!unlock) {
        return (
            <TemporaryLoginPage
                handleLogin={handleLogin}
                handlePasswordChange={handlePasswordChange}
                password={password}
            />
        )
    }
}

function TemporaryLoginPage({
    handlePasswordChange,
    handleLogin,
    password,
}: {
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleLogin: (e: React.FormEvent) => void
    password: string
}) {
    return (
        <form
            className="p-4 max-w-md mx-auto mt-10 bg-white rounded shadow"
            onSubmit={handleLogin}
        >
            <h1 className="text-2xl font-bold">Temporary Login Page</h1>
            <p className="text-muted-foreground">
                This page is only accessible in development environment. It is
                used for testing purposes only.
            </p>

            <label className="block mt-4">
                Password:
                <input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                    onChange={handlePasswordChange}
                    type="password"
                    value={password}
                />
            </label>
            <button
                className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                type="submit"
            >
                Login
            </button>
        </form>
    )
}

const uuidv4Generator: () => string = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        }
    )
}

function TestingVerifyFace() {
    const form = useForm<IKYCSelfieRequest>({
        resolver: standardSchemaResolver(
            KYCVerifySelfieSchema
        ) as unknown as Resolver<IKYCSelfieRequest>,
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            selfie_media: undefined,
            selfie_media_id: uuidv4Generator() as unknown as TEntityId,
        },
    })

    const handleNext = () => {}
    const handleBack = () => {}

    return (
        <VerifyFaceRecognitionSection
            form={form}
            onBack={handleBack}
            onNext={handleNext}
        />
    )
}
