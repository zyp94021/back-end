const router = require('koa-router')()
const login = require('./login')

router.use('', login.routes(), login.allowedMethods())
module.exports = router