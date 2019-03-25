import { findUser, register, findOneUser } from '../service/UserService'
import * as Router from 'koa-router'
import User from '../model/User'
import { JSLogger } from '../utils/JSLogger'
const router = new Router()
router.post('/login', async ctx => {
  const userInfo: User = ctx.request.body
  const username = userInfo.username
  const password = userInfo.password
  const user = await findOneUser('user', { username, password })
  JSLogger.log(user)
  ctx.body = user || 'fail'
})
router.get('/get', ctx => {
  JSLogger.log('ok')
  ctx.body = 'ok'
})
router.post('/register', async ctx => {
  const userInfo = ctx.request.body
  const username = userInfo.username
  const password = userInfo.password
  const users = (await findUser('user', { username })) as User[]
  if (users.length > 0) {
    ctx.body = '用户已存在'
    return
  }
  const user = new User(username, password)
  ctx.body = await register('user', user)
})

export default router
