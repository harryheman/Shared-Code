import { gql } from 'graphql-request'
import { AbstractInterceptor } from './abstract.interceptor'
import { GQLContext } from '../context'
import { GraphQLError } from '../../errors'

export const REFRESH_TOKEN = gql`
  query refreshToken {
    refreshToken {
      access_token
    }
  }
`

export class RefreshTokenInterceptor extends AbstractInterceptor {
  async intercept(ctx: GQLContext): Promise<GQLContext> {
    if (!('errors' in ctx.res)) {
      return await super.intercept(ctx)
    }

    const exception = ctx.res.errors[0]?.extensions?.exception

    if (!exception) {
      return await super.intercept(ctx)
    }

    const Error = new GraphQLError(exception.message, exception.status)

    if (
      Error.code === 401 &&
      !ctx.isRepeated &&
      typeof window !== 'undefined'
    ) {
      try {
        await ctx.setRequest({ type: REFRESH_TOKEN })
        const res = await ctx.sendRequest()
        // @ts-ignore
        window.localStorage.setItem('token', res.refreshToken.access_token)
        await ctx.redo()

        return await super.intercept(ctx)
      } catch (e) {
        throw Error
      }
    }
  }
}
