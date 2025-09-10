import { z } from 'zod'
import { consumeOtp } from '@/services/auth/otp.service'
import { getUserByEmail } from '@/services/auth/user.service'
import { NextResponse } from 'next/server'
import { createSession } from '@/services/auth/session.service'
import { setHttpOnlyCookie } from '@/lib/cookies'
import { COOKIE } from '@/nextConstants'

export async function POST(req: Request) {
  const { email, code } = z
    .object({
      email: z.string().email(),
      code: z.string().length(4),
    })
    .parse(await req.json())

  const ok = await consumeOtp(email, code)
  if (!ok)
    return new NextResponse(
      JSON.stringify({ error: 'Invalid or expired code' }),
      {
        status: 400,
      }
    )

  const user = await getUserByEmail(email)
  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    })
  }

  // Get IP + User-Agent
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('cf-connecting-ip') ||
    ''
  const ua = req.headers.get('user-agent') || ''
  const session = await createSession(user.id, ip, ua)

  const res = NextResponse.json({ ok: true, user })
  await setHttpOnlyCookie(COOKIE, session.id, session.expiresAt, res)

  return res
}
