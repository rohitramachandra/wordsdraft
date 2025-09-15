import { cookies } from 'next/headers'
import { COOKIE } from '@/nextConstants'
import { NextResponse } from 'next/server'
import { clearCookie } from '@/lib/cookies'
import { destroySession } from '@/services/auth/session.service'

export async function POST() {
  const cookie = await cookies()
  const value = cookie.get(COOKIE)?.value ?? null
  if (value) {
    await destroySession(value)
    const res = NextResponse.json({ ok: true })
    clearCookie(res)
    return res
  }
}
