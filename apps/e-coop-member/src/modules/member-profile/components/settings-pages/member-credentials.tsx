import { useState } from 'react'

import { toast } from 'sonner'

import { Button } from '@e-coop-monorepo/ui/core'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@e-coop-monorepo/ui/core'
import { Label } from '@e-coop-monorepo/ui/core'
import {
    AlertTriangle,
    CheckCircle2,
    Eye,
    EyeOff,
    Key,
    Lock,
    Pencil,
    QrCode,
    Shield,
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

import { cn } from '@/lib/utils'

import type { IMemberProfile } from '../../member-profile.types'

interface UserCredentialProps {
    memberProfile: IMemberProfile
}

type KeyStep = 'view' | 'edit' | 'otp'
type PasswordStep = 'form' | 'otp'

const MemberCredentials = ({ memberProfile }: UserCredentialProps) => {
    // Pang key
    const [keyStep, setKeyStep] = useState<KeyStep>('view')
    const [newKey, setNewKey] = useState('')
    const [keyOtpValue, setKeyOtpValue] = useState('')
    const [isKeyLoading, setIsKeyLoading] = useState(false)

    // Pang password
    const [passwordStep, setPasswordStep] = useState<PasswordStep>('form')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showRetypePassword, setShowRetypePassword] = useState(false)
    const [passwordOtpValue, setPasswordOtpValue] = useState('')
    const [isPasswordLoading, setIsPasswordLoading] = useState(false)

    const passwordsMatch = password === retypePassword && password.length > 0
    const isPasswordFormValid = passwordsMatch && password.length >= 6
    const isKeyFormValid = newKey.length >= 3 && newKey !== memberProfile.key

    const handleSaveKey = () => {
        if (!isKeyFormValid) {
            toast.error('Please enter a valid new key.')
            return
        }
        setIsKeyLoading(true)
        setTimeout(() => {
            setIsKeyLoading(false)
            setKeyStep('otp')
        }, 800)
    }

    const handleVerifyKeyOtp = () => {
        if (keyOtpValue.length !== 6) {
            toast.error('Please enter a valid 6-digit code.')
            return
        }
        setIsKeyLoading(true)
        setTimeout(() => {
            setIsKeyLoading(false)
            toast.success('Sign-in key updated successfully!', {
                description: 'Your new key has been saved securely.',
                icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
            })
            setNewKey('')
            setKeyOtpValue('')
            setKeyStep('view')
        }, 1000)
    }

    const handleSavePassword = () => {
        if (!isPasswordFormValid) {
            toast.error(
                'Please ensure passwords match and are at least 6 characters.'
            )
            return
        }
        setIsPasswordLoading(true)
        setTimeout(() => {
            setIsPasswordLoading(false)
            setPasswordStep('otp')
        }, 800)
    }

    const handleVerifyPasswordOtp = () => {
        if (passwordOtpValue.length !== 6) {
            toast.error('Please enter a valid 6-digit code.')
            return
        }
        setIsPasswordLoading(true)
        setTimeout(() => {
            setIsPasswordLoading(false)
            toast.success('Password updated successfully!', {
                description: 'Your credentials have been saved securely.',
                icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
            })
            setPassword('')
            setRetypePassword('')
            setPasswordOtpValue('')
            setPasswordStep('form')
        }, 1000)
    }

    const getMaskedKey = (key: string) => {
        if (key.includes('@')) {
            const [name, domain] = key.split('@')
            return `${name.slice(0, 2)}***@${domain}`
        }
        return `${key.slice(0, 3)}***${key.slice(-2)}`
    }

    const cancelKeyEdit = () => {
        setKeyStep('view')
        setNewKey('')
        setKeyOtpValue('')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        User Credential
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Manage your sign-in credentials and security settings
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Key className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-medium text-card-foreground">
                                        Sign-in Key
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        {keyStep === 'view'
                                            ? 'Your unique identifier for logging in'
                                            : keyStep === 'edit'
                                              ? 'Enter your new sign-in key'
                                              : 'Verify with OTP to complete'}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {keyStep === 'view' && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3">
                                        <span className="font-mono text-sm text-foreground">
                                            {getMaskedKey(memberProfile.key)}
                                        </span>
                                    </div>
                                    <Button
                                        className="w-full border-border"
                                        onClick={() => setKeyStep('edit')}
                                        variant="outline"
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Change Sign-in Key
                                    </Button>
                                </div>
                            )}

                            {keyStep === 'edit' && (
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
                                        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-destructive">
                                                Proceed with caution
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Changing your sign-in key will
                                                affect how you log in. Make sure
                                                to remember your new key.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Current Key
                                        </Label>
                                        <div className="flex items-center gap-3 rounded-lg bg-muted px-4 py-3">
                                            <span className="font-mono text-sm text-muted-foreground">
                                                {getMaskedKey(
                                                    memberProfile.key
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            className="text-sm font-medium text-foreground"
                                            htmlFor="newKey"
                                        >
                                            New Sign-in Key
                                        </Label>
                                        <Input
                                            className="bg-secondary border-input focus:border-primary focus:ring-primary"
                                            id="newKey"
                                            onChange={(e) =>
                                                setNewKey(e.target.value)
                                            }
                                            placeholder="Enter new email or username"
                                            type="text"
                                            value={newKey}
                                        />
                                        {newKey.length > 0 &&
                                            newKey.length < 3 && (
                                                <p className="text-xs text-destructive">
                                                    Key must be at least 3
                                                    characters
                                                </p>
                                            )}
                                        {newKey === memberProfile.key && (
                                            <p className="text-xs text-destructive">
                                                New key must be different from
                                                current key
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            className="flex-1 border-border"
                                            onClick={cancelKeyEdit}
                                            variant="outline"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            disabled={
                                                !isKeyFormValid || isKeyLoading
                                            }
                                            onClick={handleSaveKey}
                                        >
                                            {isKeyLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    Processing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <Key className="h-4 w-4" />
                                                    Change Key
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {keyStep === 'otp' && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <Shield className="h-6 w-6 text-primary" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Enter the 6-digit verification code
                                            sent to your registered contact
                                        </p>
                                    </div>

                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={6}
                                            onChange={(value) =>
                                                setKeyOtpValue(value)
                                            }
                                            value={keyOtpValue}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={0}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={1}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={2}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={3}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={4}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={5}
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            className="flex-1 border-border"
                                            onClick={cancelKeyEdit}
                                            variant="outline"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            disabled={
                                                keyOtpValue.length !== 6 ||
                                                isKeyLoading
                                            }
                                            onClick={handleVerifyKeyOtp}
                                        >
                                            {isKeyLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    Verifying...
                                                </span>
                                            ) : (
                                                'Verify & Save'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Lock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-medium text-card-foreground">
                                        Password
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        {passwordStep === 'form'
                                            ? 'Update your account password'
                                            : 'Verify with OTP to complete'}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {passwordStep === 'form' ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label
                                            className="text-sm font-medium text-foreground"
                                            htmlFor="password"
                                        >
                                            New Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                className="pr-10 bg-secondary border-input focus:border-primary focus:ring-primary"
                                                id="password"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                placeholder="Enter new password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={password}
                                            />
                                            <button
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                type="button"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {password.length > 0 &&
                                            password.length < 6 && (
                                                <p className="text-xs text-destructive">
                                                    Password must be at least 6
                                                    characters
                                                </p>
                                            )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            className="text-sm font-medium text-foreground"
                                            htmlFor="retypePassword"
                                        >
                                            Confirm Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                className={cn(
                                                    'pr-10 bg-secondary border-input focus:border-primary focus:ring-primary',
                                                    retypePassword.length > 0 &&
                                                        !passwordsMatch &&
                                                        'border-destructive focus:border-destructive focus:ring-destructive'
                                                )}
                                                id="retypePassword"
                                                onChange={(e) =>
                                                    setRetypePassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Retype new password"
                                                type={
                                                    showRetypePassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={retypePassword}
                                            />
                                            <button
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() =>
                                                    setShowRetypePassword(
                                                        !showRetypePassword
                                                    )
                                                }
                                                type="button"
                                            >
                                                {showRetypePassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {retypePassword.length > 0 &&
                                            !passwordsMatch && (
                                                <p className="text-xs text-destructive">
                                                    Passwords do not match
                                                </p>
                                            )}
                                        {passwordsMatch &&
                                            password.length >= 6 && (
                                                <p className="text-xs text-primary flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" />{' '}
                                                    Passwords match
                                                </p>
                                            )}
                                    </div>

                                    <Button
                                        className="w-full mt-2"
                                        disabled={
                                            !isPasswordFormValid ||
                                            isPasswordLoading
                                        }
                                        onClick={handleSavePassword}
                                    >
                                        {isPasswordLoading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Shield className="h-4 w-4" />
                                                Change Password
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <Shield className="h-6 w-6 text-primary" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Enter the 6-digit verification code
                                            sent to your registered contact
                                        </p>
                                    </div>

                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={6}
                                            onChange={(value) =>
                                                setPasswordOtpValue(value)
                                            }
                                            value={passwordOtpValue}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={0}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={1}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={2}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={3}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={4}
                                                />
                                                <InputOTPSlot
                                                    className="bg-secondary border-input"
                                                    index={5}
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            className="flex-1 border-border"
                                            onClick={() => {
                                                setPasswordStep('form')
                                                setPasswordOtpValue('')
                                            }}
                                            variant="outline"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            disabled={
                                                passwordOtpValue.length !== 6 ||
                                                isPasswordLoading
                                            }
                                            onClick={handleVerifyPasswordOtp}
                                        >
                                            {isPasswordLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    Verifying...
                                                </span>
                                            ) : (
                                                'Verify & Save'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-sm h-fit">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <QrCode className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-medium text-card-foreground">
                                    Member QR Code
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Your unique identification for COOP
                                    transactions
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center justify-center py-6">
                            <div
                                className={cn(
                                    'rounded-2xl p-4 shadow-lg transition-colors bg-white border border-border'
                                )}
                            >
                                <QRCodeSVG
                                    bgColor="#ffffff"
                                    fgColor="#1a1a2e"
                                    includeMargin={false}
                                    level="H"
                                    size={180}
                                    value={String(memberProfile.id)}
                                />
                            </div>
                            <p className="mt-4 font-mono text-sm text-muted-foreground">
                                ID: {memberProfile.id}
                            </p>
                        </div>

                        <div className="rounded-lg bg-secondary p-4 space-y-2">
                            <h4 className="text-sm font-medium text-foreground">
                                How to use
                            </h4>
                            <ul className="text-xs text-muted-foreground space-y-1.5">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                    Present this QR code for fast transaction
                                    processing at any COOP counter
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                    Use for loan applications, deposits,
                                    withdrawals, and more
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                    Enables quick member verification without
                                    manual ID entry
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default MemberCredentials
