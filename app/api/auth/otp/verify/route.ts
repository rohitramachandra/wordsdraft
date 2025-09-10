import { z } from 'zod'
import { consumeOtp } from '@/services/auth/otp.service'
import { findOrCreateUserByEmail } from '@/services/auth/user.service'

export async function POST(req: Request) {
  const { email, code } = z
    .object({
      email: z.string().email(),
      code: z.string().length(4),
    })
    .parse(await req.json())

  const ok = await consumeOtp(email, code)
  if (!ok)
    return new Response(JSON.stringify({ error: 'Invalid or expired code' }), {
      status: 400,
    })

  const user = await findOrCreateUserByEmail(email)
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    })
  }
  return Response.json({ ok: true, id: user.id })
}
