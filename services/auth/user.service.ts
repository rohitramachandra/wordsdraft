import prisma from '@/utils/db'

function getPenNameFromEmail(email: string) {
  if (email.includes('@')) return email.split('@')[0]
  else throw 'Invalid email!'
}

export async function userAlreadyExists(email: string) {
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
