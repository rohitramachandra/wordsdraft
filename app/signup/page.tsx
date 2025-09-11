import { cookies } from 'next/headers'
import { COOKIE } from '@/nextConstants'
import { redirect } from 'next/navigation'
import SignupPage from './SignUpComponent'
import { getSessionUser } from '@/services/auth/session.service'

export default async function SignUp() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (cookie) {
    const session = await getSessionUser(cookie)
    if (session) redirect('/')
  }

  return <SignupPage />
}
