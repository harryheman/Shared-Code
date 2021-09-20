import { GQLContext } from '../context'

export const NativeRequestAdapter = (ctx: GQLContext) =>
  Array.of(ctx.req.type, ctx.req.variables, ctx.req.headers)
