import { InterceptStrategy } from './intercept.strategy'
import { AbstractInterceptor, GQLResponse } from '../core/abstract.interceptor'
import { RefreshTokenInterceptor } from '../core/refresh_token.interceptor'
import { RetrieveDataInterceptor } from '../core/retrieve_data.interceptor'
import { GQLContext } from '../context'

export class ResponseStrategy extends InterceptStrategy {
  async handle(ctx: GQLContext): Promise<GQLResponse['data']> {
    const handlersOrder: AbstractInterceptor[] = [
      new RefreshTokenInterceptor(),
      new RetrieveDataInterceptor()
    ]
    this.makeChain(handlersOrder)

    return await handlersOrder[0].intercept(ctx)
  }
}
