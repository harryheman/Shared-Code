import { AbstractInterceptor, GQLResponse } from './abstract.interceptor'
import { GQLContext } from '../context'

export class RetrieveDataInterceptor extends AbstractInterceptor {
  intercept(ctx: GQLContext): GQLResponse['data'] {
    ctx.res = ctx.res.status === 200 ? ctx.res.data : ctx.res
    return ctx
  }
}
