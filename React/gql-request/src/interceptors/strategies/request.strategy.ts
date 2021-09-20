import { InterceptStrategy } from './intercept.strategy'
import { AbstractInterceptor } from '../core/abstract.interceptor'
import { AuthInterceptor } from '../core/auth.interceptor'
import { LanguageInterceptor } from '../core/language.interceptor'
import { GQLContext } from '../context'

export class RequestStrategy extends InterceptStrategy {
  async handle(ctx: GQLContext): Promise<GQLContext> {
    const handlersOrder: AbstractInterceptor[] = [
      new AuthInterceptor(),
      new LanguageInterceptor()
    ]
    this.makeChain(handlersOrder)

    return await handlersOrder[0].intercept(ctx)
  }
}
