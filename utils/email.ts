import nodemailer from 'nodemailer'

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

export async function sendEmailWithHtml(
  to: string,
  text: string,
  subject?: string
) {}
