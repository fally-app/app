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
