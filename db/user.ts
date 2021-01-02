import { Db } from 'mongodb'

export const getUserById = async (db: Db, id: string) => {
    return db.collection('user').findOne({ _id: id })
}
