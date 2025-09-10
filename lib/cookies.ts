import { NextResponse } from 'next/server'

export async function setHttpOnlyCookie(
  name: string,
  value: string,
  expires: Date,
  res: NextResponse
) {
  res.cookies.set({
    name,
    value,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires,
  })
}

export function clearCookie(res: NextResponse) {
  res.cookies.set({
    name: process.env.SESSION_COOKIE_NAME!,
    value: '',
    path: '/',
    expires: new Date(0),
  })
}
