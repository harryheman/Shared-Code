import type { RequestHandler } from '@sveltejs/kit'
import { todoApi } from './_todoApi'

export const del: RequestHandler = (req) => todoApi(req)

export const patch: RequestHandler<{}, FormData> = (req) => {
  if (req.body.get('text')) {
    return todoApi(req, {
      text: req.body.get('text')
    })
  }
  return todoApi(req, {
    done: Boolean(req.body.get('done'))
  })
}
