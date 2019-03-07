const router = require('koa-router')()
const User = require('../model/User')
const DB = require('../DB')
router.post('/login', async ctx => {
  const userInfo = ctx.request.body
  const username = userInfo.username
  const password = userInfo.password
  const user = await DB.find('user', { username: username, password: password })
  console.log(user)
  if (user) {
    ctx.body = await DB.find('user', { username: username })
  } else {
    ctx.body = 'fail'
  }
})
router.get('/get', ctx => {
  console.log('ok')
  ctx.body = 'ok'
})
router.post('/register', async ctx => {
  const userInfo = ctx.request.body
  const username = userInfo.username
  const password = userInfo.password
  if (await DB.find('user', { username: username })) {
    ctx.body = '用户已存在'
    return
  }
  const user = new User(username, password)
  ctx.body = await DB.insertOne('user', user)
})

module.exports = router