import { JSLogger } from './utils/JSLogger'
import * as Koa from 'koa'

export function log() {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    JSLogger.info(`${ctx.request.method}|${ctx.request.url}`)
    await next()
  }
}
