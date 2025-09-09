import { finishPasskeyLogin } from '@/services/auth/passkey.service'
import { createSession } from '@/services/auth/session.service'
import { z } from 'zod'

export async function POST(req: Request) {
  const { email, assertionResponse } = z
    .object({
      email: z.string().email(),
      assertionResponse: z.any(),
    })
    .parse(await req.json())

  const user = await finishPasskeyLogin(email, assertionResponse)
  await createSession(user.id)

  return Response.json({ ok: true, user })
}
