"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Dummy user for testing
const DUMMY_USER = {
  id: "1",
  name: "John Doe",
  email: "demo@wordwise.com",
  phone: "+91 9876543210",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("wordwise_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dummy authentication - accept demo@wordwise.com with any password
    if (email === "demo@wordwise.com" || email === "+91 9876543210") {
      setUser(DUMMY_USER)
      localStorage.setItem("wordwise_user", JSON.stringify(DUMMY_USER))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    }

    setUser(newUser)
    localStorage.setItem("wordwise_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("wordwise_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
