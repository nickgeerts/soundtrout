import { PrismaClient } from '../../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const createPrismaClient = () => new PrismaClient().$extends(withAccelerate())

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof createPrismaClient>
}

const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
