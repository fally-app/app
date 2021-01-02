import { Db } from 'mongodb'

export const getUserById = async (db: Db, id: string) => {
    return db.collection('users').findOne({ _id: id })
}

export const getAllUsers = async (db: Db) => {
    return db
        .collection('users')
        .find({ status: 'ACTIVE' })
        .sort({
            firstName: 1,
        })
        .toArray()
}
