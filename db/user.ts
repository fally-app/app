import { Db } from 'mongodb'

import { codeGenerator } from '../utils/Helpers'

export const getUserById = async (db: Db, id: string) => {
    return db.collection('users').findOne({ _id: id })
}

export const getAllUsers = async (db: Db) => {
    return db
        .collection('users')
        .aggregate([
            {
                $lookup: {
                    from: 'families',
                    localField: 'family_id',
                    foreignField: '_id',
                    as: 'family',
                },
            },
            { $match: { status: 'ACTIVE' } },
            { $sort: { firstName: 1 } },
        ])
        .toArray()
}

export const addUser = async (db: Db, user) => {
    return db
        .collection('users')
        .insertOne({ ...user, code: codeGenerator('user') })
        .then(({ ops }) => ops[0])
}
