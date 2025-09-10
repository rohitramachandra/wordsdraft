'use client'

import { loginWithPasskey, setupPasskey } from '@/lib/passkey.auth'
import { User } from '@prisma/client'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

interface AuthContextType {
  user: User | null
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; otp: boolean }>
  signup: (
    name: string,
    email: string,
    password: string,
    setupkey?: boolean
  ) => Promise<boolean>
  logout: () => void
  login_confirm: (email: string, code: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  session_user,
  children,
}: {
  session_user: User | null
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(session_user)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  const login = async (
    email: string
  ): Promise<{ success: boolean; otp: boolean }> => {
    setIsLoading(true)

    const { type, status, user } = await loginWithPasskey(email)

    if (status === 'success') {
      if (type === 'otp') {
        setIsLoading(false)
        return { success: true, otp: true }
      } else if (type === 'passkey' && user) {
        setUser(user)
        setIsLoading(false)
        return { success: true, otp: false }
      }
    }

    setUser(null)
    setIsLoading(false)
    return { success: false, otp: false }
  }

  const login_confirm = async (
    email: string,
    code: string
  ): Promise<boolean> => {
    setIsLoading(true)

    const verifyOTP = await fetch('/api/auth/otp/login-verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    })

    if (verifyOTP.ok) {
      const { user } = await verifyOTP.json()
      setUser(user)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (
    name: string,
    email: string,
    code: string,
    setupkey: boolean = false
  ): Promise<boolean> => {
    setIsLoading(true)

    const verifyOTP = await fetch('/api/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ name, email, code }),
    })

    if (verifyOTP.ok) {
      const { user } = await verifyOTP.json()
      if (setupkey) await setupPasskey(email, user.id)
      setUser(user)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, login_confirm, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
