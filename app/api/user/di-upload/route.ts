import { COOKIE } from '@/nextConstants'
import { getSessionUser } from '@/services/auth/session.service'
import { updateUserDImage } from '@/services/auth/user.service'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { cookies } from 'next/headers'

// Configure the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

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

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a fixed file name using the user's ID with the prefix 'pi-'
    // We can also add the file extension from the original file to maintain type context
    const fileExtension = file.name.split('.').pop()
    const fileName = `pi-${user.id}.${fileExtension}`

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)

    const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

    await updateUserDImage(user.email, s3Url)

    return Response.json({
      status: 'ok',
      message: 'Profile picture uploaded successfully!',
      s3Url,
    })
  } catch (error) {
    console.error('Error uploading profile picture to S3:', error)
    return Response.json(
      { status: 'error', message: 'Failed to upload profile picture.' },
      { status: 500 }
    )
  }
}
