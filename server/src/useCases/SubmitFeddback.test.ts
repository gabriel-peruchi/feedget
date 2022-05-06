import { SubmitFeedback } from './SubmitFeedback'

const sendMailSpy = jest.fn()
const createFeedbackSpy = jest.fn()

const submitFeedback = new SubmitFeedback(
  { sendMail: sendMailSpy },
  { create: createFeedbackSpy },
)

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    const feedbackMock = {
      type: 'BUG',
      comment: 'Test',
      screenshot: 'data:image/png;base64,nceuncuneucnepc'
    }

    await expect(submitFeedback.execute(feedbackMock)).resolves.not.toThrow()
    expect(sendMailSpy).toHaveBeenCalled()
    expect(createFeedbackSpy).toHaveBeenCalledWith(feedbackMock)
  })

  it('should not be able to submit feedback without type', async () => {
    const feedbackMock = {
      type: '',
      comment: 'Test',
      screenshot: 'data:image/png;base64,nceuncuneucnepc'
    }

    await expect(submitFeedback.execute(feedbackMock)).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {
    const feedbackMock = {
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,nceuncuneucnepc'
    }

    await expect(submitFeedback.execute(feedbackMock)).rejects.toThrow()
  })

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    const feedbackMock = {
      type: 'BUG',
      comment: 'Test',
      screenshot: 'invalid.jpg'
    }

    await expect(submitFeedback.execute(feedbackMock)).rejects.toThrow()
  })
})