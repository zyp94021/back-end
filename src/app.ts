import * as Koa from 'koa'
import * as Ws from 'ws'
import { log } from './logger'
import * as bodyparser from 'koa-bodyparser'
import routers from './controller/index'

class App {
  constructor() {}
  public startHttp() {
    const app = new Koa()
    app.use(log())
    app.use(bodyparser())

    app.use(routers.routes())
    app.listen(3000)
    console.log(`listen on 3000
        click http://localhost:3000/
        or http://10.1.100.88:3000/
    `)
  }
  public startWs() {
    const wss = new Ws.Server({
      port: 3001
    })

    wss.on('connection', ws => {
      console.log(`[SERVER] connection()`)
      ws.on('message', message => {
        console.log(`[SERVER] received:${message}`)
        ws.send(`ECHO:${message}`, err => {
          if (err) {
            console.log(`[SERVER] error:${err}`)
          }
        })
      })
    })
  }
}
const app = new App()
app.startHttp()
app.startWs()
