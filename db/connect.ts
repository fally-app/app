import { Db, MongoClient } from 'mongodb'

global.mongo = global.mongo || {}

console.log('working')

export const connectToDB = async () => {
    if (!global.mongo.client) {
        global.mongo.client = new MongoClient(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000,
        })

        console.log('connecting to DB')
        await global.mongo.client.connect()
        console.log('connected to DB')
    }

    const db: Db = global.mongo.client.db('SabbathSoft')

    return { db, dbClient: global.mongo.client }
}
