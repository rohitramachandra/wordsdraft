import { COOKIE } from '@/nextConstants'
import { getSessionUser } from '@/services/auth/session.service'
import { updateUserOnboarding } from '@/services/auth/user.service'
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

    // Build the dob properly from day/month/year
    const dob =
      body.day && body.month && body.year
        ? new Date(`${body.year}-${body.month}-${body.day}`)
        : null

    const updatedUser = await updateUserOnboarding(session.user.email, {
      gender: body.gender.toUpperCase(),
      dob: dob,
      language: body.mindLanguage.toUpperCase(),
      district: body.district,
      state: body.state,
      occupation: body.occupation,
      passion: body.passion,
      dImage: body.photo ?? body.selectedAvatar ?? '',
    })

    return NextResponse.json({ user: updatedUser })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
