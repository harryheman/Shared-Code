import { GQLContext } from '../context'

export type GQLRequest = {
  type: string
  variables?: any
  headers?: Record<string, string>
}
export type GQLResponse = {
  data: any
  extensions?: any
  headers: Headers
  status: number
  errors?: any[]
}

interface Interceptor {
  setNext(interceptor: Interceptor): Interceptor

  intercept(type: GQLContext): Promise<GQLContext>
}

export abstract class AbstractInterceptor implements Interceptor {
  private nextHandler: Interceptor

  public setNext(interceptor: Interceptor): Interceptor {
    this.nextHandler = interceptor
    return interceptor
  }

  public async intercept(ctx: GQLContext) {
    if (this.nextHandler) {
      return await this.nextHandler.intercept(ctx)
    }

    return ctx
  }
}
