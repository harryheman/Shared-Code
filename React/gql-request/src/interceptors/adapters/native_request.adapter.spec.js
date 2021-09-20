import { GQLContext } from '../context'
import { NativeRequestAdapter } from './native_request.adapter'

describe('Native request adapter', () => {
  it('should correctly format data', () => {
    const ctx = new GQLContext({})

    const req = {
      type: 'test',
      variables: {
        a: 1
      },
      headers: {
        b: 2
      }
    }

    ctx.setRequest(req)

    const value = new NativeRequestAdapter(ctx)
    expect(value).toEqual([req.type, req.variables, req.headers])
  })
})
