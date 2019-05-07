import { JSLogger } from '../../utils/JSLogger'
import { Message } from '../model/Message'
import { Types } from 'mongoose'
import ReMsg from '../../ReMsg'
import * as jwt from 'jsonwebtoken'

export class MsgService {
  static all = async () =>
    (await Message.find()).map(msg => ({ ...msg.toObject(), id: msg.id }))
  static add = async ({ message }) => {
    const data = await Message.create(new Message({ message }))
    return {
      ...data.toObject(),
      id: data.id,
    }
  }
  static delete = async ({ id }) => {
    await Message.deleteOne({ _id: Types.ObjectId(id) })
    return { id }
  }
}
