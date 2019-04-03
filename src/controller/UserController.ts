import { Controller, Get, Post, Body, Authorized } from 'routing-controllers'
import { UserServive } from '../service/UserService'
@Controller()
export class UserController {
  @Get('/get')
  get() {
    return 'get'
  }
  @Post('/login')
  async login(@Body() user: any) {
    const username = user.username
    const password = user.password
    const msg = await UserServive.login({ username, password })

    return msg
  }
  @Post('/register')
  async register(@Body() user: any) {
    const username = user.username
    const password = user.password
    return UserServive.register({ username, password })
  }
}
