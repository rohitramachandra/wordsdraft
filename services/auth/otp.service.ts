import prisma from '@/utils/db'
import { hashCode, verifyCode } from '@/utils/crypto'
import { addMinutes, isBefore } from 'date-fns'
import { OTP_TTL_MINS } from '@/services/constants'

export async function issueOTP(email: string, ip?: string, ua?: string) {
  const code = Math.floor(1000 + Math.random() * 9000).toString()
  const codeHash = await hashCode(code)
  const expiresAt = addMinutes(new Date(), OTP_TTL_MINS)
  await prisma.otpCode.create({
    data: {
      email: email.trim().toLocaleLowerCase(),
      codeHash,
      expiresAt,
      ip,
      userAgent: ua,
    },
  })
  return { code, expiresAt }
}

export async function consumeOtp(email: string, code: string) {
  const now = new Date()
  const records = await prisma.otpCode.findMany({
    where: { email: email.trim().toLowerCase(), consumedAt: null },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })
  for (const rec of records) {
    if (isBefore(rec.expiresAt, now)) continue
    const ok = await verifyCode(code, rec.codeHash)
    if (ok) {
      await prisma.otpCode.delete({
        where: {
          id: rec.id,
        },
      })
      return true
    }
  }
  return false
}
