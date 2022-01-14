import type { RequestHandler } from '@sveltejs/kit'
import { todoApi } from './_todoApi'

export const get: RequestHandler = (req) => todoApi(req)

export const post: RequestHandler<{}, FormData> = (req) =>
  todoApi(req, {
    uid: `${Date.now()}`,
    text: req.body.get('text'),
    done: false
  })
