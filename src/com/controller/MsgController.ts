import {
  Controller,
  Get,
  Post,
  Body,
  Authorized,
  Req,
  Res,
  Param,
  QueryParam,
} from 'routing-controllers'
import { MsgService } from '../service/MsgService'
import { JSLogger } from '../../utils/JSLogger'
import { Request } from 'koa'
import { BigNumber } from 'bignumber.js'
import { Crypto, utils } from 'ontology-ts-sdk'
const { Address } = Crypto

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
  async test(@Body() body,@QueryParam('test') a:string) {
    console.log(a)
    JSLogger.info(body)
    return {
      action: 'login',
      error: 0,
      desc: 'SUCCESS',
      result: true,
    }
  }
  int2ByteArray = value => {
    let bigValue = new BigNumber(value)
    let hexValue = bigValue.toString(16)
    if (hexValue.length % 2 == 1) {
      hexValue = '0' + hexValue
    }
    let compareString = '7'
    for (let k = 0; k < hexValue.length - 1; ++k) {
      compareString += 'f'
    }
    if (bigValue.isGreaterThan(new BigNumber(compareString, 16))) {
      hexValue = '00' + hexValue
    }
    hexValue = utils.reverseHex(hexValue)
    return hexValue
  }
  converAdd = amount =>
    new BigNumber(amount).multipliedBy(Math.pow(10, 9)).toString()
  @Get('/test/:address/:amount')
  async address(
    @Param('address') address: string,
    @Param('amount') amount: string,
  ) {
    console.log(address)
    amount = this.converAdd(amount)
    console.log(amount)
    return {
      action: 'invoke',
      version: 'v1.0.0',
      params: {
        invokeConfig: {
          contractHash: '0ee8e7c88d152323aa2df6c69f28b86c86221ecf',
          functions: [
            {
              operation: 'recharge',
              args: [
                { value: `ByteArray:${new Address(address).serialize()}` },
                { value: `ByteArray:${this.int2ByteArray(amount)}` },
                { value: `ByteArray:${utils.str2hexstr('hello')}` },
              ],
            },
          ],
          payer: address,
          gasLimit: 30000,
          gasPrice: 500,
        },
      },
    }
  }
}
