import { GQLContext } from './index'
import { GQLRequest } from '../core/abstract.interceptor'

export class RequestSnapshot {
  instance: GQLContext
  init: GQLRequest

  constructor(ctx: GQLContext) {
    this.instance = ctx
    this.init = ctx.req
  }

  async restore() {
    await this.instance.setRequest(this.init)
  }
}
