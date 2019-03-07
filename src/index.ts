import { Level, JSLogger } from './utils/Logger'

class App {
  constructor() {}
  private static _Log: JSLogger
  public static get Log(): JSLogger {
    return (this._Log = this._Log || new JSLogger({ level: Level.NORMAL }))
  }
  public start() {
    App.Log.info('start21')
  }
}
const app = new App()
app.start()
