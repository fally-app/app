import { Db } from 'mongodb'

export const getFamilies = async (db: Db) => {
    return db.collection('families').find().toArray()
}

export const getFamilyByCode = async (db: Db, code: string) => {
    return db.collection('families').findOne({ code })
}
