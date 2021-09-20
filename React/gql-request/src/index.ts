import { GraphQLClient } from 'graphql-request'
import { GQLContext } from './interceptors/context'

const request = async function (
  this: GraphQLClient,
  type: string,
  variables: any,
  headers = {}
): Promise<any> {
  const ctx = new GQLContext(this)

  await ctx.setRequest({ type, variables, headers })

  try {
    await ctx.sendRequest()
  } catch (e) {
    await ctx.setResponse(e.response)
  }

  return ctx.res
}

GraphQLClient.prototype.request = request

export const client = new GraphQLClient('ENDPOINT', {
  credentials: 'include'
})
