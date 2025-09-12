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
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { AlertCircle, SunMoon } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { OtpModal } from '@/components/otp-modal'

export default function LoginPage() {
  const { login, login_confirm, isLoading, user } = useAuth()
  const { t, getLanguageFont } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')
  const [showOtpModal, setShowOtpModal] = useState(false)

  const validateInput = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?[\d\s-()]+$/

    if (!value) return ''

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return `${t.pleaseEnterValid} ${t.emailAddress} ${t.phoneNumber}`
    }

    return ''
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'emailOrPhone') {
      const validation = validateInput(value)
      setValidationError(validation)
    }

    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateInput(formData.emailOrPhone)
    if (validation) {
      setValidationError(validation)
      return
    }

    const { success, otp } = await login(
      formData.emailOrPhone,
      formData.password
    )

    if (success) {
      if (otp) setShowOtpModal(true)
      else router.push('/')
    } else {
      setError('Invalid credentials.')
    }
  }

  const handleOtpVerify = async (otp: string) => {
    const success = await login_confirm(formData.emailOrPhone, otp)
    if (success) {
      router.push('/')
    }

    return success
  }

  useEffect(() => {
    if (user) router.push('/')
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
          <img
            src="/login.png"
            alt=""
            className="h-full object-cover dark:mix-blend-soft-light"
          />
        </div>
        <div className="rounded p-2 md:p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <p
              className={cn(
                'text-sm text-gray-600 dark:text-gray-200 mb-1',
                getLanguageFont(t.welcome)
              )}
            >
              <span className="text-uiacc font-medium">{t.siteName} </span>
              {t.welcome}{' '}
            </p>
            <h1
              className={cn(
                'text-2xl font-semibold text-gray-900 dark:text-gray-100',
                getLanguageFont(t.loginToAccount)
              )}
            >
              {t.loginToAccount}
            </h1>
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center justify-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-2">
            <div>
              <label
                className={cn(
                  'block text-sm font-medium text-gray-700 dark:text-gray-100 mb-0.5',
                  getLanguageFont(t.enterMobileEmail)
                )}
              >
                {t.enterMobileEmail}
              </label>
              <Input
                type="text"
                name="emailOrPhone"
                placeholder={`${t.emailPlaceholder}`}
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                className={cn(
                  'h-12 border-gray-300 dark:border-gray-800 rounded',
                  validationError || error ? 'border-red-500' : '',
                  getLanguageFont(t.emailPlaceholder)
                )}
                required
              />
              {validationError && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {validationError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !!validationError}
              className={cn(
                'w-full bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium',
                getLanguageFont(t.login)
              )}
            >
              {isLoading ? t.loggingIn : t.login}
            </Button>
          </form>

          <div className="text-center mb-6">
            <Link
              href="/signup"
              className={cn(
                'text-uiacc hover:text-uiacchl dark:hover:text-uiacchl text-sm font-medium',
                getLanguageFont(t.createNewAccount)
              )}
            >
              {t.createNewAccount} →
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
                  getLanguageFont(t.orLogin)
                )}
              >
                {t.orLogin}
              </span>
            </div>
          </div>

          <SocialLoginButtons isSignup={false} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showOtpModal && (
          <OtpModal
            isOpen={showOtpModal}
            onClose={() => setShowOtpModal(false)}
            onVerify={handleOtpVerify}
            type="both"
            contact={formData.emailOrPhone}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
