import { COOKIE } from '@/nextConstants'
import { getSessionUser } from '@/services/auth/session.service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function guardGuest() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (!cookie) redirect('/login')
  const session = await getSessionUser(cookie)
  if (!session) redirect('/login')
}

export async function guardLoggedIn() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (cookie) {
    const session = await getSessionUser(cookie)
    if (session) redirect('/')
  }
}

export async function guardOnboarded() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (!cookie) redirect('/login')
  const session = await getSessionUser(cookie)
  if (!session) redirect('/login')

  if (session.user.onboardAt) redirect('/')
}

export async function guardNonOnboarded() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (!cookie) redirect('/login')
  const session = await getSessionUser(cookie)
  if (!session) redirect('/login')

  if (!session.user.onboardAt) redirect('/onboarding')
}
