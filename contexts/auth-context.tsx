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
  login: (email: string, password: string) => Promise<boolean>
  signup: (
    name: string,
    email: string,
    //phone: string,
    password: string
  ) => Promise<boolean>
  logout: () => void
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

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true)

    const user = await loginWithPasskey(email)

    if (user) {
      setUser(user)
      setIsLoading(false)
      return true
    } else {
      setUser(null)
      setIsLoading(false)
      return false
    }
  }

  const signup = async (
    name: string,
    email: string,
    //phone: string,
    code: string
  ): Promise<boolean> => {
    setIsLoading(true)

    const verifyOTP = await fetch('/api/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    })

    console.log(verifyOTP)
    if (verifyOTP.ok) {
      console.log('Success calling setupPassKey()')
      const { id } = await verifyOTP.json()
      await setupPasskey(email, id)
    }

    setIsLoading(false)
    return true
  }

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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
