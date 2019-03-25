import { connect, config } from '../DB'
import { JSLogger } from '../utils/JSLogger'
import { MongoClient } from 'mongodb'
import User from '../model/User'

export const register = (collection: string, json: User) => {
  return new Promise(async (resolve, reject) => {
    const db = (await connect()) as MongoClient
    const dbo = db.db(config.db)
    dbo.collection(collection).insertOne(json, (err, res) => {
      if (err) JSLogger.error(err)
      db.close()
      resolve()
    })
  })
}
export const findUser = (collection: string, json) => {
  return new Promise(async (resolve, reject) => {
    const db = (await connect()) as MongoClient
    const dbo = db.db(config.db)
    dbo
      .collection(collection)
      .find(json)
      .toArray((err, res) => {
        if (err) JSLogger.error(err)
        db.close()
        resolve(res)
      })
  })
}
export const findOneUser = (collection: string, json) => {
  return new Promise(async (resolve, reject) => {
    const db = (await connect()) as MongoClient
    const dbo = db.db(config.db)
    dbo.collection(collection).findOne(json, (err, res) => {
      if (err) JSLogger.error(err)
      db.close()
      resolve(res)
    })
  })
}
