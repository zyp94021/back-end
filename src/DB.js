const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const config = {
  url: 'mongodb://localhost:27017/localhost',
  db: 'demo'
}
const connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.url, (err, db) => {
      if (err) reject(err)
      console.log('数据库连接成功')
      resolve(db)
    })
  })

}

const insertOne = (collection, json) => {
  return new Promise(async (resolve, reject) => {
    const db = await connect()
    const dbo = db.db(config.db)
    dbo.collection(collection).insertOne(json, (err, res) => {
      if (err) reject(err)
      db.close()
      console.log('数据库断开')
      resolve()
    })
  })
}
const find = (collection, json) => {
  return new Promise(async (resolve, reject) => {
    const db = await connect()
    const dbo = db.db(config.db)
    dbo.collection(collection).find(json, {}, (err, res) => {
      if (err) reject(err)
      db.close()
      console.log('数据库断开')
      resolve(res)
    })
  })
}

module.exports = {
  insertOne,
  find
}
