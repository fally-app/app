import { connectToDB } from '../db'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            mongo: any
        }
    }
}

export default async function database(req, res, next) {
    const { db, dbClient } = await connectToDB()
    req.db = db
    req.dbClinet = dbClient

    next()
}
