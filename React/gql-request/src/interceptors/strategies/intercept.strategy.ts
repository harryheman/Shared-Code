import { AbstractInterceptor } from '../core/abstract.interceptor'
import { GQLContext } from '../context'

export abstract class InterceptStrategy {
  protected makeChain(collection: AbstractInterceptor[]) {
    collection.forEach(
      (handler, index) =>
        collection[index + 1] && handler.setNext(collection[index + 1])
    )
  }

  abstract handle(ctx: GQLContext): any
}
