import { Controller, Get, Post, Body, Authorized } from 'routing-controllers'
import { MsgService } from '../service/MsgService'
import { JSLogger } from '../../utils/JSLogger'
@Controller()
export class MsgController {
  @Get('/all')
  get = async () => await MsgService.all()

  @Post('/add')
  async add(@Body() { message }) {
    return await MsgService.add({ message })
  }
  @Post('/delete')
  async register(@Body() { id }) {
    return MsgService.delete({ id })
  }
  @Post('/test')
  async test(@Body()
  {
    params: { type, user, message, publickey, signature },
  }) {
    JSLogger.log({ type, user, message, publickey, signature })
    return {
      action: 'login',
      error: 0,
      desc: 'SUCCESS',
      result: true,
    }
  }
  @Post('/test2')
  async test2() {
    return {
      action: 'login',
      error: 0,
      desc: 'SUCCESS',
      result: true,
    }
  }
}
