import { randomUUID } from 'crypto'
import prisma from '@/utils/db'
import { TTL } from '@/services/constants'

export async function createSession(userId: string, ip?: string, ua?: string) {
  const now = new Date()

  // Check if active session exists for same UA
  const existing = await prisma.session.findFirst({
    where: {
      userId,
      userAgent: ua,
      expiresAt: { gt: now },
    },
  })

  if (existing) {
    // refresh cookie to keep same session alive
    return { id: existing.id, expiresAt: existing.expiresAt }
  }

  const id = randomUUID()
  const expiresAt = new Date(now.getTime() + TTL * 1000)
  await prisma.session.create({
    data: { id, userId, expiresAt, ip, userAgent: ua },
  })
  return { id, expiresAt }
}

export async function getSession(sessionId: string) {
  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    })
    return session
  }
}

export async function destroySession(sessionId: string) {
  if (sessionId) {
    await prisma.session
      .delete({
        where: { id: sessionId },
      })
      .catch(() => {})
  }
}
