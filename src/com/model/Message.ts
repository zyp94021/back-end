import { Document, Schema, Model, model } from 'mongoose'
interface IMsg {
  time: Date
  message: string
}
interface IMsgModel extends IMsg, Document {}

const MsgSchema: Schema = new Schema(
  {
    time: Date,
    message: { type: String, required: true },
  },
  { versionKey: false },
)
MsgSchema.pre('save', function(next) {
  let now = new Date()
  if (!this['time']) {
    this['time'] = now
  }
  next()
})

export const Message: Model<IMsgModel> = model<IMsgModel>('Message', MsgSchema)
