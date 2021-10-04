import { Db, ObjectId } from 'mongodb'

import { codeGenerator } from '@/utils/Helpers'

export const getFamilies = async (db: Db) => {
    return db.collection('families').find().toArray()
}

export const getFamilyByCode = async (db: Db, code) => {
    return db.collection('families').findOne({ code })
}

export const getFamilyById = async (db: Db, id: string) => {
    return db.collection('families').findOne({ _id: new ObjectId(id) })
}

export const updateFamily = async (db: Db, id: string, new_records) => {
    const operation = await db
        .collection('families')
        .updateOne({ _id: new ObjectId(id) }, { $set: new_records })
    if (!operation.result.ok) {
        throw new Error('Could not update document')
    }
    const updated = await db
        .collection('families')
        .findOne({ _id: new ObjectId(id) })
    return updated
}

export const deleteFamily = async (db: Db, _id: string) => {
    return db.collection('families').deleteOne({ _id: new ObjectId(_id) })
}

export const insertNewFamily = async (db: Db, new_record) => {
    const newFamily = db
        .collection('families')
        .insertOne({
            ...new_record,
            status: 'ACTIVE',
            code: codeGenerator('family'),
        })
        .then(({ ops }) => ops[0])
    return newFamily
}
