import { Document, Schema, Model, model } from 'mongoose'
interface IUser {
  time: Date
  username: string
  password: string
}
interface IUserModel extends IUser, Document {
  say(): string
}

const UserSchema: Schema = new Schema({
  time: Date,
  password: { type: String, required: true },
  username: { type: String, required: true },
})
UserSchema.pre('save', function(next) {
  let now = new Date()
  // if (!this.time) {
  //   this.time = now
  // }
  next()
})
UserSchema.methods.say = function(): string {
  return this.username + '111'
}

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)
