import bcrypt from 'bcryptjs'

export async function hashCode(code: string) {
  return bcrypt.hash(code, 10)
}

export async function verifyCode(code: string, hash: string) {
  return bcrypt.compare(code, hash)
}
