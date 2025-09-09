import { cookies } from 'next/headers'

export async function setHttpOnlyCookie(
  name: string,
  value: string,
  expires: Date
) {
  const cookie = await cookies()
  cookie.set({
    name,
    value,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires,
  })
}

export async function clearCookie(name: string) {
  const cookie = await cookies()
  cookie.set({ name, value: '', path: '/', expires: new Date(0) })
}
