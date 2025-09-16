import { cookies } from 'next/headers'
import { COOKIE } from '@/nextConstants'
import { getSessionUser } from '@/services/auth/session.service'
import { uploadProfileImage } from '@/services/user/user-image.service'

export async function POST(req: Request) {
  try {
    const cookie = (await cookies()).get(COOKIE)?.value
    if (!cookie) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session = await getSessionUser(cookie)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = session.user
    const formData = await req.formData()
    const file = formData.get('photo')

    if (!file || typeof file === 'string') {
      return Response.json(
        { error: 'File not found in form data.' },
        { status: 400 }
      )
    }

    const s3Url = await uploadProfileImage({
      userId: user.id,
      email: user.email,
      file,
    })

    return Response.json({
      status: 'ok',
      message: 'Profile picture uploaded successfully!',
      s3Url,
    })
  } catch (error) {
    console.error('Error in upload API:', error)
    return Response.json(
      { status: 'error', message: 'Failed to upload profile picture.' },
      { status: 500 }
    )
  }
}
