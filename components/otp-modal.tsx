'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/language-context'
import { X, Check, RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface OtpModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => Promise<boolean>
  type: 'email' | 'phone' | 'both'
  contact: string
}

export function OtpModal({
  isOpen,
  onClose,
  onVerify,
  type,
  contact,
}: OtpModalProps) {
  const { t, getLanguageFont } = useLanguage()
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join('')
    if (otpString.length === 4) {
      setIsLoading(true)

      try {
        // let parent handle actual API verification
        const success = await onVerify(otpString)

        if (success) {
          setIsVerified(true)
          setTimeout(() => {
            handleClose()
          }, 1500) // give user a moment to see success animation
        } else {
          // reset and maybe show error
          setOtp(['', '', '', ''])
          inputRefs.current[0]?.focus()
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleClose = () => {
    setOtp(['', '', '', ''])
    setIsVerified(false)
    onClose()
  }

  const getTitle = () => {
    if (isVerified) {
      return type === 'both'
        ? t.emailPhoneVerified
        : type === 'email'
        ? t.emailVerified
        : t.phoneVerified
    }
    return t.otpSent
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        transition={{ duration: 0.2 }}
        className="bg-uiacc/25 border-2 border-uiacc/50 p-1 backdrop-blur-sm w-full max-w-md rounded"
      >
        <div className="bg-white dark:bg-slate-900 rounded p-6 w-full max-w-md relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-2">
              WordsMyth
            </h2>
            <p
              className={cn(
                'text-sm text-gray-600 dark:text-gray-400 mb-1',
                getLanguageFont(getTitle())
              )}
            >
              {getTitle()}
            </p>
          </div>

          {isVerified ? (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="h-8 w-8 text-green-600" />
              </motion.div>
            </div>
          ) : (
            <>
              <div className="flex gap-3 justify-center mb-6 w-full">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-teal-600 rounded"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerify}
                disabled={otp.join('').length !== 4 || isLoading}
                className={cn(
                  'w-full bg-uiacc hover:bg-uiacchl text-white h-12',
                  getLanguageFont(t.verify)
                )}
              >
                {isLoading ? (
                  <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t.verify
                )}
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
