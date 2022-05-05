import { prisma } from '../../prisma'
import { FeedbackCreateData, FeedbackRepository } from './../FeedbackRepository'

export class PrismaFeedbackRepository implements FeedbackRepository {
  async create(data: FeedbackCreateData) {
    await prisma.feedback.create({ data })
  }
}
