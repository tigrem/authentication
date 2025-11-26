import { PrismaClient } from '@prisma/client'

// Use the simplest possible global check to ensure only one instance of PrismaClient is created.
const globalNode = global

if (!globalNode.prisma) {
  globalNode.prisma = new PrismaClient()
}

const prisma = globalNode.prisma

export default prisma
