import 'reflect-metadata'
import * as Koa from 'koa'
import * as mongoose from 'mongoose'
import * as fs from 'fs'
import { log } from './logger'
import * as socketIo from 'socket.io'
import { Server } from 'http'
import { createKoaServer, Action } from 'routing-controllers'
import { useSocketServer } from 'socket-controllers'
import { UserController } from './com/controller/UserController'
import { JSLogger } from './utils/JSLogger'
import * as jwt from 'jsonwebtoken'
import { UserServive } from './com/service/UserService'
import { MessageController } from './com/controller/MessageController'
import { MsgController } from './com/controller/MsgController'
import { fstat } from 'fs'

const token: { [username: string]: string } = {}

class App {
  constructor() {}
  private server: Server
  private io: socketIo.Server
  public start() {
    mongoose.connect('mongodb://localhost:27017/demo', {
      useNewUrlParser: true,
    })
    const app: Koa = createKoaServer({
      cors: true,
      controllers: [UserController, MsgController],
      authorizationChecker: async (action: Action) => {
        const token = action.request.headers['authorization']
        JSLogger.log(token)
        try {
          const { username } = jwt.verify(token, 'jwttest') as any
          if (token[username] === token) {
            return true
          }
          // const user = await UserServive.findOneByUsername({ username })
          // console.log(user)
        } catch (error) {
          JSLogger.error(error)
          console.log(action.response)
          action.response.body = 'error'
        }
      },
    })
    app.use(log())
    this.server = app.listen(3001)
    this.io = socketIo(this.server)
    useSocketServer(this.io, {
      controllers: [MessageController],
    })

    console.log(`listen on 3001
        click http://localhost:3001/
    `)
  }
}
const app = new App()
app.start()
