import { Db, ObjectId } from 'mongodb'

export const getFamilies = async (db: Db) => {
    return db.collection('families').find().toArray()
}

export const getFamilyByCode = async (db: Db, code) => {
    return db.collection('families').findOne({ code })
}

export const getFamilyById = async (db: Db, id: string) => {
    return db.collection('families').findOne({ _id: new ObjectId(id) })
}
