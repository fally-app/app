import { connectToDB } from '../db/connect'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mongo: any
        }
    }
}

export default async function database(req, res, next): Promise<void> {
    const { db, dbClient } = await connectToDB()
    req.db = db
    req.dbClient = dbClient

    next()
}
