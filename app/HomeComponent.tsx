'use client'

import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { LanguageSelector } from '@/components/language-selector'
import Link from 'next/link'

export default function HomePage() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                WordWise
              </span>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSelector />
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {t.welcome}, {user.name}
                  </span>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="text-sm bg-transparent"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      {t.login}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      {t.signUp}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6 text-balance">
            {t.welcomeHome}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
            {t.homeSubtitle}
          </p>

          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 px-8"
                >
                  {t.getStarted}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-transparent"
              >
                {t.learnMore}
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Welcome back, {user.name}!
              </h2>
              <p className="text-gray-600 mb-6">
                You're successfully logged in to WordWise.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo Account Info */}
        {!user && (
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Demo Account
            </h3>
            <p className="text-blue-700 text-sm mb-3">
              Try the demo with these credentials:
            </p>
            <div className="space-y-1 text-sm text-blue-600">
              <p>
                <strong>Email:</strong> demo@wordwise.com
              </p>
              <p>
                <strong>Phone:</strong> +91 9876543210
              </p>
              <p>
                <strong>Password:</strong> Any password
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
