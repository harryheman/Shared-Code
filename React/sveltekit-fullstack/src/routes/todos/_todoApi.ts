import type { Request } from '@sveltejs/kit'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const todoApi = async (req: Request, data?: Todo | Changes) => {
  const method = req.method.toUpperCase()
  switch (method) {
    case 'GET':
      return {
        status: 200,
        body: await prisma.todo.findMany()
      }
    case 'POST':
      await prisma.todo.create({
        data: data as Todo
      })
      break
    case 'DELETE':
      await prisma.todo.delete({
        where: {
          uid: req.params.uid
        }
      })
      break
    case 'PATCH':
      await prisma.todo.update({
        data: data as Changes,
        where: {
          uid: req.params.uid
        }
      })
      break
    default:
      return {
        status: 500,
        body: null
      }
  }

  if (req.headers.accept === 'application/json') {
    return {
      status: 201,
      body: await prisma.todo.findMany()
    }
  }

  return {
    status: 303,
    headers: {
      location: '/'
    }
  }
}
