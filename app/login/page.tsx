import { cookies } from 'next/headers'
import LoginPage from './LoginComponent'
import { COOKIE } from '@/nextConstants'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/services/auth/session.service'

export default async function Login() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (cookie) {
    const session = await getSessionUser(cookie)
    if (session) redirect('/')
  }

  return <LoginPage />
}
