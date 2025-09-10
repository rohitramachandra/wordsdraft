import prisma from '@/utils/db'
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server'
import redis from '@/utils/redis'
import { Prisma } from '@prisma/client'
import { APP_ORIGIN, rpID, rpName } from '@/services/constants'

const encoder = new TextEncoder()

export async function startPasskeyRegistration(userId: string, email: string) {
  const userPasskeys = await prisma.passkey.findMany({
    where: { userId },
  })
  const options = await generateRegistrationOptions({
    rpID,
    rpName,
    userName: email,
    userID: encoder.encode(userId),
    excludeCredentials: userPasskeys.map((p: Prisma.PasskeyGetPayload<{}>) => ({
      id: p.credentialId,
      type: 'public-key',
    })),
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      residentKey: 'preferred',
      userVerification: 'required',
    },
  })
  await redis.setex(`webauthn:reg:${userId}`, 300, options.challenge)
  return options
}

export async function finishPasskeyRegistration(userId: string, response: any) {
  const expectedChallenge = await redis.get(`webauthn:reg:${userId}`)
  if (!expectedChallenge) throw new Error('Registration challenge expired')

  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedRPID: rpID,
    expectedOrigin: APP_ORIGIN,
  })

  if (!verification || !verification.registrationInfo)
    throw new Error('Passkey registration failed')
  const { credential, credentialDeviceType, credentialBackedUp } =
    verification.registrationInfo

  await prisma.passkey.create({
    data: {
      userId,
      credentialId: credential.id,
      publicKey: Buffer.from(credential.publicKey).toString('base64url'),
      counter: credential.counter,
      transports: JSON.stringify(response.response?.transports ?? []),
    },
  })

  return { ok: true }
}

export async function startPasskeyLogin(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  })
  if (!user) return { options: null }

  const creds = await prisma.passkey.findMany({
    where: { userId: user.id },
  })

  const allowCredentials = creds.map((c) => ({
    id: c.credentialId,
    type: 'public-key',
  }))

  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: 'required',
    allowCredentials,
  })

  await redis.setex(
    `webauthn:auth:${email.trim().toLowerCase()}`,
    300,
    options.challenge
  )

  return { user, options }
}

export async function finishPasskeyLogin(email: string, response: any) {
  const expectedChallenge = await redis.get(
    `webauthn:auth:${email.trim().toLowerCase()}`
  )
  if (!expectedChallenge) throw new Error('Authentication challege expired')

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  })

  if (!user) throw new Error('User not found')

  const passkey = await prisma.passkey.findFirst({
    where: {
      userId: user.id,
      credentialId: response.rawId,
    },
  })

  if (!passkey) throw new Error('Passkey not found for this user')

  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge,
    expectedRPID: rpID,
    expectedOrigin: APP_ORIGIN,
    credential: {
      id: passkey.credentialId,
      publicKey: Buffer.from(passkey.publicKey, 'base64url'),
      counter: passkey.counter,
    },
  })

  if (!verification.verified || !verification.authenticationInfo)
    throw new Error('Passkey auth failed')

  const { newCounter } = verification.authenticationInfo
  if (passkey) {
    await prisma.passkey.update({
      where: { id: passkey.id },
      data: { counter: newCounter },
    })
  }
  return user
}
