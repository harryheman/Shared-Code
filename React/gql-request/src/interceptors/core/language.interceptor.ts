import { AbstractInterceptor } from './abstract.interceptor'
import { detectUserLanguage } from '@common/utils'
import { GQLContext } from '../context'

export class LanguageInterceptor extends AbstractInterceptor {
  intercept(ctx: GQLContext): Promise<GQLContext> {
    const currentLang = detectUserLanguage() || 'en'
    ctx.req.headers = { ...ctx.req.headers, Language: currentLang }

    return super.intercept(ctx)
  }
}
