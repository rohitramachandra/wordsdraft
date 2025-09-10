import { startRegistration, startAuthentication } from '@simplewebauthn/browser'

export async function setupPasskey(email: string, userId: string) {
  const options = await fetch('/api/auth/passkey/register-start', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }).then((r) => r.json())

  const attResp = await startRegistration({ optionsJSON: options })
  await fetch('/api/auth/passkey/register-finish', {
    method: 'POST',
    body: JSON.stringify({ userId, attestationResponse: attResp }),
  })
}

async function loginWithOTP(email: string) {
  const res = await fetch('/api/auth/otp/login', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })

  if (!res.ok) throw new Error('OTP login failed')

  // Probably trigger OTP UI for user to enter code
  return { type: 'otp', status: 'sent', user: null }
}

export async function loginWithPasskey(email: string) {
  try {
    // Ask backend for login options
    const res = await fetch('/api/auth/passkey/login-start', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    const { hasPasskeys, options } = await res.json()

    if (!hasPasskeys) {
      // fallback to OTP
      return await loginWithOTP(email)
    }

    // Browser triggers authenticator (FaceID, TouchID, etc.)
    const assertionResp = await startAuthentication({ optionsJSON: options })

    // Send result back to backend
    const verifyRes = await fetch('/api/auth/passkey/login-finish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, assertionResponse: assertionResp }),
    })

    if (verifyRes.ok) {
      console.log('Logged in with passkey')
      const data = await verifyRes.json()
      return { type: 'passkey', status: 'success', user: data.user }
    } else {
      console.error('Login failed')
      return { type: 'passkey', status: 'failed', user: null }
    }
  } catch (err) {
    console.error('Error occured while trying to login with passkey: ', err)
    return { type: 'passkey', status: 'failed', user: null }
  }
}
