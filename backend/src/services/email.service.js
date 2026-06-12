const nodemailer = require('nodemailer')

let transporter = null

const initTransporter = async () => {
  if (!transporter) {
    // Si tenemos credenciales de Mailtrap en el .env, las usamos
    if (process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS) {
      transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      })
      console.log('Mailtrap transporter configurado.')
    } else {
      // Si no hay Mailtrap configurado, usamos Ethereal como fallback
      const testAccount = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
      console.log('Ethereal Email transporter configurado (Fallback):', testAccount.user)
    }
  }
  return transporter
}

const sendEmail = async (to, subject, text, html) => {
  try {
    const transport = await initTransporter()
    
    const info = await transport.sendMail({
      from: '"SkillSwap Notificaciones" <no-reply@skillswap.local>',
      to,
      subject,
      text,
      html,
    })

    console.log(`Mensaje enviado a ${to}: %s`, info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (error) {
    console.error('Error enviando email:', error)
  }
}

module.exports = {
  sendEmail
}
