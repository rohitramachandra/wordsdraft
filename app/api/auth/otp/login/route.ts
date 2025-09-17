import { issueOTP } from '@/services/auth/otp.service'
import { rateLimit } from '@/utils/rateLimit'
import { z } from 'zod'
import { sendHTMLMail } from '@/services/email/email.service'
import { getUserByEmail } from '@/services/user/user.service'

export async function POST(req: Request) {
  const { email } = z
    .object({ email: z.string().email() })
    .parse(await req.json())

  await rateLimit(`otp:req:${email}`, 5, 300)

  const { code, expiresAt } = await issueOTP(
    email,
    req.headers.get('x-forwarded-for') ?? undefined,
    req.headers.get('user-agent') ?? undefined
  )

  const user = await getUserByEmail(email)
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    })
  }

  // Never log or return the code; send via email/SMS provider.
  await sendHTMLMail({
    to: email,
    subject: 'OTP for WordsMyth login',
    template: 'login',
    data: { otp: code },
  })
  return Response.json({ ok: true, expiresAt })
}
