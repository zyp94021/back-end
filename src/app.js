const Koa = require('koa')
const Ws = require('ws')

const app = new Koa()

app.use(require('./logger'))
app.use(require('koa-bodyparser')())

const routers = require('./controller/index')
app.use(routers.routes())
app.listen(3000)
console.log(`listen on 3000
    click http://localhost:3000/
    or http://10.1.100.88:3000/
`)

const wss = new Ws.Server({
    port: 8000
})

wss.on('connection', (ws) => {
    console.log(`[SERVER] connection()`)
    ws.on('message', (message) => {
        console.log(`[SERVER] received:${message}`)
        ws.send(`ECHO:${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error:${err}`)
            }
        })
    })
})