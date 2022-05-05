import { Router } from 'express'

import { SubmitFeedback } from './useCases/SubmitFeedback'
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository'
import { NodemailerMailProvider } from './providers/nodemailer/NodemailerMailProvider'

const routes = Router()

routes.post('/feedbacks', async (req, res) => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodemailerMailProvider = new NodemailerMailProvider()
  const submitFeedback = new SubmitFeedback(
    nodemailerMailProvider, 
    prismaFeedbackRepository
  )
  
  await submitFeedback.execute(req.body)

  return res.status(201).send()
})

export { routes }
