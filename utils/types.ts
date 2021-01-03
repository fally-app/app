import { Db, MongoClient } from 'mongodb'
import { NextApiRequest } from 'next'

export interface Request extends NextApiRequest {
    db: Db
    dbClient: MongoClient
}
