import { JSLogger } from '../../utils/JSLogger'
import { User } from '../model/User'
import ReMsg from '../../ReMsg'
import * as jwt from 'jsonwebtoken'

export class UserServive {
  static async register({ username, password }) {

    const user = await User.findOne({ username, password })
    console.log(user)
    if (user) {
      JSLogger.info('用户存在')
      return new ReMsg({}, 401, '用户存在')
    }
    const newUser = (await User.create(
      new User({ username, password }),
    )).toObject()
    return new ReMsg({ username: newUser.username })
  }
  static async login({ username, password }) {
    const user = await User.findOne({ username, password })
    if (user) {
      const token = jwt.sign({ username: user.username }, 'jwttest')
      return new ReMsg({ username, token })
    } else {
      return new ReMsg({}, 401, '用户不存在')
    }
  }
  static async findOneByUsername({ username }) {
    const user = await User.findOne({ username })
    return user
  }
}
