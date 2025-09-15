import { startPasskeyLogin } from '@/services/auth/passkey.service'
import { z } from 'zod'

export async function POST(req: Request) {
  const { email } = z
    .object({ email: z.string().email() })
    .parse(await req.json())
  const { options, hasPasskeys } = await startPasskeyLogin(email)
  // Always return options (even if user not found) to avoid user enumeration
  return Response.json({
    hasPasskeys,
    options: hasPasskeys ? options : null,
  })
}
