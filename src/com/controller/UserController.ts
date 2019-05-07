import { Controller, Get, Post, Body, Authorized } from 'routing-controllers'
import { UserServive } from '../service/UserService'
@Controller()
export class UserController {
  @Post('/login')
  async login(@Body() { username, password }) {
    return await UserServive.login({ username, password })
  }
  @Post('/register')
  async register(@Body() { username, password }) {
    return await UserServive.register({ username, password })
  }
}
