import * as Koa from 'koa'
import { log } from './logger'
import * as bodyparser from 'koa-bodyparser'
import routers from './controller/index'
import * as socketIo from 'socket.io'
import { Server } from 'http'
class App {
  constructor() {}
  private server: Server
  private io: socketIo.Server
  public startHttp() {
    const app = new Koa()
    app.use(log())
    app.use(bodyparser())
    app.use(routers.routes())
    this.server = app.listen(3001)
    console.log(`listen on 3001
        click http://localhost:3001/
        or http://10.1.100.88:3001/
    `)
  }
  public startWs() {
    this.io = socketIo(this.server)
    this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s.', 3000)
      socket.on('message', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m))
        this.io.emit('message', m)
      })
      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }
}
const app = new App()
app.startHttp()
app.startWs()
