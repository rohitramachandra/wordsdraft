import { finishPasskeyLogin } from '@/services/auth/passkey.service'
import { createSession } from '@/services/auth/session.service'
import { setHttpOnlyCookie } from '@/lib/cookies'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { COOKIE } from '@/nextConstants'

export async function POST(req: Request) {
  const { email, assertionResponse } = z
    .object({
      email: z.string().email(),
      assertionResponse: z.any(),
    })
    .parse(await req.json())

  const user = await finishPasskeyLogin(email, assertionResponse)

  // Get IP + User-Agent
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('cf-connecting-ip') ||
    ''
  const ua = req.headers.get('user-agent') || ''

  const res = NextResponse.json({ ok: true, user })
  const session = await createSession(user.id, ip, ua)

  await setHttpOnlyCookie(COOKIE, session.id, session.expiresAt, res)
  return res
}
