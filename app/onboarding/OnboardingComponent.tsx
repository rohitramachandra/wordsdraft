'use client'

import axios from 'axios'
import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { SunMoon, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageSelector } from '@/components/language-selector'
import { cn } from '@/lib/utils'
import { RadixSelect } from '@/components/radix-select'
import { genders, languages } from '@/lib/select-options'

// Card data for the occupation and passion steps
const OCCUPATIONS = [
  'Teacher',
  'Nurse',
  'Manager',
  'Coder',
  'Startup',
  'Student',
  'Driver',
  'Govt Employee',
  'Self Employed',
  'Doctor',
  'Professor',
  'Private Sector',
  'Scientist',
]

const PASSIONS = [
  'Journalist',
  'Professor',
  'Teacher',
  'Designer',
  'Entrepreneur',
  'Scientist',
  'Historian',
  'Architect',
  'Writer',
  'Translator',
  'Film Maker',
  'Critic',
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { t, getLanguageFont, language } = useLanguage()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [isUploading, setIsUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [formData, setFormData] = useState({
    name: '',
    mindLanguage: '',
    state: '',
    district: '',
    occupation: '',
    passion: '',
    gender: '',
    day: '',
    month: '',
    year: '',
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [uploadedS3URL, setUploadedS3URL] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const avatars = {
    MALE: [
      'https://avatar.iran.liara.run/public/48',
      'https://avatar.iran.liara.run/public/37',
      'https://avatar.iran.liara.run/public/15',
      'https://avatar.iran.liara.run/public/3',
    ],
    FEMALE: [
      'https://avatar.iran.liara.run/public/75',
      'https://avatar.iran.liara.run/public/78',
      'https://avatar.iran.liara.run/public/91',
      'https://avatar.iran.liara.run/public/83',
    ],
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fd = new FormData()
      fd.append('photo', file)

      // Show a local preview immediately
      setPreviewUrl(URL.createObjectURL(file))
      setSelectedAvatar(null)

      // Set uploading state to true
      setIsUploading(true)

      try {
        const response = await axios.post('/api/user/di-upload', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        const data = response.data
        setUploadedS3URL(data.s3Url)
      } catch (error) {
        console.error('Upload error:', error)
      } finally {
        // Set uploading state to false
        setIsUploading(false)
      }
    }
  }

  const handleAvatarSelect = (avatar: string) => {
    setUploadedS3URL(null)
    setSelectedAvatar(avatar)
    setPreviewUrl(avatar)
  }

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }

    if (user?.onboardAt) router.push('/')
  }, [user, router])

  if (!user) {
    return null
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    setDirection(1)
    setCurrentStep((prev) => prev + 1)
  }

  const handlePreviousStep = () => {
    setDirection(-1)
    setCurrentStep((prev) => prev - 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelection = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setCurrentStep((prev) => prev + 1)
  }

  const handleStep0Selection = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (
      formData.day !== '' &&
      formData.month !== '' &&
      formData.year !== '' &&
      formData.gender !== ''
    )
      setCurrentStep((prev) => prev + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await axios.post('/api/user/onboarding', {
        ...formData,
        photo: uploadedS3URL ?? selectedAvatar ?? '',
      })

      const data = res.data
      console.log(data)

      router.push('/home')
    } catch (err) {
      console.error('Onboarding error:', err)
    } finally {
      setLoading(false)
    }
  }

  const stepComponents = [
    // Step 1: Mind Language
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
      transition={{ duration: 0.3 }}
      className="card-container mt-14 w-full"
    >
      <div className="">
        <h2
          className={cn(
            'text-lg font-medium text-gray-600 dark:text-gray-400 mb-2',
            getLanguageFont(t.onboarding.mindLanguage)
          )}
        >
          {t.onboarding.mindLanguage}
        </h2>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        {languages.map((lang) => (
          <Button
            key={lang.key}
            disabled={loading}
            onClick={() => handleSelection('mindLanguage', lang.key)}
            variant={formData.mindLanguage === lang.key ? 'default' : 'outline'}
            className={cn(
              'h-12 justify-center font-normal dark:text-gray-200 font-english flex-1',
              getLanguageFont(lang.native),
              formData.mindLanguage === lang.key
                ? 'bg-uiacc hover:bg-uiacchl text-white'
                : 'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 hover:bg-gray-100 dark:hover:bg-slate-800/50'
            )}
          >
            {lang.native}
          </Button>
        ))}
      </div>
      <div className="flex justify-between gap-2 mt-2">
        <Button
          type="button"
          onClick={handlePreviousStep}
          disabled={loading}
          variant="outline"
          className={cn(
            'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 dark:hover:bg-slate-900 h-12 rounded font-medium',
            getLanguageFont(t.back)
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
        </Button>
        <Button
          onClick={(e) => {
            if (formData.mindLanguage !== '') handleNextStep(e)
          }}
          disabled={formData.mindLanguage === '' || loading}
          className={cn(
            'flex-1 sm:w-2/3 bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium',
            getLanguageFont(t.next)
          )}
        >
          {t.next} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>,

    // Step 2: Location
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
      transition={{ duration: 0.3 }}
      className="card-container mt-14 w-full"
    >
      <div className="">
        <h2
          className={cn(
            'text-lg font-medium text-gray-600 dark:text-gray-400 mb-2',
            getLanguageFont(t.onboarding.whereAreYouFrom)
          )}
        >
          {t.onboarding.whereAreYouFrom}
        </h2>
      </div>
      <form onSubmit={handleNextStep}>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            name="state"
            disabled={loading}
            value={formData.state}
            onChange={handleInputChange}
            placeholder={t.onboarding.statePlaceholder}
            className={cn(
              'h-12 border-gray-300 dark:border-gray-800 rounded dark:bg-slate-800',
              getLanguageFont(t.onboarding.statePlaceholder)
            )}
            required
          />
          <Input
            type="text"
            name="district"
            disabled={loading}
            value={formData.district}
            onChange={handleInputChange}
            placeholder={t.onboarding.districtPlaceholder}
            className={cn(
              'h-12 border-gray-300 dark:border-gray-800 rounded dark:bg-slate-800',
              getLanguageFont(t.onboarding.districtPlaceholder)
            )}
            required
          />
        </div>
        <div className="flex justify-between gap-2 mt-2">
          <Button
            type="button"
            onClick={handlePreviousStep}
            disabled={loading}
            variant="outline"
            className={cn(
              'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 dark:hover:bg-slate-900 h-12 rounded font-medium',
              getLanguageFont(t.back)
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
          </Button>
          <Button
            type="submit"
            disabled={
              formData.district === '' || formData.state === '' || loading
            }
            className={cn(
              'flex-1 sm:w-2/3 bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium',
              getLanguageFont(t.next)
            )}
          >
            {t.next} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>,

    // Step 3: Occupation
    <motion.div
      key="step-3"
      initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
      transition={{ duration: 0.3 }}
      className="card-container  w-full mt-14"
    >
      <div className="">
        <h2
          className={cn(
            'text-lg font-medium text-gray-600 dark:text-gray-400',
            getLanguageFont(t.onboarding.whoYouAre)
          )}
        >
          {t.onboarding.whoYouAre}
        </h2>
      </div>

      <div className={cn('mb-2', getLanguageFont(t.onboarding.passionPrompt))}>
        <RadixSelect
          options={OCCUPATIONS}
          value={formData.occupation}
          onChange={(val) => handleSelection('occupation', val)}
          placeholder={t.onboarding.occupationPrompt}
        />
      </div>

      <div className="flex justify-start mt-2 gap-2">
        <Button
          type="button"
          onClick={handlePreviousStep}
          variant="outline"
          disabled={loading}
          className={cn(
            'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 dark:hover:bg-slate-900 h-12 rounded font-medium',
            getLanguageFont(t.back)
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
        </Button>
        <Button
          onClick={() => handleSelection('occupation', formData.occupation)}
          disabled={formData.occupation === '' || loading}
          className={cn(
            'flex-1 sm:w-2/3 bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium order-1 sm:order-2',
            getLanguageFont(t.next)
          )}
        >
          {t.next} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>,

    // Step 4: Passion
    <motion.div
      key="step-4"
      initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
      transition={{ duration: 0.3 }}
      className="card-container  w-full mt-14"
    >
      <div className="">
        <h2
          className={cn(
            'text-lg font-medium text-gray-600 dark:text-gray-400',
            getLanguageFont(t.onboarding.whoYouReallyAre)
          )}
        >
          {t.onboarding.whoYouReallyAre}
        </h2>
      </div>

      <div className={cn('mb-2', getLanguageFont(t.onboarding.passionPrompt))}>
        <RadixSelect
          options={PASSIONS}
          value={formData.passion}
          onChange={(val) => handleSelection('passion', val)}
          placeholder={t.onboarding.passionPrompt}
        />
      </div>

      <div className="flex justify-start mt-2 gap-2">
        <Button
          type="button"
          onClick={handlePreviousStep}
          disabled={loading}
          variant="outline"
          className={cn(
            'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 dark:hover:bg-slate-900 h-12 rounded font-medium',
            getLanguageFont(t.back)
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
        </Button>
        <Button
          onClick={() =>
            formData.passion !== '' &&
            handleSelection('passion', formData.passion)
          }
          disabled={formData.passion === '' || loading}
          className={cn(
            'flex-1 sm:w-2/3 bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium order-1 sm:order-2',
            getLanguageFont(t.next)
          )}
        >
          {t.next} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>,

    // Step 0: Personal Info
    <motion.div
      key="step-0"
      initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
      transition={{ duration: 0.3 }}
      className="card-container mt-14 w-full"
    >
      <div>
        {/* Gender */}
        <h2
          className={cn(
            'text-lg font-medium text-gray-600 dark:text-gray-400 mb-2',
            getLanguageFont(t.gender)
          )}
        >
          {t.gender}
        </h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {genders.map((gender) => (
            <Button
              key={gender.key}
              disabled={loading}
              onClick={() => handleStep0Selection('gender', gender.key)}
              className={cn(
                'h-12 justify-center font-normal text-gray-900 dark:text-gray-200 flex-1',
                getLanguageFont(gender[language]),
                formData.gender === gender.key
                  ? 'bg-uiacc hover:bg-uiacchl text-white'
                  : 'border border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 hover:bg-gray-100 dark:hover:bg-slate-800/50'
              )}
            >
              {gender[language]}
            </Button>
          ))}
        </div>

        {/* Date of Birth */}
        <h2
          className={cn(
            'text-lg font-medium text-gray-600 dark:text-gray-400 mb-2',
            getLanguageFont(t.dob)
          )}
        >
          {t.dob}
        </h2>
        <div className="flex gap-3 mb-4">
          {/* Day */}
          <RadixSelect
            options={Array.from({ length: 31 }, (_, i) => String(i + 1))}
            value={formData.day || ''}
            onChange={(val) => handleStep0Selection('day', val)}
            placeholder="Day"
          />

          {/* Month */}
          <RadixSelect
            options={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
            value={formData.month || ''}
            onChange={(val) => handleStep0Selection('month', val)}
            placeholder="Month"
          />

          {/* Year */}
          <RadixSelect
            options={Array.from({ length: 100 }, (_, i) =>
              String(new Date().getFullYear() - i)
            )}
            value={formData.year || ''}
            onChange={(val) => handleStep0Selection('year', val)}
            placeholder="Year"
          />
        </div>

        <div className="flex justify-between gap-2 mt-2">
          <Button
            onClick={(e) => {
              if (
                formData.gender !== '' &&
                formData.day !== '' &&
                formData.month !== '' &&
                formData.year !== ''
              )
                handleNextStep(e)
            }}
            disabled={
              formData.gender === '' ||
              formData.day === '' ||
              formData.month === '' ||
              formData.year === '' ||
              loading
            }
            className={cn(
              'flex-1 sm:w-2/3 bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium',
              getLanguageFont(t.next)
            )}
          >
            {t.next} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>,

    // Step 5: Photo and Submission
    <motion.div
      key="step-5"
      initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
      transition={{ duration: 0.3 }}
      className="card-container mt-14 w-full"
    >
      <div>
        <h2
          className={cn(
            'text-lg font-medium text-gray-600 dark:text-gray-400',
            getLanguageFont(t.onboarding.yourPhotoQuestion)
          )}
        >
          {t.onboarding.yourPhotoQuestion}
        </h2>
        <p
          className={cn(
            'text-sm text-gray-500 dark:text-gray-500',
            getLanguageFont(t.onboarding.yourPhotoDetails)
          )}
        >
          {t.onboarding.yourPhotoDetails}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          name="photo"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Preview / Upload Circle */}
        <div className="flex justify-start px-2">
          <button
            type="button"
            disabled={loading || isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="relative group h-18 w-18 rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700 hover:ring-uiacc transition"
          >
            {/* Loading Overlay */}
            {isUploading && (
              <div className="absolute rounded-full inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              </div>
            )}

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  'flex items-center justify-center h-full w-full bg-gray-100 dark:bg-slate-800 text-gray-500',
                  getLanguageFont(t.onboarding.uploadPhoto)
                )}
              >
                <span className="text-xs">{t.onboarding.uploadPhoto}</span>
              </div>
            )}

            {/* Overlay on hover */}
            <div
              className={cn(
                'absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition',
                getLanguageFont(t.onboarding.changePhoto)
              )}
            >
              {t.onboarding.changePhoto}
            </div>
          </button>
        </div>

        {/* Avatar Selection */}
        <div>
          <span
            className={cn(
              'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2',
              getLanguageFont(t.onboarding.chooseAvatar)
            )}
          >
            {t.onboarding.chooseAvatar}
          </span>
          <div className="flex gap-3 flex-wrap px-4">
            {(formData.gender !== 'OTHERS'
              ? formData.gender === 'MALE'
                ? avatars['MALE']
                : avatars['FEMALE']
              : [
                  ...avatars['MALE'].slice(0, 3),
                  ...avatars['FEMALE'].slice(0, 3),
                ]
            ).map((avatar, idx) => (
              <button
                type="button"
                key={avatar}
                onClick={() => handleAvatarSelect(avatar)}
                className={cn(
                  'relative h-12 w-12 rounded-full overflow-hidden border-2 hover:scale-110 hover:rotate-3 transition-transform duration-200',
                  selectedAvatar === avatar
                    ? 'border-uiacc ring-2 ring-uiacc'
                    : 'border-gray-300 dark:border-gray-700'
                )}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
          <Button
            type="button"
            disabled={loading}
            onClick={handlePreviousStep}
            variant="outline"
            className={cn(
              'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 dark:hover:bg-slate-900 h-12 rounded font-medium order-2 sm:order-1',
              getLanguageFont(t.back)
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className={cn(
              'flex-1 sm:w-2/3 bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium order-1 sm:order-2',
              getLanguageFont(t.complete)
            )}
          >
            {loading ? t.verifying : t.complete}
          </Button>
        </div>
      </form>
    </motion.div>,
  ]

  return (
    <div className="min-h-screen bg-uibg dark:bg-slate-950 flex flex-col items-center justify-center p-4">
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

      <div className="text-center py-6 px-4">
        <h1
          className={cn(
            'text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-2 underline decoration-wavy decoration-uiacc decoration-2',
            getLanguageFont(t.onboarding.title)
          )}
        >
          {t.onboarding.title}
        </h1>
        <p
          className={cn(
            'text-sm text-gray-600 dark:text-gray-400',
            getLanguageFont(t.onboarding.subtitle)
          )}
        >
          {t.onboarding.subtitle}
        </p>
      </div>

      <div className="w-full h-full max-w-5xl rounded overflow-hidden border-2 border-white dark:border-slate-800 p-1 shadow-sm bg-gradient-to-r from-uibgf/25 to-uibgf dark:from-slate-900/25 dark:to-slate-900">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Hide illustration on mobile */}
          <div className="h-auto w-full rounded-l overflow-hidden relative hidden md:block md:w-1/2">
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
              src="/onboarding.png"
              alt="Onboarding visual"
              className="h-full w-full object-cover dark:mix-blend-soft-light"
            />
          </div>
          <div className="bg-transparent dark:bg-transparent rounded-r p-2 md:p-8 w-full md:w-1/2">
            <div className="flex justify-center items-center gap-2 mb-2">
              {stepComponents.map((_, index) => (
                <div
                  key={`step-marker-${index}`}
                  className={cn(
                    'h-2 rounded-full mt-8 cursor-pointer transition-all',
                    index <= currentStep
                      ? 'bg-uiacc w-1/5 dark:bg-uiacc'
                      : 'bg-gray-300 w-1/5 dark:bg-gray-700'
                  )}
                  onClick={() => {
                    if (index < currentStep) {
                      setCurrentStep(index)
                    }
                  }}
                />
              ))}
            </div>
            <div className="flex items-start justify-start pt-6 overflow-hidden min-h-[24rem] w-full sm:h-[30rem]">
              <AnimatePresence mode="wait">
                {stepComponents[currentStep]}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
