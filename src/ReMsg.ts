export default class ReMsg {
  private result: any
  private code: number
  private message: string
  constructor(result: any, code = 200, message = '') {
    this.result = result
    this.code = code
    this.message = message
  }
}
