"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSelector } from "@/components/language-selector"
import { SocialLoginButtons } from "@/components/social-login-buttons"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const { t, getLanguageFont } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [validationError, setValidationError] = useState("")

  const validateInput = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?[\d\s-()]+$/

    if (!value) return ""

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return `${t.pleaseEnterValid} ${t.emailAddress} ${t.phoneNumber}`
    }

    return ""
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "emailOrPhone") {
      const validation = validateInput(value)
      setValidationError(validation)
    }

    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateInput(formData.emailOrPhone)
    if (validation) {
      setValidationError(validation)
      return
    }

    const success = await login(formData.emailOrPhone, formData.password)

    if (success) {
      router.push("/")
    } else {
      setError("Invalid credentials. Try demo@wordwise.com or +91 9876543210")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <p className={cn("text-sm text-gray-600 mb-2", getLanguageFont(t.welcome))}>
            {t.welcome} <span className="text-teal-600 font-medium">World of Wise</span>
          </p>
          <h1 className={cn("text-2xl font-semibold text-gray-900", getLanguageFont(t.loginToAccount))}>
            {t.loginToAccount}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
          <div>
            <label className={cn("block text-sm font-medium text-gray-700 mb-2", getLanguageFont(t.enterMobileEmail))}>
              {t.enterMobileEmail}
            </label>
            <Input
              type="text"
              name="emailOrPhone"
              placeholder="Email address / Mobile number"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              className={cn("h-12 border-gray-300 rounded-lg", validationError || error ? "border-red-500" : "")}
              required
            />
            {validationError && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {validationError}
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading || !!validationError}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 rounded-lg font-medium"
          >
            {isLoading ? "Logging in..." : t.login}
          </Button>
        </form>

        <div className="text-center mb-6">
          <Link href="/signup" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            {t.createNewAccount} →
          </Link>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or Login with Social accounts</span>
          </div>
        </div>

        <SocialLoginButtons isSignup={false} />
      </div>
    </div>
  )
}
