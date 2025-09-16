import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { updateUserDImage } from '@/services/user/user.service'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadProfileImage({
  userId,
  email,
  file,
}: {
  userId: string
  email: string
  file: File
}) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileExtension = file.name.split('.').pop()
  const fileName = `pi-${userId}.${fileExtension}`

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

  await updateUserDImage(email, s3Url)

  return s3Url
}
