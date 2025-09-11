'use client'

import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { SunMoon, ChevronRight, ChevronLeft, Search, Check } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageSelector } from '@/components/language-selector'
import { cn } from '@/lib/utils'
import { RadixSelect } from '@/components/radix-select'

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
  const { t, getLanguageFont } = useLanguage()

  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [formData, setFormData] = useState({
    name: '',
    mindLanguage: '',
    state: '',
    district: '',
    occupation: '',
    passion: '',
    photo: null as File | null,
  })

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  if (user) {
    return null
  }

  console.log('direction: ', direction, 'current: ', currentStep)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, photo: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send the formData to your API
    console.log('Onboarding complete! Data:', formData)
    // After successful submission, redirect the user
    router.push('/')
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
        <Button
          onClick={() => handleSelection('mindLanguage', 'English')}
          variant={formData.mindLanguage === 'English' ? 'default' : 'outline'}
          className={cn(
            'h-12 justify-center font-normal dark:text-gray-200 font-english flex-1',
            formData.mindLanguage === 'English'
              ? 'bg-uiacc hover:bg-uiacchl text-white'
              : 'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 hover:bg-gray-100 dark:hover:bg-slate-800/50'
          )}
        >
          English
        </Button>
        <Button
          onClick={() => handleSelection('mindLanguage', 'Kannada')}
          variant={formData.mindLanguage === 'Kannada' ? 'default' : 'outline'}
          className={cn(
            'h-12 justify-center font-normal dark:text-gray-200 font-kannada flex-1',
            formData.mindLanguage === 'Kannada'
              ? 'bg-uiacc hover:bg-uiacchl text-white'
              : 'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 hover:bg-gray-100 dark:hover:bg-slate-800/50'
          )}
        >
          ಕನ್ನಡ
        </Button>
        <Button
          onClick={() => handleSelection('mindLanguage', 'Telugu')}
          variant={formData.mindLanguage === 'Telugu' ? 'default' : 'outline'}
          className={cn(
            'h-12 justify-center font-normal dark:text-gray-200 font-telugu flex-1',
            formData.mindLanguage === 'Telugu'
              ? 'bg-uiacc hover:bg-uiacchl text-white'
              : 'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 hover:bg-gray-100 dark:hover:bg-slate-800/50'
          )}
        >
          తెలుగు
        </Button>
        <Button
          onClick={() => handleSelection('mindLanguage', 'Hindi')}
          variant={formData.mindLanguage === 'Hindi' ? 'default' : 'outline'}
          className={cn(
            'h-12 justify-center font-normal dark:text-gray-200 font-devanagari flex-1',
            formData.mindLanguage === 'Hindi'
              ? 'bg-uiacc hover:bg-uiacchl text-white'
              : 'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 hover:bg-gray-100 dark:hover:bg-slate-800/50'
          )}
        >
          हिंदी
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
            variant="outline"
            className={cn(
              'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 h-12 rounded font-medium',
              getLanguageFont(t.back)
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
          </Button>
          <Button
            type="submit"
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
          className={cn(
            'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 h-12 rounded font-medium',
            getLanguageFont(t.back)
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
        </Button>
        <Button
          onClick={() => handleSelection('occupation', formData.occupation)}
          disabled={formData.occupation === ''}
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
          variant="outline"
          className={cn(
            'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 h-12 rounded font-medium',
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
          disabled={formData.passion === ''}
          className={cn(
            'flex-1 sm:w-2/3 bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium order-1 sm:order-2',
            getLanguageFont(t.next)
          )}
        >
          {t.next} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
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
      <div className="">
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
      <form onSubmit={handleSubmit} className="space-y-2 mt-6">
        <div>
          <label
            className={cn(
              'block text-sm font-medium text-gray-700 dark:text-gray-300',
              getLanguageFont(t.onboarding.yourPhoto)
            )}
          >
            {t.onboarding.yourPhoto}
          </label>
          <Input
            type="file"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
            className={cn(
              'h-12 border-gray-300 dark:border-gray-800 rounded dark:bg-slate-800 pt-2'
            )}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2">
          <Button
            type="button"
            onClick={handlePreviousStep}
            variant="outline"
            className={cn(
              'border-gray-300 dark:border-gray-800 bg-transparent dark:bg-slate-950/25 h-12 rounded font-medium order-2 sm:order-1',
              getLanguageFont(t.back)
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
          </Button>
          <Button
            type="submit"
            className={cn(
              'flex-1 sm:w-2/3 bg-uiacc hover:bg-uiacchl text-white h-12 rounded font-medium order-1 sm:order-2',
              getLanguageFont(t.complete)
            )}
          >
            {t.complete}
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
            'text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-2',
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
            <img
              src="/onboarding.png"
              alt="Onboarding visual"
              className="h-full w-full object-cover"
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
