import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'wordwise.store@gmail.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
})

export async function sendEmail(to: string, text: string, subject?: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: subject ?? 'Your login code',
    text,
  })
}

// load template file
function loadTemplate(
  templateName: string,
  data: Record<string, string | number>
) {
  const filePath = path.join(
    `${process.cwd()}/services/email`,
    'templates',
    `${templateName}.html`
  )
  let html = fs.readFileSync(filePath, 'utf-8')

  // replace placeholders like {{otp}}, {{name}}, etc.
  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, 'g')
    html = html.replace(regex, String(data[key]))
  }

  return html
}

type SendMailOptions = {
  to: string
  subject: string
  template: string
  data: Record<string, string | number>
}

export async function sendHTMLMail({
  to,
  subject,
  template,
  data,
}: SendMailOptions) {
  const html = loadTemplate(template, data)

  const info = await transporter.sendMail({
    from: `"WordsMyth" <${process.env.MAIL_FROM}>`,
    to,
    subject,
    html,
  })

  console.log(`Email (${template}) sent to ${to}: ${info.messageId}`)
  return info
}
