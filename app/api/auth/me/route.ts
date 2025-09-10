import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/utils/db'
import { COOKIE } from '@/nextConstants'

export async function GET() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (!cookie) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const session = await prisma.session.findUnique({
    where: { id: cookie },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  return NextResponse.json({ user: session.user })
}
