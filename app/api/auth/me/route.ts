import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/utils/db'
import { COOKIE } from '@/nextConstants'
import { getSessionUser } from '@/services/auth/session.service'

export async function GET() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (!cookie) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const session = await getSessionUser(cookie)

  if (!session) return NextResponse.json({ user: null }, { status: 401 })

  return NextResponse.json({ user: session.user })
}
