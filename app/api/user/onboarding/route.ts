import { COOKIE } from '@/nextConstants'
import { getSessionUser } from '@/services/auth/session.service'
import { completeOnboarding } from '@/services/user/user.service'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const cookie = (await cookies()).get(COOKIE)?.value
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const session = await getSessionUser(cookie)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    const updatedUser = await completeOnboarding(session.user.email, body)

    return NextResponse.json({ user: updatedUser })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
