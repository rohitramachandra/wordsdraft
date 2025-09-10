import { finishPasskeyRegistration } from '@/services/auth/passkey.service'
import { z } from 'zod'

export async function POST(req: Request) {
  const { userId, attestationResponse } = z
    .object({
      userId: z.string(),
      attestationResponse: z.any(),
    })
    .parse(await req.json())

  await finishPasskeyRegistration(userId, attestationResponse)
  return Response.json({ ok: true })
}
