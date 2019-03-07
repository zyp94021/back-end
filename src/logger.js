class Logger {
    log(msg) {
        console.log(`${Date.now()}|${msg}`)
    }
}

const log = new Logger();
async function logger(ctx, next) {
    log.log(`${ctx.request.method}|${ctx.request.url}`)
    await next()
}
module.exports = logger