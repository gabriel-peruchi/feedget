import { MailProvider } from './../providers/MailProvider';
import { FeedbackRepository } from './../repositories/FeedbackRepository'

interface SubmitFeedbackRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedback {
  constructor(
    private mailProvider: MailProvider,
    private feedbackRepository: FeedbackRepository,
  ) { }

  async execute({
    type,
    comment,
    screenshot
  }: SubmitFeedbackRequest) {
    if (!type) {
      throw new Error('Type is required.')
    }

    if (!comment) {
      throw new Error('Comment is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Type is required.')
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailProvider.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Gabriel Peruchi <gabriel-peruchi@hotmail.com>',
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>'
      ].join('\n')
    })
  }
}
