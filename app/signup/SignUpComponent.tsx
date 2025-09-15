'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
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
import axios from 'axios'

export default function SignupPage() {
  const { signup, isLoading, user } = useAuth()
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
    try {
      const response = await axios.post('/api/auth/otp/request', { email })
      return response
    } catch (error) {
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await requestOtp(formData.email)
      setShowOtpModal(true)
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data?.message || 'Something went wrong')
      } else {
        setError('Network error, please try again')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleOtpVerify = async (otp: string) => {
    const success = await signup(
      formData.name,
      formData.email,
      otp,
      setupPasskey
    )

    if (success) {
      router.push('/onboarding')
    }

    return success
  }

  useEffect(() => {
    if (user) {
      if (user.onboardAt) router.push('/')
      else router.push('/onboarding')
    }
  }, [user])

  if (user) return null

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

      <div className="flex items-center w-full h-full max-w-5xl rounded overflow-hidden border-2 border-white dark:border-slate-800 p-1 shadow-sm bg-gradient-to-r from-uibgf/25 to-uibgf dark:from-slate-900/25 dark:to-slate-900">
        <div className="hidden md:block h-auto w-full rounded-l overflow-hidden relative">
          <div className="absolute flex items-center gap-2 pl-4 pt-4">
            <img
              src="Vector.png"
              alt="logo"
              className="aspect-square w-8 object-contain"
            />
            <h2
              className={cn(
                'font-black text-4xl text-uiacc',
                getLanguageFont(t.siteName)
              )}
            >
              {t.siteName}
            </h2>
          </div>
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="-ml-42 mt-6 w-42">
              <h1
                className={cn(
                  'text-2xl text-center font-bold text-uiacc',
                  getLanguageFont(t.siteName)
                )}
              >
                {t.siteName}
              </h1>
              <p
                className={cn(
                  'text-center text-black/75 font-semibold',
                  getLanguageFont(t.welcome)
                )}
              >
                {t.welcome}
              </p>
            </div>
          </div>
          <img
            src="/signup.png"
            alt=""
            className="h-full object-cover dark:mix-blend-soft-light"
          />
        </div>
        <div className="bg-transparent dark:bg-transparent rounded-r p-2 md:p-8 w-full max-w-md">
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
                className={cn(
                  'text-gray-600 dark:text-gray-200 pl-2 text-sm cursor-pointer select-none',
                  getLanguageFont(t.setPasskey)
                )}
              >
                {t.setPasskey}
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
