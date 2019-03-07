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

  private _log(level: Level, log: any, file_log: any) {
    if (this.level >= level) {
      console.log.call(this, `[${this.now.toLocaleString()}] ${log}`)
      this.writeLog(level, `[${this.now.toLocaleString()}] ${file_log}`)
    }
  }
  public log(log: any) {
    this._log(Level.NORMAL, log, log)
  }
  public info(log: any) {
    this._log(Level.INFO, `\x1b[34m[info]\x1b[0m ${log}`, `[info] ${log}`)
  }
  public warn(log: any) {
    this._log(Level.WARN, `\x1b[33m[warn]\x1b[0m ${log}`, `[warn] ${log}`)
  }
  public error(log: any) {
    this._log(Level.ERROR, `\x1b[31m[error]\x1b[0m ${log}`, `[error] ${log}`)
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
