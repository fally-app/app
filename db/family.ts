import { Db } from 'mongodb'

export const getFamilies = async (db: Db) => {
    return db.collection('families').find().toArray()
}
