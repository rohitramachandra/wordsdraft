import { startRegistration, startAuthentication } from '@simplewebauthn/browser'

export async function setupPasskey(email: string, userId: string) {
  const options = await fetch('/api/auth/passkey/register-start', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }).then((r) => r.json())

  const attResp = await startRegistration(options)
  await fetch('/api/auth/passkey/register-finish', {
    method: 'POST',
    body: JSON.stringify({ userId, attestationResponse: attResp }),
  })
}

export async function loginWithPasskey(email: string) {
  // Ask backend for login options
  const res = await fetch('/api/auth/passkey/login-start', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
  const options = await res.json()

  // Browser triggers authenticator (FaceID, TouchID, etc.)
  const assertionResp = await startAuthentication(options)

  // Send result back to backend
  const verifyRes = await fetch('/api/auth/passkey/login-finish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, assertionResponse: assertionResp }),
  })

  if (verifyRes.ok) {
    console.log('Logged in with passkey')
    const data = await verifyRes.json()
    return data.user
  } else {
    console.error('Login failed')
    return null
  }
}
