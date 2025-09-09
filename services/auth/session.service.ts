import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'
import prisma from '@/utils/db'
import { setHttpOnlyCookie, clearCookie } from '@/utils/cookies'

const COOKIE = process.env.SESSION_COOKIE_NAME!
const TTL = Number(process.env.SESSION_TTL_SECONDS! || 2592000)

export async function createSession(userId: string, ip?: string, ua?: string) {
  const id = randomUUID()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + TTL * 1000)
  await prisma.session.create({
    data: { id, userId, expiresAt, ip, userAgent: ua },
  })
  setHttpOnlyCookie(COOKIE, id, expiresAt)
  return { id, expiresAt }
}

export async function getSession() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (!cookie) return null
  const session = await prisma.session.findUnique({
    where: { id: cookie },
  })
  return session
}

export async function destroySession() {
  const cookie = (await cookies()).get(COOKIE)?.value
  if (cookie)
    await prisma.session
      .delete({
        where: { id: cookie },
      })
      .catch(() => {})
  clearCookie(COOKIE)
}
