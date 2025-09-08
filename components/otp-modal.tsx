"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { X, Check } from "lucide-react"

interface OtpModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => void
  type: "email" | "phone" | "both"
  contact: string
}

export function OtpModal({ isOpen, onClose, onVerify, type, contact }: OtpModalProps) {
  const { t } = useLanguage()
  const [otp, setOtp] = useState(["", "", "", ""])
  const [isVerified, setIsVerified] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (isOpen && !isVerified) {
      inputRefs.current[0]?.focus()
    }
  }, [isOpen, isVerified])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    const otpString = otp.join("")
    if (otpString.length === 4) {
      setIsVerified(true)
      setTimeout(() => {
        onVerify(otpString)
        handleClose()
      }, 1500)
    }
  }

  const handleClose = () => {
    setOtp(["", "", "", ""])
    setIsVerified(false)
    onClose()
  }

  if (!isOpen) return null

  const getTitle = () => {
    if (isVerified) {
      return type === "both" ? t.emailPhoneVerified : type === "email" ? t.emailVerified : t.phoneVerified
    }
    return t.otpSent
  }

  const getSubtitle = () => {
    if (isVerified) return ""
    return type === "email" ? t.otpSentEmail : type === "phone" ? t.otpSentPhone : t.otpSent
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={handleClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">WordWise</h2>
          <p className="text-sm text-gray-600 mb-1">{getTitle()}</p>
          {!isVerified && <p className="text-xs text-gray-500">{getSubtitle()}</p>}
        </div>

        {isVerified ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-3 justify-center mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-teal-600"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              disabled={otp.join("").length !== 4}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12"
            >
              {t.verify}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
