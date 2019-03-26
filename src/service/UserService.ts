import { JSLogger } from '../utils/JSLogger'
import { User } from '../model/User'
import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/demo', {
  useNewUrlParser: true
})
export class UserServive {
  static async register({ username, password }) {
    const user = await User.findOne({ username, password }).exec()
    if (user) {
      JSLogger.info('用户存在')
      return '用户存在'
    }
    return await User.create(new User({ username, password }))
  }
  static async login({ username, password }) {
    const user = await User.findOne({ username, password })
    return user || '密码错误'
  }
}
