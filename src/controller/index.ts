import * as Router from 'koa-router'
import login from './login'
const router = new Router()
router.use('', login.routes(), login.allowedMethods())
export default router
