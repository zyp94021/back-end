import * as fs from 'fs'
export enum Level {
  ERROR = 1,
  WARN,
  INFO,
  NORMAL
}

export class JSLogger {
  private level: Level = Level.NORMAL
  constructor(config = { level: Level.NORMAL }) {
    this.level = config.level
  }
  private get now() {
    return new Date()
  }
  private static _Inst: JSLogger
  private static Inst() {
    return (this._Inst = this._Inst || new JSLogger({ level: Level.NORMAL }))
  }

  private _log(level: Level, log: any, file_log: any) {
    if (this.level >= level) {
      console.log.call(this, `[${this.now.toLocaleString()}] ${log}`)
      this.writeLog(level, `[${this.now.toLocaleString()}] ${file_log}`)
    }
  }
  public static log(log: any) {
    this.Inst()._log(Level.NORMAL, JSON.stringify(log), JSON.stringify(log))
  }
  public static info(log: any) {
    this.Inst()._log(
      Level.INFO,
      `\x1b[34m[info]\x1b[0m ${JSON.stringify(log)}`,
      `[info] ${JSON.stringify(log)}`
    )
  }
  public static warn(log: any) {
    this.Inst()._log(
      Level.WARN,
      `\x1b[33m[warn]\x1b[0m ${JSON.stringify(log)}`,
      `[warn] ${JSON.stringify(log)}`
    )
  }
  public static error(log: any) {
    this.Inst()._log(
      Level.ERROR,
      `\x1b[31m[error]\x1b[0m ${JSON.stringify(log)}`,
      `[error] ${JSON.stringify(log)}`
    )
  }
  private async writeLog(level: Level, log: string) {
    let dir = './log'
    let path = `${dir}/${this.now.toLocaleDateString()}-`
    switch (level) {
      case Level.NORMAL:
        path += 'log.log'
        break
      case Level.INFO:
        path += 'info.log'
        break
      case Level.WARN:
        path += 'warn.log'
        break
      case Level.ERROR:
        path += 'error.log'
        break
    }
    if (!fs.existsSync(dir)) {
      await this.createDir(dir)
    }
    fs.appendFile(path, `${log}\n`, error => {
      if (error) {
        console.log(error)
      }
    })
  }
  private async createDir(path: string) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, { recursive: true }, error => {
        if (error) throw error
        resolve()
      })
    })
  }
}
