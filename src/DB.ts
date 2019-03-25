import { MongoClient, ObjectID } from 'mongodb'
import { JSLogger } from './utils/JSLogger'
export const config = {
  url: 'mongodb://localhost:27017/localhost',
  db: 'demo'
}

export const connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, db) => {
      if (err) JSLogger.error(err)
      resolve(db)
    })
  })
}
