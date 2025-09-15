import prisma from '@/utils/db'
import { Prisma } from '@prisma/client'

function getPenNameFromEmail(email: string) {
  if (email.includes('@')) return email.split('@')[0]
  else throw 'Invalid email!'
}

export async function checkUserExists(email: string) {
  try {
    const normalized = email.trim().toLocaleLowerCase()
    let user = await prisma.user.findUnique({
      where: { email: normalized },
    })
    if (user) return true
    return false
  } catch (err) {
    console.error('Error finding a user: ', err)
    return true
  }
}

export async function getUserByEmail(email: string) {
  try {
    const normalized = email.trim().toLocaleLowerCase()
    let user = await prisma.user.findUnique({
      where: { email: normalized },
    })
    return user
  } catch (err) {
    console.error('Error finding or creating a user: ', err)
    return null
  }
}

export async function findOrCreateUserByEmail(name: string, email: string) {
  try {
    const normalized = email.trim().toLocaleLowerCase()
    const penName = getPenNameFromEmail(normalized)
    let user = await prisma.user.findUnique({
      where: { email: normalized },
    })
    if (!user)
      user = await prisma.user.create({
        data: { name, email: normalized, penName },
      })
    return user
  } catch (err) {
    console.error('Error finding or creating a user: ', err)
    return null
  }
}

export async function updateUserOnboarding(
  email: string,
  data: Partial<
    Pick<
      Prisma.UserUpdateInput,
      | 'gender'
      | 'dob'
      | 'language'
      | 'district'
      | 'state'
      | 'occupation'
      | 'passion'
      | 'dImage'
    >
  >
) {
  try {
    const normalized = email.trim().toLowerCase()
    return await prisma.user.update({
      where: { email: normalized },
      data: { ...data, onboardAt: new Date() },
    })
  } catch (err) {
    console.error('Error finding or updating a user:', err)
    return null
  }
}

export async function updateUserDImage(email: string, dImage: string) {
  try {
    const normalized = email.trim().toLowerCase()
    return await prisma.user.update({
      where: { email: normalized },
      data: { dImage },
    })
  } catch (err) {
    console.error('Error finding or updating a user:', err)
    return null
  }
}
