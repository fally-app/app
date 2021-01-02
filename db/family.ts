import { Db } from 'mongodb'

export const getFamilies = async (db: Db) => {
    return await db.collection('families').find().toArray()
}
