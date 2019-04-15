import 'reflect-metadata'
import * as Koa from 'koa'
import { log } from './logger'
import * as socketIo from 'socket.io'
import { Server } from 'http'
import { createKoaServer, Action } from 'routing-controllers'
import { useSocketServer } from 'socket-controllers'
import { UserController } from './controller/UserController'
import { JSLogger } from './utils/JSLogger'
import * as jwt from 'jsonwebtoken'
import { UserServive } from './service/UserService'
import { MessageController } from './controller/MessageController'

class App {
  constructor() {}
  private server: Server
  private io: socketIo.Server
  public startHttp() {
    const app: Koa = createKoaServer({
      cors: true,
      controllers: [UserController],
      authorizationChecker: async (action: Action) => {
        const token = action.request.headers['authorization']
        JSLogger.log(token)
        try {
          const { username } = jwt.verify(token, 'jwttest') as any
          const user = await UserServive.findOneByUsername({ username })
          console.log(user)
          return true
        } catch (error) {
          JSLogger.error(error)
          return false
        }
      }
    })
    app.use(log())
    this.server = app.listen(3001)
    this.io = socketIo(this.server)
    useSocketServer(this.io, {
      controllers: [MessageController]
    })
    console.log(`listen on 3001
        click http://localhost:3001/
    `)
  }
}
const app = new App()
app.startHttp()
