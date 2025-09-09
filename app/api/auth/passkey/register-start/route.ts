import { startPasskeyRegistration } from '@/services/auth/passkey.service'
import { findOrCreateUserByEmail } from '@/services/auth/user.service'
import { z } from 'zod'

export async function POST(req: Request) {
  const { email } = z
    .object({ email: z.string().email() })
    .parse(await req.json())
  const user = await findOrCreateUserByEmail(email)
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    })
  }
  const options = await startPasskeyRegistration(user.id, user.email)
  return Response.json(options)
}
