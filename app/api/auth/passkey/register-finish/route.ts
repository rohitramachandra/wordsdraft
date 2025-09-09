import { finishPasskeyRegistration } from '@/services/auth/passkey.service'
import { createSession } from '@/services/auth/session.service'
import { z } from 'zod'

export async function POST(req: Request) {
  const { userId, attestationResponse } = z
    .object({
      userId: z.string(),
      attestationResponse: z.any(),
    })
    .parse(await req.json())

  await finishPasskeyRegistration(userId, attestationResponse)
  await createSession(userId)
  return Response.json({ ok: true })
}
