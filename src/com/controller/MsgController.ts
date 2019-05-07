import { Controller, Get, Post, Body, Authorized } from 'routing-controllers'
import { MsgService } from '../service/MsgService'
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
}
