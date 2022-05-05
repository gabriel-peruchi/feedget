export interface SendMailData {
  from: string
  to: string | string[]
  subject: string
  body: string
}

export interface MailProvider {
  sendMail: (data: SendMailData) => Promise<void>
}