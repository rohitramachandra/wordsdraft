'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageSelector } from '@/components/language-selector'
import { SocialLoginButtons } from '@/components/social-login-buttons'
import { OtpModal } from '@/components/otp-modal'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { AnimatePresence } from 'motion/react'
import { AlertCircle, SunMoon } from 'lucide-react'

export default function SignupPage() {
  const { signup, isLoading } = useAuth()
  const { t, getLanguageFont } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [setupPasskey, setSetupPasskey] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function requestOtp(email: string) {
    const response = await fetch('/api/auth/otp/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    return response
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const response = await requestOtp(formData.email)
    if (response.ok) setShowOtpModal(true)
    else {
      const data = await response.json()
      setError(data.message)
    }
    setLoading(false)
  }

  const handleOtpVerify = async (otp: string) => {
    const success = await signup(
      formData.name,
      formData.email,
      otp,
      setupPasskey
    )

    if (success) {
      router.push('/')
    }

    return success
  }

  return (
    <div className="min-h-screen bg-uibg dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-2 items-center">
        <Button
          className="dark:bg-slate-950 bg-uibgf text-black dark:text-white border-2 border-gray-500/25 hover:bg-black/25 dark:hover:bg-white/25 transition-colors rounded py-0 h-8"
          onClick={() => {
            document.documentElement.classList.toggle('dark')
          }}
        >
          <SunMoon />
        </Button>
        <LanguageSelector />
      </div>

      <div className="bg-uibgf dark:bg-slate-900 rounded shadow-sm border-2 border-white dark:border-slate-800 p-8 w-full max-w-md">
        <div className="text-center mb-4">
          <p
            className={cn(
              'text-sm text-gray-600 dark:text-gray-100 mb-1',
              getLanguageFont(t.welcome)
            )}
          >
            <span className="text-uiacc">{t.siteName}</span> {t.welcome}
          </p>
          <h1
            className={cn(
              'text-2xl font-semibold text-gray-900 dark:text-gray-200',
              getLanguageFont(t.createAccount)
            )}
          >
            {t.createAccount}
          </h1>
        </div>

        {error && (
          <p className="text-red-500 text-sm flex items-center gap-2 justify-center">
            <AlertCircle className="h-4 w-4" />
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mb-2">
          <div>
            <label
              className={cn(
                'block text-sm font-medium text-gray-700 dark:text-gray-100 mb-0.5',
                getLanguageFont(t.enterName)
              )}
            >
              {t.enterName}
            </label>
            <Input
              type="text"
              name="name"
              placeholder={t.fullNamePlaceholder}
              value={formData.name}
              onChange={handleInputChange}
              className={cn(
                'h-12 border-gray-300 dark:border-gray-800 rounded dark:bg-slate-800',
                error && 'border-red-500',
                getLanguageFont(t.fullNamePlaceholder)
              )}
              required
            />
          </div>

          <div>
            <label
              className={cn(
                'block text-sm font-medium text-gray-700 dark:text-gray-100 mb-0.5',
                getLanguageFont(t.enterEmail)
              )}
            >
              {t.enterEmail}
            </label>
            <Input
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={handleInputChange}
              className={cn(
                'h-12 border-gray-300 dark:border-gray-800 rounded dark:bg-slate-800',
                error && 'border-red-500',
                getLanguageFont(t.emailPlaceholder)
              )}
              required
            />
          </div>

          {/* <div>
            <label
              className={cn(
                'block text-sm font-medium text-gray-700 dark:text-gray-100 mb-0.5',
                getLanguageFont(t.enterPhone)
              )}
            >
              {t.enterPhone}
            </label>
            <Input
              type="tel"
              name="phone"
              placeholder={t.phonePlaceholder}
              value={formData.phone}
              onChange={handleInputChange}
              className={cn(
                'h-12 border-gray-300 dark:border-gray-800 rounded',
                getLanguageFont(t.phonePlaceholder)
              )}
              required
            />
          </div> */}

          <div className="flex items-center bg-transparent shadow-none border-none hover:bg-transparent">
            <Input
              id="setupkey"
              type="checkbox"
              checked={setupPasskey}
              onChange={() => setSetupPasskey(!setupPasskey)}
              className="w-4 cursor-pointer accent-uiacc"
            />
            <label
              htmlFor="setupkey"
              className="text-gray-600 dark:text-gray-200 pl-2 text-sm cursor-pointer select-none"
            >
              Setup Passkey
            </label>
          </div>
          <Button
            type="submit"
            disabled={isLoading || loading}
            className={cn(
              'w-full bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium',
              getLanguageFont(t.verify)
            )}
          >
            {isLoading || loading ? t.verifying : t.verify}
          </Button>
        </form>

        <div className="text-center mb-6">
          <Link
            href="/login"
            className={cn(
              'text-uiacc hover:text-uiacchl dark:hover:text-uiacchl text-sm font-medium',
              getLanguageFont(t.alreadyHaveAccount)
            )}
          >
            {t.alreadyHaveAccount} →
          </Link>
        </div>

        <div className="relative mb-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={cn(
                'px-4 bg-uibgf dark:bg-slate-900 text-gray-500 dark:text-gray-300',
                getLanguageFont(t.orSignUp)
              )}
            >
              {t.orSignUp}
            </span>
          </div>
        </div>

        <SocialLoginButtons isSignup={true} />
      </div>

      <AnimatePresence mode="wait">
        {showOtpModal && (
          <OtpModal
            isOpen={showOtpModal}
            onClose={() => setShowOtpModal(false)}
            onVerify={handleOtpVerify}
            type="both"
            contact={formData.email}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
