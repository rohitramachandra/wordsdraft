'use client'

import { loginWithPasskey, setupPasskey } from '@/lib/passkey.auth'
import { User } from '@prisma/client'
import axios from 'axios'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

interface AuthContextType {
  user: User | null
  refreshUser: () => Promise<void>
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

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/me')
      setUser(res.data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const refreshUser = async () => {
    setIsLoading(true)
    await fetchUser()
  }

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

    try {
      const res = await axios.post('/api/auth/otp/login-verify', {
        email,
        code,
      })
      const { user } = res.data
      setUser(user)
      return true
    } catch (error) {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    name: string,
    email: string,
    code: string,
    setupkey: boolean = false
  ): Promise<boolean> => {
    setIsLoading(true)

    try {
      const res = await axios.post('/api/auth/otp/verify', {
        name,
        email,
        code,
      })
      const { user } = res.data

      if (setupkey) {
        try {
          await setupPasskey(email, user.id)
        } catch (err) {
          console.error('Pass key setup failed')
        }
      }

      setUser(user)
      return true
    } catch (error) {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshUser,
        login,
        signup,
        logout,
        login_confirm,
        isLoading,
      }}
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
