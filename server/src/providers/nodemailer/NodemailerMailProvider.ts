import nodemailer from 'nodemailer'

import { MailProvider, SendMailData } from './../MailProvider'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e24bda6407487e',
    pass: 'fecc224ad76dca'
  }
})

export class NodemailerMailProvider implements MailProvider {
  async sendMail({ from, to, subject, body }: SendMailData) {
    await transport.sendMail({
      to,
      from,
      subject,
      html: body
    })
  }
}
