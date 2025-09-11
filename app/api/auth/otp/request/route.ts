import { issueOTP } from '@/services/auth/otp.service'
import { rateLimit } from '@/utils/rateLimit'
import { z } from 'zod'
import { sendEmail } from '@/utils/email'
import { checkUserExists } from '@/services/auth/user.service'

export async function POST(req: Request) {
  const { email } = z
    .object({ email: z.string().email() })
    .parse(await req.json())

  await rateLimit(`otp:req:${email}`, 5, 300)

  const userExists = await checkUserExists(email)

  if (userExists)
    return Response.json({ message: 'User already exists' }, { status: 400 })

  const { code, expiresAt } = await issueOTP(
    email,
    req.headers.get('x-forwarded-for') ?? undefined,
    req.headers.get('user-agent') ?? undefined
  )

  // Never log or return the code; send via email/SMS provider.
  await sendEmail(email, `Your login code: ${code}. Expires in 5 minutes.`)
  return Response.json({ ok: true, expiresAt })
}
