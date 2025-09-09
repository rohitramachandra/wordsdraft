import { destroySession } from '@/services/auth/session.service'

export async function POST() {
  await destroySession()
  return Response.json({ ok: true })
}
