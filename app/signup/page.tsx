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
import { OtpModal } from "@/components/otp-modal"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function SignupPage() {
  const { signup, isLoading } = useAuth()
  const { t, getLanguageFont } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [showOtpModal, setShowOtpModal] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowOtpModal(true)
  }

  const handleOtpVerify = async (otp: string) => {
    console.log("OTP verified:", otp)
    const success = await signup(formData.name, formData.email, formData.phone, formData.password)

    if (success) {
      router.push("/")
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
          <h1 className={cn("text-2xl font-semibold text-gray-900", getLanguageFont(t.createAccount))}>
            {t.createAccount}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
          <div>
            <label className={cn("block text-sm font-medium text-gray-700 mb-2", getLanguageFont(t.enterName))}>
              {t.enterName}
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleInputChange}
              className="h-12 border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className={cn("block text-sm font-medium text-gray-700 mb-2", getLanguageFont(t.enterEmail))}>
              {t.enterEmail}
            </label>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="h-12 border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className={cn("block text-sm font-medium text-gray-700 mb-2", getLanguageFont(t.enterPhone))}>
              {t.enterPhone}
            </label>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className="h-12 border-gray-300 rounded-lg"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 rounded-lg font-medium"
          >
            {t.verify}
          </Button>
        </form>

        <div className="text-center mb-6">
          <Link href="/login" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            {t.alreadyHaveAccount} →
          </Link>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or Sign-up with Social accounts</span>
          </div>
        </div>

        <SocialLoginButtons isSignup={true} />
      </div>

      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerify}
        type="both"
        contact={formData.email}
      />
    </div>
  )
}
